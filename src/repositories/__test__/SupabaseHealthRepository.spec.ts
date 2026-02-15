import { describe, it, expect, beforeEach } from 'vitest'
import { SupabaseHealthRepository } from '../SupabaseHealthRepository'

describe('SupabaseHealthRepository', () => {
  let repository: SupabaseHealthRepository

  beforeEach(() => {
    repository = new SupabaseHealthRepository()
  })

  describe('dateStartWeekFromDate', () => {
    it('должен вернуть дату на 7 дней ранее текущей', () => {
      const today = new Date()
      const answer = repository.dateStartWeekFromDate(today)
      const startWeek = new Date(answer)

      expect(startWeek.getDate()).toBe(today.getDate() - 7)
    })
    it('должен корректно работать с разными месяцами', () => {
      const testDate = new Date('2024-03-05')
      const expectedDate = new Date('2024-02-27')

      const answer = repository.dateStartWeekFromDate(testDate)
      const startWeek = new Date(answer)

      expect(startWeek.getDate()).toBe(expectedDate.getDate())
    })
    it('должен корректно работать с разными годами', () => {
      const testDate = new Date('2024-01-03')
      const expectedDate = new Date('2023-12-27')

      const answer = repository.dateStartWeekFromDate(testDate)
      const startWeek = new Date(answer)

      expect(startWeek.getFullYear()).toBe(expectedDate.getFullYear())
      expect(startWeek.getMonth()).toBe(expectedDate.getMonth())
      expect(startWeek.getDate()).toBe(expectedDate.getDate())
    })
  })
})
