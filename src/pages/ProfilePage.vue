<template>
  <h1>Profile</h1>
  <div>
    <!-- -->
  </div>
</template>

<script setup lang="ts">
import { scriptStatus } from '@/types/common'
import { onMounted, ref } from 'vue'

const yandexIdScriptStatus = ref<scriptStatus>(scriptStatus.loading)
const yandexIdScript = document.createElement('script')

onMounted(() => {
  yandexIdScript.src =
    'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js'
  yandexIdScript.onload = initYandexID
  document.head.appendChild(yandexIdScript)
})

const initYandexID = () => {
  yandexIdScriptStatus.value = scriptStatus.ready
}
</script>
