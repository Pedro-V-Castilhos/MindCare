export interface Appointment {
  id: number
  patientId: number
  therapistId: number
  date: Date
  time: string
  durationMinutes: number
  status: "scheduled" | "completed" | "canceled"
  location?: string
  type?: "presential" | "online"
  createdAt: Date
  updatedAt: Date
}
