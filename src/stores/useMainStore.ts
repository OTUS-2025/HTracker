import { defineStore } from 'pinia'
import type { User } from '@/types/common-types'
import { userService } from '@/di/UserServiceConnector'
import { reactive } from 'vue'

export const useMainStore = defineStore('mainStore', () => {
  const userId = '1'
  const user = reactive({} as User)
  async function activeUser() {
    if (!user.id) {
      const answer = await userService.fetchOneById(userId)
      if (typeof answer !== 'boolean') {
        Object.assign(user, answer)
      }
    }
    return user
  }

  return { activeUser }
})
