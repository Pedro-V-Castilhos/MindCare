import { documentsMock } from "@/mocks/documentsMock"
import type { Document } from "@/types/document"
import { persist } from "zustand/middleware"
import { create } from "zustand/react"
import { deleteFile, uploadFile, getPublicUrl } from "@/lib/bucket"

interface DocumentsStore {
  documents: Document[]
  addDocument: (document: Document, file: File) => void
  removeDocument: (documentId: number) => void
  reset: () => void
}

export const useDocumentsStore = create<DocumentsStore>()(
  persist(
    (set) => ({
      documents: documentsMock,
      addDocument: (document: Document, file: File) => {
        const fileName = Date.now().toString()
        uploadFile(file, fileName)
        const url = getPublicUrl(fileName)
        set((state) => ({
          documents: [...state.documents, { ...document, url }],
        }))
      },
      removeDocument: (documentId: number) =>
        set((state) => {
          const documentToRemove = state.documents.find(
            (doc) => doc.id === documentId
          )
          if (documentToRemove) {
            deleteFile(documentToRemove.url)
          }
          return {
            documents: state.documents.filter((doc) => doc.id !== documentId),
          }
        }),
      reset: () => set({ documents: documentsMock }),
    }),
    {
      name: "documents-storage",
    }
  )
)
