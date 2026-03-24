import type { Appointment } from "@/types/appointment"

export const appointmentsMock: Appointment[] = [
  {
    id: 1,
    patientId: 1,
    therapistId: 1,
    date: new Date("2026-03-01T10:00:00"),
    time: "10:00",
    durationMinutes: 50,
    status: "completed",
    createdAt: new Date(),
    updatedAt: new Date(),
    notes: "Sessão focada em técnicas de respiração para ansiedade.",
    location: "Clínica MindCare - Sala 1",
    type: "presential",
  },
  {
    id: 2,
    patientId: 1,
    therapistId: 1,
    date: new Date("2026-03-27T10:00:00"),
    time: "10:00",
    durationMinutes: 60,
    status: "scheduled",
    createdAt: new Date(),
    updatedAt: new Date(),
    location: "Clínica MindCare - Sala 1",
    type: "presential",
  },
]
