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
    (set, get) => ({
      documents: documentsMock,
      addDocument: (document: Document, file: File) => {
        const fileName = Date.now().toString()
        uploadFile(file, fileName)
        const url = getPublicUrl(fileName)
        set((state) => ({
          documents: [...state.documents, { ...document, url }],
        }))
      },
      removeDocument: async (documentId: number) => {
        const documentToRemove = get().documents.find(
          (doc) => doc.id === documentId
        )
        if (documentToRemove) {
          const path = new URL(documentToRemove.url).pathname.split("/").pop()!
          const result = await deleteFile(path).catch((error) => {
            console.error("Erro ao deletar arquivo do bucket:", error)
          })
          console.log("Resultado da exclusão do arquivo:", result)
        }
        set((state) => {
          return {
            documents: state.documents.filter((doc) => doc.id !== documentId),
          }
        })
      },
      reset: () => set({ documents: documentsMock }),
    }),
    {
      name: "documents-storage",
    }
  )
)
