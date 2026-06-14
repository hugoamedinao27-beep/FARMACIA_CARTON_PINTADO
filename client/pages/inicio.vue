<template>
  <div class="dashboard-wrapper">
    <header class="main-header">
      <div class="header-brand">
        <img src="/images/pill.svg" class="brand-icon icon-img" alt="Farmacia" />
        <div>
          <h1>Farmacia carton pintado</h1>
          <p class="subtitle">Cartón Pintado • Inventario</p>
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
        
        <li class="nav-item active">
          <img src="/images/pill.svg" class="nav-icon icon-img" alt="Farmacia" />
          <span class="nav-text">Farmacia</span>
        </li>
        
        <li @click="irAReportes" class="nav-item">
          <img src="/images/chart-bar.svg" class="nav-icon icon-img" alt="Reportes" />
          <span class="nav-text">Reportes</span>
        </li>

        <li @click="irAlCarrito" class="nav-item">
          <img src="/images/shopping-cart.svg" class="nav-icon icon-img" alt="Carrito" />
          <span class="nav-text">Carrito</span>
          <span v-if="itemsEnCarrito > 0" class="cart-badge">{{ itemsEnCarrito }}</span>
        </li>
      </ul>
    </nav>

    <section class="card-section catalog-section">
      <div class="section-header">
        <div class="header-title-container">
          <h2><img src="/images/clipboard.svg" class="icon-img" alt="" style="width:1.2rem;height:1.2rem;vertical-align:middle;margin-right:0.3rem;" />Inventario Disponible en Sala</h2>
          <span class="items-count">{{ medicamentosFiltrados.length }} Fármacos</span>
        </div>
        <button @click="abrirCreador" class="btn-add-new-med">
          <img src="/images/plus.svg" class="icon-img" alt="" style="width:1em;height:1em;vertical-align:middle;margin-right:0.2rem;" /> Nuevo Medicamento
        </button>
      </div>

      <div class="search-bar-container">
        <div class="search-input-wrapper">
          <img src="/images/magnifying-glass.svg" class="search-icon icon-img" alt="Buscar" />
          <input v-model="busqueda" type="text" placeholder="Buscar por nombre de fármaco..." class="modern-input search-input" />
        </div>
        <select v-model="filtroStock" class="modern-input stock-filter-select">
          <option value="">Todos los stocks</option>
          <option value="bajo">Stock bajo (≤ mínimo)</option>
          <option value="critico">Sin stock</option>
        </select>
      </div>

      <div class="med-grid">
        <div
          v-for="med in medicamentosFiltrados"
          :key="med.id"
          class="med-card"
          :class="{ 'card-warning': med.stock <= med.stock_minimo && med.stock > 0, 'card-danger': med.stock <= 0 }"
        >
          <div class="card-badge-container">
            <button @click="abrirEditor(med)" class="btn-edit-inline" title="Editar Medicamento"><img src="/images/pencil.svg" class="icon-img" alt="Editar" style="width:1em;height:1em;" /></button>
            <span :class="badgeClass(med)">
              {{ stockStatusText(med) }}
            </span>
          </div>

          <div class="card-body">
            <img src="/images/pill.svg" class="med-icon-box icon-img" alt="Medicamento" />
            <h3 class="med-name">{{ med.nombre }}</h3>
            <span v-if="med.categoria" class="med-categoria">{{ med.categoria }}</span>
            <p class="price-tag">${{ parseFloat(med.precio).toLocaleString('es-CL') }}</p>

            <div class="stock-info">
              <span class="stock-label">Stock:</span>
              <span class="stock-number">{{ med.stock }}</span>
              <span class="stock-unit">unid.</span>
            </div>

            <div class="med-min-alert" v-if="med.stock <= med.stock_minimo && med.stock > 0">
              <img src="/images/exclamation-triangle.svg" class="icon-img" alt="" style="width:0.9rem;height:0.9rem;vertical-align:middle;margin-right:0.2rem;" />Mínimo req: {{ med.stock_minimo }}
            </div>
          </div>

          <div class="card-footer">
            <div v-if="med.stock > 0" class="quantity-selector-container">
              <label :for="'qty-' + med.id">Cant:</label>
              <input 
                :id="'qty-' + med.id"
                type="number" 
                v-model.number="med.cantidadSeleccionada" 
                min="1" 
                :max="med.stock"
                class="modern-input qty-input"
              />
            </div>

            <button
              @click="agregarAlCarrito(med)"
              :disabled="med.stock <= 0"
              class="btn-action-add-card"
            >
              <template v-if="med.stock > 0"><img src="/images/plus.svg" class="icon-img" alt="" style="width:0.9rem;height:0.9rem;vertical-align:middle;margin-right:0.2rem;" /> Agregar al Carrito</template><template v-else>Sin Stock</template>
            </button>
          </div>
        </div>
      </div>
    </section>

    <transition name="fade">
      <div v-if="mostrarModalEditar" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h3><template v-if="esModoEdicion"><img src="/images/pencil.svg" class="icon-img" alt="" style="width:1.2rem;height:1.2rem;vertical-align:middle;margin-right:0.3rem;" /> Editar Medicamento</template><template v-else><img src="/images/sparkles.svg" class="icon-img" alt="" style="width:1.2rem;height:1.2rem;vertical-align:middle;margin-right:0.3rem;" /> Agregar Nuevo Medicamento</template></h3>
            <button @click="cerrarEditor" class="btn-close-modal"><img src="/images/x-mark.svg" class="icon-img" alt="Cerrar" style="width:1.1rem;height:1.1rem;" /></button>
          </div>

          <form @submit.prevent="guardarCambiosMedicamiento" class="modal-form">
            <div class="form-group">
              <label>Nombre del Fármaco:</label>
              <input type="text" v-model="medEditando.nombre" required class="modern-input" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Precio ($):</label>
                <input type="number" v-model.number="medEditando.precio" min="0" required class="modern-input" />
              </div>
              <div class="form-group">
                <label>Stock Actual:</label>
                <input type="number" v-model.number="medEditando.stock" min="0" required class="modern-input" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Stock Mínimo:</label>
                <input type="number" v-model.number="medEditando.stock_minimo" min="0" required class="modern-input" />
              </div>
              <div class="form-group">
                <label>Categoría:</label>
                <select v-model="medEditando.categoria" class="modern-input">
                  <option value="General">General</option>
                  <option value="Analgésico">Analgésico</option>
                  <option value="Antiinflamatorio">Antiinflamatorio</option>
                  <option value="Antibiótico">Antibiótico</option>
                  <option value="Antihistamínico">Antihistamínico</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Digestivo">Digestivo</option>
                  <option value="Respiratorio">Respiratorio</option>
                  <option value="Neurológico">Neurológico</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Descripción:</label>
              <textarea v-model="medEditando.descripcion" class="modern-input textarea-input" placeholder="Descripción del medicamento..." rows="2"></textarea>
            </div>

            <div class="form-group checkbox-group">
              <label class="recipe-checkbox-label">
                <input type="checkbox" v-model="medEditando.receta_obligatoria" />
                <span>¿Receta Obligatoria?</span>
              </label>
            </div>

            <div class="modal-actions" :class="{ 'has-delete-btn': esModoEdicion }">
              <button
                v-if="esModoEdicion"
                type="button"
                @click="eliminarMedicamento(medEditando.id)"
                :disabled="guardando"
                class="btn-danger-outline"
              >
                <img src="/images/trash.svg" class="icon-img" alt="" style="width:1em;height:1em;vertical-align:middle;margin-right:0.2rem;" /> Eliminar Fármaco
              </button>

              <div class="actions-right">
                <button type="button" @click="cerrarEditor" class="btn-secondary">Cancelar</button>
                <button type="submit" :disabled="guardando" class="btn-primary-checkout margin-reset">
                <template v-if="guardando">Guardando...</template>
                <template v-else-if="esModoEdicion"><img src="/images/floppy-disk.svg" class="icon-img" alt="" style="width:1em;height:1em;vertical-align:middle;margin-right:0.2rem;" /> Guardar Cambios</template>
                <template v-else><img src="/images/plus.svg" class="icon-img" alt="" style="width:1em;height:1em;vertical-align:middle;margin-right:0.2rem;" /> Crear Medicamento</template>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const apiBase = useApiBase()

