import { createBrowserRouter } from "react-router"
import PacientDashboard from "./components/screens/pacient/Dashboard"
import Login from "./components/screens/Login"
import Appointments from "./components/screens/pacient/Appointments"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <PacientDashboard />,
  },
  {
    path: "appointments",
    element: <Appointments />,
  }
])

export default router
