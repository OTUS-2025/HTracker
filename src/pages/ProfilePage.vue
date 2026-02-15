<template>
  <h1>User`s profile</h1>
  <div>
    <p>Name: {{ user.name }}</p>
    <p>e-mail: {{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { User } from '@/types/common-types'
import { userService } from '@/di/UserServiceConnector'

const user = reactive({} as User)

onMounted(async () => {
  const answer = await userService.fetchOneById('1')
  if (typeof answer !== 'boolean') {
    Object.assign(user, answer)
  }
  console.log('🚀 ~ user:', user)
})
</script>
