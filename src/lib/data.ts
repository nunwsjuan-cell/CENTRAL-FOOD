import type { Restaurant, Product } from '../types'

export const seedData = {
  "theme": {
    "brandName": "Centralfood",
    "primary": "#ff6a00",
    "logoEmoji": "🍊",
    "bannerText": "Peça agora com entrega rápida!",
    "bannerImage": "/banner.png"
  },
  "restaurants": [
    {
      "id": "r1",
      "name": "Burger Central",
      "description": "Hambúrguer artesanal com batata e molhos da casa.",
      "tags": [
        "Hambúrguer",
        "Artesanal"
      ],
      "rating": 4.8,
      "deliveryFee": 5.99,
      "etaMin": 35,
      "banner": "/banner.png",
      "logoText": "BC"
    },
    {
      "id": "r2",
      "name": "Sushi Laranja",
      "description": "Sushis frescos e combos especiais.",
      "tags": [
        "Japonesa",
        "Sushi"
      ],
      "rating": 4.7,
      "deliveryFee": 7.99,
      "etaMin": 50,
      "banner": "/banner.png",
      "logoText": "SL"
    },
    {
      "id": "r3",
      "name": "Pizzaria Central",
      "description": "Pizzas fininhas e recheadas.",
      "tags": [
        "Pizza",
        "Italiana"
      ],
      "rating": 4.6,
      "deliveryFee": 4.99,
      "etaMin": 45,
      "banner": "/banner.png",
      "logoText": "PC"
    }
  ],
  "products": [
    {
      "id": "p1",
      "restaurantId": "r1",
      "name": "Smash Burger",
      "description": "2 smash, cheddar, cebola, molho.",
      "price": 29.9,
      "category": "Lanches"
    },
    {
      "id": "p2",
      "restaurantId": "r1",
      "name": "Batata Frita",
      "description": "Porção média crocante.",
      "price": 12.5,
      "category": "Acompanhamentos"
    },
    {
      "id": "p3",
      "restaurantId": "r2",
      "name": "Combo 20 peças",
      "description": "Mix de nigiris e hossomakis.",
      "price": 59.9,
      "category": "Combos"
    },
    {
      "id": "p4",
      "restaurantId": "r2",
      "name": "Temaki Salmão",
      "description": "Temaki grande com salmão.",
      "price": 28.0,
      "category": "Temaki"
    },
    {
      "id": "p5",
      "restaurantId": "r3",
      "name": "Pizza Calabresa",
      "description": "Calabresa, cebola, azeitona.",
      "price": 44.9,
      "category": "Pizzas"
    },
    {
      "id": "p6",
      "restaurantId": "r3",
      "name": "Pizza Frango c/ Catupiry",
      "description": "Frango desfiado e catupiry.",
      "price": 49.9,
      "category": "Pizzas"
    }
  ],
  "coupons": [
    {
      "code": "CENTRAL10",
      "discountPct": 10
    },
    {
      "code": "LARANJA15",
      "discountPct": 15
    }
  ]
} as const
