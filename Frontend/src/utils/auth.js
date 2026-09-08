export const API_BASE = "http://localhost:3000/api/auth"

export const loginApi = async ({ email, password }) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.message || "Login failed")
  return data
}

export const signupApi = async ({ name, email, password, role }) => {
  const res = await fetch(`${API_BASE}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.message || "Signup failed")
  return data
}

export const setAuth = ({ token, role }) => {
  if (token) localStorage.setItem("token", token)
  if (role) localStorage.setItem("role", role)
}

export const clearAuth = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
}

export const getToken = () => localStorage.getItem("token")
export const getRole = () => localStorage.getItem("role")
