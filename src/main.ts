import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/css/style.css'
import { router } from './router'

import Fontawesome from './plugins/Fontawesome'
import Primevue from './plugins/Primevue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Fontawesome)
app.use(Primevue)

app.mount('#app')
