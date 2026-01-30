<template>
  <h1>Authentification</h1>
  <div>
    <YandexID :use-as="useAs" />
  </div>
</template>

<script setup lang="ts">
import YandexID from '@/components/YandexID.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { KindOfUse } from '@/components/YandexID.vue'

const route = useRoute()
const router = useRouter()
const useAs = ref<KindOfUse>('asBeforeSuggest')

onBeforeMount(() => {
  // console.log(`AuthPage -> onBeforeMount => ${JSON.stringify(route)}`)
  if (route.name) {
    // console.log(`AuthPage -> onBeforeMount -> route.name => ${route.name as string}`)
    switch (route.name) {
      case 'auth':
        console.log(`AuthPage -> onMounted -> route.name -> auth => ${route.name as string}`)
        useAs.value = 'asSuggest'
        // router.push({ name: 'auth-as-suggest' })
        router.push({ path: '/auth/as-suggest' })
        // router.push({ name: 'about' })
        break
      case 'auth-as-suggest':
        console.log(`AuthPage -> onMounted -> route.name -> auth => ${route.name as string}`)
        useAs.value = 'asSuggest'
        break
      case 'auth-as-suggest-token':
        useAs.value = 'asSuggestToken'
        break
      default:
        break
    }
  }
})

onMounted(() => {
  window.addEventListener('message', (event) => {
    console.log(`AuthPage -> message: ${JSON.stringify(event)}`)
  })
})
</script>
