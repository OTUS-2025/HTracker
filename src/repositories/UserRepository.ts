import { type User } from '@/types/common-types'
export interface UserRepository {
  getAll(): Promise<User[] | boolean>
  getById(id: string): Promise<User | boolean>
  save(user: User): Promise<void>
}
