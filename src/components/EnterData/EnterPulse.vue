<template>
  <Dialog
    v-model:visible="visible"
    modal
    @hide="cancel"
    header="Enter Pulse"
    :style="{ width: '25%' }"
  >
    <div class="flex-auto mb-4">
      <label for="horizontal-buttons" class="font-bold block mb-2"> Pulse </label>
      <InputNumber
        v-model="input.pulse"
        inputId="horizontal-buttons"
        showButtons
        buttonLayout="horizontal"
        :step="1"
        suffix=" ppm"
        :min="0"
        :max="180"
        fluid
      >
        <template #incrementicon>
          <font-awesome-icon icon="fa-solid fa-plus" />
        </template>
        <template #decrementicon>
          <font-awesome-icon icon="fa-solid fa-minus" />
        </template>
      </InputNumber>
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="cancel"></Button>
      <Button type="button" label="Save" @click="save"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Pressure } from '@/types/pressure'

interface Props {
  isVisible: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const visible = ref(false)

const input = ref<Pressure>({
  systolic: 120,
  diastolic: 79,
  pulse: 70,
  timestamp: Date.now(),
} as Pressure)

watch(
  () => props.isVisible,
  (newVal: boolean) => {
    visible.value = newVal
  },
)
const save = () => {
  visible.value = false
  emit('close')
}
const cancel = () => {
  visible.value = false
  emit('close')
}
</script>
