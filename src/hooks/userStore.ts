import type { Pacient, Therapist } from "@/types/user"
import { persist } from "zustand/middleware"
import { create } from "zustand"
import { usersMock } from "@/mocks/usersMock"

interface UsersStore {
  users: (Pacient | Therapist)[]
  addUser: (user: Pacient | Therapist) => void
  removeUser: (userId: number) => void
  updateUser: (updatedUser: Pacient | Therapist) => void
}

export const useUserStore = create<UsersStore>()(
  persist(
    (set) => ({
      users: usersMock,
      addUser: (user: Pacient | Therapist) =>
        set((state) => ({ users: [...state.users, user] })),
      removeUser: (userId: number) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== userId),
        })),
      updateUser: (updatedUser: Pacient | Therapist) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          ),
        })),
    }),
    {
      name: "mindcare-users",
    }
  )
)
