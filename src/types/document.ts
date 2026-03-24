export interface Document {
  id: number
  name: string
  type: "receipt" | "report" | "prescription" | "other"
  uploadDate: Date
  size: number
  patientId: number
  therapistId: number
  sessionId?: number
  url: string
}
