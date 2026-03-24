import type { SessionNote } from "@/types/sessionNote"

export const sessionNotesMock: SessionNote[] = [
  {
    id: 1,
    appointmentId: 1,
    therapistId: 1,
    patientId: 1,
    date: new Date("2026-03-01T11:00:00"),
    content: "Sessão focada em técnicas de respiração para ansiedade.",
    mood: "ansioso",
    progress: 20,
    topicsCovered: ["técnicas de respiração", "ansiedade"],
    nextSteps: "Praticar exercícios de respiração diariamente.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
