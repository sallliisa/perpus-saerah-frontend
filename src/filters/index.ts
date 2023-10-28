import type { StringObject } from '@/types'
import { formatCurrency, formatDate, formatDateTime, formatNumber, formatTime } from '@/utils/common'

export const filter: StringObject<StringObject> = {
  tender_badge: {
    ON_GOING: 'Sedang Berlangsung',
  },
  active_badge_color: {
    true: 'success',
    false: 'error',
  },
  active: {
    true: 'Aktif',
    false: 'Non-Aktif',
  },
  boolYesNo: {
    true: 'Ya',
    false: 'Tidak',
  },
  gender: {
    male: 'Laki-laki',
    female: 'Perempuan'
  },
  feasability_status: {
    feasable: "Layak",
    not_feasable: "Tidak Layak"
  },
  verified_code: {
    pending: 'Pending',
    verified: 'Verified',
    rejected: 'Rejected',
  },
  verified_code_color: {
    pending: 'warning',
    verified: 'success',
    rejected: 'error',
  }
}

export const parse = (key: string, value: string | number, mode: 'dictionary' | 'parser' = 'dictionary') => {
  if (mode === 'dictionary') {
    return filter[key]?.[value] || 'WARN: KEY IS UNDEFINED'
  } else {
    return {
      number: formatNumber,
      currency: formatCurrency,
      date: formatDate,
      time: formatTime,
      datetime: formatDateTime,
    }[key as 'number' | 'currency' | 'date' | 'time' | 'datetime'](value as any)
  }
}
