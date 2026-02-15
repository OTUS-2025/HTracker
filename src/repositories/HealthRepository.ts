import type { Pressure, Weight, Pulse, Activity } from '@/types/health-types'
import type { User } from '@/types/common-types'

export interface HealthRepository {
  savePressure(pressure: Pressure, user: User): Promise<void>
  saveWeight(weight: Weight, user: User): Promise<void>
  savePulse(pulse: Pulse, user: User): Promise<void>
  saveActivity(activity: Activity, user: User): Promise<void>
}
