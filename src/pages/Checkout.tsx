import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Empty from '../components/Empty'
import { useCartStore } from '../state/cartStore'
import { useDataStore } from '../state/dataStore'
import { useOrderStore } from '../state/orderStore'
import { brl, isValidCPF, isValidEmail, onlyDigits } from '../lib/format'
import { uid } from '../lib/storage'
import { generatePixPayload } from '../lib/pix'
import type { Order } from '../types'

export default function Checkout() {
  const nav = useNavigate()
  const cart = useCartStore()
  const data = useDataStore()
  const orders = useOrderStore()

  const [coupon, setCoupon] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cpf, setCpf] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => { orders.load() }, [])

  const lines = useMemo(() => cart.items.map(i => {
    const p = data.products.find(x => x.id === i.productId)
    const r = p ? data.restaurants.find(rr => rr.id === p.restaurantId) : undefined
    return { i, p, r }
  }).filter(x => x.p && x.r), [cart.items, data.products, data.restaurants])

  if (lines.length === 0) return <Empty title="Carrinho vazio" desc="Adicione itens para finalizar." />

  const restaurantId = lines[0].r!.id
  const sameRestaurant = lines.every(x => x.r!.id === restaurantId)

  const subtotal = lines.reduce((s, x) => s + x.p!.price * x.i.qty, 0)
  const delivery = sameRestaurant ? lines[0].r!.deliveryFee : Math.max(...lines.map(x => x.r!.deliveryFee))
  const found = data.coupons.find(c => c.code.toUpperCase() === coupon.trim().toUpperCase())
  const discount = found ? subtotal * (found.discountPct/100) : 0
  const total = Math.max(0, subtotal + delivery - discount)

  const canFinish =
    isValidEmail(email) &&
    onlyDigits(phone).length >= 10 &&
    isValidCPF(cpf) &&
    address.trim().length >= 8

  function finish() {
    if (!canFinish) return
    const id = uid('pedido')
    const pix = generatePixPayload(id.slice(-8), total)

    const order: Order = {
      id,
      createdAt: new Date().toISOString(),
      status: 'aguardando_pagamento',
      customer: { email, phone, cpf, address },
      coupon: found ? { code: found.code, discountPct: found.discountPct } : undefined,
      items: lines.map(x => ({
        productId: x.p!.id,
        name: x.p!.name,
        price: x.p!.price,
        qty: x.i.qty,
        restaurantId: x.r!.id,
        restaurantName: x.r!.name
      })),
      totals: { subtotal, delivery, discount, total },
      pix
    }

    orders.addOrder(order)
    orders.save()
    cart.clear()
    cart.save()
    nav('/pedidos')
  }

  return (
    <div className="grid cols2">
      <div className="card p24">
        <h2 className="h2">Checkout</h2>
        <div className="small">Preencha os dados para gerar o Pix</div>

        {!sameRestaurant && (
          <div className="card p16 mt16" style={{boxShadow:'none', borderColor:'rgba(255,106,0,.35)'}}>
            <strong>Atenção</strong>
            <div className="small">Seu carrinho tem itens de restaurantes diferentes. Neste MVP, a taxa de entrega considera a maior taxa.</div>
          </div>
        )}

        <div className="mt16 grid" style={{gap:12}}>
          <div>
            <div className="small">E-mail</div>
            <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="seuemail@gmail.com" />
          </div>
          <div>
            <div className="small">Telefone</div>
            <input className="input" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="(DDD) 9xxxx-xxxx" />
          </div>
          <div>
            <div className="small">CPF</div>
            <input className="input" value={cpf} onChange={(e)=>setCpf(e.target.value)} placeholder="000.000.000-00" />
            <div className="small" style={{marginTop:6}}>Validação básica de CPF ativa.</div>
          </div>
          <div>
            <div className="small">Endereço</div>
            <input className="input" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Rua, número, bairro, cidade" />
          </div>
          <div>
            <div className="small">Cupom (opcional)</div>
            <input className="input" value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder="CENTRAL10" />
            <div className="small" style={{marginTop:6}}>
              {found ? <>Aplicado: <b>{found.code}</b> ({found.discountPct}% off)</> : 'Ex.: CENTRAL10, LARANJA15'}
            </div>
          </div>
        </div>

        <hr className="hr" />

        <button className="btn" disabled={!canFinish} onClick={finish}>
          Gerar Pix e finalizar
        </button>
        <div className="small" style={{marginTop:10}}>
          Ao finalizar, o pedido aparece em <Link to="/pedidos"><b>Pedidos</b></Link> com chave/payload do Pix (simulado).
        </div>
      </div>

      <div className="card p24">
        <h2 className="h2">Resumo</h2>
        <div className="small">Valores do pedido</div>

        <div className="mt16 grid" style={{gap:10}}>
          <div className="row" style={{justifyContent:'space-between'}}><span>Subtotal</span><strong>{brl(subtotal)}</strong></div>
          <div className="row" style={{justifyContent:'space-between'}}><span>Entrega</span><strong>{brl(delivery)}</strong></div>
          <div className="row" style={{justifyContent:'space-between'}}><span>Desconto</span><strong>- {brl(discount)}</strong></div>
          <hr className="hr" />
          <div className="row" style={{justifyContent:'space-between', fontSize:18}}><span>Total</span><strong>{brl(total)}</strong></div>
        </div>

        <hr className="hr" />
        <Link className="btnGhost" to="/carrinho">Voltar ao carrinho</Link>
      </div>
    </div>
  )
}
