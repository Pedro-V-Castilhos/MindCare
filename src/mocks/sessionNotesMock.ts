import type { SessionNote } from "@/types/sessionNote"

export const sessionNotesMock: SessionNote[] = [
  {
    id: 1,
    appointmentId: 1,
    therapistId: 2,
    patientId: 1,
    date: new Date("2026-03-01T11:00:00"),
    content: "Sessão focada em técnicas de respiração para ansiedade.",
    mood: "Ansioso",
    progress: 20,
    topicsCovered: ["Técnicas de respiração", "Ansiedade"],
    nextSteps: "Praticar exercícios de respiração diariamente.",
    privateNotes: "Paciente relatou dificuldade em dormir devido à ansiedade.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
