import type { Document } from "@/types/document"
import { persist } from "zustand/middleware/persist"
import { create } from "zustand/react"

interface DocumentsStore {
  documents: Document[]
  addDocument: (document: Document) => void
  removeDocument: (documentId: number) => void
}

export const useDocumentsStore = create<DocumentsStore>()(
  persist(
    (set) => ({
      documents: [],
      addDocument: (document: Document) =>
        set((state) => ({ documents: [...state.documents, document] })),
      removeDocument: (documentId: number) =>
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== documentId),
        })),
    }),
    {
      name: "documents-storage",
    }
  )
)
