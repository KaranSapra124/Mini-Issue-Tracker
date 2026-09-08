import { useEffect, useState } from "react"
import { assignTicketApi, fetchEmployees } from "../../utils/employeeApi"

const AssignTicketModal = ({ ticket, setModal, onAssigned }) => {
  const [employees, setEmployees] = useState([])
  const [selectedId, setSelectedId] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const list = await fetchEmployees()
        setEmployees(list)
      } catch (err) {
        setError(err.message)
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [])

  const toggleSelect = (id) => {
    setSelectedId((prev) => (prev === id ? "" : id))
  }

  const handleAssign = async () => {
    setError("")
    if (!selectedId) {
      setError("Select one employee")
      return
    }
    setLoading(true)
    try {
      await assignTicketApi({ employeeId: selectedId, ticketId: ticket._id })
      setModal(false)
      onAssigned?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Assign Ticket</h1>
          <p className="mt-1 truncate text-sm text-gray-500">{ticket?.title}</p>
        </div>
        {fetching ? (
          <p className="py-6 text-center text-sm text-gray-500">Loading employees...</p>
        ) : employees.length === 0 ? (
          <p className="rounded-lg bg-gray-50 px-4 py-4 text-center text-sm text-gray-600">
            No employees found. Create an employee first.
          </p>
        ) : (
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {employees.map((emp) => (
              <label
                key={emp._id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${selectedId === emp._id ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}
              >
                <input
                  type="checkbox"
                  checked={selectedId === emp._id}
                  onChange={() => toggleSelect(emp._id)}
                  className="h-4 w-4 accent-gray-900"
                />
                <span className="flex-1">
                  <span className="block font-medium text-gray-900">{emp.name}</span>
                  <span className="block text-xs text-gray-500">{emp.email}</span>
                </span>
                <span className="text-xs text-gray-500">{emp.ticketsAssigned?.length || 0} assigned</span>
              </label>
            ))}
          </div>
        )}
        {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}
        <div className="mt-8 flex justify-end gap-3">
          <button onClick={() => setModal(false)} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={loading || fetching || employees.length === 0}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssignTicketModal
