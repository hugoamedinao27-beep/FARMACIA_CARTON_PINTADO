<template>
  <div class="detail-wrapper">
    <header class="detail-header">
      <button @click="volver" class="btn-back">
        <img src="/images/arrow-left.svg" class="icon-img" alt="" style="width:1rem;height:1rem;" /> Volver al inventario
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
        <li @click="irAlMenu" class="nav-menu-title">
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

    <div v-if="cargando" class="loading-state">
      <p>Cargando medicamento...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="volver" class="btn-back">Volver al inventario</button>
    </div>

    <div v-else-if="medicamento" class="detail-card">
      <div class="detail-top">
        <div class="detail-icon">
          <img src="/images/pill.svg" class="detail-pill-icon" alt="Medicamento" />
        </div>
        <div class="detail-titles">
          <h1 class="detail-name">{{ medicamento.nombre }}</h1>
          <span v-if="medicamento.categoria" class="detail-categoria">{{ medicamento.categoria }}</span>
          <span :class="stockBadge">{{ stockStatusText }}</span>
        </div>
      </div>

      <div v-if="medicamento.descripcion" class="detail-desc-section">
        <p class="detail-desc">{{ medicamento.descripcion }}</p>
      </div>

      <div class="detail-info-grid">
        <div class="info-item">
          <span class="info-label">Precio</span>
          <span class="info-value info-price">${{ parseFloat(medicamento.precio).toLocaleString('es-CL') }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Stock disponible</span>
          <span class="info-value" :class="{ 'text-danger': medicamento.stock <= 0, 'text-warning': medicamento.stock > 0 && medicamento.stock <= medicamento.stock_minimo }">{{ medicamento.stock }} unidades</span>
        </div>
        <div v-if="medicamento.stock <= medicamento.stock_minimo && medicamento.stock > 0" class="info-item">
          <span class="info-label">Stock mínimo</span>
          <span class="info-value text-warning">{{ medicamento.stock_minimo }} unid.</span>
        </div>
        <div class="info-item">
          <span class="info-label">Requiere receta</span>
          <span class="info-value">
            <span v-if="medicamento.receta_obligatoria" class="receta-badge receta-si">Sí</span>
            <span v-else class="receta-badge receta-no">No</span>
          </span>
        </div>
      </div>

      <div v-if="medicamento.stock > 0" class="detail-actions">
        <div class="detail-qty-selector">
          <label>Cantidad:</label>
          <div class="qty-controls">
            <button @click="decrementarCantidad" class="btn-qty">−</button>
            <input type="number" v-model.number="cantidad" min="1" :max="medicamento.stock" class="qty-input-detail" readonly />
            <button @click="incrementarCantidad" class="btn-qty">+</button>
          </div>
        </div>

        <button @click="agregarAlCarrito" class="btn-add-cart-detail">
          <img src="/images/shopping-cart.svg" class="icon-img" alt="" style="width:1.1rem;height:1.1rem;vertical-align:middle;margin-right:0.4rem;" /> Agregar al Carrito
        </button>
      </div>

      <div v-else class="no-stock-msg">
        <p>Este medicamento no tiene stock disponible.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const apiBase = useApiBase()

const route = useRoute()
const router = useRouter()
const medicamento = ref(null)
const cargando = ref(true)
const error = ref('')
const usuarioActivo = ref('Operador')
const cantidad = ref(1)

const stockBadge = computed(() => {
  if (!medicamento.value) return ''
  if (medicamento.value.stock <= 0) return 'badge badge-danger'
  if (medicamento.value.stock <= medicamento.value.stock_minimo) return 'badge badge-warning'
  return 'badge badge-success'
})

const stockStatusText = computed(() => {
  if (!medicamento.value) return ''
  if (medicamento.value.stock <= 0) return 'Sin Stock'
  if (medicamento.value.stock <= medicamento.value.stock_minimo) return 'Stock Bajo'
  return 'Disponible'
})

const itemsEnCarrito = computed(() => {
  const carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]')
  return carrito.reduce((sum, item) => sum + item.cantidad, 0)
})

const incrementarCantidad = () => {
  if (cantidad.value < medicamento.value.stock) cantidad.value++
}

const decrementarCantidad = () => {
  if (cantidad.value > 1) cantidad.value--
}

