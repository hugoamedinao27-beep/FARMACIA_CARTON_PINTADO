export const useApiBase = () => {
  const config = useRuntimeConfig()
  return config.public.apiBase
}
