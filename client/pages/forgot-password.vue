<template>
  <div class="login-wrapper">
    <div class="glow-orb premium-teal"></div>
    <div class="glow-orb cyber-purple"></div>

    <div class="login-card">
      <div class="login-header">
        <div class="brand-badge">
          <img src="/images/lock-closed.svg" class="pill-emoji icon-img" alt="Recuperar" />
          <div class="pulse-ring"></div>
        </div>
        <h2>Restablecer Contraseña</h2>
        <p class="matrix-text">RECUPERACIÓN DE ACCESO</p>
      </div>

      <form @submit.prevent="handleForgotPassword" class="login-form">
        <div class="input-group">
          <label>OPERATOR_EMAIL</label>
          <div class="input-with-icon">
            <img src="/images/envelope.svg" class="input-icon icon-img" alt="Email" />
            <input v-model="email" type="email" placeholder="tu@email.com" required />
          </div>
        </div>

        <button type="submit" :disabled="loading" class="btn-login-submit">
          <span v-if="!loading">ENVIAR ENLACE <img src="/images/arrow-right.svg" class="arrow icon-img" alt="→" style="width:1em;height:1em;vertical-align:middle;" /></span>
          <span v-else>PROCESANDO...</span>
        </button>
      </form>

      <div class="toggle-mode">
        <p><router-link to="/" class="toggle-link">Volver al inicio de sesión</router-link></p>
      </div>

      <transition name="slide-up">
        <div v-if="message" class="success-box">
          <img src="/images/check.svg" class="success-icon icon-img" alt="Éxito" />
          <div class="success-details">
            <strong>SOLICITUD PROCESADA</strong>
            <p>{{ message }}</p>
            <p v-if="resetToken" style="margin-top:0.5rem;word-break:break-all;background:#1e293b;padding:0.5rem;border-radius:6px;font-family:monospace;font-size:0.8rem;">Token: {{ resetToken }}</p>
          </div>
        </div>
      </transition>

      <transition name="slide-up">
        <div v-if="errorMessage" class="error-box">
          <img src="/images/bolt.svg" class="error-icon icon-img" alt="Error" />
          <div class="error-details">
            <strong>ERROR</strong>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const apiBase = useApiBase()

const email = ref('')
const loading = ref(false)
const message = ref('')
const errorMessage = ref('')
const resetToken = ref('')

