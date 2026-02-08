<template>
  <div class="flex flex-column gap-1">
    <Button label="Register" @click="registerBtnClick">
      <template #icon><font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" /></template>
    </Button>
    <SplitButton label="Enter data" :model="inputVariants" raised severity="secondary">
      <template #icon><font-awesome-icon icon="fa-solid fa-folder-plus" /></template>
    </SplitButton>
  </div>
  <EnterPressure :is-visible="pressureDlgVisible" @close="pressureDlgVisible = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EnterPressure from './EnterData/EnterPressure.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const pressureDlgVisible = ref(false)
const inputVariants = [
  { label: 'Pressure', command: () => (pressureDlgVisible.value = true) },
  { label: 'Pulse', command: () => console.log('Pulse') },
]
const registerBtnClick = () => {
  router.push({ name: 'auth' })
}
</script>
