import { useEffect } from 'react'
import Empty from '../components/Empty'
import { useOrderStore } from '../state/orderStore'
import { brl } from '../lib/format'
import { Link } from 'react-router-dom'

const statusLabel: Record<string,string> = {
  aguardando_pagamento: 'Aguardando pagamento',
  pago: 'Pago',
  preparando: 'Preparando',
  saiu_para_entrega: 'Saiu para entrega',
  entregue: 'Entregue'
}

export default function Orders() {
  const { orders, load, save } = useOrderStore()

  useEffect(() => { load() }, [])
  useEffect(() => { save() }, [orders])

  if (orders.length === 0) return <Empty title="Sem pedidos ainda" desc="Quando você finalizar um pedido, ele aparece aqui." />

  return (
    <div className="grid" style={{gap:14}}>
      <div className="row" style={{justifyContent:'space-between', flexWrap:'wrap', gap:10}}>
        <div>
          <h2 className="h2">Meus pedidos</h2>
          <div className="small">Acompanhe status e valores</div>
        </div>
        <Link className="btnGhost" to="/restaurantes">Pedir novamente</Link>
      </div>

      {orders.map(o => (
        <div key={o.id} className="card p24">
          <div className="row" style={{justifyContent:'space-between', flexWrap:'wrap', gap:10}}>
            <div>
              <div className="small">Pedido</div>
              <div style={{fontWeight:900}}>{o.id}</div>
              <div className="small">{new Date(o.createdAt).toLocaleString('pt-BR')}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <span className="badge">{statusLabel[o.status]}</span>
              <div style={{marginTop:10, fontWeight:900}}>{brl(o.totals.total)}</div>
            </div>
          </div>

          <hr className="hr" />

          <div className="grid cols2">
            <div>
              <div className="small mb8">Itens</div>
              <ul style={{margin:0, paddingLeft:18}}>
                {o.items.map((it, idx) => (
                  <li key={idx}>
                    {it.qty}x {it.name} — {brl(it.price * it.qty)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="small mb8">Pix (simulado)</div>
              <div className="card p16" style={{boxShadow:'none'}}>
                <div className="small">Chave</div>
                <div style={{wordBreak:'break-all', fontWeight:700}}>{o.pix.chave}</div>
                <div className="small" style={{marginTop:10}}>Payload</div>
                <div className="small" style={{wordBreak:'break-all'}}>{o.pix.payload}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
