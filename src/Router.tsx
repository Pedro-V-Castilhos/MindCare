import { createBrowserRouter } from "react-router"
import PacientDashboard from "./components/screens/pacient/Dashboard"
import Login from "./components/screens/Login"
import Appointments from "./components/screens/pacient/Appointments"
import PacientProgress from "./components/screens/pacient/PacientProgress"

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
  },
  {
    path: "progress",
    element: <PacientProgress />,
  }
])

export default router
