function getApiBase() {
  return (import.meta.env.VITE_SITE_DATA_API_BASE ?? '').trim()
}

export function isSiteApiConfigured() {
  return Boolean(getApiBase())
}

function buildUrl(pathname) {
  const base = getApiBase()
  if (!base) {
    return pathname
  }
  return new URL(pathname, base).toString()
}

export async function fetchSiteDataFromServer() {
  const response = await fetch(buildUrl('/api/site-data'), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Could not load site data')
  }

  return response.json()
}

export async function loginAdminOnServer({ username, password }) {
  const response = await fetch(buildUrl('/api/admin/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  const payload = await response.json()
  if (!payload?.token || typeof payload.token !== 'string') {
    throw new Error('Login failed')
  }
  return payload
}

export async function saveSiteDataToServer(siteData, token) {
  const response = await fetch(buildUrl('/api/site-data'), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(siteData),
  })

  if (!response.ok) {
    throw new Error('Save failed')
  }

  return response.json()
}

