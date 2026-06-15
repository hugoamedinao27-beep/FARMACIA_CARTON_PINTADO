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
    const indice = ref(0);
    ref(null);
    const imagenes = [
      { src: "/images/pepito.jpeg", label: "Farmacia Cartón Pintado" },
      { src: "/images/hugoperro.jpeg", label: "Nuestro Equipo" },
      { src: "/images/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp", label: "Compromiso con tu Salud" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PharmacyFooter = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "menu-wrapper" }, _attrs))} data-v-48be4571><header class="main-header" data-v-48be4571><div class="header-brand" data-v-48be4571><img${ssrRenderAttr("src", _imports_0)} class="brand-icon icon-img" alt="Farmacia" data-v-48be4571><div data-v-48be4571><h1 data-v-48be4571>Farmacia carton pintado</h1><p class="subtitle" data-v-48be4571><img${ssrRenderAttr("src", _imports_1)} class="subtitle-icon" alt="" style="${ssrRenderStyle({ "width": "0.65rem", "height": "0.65rem", "vertical-align": "middle", "margin-right": "0.3rem", "opacity": "0.6" })}" data-v-48be4571> Cartón Pintado • Panel Principal</p></div></div><div class="header-actions" data-v-48be4571><button class="btn-user-profile" title="Perfil de Usuario" data-v-48be4571><img${ssrRenderAttr("src", _imports_1$1)} class="user-icon icon-img" alt="Usuario" data-v-48be4571><span class="user-name" data-v-48be4571>${ssrInterpolate(usuarioActivo.value)}</span></button><button class="btn-logout" data-v-48be4571><span data-v-48be4571>Cerrar Sesión</span><img${ssrRenderAttr("src", _imports_4)} class="icon icon-img" alt="→" data-v-48be4571></button></div></header><div class="carousel" data-v-48be4571><div class="carousel-track" style="${ssrRenderStyle({ transform: `translateX(-${indice.value * 100}%)` })}" data-v-48be4571><!--[-->`);
      ssrRenderList(imagenes, (img, i) => {
        _push(`<div class="carousel-slide" data-v-48be4571><img${ssrRenderAttr("src", img.src)}${ssrRenderAttr("alt", img.label)} class="carousel-img" data-v-48be4571><div class="carousel-label" data-v-48be4571>${ssrInterpolate(img.label)}</div></div>`);
      });
      _push(`<!--]--></div><button class="carousel-btn carousel-prev" data-v-48be4571>‹</button><button class="carousel-btn carousel-next" data-v-48be4571>›</button><div class="carousel-dots" data-v-48be4571><!--[-->`);
      ssrRenderList(imagenes, (img, i) => {
        _push(`<span class="${ssrRenderClass([{ active: i === indice.value }, "carousel-dot"])}" data-v-48be4571></span>`);
      });
      _push(`<!--]--></div></div><div class="menu-grid" data-v-48be4571><div class="menu-card" data-v-48be4571><img${ssrRenderAttr("src", _imports_0)} class="menu-card-icon icon-img" alt="Medicamentos" data-v-48be4571><h2 class="menu-card-title" data-v-48be4571>Catálogo de Medicamentos</h2><p class="menu-card-desc" data-v-48be4571>Visualizar inventario, agregar, editar y eliminar fármacos del sistema.</p><span class="menu-card-btn" data-v-48be4571>Ver Inventario <img${ssrRenderAttr("src", _imports_4)} class="icon-img" alt="→" style="${ssrRenderStyle({ "width": "0.8em", "height": "0.8em", "vertical-align": "middle" })}" data-v-48be4571></span></div><div class="menu-card" data-v-48be4571><img${ssrRenderAttr("src", _imports_4$1)} class="menu-card-icon icon-img" alt="Carrito" data-v-48be4571><h2 class="menu-card-title" data-v-48be4571>Carrito de Ventas</h2><p class="menu-card-desc" data-v-48be4571>Procesar ventas, gestionar recetas y confirmar transacciones.</p><span class="menu-card-btn" data-v-48be4571>Ir al Carrito <img${ssrRenderAttr("src", _imports_4)} class="icon-img" alt="→" style="${ssrRenderStyle({ "width": "0.8em", "height": "0.8em", "vertical-align": "middle" })}" data-v-48be4571></span></div><div class="menu-card" data-v-48be4571><img${ssrRenderAttr("src", _imports_5)} class="menu-card-icon icon-img" alt="Reportes" data-v-48be4571><h2 class="menu-card-title" data-v-48be4571>Reportes de Ventas</h2><p class="menu-card-desc" data-v-48be4571>Ver estadísticas, ingresos totales y medicamentos más vendidos.</p><span class="menu-card-btn" data-v-48be4571>Ver Reportes <img${ssrRenderAttr("src", _imports_4)} class="icon-img" alt="→" style="${ssrRenderStyle({ "width": "0.8em", "height": "0.8em", "vertical-align": "middle" })}" data-v-48be4571></span></div><div class="menu-card" data-v-48be4571><img${ssrRenderAttr("src", _imports_6)} class="menu-card-icon icon-img" alt="Conócenos" data-v-48be4571><h2 class="menu-card-title" data-v-48be4571>Conócenos</h2><p class="menu-card-desc" data-v-48be4571>Información de la farmacia, horarios y contacto.</p><span class="menu-card-btn" data-v-48be4571>Ver más <img${ssrRenderAttr("src", _imports_4)} class="icon-img" alt="→" style="${ssrRenderStyle({ "width": "0.8em", "height": "0.8em", "vertical-align": "middle" })}" data-v-48be4571></span></div></div>`);
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
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-48be4571"]]);

export { Menu as default };
//# sourceMappingURL=Menu-CiF9NdeE.mjs.map
