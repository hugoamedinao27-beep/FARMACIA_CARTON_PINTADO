<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <div class="brand-badge">
          <img src="/images/pepito.jpeg" class="brand-logo" alt="Farmacia" />
        </div>
        <h2>Farmacia Cartón Pintado</h2>
        <p class="subtitle">{{ isRegister ? 'Registro de Nuevos Operadores' : 'Inicio de Sesión' }}</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="login-form">
        <div v-if="isRegister" class="input-group">
          <label for="name">Nombre completo</label>
          <div class="input-with-icon">
            <img src="/images/user.svg" class="input-icon" alt="Usuario" />
            <input id="name" v-model="name" type="text" placeholder="Nombre del operador" required />
          </div>
        </div>

        <div class="input-group">
          <label for="email">Correo electrónico</label>
          <div class="input-with-icon">
            <img src="/images/envelope.svg" class="input-icon" alt="Email" />
            <input id="email" v-model="email" type="email" placeholder="ejemplo@farmacia.com" required />
          </div>
        </div>

        <div class="input-group">
          <label for="password">Contraseña</label>
          <div class="input-with-icon">
            <img src="/images/lock-closed.svg" class="input-icon" alt="Contraseña" />
            <input id="password" v-model="password" type="password" placeholder="Ingresa tu contraseña" required />
          </div>
        </div>

        <button type="submit" :disabled="loading" class="btn-login-submit">
          <span v-if="!loading">
            {{ isRegister ? 'Crear Cuenta' : 'Iniciar Sesión' }}
            <img src="/images/arrow-right.svg" class="arrow" alt="→" />
          </span>
          <span v-else>
            {{ isRegister ? 'Procesando...' : 'Verificando...' }}
          </span>
        </button>
      </form>

      <div class="toggle-mode">
        <p v-if="!isRegister">
          ¿No tienes cuenta?
          <span @click="toggleMode" class="toggle-link">Crear cuenta</span>
        </p>
        <p v-else>
          ¿Ya tienes cuenta?
          <span @click="toggleMode" class="toggle-link">Iniciar sesión</span>
        </p>
        <p v-if="!isRegister" class="forgot-link">
          <router-link to="/forgot-password">¿Olvidaste tu contraseña?</router-link>
        </p>
      </div>

      <transition name="slide-up">
        <div v-if="errorMessage" class="alert-box alert-error">
          <img src="/images/exclamation-triangle.svg" class="alert-icon" alt="Error" />
          <div>
            <strong>Error</strong>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </transition>

      <transition name="slide-up">
        <div v-if="successMessage" class="alert-box alert-success">
          <img src="/images/check.svg" class="alert-icon" alt="Éxito" />
          <div>
            <strong>Registro Exitoso</strong>
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
const apiBase = useApiBase()

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
  const url = `${apiBase}/auth/${endpoint}`

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
.login-wrapper {
  --primary: #0d9488;
  --primary-hover: #0f766e;
  --primary-light: #ccfbf1;
  --bg-main: #f3f4f6;
  --bg-card: #ffffff;
  --text-main: #1f2937;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;
  --success: #10b981;
  --danger: #ef4444;

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--bg-main);
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: var(--text-main);
  padding: 1rem;
  box-sizing: border-box;
}

.login-card {
  background-color: var(--bg-card);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 30px -5px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-badge {
  width: 70px;
  height: 70px;
  background: var(--primary-light);
  border-radius: 16px;
  margin: 0 auto 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  border-radius: 6px;
}

.login-header h2 {
  font-size: 1.35rem;
  margin: 0 0 0.25rem 0;
  font-weight: 700;
  color: var(--primary);
}

.subtitle {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 0.35rem;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.85rem;
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.5;
}

.input-with-icon input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 8px;
  border: 1.5px solid var(--border-color);
  background-color: #f9fafb;
  color: var(--text-main);
  font-size: 0.9rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.input-with-icon input:focus {
  outline: none;
  border-color: var(--primary);
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.input-with-icon input::placeholder {
  color: #9ca3af;
}

.btn-login-submit {
  width: 100%;
  padding: 0.8rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-login-submit:hover:not(:disabled) {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
}

.btn-login-submit:active:not(:disabled) {
  transform: translateY(0);
}

.btn-login-submit:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.arrow {
  width: 0.9rem;
  height: 0.9rem;
  transition: transform 0.2s ease;
}

.btn-login-submit:hover .arrow {
  transform: translateX(3px);
}

.toggle-mode {
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.toggle-link {
  color: var(--primary);
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s ease;
}

.toggle-link:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

.forgot-link {
  margin-top: 0.5rem;
}

.forgot-link a {
  color: var(--text-muted);
  font-size: 0.8rem;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.forgot-link a:hover {
  color: var(--primary);
}

.alert-box {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.85rem;
}

.alert-error {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
}

.alert-success {
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.alert-icon {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.alert-box strong {
  display: block;
  font-size: 0.75rem;
  margin-bottom: 0.1rem;
}

.alert-error strong { color: var(--danger); }
.alert-success strong { color: var(--success); }

.alert-box p {
  margin: 0;
  color: var(--text-main);
  line-height: 1.4;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>