const agregarAlCarrito = () => {
  const med = medicamento.value
  const cant = cantidad.value

  if (cant <= 0) {
    alert('Por favor, ingresa una cantidad mayor a 0.')
    return
  }
  if (cant > med.stock) {
    alert(`No puedes agregar ${cant} unidades. Solo quedan ${med.stock} disponibles.`)
    return
  }

  let carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]')
  const existe = carrito.find(item => item.id === med.id)

  if (existe) {
    const nuevaCantidad = existe.cantidad + cant
    if (nuevaCantidad <= med.stock) {
      existe.cantidad = nuevaCantidad
    } else {
      alert(`Ya tienes ${existe.cantidad} unidades en el carrito. No puedes superar el stock disponible (${med.stock}).`)
      return
    }
  } else {
    carrito.push({ ...med, cantidad: cant })
  }

  sessionStorage.setItem('carrito', JSON.stringify(carrito))
  alert(`✅ ${cant}x ${med.nombre} agregado(s) al carrito.`)
  cantidad.value = 1
}

const volver = () => {
  router.push('/inicio')
}

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
  try {
    const res = await fetch(`${apiBase}/medicamentos/${route.params.id}`, { credentials: 'include' })
    if (!res.ok) {
      if (res.status === 404) throw new Error('Medicamento no encontrado.')
      throw new Error('Error al cargar el medicamento.')
    }
    const data = await res.json()
    medicamento.value = data
    cantidad.value = 1
  } catch (err) {
    error.value = err.message
  } finally {
    cargando.value = false
  }
})
</script>

<style scoped>
.detail-wrapper {
  --bg-main: #f3f4f6;
  --bg-card: #ffffff;
  --primary: #0d9488;
  --primary-hover: #0f766e;
  --text-main: #1f2937;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;

  font-family: 'Segoe UI', system-ui, sans-serif;
  background-color: var(--bg-main);
  color: var(--text-main);
  min-height: 100vh;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
}

.detail-header {
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

.btn-back:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

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
  color: var(--danger);
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

.nav-menu-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--text-main);
  cursor: pointer;
  transition: color 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-menu-title:hover { color: var(--primary); }

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

.cart-badge {
  background-color: var(--danger);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 50%;
  margin-left: 0.25rem;
  line-height: 1.2;
}

.nav-icon { width: 1.1rem; height: 1.1rem; }

.loading-state, .error-state {
  text-align: center;
  padding: 3rem;
  background: var(--bg-card);
  border-radius: 14px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  color: var(--text-muted);
}

.error-state p { color: var(--danger); font-weight: 600; margin-bottom: 1rem; }

.detail-card {
  background: var(--bg-card);
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  max-width: 700px;
  margin: 0 auto;
}

.detail-top {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.detail-icon {
  width: 4rem;
  height: 4rem;
  background-color: #ccfbf1;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-pill-icon { width: 2.2rem; height: 2.2rem; opacity: 0.8; }

.detail-titles { display: flex; flex-direction: column; gap: 0.35rem; }

.detail-name {
  font-size: 1.6rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.detail-categoria {
  font-size: 0.8rem;
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-weight: 600;
  align-self: flex-start;
}

.detail-desc-section {
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}

.detail-desc {
  margin: 0;
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.5;
}

.detail-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.info-value {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
}

.info-price { color: var(--primary); font-size: 1.4rem; }

.text-warning { color: #b45309; }
.text-danger { color: var(--danger); }

.receta-badge {
  display: inline-block;
  padding: 0.2rem 0.7rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
}

.receta-si { background-color: #fee2e2; color: #991b1b; }
.receta-no { background-color: #d1fae5; color: #065f46; }

.badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; align-self: flex-start; }
.badge-success { background-color: #d1fae5; color: #065f46; }
.badge-warning { background-color: #fef3c7; color: #92400e; }
.badge-danger { background-color: #fee2e2; color: #991b1b; }

.detail-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.detail-qty-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.qty-controls {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.btn-qty {
  background: none;
  border: none;
  padding: 0.5rem 0.75rem;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  color: var(--text-main);
  transition: background 0.15s;
}

.btn-qty:hover { background-color: #f3f4f6; }

.qty-input-detail {
  width: 60px;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  padding: 0.45rem 0.5rem;
  outline: none;
}

.btn-add-cart-detail {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s ease;
}

.btn-add-cart-detail:hover { background-color: var(--primary-hover); }

.no-stock-msg {
  text-align: center;
  padding: 2rem;
  color: var(--danger);
  font-weight: 600;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 600px) {
  .detail-wrapper { padding: 1rem; }
  .detail-info-grid { grid-template-columns: 1fr; }
  .detail-actions { flex-direction: column; }
  .detail-top { flex-direction: column; text-align: center; }
  .detail-titles { align-items: center; }
  .detail-categoria { align-self: center; }
  .badge { align-self: center; }
}
</style>
