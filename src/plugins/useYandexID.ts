import { scriptStatus } from '@/types/common'
import { ref } from 'vue'

export function useYandexID() {
  const scriptURL =
    'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js'

  const script = ref<scriptStatus>(scriptStatus.loading)

  const yandexIdScript = document.createElement('script')

  function createScript() {
    yandexIdScript.src = scriptURL
    script.value = scriptStatus.loading
    yandexIdScript.onload = initYandexID
    document.head.appendChild(yandexIdScript)
  }

  function initYandexID() {}
}
