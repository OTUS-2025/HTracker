<template>
  <Dialog
    v-model:visible="isShow"
    modal
    @hide="cancel"
    header="Enter Pulse"
    :style="{ width: '25%' }"
  >
    <Form
      v-slot="$form"
      :initialValues="enteredPulse"
      :resolver
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      @submit="save"
      class="flex flex-col gap-4 w-full"
    >
      <div class="flex-auto mb-4">
        <label for="horizontal-buttons" class="font-bold block mb-2"> Pulse </label>
        <InputNumber
          name="pulse"
          v-model:modelValue="enteredPulse.pulse"
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
          <template #decrementicon> <font-awesome-icon icon="fa-solid fa-minus" /> </template
          >text-white/80
        </InputNumber>
        <Message v-if="$form.pulse?.invalid" severity="error" size="small" variant="simple">{{
          $form.pulse.error?.message
        }}</Message>
      </div>
      <div class="flex-auto mb-4">
        <NowOrDate v-model:selectedDate="enteredPulse.date" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="cancel"></Button>
        <Button type="submit" label="Save"></Button>
      </div>
    </Form>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import type { Pulse } from '@/types/health-types'
import NowOrDate from '../common/NowOrDate.vue'
import type { FormSubmitEvent } from '@primevue/forms/form'
import { healthService } from '@/di/HealthServiceConnector'
import { useMainStore } from '@/stores/useMainStore'

const mainStore = useMainStore()

const isShow = defineModel<boolean>('isShow', { default: false, required: true })

const enteredPulse = reactive<Pulse>({
  pulse: 68,
  date: new Date(),
} as Pulse)

const resolver = zodResolver(
  z.object({
    pulse: z
      .number({ message: 'Pulse must be a number' })
      .gt(0, { message: 'Pulse must be a number more when zero' }),
    date: z.date(),
  }),
)

const save = async (e: FormSubmitEvent) => {
  // console.log('🚀 ~ save ~ enteredPulse:', enteredPulse)
  if (e.valid) {
    const user = await mainStore.activeUser()
    healthService.savePulse(enteredPulse, user)
  }
  isShow.value = false
}
const cancel = () => {
  isShow.value = false
}
</script>
