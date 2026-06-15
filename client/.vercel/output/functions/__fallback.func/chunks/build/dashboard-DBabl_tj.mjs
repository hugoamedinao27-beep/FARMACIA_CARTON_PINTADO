import { _ as _imports_5, a as __nuxt_component_0 } from './_virtual_public-B9r-wUaI.mjs';
import { ref, watch, computed, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './_virtual_public-DLRCsity.mjs';
import { _ as _imports_1 } from './_virtual_public-C-rMqyoa.mjs';
import { _ as _imports_1$1 } from './_virtual_public-Dkpo9KLm.mjs';
import { u as useApiBase, _ as _imports_4 } from './useApiBase-_9RWjn3k.mjs';
import { _ as _imports_4$1 } from './_virtual_public-BmtlBgjy.mjs';
import { _ as _imports_4$2 } from './_virtual_public-C1sX6coZ.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_8 } from './_virtual_public-ID_7u7oQ.mjs';
import { _ as _imports_14 } from './_virtual_public-CEreEJi8.mjs';
import { _ as _imports_4$3 } from './_virtual_public-kOox1yrL.mjs';
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

const _imports_7 = publicAssetsURL("/images/shopping-bag.svg");
const _imports_9 = publicAssetsURL("/images/minus.svg");
const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    useApiBase();
    useRouter();
    const carrito = ref([]);
    const requiereReceta = ref(false);
    const numeroReceta = ref("");
    const procesando = ref(false);
    const usuarioActivo = ref("Operador");
    const guardarCarrito = () => {
      sessionStorage.setItem("carrito", JSON.stringify(carrito.value));
    };
    watch(carrito, guardarCarrito, { deep: true });
    const calcularTotal = computed(() => {
      return carrito.value.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PharmacyFooter = __nuxt_component_0;
      _push(`<!--[--><div class="dashboard-wrapper" data-v-12397064><header class="main-header" data-v-12397064><div class="header-brand" data-v-12397064><img${ssrRenderAttr("src", _imports_0)} class="brand-icon icon-img" alt="Farmacia" data-v-12397064><div data-v-12397064><h1 data-v-12397064>Farmacia carton pintado</h1><p class="subtitle" data-v-12397064><img${ssrRenderAttr("src", _imports_1)} class="subtitle-icon" alt="" style="${ssrRenderStyle({ "width": "0.65rem", "height": "0.65rem", "vertical-align": "middle", "margin-right": "0.3rem", "opacity": "0.6" })}" data-v-12397064> Cartón Pintado • Panel de Ventas</p></div></div><div class="header-actions" data-v-12397064><button class="btn-user-profile" title="Perfil de Usuario" data-v-12397064><img${ssrRenderAttr("src", _imports_1$1)} class="user-icon icon-img" alt="Usuario" data-v-12397064><span class="user-name" data-v-12397064>${ssrInterpolate(usuarioActivo.value)}</span></button><button class="btn-logout" data-v-12397064><span data-v-12397064>Cerrar Sesión</span><img${ssrRenderAttr("src", _imports_4)} class="icon icon-img" alt="→" data-v-12397064></button></div></header><nav class="main-navbar" data-v-12397064><ul class="nav-list" data-v-12397064><li class="nav-menu-title" data-v-12397064><img${ssrRenderAttr("src", _imports_4$1)} class="nav-icon icon-img" alt="Menú" data-v-12397064><span class="nav-text" data-v-12397064>Menú</span></li><li class="nav-item" data-v-12397064><img${ssrRenderAttr("src", _imports_0)} class="nav-icon icon-img" alt="Farmacia" data-v-12397064><span class="nav-text" data-v-12397064>Farmacia</span></li><li class="nav-item" data-v-12397064><img${ssrRenderAttr("src", _imports_5)} class="nav-icon icon-img" alt="Reportes" data-v-12397064><span class="nav-text" data-v-12397064>Reportes</span></li><li class="nav-item active" data-v-12397064><img${ssrRenderAttr("src", _imports_4$2)} class="nav-icon icon-img" alt="Carrito" data-v-12397064><span class="nav-text" data-v-12397064>Carrito</span>`);
      if (carrito.value.length > 0) {
        _push(`<span class="cart-badge" data-v-12397064>${ssrInterpolate(carrito.value.length)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li></ul></nav><section class="card-section cart-section" data-v-12397064><div class="section-header" data-v-12397064><h2 data-v-12397064><img${ssrRenderAttr("src", _imports_4$2)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1.2rem", "height": "1.2rem", "vertical-align": "middle", "margin-right": "0.3rem" })}" data-v-12397064>Carrito de Venta</h2>`);
      if (carrito.value.length > 0) {
        _push(`<span class="items-count" data-v-12397064>${ssrInterpolate(carrito.value.length)} items</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (carrito.value.length === 0) {
        _push(`<div class="empty-cart-state" data-v-12397064><img${ssrRenderAttr("src", _imports_7)} class="empty-icon icon-img" alt="" style="${ssrRenderStyle({ "width": "3rem", "height": "3rem" })}" data-v-12397064><p data-v-12397064>No has seleccionado ningún fármaco para la venta.</p><button class="btn-add-new-med" style="${ssrRenderStyle({ "margin-top": "1rem" })}" data-v-12397064><img${ssrRenderAttr("src", _imports_8)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1em", "height": "1em", "vertical-align": "middle", "margin-right": "0.2rem" })}" data-v-12397064> Ir al Inventario </button></div>`);
      } else {
        _push(`<div class="cart-content" data-v-12397064><ul class="cart-items-list" data-v-12397064><!--[-->`);
        ssrRenderList(carrito.value, (item) => {
          _push(`<li class="cart-item" data-v-12397064><div class="item-details" data-v-12397064><span class="item-title" data-v-12397064>${ssrInterpolate(item.nombre)}</span><span class="item-subtotal" data-v-12397064> $${ssrInterpolate((item.precio * item.cantidad).toLocaleString("es-CL"))}</span></div><div class="item-controls" data-v-12397064><div class="quantity-selector" data-v-12397064><button class="btn-qty-adj" data-v-12397064><img${ssrRenderAttr("src", _imports_9)} class="icon-img" alt="-" style="${ssrRenderStyle({ "width": "1rem", "height": "1rem" })}" data-v-12397064></button><input type="number"${ssrRenderAttr("value", item.cantidad)} min="1"${ssrRenderAttr("max", item.stock)} class="qty-input" readonly data-v-12397064><button class="btn-qty-adj" data-v-12397064>+</button></div><button class="btn-delete-item" title="Eliminar" data-v-12397064><img${ssrRenderAttr("src", _imports_14)} class="icon-img" alt="Eliminar" style="${ssrRenderStyle({ "width": "1rem", "height": "1rem" })}" data-v-12397064></button></div></li>`);
        });
        _push(`<!--]--></ul><div class="${ssrRenderClass([{ "recipe-required-active": requiereReceta.value }, "recipe-container"])}" data-v-12397064><label class="recipe-checkbox-label" data-v-12397064><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(requiereReceta.value) ? ssrLooseContain(requiereReceta.value, null) : requiereReceta.value) ? " checked" : ""} data-v-12397064><div class="checkbox-text" data-v-12397064><strong data-v-12397064>¿Requiere Receta Retenida?</strong><p data-v-12397064>Obligatorio para ciertos compuestos controlados.</p></div></label>`);
        if (requiereReceta.value) {
          _push(`<div class="recipe-field-group" data-v-12397064><label for="recipe-folio" data-v-12397064>Número de Receta Médica (Folio):</label><input id="recipe-folio" type="text"${ssrRenderAttr("value", numeroReceta.value)} placeholder="Ej: REC-2026-XXXX" class="modern-input" data-v-12397064></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="checkout-summary" data-v-12397064><div class="summary-row" data-v-12397064><span data-v-12397064>Subtotal</span><span data-v-12397064>$${ssrInterpolate(calcularTotal.value.toLocaleString("es-CL"))}</span></div><div class="summary-row total-row" data-v-12397064><span data-v-12397064>Total Venta</span><span class="total-amount" data-v-12397064>$${ssrInterpolate(calcularTotal.value.toLocaleString("es-CL"))}</span></div></div><button${ssrIncludeBooleanAttr(procesando.value) ? " disabled" : ""} class="btn-primary-checkout" data-v-12397064>`);
        if (!procesando.value) {
          _push(`<span data-v-12397064><img${ssrRenderAttr("src", _imports_4$3)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1.2rem", "height": "1.2rem", "vertical-align": "middle", "margin-right": "0.3rem" })}" data-v-12397064> Confirmar Venta (Commit)</span>`);
        } else {
          _push(`<span data-v-12397064>Procesando transacción...</span>`);
        }
        _push(`</button></div>`);
      }
      _push(`</section></div>`);
      _push(ssrRenderComponent(_component_PharmacyFooter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-12397064"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-DBabl_tj.mjs.map
