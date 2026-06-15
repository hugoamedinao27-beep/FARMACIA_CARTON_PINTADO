import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_3 } from './_virtual_public-CZGhMDjb.mjs';
import { u as useApiBase, _ as _imports_4 } from './useApiBase-_9RWjn3k.mjs';
import { _ as _imports_6 } from './_virtual_public-DPty8Ept.mjs';
import { _ as _imports_4$1 } from './_virtual_public-kOox1yrL.mjs';
import { useRoute, useRouter } from 'vue-router';
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

const _imports_0 = publicAssetsURL("/images/key.svg");
const _sfc_main = {
  __name: "reset-password",
  __ssrInlineRender: true,
  setup(__props) {
    useApiBase();
    useRoute();
    useRouter();
    const password = ref("");
    const confirmPassword = ref("");
    const loading = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-wrapper" }, _attrs))} data-v-d568182c><div class="glow-orb premium-teal" data-v-d568182c></div><div class="glow-orb cyber-purple" data-v-d568182c></div><div class="login-card" data-v-d568182c><div class="login-header" data-v-d568182c><div class="brand-badge" data-v-d568182c><img${ssrRenderAttr("src", _imports_0)} class="pill-emoji icon-img" alt="Restablecer" data-v-d568182c><div class="pulse-ring" data-v-d568182c></div></div><h2 data-v-d568182c>Nueva Contraseña</h2><p class="matrix-text" data-v-d568182c>RESTABLECIENDO ACCESO</p></div><form class="login-form" data-v-d568182c><div class="input-group" data-v-d568182c><label data-v-d568182c>ACCESS_PASSWORD</label><div class="input-with-icon" data-v-d568182c><img${ssrRenderAttr("src", _imports_3)} class="input-icon icon-img" alt="Contraseña" data-v-d568182c><input${ssrRenderAttr("value", password.value)} type="password" placeholder="Nueva contraseña" required data-v-d568182c></div></div><div class="input-group" data-v-d568182c><label data-v-d568182c>CONFIRM_PASSWORD</label><div class="input-with-icon" data-v-d568182c><img${ssrRenderAttr("src", _imports_3)} class="input-icon icon-img" alt="Confirmar" data-v-d568182c><input${ssrRenderAttr("value", confirmPassword.value)} type="password" placeholder="Confirmar contraseña" required data-v-d568182c></div></div><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="btn-login-submit" data-v-d568182c>`);
      if (!loading.value) {
        _push(`<span data-v-d568182c>RESTABLECER <img${ssrRenderAttr("src", _imports_4)} class="arrow icon-img" alt="→" style="${ssrRenderStyle({ "width": "1em", "height": "1em", "vertical-align": "middle" })}" data-v-d568182c></span>`);
      } else {
        _push(`<span data-v-d568182c>PROCESANDO...</span>`);
      }
      _push(`</button></form><div class="toggle-mode" data-v-d568182c><p data-v-d568182c>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "toggle-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Volver al inicio de sesión`);
          } else {
            return [
              createTextVNode("Volver al inicio de sesión")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div>`);
      if (successMessage.value) {
        _push(`<div class="success-box" data-v-d568182c><img${ssrRenderAttr("src", _imports_6)} class="success-icon icon-img" alt="Éxito" data-v-d568182c><div class="success-details" data-v-d568182c><strong data-v-d568182c>CONTRASEÑA ACTUALIZADA</strong><p data-v-d568182c>${ssrInterpolate(successMessage.value)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (errorMessage.value) {
        _push(`<div class="error-box" data-v-d568182c><img${ssrRenderAttr("src", _imports_4$1)} class="error-icon icon-img" alt="Error" data-v-d568182c><div class="error-details" data-v-d568182c><strong data-v-d568182c>ERROR</strong><p data-v-d568182c>${ssrInterpolate(errorMessage.value)}</p></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reset-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const resetPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d568182c"]]);

export { resetPassword as default };
//# sourceMappingURL=reset-password-CcRKPLM1.mjs.map
