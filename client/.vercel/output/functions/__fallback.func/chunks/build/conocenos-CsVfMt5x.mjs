import { _ as _imports_5, b as _imports_7, a as __nuxt_component_0 } from './_virtual_public-B9r-wUaI.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './_virtual_public-DKjxHpJN.mjs';
import { _ as _imports_1 } from './_virtual_public-Dkpo9KLm.mjs';
import { u as useApiBase, _ as _imports_4 } from './useApiBase-_9RWjn3k.mjs';
import { _ as _imports_8 } from './_virtual_public-ID_7u7oQ.mjs';
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

const _imports_10 = publicAssetsURL("/images/hugoperro.jpeg");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-wrapper" }, _attrs))} data-v-97647e2d><header class="about-header" data-v-97647e2d><button class="btn-back" data-v-97647e2d><img${ssrRenderAttr("src", _imports_0)} class="icon-img" alt="" style="${ssrRenderStyle({ "width": "1rem", "height": "1rem" })}" data-v-97647e2d> Volver al menú </button><div class="header-actions" data-v-97647e2d><button class="btn-user-profile" title="Perfil de Usuario" data-v-97647e2d><img${ssrRenderAttr("src", _imports_1)} class="user-icon icon-img" alt="Usuario" data-v-97647e2d><span class="user-name" data-v-97647e2d>${ssrInterpolate(usuarioActivo.value)}</span></button><button class="btn-logout" data-v-97647e2d><span data-v-97647e2d>Cerrar Sesión</span><img${ssrRenderAttr("src", _imports_4)} class="icon icon-img" alt="→" data-v-97647e2d></button></div></header><nav class="main-navbar" data-v-97647e2d><ul class="nav-list" data-v-97647e2d><li class="nav-item active" data-v-97647e2d><img${ssrRenderAttr("src", _imports_8)} class="nav-icon icon-img" alt="Menú" data-v-97647e2d> Menú </li><li class="nav-item" data-v-97647e2d><img${ssrRenderAttr("src", _imports_0$1)} class="nav-icon icon-img" alt="Farmacia" data-v-97647e2d> Farmacia </li><li class="nav-item" data-v-97647e2d><img${ssrRenderAttr("src", _imports_5)} class="nav-icon icon-img" alt="Reportes" data-v-97647e2d> Reportes </li><li class="nav-item" data-v-97647e2d><img${ssrRenderAttr("src", _imports_4$1)} class="nav-icon icon-img" alt="Carrito" data-v-97647e2d> Carrito `);
      if (itemsEnCarrito.value > 0) {
        _push(`<span class="cart-badge" data-v-97647e2d>${ssrInterpolate(itemsEnCarrito.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li></ul></nav><div class="about-card" data-v-97647e2d><div class="about-top" data-v-97647e2d><img${ssrRenderAttr("src", _imports_0$1)} class="about-photo" alt="Farmacia Cartón Pintado" data-v-97647e2d><div class="about-titles" data-v-97647e2d><h1 class="about-name" data-v-97647e2d>Farmacia Cartón Pintado</h1><p class="about-subtitle" data-v-97647e2d>Tu farmacia de confianza</p></div></div><div class="about-desc" data-v-97647e2d><p data-v-97647e2d>Somos una farmacia comprometida con la salud y el bienestar de nuestra comunidad. Ofrecemos una amplia variedad de medicamentos con y sin receta, productos de cuidado personal y atención farmacéutica personalizada.</p></div><div class="about-info-grid" data-v-97647e2d><div class="about-info-item" data-v-97647e2d><img${ssrRenderAttr("src", _imports_8)} class="about-info-icon" alt="Dirección" data-v-97647e2d><div data-v-97647e2d><span class="about-info-label" data-v-97647e2d>Dirección</span><span class="about-info-value" data-v-97647e2d>Cartón Pintado, Chile</span></div></div><div class="about-info-item" data-v-97647e2d><img${ssrRenderAttr("src", _imports_7)} class="about-info-icon" alt="Teléfono" data-v-97647e2d><div data-v-97647e2d><span class="about-info-label" data-v-97647e2d>Teléfono</span><span class="about-info-value" data-v-97647e2d>+56 9 9375 1234</span></div></div><div class="about-info-item" data-v-97647e2d><img${ssrRenderAttr("src", _imports_11)} class="about-info-icon" alt="Horario" data-v-97647e2d><div data-v-97647e2d><span class="about-info-label" data-v-97647e2d>Horario</span><span class="about-info-value" data-v-97647e2d>Lun–Sáb: 9:00 – 21:00</span></div></div><div class="about-info-item" data-v-97647e2d><img${ssrRenderAttr("src", _imports_2)} class="about-info-icon" alt="Email" data-v-97647e2d><div data-v-97647e2d><span class="about-info-label" data-v-97647e2d>Email</span><span class="about-info-value" data-v-97647e2d>hugoamedinao27@gmail.com</span></div></div></div><div class="employee-section" data-v-97647e2d><h2 class="employee-title" data-v-97647e2d>Trabajadores del Mes</h2><!--[-->`);
      ssrRenderList(empleados, (emp) => {
        _push(`<div class="employee-card" data-v-97647e2d><img${ssrRenderAttr("src", _imports_10)} class="employee-photo" alt="Hugo Medina" data-v-97647e2d><div class="employee-info" data-v-97647e2d><span class="employee-badge" data-v-97647e2d>${ssrInterpolate(emp.titulo)}</span><h3 class="employee-name" data-v-97647e2d>${ssrInterpolate(emp.nombre)}</h3><p class="employee-role" data-v-97647e2d>${ssrInterpolate(emp.rol)}</p><p class="employee-reason" data-v-97647e2d>${ssrInterpolate(emp.razon)}</p></div></div>`);
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
const conocenos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-97647e2d"]]);

export { conocenos as default };
//# sourceMappingURL=conocenos-CsVfMt5x.mjs.map
