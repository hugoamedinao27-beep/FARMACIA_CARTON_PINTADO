import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { b as useRuntimeConfig } from './server.mjs';

const _imports_4 = publicAssetsURL("/images/arrow-right.svg");
const useApiBase = () => {
  const config = useRuntimeConfig();
  return config.public.apiBase;
};

export { _imports_4 as _, useApiBase as u };
//# sourceMappingURL=useApiBase-_9RWjn3k.mjs.map
