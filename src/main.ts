import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faNotesMedical, faTablet, faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

library.add([faTablet, faNotesMedical, faSuitcaseMedical])
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
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
