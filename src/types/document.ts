export interface Document {
  id: number
  name: string
  type: "receipt" | "report" | "prescription" | "other"
  uploadDate: string
  size: number
  patientId: number
  therapistId: number
  sessionId?: number
  url: string
}
