import { appointmentsMock } from "@/mocks/appointmentsMock"
import type { Appointment } from "@/types/appointment"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AppointmentStore {
  appointments: Appointment[]
  addAppointment: (appointment: Appointment) => void
  removeAppointment: (appointmentId: number) => void
  updateAppointment: (updatedAppointment: Appointment) => void
}

export const useAppointmentStore = create<AppointmentStore>()(
  persist(
    (set) => ({
      appointments: appointmentsMock,
      addAppointment: (appointment: Appointment) => {
        set((state) => ({ appointments: [...state.appointments, appointment] }))
      },
      removeAppointment: (appointmentId: number) => {
        set((state) => ({
          appointments: state.appointments.filter(
            (appt) => appt.id !== appointmentId
          ),
        }))
      },
      updateAppointment: (updatedAppointment: Appointment) => {
        set((state) => ({
          appointments: state.appointments.map((appt) =>
            appt.id === updatedAppointment.id ? updatedAppointment : appt
          ),
        }))
      },
    }),
    {
      name: "appointment-storage",
    }
  )
)
