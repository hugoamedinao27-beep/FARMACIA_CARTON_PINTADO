import { _ as __nuxt_component_0 } from './PharmacyFooter-Dz8dvxgu.mjs';
import { ref, watch, computed, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './_virtual_public-DLRCsity.mjs';
import { _ as _imports_1 } from './_virtual_public-C-rMqyoa.mjs';
import { _ as _imports_1$1 } from './_virtual_public-Dkpo9KLm.mjs';
import { u as useApiBase, _ as _imports_4 } from './useApiBase-_9RWjn3k.mjs';
import { _ as _imports_4$1 } from './_virtual_public-BmtlBgjy.mjs';
import { _ as _imports_4$2 } from './_virtual_public-C1sX6coZ.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_7 } from './_virtual_public-CD89luxk.mjs';
import { _ as _imports_13 } from './_virtual_public-BRouvN35.mjs';
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

const _imports_6 = publicAssetsURL("/images/shopping-bag.svg");
const _imports_8 = publicAssetsURL("/images/minus.svg");
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
      _push(`<!--[--><div class="dashboard-wrapper" data-v-a69323d9><header class="main-header" data-v-a69323d9><div class="header-brand" data-v-a69323d9><img${ssrRenderAttr("src", _imports_0)} class="brand-icon icon-img" alt="Farmacia" data-v-a69323d9><div data-v-a69323d9><h1 data-v-a69323d9>Farmacia carton pintado</h1><p class="subtitle" data-v-a69323d9><img${ssrRenderAttr("src", _imports_1)} class="subtitle-icon" alt="" style="${ssrRenderStyle({ "width": "0.65rem", "height": "0.65rem", "vertical-align": "middle", "margin-right": "0.3rem", "opacity": "0.6" })}" data-v-a69323d9> Cartón Pintado • Panel de Ventas</p></div></div><div class="header-actions" data-v-a69323d9><button class="btn-user-profile" title="Perfil de Usuario" data-v-a69323d9><img${ssrRenderAttr("src", _imports_1$1)} class="user-icon icon-img" alt="Usuario" data-v-a69323d9><span class="user-name" data-v-a69323d9>${ssrInterpolate(usuarioActivo.value)}</span></button><button class="btn-logout" data-v-a69323d9><span data-v-a69323d9>Cerrar Sesión</span><img${ssrRenderAttr("src", _imports_4)} class="icon icon-img" alt="→" data-v-a69323d9></button></div></header><nav class="main-navbar" data-v-a69323d9><ul class="nav-list" data-v-a69323d9><li class="nav-menu-title" data-v-a69323d9><img${ssrRenderAttr("src", _imports_4$1)} class="nav-icon icon-img" alt="Menú" data-v-a69323d9><span class="nav-text" data-v-a69323d9>Menú</span></li><li class="nav-item" data-v-a69323d9><img${ssrRenderAttr("src", _imports_0)} class="nav-icon icon-img" alt="Farmacia" data-v-a69323d9><span class="nav-text" data-v-a69323d9>Farmacia</span></li><li class="nav-item active" data-v-a69323d9><img${ssrRenderAttr("src", _imports_4$2)} class="nav-icon icon-img" alt="Carrito" data-v-a69323d9><span class="nav-text" data-v-a69323d9>Carrito</span>`);
      if (carrito.value.length > 0) {
        _push(`<span class="cart-badge" data-v-a69323d9>${ssrInterpolate(carrito.value.length)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li></ul></nav><section class="card-section cart-section" data-v-a69323d9><div class="section-header" data-v-a69323d9><h2 data-v-a69323d9><img${ssrRenderAttr("src", _imports_4$2)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1.2rem", "height": "1.2rem", "vertical-align": "middle", "margin-right": "0.3rem" })}" data-v-a69323d9>Carrito de Venta</h2>`);
      if (carrito.value.length > 0) {
        _push(`<span class="items-count" data-v-a69323d9>${ssrInterpolate(carrito.value.length)} items</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (carrito.value.length === 0) {
        _push(`<div class="empty-cart-state" data-v-a69323d9><img${ssrRenderAttr("src", _imports_6)} class="empty-icon icon-img" alt="" style="${ssrRenderStyle({ "width": "3rem", "height": "3rem" })}" data-v-a69323d9><p data-v-a69323d9>No has seleccionado ningún fármaco para la venta.</p><button class="btn-add-new-med" style="${ssrRenderStyle({ "margin-top": "1rem" })}" data-v-a69323d9><img${ssrRenderAttr("src", _imports_7)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1em", "height": "1em", "vertical-align": "middle", "margin-right": "0.2rem" })}" data-v-a69323d9> Ir al Inventario </button></div>`);
      } else {
        _push(`<div class="cart-content" data-v-a69323d9><ul class="cart-items-list" data-v-a69323d9><!--[-->`);
        ssrRenderList(carrito.value, (item) => {
          _push(`<li class="cart-item" data-v-a69323d9><div class="item-details" data-v-a69323d9><span class="item-title" data-v-a69323d9>${ssrInterpolate(item.nombre)}</span><span class="item-subtotal" data-v-a69323d9> $${ssrInterpolate((item.precio * item.cantidad).toLocaleString("es-CL"))}</span></div><div class="item-controls" data-v-a69323d9><div class="quantity-selector" data-v-a69323d9><button class="btn-qty-adj" data-v-a69323d9><img${ssrRenderAttr("src", _imports_8)} class="icon-img" alt="-" style="${ssrRenderStyle({ "width": "1rem", "height": "1rem" })}" data-v-a69323d9></button><input type="number"${ssrRenderAttr("value", item.cantidad)} min="1"${ssrRenderAttr("max", item.stock)} class="qty-input" readonly data-v-a69323d9><button class="btn-qty-adj" data-v-a69323d9>+</button></div><button class="btn-delete-item" title="Eliminar" data-v-a69323d9><img${ssrRenderAttr("src", _imports_13)} class="icon-img" alt="Eliminar" style="${ssrRenderStyle({ "width": "1rem", "height": "1rem" })}" data-v-a69323d9></button></div></li>`);
        });
        _push(`<!--]--></ul><div class="${ssrRenderClass([{ "recipe-required-active": requiereReceta.value }, "recipe-container"])}" data-v-a69323d9><label class="recipe-checkbox-label" data-v-a69323d9><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(requiereReceta.value) ? ssrLooseContain(requiereReceta.value, null) : requiereReceta.value) ? " checked" : ""} data-v-a69323d9><div class="checkbox-text" data-v-a69323d9><strong data-v-a69323d9>¿Requiere Receta Retenida?</strong><p data-v-a69323d9>Obligatorio para ciertos compuestos controlados.</p></div></label>`);
        if (requiereReceta.value) {
          _push(`<div class="recipe-field-group" data-v-a69323d9><label for="recipe-folio" data-v-a69323d9>Número de Receta Médica (Folio):</label><input id="recipe-folio" type="text"${ssrRenderAttr("value", numeroReceta.value)} placeholder="Ej: REC-2026-XXXX" class="modern-input" data-v-a69323d9></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="checkout-summary" data-v-a69323d9><div class="summary-row" data-v-a69323d9><span data-v-a69323d9>Subtotal</span><span data-v-a69323d9>$${ssrInterpolate(calcularTotal.value.toLocaleString("es-CL"))}</span></div><div class="summary-row total-row" data-v-a69323d9><span data-v-a69323d9>Total Venta</span><span class="total-amount" data-v-a69323d9>$${ssrInterpolate(calcularTotal.value.toLocaleString("es-CL"))}</span></div></div><button${ssrIncludeBooleanAttr(procesando.value) ? " disabled" : ""} class="btn-primary-checkout" data-v-a69323d9>`);
        if (!procesando.value) {
          _push(`<span data-v-a69323d9><img${ssrRenderAttr("src", _imports_4$3)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1.2rem", "height": "1.2rem", "vertical-align": "middle", "margin-right": "0.3rem" })}" data-v-a69323d9> Confirmar Venta (Commit)</span>`);
        } else {
          _push(`<span data-v-a69323d9>Procesando transacción...</span>`);
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
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a69323d9"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-BVMEQrcG.mjs.map
