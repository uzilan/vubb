import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@firebase/auth'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: ref<User | null>(null),
    token: ref<string | null>(null)
  })
})
