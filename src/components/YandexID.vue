<template>
  <div v-if="yandex.suggestScriptStatus === scriptStatus.loading">
    <p class="text-3xl text-blue-600">Loading...</p>
  </div>
  <div v-else-if="yandex.suggestScriptStatus === scriptStatus.error">
    {{ yandex.statusMsg }}
  </div>
  <div v-else-if="yandex.suggestScriptStatus === scriptStatus.ready">
    {{ yandex.statusMsg }}
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { scriptStatus } from '@/types/common'
import { useYandexID } from '@/stores/useYandexID'

export type KindOfUse = 'asBeforeSuggest' | 'asSuggest' | 'asSuggestToken'

interface Props {
  useAs: KindOfUse
}

const props = defineProps<Props>()

const yandex = useYandexID()

onMounted(() => {
  switch (props.useAs) {
    case 'asSuggest':
      console.log(`YandexID -> onMounted -> props.useAs => ${props.useAs as string}`)
      yandex.createSuggestScript()
      break
    case 'asSuggestToken':
      console.log(`YandexID -> onMounted -> props.useAs => ${props.useAs as string}`)
      yandex.createSuggestTokenScript()
      break
    default:
      console.log(`YandexID -> onMounted -> props.useAs => default`)
      break
  }
})
</script>
