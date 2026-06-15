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
          <img src="/images/pepito.jpeg" class="nav-icon icon-img" alt="Farmacia" /> Farmacia
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

    <div v-else-if="medicamento" class="product-layout">
      <div class="product-image-col">
        <div class="product-image-container">
          <img src="/images/pastiloca.jpeg" class="product-main-img" alt="Medicamento" />
        </div>
      </div>

      <div class="product-info-col">
        <div class="breadcrumbs">
          <span @click="irAInicio" class="breadcrumb-link">Inicio</span>
          <span class="breadcrumb-sep">/</span>
          <span @click="irAInicio" class="breadcrumb-link">Farmacia</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">{{ medicamento.nombre }}</span>
        </div>

        <h1 class="product-title">{{ medicamento.nombre }}</h1>
        <p class="product-sku">SKU: MED-{{ String(medicamento.id).padStart(4, '0') }}</p>

        <div style="display:flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <div class="discount-badge" v-if="descuento > 0">-{{ descuento }}%</div>
          <span v-if="medicamento.receta_obligatoria" class="receta-badge-detail"><img src="/images/clipboard.svg" class="icon-img" alt="" style="width:0.85rem;height:0.85rem;vertical-align:middle;margin-right:0.3rem;" /> Requiere Receta</span>
        </div>

        <div class="stock-table">
          <div class="stock-table-row stock-table-header">
            <span class="stock-table-cell">Sucursal</span>
            <span class="stock-table-cell">Stock</span>
            <span class="stock-table-cell">Estado</span>
          </div>
          <div class="stock-table-row">
            <span class="stock-table-cell">Casa Matriz</span>
            <span class="stock-table-cell">{{ medicamento.stock }} unid.</span>
            <span class="stock-table-cell">
              <span :class="stockBadge">{{ stockStatusText }}</span>
            </span>
          </div>
        </div>

        <div class="prices-section">
          <span v-if="descuento > 0" class="old-price">${{ precioOriginal.toLocaleString('es-CL') }}</span>
          <span class="current-price">${{ parseFloat(medicamento.precio).toLocaleString('es-CL') }}</span>
        </div>

        <div class="purchase-row">
          <div class="qty-controls">
            <button @click="decrementarCantidad" class="btn-qty">−</button>
            <input type="number" v-model.number="cantidad" min="1" :max="medicamento.stock" class="qty-input-detail" readonly />
            <button @click="incrementarCantidad" class="btn-qty">+</button>
          </div>
          <button @click="agregarAlCarrito" class="btn-add-cart-detail" :disabled="medicamento.stock <= 0">
            Agregar al carro
          </button>
        </div>

        <div class="important-section">
          <p><strong>Descripción:</strong> {{ medicamento.descripcion || 'Sin descripción disponible.' }}</p>
        </div>
      </div>
    </div>
    <PharmacyFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const apiBase = useApiBase()
const api = useApiFetch()

const route = useRoute()
const router = useRouter()
const medicamento = ref(null)
const cargando = ref(true)
const error = ref('')
const usuarioActivo = ref('Operador')
const cantidad = ref(1)

