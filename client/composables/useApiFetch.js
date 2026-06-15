export const useApiFetch = () => {
  const apiBase = useApiBase()

  const authHeaders = () => {
    const token = sessionStorage.getItem('token')
    return token ? { 'Authorization': `Bearer ${token}` } : {}
  }

  const get = async (url, opts = {}) => {
    return fetch(`${apiBase}${url}`, {
      ...opts,
      headers: { ...opts.headers, ...authHeaders() }
    })
  }

  const post = async (url, body, opts = {}) => {
    return fetch(`${apiBase}${url}`, {
      method: 'POST',
      ...opts,
      headers: { 'Content-Type': 'application/json', ...opts.headers, ...authHeaders() },
      body: JSON.stringify(body)
    })
  }

  const put = async (url, body, opts = {}) => {
    return fetch(`${apiBase}${url}`, {
      method: 'PUT',
      ...opts,
      headers: { 'Content-Type': 'application/json', ...opts.headers, ...authHeaders() },
      body: JSON.stringify(body)
    })
  }

  const del = async (url, opts = {}) => {
    return fetch(`${apiBase}${url}`, {
      method: 'DELETE',
      ...opts,
      headers: { ...opts.headers, ...authHeaders() }
    })
  }

  return { get, post, put, del }
}
