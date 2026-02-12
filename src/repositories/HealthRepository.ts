import type { Pressure } from '@/types/health-types'
import type { User } from '@/types/common-types'

export interface HealthRepository {
  savePressure(pressure: Pressure, user: User): Promise<void>
}