const stockBadge = computed(() => {
  if (!medicamento.value) return 'badge badge-danger'
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

const descuento = computed(() => {
  if (!medicamento.value) return 0
  return Math.floor(Math.random() * 15) + 5
})

const precioOriginal = computed(() => {
  if (!medicamento.value) return 0
  const desc = descuento.value
  return Math.round(parseFloat(medicamento.value.precio) / (1 - desc / 100))
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
    await api.post('/auth/logout')
  } catch (_) { }
  sessionStorage.clear()
  router.push('/')
}

onMounted(async () => {
  try {
    const res = await api.get(`/medicamentos/${route.params.id}`)
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
  --orange: #ea580c;
  --orange-light: #fff7ed;
  --orange-border: #fed7aa;

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

.btn-back:hover { background-color: #f3f4f6; border-color: #d1d5db; }

.header-actions { display: flex; align-items: center; gap: 1rem; }

.btn-user-profile {
  display: flex; align-items: center; gap: 0.5rem;
  background-color: #f3f4f6; color: var(--text-main);
  border: 1px solid var(--border-color); padding: 0.5rem 1rem;
  border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: default;
}

.user-icon { width: 1.1rem; height: 1.1rem; background-color: #e5e7eb; padding: 0.2rem 0.4rem; border-radius: 50%; }
.user-name { max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.btn-logout {
  display: flex; align-items: center; gap: 0.5rem;
  background-color: #fee2e2; color: #ef4444; border: none;
  padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;
  font-weight: 600; font-size: 0.9rem; transition: all 0.2s ease;
}

.btn-logout:hover { background-color: #fca5a5; }

.main-navbar {
  background-color: var(--bg-card);
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  margin-bottom: 1.5rem;
}

.nav-list { list-style: none; padding: 0; margin: 0; display: flex; gap: 1.5rem; }

.nav-menu-title {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 0.8rem; border-radius: 6px; font-weight: 700;
  font-size: 0.85rem; color: var(--text-main); cursor: pointer;
  transition: color 0.2s ease; text-transform: uppercase; letter-spacing: 0.05em;
}

.nav-menu-title:hover { color: var(--primary); }

.nav-item {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 0.8rem; border-radius: 6px; font-weight: 600;
  font-size: 0.9rem; color: var(--text-muted); cursor: pointer; transition: all 0.2s ease;
}

.nav-item:hover { color: var(--primary); }
.nav-item.active { color: var(--primary); background-color: #ccfbf1; }

.cart-badge {
  background-color: #ef4444; color: white; font-size: 0.7rem;
  font-weight: 700; padding: 0.1rem 0.45rem; border-radius: 50%;
  margin-left: 0.25rem; line-height: 1.2;
}

.nav-icon { width: 1.1rem; height: 1.1rem; }

.loading-state, .error-state {
  text-align: center; padding: 3rem;
  background: var(--bg-card); border-radius: 14px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  color: var(--text-muted);
}

.error-state p { color: #ef4444; font-weight: 600; margin-bottom: 1rem; }

.product-layout {
  display: flex;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  align-items: flex-start;
}

.product-image-col {
  flex: 0 0 40%;
  position: sticky;
  top: 1.5rem;
}

.product-image-container {
  background: var(--bg-card);
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.product-image-container:hover {
  transform: scale(1.01);
  box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.12);
}

.product-main-img {
  width: 90%;
  height: 90%;
  object-fit: contain;
}

.product-info-col {
  flex: 1;
  background: var(--bg-card);
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.breadcrumbs {
  font-size: 0.8rem;
  color: var(--text-muted);
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.breadcrumb-link {
  cursor: pointer;
  transition: color 0.2s;
}

.breadcrumb-link:hover { color: var(--primary); }

.breadcrumb-sep { color: #d1d5db; }

.breadcrumb-current { color: var(--text-muted); font-weight: 600; }

.product-title {
  font-size: 1.6rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #111827;
  margin: 0;
  line-height: 1.2;
}

.product-sku {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0;
}

.discount-badge {
  display: inline-block;
  background-color: var(--orange);
  color: white;
  font-weight: 800;
  font-size: 0.9rem;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  align-self: flex-start;
}

.receta-badge-detail {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 700;
  background: #fef3c7;
  color: #92400e;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
}

.stock-table {
  border: 1.5px solid var(--orange-border);
  border-radius: 8px;
  overflow: hidden;
}

.stock-table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
}

.stock-table-header {
  background-color: var(--orange-light);
  font-weight: 700;
  color: #9a3412;
  border-bottom: 1px solid var(--orange-border);
}

.stock-table-cell {
  display: flex;
  align-items: center;
}

.prices-section {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.old-price {
  font-size: 0.95rem;
  color: var(--text-muted);
  text-decoration: line-through;
}

.current-price {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--orange);
}

.purchase-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.qty-controls {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
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
  background-color: var(--orange);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s ease;
}

.btn-add-cart-detail:hover { background-color: #c2410c; }
.btn-add-cart-detail:disabled { opacity: 0.5; cursor: not-allowed; }

.important-section {
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-top: 0.5rem;
}

.important-section p { margin: 0; }

.badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
}

.badge-success { background-color: #d1fae5; color: #065f46; }
.badge-warning { background-color: #fef3c7; color: #92400e; }
.badge-danger { background-color: #fee2e2; color: #991b1b; }

@media (max-width: 768px) {
  .product-layout { flex-direction: column; }
  .product-image-col { flex: none; width: 100%; position: static; }
  .product-image-container { aspect-ratio: auto; padding: 1.5rem; }
  .product-main-img { width: 6rem; height: 6rem; }
}

@media (max-width: 600px) {
  .detail-wrapper { padding: 1rem; }
  .purchase-row { flex-direction: column; }
  .btn-add-cart-detail { width: 100%; }
}
</style>