const router = useRouter()
const medicamentos = ref([])
const usuarioActivo = ref('Operador')
const busqueda = ref('')
const filtroStock = ref('')

const mostrarModalEditar = ref(false)
const guardando = ref(false)
const esModoEdicion = ref(false)

const medEditando = ref({
  id: null,
  nombre: '',
  precio: 0,
  stock: 0,
  stock_minimo: 0,
  receta_obligatoria: false,
  categoria: 'General',
  descripcion: ''
})

const obtenerMedicamentos = async () => {
  try {
    const res = await fetch(`${apiBase}/medicamentos`, { credentials: 'include' })
    if (!res.ok) throw new Error('Error al obtener el catálogo')
    const data = await res.json()
    
    // Guardamos los medicamentos agregando por defecto 'cantidadSeleccionada: 1'
    medicamentos.value = data.map(med => ({
      ...med,
      cantidadSeleccionada: 1
    }))
  } catch (err) {
    alert('No se pudo conectar con la base de datos: ' + err.message)
  }
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

  obtenerMedicamentos()
})

const medicamentosFiltrados = computed(() => {
  let lista = medicamentos.value
  if (busqueda.value) {
    const q = busqueda.value.toLowerCase()
    lista = lista.filter(m => m.nombre.toLowerCase().includes(q))
  }
  if (filtroStock.value === 'bajo') {
    lista = lista.filter(m => m.stock <= m.stock_minimo && m.stock > 0)
  } else if (filtroStock.value === 'critico') {
    lista = lista.filter(m => m.stock <= 0)
  }
  return lista
})

