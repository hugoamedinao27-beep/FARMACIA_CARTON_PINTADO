import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_2 } from './_virtual_public-DLRCsity.mjs';
import { _ as _imports_1 } from './_virtual_public-Dkpo9KLm.mjs';
import { _ as _imports_3 } from './_virtual_public-CZGhMDjb.mjs';
import { u as useApiBase, _ as _imports_4 } from './useApiBase-_9RWjn3k.mjs';
import { _ as _imports_5 } from './_virtual_public-DGAbOgv7.mjs';
import { _ as _imports_6 } from './_virtual_public-DPty8Ept.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useApiBase();
    useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");
    const isRegister = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-wrapper" }, _attrs))} data-v-750dbca3><div class="login-card" data-v-750dbca3><div class="login-header" data-v-750dbca3><div class="brand-badge" data-v-750dbca3><img${ssrRenderAttr("src", _imports_0)} class="brand-logo" alt="Farmacia" data-v-750dbca3></div><h2 data-v-750dbca3>Farmacia Cartón Pintado</h2><p class="subtitle" data-v-750dbca3>${ssrInterpolate(isRegister.value ? "Registro de Nuevos Operadores" : "Inicio de Sesión")}</p></div><form class="login-form" data-v-750dbca3>`);
      if (isRegister.value) {
        _push(`<div class="input-group" data-v-750dbca3><label for="name" data-v-750dbca3>Nombre completo</label><div class="input-with-icon" data-v-750dbca3><img${ssrRenderAttr("src", _imports_1)} class="input-icon" alt="Usuario" data-v-750dbca3><input id="name"${ssrRenderAttr("value", name.value)} type="text" placeholder="Nombre del operador" required data-v-750dbca3></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="input-group" data-v-750dbca3><label for="email" data-v-750dbca3>Correo electrónico</label><div class="input-with-icon" data-v-750dbca3><img${ssrRenderAttr("src", _imports_2)} class="input-icon" alt="Email" data-v-750dbca3><input id="email"${ssrRenderAttr("value", email.value)} type="email" placeholder="ejemplo@farmacia.com" required data-v-750dbca3></div></div><div class="input-group" data-v-750dbca3><label for="password" data-v-750dbca3>Contraseña</label><div class="input-with-icon" data-v-750dbca3><img${ssrRenderAttr("src", _imports_3)} class="input-icon" alt="Contraseña" data-v-750dbca3><input id="password"${ssrRenderAttr("value", password.value)} type="password" placeholder="Ingresa tu contraseña" required data-v-750dbca3></div></div><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="btn-login-submit" data-v-750dbca3>`);
      if (!loading.value) {
        _push(`<span data-v-750dbca3>${ssrInterpolate(isRegister.value ? "Crear Cuenta" : "Iniciar Sesión")} <img${ssrRenderAttr("src", _imports_4)} class="arrow" alt="→" data-v-750dbca3></span>`);
      } else {
        _push(`<span data-v-750dbca3>${ssrInterpolate(isRegister.value ? "Procesando..." : "Verificando...")}</span>`);
      }
      _push(`</button></form><div class="toggle-mode" data-v-750dbca3>`);
      if (!isRegister.value) {
        _push(`<p data-v-750dbca3> ¿No tienes cuenta? <span class="toggle-link" data-v-750dbca3>Crear cuenta</span></p>`);
      } else {
        _push(`<p data-v-750dbca3> ¿Ya tienes cuenta? <span class="toggle-link" data-v-750dbca3>Iniciar sesión</span></p>`);
      }
      if (!isRegister.value) {
        _push(`<p class="forgot-link" data-v-750dbca3>`);
        _push(ssrRenderComponent(_component_router_link, { to: "/forgot-password" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`¿Olvidaste tu contraseña?`);
            } else {
              return [
                createTextVNode("¿Olvidaste tu contraseña?")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (errorMessage.value) {
        _push(`<div class="alert-box alert-error" data-v-750dbca3><img${ssrRenderAttr("src", _imports_5)} class="alert-icon" alt="Error" data-v-750dbca3><div data-v-750dbca3><strong data-v-750dbca3>Error</strong><p data-v-750dbca3>${ssrInterpolate(errorMessage.value)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (successMessage.value) {
        _push(`<div class="alert-box alert-success" data-v-750dbca3><img${ssrRenderAttr("src", _imports_6)} class="alert-icon" alt="Éxito" data-v-750dbca3><div data-v-750dbca3><strong data-v-750dbca3>Registro Exitoso</strong><p data-v-750dbca3>${ssrInterpolate(successMessage.value)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-750dbca3"]]);

export { index as default };
//# sourceMappingURL=index-BjDBSsE-.mjs.map
