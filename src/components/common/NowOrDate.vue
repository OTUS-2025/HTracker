<template>
  <div class="flex flex-row items-center gap-4 mb-4">
    <label>Date</label>
    <ToggleSwitch
      v-model="feature"
      :default-value="DateKind.Now"
      :true-value="DateKind.Now"
      :false-value="DateKind.Date"
    />
    <label>{{ DateKindLabel[feature] }}</label>
  </div>
  <DatePicker
    v-show="feature === DateKind.Date"
    v-model="selectedDate"
    showTime
    hourFormat="24"
    fluid
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

enum DateKind {
  Now = 'now',
  Date = 'date',
}

type DateKindLabels = {
  [key in DateKind]: string
}
const DateKindLabel: DateKindLabels = {
  now: 'Now',
  date: 'Selected date or time',
}

const selectedDate = defineModel<Date>('selectedDate', { default: new Date(), required: true })

const feature = ref<DateKind>(DateKind.Now)
</script>
