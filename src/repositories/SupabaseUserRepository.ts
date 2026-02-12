import { supabase } from '@/utils/supabase'
import type { UserRepository } from './UserRepository'
import type { User } from '@/types/common-types'

export class SupabaseUserRepository implements UserRepository {
  async getAll(): Promise<User[] | boolean> {
    try {
      const { data } = await supabase.from('users').select('*')
      return data as User[]
    } catch (error) {
      console.error(`getUsersAll: ${error}`)
      return false
    }
  }

  async getById(id: string): Promise<User | boolean> {
    try {
      const { data } = await supabase.from('users').select('*').eq('id', parseInt(id)).single()
      return data as User
    } catch (error) {
      console.error(`getUserById: ${error}`)
      return false
    }
  }
  async save(user: User): Promise<void> {
    await supabase.from('users').upsert(user)
  }
}
