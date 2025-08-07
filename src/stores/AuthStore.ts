import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@firebase/auth'
import firebase from 'firebase/compat/app'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: ref<User | null>(null),
    token: ref<string | null>(null)
  })
})
