<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <div class="brand-badge">
          <img src="/images/pepito.jpeg" class="brand-logo" alt="Farmacia" />
        </div>
        <h2>Restablecer Contraseña</h2>
        <p class="subtitle">Recuperación de acceso</p>
      </div>

      <form @submit.prevent="handleForgotPassword" class="login-form">
        <div class="input-group">
          <label>Correo electrónico</label>
          <div class="input-with-icon">
            <img src="/images/envelope.svg" class="input-icon" alt="Email" />
            <input v-model="email" type="email" placeholder="tu@email.com" required />
          </div>
        </div>

        <button type="submit" :disabled="loading" class="btn-login-submit">
          <span v-if="!loading">Enviar Enlace <img src="/images/arrow-right.svg" class="arrow" alt="→" /></span>
          <span v-else>Procesando...</span>
        </button>
      </form>

      <div class="toggle-mode">
        <p><router-link to="/" class="toggle-link">Volver al inicio de sesión</router-link></p>
      </div>

      <transition name="slide-up">
        <div v-if="message" class="alert-box alert-success">
          <img src="/images/check.svg" class="alert-icon" alt="Éxito" />
          <div>
            <strong>Solicitud Procesada</strong>
            <p>{{ message }}</p>
          </div>
        </div>
      </transition>

      <transition name="slide-up">
        <div v-if="errorMessage" class="alert-box alert-error">
          <img src="/images/exclamation-triangle.svg" class="alert-icon" alt="Error" />
          <div>
            <strong>Error</strong>
            <p>{{ errorMessage }}</p>
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

const email = ref('')
const loading = ref(false)
const message = ref('')
const errorMessage = ref('')

const handleForgotPassword = async () => {
  loading.value = true
  message.value = ''
  errorMessage.value = ''

  try {
    const res = await fetch(`${apiBase}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message)
    if (data.token) {
      router.push(`/reset-password?token=${data.token}`)
    } else {
      errorMessage.value = data.message || 'Email no encontrado.'
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

.token-display {
  margin-top: 0.5rem;
  word-break: break-all;
  background: #f3f4f6;
  padding: 0.5rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--text-main);
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
