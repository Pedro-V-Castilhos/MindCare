import type { Pacient, Therapist } from "@/types/user"
import { persist } from "zustand/middleware"
import { create } from "zustand"

interface UsersStore {
  users: (Pacient | Therapist)[]
  addUser: (user: Pacient | Therapist) => void
  removeUser: (userId: number) => void
  updateUser: (updatedUser: Pacient | Therapist) => void
}

export const useUserStore = create<UsersStore>()(
  persist(
    (set) => ({
      users: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "teste@teste.com",
          password: "1234",
          role: "pacient",
          therapistId: 1,
          totalSessions: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
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
