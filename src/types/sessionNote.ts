export interface SessionNote {
  id: number
  appointmentId: number
  therapistId: number
  patientId: number
  date: Date
  content: string
  mood?: string
  progress?: number
  topicsCovered?: string[]
  privateNotes?: string
  nextSteps?: string
  createdAt: Date
  updatedAt: Date
}
