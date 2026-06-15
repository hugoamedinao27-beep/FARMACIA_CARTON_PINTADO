const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize');
const { User, PasswordResetToken } = require('../models');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Todos los campos son requeridos' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCount = await User.count();
    const role = userCount === 0 ? 'admin' : 'user';
    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({ error: true, message: 'El email ya está registrado.' });
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: true, message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000
    });

    res.json({ success: true, token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) { next(error); }
};

exports.me = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'email', 'role'] });
    if (!user) return res.status(404).json({ error: true, message: 'Usuario no encontrado.' });
    res.json({ success: true, user });
  } catch (error) { next(error); }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: true, message: 'Email requerido.' });

    const user = await User.findOne({ where: { email } });

    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
      await PasswordResetToken.create({ userId: user.id, token, expiresAt });

      console.log(`[INFO] Reset token para ${email}: ${token}`);
    }

    res.json({ success: true, token, message: 'Token generado. Redirigiendo...' });
  } catch (error) { next(error); }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: true, message: 'Token y nueva contraseña requeridos.' });

    const resetToken = await PasswordResetToken.findOne({ where: { token, used: false } });
    if (!resetToken) return res.status(400).json({ error: true, message: 'Token inválido o ya utilizado.' });
    if (new Date() > new Date(resetToken.expiresAt)) return res.status(400).json({ error: true, message: 'Token expirado.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update({ password: hashedPassword }, { where: { id: resetToken.userId } });
    await resetToken.update({ used: true });

    res.json({ success: true, message: 'Contraseña restablecida correctamente.' });
  } catch (error) { next(error); }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'lax' });
    res.json({ success: true, message: 'Sesión cerrada correctamente.' });
  } catch (error) { next(error); }
};