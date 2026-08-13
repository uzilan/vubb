import './assets/main.css'
import '@coreui/coreui/dist/css/coreui.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { inter } from '@/i18n'
import * as icons from '@coreui/icons'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.provide('icons', icons)
app.use(pinia).use(inter).mount('#app')
