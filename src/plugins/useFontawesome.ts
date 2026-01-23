import { library } from '@fortawesome/fontawesome-svg-core'
import { faNotesMedical, faTablet, faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons'

export function useFontawesome() {
  library.add([faTablet, faNotesMedical, faSuitcaseMedical])
}
