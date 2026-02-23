import { create } from 'zustand'
import type { CartItem } from '../types'
import { LS_KEYS, safeJsonParse } from '../lib/storage'

type CartState = {
  items: CartItem[]
  load: () => void
  save: () => void
  add: (productId: string, qty?: number) => void
  remove: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  clear: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  load: () => set({ items: safeJsonParse<CartItem[]>(localStorage.getItem(LS_KEYS.CART), []) }),
  save: () => localStorage.setItem(LS_KEYS.CART, JSON.stringify(get().items)),

  add: (productId, qty = 1) => set((s) => {
    const next = [...s.items]
    const i = next.findIndex(x => x.productId === productId)
    if (i >= 0) next[i] = { ...next[i], qty: next[i].qty + qty }
    else next.push({ productId, qty })
    return { items: next }
  }),

  remove: (productId) => set((s) => ({ items: s.items.filter(i => i.productId !== productId) })),

  setQty: (productId, qty) => set((s) => ({
    items: s.items.map(i => i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i)
  })),

  clear: () => set({ items: [] })
}))
