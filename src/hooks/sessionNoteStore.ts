import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { SessionNote } from "@/types/sessionNote"
import { sessionNotesMock } from "@/mocks/sessionNotesMock"

interface SessionNoteStore {
  sessionNotes: SessionNote[]
  addSessionNote: (note: SessionNote) => void
  removeSessionNote: (noteId: number) => void
  updateSessionNote: (updatedNote: SessionNote) => void
}

export const useSessionNoteStore = create<SessionNoteStore>()(
  persist(
    (set) => ({
      sessionNotes: sessionNotesMock,
      addSessionNote: (note: SessionNote) =>
        set((state) => ({ sessionNotes: [...state.sessionNotes, note] })),
      removeSessionNote: (noteId: number) =>
        set((state) => ({
          sessionNotes: state.sessionNotes.filter((note) => note.id !== noteId),
        })),
      updateSessionNote: (updatedNote: SessionNote) =>
        set((state) => ({
          sessionNotes: state.sessionNotes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
          ),
        })),
    }),
    {
      name: "sessionNoteStore",
    }
  )
)
