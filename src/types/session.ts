import type { Pacient, Therapist } from "@/types/user"

export interface Session {
  id: number
  user: Therapist | Pacient
}
