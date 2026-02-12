import type { HealthRepository } from '@/repositories/HealthRepository'
import type { User } from '@/types/common-types'
import type { Pressure } from '@/types/health-types'

export class HealthService {
  constructor(private readonly healthRepository: HealthRepository) {}

  async savePressure(pressure: Pressure, user: User) {
    return await this.healthRepository.savePressure(pressure, user)
  }
}
