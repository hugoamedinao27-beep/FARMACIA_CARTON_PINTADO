import { _ as _imports_5, c as _imports_6, a as __nuxt_component_0 } from './_virtual_public-B9r-wUaI.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './_virtual_public-DLRCsity.mjs';
import { _ as _imports_1 } from './_virtual_public-C-rMqyoa.mjs';
import { _ as _imports_1$1 } from './_virtual_public-Dkpo9KLm.mjs';
import { u as useApiBase, _ as _imports_4 } from './useApiBase-_9RWjn3k.mjs';
import { _ as _imports_4$1 } from './_virtual_public-C1sX6coZ.mjs';
import { useRouter } from 'vue-router';
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
  __name: "Menu",
  __ssrInlineRender: true,
  setup(__props) {
    useApiBase();
    useRouter();
    const usuarioActivo = ref("Operador");
    const userRole = ref("user");
    const indice = ref(0);
    ref(null);
    const imagenes = [
      { src: "/images/pepito.jpeg", label: "Farmacia Cartón Pintado" },
      { src: "/images/hugoperro.jpeg", label: "Nuestro Equipo" },
      { src: "/images/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp", label: "Compromiso con tu Salud" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PharmacyFooter = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "menu-wrapper" }, _attrs))} data-v-e1b9c089><header class="main-header" data-v-e1b9c089><div class="header-brand" data-v-e1b9c089><img${ssrRenderAttr("src", _imports_0)} class="brand-icon icon-img" alt="Farmacia" data-v-e1b9c089><div data-v-e1b9c089><h1 data-v-e1b9c089>Farmacia carton pintado</h1><p class="subtitle" data-v-e1b9c089><img${ssrRenderAttr("src", _imports_1)} class="subtitle-icon" alt="" style="${ssrRenderStyle({ "width": "0.65rem", "height": "0.65rem", "vertical-align": "middle", "margin-right": "0.3rem", "opacity": "0.6" })}" data-v-e1b9c089> Cartón Pintado • Panel Principal</p></div></div><div class="header-actions" data-v-e1b9c089><button class="btn-user-profile" title="Perfil de Usuario" data-v-e1b9c089><img${ssrRenderAttr("src", _imports_1$1)} class="user-icon icon-img" alt="Usuario" data-v-e1b9c089><span class="user-name" data-v-e1b9c089>${ssrInterpolate(usuarioActivo.value)}</span></button><button class="btn-logout" data-v-e1b9c089><span data-v-e1b9c089>Cerrar Sesión</span><img${ssrRenderAttr("src", _imports_4)} class="icon icon-img" alt="→" data-v-e1b9c089></button></div></header><div class="carousel" data-v-e1b9c089><div class="carousel-track" style="${ssrRenderStyle({ transform: `translateX(-${indice.value * 100}%)` })}" data-v-e1b9c089><!--[-->`);
      ssrRenderList(imagenes, (img, i) => {
        _push(`<div class="carousel-slide" data-v-e1b9c089><img${ssrRenderAttr("src", img.src)}${ssrRenderAttr("alt", img.label)} class="carousel-img" data-v-e1b9c089><div class="carousel-label" data-v-e1b9c089>${ssrInterpolate(img.label)}</div></div>`);
      });
      _push(`<!--]--></div><button class="carousel-btn carousel-prev" data-v-e1b9c089>‹</button><button class="carousel-btn carousel-next" data-v-e1b9c089>›</button><div class="carousel-dots" data-v-e1b9c089><!--[-->`);
      ssrRenderList(imagenes, (img, i) => {
        _push(`<span class="${ssrRenderClass([{ active: i === indice.value }, "carousel-dot"])}" data-v-e1b9c089></span>`);
      });
      _push(`<!--]--></div></div><div class="menu-grid" data-v-e1b9c089><div class="menu-card" data-v-e1b9c089><img${ssrRenderAttr("src", _imports_0)} class="menu-card-icon icon-img" alt="Medicamentos" data-v-e1b9c089><h2 class="menu-card-title" data-v-e1b9c089>Catálogo de Medicamentos</h2><p class="menu-card-desc" data-v-e1b9c089>Visualizar inventario, agregar, editar y eliminar fármacos del sistema.</p><span class="menu-card-btn" data-v-e1b9c089>Ver Inventario <img${ssrRenderAttr("src", _imports_4)} class="icon-img" alt="→" style="${ssrRenderStyle({ "width": "0.8em", "height": "0.8em", "vertical-align": "middle" })}" data-v-e1b9c089></span></div><div class="menu-card" data-v-e1b9c089><img${ssrRenderAttr("src", _imports_4$1)} class="menu-card-icon icon-img" alt="Carrito" data-v-e1b9c089><h2 class="menu-card-title" data-v-e1b9c089>Carrito de Ventas</h2><p class="menu-card-desc" data-v-e1b9c089>Procesar ventas, gestionar recetas y confirmar transacciones.</p><span class="menu-card-btn" data-v-e1b9c089>Ir al Carrito <img${ssrRenderAttr("src", _imports_4)} class="icon-img" alt="→" style="${ssrRenderStyle({ "width": "0.8em", "height": "0.8em", "vertical-align": "middle" })}" data-v-e1b9c089></span></div>`);
      if (userRole.value === "admin") {
        _push(`<div class="menu-card" data-v-e1b9c089><img${ssrRenderAttr("src", _imports_5)} class="menu-card-icon icon-img" alt="Reportes" data-v-e1b9c089><h2 class="menu-card-title" data-v-e1b9c089>Reportes de Ventas</h2><p class="menu-card-desc" data-v-e1b9c089>Ver estadísticas, ingresos totales y medicamentos más vendidos.</p><span class="menu-card-btn" data-v-e1b9c089>Ver Reportes <img${ssrRenderAttr("src", _imports_4)} class="icon-img" alt="→" style="${ssrRenderStyle({ "width": "0.8em", "height": "0.8em", "vertical-align": "middle" })}" data-v-e1b9c089></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="menu-card" data-v-e1b9c089><img${ssrRenderAttr("src", _imports_6)} class="menu-card-icon icon-img" alt="Conócenos" data-v-e1b9c089><h2 class="menu-card-title" data-v-e1b9c089>Conócenos</h2><p class="menu-card-desc" data-v-e1b9c089>Información de la farmacia, horarios y contacto.</p><span class="menu-card-btn" data-v-e1b9c089>Ver más <img${ssrRenderAttr("src", _imports_4)} class="icon-img" alt="→" style="${ssrRenderStyle({ "width": "0.8em", "height": "0.8em", "vertical-align": "middle" })}" data-v-e1b9c089></span></div></div>`);
      _push(ssrRenderComponent(_component_PharmacyFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Menu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e1b9c089"]]);

export { Menu as default };
//# sourceMappingURL=Menu-BnVN-Kwg.mjs.map
