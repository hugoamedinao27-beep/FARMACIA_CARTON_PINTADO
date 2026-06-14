<template>
  <div class="menu-wrapper">
    <header class="main-header">
      <div class="header-brand">
        <img src="/images/pepito.jpeg" class="brand-icon icon-img" alt="Farmacia" />
        <div>
          <h1>Farmacia carton pintado</h1>
          <p class="subtitle">Cartón Pintado • Panel Principal</p>
        </div>
      </div>
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

    <div class="carousel" @mouseenter="pausar" @mouseleave="reanudar">
      <div class="carousel-track" :style="{ transform: `translateX(-${indice * 100}%)` }">
        <div v-for="(img, i) in imagenes" :key="i" class="carousel-slide">
          <img :src="img.src" :alt="img.label" class="carousel-img" />
          <div class="carousel-label">{{ img.label }}</div>
        </div>
      </div>
      <button class="carousel-btn carousel-prev" @click="anterior">‹</button>
      <button class="carousel-btn carousel-next" @click="siguiente">›</button>
      <div class="carousel-dots">
        <span
          v-for="(img, i) in imagenes"
          :key="i"
          class="carousel-dot"
          :class="{ active: i === indice }"
          @click="indice = i"
        ></span>
      </div>
    </div>

    <div class="menu-grid">
      <div @click="irACatalogo" class="menu-card">
        <img src="/images/pill.svg" class="menu-card-icon icon-img" alt="Medicamentos" />
        <h2 class="menu-card-title">Catálogo de Medicamentos</h2>
        <p class="menu-card-desc">Visualizar inventario, agregar, editar y eliminar fármacos del sistema.</p>
        <span class="menu-card-btn">Ver Inventario <img src="/images/arrow-right.svg" class="icon-img" alt="→" style="width:0.8em;height:0.8em;vertical-align:middle;" /></span>
      </div>

      <div @click="irACarrito" class="menu-card">
        <img src="/images/shopping-cart.svg" class="menu-card-icon icon-img" alt="Carrito" />
        <h2 class="menu-card-title">Carrito de Ventas</h2>
        <p class="menu-card-desc">Procesar ventas, gestionar recetas y confirmar transacciones.</p>
        <span class="menu-card-btn">Ir al Carrito <img src="/images/arrow-right.svg" class="icon-img" alt="→" style="width:0.8em;height:0.8em;vertical-align:middle;" /></span>
      </div>
      <div @click="irAReportes" class="menu-card">
        <img src="/images/chart-bar.svg" class="menu-card-icon icon-img" alt="Reportes" />
        <h2 class="menu-card-title">Reportes de Ventas</h2>
        <p class="menu-card-desc">Ver estadísticas, ingresos totales y medicamentos más vendidos.</p>
        <span class="menu-card-btn">Ver Reportes <img src="/images/arrow-right.svg" class="icon-img" alt="→" style="width:0.8em;height:0.8em;vertical-align:middle;" /></span>
      </div>

      <div @click="irAConocenos" class="menu-card">
        <img src="/images/information-circle.svg" class="menu-card-icon icon-img" alt="Conócenos" />
        <h2 class="menu-card-title">Conócenos</h2>
        <p class="menu-card-desc">Información de la farmacia, horarios y contacto.</p>
        <span class="menu-card-btn">Ver más <img src="/images/arrow-right.svg" class="icon-img" alt="→" style="width:0.8em;height:0.8em;vertical-align:middle;" /></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const apiBase = useApiBase()

const router = useRouter()
const usuarioActivo = ref('Operador')
const indice = ref(0)
const intervalo = ref(null)

const imagenes = [
  { src: '/images/pepito.jpeg', label: 'Farmacia Cartón Pintado' },
  { src: '/images/hugoperro.jpeg', label: 'Nuestro Equipo' },
  { src: '/images/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp', label: 'Compromiso con tu Salud' }
]

const avanzar = () => {
  indice.value = (indice.value + 1) % imagenes.length
}

const anterior = () => {
  indice.value = (indice.value - 1 + imagenes.length) % imagenes.length
}

const siguiente = () => {
  indice.value = (indice.value + 1) % imagenes.length
}

const pausar = () => {
  if (intervalo.value) clearInterval(intervalo.value)
}

const reanudar = () => {
  intervalo.value = setInterval(avanzar, 4000)
}

onMounted(async () => {
  intervalo.value = setInterval(avanzar, 4000)
  let token = sessionStorage.getItem('token')

  if (!token) {
    try {
      const res = await fetch(`${apiBase}/auth/me`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        token = 'restored'
        if (data.user?.name) sessionStorage.setItem('user_name', data.user.name)
      }
    } catch (_) { }
  }

  if (!token) {
    alert('Acceso denegado. Por favor inicia sesión primero.')
    router.push('/')
    return
  }

  const nombreGuardado = sessionStorage.getItem('user_name') || sessionStorage.getItem('email')
  if (nombreGuardado) {
    usuarioActivo.value = nombreGuardado
  }
})

onUnmounted(() => {
  if (intervalo.value) clearInterval(intervalo.value)
})

const irACatalogo = () => {
  router.push('/inicio')
}

const irACarrito = () => {
  router.push('/dashboard')
}

const irAReportes = () => {
  router.push('/reportes')
}

const irAConocenos = () => {
  router.push('/conocenos')
}

const cerrarSesion = async () => {
  try {
    await fetch(`${apiBase}/auth/logout`, { method: 'POST', credentials: 'include' })
  } catch (_) { }
  sessionStorage.clear()
  router.push('/')
}
</script>

<style scoped>
.menu-wrapper {
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

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-card);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.header-brand { display: flex; align-items: center; gap: 1rem; }
.brand-icon { width: 5rem; height: 5rem; background: #ccfbf1; padding: 0.5rem; border-radius: 10px; object-fit: contain; }
.main-header h1 { font-size: 1.35rem; margin: 0; color: var(--primary); font-weight: 700; }
.subtitle { margin: 0; font-size: 0.85rem; color: var(--text-muted); }
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

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}

.menu-card {
  background-color: var(--bg-card);
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid var(--border-color);
}

.menu-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -4px rgba(0, 0, 0, 0.1);
  border-color: var(--primary);
}

.menu-card-icon {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
  background: #ccfbf1;
  padding: 1rem;
  border-radius: 16px;
  object-fit: contain;
}

.menu-card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 0.5rem 0;
}

.menu-card-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0 0 1.25rem 0;
  line-height: 1.4;
}

.menu-card-btn {
  display: inline-block;
  background-color: var(--primary);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s ease;
}

.menu-card:hover .menu-card-btn {
  background-color: var(--primary-hover);
}

.carousel {
  position: relative;
  max-width: 700px;
  margin: 0 auto 1.5rem auto;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  position: relative;
}

.carousel-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.carousel-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.85);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  color: #374151;
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.carousel:hover .carousel-btn {
  opacity: 1;
}

.carousel-prev { left: 0.75rem; }
.carousel-next { right: 0.75rem; }

.carousel-btn:hover {
  background: white;
  color: var(--primary);
}

.carousel-dots {
  position: absolute;
  bottom: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.4rem;
}

.carousel-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: background 0.2s ease;
}

.carousel-dot.active {
  background: white;
  transform: scale(1.3);
}

@media (max-width: 600px) {
  .carousel-img { height: 200px; }
  .carousel-btn { width: 2rem; height: 2rem; font-size: 1.2rem; }
  .carousel-label { font-size: 0.9rem; padding: 0.75rem; }
  .carousel-dots { bottom: 2.8rem; }
}
</style>
