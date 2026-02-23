export type Product = {
  id: string
  restaurantId: string
  name: string
  description: string
  price: number
  image?: string
  category: string
}

export type Restaurant = {
  id: string
  name: string
  description: string
  tags: string[]
  rating: number
  deliveryFee: number
  etaMin: number
  banner?: string
  logoText?: string
}

export type CartItem = {
  productId: string
  qty: number
}

export type Order = {
  id: string
  createdAt: string
  status: 'aguardando_pagamento' | 'pago' | 'preparando' | 'saiu_para_entrega' | 'entregue'
  customer: {
    email: string
    phone: string
    cpf: string
    address: string
  }
  coupon?: { code: string; discountPct: number }
  items: Array<{
    productId: string
    name: string
    price: number
    qty: number
    restaurantId: string
    restaurantName: string
  }>
  totals: {
    subtotal: number
    delivery: number
    discount: number
    total: number
  }
  pix: {
    payload: string
    chave: string
  }
}
