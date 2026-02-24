<script setup lang="ts">
import Toolbar from './components/ToolbarBox.vue'
</script>

<template>
  <div class="grow flex flex-row justify-center my-4">
    <div class="grow container flex flex-col sm:w-sm lg:w-lg xl:w-xl">
      <h1 class="text-3xl text-center font-bold mb-2">
        Health Tracker <font-awesome-icon icon="fa-solid fa-notes-medical" />
      </h1>
      <Toolbar />
      <router-view />
    </div>
  </div>
</template>
