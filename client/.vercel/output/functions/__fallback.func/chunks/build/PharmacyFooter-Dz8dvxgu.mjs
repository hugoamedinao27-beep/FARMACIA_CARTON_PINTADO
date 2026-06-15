import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_2 } from './_virtual_public-DLRCsity.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_6$1 = publicAssetsURL("/images/phone.svg");
const _imports_6 = publicAssetsURL("/images/information-circle.svg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "pharmacy-footer" }, _attrs))} data-v-999b91ab><div class="footer-grid" data-v-999b91ab><div class="footer-col" data-v-999b91ab><div class="footer-brand" data-v-999b91ab><img${ssrRenderAttr("src", _imports_0)} class="footer-logo" alt="Farmacia" data-v-999b91ab><span class="footer-brand-name" data-v-999b91ab>Farmacia Cartón Pintado</span></div><p class="footer-desc" data-v-999b91ab>Tu farmacia de confianza, comprometida con tu salud y bienestar. Atención personalizada y los mejores precios.</p></div><div class="footer-col" data-v-999b91ab><h4 data-v-999b91ab>Enlaces Rápidos</h4><ul class="footer-links" data-v-999b91ab><li data-v-999b91ab><a href="/inicio" data-v-999b91ab>Catálogo</a></li><li data-v-999b91ab><a href="/dashboard" data-v-999b91ab>Carrito</a></li><li data-v-999b91ab><a href="/reportes" data-v-999b91ab>Reportes</a></li><li data-v-999b91ab><a href="/conocenos" data-v-999b91ab>Conócenos</a></li></ul></div><div class="footer-col" data-v-999b91ab><h4 data-v-999b91ab>Horarios</h4><ul class="footer-hours" data-v-999b91ab><li data-v-999b91ab><span data-v-999b91ab>Lun - Vie</span><span data-v-999b91ab>8:00 - 20:00</span></li><li data-v-999b91ab><span data-v-999b91ab>Sábado</span><span data-v-999b91ab>9:00 - 18:00</span></li><li data-v-999b91ab><span data-v-999b91ab>Domingo</span><span data-v-999b91ab>10:00 - 14:00</span></li></ul></div><div class="footer-col" data-v-999b91ab><h4 data-v-999b91ab>Contacto</h4><ul class="footer-contact" data-v-999b91ab><li data-v-999b91ab><img${ssrRenderAttr("src", _imports_6$1)} class="footer-contact-icon" alt="" data-v-999b91ab> +56 9 1234 5678</li><li data-v-999b91ab><img${ssrRenderAttr("src", _imports_2)} class="footer-contact-icon" alt="" data-v-999b91ab> contacto@farmaciacarton.cl</li><li data-v-999b91ab><img${ssrRenderAttr("src", _imports_6)} class="footer-contact-icon" alt="" data-v-999b91ab> Cartón Pintado, Chile</li></ul></div></div><div class="footer-bottom" data-v-999b91ab><p data-v-999b91ab>© 2026 Farmacia Cartón Pintado — Todos los derechos reservados</p></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PharmacyFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-999b91ab"]]), { __name: "PharmacyFooter" });

export { __nuxt_component_0 as _, _imports_6$1 as a, _imports_6 as b };
//# sourceMappingURL=PharmacyFooter-Dz8dvxgu.mjs.map
