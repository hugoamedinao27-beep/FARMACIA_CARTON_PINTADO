<template>
  <div class="dashboard-wrapper">
    <header class="main-header">
      <div class="header-brand">
        <img src="/images/pepito.jpeg" class="brand-icon icon-img" alt="Farmacia" />
        <div>
          <h1>Farmacia carton pintado</h1>
          <p class="subtitle"><img src="/images/medical-cross.svg" class="subtitle-icon" alt="" style="width:0.65rem;height:0.65rem;vertical-align:middle;margin-right:0.3rem;opacity:0.6;" /> Cartón Pintado • Panel de Ventas</p>
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

<nav class="main-navbar">
      <ul class="nav-list">
        <li @click="irAlMenu" class="nav-menu-title">
          <img src="/images/clipboard.svg" class="nav-icon icon-img" alt="Menú" />
          <span class="nav-text">Menú</span>
        </li>
        
        <li @click="irAlInicio" class="nav-item">
          <img src="/images/pepito.jpeg" class="nav-icon icon-img" alt="Farmacia" />
          <span class="nav-text">Farmacia</span>
        </li>
        
        <li @click="irAReportes" class="nav-item">
          <img src="/images/chart-bar.svg" class="nav-icon icon-img" alt="Reportes" />
          <span class="nav-text">Reportes</span>
        </li>

        <li class="nav-item active">
          <img src="/images/shopping-cart.svg" class="nav-icon icon-img" alt="Carrito" />
          <span class="nav-text">Carrito</span>
          <span v-if="carrito.length > 0" class="cart-badge">{{ carrito.length }}</span>
        </li>
      </ul>
    </nav>

    <section class="card-section cart-section">
      <div class="section-header">
        <h2><img src="/images/shopping-cart.svg" class="icon-img" alt="" style="width:1.2rem;height:1.2rem;vertical-align:middle;margin-right:0.3rem;" />Carrito de Venta</h2>
        <span v-if="carrito.length > 0" class="items-count">{{ carrito.length }} items</span>
      </div>

      <div v-if="carrito.length === 0" class="empty-cart-state">
        <img src="/images/shopping-bag.svg" class="empty-icon icon-img" alt="" style="width:3rem;height:3rem;" />
        <p>No has seleccionado ningún fármaco para la venta.</p>
        <button @click="irAlInicio" class="btn-add-new-med" style="margin-top:1rem;">
          <img src="/images/home.svg" class="icon-img" alt="" style="width:1em;height:1em;vertical-align:middle;margin-right:0.2rem;" /> Ir al Inventario
        </button>
      </div>

      <div v-else class="cart-content">
        <ul class="cart-items-list">
          <li v-for="item in carrito" :key="item.id" class="cart-item">
            <div class="item-details">
              <span class="item-title">{{ item.nombre }}</span>
              <span class="item-subtotal">
                ${{ (item.precio * item.cantidad).toLocaleString('es-CL') }}
              </span>
            </div>

            <div class="item-controls">
              <div class="quantity-selector">
                <button @click="decrementarCantidad(item)" class="btn-qty-adj"><img src="/images/minus.svg" class="icon-img" alt="-" style="width:1rem;height:1rem;" /></button>
                <input type="number" v-model.number="item.cantidad" min="1" :max="item.stock" class="qty-input" readonly />
                <button @click="incrementarCantidad(item)" class="btn-qty-adj">+</button>
              </div>
              <button @click="eliminarDelCarrito(item.id)" class="btn-delete-item" title="Eliminar"><img src="/images/x-mark.svg" class="icon-img" alt="Eliminar" style="width:1rem;height:1rem;" /></button>
            </div>
          </li>
        </ul>

        <div class="recipe-container" :class="{ 'recipe-required-active': requiereReceta }">
          <label class="recipe-checkbox-label">
            <input type="checkbox" v-model="requiereReceta" />
            <div class="checkbox-text">
              <strong>¿Requiere Receta Retenida?</strong>
              <p>Obligatorio para ciertos compuestos controlados.</p>
            </div>
          </label>

          <transition name="fade">
            <div v-if="requiereReceta" class="recipe-field-group">
              <label for="recipe-folio">Número de Receta Médica (Folio):</label>
              <input
                id="recipe-folio"
                type="text"
                v-model="numeroReceta"
                placeholder="Ej: REC-2026-XXXX"
                class="modern-input"
              />
            </div>
          </transition>
        </div>

        <div class="checkout-summary">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${{ calcularTotal.toLocaleString('es-CL') }}</span>
          </div>
          <div class="summary-row total-row">
            <span>Total Venta</span>
            <span class="total-amount">${{ calcularTotal.toLocaleString('es-CL') }}</span>
          </div>
        </div>

        <button @click="procesarVentaTransaccional" :disabled="procesando" class="btn-primary-checkout">
          <span v-if="!procesando"><img src="/images/bolt.svg" class="icon-img" alt="" style="width:1.2rem;height:1.2rem;vertical-align:middle;margin-right:0.3rem;" /> Confirmar Venta (Commit)</span>
          <span v-else>Procesando transacción...</span>
        </button>
      </div>
    </section>
  </div>
  <PharmacyFooter />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
const apiBase = useApiBase()

const router = useRouter()
const carrito = ref([])
const requiereReceta = ref(false)
const numeroReceta = ref('')
const procesando = ref(false)
const usuarioActivo = ref('Operador')

const guardarCarrito = () => {
  sessionStorage.setItem('carrito', JSON.stringify(carrito.value))
}

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

  const carritoGuardado = sessionStorage.getItem('carrito')
  if (carritoGuardado) {
    carrito.value = JSON.parse(carritoGuardado)
  }

  requiereReceta.value = carrito.value.some(item => item.receta_obligatoria)
})

