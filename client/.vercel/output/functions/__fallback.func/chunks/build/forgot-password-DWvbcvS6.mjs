import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_2 } from './_virtual_public-DLRCsity.mjs';
import { u as useApiBase, _ as _imports_4 } from './useApiBase-_9RWjn3k.mjs';
import { _ as _imports_6 } from './_virtual_public-DPty8Ept.mjs';
import { _ as _imports_5 } from './_virtual_public-DGAbOgv7.mjs';
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
import 'vue-router';

const _sfc_main = {
  __name: "forgot-password",
  __ssrInlineRender: true,
  setup(__props) {
    useApiBase();
    const email = ref("");
    const loading = ref(false);
    const message = ref("");
    const errorMessage = ref("");
    const resetToken = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-wrapper" }, _attrs))} data-v-b7b5b320><div class="login-card" data-v-b7b5b320><div class="login-header" data-v-b7b5b320><div class="brand-badge" data-v-b7b5b320><img${ssrRenderAttr("src", _imports_0)} class="brand-logo" alt="Farmacia" data-v-b7b5b320></div><h2 data-v-b7b5b320>Restablecer Contraseña</h2><p class="subtitle" data-v-b7b5b320>Recuperación de acceso</p></div><form class="login-form" data-v-b7b5b320><div class="input-group" data-v-b7b5b320><label data-v-b7b5b320>Correo electrónico</label><div class="input-with-icon" data-v-b7b5b320><img${ssrRenderAttr("src", _imports_2)} class="input-icon" alt="Email" data-v-b7b5b320><input${ssrRenderAttr("value", email.value)} type="email" placeholder="tu@email.com" required data-v-b7b5b320></div></div><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="btn-login-submit" data-v-b7b5b320>`);
      if (!loading.value) {
        _push(`<span data-v-b7b5b320>Enviar Enlace <img${ssrRenderAttr("src", _imports_4)} class="arrow" alt="→" data-v-b7b5b320></span>`);
      } else {
        _push(`<span data-v-b7b5b320>Procesando...</span>`);
      }
      _push(`</button></form><div class="toggle-mode" data-v-b7b5b320><p data-v-b7b5b320>`);
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
      if (message.value) {
        _push(`<div class="alert-box alert-success" data-v-b7b5b320><img${ssrRenderAttr("src", _imports_6)} class="alert-icon" alt="Éxito" data-v-b7b5b320><div data-v-b7b5b320><strong data-v-b7b5b320>Solicitud Procesada</strong><p data-v-b7b5b320>${ssrInterpolate(message.value)}</p>`);
        if (resetToken.value) {
          _push(`<p class="token-display" data-v-b7b5b320>Token: ${ssrInterpolate(resetToken.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (errorMessage.value) {
        _push(`<div class="alert-box alert-error" data-v-b7b5b320><img${ssrRenderAttr("src", _imports_5)} class="alert-icon" alt="Error" data-v-b7b5b320><div data-v-b7b5b320><strong data-v-b7b5b320>Error</strong><p data-v-b7b5b320>${ssrInterpolate(errorMessage.value)}</p></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forgot-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const forgotPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7b5b320"]]);

export { forgotPassword as default };
//# sourceMappingURL=forgot-password-DWvbcvS6.mjs.map
