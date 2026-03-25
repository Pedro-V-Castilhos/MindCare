export interface Document {
  id: number
  name: string
  type: "Recibo" | "Relatório" | "Prescrição" | "Outro"
  uploadDate: Date
  size: number
  patientId: number
  therapistId: number
  sessionId?: number
  url: string
}
