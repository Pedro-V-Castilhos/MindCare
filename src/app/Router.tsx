import { createBrowserRouter } from "react-router"
import PacientDashboard from "../features/pacient/pages/Dashboard"
import Login from "../features/auth/Login"
import Appointments from "../features/pacient/pages/Appointments"
import PacientProgress from "../features/pacient/pages/PacientProgress"
import PacientNotes from "../features/pacient/pages/Notes"
import PacientDocuments from "../features/pacient/pages/Documents"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "pacient",
    children: [
      {
        path: "",
        element: <PacientDashboard />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "progress",
        element: <PacientProgress />,
      },
      {
        path: "notes",
        element: <PacientNotes />
      },
      {
        path: "documents",
        element: <PacientDocuments />
      }
    ]
  },
])

export default router
