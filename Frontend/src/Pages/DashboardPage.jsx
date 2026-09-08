import { useNavigate } from 'react-router-dom'
import Dashboard from '../Components/Dashboard/Dashboard'
import Container from '../Components/Global/Container'
import { clearAuth, getRole } from '../utils/auth'

const DashboardPage = () => {
    const navigate = useNavigate()
    const role = getRole()

    const handleLogout = () => {
        clearAuth()
        navigate("/login", { replace: true })
    }

    return (
        <>
            <Container>
                <div className="mx-auto mb-4 flex max-w-6xl items-center justify-end gap-3">
                    {role && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {role}
                        </span>
                    )}
                    <button onClick={handleLogout} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                        Logout
                    </button>
                </div>
                <Dashboard />
            </Container>
        </>
    )
}

export default DashboardPage