import type { Pacient, Therapist } from "@/types/user"

export const usersMock: (Pacient | Therapist)[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "teste@teste.com",
    password: "1234",
    role: "pacient",
    therapistId: 2,
    totalSessions: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    firstName: "Dr. Smith",
    lastName: "Johnson",
    email: "dr.smith@teste.com",
    password: "1234",
    role: "therapist",
    speciality: "Psicologia Clínica",
    CRPNumber: "06/123456",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
