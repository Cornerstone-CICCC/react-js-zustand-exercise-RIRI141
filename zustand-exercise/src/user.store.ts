import { create } from "zustand";
import { persist } from "zustand/middleware";
import {v4 as uuidv4} from "uuid"

type User = {
    id: string
    firstname: string,
    lastname: string,
    age: number,
    hobbies: string[]
}

type UserStoreState = {
    users: User[];
    addUser: (emp: Omit<User, "id">) => void;
    deleteUser: (id: string) => void;
  };


export const useUserStore = create<UserStoreState>()(
    persist(
        (set): UserStoreState => ({
            users: [],
            addUser: (user) => {
                const newUser = { ...user, id: uuidv4() }
                set((state) => ({
                    users: [...state.users, newUser]
                }))
            },
            deleteUser: (id) =>
                set((state) => ({
                  users: state.users.filter((user) => user.id !== id),
                })),
        }),
        {
            name: "user-storage"
        }
    )
)

