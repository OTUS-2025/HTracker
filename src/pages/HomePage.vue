<template>
  <div class="home-page">
    <h2>Home</h2>

    <HealthCards />

    <ButtonsMenu />
  </div>
</template>

<script setup lang="ts">
import ButtonsMenu from '@/components/ButtonsMenu.vue'
import HealthCards from '@/components/HealthCards.vue'
</script>

<style scoped>
.home-page {
  padding: 2rem;
}
</style>
