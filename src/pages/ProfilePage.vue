<template>
  <div>
    <!-- -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useDataStore } from '@/stores/useDataStore'
// import type { User } from '@/types/common-types'

const dataStore = useDataStore()

// const user = reactive({} as User)

onMounted(async () => {
  const answer = await dataStore.getUserById(1)
  console.log('🚀 ~ answer:', answer)
  // user.id = answer.
})
</script>
