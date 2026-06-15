import { _ as _imports_5, a as __nuxt_component_0 } from './_virtual_public-B9r-wUaI.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './_virtual_public-DLRCsity.mjs';
import { _ as _imports_1 } from './_virtual_public-C-rMqyoa.mjs';
import { _ as _imports_1$1 } from './_virtual_public-Dkpo9KLm.mjs';
import { u as useApiBase, _ as _imports_4 } from './useApiBase-_9RWjn3k.mjs';
import { _ as _imports_4$1 } from './_virtual_public-BmtlBgjy.mjs';
import { _ as _imports_5$1 } from './_virtual_public-DGAbOgv7.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_11 } from './_virtual_public-B1oDwd-u.mjs';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _imports_7 = publicAssetsURL("/images/package.svg");
const _imports_8 = publicAssetsURL("/images/banknotes.svg");
const _imports_9 = publicAssetsURL("/images/arrow-trending-up.svg");
const _imports_10 = publicAssetsURL("/images/beaker.svg");
const _imports_12 = publicAssetsURL("/images/currency-dollar.svg");
const _imports_13 = publicAssetsURL("/images/trophy.svg");
const _sfc_main = {
  __name: "reportes",
  __ssrInlineRender: true,
  setup(__props) {
    useApiBase();
    useRouter();
    const usuarioActivo = ref("Operador");
    const cargando = ref(true);
    const errorMsg = ref("");
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
    });
    const formatMoney = (val) => {
      const num = Number(val) || 0;
      return num.toLocaleString("es-CL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PharmacyFooter = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-wrapper" }, _attrs))} data-v-14c698dc><header class="main-header" data-v-14c698dc><div class="header-brand" data-v-14c698dc><img${ssrRenderAttr("src", _imports_0)} class="brand-icon icon-img" alt="Farmacia" data-v-14c698dc><div data-v-14c698dc><h1 data-v-14c698dc>Farmacia carton pintado</h1><p class="subtitle" data-v-14c698dc><img${ssrRenderAttr("src", _imports_1)} class="subtitle-icon" alt="" style="${ssrRenderStyle({ "width": "0.65rem", "height": "0.65rem", "vertical-align": "middle", "margin-right": "0.3rem", "opacity": "0.6" })}" data-v-14c698dc> Cartón Pintado • Reportes</p></div></div><div class="header-actions" data-v-14c698dc><button class="btn-user-profile" title="Perfil de Usuario" data-v-14c698dc><img${ssrRenderAttr("src", _imports_1$1)} class="user-icon icon-img" alt="Usuario" data-v-14c698dc><span class="user-name" data-v-14c698dc>${ssrInterpolate(usuarioActivo.value)}</span></button><button class="btn-logout" data-v-14c698dc><span data-v-14c698dc>Cerrar Sesión</span><img${ssrRenderAttr("src", _imports_4)} class="icon icon-img" alt="→" data-v-14c698dc></button></div></header><nav class="main-navbar" data-v-14c698dc><ul class="nav-list" data-v-14c698dc><li class="nav-menu-title" data-v-14c698dc><img${ssrRenderAttr("src", _imports_4$1)} class="nav-icon icon-img" alt="Menú" data-v-14c698dc><span class="nav-text" data-v-14c698dc>Menú</span></li><li class="nav-item" data-v-14c698dc><img${ssrRenderAttr("src", _imports_0)} class="nav-icon icon-img" alt="Farmacia" data-v-14c698dc><span class="nav-text" data-v-14c698dc>Farmacia</span></li><li class="nav-item active" data-v-14c698dc><img${ssrRenderAttr("src", _imports_5)} class="nav-icon icon-img" alt="Reportes" data-v-14c698dc><span class="nav-text" data-v-14c698dc>Reportes</span></li></ul></nav>`);
      if (cargando.value) {
        _push(`<div class="empty-cart-state" data-v-14c698dc><p data-v-14c698dc>Cargando reportes...</p></div>`);
      } else if (errorMsg.value) {
        _push(`<div class="empty-cart-state" data-v-14c698dc><img${ssrRenderAttr("src", _imports_5$1)} class="empty-icon icon-img" alt="Error" style="${ssrRenderStyle({ "width": "2.5rem", "height": "2.5rem" })}" data-v-14c698dc><p data-v-14c698dc>${ssrInterpolate(errorMsg.value)}</p><button class="btn-retry" data-v-14c698dc>Reintentar</button></div>`);
      } else {
        _push(`<div class="reportes-grid" data-v-14c698dc><div class="card-section report-card total-card" data-v-14c698dc><img${ssrRenderAttr("src", _imports_7)} class="report-icon icon-img" alt="Ventas" data-v-14c698dc><div class="report-number" data-v-14c698dc>${ssrInterpolate(reporte.value.totalVentas ?? 0)}</div><div class="report-label" data-v-14c698dc>Ventas Totales</div></div><div class="card-section report-card income-card" data-v-14c698dc><img${ssrRenderAttr("src", _imports_8)} class="report-icon icon-img" alt="Ingresos" data-v-14c698dc><div class="report-number" data-v-14c698dc>$${ssrInterpolate(formatMoney(reporte.value.ingresos))}</div><div class="report-label" data-v-14c698dc>Ingresos Totales</div></div><div class="card-section report-card recipe-card" data-v-14c698dc><img${ssrRenderAttr("src", _imports_4$1)} class="report-icon icon-img" alt="Receta" data-v-14c698dc><div class="report-number" data-v-14c698dc>${ssrInterpolate(reporte.value.ventasConReceta ?? 0)}</div><div class="report-label" data-v-14c698dc>Ventas con Receta</div></div><div class="card-section report-card units-card" data-v-14c698dc><img${ssrRenderAttr("src", _imports_5)} class="report-icon icon-img" alt="Unidades" data-v-14c698dc><div class="report-number" data-v-14c698dc>${ssrInterpolate((reporte.value.totalUnidadesVendidas ?? 0).toLocaleString("es-CL"))}</div><div class="report-label" data-v-14c698dc>Unidades Vendidas</div></div><div class="card-section report-card avg-card" data-v-14c698dc><img${ssrRenderAttr("src", _imports_9)} class="report-icon icon-img" alt="Promedio" data-v-14c698dc><div class="report-number" data-v-14c698dc>$${ssrInterpolate(formatMoney(reporte.value.ventaPromedio))}</div><div class="report-label" data-v-14c698dc>Promedio por Venta</div></div><div class="card-section report-card distinct-card" data-v-14c698dc><img${ssrRenderAttr("src", _imports_10)} class="report-icon icon-img" alt="Distintos" data-v-14c698dc><div class="report-number" data-v-14c698dc>${ssrInterpolate(reporte.value.productosDistintosVendidos ?? 0)}</div><div class="report-label" data-v-14c698dc>Productos Distintos Vendidos</div></div><div class="card-section report-card today-sales-card" data-v-14c698dc><img${ssrRenderAttr("src", _imports_11)} class="report-icon icon-img" alt="Hoy" data-v-14c698dc><div class="report-number" data-v-14c698dc>${ssrInterpolate(reporte.value.ventasHoy ?? 0)}</div><div class="report-label" data-v-14c698dc>Ventas Hoy</div></div><div class="card-section report-card today-income-card" data-v-14c698dc><img${ssrRenderAttr("src", _imports_12)} class="report-icon icon-img" alt="Ingresos hoy" data-v-14c698dc><div class="report-number" data-v-14c698dc>$${ssrInterpolate(formatMoney(reporte.value.ingresosHoy))}</div><div class="report-label" data-v-14c698dc>Ingresos Hoy</div></div><div class="card-section report-card" style="${ssrRenderStyle({ "grid-column": "1 / -1" })}" data-v-14c698dc><div class="section-header" data-v-14c698dc><h2 data-v-14c698dc><img${ssrRenderAttr("src", _imports_13)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1.2rem", "height": "1.2rem", "vertical-align": "middle", "margin-right": "0.3rem" })}" data-v-14c698dc> Medicamentos Más Vendidos</h2></div>`);
        if (reporte.value.medicamentosMasVendidos && reporte.value.medicamentosMasVendidos.length) {
          _push(`<table class="report-table" data-v-14c698dc><thead data-v-14c698dc><tr data-v-14c698dc><th data-v-14c698dc>#</th><th data-v-14c698dc>Medicamento</th><th data-v-14c698dc>Unidades Vendidas</th></tr></thead><tbody data-v-14c698dc><!--[-->`);
          ssrRenderList(reporte.value.medicamentosMasVendidos, (item, i) => {
            _push(`<tr data-v-14c698dc><td data-v-14c698dc>${ssrInterpolate(i + 1)}</td><td data-v-14c698dc>${ssrInterpolate(item.medicamento?.nombre || "ID: " + item.medicamentoId)}</td><td data-v-14c698dc>${ssrInterpolate(item.total_vendido)}</td></tr>`);
          });
          _push(`<!--]--></tbody></table>`);
        } else {
          _push(`<p class="empty-state-text" data-v-14c698dc>No hay datos de ventas todavía.</p>`);
        }
        _push(`</div></div>`);
      }
      _push(ssrRenderComponent(_component_PharmacyFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reportes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const reportes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-14c698dc"]]);

export { reportes as default };
//# sourceMappingURL=reportes-C53Z3Au2.mjs.map
