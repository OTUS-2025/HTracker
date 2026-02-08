import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material'

export default {
  install: (app: App) => {
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
  },
}
