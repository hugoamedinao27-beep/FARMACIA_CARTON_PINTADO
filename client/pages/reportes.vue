<template>
  <div class="dashboard-wrapper">
    <header class="main-header">
      <div class="header-brand">
        <img src="/images/pepito.jpeg" class="brand-icon icon-img" alt="Farmacia" />
        <div>
          <h1>Farmacia carton pintado</h1>
          <p class="subtitle"><img src="/images/medical-cross.svg" class="subtitle-icon" alt="" style="width:0.65rem;height:0.65rem;vertical-align:middle;margin-right:0.3rem;opacity:0.6;" /> Cartón Pintado • Reportes</p>
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
        <li class="nav-item active">
          <img src="/images/chart-bar.svg" class="nav-icon icon-img" alt="Reportes" />
          <span class="nav-text">Reportes</span>
        </li>
      </ul>
    </nav>

    <div v-if="cargando" class="empty-cart-state">
      <p>Cargando reportes...</p>
    </div>

    <div v-else-if="errorMsg" class="empty-cart-state">
      <img src="/images/exclamation-triangle.svg" class="empty-icon icon-img" alt="Error" style="width:2.5rem;height:2.5rem;" />
      <p>{{ errorMsg }}</p>
      <button @click="cargarReportes" class="btn-retry">Reintentar</button>
    </div>

    <div v-else class="reportes-grid">
      <div class="card-section report-card total-card">
        <img src="/images/package.svg" class="report-icon icon-img" alt="Ventas" />
        <div class="report-number">{{ reporte.totalVentas ?? 0 }}</div>
        <div class="report-label">Ventas Totales</div>
      </div>

      <div class="card-section report-card income-card">
        <img src="/images/banknotes.svg" class="report-icon icon-img" alt="Ingresos" />
        <div class="report-number">${{ formatMoney(reporte.ingresos) }}</div>
        <div class="report-label">Ingresos Totales</div>
      </div>

      <div class="card-section report-card recipe-card">
        <img src="/images/clipboard.svg" class="report-icon icon-img" alt="Receta" />
        <div class="report-number">{{ reporte.ventasConReceta ?? 0 }}</div>
        <div class="report-label">Ventas con Receta</div>
      </div>

      <div class="card-section report-card units-card">
        <img src="/images/chart-bar.svg" class="report-icon icon-img" alt="Unidades" />
        <div class="report-number">{{ (reporte.totalUnidadesVendidas ?? 0).toLocaleString('es-CL') }}</div>
        <div class="report-label">Unidades Vendidas</div>
      </div>

      <div class="card-section report-card avg-card">
        <img src="/images/arrow-trending-up.svg" class="report-icon icon-img" alt="Promedio" />
        <div class="report-number">${{ formatMoney(reporte.ventaPromedio) }}</div>
        <div class="report-label">Promedio por Venta</div>
      </div>

      <div class="card-section report-card distinct-card">
        <img src="/images/beaker.svg" class="report-icon icon-img" alt="Distintos" />
        <div class="report-number">{{ reporte.productosDistintosVendidos ?? 0 }}</div>
        <div class="report-label">Productos Distintos Vendidos</div>
      </div>

      <div class="card-section report-card today-sales-card">
        <img src="/images/clock.svg" class="report-icon icon-img" alt="Hoy" />
        <div class="report-number">{{ reporte.ventasHoy ?? 0 }}</div>
        <div class="report-label">Ventas Hoy</div>
      </div>

      <div class="card-section report-card today-income-card">
        <img src="/images/currency-dollar.svg" class="report-icon icon-img" alt="Ingresos hoy" />
        <div class="report-number">${{ formatMoney(reporte.ingresosHoy) }}</div>
        <div class="report-label">Ingresos Hoy</div>
      </div>

      <div class="card-section report-card" style="grid-column: 1 / -1;">
        <div class="section-header">
          <h2><img src="/images/trophy.svg" class="icon-img" alt="" style="width:1.2rem;height:1.2rem;vertical-align:middle;margin-right:0.3rem;" /> Medicamentos Más Vendidos</h2>
        </div>
        <table v-if="reporte.medicamentosMasVendidos && reporte.medicamentosMasVendidos.length" class="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicamento</th>
              <th>Unidades Vendidas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in reporte.medicamentosMasVendidos" :key="i">
              <td>{{ i + 1 }}</td>
              <td>{{ item.medicamento?.nombre || 'ID: ' + item.medicamentoId }}</td>
              <td>{{ item.total_vendido }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty-state-text">No hay datos de ventas todavía.</p>
      </div>
    </div>
    <PharmacyFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const apiBase = useApiBase()

const router = useRouter()
const usuarioActivo = ref('Operador')
const cargando = ref(true)
const errorMsg = ref('')
const reporte = ref({
  totalVentas: 0,
  ingresos: 0,
  ventasConReceta: 0,
  totalUnidadesVendidas: 0,
  ventaPromedio: 0,
  productosDistintosVendidos: 0,
  ventasHoy: 0,
  ingresosHoy: 0,
  medicamentosMasVendidos: []
})

const formatMoney = (val) => {
  const num = Number(val) || 0
  return num.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const cargarReportes = async () => {
  errorMsg.value = ''
  cargando.value = true

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
    alert('Acceso denegado.')
    router.push('/')
    return
  }

  const nombreGuardado = sessionStorage.getItem('user_name')
  if (nombreGuardado) usuarioActivo.value = nombreGuardado

  try {
    const res = await fetch(`${apiBase}/ventas/reporte`, { credentials: 'include' })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || `Error del servidor (${res.status})`)
    }
    reporte.value = await res.json()
  } catch (err) {
    errorMsg.value = 'No se pudieron cargar los reportes: ' + err.message
  } finally {
    cargando.value = false
  }
}

