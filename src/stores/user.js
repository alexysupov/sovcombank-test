import { defineStore } from 'pinia'
import users from "@/mocks/users.js";

const [user] = users

export const useUserStore = defineStore('user', {
    state: () => ({
        user
    }),

    actions: {
        changeUser(user) {
            this.user = user
        }
    }
})
