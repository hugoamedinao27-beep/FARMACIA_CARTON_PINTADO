<template>
  <div class="login-wrapper">
    <div class="glow-orb premium-teal"></div>
    <div class="glow-orb cyber-purple"></div>

    <div class="login-card">
      <div class="login-header">
        <div class="brand-badge">
          <img src="/images/pill.svg" class="pill-emoji icon-img" alt="Farmacia" />
          <div class="pulse-ring"></div>
        </div>
        <h2>Farmacia Cartón Pintado</h2>
        <p class="matrix-text">
          {{ isRegister ? 'REGISTRO DE NUEVOS OPERADORES' : 'CONTROL DE ACCESO • OPERADORES' }}
        </p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="login-form">
        <div v-if="isRegister" class="input-group">
          <label for="name">OPERATOR_NAME</label>
          <div class="input-with-icon">
            <img src="/images/user.svg" class="input-icon icon-img" alt="Usuario" />
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Nombre del operador"
              required
            />
          </div>
        </div>

        <div class="input-group">
          <label for="email">OPERATOR_EMAIL</label>
          <div class="input-with-icon">
            <img src="/images/envelope.svg" class="input-icon icon-img" alt="Email" />
            <input 
              id="email"
              v-model="email" 
              type="email" 
              placeholder="ejemplo@farmacia.com" 
              required 
            />
          </div>
        </div>

        <div class="input-group">
          <label for="password">ACCESS_PASSWORD</label>
          <div class="input-with-icon">
            <img src="/images/lock-closed.svg" class="input-icon icon-img" alt="Contraseña" />
            <input 
              id="password"
              v-model="password" 
              type="password" 
              placeholder="••••••••" 
              required 
            />
          </div>
        </div>

        <button type="submit" :disabled="loading" class="btn-login-submit">
          <span v-if="!loading" class="btn-content">
            {{ isRegister ? 'CREAR CUENTA SISTEMA' : 'INICIAR SESIÓN' }} <img src="/images/arrow-right.svg" class="arrow icon-img" alt="→" />
          </span>
          <span v-else class="spinner-text">
            {{ isRegister ? 'PROCESANDO REGISTRO...' : 'VERIFICANDO CREDENCIALES...' }}
          </span>
        </button>
      </form>

      <div class="toggle-mode">
        <p v-if="!isRegister">
          ¿No tienes un operador registrado? 
          <span @click="toggleMode" class="toggle-link">Crear cuenta</span>
        </p>
        <p v-else>
          ¿Ya posees credenciales de acceso? 
          <span @click="toggleMode" class="toggle-link">Iniciar sesión</span>
        </p>
        <p v-if="!isRegister" style="margin-top:0.5rem;">
          <router-link to="/forgot-password" class="toggle-link">¿Olvidaste tu contraseña?</router-link>
        </p>
      </div>

      <transition name="slide-up">
        <div v-if="errorMessage" class="error-box">
          <img src="/images/bolt.svg" class="error-icon icon-img" alt="Error" />
          <div class="error-details">
            <strong>ERROR DEL SISTEMA</strong>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </transition>

      <transition name="slide-up">
        <div v-if="successMessage" class="success-box">
          <img src="/images/check.svg" class="success-icon icon-img" alt="Éxito" />
          <div class="success-details">
            <strong>REGISTRO EXITOSO</strong>
            <p>{{ successMessage }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' 

const router = useRouter() 
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Estado para alternar entre Login (false) y Registro (true)
const isRegister = ref(false)

const toggleMode = () => {
  isRegister.value = !isRegister.value
  errorMessage.value = ''
  successMessage.value = ''
  // Limpiamos campos opcionalmente al cambiar de modo
  name.value = ''
  email.value = ''
  password.value = ''
}

const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  // Definir la URL dinámicamente según el modo en el que se encuentre el usuario
  const endpoint = isRegister.value ? 'register' : 'login'
  const url = `http://localhost:4000/api/v1/auth/${endpoint}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...(isRegister.value && { name: name.value }),
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error en la operación. Revisa los datos.')
    }

    if (isRegister.value) {
      // Si se registró con éxito, mostramos mensaje y lo pasamos a login tras 2 segundos
      successMessage.value = 'Operador guardado en la base de datos. Ya puedes iniciar sesión.'
      setTimeout(() => {
        toggleMode()
      }, 2500)
    } else {
      // Si es inicio de sesión, guardamos token e ingresamos al inicio
      sessionStorage.setItem('token', data.token)
      if (data.user && data.user.name) sessionStorage.setItem('user_name', data.user.name)
      router.push('/menu')
    }
    
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* --- Setup General - Atmósfera Neon Ciberpunk --- */
.login-wrapper {
  --bg-dark: #090d16;
  --bg-card: rgba(15, 23, 42, 0.75); /* Cristal translúcido */
  --neon-cyan: #00f2fe;
  --neon-teal: #0d9488;
  --text-bright: #f1f5f9;
  --text-dim: #64748b;
  --danger-neon: #ff0055;
  --success-neon: #10b981;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--bg-dark);
  font-family: 'SF Mono', Consolas, system-ui, sans-serif;
  color: var(--text-bright);
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

/* --- Efectos de iluminación de fondo (Glow Orbs) --- */
.glow-orb {
  position: absolute;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 1;
}
.premium-teal {
  top: -10%;
  left: 20%;
  background: var(--neon-cyan);
}
.cyber-purple {
  bottom: -10%;
  right: 20%;
  background: #7c3aed;
}

/* --- Contenedor de Cristal (Glassmorphism) --- */
.login-card {
  background-color: var(--bg-card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 430px;
  box-sizing: border-box;
  z-index: 10;
  position: relative;
}

/* --- Encabezado --- */
.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.brand-badge {
  position: relative;
  width: 65px;
  height: 65px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 2px solid var(--neon-cyan);
  border-radius: 16px;
  margin: 0 auto 1.25rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.25);
}
.pill-emoji {
  width: 2rem;
  height: 2rem;
  z-index: 2;
}
.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid var(--neon-cyan);
  border-radius: 16px;
  animation: pulse-grow 2.5s infinite;
  opacity: 0;
  z-index: 1;
}

.login-header h2 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
  font-weight: 800;
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.matrix-text {
  color: var(--neon-cyan);
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.4);
  transition: all 0.3s ease;
}

/* --- Inputs --- */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.input-group {
  display: flex;
  flex-direction: column;
}
.input-group label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-dim);
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}
.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}
.input-icon {
  position: absolute;
  left: 1rem;
  width: 1.1rem;
  height: 1.1rem;
  color: var(--text-dim);
  transition: color 0.2s ease;
}
.input-with-icon input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.5rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(9, 13, 22, 0.6);
  color: var(--text-bright);
  font-size: 0.95rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}
.input-with-icon input:focus {
  outline: none;
  border-color: var(--neon-cyan);
  background-color: rgba(9, 13, 22, 0.9);
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.15), 
              inset 0 0 8px rgba(0, 242, 254, 0.05);
}
.input-with-icon input:focus + .input-icon {
  color: var(--neon-cyan);
}

/* --- Apartado/Enlace para cambiar de Modo --- */
.toggle-mode {
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.85rem;
  color: var(--text-dim);
}
.toggle-link {
  color: var(--neon-cyan);
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}
.toggle-link:hover {
  color: #fff;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.6);
}

/* --- Botón --- */
.btn-login-submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--neon-teal), #0284c7);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(13, 148, 136, 0.3);
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
}
.btn-login-submit:hover:not(:disabled) {
  filter: brightness(1.15);
  box-shadow: 0 4px 25px rgba(0, 242, 254, 0.4);
  transform: translateY(-1px);
}
.btn-login-submit:active:not(:disabled) {
  transform: translateY(1px);
}
.btn-login-submit:disabled {
  background: #334155;
  color: #64748b;
  cursor: not-allowed;
  box-shadow: none;
}
.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.arrow {
  transition: transform 0.2s ease;
}
.btn-login-submit:hover .arrow {
  transform: translateX(3px);
}

/* --- Alertas de Sistema (Error y Éxito) --- */
.error-box, .success-box {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1.5rem;
}
.error-box {
  background-color: rgba(255, 0, 85, 0.06);
  border: 1px solid rgba(255, 0, 85, 0.3);
  box-shadow: 0 0 15px rgba(255, 0, 85, 0.1);
}
.success-box {
  background-color: rgba(16, 185, 129, 0.06);
  border: 1px solid rgba(16, 185, 129, 0.3);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.1);
}
.error-icon {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--danger-neon);
}
.success-icon {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--success-neon);
}
.icon-img {
  display: inline-block;
  vertical-align: middle;
}
.error-details strong, .success-details strong {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.15rem;
}
.error-details strong { color: var(--danger-neon); }
.success-details strong { color: var(--success-neon); }

.error-details p, .success-details p {
  color: #cbd5e1;
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.4;
}

/* --- Animaciones Keyframes --- */
@keyframes pulse-grow {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 0; }
}

/* Transiciones Vue */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>