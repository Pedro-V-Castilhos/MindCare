export interface User {
  id: number
  name: string
  email: string
  phone?: string
  password: string
  avatar?: string
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
