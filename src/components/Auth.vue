<template>
  <div class="login" v-if="!store.user">
    <div class="login-button-google">
      <CButton color="primary" @click="loginWithGoogle" class="google-login-btn">
        <svg class="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {{ $t('message.loginWithGoogle') }}
      </CButton>
    </div>
  </div>
  <div class="logout" v-if="store.user">
    <CButton color="primary" @click="logout"> {{ $t('message.logout') }}</CButton>
  </div>
</template>
<script setup lang="ts">
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { useAuthStore } from '@/stores/AuthStore'

// Component name for linting
defineOptions({
  name: 'AuthComponent'
})

const store = useAuthStore()

const emit = defineEmits(['loginDone', 'logoutDone'])

const loginWithGoogle = () => login(new firebase.auth.GoogleAuthProvider())

const login = (authProvider: firebase.auth.AuthProvider) => {
  firebase
    .auth()
    .signInWithPopup(authProvider)
    .then(() => {
      // The onAuthStateChanged listener will handle updating the store
      emit('loginDone')
    })
    .catch((err: Error) => {
      console.log(err)
    })
}

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // The onAuthStateChanged listener will handle updating the store
      emit('logoutDone')
    })
    .catch((err: Error) => {
      console.log(err)
    })
}
</script>

<style scoped>
.login {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.login-button-google {
  padding: 10px;
}

.google-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
  min-width: 200px;
}

.google-icon {
  width: 20px;
  height: 20px;
}

.logout {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  font-weight: bold;
  padding-left: 10px;
}
</style>
