<template>
  <Dialog
    v-model:visible="isShow"
    modal
    @hide="cancel"
    header="Enter Weight"
    :style="{ width: '25%' }"
  >
    <Form
      v-slot="$form"
      :initialValues="enteredWeight"
      :resolver
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      @submit="save"
      class="flex flex-col gap-4 w-full"
    >
      <div class="flex-auto mb-4">
        <label for="horizontal-buttons" class="font-bold block mb-2"> Wieght </label>
        <InputNumber
          name="pulse"
          v-model:modelValue="enteredWeight.weight"
          inputId="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
          :step="1"
          suffix=" kg"
          :min="25"
          :max="250"
          fluid
        >
          <template #incrementicon>
            <font-awesome-icon icon="fa-solid fa-plus" />
          </template>
          <template #decrementicon> <font-awesome-icon icon="fa-solid fa-minus" /> </template>
        </InputNumber>
        <Message v-if="$form.weight?.invalid" severity="error" size="small" variant="simple">
          {{ $form.weight.error?.message }}
        </Message>
      </div>
      <div class="flex-auto mb-4">
        <NowOrDate v-model:selectedDate="enteredWeight.date" />
        <Message v-if="$form.date?.invalid" severity="error" size="small" variant="simple">
          {{ $form.date.error?.message }}
        </Message>
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
import type { Weight } from '@/types/health-types'
import NowOrDate from '../common/NowOrDate.vue'
import type { FormSubmitEvent } from '@primevue/forms/form'
import { healthService } from '@/di/HealthServiceConnector'
import { useMainStore } from '@/stores/useMainStore'

const mainStore = useMainStore()
const isShow = defineModel<boolean>('isShow', { default: false, required: true })

const enteredWeight = reactive<Weight>({
  weight: 76,
  date: new Date(),
})

const resolver = zodResolver(
  z.object({
    pulse: z
      .number({ message: 'Weight must be a number' })
      .gt(0, { message: 'Weight must be a number more when zero' }),
    date: z.date(),
  }),
)

const save = async (e: FormSubmitEvent) => {
  // console.log('🚀 ~ save ~ enteredWeight:', enteredWeight)
  if (e.valid) {
    const user = await mainStore.activeUser()
    healthService.saveWeight(enteredWeight, user)
  }
  isShow.value = false
}
const cancel = () => {
  isShow.value = false
}
</script>
