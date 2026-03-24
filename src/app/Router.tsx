import { createBrowserRouter } from "react-router"
import PacientDashboard from "../components/screens/pacient/Dashboard"
import Login from "../components/screens/Login"
import Appointments from "../components/screens/pacient/Appointments"
import PacientProgress from "../components/screens/pacient/PacientProgress"
import PacientNotes from "../components/screens/pacient/Notes"
import PacientDocuments from "../components/screens/pacient/Documents"

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
