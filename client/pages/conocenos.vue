<template>
  <div class="about-wrapper">
    <header class="about-header">
      <button @click="volver" class="btn-back">
        <img src="/images/arrow-left.svg" class="icon-img" alt="" style="width:1rem;height:1rem;" /> Volver al menú
      </button>
      <div class="header-actions">
        <button class="btn-user-profile" title="Perfil de Usuario">
          <img src="/images/user.svg" class="user-icon icon-img" alt="Usuario" />
          <span class="user-name">{{ usuarioActivo }}</span>
        </button>
        <button @click="cerrarSesion" class="btn-logout">
          <span>Cerrar Sesión</span>
          <img src="/images/arrow-right.svg" class="icon icon-img" alt="→" />
        </button>
      </div>
    </header>

    <nav class="main-navbar">
      <ul class="nav-list">
        <li @click="irAlMenu" class="nav-item active">
          <img src="/images/home.svg" class="nav-icon icon-img" alt="Menú" /> Menú
        </li>
        <li @click="irAInicio" class="nav-item">
          <img src="/images/pill.svg" class="nav-icon icon-img" alt="Farmacia" /> Farmacia
        </li>
        <li @click="irAReportes" class="nav-item">
          <img src="/images/chart-bar.svg" class="nav-icon icon-img" alt="Reportes" /> Reportes
        </li>
        <li @click="irACarrito" class="nav-item">
          <img src="/images/shopping-cart.svg" class="nav-icon icon-img" alt="Carrito" /> Carrito
          <span v-if="itemsEnCarrito > 0" class="cart-badge">{{ itemsEnCarrito }}</span>
        </li>
      </ul>
    </nav>

    <div class="about-card">
      <div class="about-top">
        <img src="/images/pepito.jpeg" class="about-photo" alt="Farmacia Cartón Pintado" />
        <div class="about-titles">
          <h1 class="about-name">Farmacia Cartón Pintado</h1>
          <p class="about-subtitle">Tu farmacia de confianza</p>
        </div>
      </div>

      <div class="about-desc">
        <p>Somos una farmacia comprometida con la salud y el bienestar de nuestra comunidad. Ofrecemos una amplia variedad de medicamentos con y sin receta, productos de cuidado personal y atención farmacéutica personalizada.</p>
      </div>

      <div class="about-info-grid">
        <div class="about-info-item">
          <img src="/images/home.svg" class="about-info-icon" alt="Dirección" />
          <div>
            <span class="about-info-label">Dirección</span>
            <span class="about-info-value">Cartón Pintado, Chile</span>
          </div>
        </div>
        <div class="about-info-item">
          <img src="/images/phone.svg" class="about-info-icon" alt="Teléfono" />
          <div>
            <span class="about-info-label">Teléfono</span>
            <span class="about-info-value">+56 9 XXXX XXXX</span>
          </div>
        </div>
        <div class="about-info-item">
          <img src="/images/clock.svg" class="about-info-icon" alt="Horario" />
          <div>
            <span class="about-info-label">Horario</span>
            <span class="about-info-value">Lun–Sáb: 9:00 – 21:00</span>
          </div>
        </div>
        <div class="about-info-item">
          <img src="/images/envelope.svg" class="about-info-icon" alt="Email" />
          <div>
            <span class="about-info-label">Email</span>
            <span class="about-info-value">contacto@farmaciacartonpintado.cl</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const apiBase = useApiBase()

const router = useRouter()
const usuarioActivo = ref('Operador')

const itemsEnCarrito = computed(() => {
  const carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]')
  return carrito.reduce((sum, item) => sum + item.cantidad, 0)
})

const volver = () => router.push('/menu')

const irAlMenu = () => router.push('/menu')
const irAInicio = () => router.push('/inicio')
const irAReportes = () => router.push('/reportes')
const irACarrito = () => router.push('/dashboard')

const cerrarSesion = async () => {
  try {
    await fetch(`${apiBase}/auth/logout`, { method: 'POST', credentials: 'include' })
  } catch (_) { }
  sessionStorage.clear()
  router.push('/')
}

onMounted(async () => {
  const nombreGuardado = sessionStorage.getItem('user_name') || sessionStorage.getItem('email')
  if (nombreGuardado) usuarioActivo.value = nombreGuardado
})
</script>

<style scoped>
.about-wrapper {
  --bg-main: #f3f4f6;
  --bg-card: #ffffff;
  --primary: #0d9488;
  --primary-hover: #0f766e;
  --text-main: #1f2937;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;

  font-family: 'Segoe UI', system-ui, sans-serif;
  background-color: var(--bg-main);
  color: var(--text-main);
  min-height: 100vh;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
}

.about-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-card);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-main);
  transition: all 0.2s ease;
}

.btn-back:hover { background-color: #f3f4f6; border-color: #d1d5db; }

.header-actions { display: flex; align-items: center; gap: 1rem; }

.btn-user-profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f3f4f6;
  color: var(--text-main);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: default;
}

.user-icon { width: 1.1rem; height: 1.1rem; background-color: #e5e7eb; padding: 0.2rem 0.4rem; border-radius: 50%; }
.user-name { max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.btn-logout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fee2e2;
  color: #ef4444;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn-logout:hover { background-color: #fca5a5; }

.main-navbar {
  background-color: var(--bg-card);
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  margin-bottom: 1.5rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-item:hover { color: var(--primary); }
.nav-item.active { color: var(--primary); background-color: #ccfbf1; }
.nav-icon { width: 1.1rem; height: 1.1rem; }

.cart-badge {
  background-color: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 50%;
  margin-left: 0.25rem;
  line-height: 1.2;
}

.about-card {
  background: var(--bg-card);
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  max-width: 700px;
  margin: 0 auto;
}

.about-top {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.about-photo {
  width: 6rem;
  height: 6rem;
  border-radius: 16px;
  object-fit: cover;
  flex-shrink: 0;
}

.about-titles { display: flex; flex-direction: column; gap: 0.25rem; }

.about-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.about-subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.about-desc {
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #4b5563;
}

.about-desc p { margin: 0; }

.about-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.about-info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 1rem;
}

.about-info-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  opacity: 0.7;
}

.about-info-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.about-info-value {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
}

@media (max-width: 600px) {
  .about-wrapper { padding: 1rem; }
  .about-top { flex-direction: column; text-align: center; }
  .about-info-grid { grid-template-columns: 1fr; }
}
</style>
