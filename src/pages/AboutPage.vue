<template>
  <h2>About</h2>
  <DatePicker v-model="date" />
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const date = reactive(new Date())
</script>
