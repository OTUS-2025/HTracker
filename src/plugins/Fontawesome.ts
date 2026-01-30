import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faNotesMedical,
  faTablet,
  faSuitcaseMedical,
  faFolderPlus,
  faPlus,
  faMinus,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { type App } from 'vue'

export default {
  install: (app: App) => {
    library.add([
      faTablet,
      faNotesMedical,
      faSuitcaseMedical,
      faFolderPlus,
      faPlus,
      faMinus,
      faArrowRightToBracket,
    ])
    app.component('font-awesome-icon', FontAwesomeIcon)
  },
}
