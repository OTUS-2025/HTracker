<template>
  <div>
    <Button label="Submit" />
    <DatePicker v-model="date" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const date = reactive(new Date())
</script>