watch(carrito, guardarCarrito, { deep: true })

const irAlMenu = () => {
  router.push('/menu')
}

const irAlInicio = () => {
  router.push('/inicio')
}

const irAReportes = () => {
  router.push('/reportes')
}

const incrementarCantidad = (item) => {
  if (item.cantidad < item.stock) {
    item.cantidad++
    guardarCarrito()
  }
}

const decrementarCantidad = (item) => {
  if (item.cantidad > 1) {
    item.cantidad--
    guardarCarrito()
  }
}

const eliminarDelCarrito = (id) => {
  carrito.value = carrito.value.filter(item => item.id !== id)
  requiereReceta.value = carrito.value.some(item => item.receta_obligatoria)
  guardarCarrito()
}

const calcularTotal = computed(() => {
  return carrito.value.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
})

const procesarVentaTransaccional = async () => {
  if (requiereReceta.value && !numeroReceta.value.trim()) {
    alert('⚠️ Error Regulatorio: Debe ingresar el número de receta médica obligatoria.')
    return
  }

  procesando.value = true

  const payload = {
    numero_receta: requiereReceta.value ? numeroReceta.value : null,
    productos: carrito.value.map(item => ({ id: item.id, cantidad: item.cantidad }))
  }

  try {
    const res = await fetch(`${apiBase}/ventas`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error al procesar la venta.')

    alert('✅ Venta procesada con éxito y stock actualizado.')
    carrito.value = []
    numeroReceta.value = ''
    requiereReceta.value = false
    guardarCarrito()
  } catch (err) {
    alert('💥 Error en Transacción: ' + err.message)
  } finally {
    procesando.value = false
  }
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
.dashboard-wrapper {
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

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-card);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
}

.header-brand { display: flex; align-items: center; gap: 1rem; }
.brand-icon { width: 2rem; height: 2rem; background: transparent; padding: 0; border-radius: 10px; object-fit: contain; }
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

.nav-menu-title:hover {
  color: var(--primary);
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

.nav-item.active {
  color: var(--primary);
  background-color: #ccfbf1;
}

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
.icon-img { display: inline-block; vertical-align: middle; }

.card-section {
  background-color: var(--bg-card);
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  max-width: 700px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.75rem;
}

.section-header h2 { font-size: 1.15rem; margin: 0; color: #374151; }

.items-count { font-size: 0.85rem; background-color: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 20px; color: var(--text-muted); font-weight: 500; }

.empty-cart-state { text-align: center; padding: 3rem 1rem; color: var(--text-muted); }
.empty-icon { margin-bottom: 1rem; opacity: 0.6; }

.btn-add-new-med {
  background-color: #ccfbf1;
  color: var(--primary-hover);
  border: 1px solid #99f6e4;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-add-new-med:hover { background-color: #99f6e4; transform: translateY(-1px); }

.cart-items-list { list-style: none; padding: 0; margin: 0; }

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  border-radius: 8px;
  transition: background 0.15s ease;
}
.cart-item:hover { background-color: #f9fafb; }

.item-details { display: flex; flex-direction: column; gap: 0.25rem; }
.item-title { font-weight: 600; font-size: 0.95rem; color: #111827; }
.item-subtotal { font-weight: 700; color: var(--primary); font-size: 0.9rem; }

.item-controls { display: flex; align-items: center; gap: 0.75rem; }

.quantity-selector {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}

.btn-qty-adj {
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  color: var(--primary);
  border-radius: 6px;
  transition: background 0.15s ease;
}
.btn-qty-adj:hover { background-color: #ccfbf1; }

.qty-input { width: 35px; border: none; background: transparent; text-align: center; font-weight: 700; font-size: 0.9rem; color: #1f2937; }

.btn-delete-item { background: none; border: none; color: #9ca3af; cursor: pointer; padding: 0.3rem; border-radius: 50%; transition: all 0.15s ease; }
.btn-delete-item:hover { color: var(--danger); background-color: #fee2e2; }

.recipe-container { margin-top: 1.5rem; background-color: #f9fafb; border: 1px solid var(--border-color); border-radius: 10px; padding: 1rem; }

.recipe-required-active { border-color: #f59e0b; background-color: #fffbeb; }

.recipe-checkbox-label { display: flex; gap: 0.75rem; cursor: pointer; align-items: center; }
.checkbox-text strong { font-size: 0.9rem; color: #374151; }
.checkbox-text p { margin: 0; font-size: 0.75rem; color: var(--text-muted); }

.recipe-field-group { margin-top: 1rem; padding-top: 0.75rem; border-top: 1px dashed #d1d5db; }
.recipe-field-group label { display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.35rem; }

.modern-input { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box; }

.checkout-summary {
  margin-top: 1.5rem;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
}

.summary-row { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.5rem; color: #4b5563; }
.total-row { border-top: 2px solid var(--primary); padding-top: 0.75rem; font-weight: bold; color: var(--text-main); font-size: 1.1rem; }
.total-amount { font-size: 1.5rem; color: var(--primary); }

.btn-primary-checkout {
  width: 100%;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.9rem;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1.25rem;
  box-shadow: 0 4px 10px -2px rgba(13, 148, 136, 0.3);
  transition: all 0.2s ease;
}

.btn-primary-checkout:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 16px -4px rgba(13, 148, 136, 0.35); }
.btn-primary-checkout:disabled { background: #9ca3af; cursor: not-allowed; box-shadow: none; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