const itemsEnCarrito = computed(() => {
  const carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]')
  return carrito.reduce((sum, item) => sum + item.cantidad, 0)
})

const irAlMenu = () => {
  router.push('/menu')
}

const irAReportes = () => {
  router.push('/reportes')
}

const irAlCarrito = () => {
  router.push('/dashboard')
}

const abrirCreador = () => {
  esModoEdicion.value = false
  medEditando.value = { id: null, nombre: '', precio: 0, stock: 0, stock_minimo: 0, receta_obligatoria: false, categoria: 'General', descripcion: '' }
  mostrarModalEditar.value = true
}

const abrirEditor = (med) => {
  esModoEdicion.value = true
  medEditando.value = { ...med, receta_obligatoria: !!med.receta_obligatoria }
  mostrarModalEditar.value = true
}

const cerrarEditor = () => {
  mostrarModalEditar.value = false
  medEditando.value = { id: null, nombre: '', precio: 0, stock: 0, stock_minimo: 0, receta_obligatoria: false, categoria: 'General', descripcion: '' }
}

const guardarCambiosMedicamiento = async () => {
  guardando.value = true
  const url = esModoEdicion.value
    ? `${apiBase}/medicamentos/${medEditando.value.id}`
    : `${apiBase}/medicamentos`

  const metodo = esModoEdicion.value ? 'PUT' : 'POST'

  try {
    const res = await fetch(url, {
      method: metodo,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...medEditando.value,
        precio: Number(medEditando.value.precio),
        stock: Number(medEditando.value.stock),
        stock_minimo: Number(medEditando.value.stock_minimo)
      })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error al procesar la solicitud.')

    alert(esModoEdicion.value ? '✅ Medicamento actualizado correctamente.' : '✨ Nuevo medicamento registrado con éxito.')
    cerrarEditor()
    await obtenerMedicamentos()
  } catch (err) {
    alert('💥 Error al procesar cambios: ' + err.message)
  } finally {
    guardando.value = false
  }
}

