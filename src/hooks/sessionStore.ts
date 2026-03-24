import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Session } from "@/types/session"
import type { Pacient, Therapist } from "@/types/user"

interface SessionStore {
  session: Session | null
  setSession: (user: Pacient | Therapist) => void
  clearSession: () => void
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: (user: Pacient | Therapist) =>
        set({ session: { id: Date.now(), user } }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: "mindcare-session",
    }
  )
)
