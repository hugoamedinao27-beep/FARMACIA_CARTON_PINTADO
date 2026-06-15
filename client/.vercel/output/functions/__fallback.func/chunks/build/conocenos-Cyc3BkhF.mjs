import { a as _imports_6$1, _ as __nuxt_component_0 } from './PharmacyFooter-Dz8dvxgu.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './_virtual_public-DKjxHpJN.mjs';
import { _ as _imports_1 } from './_virtual_public-Dkpo9KLm.mjs';
import { u as useApiBase, _ as _imports_4 } from './useApiBase-_9RWjn3k.mjs';
import { _ as _imports_7 } from './_virtual_public-CD89luxk.mjs';
import { _ as _imports_0$1, a as _imports_2 } from './_virtual_public-DLRCsity.mjs';
import { _ as _imports_4$1 } from './_virtual_public-C1sX6coZ.mjs';
import { _ as _imports_11 } from './_virtual_public-B1oDwd-u.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
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

const _imports_9 = publicAssetsURL("/images/hugoperro.jpeg");
const _sfc_main = {
  __name: "conocenos",
  __ssrInlineRender: true,
  setup(__props) {
    useApiBase();
    useRouter();
    const usuarioActivo = ref("Operador");
    const empleados = [
      {
        titulo: "Este Mes",
        nombre: "Hugo Medina",
        rol: "Farmacéutico Encargado",
        razon: "Elegido por su dedicación y compromiso con la atención al cliente, manteniendo siempre un ambiente de confianza y profesionalismo en la farmacia."
      },
      {
        titulo: "Mes Antepasado",
        nombre: "Hugo Medina",
        rol: "Farmacéutico Encargado",
        razon: "Reconocido por su excelente gestión del inventario y su capacidad para resolver problemas complejos de los pacientes."
      },
      {
        titulo: "Mes Ante Antepasado",
        nombre: "Hugo Medina",
        rol: "Farmacéutico Encargado",
        razon: "Destacó por su liderazgo en la implementación del nuevo sistema de ventas y la capacitación del equipo."
      }
    ];
    const itemsEnCarrito = computed(() => {
      const carrito = JSON.parse(sessionStorage.getItem("carrito") || "[]");
      return carrito.reduce((sum, item) => sum + item.cantidad, 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PharmacyFooter = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-wrapper" }, _attrs))} data-v-bcdd3372><header class="about-header" data-v-bcdd3372><button class="btn-back" data-v-bcdd3372><img${ssrRenderAttr("src", _imports_0)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1rem", "height": "1rem" })}" data-v-bcdd3372> Volver al menú </button><div class="header-actions" data-v-bcdd3372><button class="btn-user-profile" title="Perfil de Usuario" data-v-bcdd3372><img${ssrRenderAttr("src", _imports_1)} class="user-icon icon-img" alt="Usuario" data-v-bcdd3372><span class="user-name" data-v-bcdd3372>${ssrInterpolate(usuarioActivo.value)}</span></button><button class="btn-logout" data-v-bcdd3372><span data-v-bcdd3372>Cerrar Sesión</span><img${ssrRenderAttr("src", _imports_4)} class="icon icon-img" alt="→" data-v-bcdd3372></button></div></header><nav class="main-navbar" data-v-bcdd3372><ul class="nav-list" data-v-bcdd3372><li class="nav-item active" data-v-bcdd3372><img${ssrRenderAttr("src", _imports_7)} class="nav-icon icon-img" alt="Menú" data-v-bcdd3372> Menú </li><li class="nav-item" data-v-bcdd3372><img${ssrRenderAttr("src", _imports_0$1)} class="nav-icon icon-img" alt="Farmacia" data-v-bcdd3372> Farmacia </li><li class="nav-item" data-v-bcdd3372><img${ssrRenderAttr("src", _imports_4$1)} class="nav-icon icon-img" alt="Carrito" data-v-bcdd3372> Carrito `);
      if (itemsEnCarrito.value > 0) {
        _push(`<span class="cart-badge" data-v-bcdd3372>${ssrInterpolate(itemsEnCarrito.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li></ul></nav><div class="about-card" data-v-bcdd3372><div class="about-top" data-v-bcdd3372><img${ssrRenderAttr("src", _imports_0$1)} class="about-photo" alt="Farmacia Cartón Pintado" data-v-bcdd3372><div class="about-titles" data-v-bcdd3372><h1 class="about-name" data-v-bcdd3372>Farmacia Cartón Pintado</h1><p class="about-subtitle" data-v-bcdd3372>Tu farmacia de confianza</p></div></div><div class="about-desc" data-v-bcdd3372><p data-v-bcdd3372>Somos una farmacia comprometida con la salud y el bienestar de nuestra comunidad. Ofrecemos una amplia variedad de medicamentos con y sin receta, productos de cuidado personal y atención farmacéutica personalizada.</p></div><div class="about-info-grid" data-v-bcdd3372><div class="about-info-item" data-v-bcdd3372><img${ssrRenderAttr("src", _imports_7)} class="about-info-icon" alt="Dirección" data-v-bcdd3372><div data-v-bcdd3372><span class="about-info-label" data-v-bcdd3372>Dirección</span><span class="about-info-value" data-v-bcdd3372>Cartón Pintado, Chile</span></div></div><div class="about-info-item" data-v-bcdd3372><img${ssrRenderAttr("src", _imports_6$1)} class="about-info-icon" alt="Teléfono" data-v-bcdd3372><div data-v-bcdd3372><span class="about-info-label" data-v-bcdd3372>Teléfono</span><span class="about-info-value" data-v-bcdd3372>+56 9 9375 1234</span></div></div><div class="about-info-item" data-v-bcdd3372><img${ssrRenderAttr("src", _imports_11)} class="about-info-icon" alt="Horario" data-v-bcdd3372><div data-v-bcdd3372><span class="about-info-label" data-v-bcdd3372>Horario</span><span class="about-info-value" data-v-bcdd3372>Lun–Sáb: 9:00 – 21:00</span></div></div><div class="about-info-item" data-v-bcdd3372><img${ssrRenderAttr("src", _imports_2)} class="about-info-icon" alt="Email" data-v-bcdd3372><div data-v-bcdd3372><span class="about-info-label" data-v-bcdd3372>Email</span><span class="about-info-value" data-v-bcdd3372>hugoamedinao27@gmail.com</span></div></div></div><div class="employee-section" data-v-bcdd3372><h2 class="employee-title" data-v-bcdd3372>Trabajadores del Mes</h2><!--[-->`);
      ssrRenderList(empleados, (emp) => {
        _push(`<div class="employee-card" data-v-bcdd3372><img${ssrRenderAttr("src", _imports_9)} class="employee-photo" alt="Hugo Medina" data-v-bcdd3372><div class="employee-info" data-v-bcdd3372><span class="employee-badge" data-v-bcdd3372>${ssrInterpolate(emp.titulo)}</span><h3 class="employee-name" data-v-bcdd3372>${ssrInterpolate(emp.nombre)}</h3><p class="employee-role" data-v-bcdd3372>${ssrInterpolate(emp.rol)}</p><p class="employee-reason" data-v-bcdd3372>${ssrInterpolate(emp.razon)}</p></div></div>`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_component_PharmacyFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/conocenos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const conocenos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bcdd3372"]]);

export { conocenos as default };
//# sourceMappingURL=conocenos-Cyc3BkhF.mjs.map
