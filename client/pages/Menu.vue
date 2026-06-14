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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const apiBase = useApiBase()

const router = useRouter()
const usuarioActivo = ref('Operador')

onMounted(async () => {
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

const irACatalogo = () => {
  router.push('/inicio')
}

const irACarrito = () => {
  router.push('/dashboard')
}

const irAReportes = () => {
  router.push('/reportes')
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
</style>
