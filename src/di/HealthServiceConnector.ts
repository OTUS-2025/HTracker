import { SupabaseHealthRepository } from '@/repositories/SupabaseHealthRepository'
import { HealthService } from '@/services/HealthService'

const healthRepository = new SupabaseHealthRepository()

export const healthService = new HealthService(healthRepository)
