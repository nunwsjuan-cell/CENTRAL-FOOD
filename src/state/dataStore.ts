import { create } from 'zustand'
import type { Product, Restaurant } from '../types'
import { LS_KEYS, safeJsonParse, uid } from '../lib/storage'
import { seedData } from '../lib/data'

type Coupon = { code: string; discountPct: number }
type Theme = { brandName: string; primary: string; logoEmoji: string; bannerText: string; bannerImage: string }

type DataState = {
  theme: Theme
  restaurants: Restaurant[]
  products: Product[]
  coupons: Coupon[]
  load: () => void
  save: () => void

  upsertRestaurant: (r: Omit<Restaurant,'id'> & {id?: string}) => void
  deleteRestaurant: (id: string) => void

  upsertProduct: (p: Omit<Product,'id'> & {id?: string}) => void
  deleteProduct: (id: string) => void

  upsertCoupon: (c: Coupon) => void
  deleteCoupon: (code: string) => void

  updateTheme: (t: Partial<Theme>) => void
  resetAll: () => void
}

const initial = {
  theme: JSON.parse(JSON.stringify(seedData.theme)) as Theme,
  restaurants: JSON.parse(JSON.stringify(seedData.restaurants)) as Restaurant[],
  products: JSON.parse(JSON.stringify(seedData.products)) as Product[],
  coupons: JSON.parse(JSON.stringify(seedData.coupons)) as Coupon[]
}

export const useDataStore = create<DataState>((set, get) => ({
  ...initial,

  load: () => {
    const saved = safeJsonParse<Partial<typeof initial>>(localStorage.getItem(LS_KEYS.DATA), {})
    set({
      theme: saved.theme ?? initial.theme,
      restaurants: saved.restaurants ?? initial.restaurants,
      products: saved.products ?? initial.products,
      coupons: (saved as any).coupons ?? initial.coupons
    })
  },

  save: () => {
    const { theme, restaurants, products, coupons } = get()
    localStorage.setItem(LS_KEYS.DATA, JSON.stringify({ theme, restaurants, products, coupons }))
  },

  upsertRestaurant: (r) => set((s) => {
    const id = r.id ?? uid('rest')
    const next = [...s.restaurants]
    const idx = next.findIndex(x => x.id === id)
    const item: Restaurant = { id, ...r }
    if (idx >= 0) next[idx] = item
    else next.unshift(item)
    return { restaurants: next }
  }),

  deleteRestaurant: (id) => set((s) => ({
    restaurants: s.restaurants.filter(r => r.id !== id),
    products: s.products.filter(p => p.restaurantId !== id)
  })),

  upsertProduct: (p) => set((s) => {
    const id = p.id ?? uid('prod')
    const next = [...s.products]
    const idx = next.findIndex(x => x.id === id)
    const item: Product = { id, ...p }
    if (idx >= 0) next[idx] = item
    else next.unshift(item)
    return { products: next }
  }),

  deleteProduct: (id) => set((s) => ({ products: s.products.filter(p => p.id !== id) })),

  upsertCoupon: (c) => set((s) => {
    const next = [...s.coupons]
    const idx = next.findIndex(x => x.code.toUpperCase() === c.code.toUpperCase())
    const item = { code: c.code.toUpperCase(), discountPct: c.discountPct }
    if (idx >= 0) next[idx] = item
    else next.unshift(item)
    return { coupons: next }
  }),

  deleteCoupon: (code) => set((s) => ({ coupons: s.coupons.filter(c => c.code !== code.toUpperCase()) })),

  updateTheme: (t) => set((s) => ({ theme: { ...s.theme, ...t } })),

  resetAll: () => {
    localStorage.removeItem(LS_KEYS.DATA)
    set(initial)
  }
}))
