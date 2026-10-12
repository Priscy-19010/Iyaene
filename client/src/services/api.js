const BASE_URL = "http://localhost:4000/api";
const TOKEN_KEY = "iyaene_admin_token";

// Where the admin's login token is kept in the browser
export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request(endpoint, options = {}) {
  const token = tokenStore.get();
  const config = {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      // Proves to the server that the admin is logged in
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  // Token missing, expired or invalid: clear it and send the admin back to the login page
  // (not for the login request itself, where 401 just means a wrong password)
  if (response.status === 401 && token && endpoint !== "/auth/login") {
    tokenStore.clear();
    window.location.href = "/admin/login";
  }

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  get: (endpoint) => request(endpoint, { method: "GET" }),

  post: (endpoint, body) =>
    request(endpoint, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  patch: (endpoint, body) =>
    request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};