const eliminarMedicamento = async (id) => {
  const confirmar = confirm('¿Está seguro de que desea eliminar este fármaco permanentemente del sistema?')
  if (!confirmar) return

  guardando.value = true

  try {
    const res = await fetch(`${apiBase}/medicamentos/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    let data = {}
    if (res.status !== 204) data = await res.json()

    if (!res.ok) throw new Error(data.message || 'Error al eliminar el medicamento.')

    alert('🗑️ Medicamento eliminado correctamente.')
    cerrarEditor()
    await obtenerMedicamentos()
  } catch (err) {
    alert('💥 Error al eliminar: ' + err.message)
  } finally {
    guardando.value = false
  }
}

const agregarAlCarrito = (med) => {
  const cantidadALlevar = Math.floor(Number(med.cantidadSeleccionada)) || 1

  if (cantidadALlevar <= 0) {
    alert('❌ Por favor, ingresa una cantidad mayor a 0.')
    return
  }

  if (cantidadALlevar > med.stock) {
    alert(`❌ No puedes agregar ${cantidadALlevar} unidades. Solo quedan ${med.stock} disponibles.`)
    return
  }

  let carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]')
  const existe = carrito.find(item => item.id === med.id)

  if (existe) {
    const nuevaCantidad = existe.cantidad + cantidadALlevar
    if (nuevaCantidad <= med.stock) {
      existe.cantidad = nuevaCantidad
    } else {
      alert(`⚠️ Ya tienes ${existe.cantidad} unidades en el carrito. No puedes superar el stock disponible (${med.stock}).`)
      return
    }
  } else {
    carrito.push({ ...med, cantidad: cantidadALlevar })
  }

  sessionStorage.setItem('carrito', JSON.stringify(carrito))
  alert(`✅ ${cantidadALlevar}x ${med.nombre} agregado(s) al carrito.`)
  
  // Reiniciamos el selector numérico de la vista a 1
  med.cantidadSeleccionada = 1
}

const badgeClass = (med) => {
  if (med.stock <= 0) return 'badge badge-danger'
  if (med.stock <= med.stock_minimo) return 'badge badge-warning'
  return 'badge badge-success'
}

const stockStatusText = (med) => {
  if (med.stock <= 0) return 'Sin Stock'
  if (med.stock <= med.stock_minimo) return 'Stock Bajo'
  return 'Disponible'
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
.brand-icon { width: 2rem; height: 2rem; background: #ccfbf1; padding: 0.5rem; border-radius: 10px; object-fit: contain; }
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

.card-section {
  background-color: var(--bg-card);
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.75rem;
}

.header-title-container { display: flex; align-items: center; gap: 0.75rem; }
.section-header h2 { font-size: 1.15rem; margin: 0; color: #374151; }

.items-count { font-size: 0.85rem; background-color: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 20px; color: var(--text-muted); font-weight: 500; }

.search-bar-container {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: center;
}
.search-input-wrapper {
  position: relative;
  flex: 1;
}
.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0.9rem;
  height: 0.9rem;
  color: var(--text-muted);
}
.search-input {
  padding-left: 2.2rem !important;
}
.stock-filter-select {
  width: 200px;
}
.med-categoria {
  font-size: 0.7rem;
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.textarea-input {
  resize: vertical;
  font-family: inherit;
  min-height: 50px;
}

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

.med-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; max-height: 65vh; overflow-y: auto; padding: 0.5rem; }

.med-card { border: 1px solid var(--border-color); border-radius: 12px; background-color: #fff; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; min-height: 310px; transition: transform 0.2s ease, box-shadow 0.2s ease; }

.med-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }

.card-warning { border-color: rgba(245, 158, 11, 0.4); background-color: #fffbeb; }
.card-danger { border-color: rgba(239, 68, 68, 0.3); background-color: #fef2f2; }

.card-badge-container { position: absolute; top: 10px; right: 10px; z-index: 2; display: flex; gap: 0.5rem; align-items: center; }

.btn-edit-inline { background-color: rgba(255, 255, 255, 0.9); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; padding: 0.2rem 0.4rem; font-size: 0.85rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: background 0.2s; }

.btn-edit-inline:hover { background-color: #e5e7eb; }

.card-body { padding: 1.25rem 1.25rem 0.5rem 1.25rem; display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: 1rem; flex-grow: 1; }

.med-icon-box { width: 2.2rem; height: 2.2rem; margin-bottom: 0.25rem; opacity: 0.85; }

.med-name { font-size: 1.05rem; font-weight: 700; color: #111827; margin: 0 0 0.25rem 0; min-height: 2.4rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.price-tag { font-size: 1.2rem; font-weight: 800; color: var(--primary); margin: 0 0 0.25rem 0; }

.stock-info { font-size: 0.85rem; color: #4b5563; margin-bottom: 0.25rem; }

.stock-label { font-weight: 500; margin-right: 3px; }
.stock-number { font-weight: 700; }
.stock-unit { font-size: 0.75rem; color: var(--text-muted); }

.med-min-alert { font-size: 0.75rem; color: #b45309; background-color: #fef3c7; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 600; margin-top: 0.25rem; }

.card-footer { padding: 0.5rem 1rem 1rem 1rem; background: transparent; display: flex; flex-direction: column; gap: 0.5rem; }

.quantity-selector-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main);
}

.qty-input {
  width: 70px !important;
  padding: 0.3rem 0.5rem;
  text-align: center;
  font-weight: 700;
  border-color: var(--border-color);
}

.btn-action-add-card { width: 100%; background-color: var(--primary); color: white; border: none; padding: 0.65rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.85rem; transition: background 0.15s ease; }

.btn-action-add-card:hover:not(:disabled) { background-color: var(--primary-hover); }
.btn-action-add-card:disabled { background-color: #e5e7eb; color: #9ca3af; cursor: not-allowed; }

.badge { display: inline-block; padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; }
.badge-success { background-color: #d1fae5; color: #065f46; }
.badge-warning { background-color: #fef3c7; color: #92400e; }
.badge-danger { background-color: #fee2e2; color: #991b1b; }

.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 100; }

.modal-container { background-color: white; border-radius: 14px; width: 500px; max-width: 90%; padding: 1.5rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15); }

.modal-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 1rem; }

.modal-header h3 { margin: 0; font-size: 1.2rem; color: #1f2937; }
.btn-close-modal { background: none; border: none; cursor: pointer; color: var(--text-muted); line-height: 1; }
.icon-img { display: inline-block; vertical-align: middle; }
.modal-form { display: flex; flex-direction: column; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: #4b5563; }
.form-row { display: flex; gap: 1rem; }
.checkbox-group { justify-content: center; padding-top: 1.2rem; }

.modal-actions { display: flex; gap: 0.75rem; margin-top: 1rem; }
.modal-actions.has-delete-btn { justify-content: space-between; align-items: center; }
.actions-right { display: flex; gap: 0.75rem; }

.btn-secondary { background-color: #e5e7eb; color: #374151; border: none; padding: 0.65rem 1rem; border-radius: 8px; font-weight: 600; cursor: pointer; }

.btn-secondary:hover { background-color: #d1d5db; }

.btn-danger-outline { background: none; border: 1px solid var(--danger); color: var(--danger); padding: 0.65rem 1rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }

.btn-danger-outline:hover:not(:disabled) { background-color: #fee2e2; }

.btn-primary-checkout { width: 100%; background-color: var(--primary); color: white; border: none; border-radius: 8px; padding: 0.85rem; font-size: 1rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(13, 148, 136, 0.2); }

.btn-primary-checkout:hover:not(:disabled) { background-color: var(--primary-hover); }

.margin-reset { margin-top: 0 !important; width: auto !important; }

.modern-input { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>