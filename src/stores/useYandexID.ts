import { defineStore } from 'pinia'
import { scriptStatus } from '@/types/common'
import { ref } from 'vue'

export const useYandexID = defineStore('yandexID', () => {
  const clientID = 'd16b443ba6574f44827823d1f1badaa6'
  const baseURI = 'https://localhost:5173'
  const statusMsg = ref('')

  const suggestScriptStatus = ref<scriptStatus>(scriptStatus.unused)
  const suggestTokenScriptStatus = ref<scriptStatus>(scriptStatus.unused)

  function createSuggestScript() {
    const suggestScriptURL =
      'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js'
    const suggestScript = document.createElement('script')
    suggestScript.src = suggestScriptURL
    suggestScript.onload = useSuggestScript
    try {
      document.head.appendChild(suggestScript)
    } catch (error) {
      console.log(`useYandexID -> createSuggestScript => error: ${JSON.stringify(error)}`)
    }
    suggestScriptStatus.value = scriptStatus.loading
    console.log('useYandexID -> createSuggestScript')
  }

  function createSuggestTokenScript() {
    const suggestTokenScriptURL =
      'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js'
    const suggestTokenScript = document.createElement('script')
    suggestTokenScript.src = suggestTokenScriptURL
    suggestTokenScript.onload = useSuggestTokenScript
    document.head.appendChild(suggestTokenScript)
    suggestTokenScriptStatus.value = scriptStatus.loading
  }

  function useSuggestScript() {
    suggestScriptStatus.value = scriptStatus.ready
    // console.log('useYandexID -> useSuggestScript')
    if (window?.YaAuthSuggest) {
      // console.log('useYandexID -> useSuggestScript -> window.YaAuthSuggest')
      try {
        window.YaAuthSuggest.init(
          {
            client_id: clientID,
            response_type: 'token',
            redirect_uri: `${baseURI}/auth/as-suggest-token`,
          },
          `${baseURI}`,
        )
          .then((result: unknown) => {
            console.log(JSON.stringify(result))
            if (result && result?.handler) {
              return result?.handler()
            } else {
              return null
            }
          })
          .then((data: unknown) => {
            suggestScriptStatus.value = scriptStatus.complite
            statusMsg.value = `Сообщение с токеном [${JSON.stringify(data)}]`
          })
          .catch((error: unknown) => {
            suggestScriptStatus.value = scriptStatus.error
            statusMsg.value = `Обработка ошибки [${JSON.stringify(error)}] `
          })
      } catch (error) {
        statusMsg.value = `Ошибка скрипта [${JSON.stringify(error)}] `
      }
    }
  }

  function useSuggestTokenScript() {
    suggestTokenScriptStatus.value = scriptStatus.ready
    if (window.YaSendSuggestToken) {
      window.YaSendSuggestToken(`${baseURI}/auth`, {
        flag: true,
      })
    }
  }

  return {
    createSuggestScript,
    suggestScriptStatus,
    createSuggestTokenScript,
    suggestTokenScriptStatus,
    statusMsg,
  }
})
