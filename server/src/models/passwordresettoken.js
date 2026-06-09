module.exports = (sequelize, DataTypes) => {
  const PasswordResetToken = sequelize.define('PasswordResetToken', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
    used: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, { tableName: 'password_reset_tokens' });

  PasswordResetToken.associate = (models) => {
    PasswordResetToken.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return PasswordResetToken;
};
