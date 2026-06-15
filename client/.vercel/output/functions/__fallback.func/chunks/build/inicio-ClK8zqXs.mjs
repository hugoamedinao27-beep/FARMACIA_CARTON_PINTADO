import { _ as _imports_5, c as _imports_6, a as __nuxt_component_0 } from './_virtual_public-B9r-wUaI.mjs';
import { ref, computed, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './_virtual_public-DLRCsity.mjs';
import { _ as _imports_1 } from './_virtual_public-C-rMqyoa.mjs';
import { _ as _imports_1$1 } from './_virtual_public-Dkpo9KLm.mjs';
import { u as useApiBase, _ as _imports_4 } from './useApiBase-_9RWjn3k.mjs';
import { _ as _imports_4$1 } from './_virtual_public-BmtlBgjy.mjs';
import { _ as _imports_4$2 } from './_virtual_public-C1sX6coZ.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_10 } from './_virtual_public-Di16-p3z.mjs';
import { _ as _imports_5$1 } from './_virtual_public-DGAbOgv7.mjs';
import { _ as _imports_14 } from './_virtual_public-CEreEJi8.mjs';
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

const _imports_7 = publicAssetsURL("/images/plus.svg");
const _imports_8 = publicAssetsURL("/images/magnifying-glass.svg");
const _imports_9 = publicAssetsURL("/images/pencil.svg");
const _imports_13 = publicAssetsURL("/images/sparkles.svg");
const _imports_15 = publicAssetsURL("/images/trash.svg");
const _imports_16 = publicAssetsURL("/images/floppy-disk.svg");
const _sfc_main = {
  __name: "inicio",
  __ssrInlineRender: true,
  setup(__props) {
    useApiBase();
    useRouter();
    const medicamentos = ref([]);
    const usuarioActivo = ref("Operador");
    const userRole = ref("user");
    const busqueda = ref("");
    const filtroStock = ref("");
    const mostrarModalEditar = ref(false);
    const guardando = ref(false);
    const esModoEdicion = ref(false);
    const medEditando = ref({
      id: null,
      nombre: "",
      precio: 0,
      stock: 0,
      stock_minimo: 0,
      receta_obligatoria: false,
      categoria: "General",
      descripcion: ""
    });
    const medicamentosFiltrados = computed(() => {
      let lista = medicamentos.value;
      if (busqueda.value) {
        const q = busqueda.value.toLowerCase();
        lista = lista.filter((m) => m.nombre.toLowerCase().includes(q));
      }
      if (filtroStock.value === "bajo") {
        lista = lista.filter((m) => m.stock <= m.stock_minimo && m.stock > 0);
      } else if (filtroStock.value === "critico") {
        lista = lista.filter((m) => m.stock <= 0);
      }
      return lista;
    });
    const itemsEnCarrito = computed(() => {
      const carrito = JSON.parse(sessionStorage.getItem("carrito") || "[]");
      return carrito.reduce((sum, item) => sum + item.cantidad, 0);
    });
    const badgeClass = (med) => {
      if (med.stock <= 0) return "badge badge-danger";
      if (med.stock <= med.stock_minimo) return "badge badge-warning";
      return "badge badge-success";
    };
    const stockStatusText = (med) => {
      if (med.stock <= 0) return "Sin Stock";
      if (med.stock <= med.stock_minimo) return "Stock Bajo";
      return "Disponible";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PharmacyFooter = __nuxt_component_0;
      _push(`<!--[--><div class="dashboard-wrapper" data-v-db31cb13><header class="main-header" data-v-db31cb13><div class="header-brand" data-v-db31cb13><img${ssrRenderAttr("src", _imports_0)} class="brand-icon icon-img" alt="Farmacia" data-v-db31cb13><div data-v-db31cb13><h1 data-v-db31cb13>Farmacia carton pintado</h1><p class="subtitle" data-v-db31cb13><img${ssrRenderAttr("src", _imports_1)} class="subtitle-icon" alt="" style="${ssrRenderStyle({ "width": "0.65rem", "height": "0.65rem", "vertical-align": "middle", "margin-right": "0.3rem", "opacity": "0.6" })}" data-v-db31cb13> Cartón Pintado • Inventario</p></div></div><div class="header-actions" data-v-db31cb13><button class="btn-user-profile" title="Perfil de Usuario" data-v-db31cb13><img${ssrRenderAttr("src", _imports_1$1)} class="user-icon icon-img" alt="Usuario" data-v-db31cb13><span class="user-name" data-v-db31cb13>${ssrInterpolate(usuarioActivo.value)}</span></button><button class="btn-logout" data-v-db31cb13><span data-v-db31cb13>Cerrar Sesión</span><img${ssrRenderAttr("src", _imports_4)} class="icon icon-img" alt="→" data-v-db31cb13></button></div></header><nav class="main-navbar" data-v-db31cb13><ul class="nav-list" data-v-db31cb13><li class="nav-menu-title" data-v-db31cb13><img${ssrRenderAttr("src", _imports_4$1)} class="nav-icon icon-img" alt="Menú" data-v-db31cb13><span class="nav-text" data-v-db31cb13>Menú</span></li><li class="nav-item active" data-v-db31cb13><img${ssrRenderAttr("src", _imports_0)} class="nav-icon icon-img" alt="Farmacia" data-v-db31cb13><span class="nav-text" data-v-db31cb13>Farmacia</span></li><li class="nav-item" data-v-db31cb13><img${ssrRenderAttr("src", _imports_5)} class="nav-icon icon-img" alt="Reportes" data-v-db31cb13><span class="nav-text" data-v-db31cb13>Reportes</span></li><li class="nav-item" data-v-db31cb13><img${ssrRenderAttr("src", _imports_4$2)} class="nav-icon icon-img" alt="Carrito" data-v-db31cb13><span class="nav-text" data-v-db31cb13>Carrito</span>`);
      if (itemsEnCarrito.value > 0) {
        _push(`<span class="cart-badge" data-v-db31cb13>${ssrInterpolate(itemsEnCarrito.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li></ul></nav><section class="card-section catalog-section" data-v-db31cb13><div class="section-header" data-v-db31cb13><div class="header-title-container" data-v-db31cb13><h2 data-v-db31cb13><img${ssrRenderAttr("src", _imports_4$1)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1.2rem", "height": "1.2rem", "vertical-align": "middle", "margin-right": "0.3rem" })}" data-v-db31cb13>Inventario Disponible en Sala</h2><span class="items-count" data-v-db31cb13>${ssrInterpolate(medicamentosFiltrados.value.length)} Fármacos</span></div>`);
      if (userRole.value === "admin") {
        _push(`<button class="btn-add-new-med" data-v-db31cb13><img${ssrRenderAttr("src", _imports_7)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1em", "height": "1em", "vertical-align": "middle", "margin-right": "0.2rem" })}" data-v-db31cb13> Nuevo Medicamento </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="search-bar-container" data-v-db31cb13><div class="search-input-wrapper" data-v-db31cb13><img${ssrRenderAttr("src", _imports_8)} class="search-icon icon-img" alt="Buscar" data-v-db31cb13><input${ssrRenderAttr("value", busqueda.value)} type="text" placeholder="Buscar por nombre de fármaco..." class="modern-input search-input" data-v-db31cb13></div><select class="modern-input stock-filter-select" data-v-db31cb13><option value="" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(filtroStock.value) ? ssrLooseContain(filtroStock.value, "") : ssrLooseEqual(filtroStock.value, "")) ? " selected" : ""}>Todos los stocks</option><option value="bajo" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(filtroStock.value) ? ssrLooseContain(filtroStock.value, "bajo") : ssrLooseEqual(filtroStock.value, "bajo")) ? " selected" : ""}>Stock bajo (≤ mínimo)</option><option value="critico" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(filtroStock.value) ? ssrLooseContain(filtroStock.value, "critico") : ssrLooseEqual(filtroStock.value, "critico")) ? " selected" : ""}>Sin stock</option></select></div><div class="med-grid" data-v-db31cb13><!--[-->`);
      ssrRenderList(medicamentosFiltrados.value, (med) => {
        _push(`<div class="${ssrRenderClass([{ "card-warning": med.stock <= med.stock_minimo && med.stock > 0, "card-danger": med.stock <= 0 }, "med-card"])}" data-v-db31cb13><div class="card-badge-container" data-v-db31cb13>`);
        if (userRole.value === "admin") {
          _push(`<button class="btn-edit-inline" title="Editar Medicamento" data-v-db31cb13><img${ssrRenderAttr("src", _imports_9)} class="icon-img" alt="Editar" style="${ssrRenderStyle({ "width": "1em", "height": "1em" })}" data-v-db31cb13></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="${ssrRenderClass(badgeClass(med))}" data-v-db31cb13>${ssrInterpolate(stockStatusText(med))}</span></div><div class="card-body" data-v-db31cb13><img${ssrRenderAttr("src", _imports_10)} class="med-icon-box icon-img" alt="Medicamento" data-v-db31cb13><h3 class="med-name" data-v-db31cb13>${ssrInterpolate(med.nombre)}</h3>`);
        if (med.categoria) {
          _push(`<span class="med-categoria" data-v-db31cb13>${ssrInterpolate(med.categoria)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="price-tag" data-v-db31cb13>$${ssrInterpolate(parseFloat(med.precio).toLocaleString("es-CL"))}</p><div class="stock-info" data-v-db31cb13><span class="stock-label" data-v-db31cb13>Stock:</span><span class="stock-number" data-v-db31cb13>${ssrInterpolate(med.stock)}</span><span class="stock-unit" data-v-db31cb13>unid.</span><span class="${ssrRenderClass([med.stock <= 0 ? "stock-out" : med.stock <= med.stock_minimo ? "stock-low" : "stock-ok", "med-stock-badge"])}" style="${ssrRenderStyle({ "margin-left": "0.4rem" })}" data-v-db31cb13>${ssrInterpolate(med.stock <= 0 ? "Agotado" : med.stock <= med.stock_minimo ? "Stock Bajo" : "Disponible")}</span></div>`);
        if (med.receta_obligatoria) {
          _push(`<span class="med-receta-badge" data-v-db31cb13><img${ssrRenderAttr("src", _imports_4$1)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "0.7rem", "height": "0.7rem", "vertical-align": "middle", "margin-right": "0.15rem" })}" data-v-db31cb13> Con Receta </span>`);
        } else {
          _push(`<!---->`);
        }
        if (med.stock <= med.stock_minimo && med.stock > 0) {
          _push(`<div class="med-min-alert" data-v-db31cb13><img${ssrRenderAttr("src", _imports_5$1)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "0.9rem", "height": "0.9rem", "vertical-align": "middle", "margin-right": "0.2rem" })}" data-v-db31cb13>Mínimo req: ${ssrInterpolate(med.stock_minimo)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="card-footer" data-v-db31cb13>`);
        if (med.stock > 0) {
          _push(`<div class="quantity-selector-container" data-v-db31cb13><label${ssrRenderAttr("for", "qty-" + med.id)} data-v-db31cb13>Cant:</label><input${ssrRenderAttr("id", "qty-" + med.id)} type="number"${ssrRenderAttr("value", med.cantidadSeleccionada)} min="1"${ssrRenderAttr("max", med.stock)} class="modern-input qty-input" data-v-db31cb13></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="btn-detail-card" title="Ver detalle" data-v-db31cb13><img${ssrRenderAttr("src", _imports_6)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "0.85rem", "height": "0.85rem", "vertical-align": "middle", "margin-right": "0.2rem" })}" data-v-db31cb13> Ver detalle </button><button${ssrIncludeBooleanAttr(med.stock <= 0) ? " disabled" : ""} class="btn-action-add-card" data-v-db31cb13>`);
        if (med.stock > 0) {
          _push(`<!--[--><img${ssrRenderAttr("src", _imports_7)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "0.9rem", "height": "0.9rem", "vertical-align": "middle", "margin-right": "0.2rem" })}" data-v-db31cb13> Agregar al Carrito<!--]-->`);
        } else {
          _push(`<!--[-->Sin Stock<!--]-->`);
        }
        _push(`</button></div></div>`);
      });
      _push(`<!--]--></div></section>`);
      if (mostrarModalEditar.value) {
        _push(`<div class="modal-overlay" data-v-db31cb13><div class="modal-container" data-v-db31cb13><div class="modal-header" data-v-db31cb13><h3 data-v-db31cb13>`);
        if (esModoEdicion.value) {
          _push(`<!--[--><img${ssrRenderAttr("src", _imports_9)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1.2rem", "height": "1.2rem", "vertical-align": "middle", "margin-right": "0.3rem" })}" data-v-db31cb13> Editar Medicamento<!--]-->`);
        } else {
          _push(`<!--[--><img${ssrRenderAttr("src", _imports_13)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1.2rem", "height": "1.2rem", "vertical-align": "middle", "margin-right": "0.3rem" })}" data-v-db31cb13> Agregar Nuevo Medicamento<!--]-->`);
        }
        _push(`</h3><button class="btn-close-modal" data-v-db31cb13><img${ssrRenderAttr("src", _imports_14)} class="icon-img" alt="Cerrar" style="${ssrRenderStyle({ "width": "1.1rem", "height": "1.1rem" })}" data-v-db31cb13></button></div><form class="modal-form" data-v-db31cb13><div class="form-group" data-v-db31cb13><label data-v-db31cb13>Nombre del Fármaco:</label><input type="text"${ssrRenderAttr("value", medEditando.value.nombre)} required class="modern-input" data-v-db31cb13></div><div class="form-row" data-v-db31cb13><div class="form-group" data-v-db31cb13><label data-v-db31cb13>Precio ($):</label><input type="number"${ssrRenderAttr("value", medEditando.value.precio)} min="0" required class="modern-input" data-v-db31cb13></div><div class="form-group" data-v-db31cb13><label data-v-db31cb13>Stock Actual:</label><input type="number"${ssrRenderAttr("value", medEditando.value.stock)} min="0" required class="modern-input" data-v-db31cb13></div></div><div class="form-row" data-v-db31cb13><div class="form-group" data-v-db31cb13><label data-v-db31cb13>Stock Mínimo:</label><input type="number"${ssrRenderAttr("value", medEditando.value.stock_minimo)} min="0" required class="modern-input" data-v-db31cb13></div><div class="form-group" data-v-db31cb13><label data-v-db31cb13>Categoría:</label><select class="modern-input" data-v-db31cb13><option value="General" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(medEditando.value.categoria) ? ssrLooseContain(medEditando.value.categoria, "General") : ssrLooseEqual(medEditando.value.categoria, "General")) ? " selected" : ""}>General</option><option value="Analgésico" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(medEditando.value.categoria) ? ssrLooseContain(medEditando.value.categoria, "Analgésico") : ssrLooseEqual(medEditando.value.categoria, "Analgésico")) ? " selected" : ""}>Analgésico</option><option value="Antiinflamatorio" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(medEditando.value.categoria) ? ssrLooseContain(medEditando.value.categoria, "Antiinflamatorio") : ssrLooseEqual(medEditando.value.categoria, "Antiinflamatorio")) ? " selected" : ""}>Antiinflamatorio</option><option value="Antibiótico" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(medEditando.value.categoria) ? ssrLooseContain(medEditando.value.categoria, "Antibiótico") : ssrLooseEqual(medEditando.value.categoria, "Antibiótico")) ? " selected" : ""}>Antibiótico</option><option value="Antihistamínico" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(medEditando.value.categoria) ? ssrLooseContain(medEditando.value.categoria, "Antihistamínico") : ssrLooseEqual(medEditando.value.categoria, "Antihistamínico")) ? " selected" : ""}>Antihistamínico</option><option value="Cardiovascular" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(medEditando.value.categoria) ? ssrLooseContain(medEditando.value.categoria, "Cardiovascular") : ssrLooseEqual(medEditando.value.categoria, "Cardiovascular")) ? " selected" : ""}>Cardiovascular</option><option value="Digestivo" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(medEditando.value.categoria) ? ssrLooseContain(medEditando.value.categoria, "Digestivo") : ssrLooseEqual(medEditando.value.categoria, "Digestivo")) ? " selected" : ""}>Digestivo</option><option value="Respiratorio" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(medEditando.value.categoria) ? ssrLooseContain(medEditando.value.categoria, "Respiratorio") : ssrLooseEqual(medEditando.value.categoria, "Respiratorio")) ? " selected" : ""}>Respiratorio</option><option value="Neurológico" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(medEditando.value.categoria) ? ssrLooseContain(medEditando.value.categoria, "Neurológico") : ssrLooseEqual(medEditando.value.categoria, "Neurológico")) ? " selected" : ""}>Neurológico</option><option value="Otros" data-v-db31cb13${ssrIncludeBooleanAttr(Array.isArray(medEditando.value.categoria) ? ssrLooseContain(medEditando.value.categoria, "Otros") : ssrLooseEqual(medEditando.value.categoria, "Otros")) ? " selected" : ""}>Otros</option></select></div></div><div class="form-group" data-v-db31cb13><label data-v-db31cb13>Descripción:</label><textarea class="modern-input textarea-input" placeholder="Descripción del medicamento..." rows="2" data-v-db31cb13>${ssrInterpolate(medEditando.value.descripcion)}</textarea></div><div class="form-group checkbox-group" data-v-db31cb13><label class="recipe-checkbox-label" data-v-db31cb13><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(medEditando.value.receta_obligatoria) ? ssrLooseContain(medEditando.value.receta_obligatoria, null) : medEditando.value.receta_obligatoria) ? " checked" : ""} data-v-db31cb13><span data-v-db31cb13>¿Receta Obligatoria?</span></label></div><div class="${ssrRenderClass([{ "has-delete-btn": esModoEdicion.value }, "modal-actions"])}" data-v-db31cb13>`);
        if (esModoEdicion.value) {
          _push(`<button type="button"${ssrIncludeBooleanAttr(guardando.value) ? " disabled" : ""} class="btn-danger-outline" data-v-db31cb13><img${ssrRenderAttr("src", _imports_15)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1em", "height": "1em", "vertical-align": "middle", "margin-right": "0.2rem" })}" data-v-db31cb13> Eliminar Fármaco </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="actions-right" data-v-db31cb13><button type="button" class="btn-secondary" data-v-db31cb13>Cancelar</button><button type="submit"${ssrIncludeBooleanAttr(guardando.value) ? " disabled" : ""} class="btn-primary-checkout margin-reset" data-v-db31cb13>`);
        if (guardando.value) {
          _push(`<!--[-->Guardando...<!--]-->`);
        } else if (esModoEdicion.value) {
          _push(`<!--[--><img${ssrRenderAttr("src", _imports_16)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1em", "height": "1em", "vertical-align": "middle", "margin-right": "0.2rem" })}" data-v-db31cb13> Guardar Cambios<!--]-->`);
        } else {
          _push(`<!--[--><img${ssrRenderAttr("src", _imports_7)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1em", "height": "1em", "vertical-align": "middle", "margin-right": "0.2rem" })}" data-v-db31cb13> Crear Medicamento<!--]-->`);
        }
        _push(`</button></div></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_PharmacyFooter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/inicio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const inicio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-db31cb13"]]);

export { inicio as default };
//# sourceMappingURL=inicio-ClK8zqXs.mjs.map
