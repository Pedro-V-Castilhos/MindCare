export interface ProgressEntry {
  id: number
  patientId: number
  date: Date
  mood: number
  anxietyLevel: number
  sleepQuality: number
  energyLevel: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}
