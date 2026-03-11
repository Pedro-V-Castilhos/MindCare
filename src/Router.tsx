import { createBrowserRouter } from "react-router"
import PacientDashboard from "./components/screens/pacient/Dashboard"
import Login from "./components/screens/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <PacientDashboard />,
  },
])

export default router
