export interface SessionNote {
  id: number
  appointmentId: number
  therapistId: number
  patientId: number
  date: string
  content: string
  mood?: string
  progress?: number
  topicsCovered?: string[]
  nextSteps?: string
  createdAt: string
  updatedAt: string
}
