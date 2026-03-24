export interface ProgressEntry {
  id: number
  patientId: number
  date: string
  mood: string
  anxietyLevel: number
  sleepQuality: number
  energyLevel: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}
