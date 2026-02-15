import type { HealthRepository } from '@/repositories/HealthRepository'
import type { User } from '@/types/common-types'
import type { Pressure, Weight, Pulse, Activity } from '@/types/health-types'

export class HealthService {
  constructor(private readonly healthRepository: HealthRepository) {}

  async savePressure(pressure: Pressure, user: User) {
    return await this.healthRepository.savePressure(pressure, user)
  }

  async saveWeight(weight: Weight, user: User) {
    return await this.healthRepository.saveWeight(weight, user)
  }

  async savePulse(pulse: Pulse, user: User) {
    return await this.healthRepository.savePulse(pulse, user)
  }

  async saveActivity(activity: Activity, user: User) {
    return await this.healthRepository.saveActivity(activity, user)
  }
}
