<template>
  <Toolbar>
    <template #start>
      <Button class="mr-2" severity="secondary" raised rounded @click="toHome">
        <template #icon>
          <font-awesome-icon icon="fa-solid fa-house-chimney-window" />
        </template>
      </Button>
    </template>
    <template #center>
      <Button class="mr-2" severity="secondary" raised rounded @click="toProfile">
        <template #icon>
          <font-awesome-icon icon="fa-solid fa-id-badge" />
        </template>
      </Button>
    </template>
    <template #end></template>
  </Toolbar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toHome = () => {
  router.push({ name: 'home' })
}
const toProfile = () => {
  router.push({ name: 'profile' })
}
</script>
