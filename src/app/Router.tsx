import { createBrowserRouter } from "react-router"
import PacientDashboard from "../features/pacient/screens/Dashboard"
import Login from "../features/auth/Login"
import Appointments from "../features/pacient/screens/Appointments"
import PacientProgress from "../features/pacient/screens/PacientProgress"
import PacientNotes from "../features/pacient/screens/Notes"
import PacientDocuments from "../features/pacient/screens/Documents"
import Register from "@/features/auth/Register"
import TherapistDashboard from "@/features/therapist/screens/Dashboard"
import TherapistAppointments from "@/features/therapist/screens/Appointments"
import TherapistPacientProgress from "@/features/therapist/screens/PacientProgress"
import TherapistNotes from "@/features/therapist/screens/Notes"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
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
  {
    path: "therapist",
    children: [
      {
        path: "",
        element: <TherapistDashboard />
      },
      {
        path: "appointments",
        element: <TherapistAppointments />
      },
      {
        path: "progress",
        element: <TherapistPacientProgress />
      },
      {
        path: "notes",
        element: <TherapistNotes />
      }
    ]
  }
])

export default router
