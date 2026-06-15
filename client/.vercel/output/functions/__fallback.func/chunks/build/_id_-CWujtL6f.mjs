import { _ as __nuxt_component_0 } from './PharmacyFooter-Dz8dvxgu.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './_virtual_public-DKjxHpJN.mjs';
import { _ as _imports_1 } from './_virtual_public-Dkpo9KLm.mjs';
import { u as useApiBase, _ as _imports_4 } from './useApiBase-_9RWjn3k.mjs';
import { _ as _imports_7 } from './_virtual_public-CD89luxk.mjs';
import { _ as _imports_0$1 } from './_virtual_public-DLRCsity.mjs';
import { _ as _imports_4$1 } from './_virtual_public-C1sX6coZ.mjs';
import { _ as _imports_9 } from './_virtual_public-lVedaR2e.mjs';
import { _ as _imports_4$2 } from './_virtual_public-BmtlBgjy.mjs';
import { useRoute, useRouter } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import '../routes/renderer.mjs';
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

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useApiBase();
    useRoute();
    useRouter();
    const medicamento = ref(null);
    const cargando = ref(true);
    const error = ref("");
    const usuarioActivo = ref("Operador");
    const cantidad = ref(1);
    const stockBadge = computed(() => {
      if (!medicamento.value) return "badge badge-danger";
      if (medicamento.value.stock <= 0) return "badge badge-danger";
      if (medicamento.value.stock <= medicamento.value.stock_minimo) return "badge badge-warning";
      return "badge badge-success";
    });
    const stockStatusText = computed(() => {
      if (!medicamento.value) return "";
      if (medicamento.value.stock <= 0) return "Sin Stock";
      if (medicamento.value.stock <= medicamento.value.stock_minimo) return "Stock Bajo";
      return "Disponible";
    });
    const descuento = computed(() => {
      if (!medicamento.value) return 0;
      return Math.floor(Math.random() * 15) + 5;
    });
    const precioOriginal = computed(() => {
      if (!medicamento.value) return 0;
      const desc = descuento.value;
      return Math.round(parseFloat(medicamento.value.precio) / (1 - desc / 100));
    });
    const itemsEnCarrito = computed(() => {
      const carrito = JSON.parse(sessionStorage.getItem("carrito") || "[]");
      return carrito.reduce((sum, item) => sum + item.cantidad, 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PharmacyFooter = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "detail-wrapper" }, _attrs))} data-v-25da35e8><header class="detail-header" data-v-25da35e8><button class="btn-back" data-v-25da35e8><img${ssrRenderAttr("src", _imports_0)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1rem", "height": "1rem" })}" data-v-25da35e8> Volver al inventario </button><div class="header-actions" data-v-25da35e8><button class="btn-user-profile" title="Perfil de Usuario" data-v-25da35e8><img${ssrRenderAttr("src", _imports_1)} class="user-icon icon-img" alt="Usuario" data-v-25da35e8><span class="user-name" data-v-25da35e8>${ssrInterpolate(usuarioActivo.value)}</span></button><button class="btn-logout" data-v-25da35e8><span data-v-25da35e8>Cerrar Sesión</span><img${ssrRenderAttr("src", _imports_4)} class="icon icon-img" alt="→" data-v-25da35e8></button></div></header><nav class="main-navbar" data-v-25da35e8><ul class="nav-list" data-v-25da35e8><li class="nav-menu-title" data-v-25da35e8><img${ssrRenderAttr("src", _imports_7)} class="nav-icon icon-img" alt="Menú" data-v-25da35e8> Menú </li><li class="nav-item" data-v-25da35e8><img${ssrRenderAttr("src", _imports_0$1)} class="nav-icon icon-img" alt="Farmacia" data-v-25da35e8> Farmacia </li><li class="nav-item" data-v-25da35e8><img${ssrRenderAttr("src", _imports_4$1)} class="nav-icon icon-img" alt="Carrito" data-v-25da35e8> Carrito `);
      if (itemsEnCarrito.value > 0) {
        _push(`<span class="cart-badge" data-v-25da35e8>${ssrInterpolate(itemsEnCarrito.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li></ul></nav>`);
      if (cargando.value) {
        _push(`<div class="loading-state" data-v-25da35e8><p data-v-25da35e8>Cargando medicamento...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-25da35e8><p data-v-25da35e8>${ssrInterpolate(error.value)}</p><button class="btn-back" data-v-25da35e8>Volver al inventario</button></div>`);
      } else if (medicamento.value) {
        _push(`<div class="product-layout" data-v-25da35e8><div class="product-image-col" data-v-25da35e8><div class="product-image-container" data-v-25da35e8><img${ssrRenderAttr("src", _imports_9)} class="product-main-img" alt="Medicamento" data-v-25da35e8></div></div><div class="product-info-col" data-v-25da35e8><div class="breadcrumbs" data-v-25da35e8><span class="breadcrumb-link" data-v-25da35e8>Inicio</span><span class="breadcrumb-sep" data-v-25da35e8>/</span><span class="breadcrumb-link" data-v-25da35e8>Farmacia</span><span class="breadcrumb-sep" data-v-25da35e8>/</span><span class="breadcrumb-current" data-v-25da35e8>${ssrInterpolate(medicamento.value.nombre)}</span></div><h1 class="product-title" data-v-25da35e8>${ssrInterpolate(medicamento.value.nombre)}</h1><p class="product-sku" data-v-25da35e8>SKU: MED-${ssrInterpolate(String(medicamento.value.id).padStart(4, "0"))}</p><div style="${ssrRenderStyle({ "display": "flex", "gap": "0.5rem", "align-items": "center", "flex-wrap": "wrap" })}" data-v-25da35e8>`);
        if (descuento.value > 0) {
          _push(`<div class="discount-badge" data-v-25da35e8>-${ssrInterpolate(descuento.value)}%</div>`);
        } else {
          _push(`<!---->`);
        }
        if (medicamento.value.receta_obligatoria) {
          _push(`<span class="receta-badge-detail" data-v-25da35e8><img${ssrRenderAttr("src", _imports_4$2)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "0.85rem", "height": "0.85rem", "vertical-align": "middle", "margin-right": "0.3rem" })}" data-v-25da35e8> Requiere Receta</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="stock-table" data-v-25da35e8><div class="stock-table-row stock-table-header" data-v-25da35e8><span class="stock-table-cell" data-v-25da35e8>Sucursal</span><span class="stock-table-cell" data-v-25da35e8>Stock</span><span class="stock-table-cell" data-v-25da35e8>Estado</span></div><div class="stock-table-row" data-v-25da35e8><span class="stock-table-cell" data-v-25da35e8>Casa Matriz</span><span class="stock-table-cell" data-v-25da35e8>${ssrInterpolate(medicamento.value.stock)} unid.</span><span class="stock-table-cell" data-v-25da35e8><span class="${ssrRenderClass(stockBadge.value)}" data-v-25da35e8>${ssrInterpolate(stockStatusText.value)}</span></span></div></div><div class="prices-section" data-v-25da35e8>`);
        if (descuento.value > 0) {
          _push(`<span class="old-price" data-v-25da35e8>$${ssrInterpolate(precioOriginal.value.toLocaleString("es-CL"))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="current-price" data-v-25da35e8>$${ssrInterpolate(parseFloat(medicamento.value.precio).toLocaleString("es-CL"))}</span></div><div class="purchase-row" data-v-25da35e8><div class="qty-controls" data-v-25da35e8><button class="btn-qty" data-v-25da35e8>−</button><input type="number"${ssrRenderAttr("value", cantidad.value)} min="1"${ssrRenderAttr("max", medicamento.value.stock)} class="qty-input-detail" readonly data-v-25da35e8><button class="btn-qty" data-v-25da35e8>+</button></div><button class="btn-add-cart-detail"${ssrIncludeBooleanAttr(medicamento.value.stock <= 0) ? " disabled" : ""} data-v-25da35e8> Agregar al carro </button></div><div class="important-section" data-v-25da35e8><p data-v-25da35e8><strong data-v-25da35e8>Descripción:</strong> ${ssrInterpolate(medicamento.value.descripcion || "Sin descripción disponible.")}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_PharmacyFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/medicamento/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-25da35e8"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CWujtL6f.mjs.map
