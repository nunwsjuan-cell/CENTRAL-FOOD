export const LS_KEYS = {
  THEME: 'centralfood_theme',
  DATA: 'centralfood_data',
  CART: 'centralfood_cart',
  ORDERS: 'centralfood_orders',
  ADMIN_AUTH: 'centralfood_admin_auth'
} as const

export function safeJsonParse<T>(value: string | null, fallback: T): T {
  try { return value ? (JSON.parse(value) as T) : fallback } catch { return fallback }
}

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`
}
