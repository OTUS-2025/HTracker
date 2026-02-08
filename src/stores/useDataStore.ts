import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import type { User } from '@/types/common-types'

export const useDataStore = defineStore('dataStore', () => {
  async function getUserById(id: number) {
    try {
      const { data } = await supabase.from('users').select('*').eq('id', id).single()
      const user = data as User
      return user
    } catch (error) {
      console.error(`getUserById: ${error}`)
      return false
    }
  }
  return { getUserById }
})
