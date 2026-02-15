<template>
  <Dialog
    v-model:visible="isShow"
    modal
    @hide="cancel"
    header="Enter Activity"
    :style="{ width: '25%' }"
  >
    <Form
      v-slot="$form"
      :initialValues="enteredActivity"
      :resolver
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      @submit="save"
      class="flex flex-col gap-4 w-full"
    >
      <div class="flex flex-row gap-4 mb-4">
        <div class="flex flex-auto justify-between items-center gap-4 w-1/2">
          <label for="name" class="font-bold block"> Activity Name </label>
          <Select
            name="name"
            v-model="enteredActivity.name"
            :options="Object.values(ActivityType)"
            optionLabel=""
            placeholder="Select Activity Name"
            :defaultValue="ActivityType.Walking"
            class="w-full"
          />
          <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
            {{ $form.name.error?.message }}
          </Message>
        </div>
        <div class="flex flex-auto justify-between items-center gap-4 w-1/2">
          <label for="unit" class="font-bold block"> Activity Unit </label>
          <Select
            name="unit"
            v-model="enteredActivity.unit"
            :options="Object.values(ActivityUnit)"
            optionLabel=""
            placeholder="Select Activity Unit"
            :defaultValue="ActivityUnit.Steps"
            class="w-full"
          />
          <Message v-if="$form.unit?.invalid" severity="error" size="small" variant="simple">
            {{ $form.unit.error?.message }}
          </Message>
        </div>
      </div>
      <div class="flex flex-row items-center gap-4 mb-4">
        <div class="flex flex-auto w-auto">
          <label for="volume" class="font-bold block mb-2"> Activity volume </label>
          <InputNumber
            name="volume"
            v-model:modelValue="enteredActivity.volume"
            showButtons
            buttonLayout="horizontal"
            :step="stepValues[stepValueNdx]"
            :suffix="` ${enteredActivity.unit}`"
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
        <div class="flex flex-auto w-1/4 h-full">
          <Button
            severity="secondary"
            :label="`x${stepValues[stepValueNdx]}`"
            @click="stepValueNdx = (stepValueNdx + 1) % stepValues.length"
            fluid
          />
        </div>
      </div>
      <div class="flex flex-row items-center gap-4 mb-4">
        <label for="datepicker-timeonly" class="font-bold block mb-2"> Duration </label>
        <DatePicker id="datepicker-timeonly" v-model="enteredActivity.duration" timeOnly fluid />
      </div>
      <div class="flex-auto mb-4">
        <NowOrDate v-model:selectedDate="enteredActivity.date" />
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
import { reactive, ref } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { ActivityType, type Activity, ActivityUnit } from '@/types/health-types'
import NowOrDate from '../common/NowOrDate.vue'
import type { FormSubmitEvent } from '@primevue/forms/form'
import { healthService } from '@/di/HealthServiceConnector'
import { useMainStore } from '@/stores/useMainStore'

const mainStore = useMainStore()

const isShow = defineModel<boolean>('isShow', { default: false, required: true })

const stepValues = [1, 5, 10, 25, 50, 100]
const stepValueNdx = ref(0)
const enteredActivity = reactive<Activity>({
  name: ActivityType.Walking,
  volume: 500,
  unit: ActivityUnit.Steps,
  duration: new Date('Jan 01, 2000 00:00:00'),
  date: new Date(),
})

const resolver = zodResolver(
  z.object({
    volume: z
      .number({ message: 'Must be a number' })
      .gt(0, { message: 'Must be a number more when zero' }),
    date: z.date(),
  }),
)

const save = async (e: FormSubmitEvent) => {
  // console.log('🚀 ~ save ~ enteredActivity:', enteredActivity)
  if (e.valid) {
    const user = await mainStore.activeUser()
    healthService.saveActivity(enteredActivity, user)
  }
  isShow.value = false
}
const cancel = () => {
  isShow.value = false
}
</script>
