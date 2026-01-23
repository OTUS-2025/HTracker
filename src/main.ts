import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter } from '@kitbag/router'
import { routes } from './router'
import App from './App.vue'

import './assets/css/style.css'
import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useFontawesome } from './plugins/useFontawesome'
const fa = useFontawesome()

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(createRouter(routes))
app.use(PrimeVue, {
  theme: {
    preset: Material,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
    },
  },
})

app.mount('#app')
