import { describe, it, expect } from 'vitest'
import { formatDateTime, formatTime } from '../src/lib/utils'

describe('utils formatting', () => {
  it('formats ISO datetime and time correctly', () => {
    const iso = '2024-10-31T12:34:00Z'
    expect(formatDateTime(iso)).toBe('Oct 31, 2024 at 12:34 PM')
    expect(formatTime(iso)).toBe('12:34 PM')
  })

  it('returns N/A for missing input', () => {
    expect(formatDateTime()).toBe('N/A')
    expect(formatTime()).toBe('N/A')
  })
})
