<template>
  <Dialog
    v-model:visible="isShow"
    modal
    @hide="cancel"
    header="Enter Pressure"
    :style="{ width: '25%' }"
  >
    <Form
      v-slot="$form"
      :initialValues="enteredPressure"
      :resolver
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      @submit="save"
      class="flex flex-col gap-4 w-full"
    >
      <div class="flex flex-row gap-4 mb-4">
        <div class="flex-auto">
          <label for="horizontal-buttons" class="font-bold block mb-2"> Systolic </label>
          <InputNumber
            v-model="enteredPressure.systolic"
            inputId="horizontal-buttons"
            showButtons
            buttonLayout="horizontal"
            :step="1"
            suffix=" mm Hg"
            :min="0"
            :max="300"
            fluid
          >
            <template #incrementicon>
              <font-awesome-icon icon="fa-solid fa-plus" />
            </template>
            <template #decrementicon>
              <font-awesome-icon icon="fa-solid fa-minus" />
            </template>
          </InputNumber>
          <Message v-if="$form.systolic?.invalid" severity="error" size="small" variant="simple">
            {{ $form.systolic.error?.message }}
          </Message>
        </div>
        <div class="flex-auto">
          <label for="horizontal-buttons" class="font-bold block mb-2"> Diastolic </label>
          <InputNumber
            v-model="enteredPressure.diastolic"
            inputId="horizontal-buttons"
            showButtons
            buttonLayout="horizontal"
            :step="1"
            suffix=" mm Hg"
            :min="0"
            :max="300"
            fluid
          >
            <template #incrementicon>
              <font-awesome-icon icon="fa-solid fa-plus" />
            </template>
            <template #decrementicon>
              <font-awesome-icon icon="fa-solid fa-minus" />
            </template>
          </InputNumber>
          <Message v-if="$form.diastolic?.invalid" severity="error" size="small" variant="simple">
            {{ $form.diastolic.error?.message }}
          </Message>
        </div>
      </div>
      <div class="flex-auto mb-4">
        <label for="horizontal-buttons" class="font-bold block mb-2"> Pulse </label>
        <InputNumber
          v-model="enteredPressure.pulse"
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
        <Message v-if="$form.pulse?.invalid" severity="error" size="small" variant="simple">
          {{ $form.pulse.error?.message }}
        </Message>
      </div>
      <div class="flex-auto mb-4">
        <NowOrDate v-model:selectedDate="enteredPressure.date" />
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
import type { Pressure } from '@/types/health-types'
import NowOrDate from '../common/NowOrDate.vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import type { FormSubmitEvent } from '@primevue/forms/form'
import { healthService } from '@/di/HealthServiceConnector'
import { useMainStore } from '@/stores/useMainStore'

const isShow = defineModel<boolean>('isShow', { default: false, required: true })
const mainStore = useMainStore()

const enteredPressure = reactive<Pressure>({
  systolic: 120,
  diastolic: 79,
  pulse: 70,
  date: new Date(),
})

const resolver = zodResolver(
  z.object({
    systolic: z.number({ message: 'Systolic part must be a number' }),
    diastolic: z.number({ message: 'Diastolic part must be a number' }),
    pulse: z
      .number({ message: 'Pulse must be a number' })
      .gt(0, { message: 'Pulse must be a number more when zero' }),
    date: z.date().min(new Date('2000-01-01'), { message: 'Date must be after 2000-01-01' }),
  }),
)

const save = async (e: FormSubmitEvent) => {
  // console.log('🚀 ~ save ~ enteredPressure:', enteredPressure)
  if (e.valid) {
    // TODO: save pressure data
    const user = await mainStore.activeUser()
    healthService.savePressure(enteredPressure, user)
  }
  isShow.value = false
}
const cancel = () => {
  isShow.value = false
}
</script>
