import type { Pressure, Weight, Pulse, Activity } from '@/types/health-types'
import type { User } from '@/types/common-types'
import type { Pressure4Plot } from '../types/analytics-types'

export interface HealthRepository {
  savePressure(pressure: Pressure, user: User): Promise<void>
  saveWeight(weight: Weight, user: User): Promise<void>
  savePulse(pulse: Pulse, user: User): Promise<void>
  saveActivity(activity: Activity, user: User): Promise<void>
  avgPressure4Date(user: User, date: Date): Promise<string>
  avgPressure4Week(user: User, date: Date): Promise<string>
  getPressure4Plot(user: User): Promise<Pressure4Plot[] | string>
}
