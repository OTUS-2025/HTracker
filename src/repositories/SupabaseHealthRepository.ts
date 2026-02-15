import { supabase } from '@/utils/supabase'
import type { Pressure, Weight, Pulse, Activity } from '@/types/health-types'
import type { HealthRepository } from './HealthRepository'
import type { User } from '@/types/common-types'

export class SupabaseHealthRepository implements HealthRepository {
  async savePressure(pressure: Pressure, user: User): Promise<void> {
    const fixed_date = this.dateFromDate(pressure.date)
    const fixed_time = this.timeFromDate(pressure.date)
    const user_id = user.id
    const { data, error } = await supabase
      .from('hd_pressure')
      .insert([
        {
          user_id,
          systolic: pressure.systolic,
          diastolic: pressure.diastolic,
          pulse: pressure.pulse,
          hand: pressure.hand,
          fixed_date,
          fixed_time,
        },
      ])
      .select()

    if (error) {
      console.error(`savePressure: ${error}`)
    }
  }

  async saveWeight(weight: Weight, user: User): Promise<void> {
    const fixed_date = this.dateFromDate(weight.date)
    const fixed_time = this.timeFromDate(weight.date)
    const user_id = user.id
    const { data, error } = await supabase
      .from('hd_weight')
      .insert([
        {
          user_id,
          weight: weight.weight,
          fixed_date,
          fixed_time,
        },
      ])
      .select()

    if (error) {
      console.error(`saveWeight: ${error}`)
    }
  }

  async savePulse(pulse: Pulse, user: User): Promise<void> {
    const fixed_date = this.dateFromDate(pulse.date)
    const fixed_time = this.timeFromDate(pulse.date)
    const user_id = user.id
    const { data, error } = await supabase
      .from('hd_pulse')
      .insert([
        {
          user_id,
          pulse: pulse.pulse,
          fixed_date,
          fixed_time,
        },
      ])
      .select()

    if (error) {
      console.error(`savePulse: ${error}`)
    }
  }

  async saveActivity(activity: Activity, user: User): Promise<void> {
    const fixed_date = this.dateFromDate(activity.date)
    const fixed_time = this.timeFromDate(activity.date)
    const duration = this.timeFromDate(activity.duration)
    const user_id = user.id
    const { data, error } = await supabase
      .from('hd_activity')
      .insert([
        {
          user_id,
          name: activity.name,
          volume: activity.volume,
          unit: activity.unit,
          duration,
          fixed_date,
          fixed_time,
        },
      ])
      .select()

    if (error) {
      console.error(`saveActivity: ${error}`)
    }
  }

  dateFromDate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  timeFromDate(date: Date) {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }
}
