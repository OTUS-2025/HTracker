import { SupabaseUserRepository } from '@/repositories/SupabaseUserRepository'
import { UserService } from '@/services/UserService'

// Сейчас используем Supabase
const userRepository = new SupabaseUserRepository()

export const userService = new UserService(userRepository)