const handleForgotPassword = async () => {
  loading.value = true
  message.value = ''
  errorMessage.value = ''
  resetToken.value = ''

  try {
    const res = await fetch(`${apiBase}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message)
    message.value = data.message
    if (data.resetToken) resetToken.value = data.resetToken
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  --bg-dark: #090d16;
  --bg-card: rgba(15, 23, 42, 0.75);
  --neon-cyan: #00f2fe;
  --neon-teal: #0d9488;
  --text-bright: #f1f5f9;
  --text-dim: #64748b;
  --danger-neon: #ff0055;
  --success-neon: #10b981;
  display: flex; justify-content: center; align-items: center;
  min-height: 100vh; background-color: var(--bg-dark);
  font-family: 'SF Mono', Consolas, system-ui, sans-serif;
  color: var(--text-bright); padding: 1rem; box-sizing: border-box;
  overflow: hidden; position: relative;
}
.glow-orb {
  position: absolute; width: 450px; height: 450px;
  border-radius: 50%; filter: blur(140px); opacity: 0.15;
  pointer-events: none; z-index: 1;
}
.premium-teal { top: -10%; left: 20%; background: var(--neon-cyan); }
.cyber-purple { bottom: -10%; right: 20%; background: #7c3aed; }
.login-card {
  background-color: var(--bg-card);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  padding: 3rem 2.5rem; border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.07);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
  width: 100%; max-width: 430px; box-sizing: border-box; z-index: 10; position: relative;
}
.login-header { text-align: center; margin-bottom: 2.5rem; }
.brand-badge {
  position: relative; width: 65px; height: 65px;
  background: linear-gradient(135deg,#1e293b,#0f172a);
  border: 2px solid var(--neon-cyan); border-radius: 16px;
  margin: 0 auto 1.25rem auto; display: flex; align-items: center;
  justify-content: center; box-shadow: 0 0 15px rgba(0,242,254,0.25);
}
.pill-emoji { width: 2rem; height: 2rem; z-index: 2; }
.pulse-ring {
  position: absolute; width: 100%; height: 100%;
  border: 2px solid var(--neon-cyan); border-radius: 16px;
  animation: pulse-grow 2.5s infinite; opacity: 0; z-index: 1;
}
@keyframes pulse-grow { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.3); opacity: 0; } }
.login-header h2 {
  font-size: 1.5rem; margin: 0 0 0.5rem 0; letter-spacing: -0.025em; font-weight: 800;
  background: linear-gradient(to right,#fff,#94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.matrix-text { color: var(--neon-cyan); margin: 0; font-size: 0.75rem; letter-spacing: 0.2em; font-weight: 700; text-shadow: 0 0 8px rgba(0,242,254,0.4); }
.login-form { display: flex; flex-direction: column; gap: 1.5rem; }
.input-group { display: flex; flex-direction: column; }
.input-group label { font-size: 0.75rem; font-weight: 700; color: var(--text-dim); letter-spacing: 0.1em; margin-bottom: 0.5rem; }
.input-with-icon { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 1rem; width: 1.1rem; height: 1.1rem; color: var(--text-dim); }
.input-with-icon input {
  width: 100%; padding: 0.85rem 1rem 0.85rem 2.5rem;
  border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);
  background-color: rgba(9,13,22,0.6); color: var(--text-bright);
  font-size: 0.95rem; transition: all 0.25s; box-sizing: border-box;
}
.input-with-icon input:focus {
  outline: none; border-color: var(--neon-cyan);
  background-color: rgba(9,13,22,0.9); box-shadow: 0 0 15px rgba(0,242,254,0.15);
}
.btn-login-submit {
  width: 100%; padding: 1rem; background: linear-gradient(135deg,var(--neon-teal),#0284c7);
  color: #fff; border: none; border-radius: 10px; font-size: 0.95rem;
  font-weight: 700; letter-spacing: 0.05em; cursor: pointer;
  box-shadow: 0 4px 20px rgba(13,148,136,0.3); transition: all 0.2s; margin-top: 0.5rem;
}
.btn-login-submit:hover:not(:disabled) { filter: brightness(1.15); box-shadow: 0 4px 25px rgba(0,242,254,0.4); }
.btn-login-submit:disabled { background: #334155; color: #64748b; cursor: not-allowed; box-shadow: none; }
.toggle-mode { text-align: center; margin-top: 1.25rem; font-size: 0.85rem; color: var(--text-dim); }
.toggle-link { color: var(--neon-cyan); font-weight: 700; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
.toggle-link:hover { color: #fff; text-shadow: 0 0 8px rgba(0,242,254,0.6); }
.error-box, .success-box { display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; border-radius: 10px; margin-top: 1.5rem; }
.error-box { background-color: rgba(255,0,85,0.06); border: 1px solid rgba(255,0,85,0.3); }
.success-box { background-color: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.3); }
.error-icon { width: 1.2rem; height: 1.2rem; }
.success-icon { width: 1.2rem; height: 1.2rem; }
.icon-img { display: inline-block; vertical-align: middle; }
.error-details strong, .success-details strong { display: block; font-size: 0.75rem; letter-spacing: 0.05em; margin-bottom: 0.15rem; }
.error-details strong { color: var(--danger-neon); }
.success-details strong { color: var(--success-neon); }
.error-details p, .success-details p { color: #cbd5e1; margin: 0; font-size: 0.85rem; }
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(10px); opacity: 0; }
</style>
