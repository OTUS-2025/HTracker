<template>
  <div class="flex flex-row gap-3 mb-3">
    <ToggleSwitch
      id="date-kind"
      v-model="feature"
      :default-value="DateKind.Now"
      :true-value="DateKind.Now"
      :false-value="DateKind.Date"
    />
    <label for="date-kind">{{ DateKindLabel[feature] }}</label>
  </div>
  <DatePicker
    v-show="feature === DateKind.Date"
    id="datepicker-24h"
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