onMounted(cargarReportes)

const irAlMenu = () => router.push('/menu')
const irAlInicio = () => router.push('/inicio')

const cerrarSesion = async () => {
  try { await fetch(`${apiBase}/auth/logout`, { method: 'POST', credentials: 'include' }) } catch (_) { }
  sessionStorage.clear()
  router.push('/')
}
</script>

<style scoped>
.dashboard-wrapper {
  --bg-main: #f3f4f6; --bg-card: #ffffff; --primary: #0d9488;
  --primary-hover: #0f766e; --text-main: #1f2937; --text-muted: #6b7280;
  --border-color: #e5e7eb; --success: #10b981; --warning: #f59e0b; --danger: #ef4444;
  font-family: 'Segoe UI', system-ui, sans-serif;
  background-color: var(--bg-main); color: var(--text-main);
  min-height: 100vh; padding: 1.5rem 2rem; box-sizing: border-box;
}
.main-header { display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-card); padding: 1rem 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 1rem; }
.header-brand { display: flex; align-items: center; gap: 1rem; }
.brand-icon { width: 2rem; height: 2rem; background: transparent; padding: 0; border-radius: 10px; object-fit: contain; }
.main-header h1 { font-size: 1.35rem; margin: 0; color: var(--primary); font-weight: 700; }
.subtitle { margin: 0; font-size: 0.85rem; color: var(--text-muted); }
.header-actions { display: flex; align-items: center; gap: 1rem; }
.btn-user-profile { display: flex; align-items: center; gap: 0.5rem; background-color: #f3f4f6; color: var(--text-main); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: default; }
.user-icon { width: 1.1rem; height: 1.1rem; background-color: #e5e7eb; padding: 0.2rem 0.4rem; border-radius: 50%; }
.user-name { max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.btn-logout { display: flex; align-items: center; gap: 0.5rem; background-color: #fee2e2; color: var(--danger); border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem; transition: all 0.2s ease; }
.btn-logout:hover { background-color: #fca5a5; }
.main-navbar { background-color: var(--bg-card); padding: 0.6rem 1.5rem; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.03); margin-bottom: 1.5rem; }
.nav-list { list-style: none; padding: 0; margin: 0; display: flex; gap: 1.5rem; }
.nav-menu-title { display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.8rem; border-radius: 6px; font-weight: 700; font-size: 0.85rem; color: var(--text-main); cursor: pointer; transition: color 0.2s ease; text-transform: uppercase; letter-spacing: 0.05em; }
.nav-menu-title:hover { color: var(--primary); }
.nav-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.8rem; border-radius: 6px; font-weight: 600; font-size: 0.9rem; color: var(--text-muted); cursor: pointer; transition: all 0.2s ease; }
.nav-item.active { color: var(--primary); background-color: #ccfbf1; }
.nav-icon { width: 1.1rem; height: 1.1rem; }
.reportes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
.card-section { background-color: var(--bg-card); border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.06); transition: transform 0.2s ease, box-shadow 0.2s ease; }
.report-card { text-align: center; }
.report-card:hover { transform: translateY(-3px); box-shadow: 0 12px 24px -6px rgba(0,0,0,0.1); }
.report-icon { width: 2.5rem; height: 2.5rem; margin-bottom: 0.5rem; padding: 0.5rem; border-radius: 14px; background: #f3f4f6; }
.icon-img { display: inline-block; vertical-align: middle; }
.report-number { font-size: 2rem; font-weight: 800; color: var(--primary); }
.report-label { font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem; }
.total-card .report-icon { background: #dbeafe; }
.total-card .report-number { color: #2563eb; }
.income-card .report-icon { background: #ccfbf1; }
.income-card .report-number { color: var(--primary); }
.recipe-card .report-icon { background: #fef3c7; }
.recipe-card .report-number { color: #d97706; }
.units-card .report-icon { background: #ede9fe; }
.units-card .report-number { color: #7c3aed; }
.avg-card .report-icon { background: #fce7f3; }
.avg-card .report-number { color: #db2777; }
.distinct-card .report-icon { background: #ccfbf1; }
.distinct-card .report-number { color: #0d9488; }
.today-sales-card .report-icon { background: #ffedd5; }
.today-sales-card .report-number { color: #ea580c; }
.today-income-card .report-icon { background: #dcfce7; }
.today-income-card .report-number { color: #16a34a; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; }
.section-header h2 { font-size: 1.15rem; margin: 0; color: #374151; }
.report-table { width: 100%; border-collapse: collapse; text-align: left; }
.report-table th { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); padding: 0.5rem; border-bottom: 2px solid var(--border-color); }
.report-table td { padding: 0.5rem; border-bottom: 1px solid var(--border-color); font-size: 0.9rem; }
.report-table tr:hover td { background-color: #f9fafb; }
.empty-cart-state { text-align: center; padding: 3rem 1rem; color: var(--text-muted); }
.empty-state-text { color: var(--text-muted); font-size: 0.9rem; margin: 0; }
.empty-icon { margin-bottom: 1rem; }
.btn-retry { background-color: var(--primary); color: white; border: none; padding: 0.65rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 1rem; transition: background 0.2s; }
.btn-retry:hover { background-color: var(--primary-hover); }
</style>
