import type { UserRepository } from '@/repositories/UserRepository'

export class UserService {
  constructor(private repository: UserRepository) {}

  async fetchAll() {
    return await this.repository.getAll()
  }

  async fetchOneById(id: string) {
    return await this.repository.getById(id)
  }
}
