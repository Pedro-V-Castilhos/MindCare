import type { Document } from "@/types/document"

export const documentsMock: Document[] = [
  {
    id: 1,
    name: "Consulta_2026-03-01.txt",
    type: "Recibo",
    uploadDate: new Date("2026-03-01T12:00:00"),
    size: 1750, // Em Bytes
    patientId: 1,
    therapistId: 2,
    sessionId: 1,
    url: "https://fukvhuyttybdligvqhke.supabase.co/storage/v1/object/public/MindCare_Documents/1774918091928.txt",
  },
]
