export enum Hand {
  Left = 'Left',
  Right = 'Right',
}
export interface Pressure {
  systolic: number
  diastolic: number
  pulse: number
  hand: Hand
  date: Date
}

export interface Pulse {
  pulse: number
  date: Date
}

export interface Weight {
  weight: number
  date: Date
}

export enum ActivityType {
  Walking = 'Walking',
  Running = 'Running',
  Cycling = 'Cycling',
  Swimming = 'Swimming',
}

export enum ActivityUnit {
  Steps = 'Steps',
  Miles = 'Miles',
  Kilometers = 'Kilometers',
  Minutes = 'Minutes',
}

export interface Activity {
  name: ActivityType
  volume: number
  unit: ActivityUnit
  duration: Date
  date: Date
}
