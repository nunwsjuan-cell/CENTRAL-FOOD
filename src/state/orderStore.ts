import { create } from 'zustand'
import type { Order } from '../types'
import { LS_KEYS, safeJsonParse } from '../lib/storage'

type OrderState = {
  orders: Order[]
  load: () => void
  save: () => void
  addOrder: (o: Order) => void
  setStatus: (id: string, status: Order['status']) => void
  clear: () => void
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  load: () => set({ orders: safeJsonParse<Order[]>(localStorage.getItem(LS_KEYS.ORDERS), []) }),
  save: () => localStorage.setItem(LS_KEYS.ORDERS, JSON.stringify(get().orders)),

  addOrder: (o) => set((s) => ({ orders: [o, ...s.orders] })),
  setStatus: (id, status) => set((s) => ({ orders: s.orders.map(o => o.id === id ? { ...o, status } : o) })),
  clear: () => set({ orders: [] })
}))
