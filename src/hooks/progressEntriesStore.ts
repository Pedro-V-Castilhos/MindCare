import { progressEntriesMock } from "@/mocks/progressEntriesMock"
import type { ProgressEntry } from "@/types/progressEntry"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ProgressEntriesStore {
  progressEntries: ProgressEntry[]
  addProgressEntry: (entry: ProgressEntry) => void
  removeProgressEntry: (entryId: number) => void
}

export const useProgressEntriesStore = create<ProgressEntriesStore>()(
  persist(
    (set) => ({
      progressEntries: progressEntriesMock,
      addProgressEntry: (entry: ProgressEntry) =>
        set((state) => ({
          progressEntries: [...state.progressEntries, entry],
        })),
      removeProgressEntry: (entryId: number) =>
        set((state) => ({
          progressEntries: state.progressEntries.filter(
            (entry) => entry.id !== entryId
          ),
        })),
    }),
    {
      name: "progress-entries-storage",
    }
  )
)
