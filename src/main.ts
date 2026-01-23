import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/css/style.css'
import { usePrimeVue } from './plugins/usePrimeVue'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useFontawesome } from './plugins/useFontawesome'
import { router } from './router'
const fa = useFontawesome()

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
usePrimeVue(app)

app.mount('#app')
