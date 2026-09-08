import { authHeader } from "./auth"

const EMPLOYEE_BASE = "http://localhost:3000/api/employees"

const handleRes = async (res) => {
  const data = await res.json().catch(() => ({}))
  if (res.status === 401) {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    window.location.href = "/login"
    throw new Error("Session expired. Please log in again.")
  }
  if (!res.ok) throw new Error(data?.message || "Request failed")
  return data
}

export const fetchEmployees = async () => {
  const res = await fetch(`${EMPLOYEE_BASE}/get`, {
    headers: { "Content-Type": "application/json", ...authHeader() },
  })
  const data = await handleRes(res)
  return data?.employees || []
}

export const createEmployeeApi = async ({ name, email, password }) => {
  const res = await fetch(`${EMPLOYEE_BASE}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ name, email, password }),
  })
  return handleRes(res)
}

export const assignTicketApi = async ({ employeeId, ticketId }) => {
  const res = await fetch(`${EMPLOYEE_BASE}/assign/${employeeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ ticketId }),
  })
  return handleRes(res)
}
