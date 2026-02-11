import { supabase } from '@/utils/supabase'
import type { UserRepository } from './UserRepository'
import type { User } from '@/types/common-types'

export class SupabaseUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const { data, error } = await supabase.from('users').select('*')
    if (error) throw error
    return data
  }

  async getById(id: string): Promise<User | boolean> {
    try {
      const { data } = await supabase.from('users').select('*').eq('id', id).single()
      const user = data as User
      return user
    } catch (error) {
      console.error(`getUserById: ${error}`)
      return false
    }
  }
  async save(user: User): Promise<void> {
    await supabase.from('users').upsert(user)
  }
}
