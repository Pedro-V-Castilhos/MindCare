export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Pacient extends User {
  role: "pacient"
  therapistId: number
  totalSessions: number
}

export interface Therapist extends User {
  role: "therapist"
  speciality: string
  CRPNumber: string
}
