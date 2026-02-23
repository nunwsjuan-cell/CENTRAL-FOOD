import { Link } from 'react-router-dom'
import Empty from '../components/Empty'
import { useCartStore } from '../state/cartStore'
import { useDataStore } from '../state/dataStore'
import { brl } from '../lib/format'

export default function Cart() {
  const { items, setQty, remove } = useCartStore()
  const products = useDataStore(s => s.products)

  const lines = items.map(i => {
    const p = products.find(x => x.id === i.productId)
    return { i, p }
  }).filter(x => x.p)

  if (lines.length === 0) {
    return <Empty title="Seu carrinho está vazio" desc="Escolha um restaurante e adicione itens." />
  }

  const subtotal = lines.reduce((s, x) => s + (x.p!.price * x.i.qty), 0)

  return (
    <div className="grid cols2">
      <div className="card p24">
        <h2 className="h2">Carrinho</h2>
        <div className="small">Revise seus itens</div>

        <div className="mt16" />

        <div className="grid" style={{gap:12}}>
          {lines.map(({i,p}) => (
            <div key={i.productId} className="card p16" style={{boxShadow:'none'}}>
              <div className="row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
                <div>
                  <div style={{fontWeight:900}}>{p!.name}</div>
                  <div className="small">{brl(p!.price)}</div>
                </div>
                <button className="btnGhost" onClick={()=>remove(i.productId)}>Remover</button>
              </div>

              <div className="row" style={{justifyContent:'space-between', marginTop:12}}>
                <div className="row" style={{gap:8}}>
                  <button className="btnGhost" onClick={()=>setQty(i.productId, i.qty-1)}>-</button>
                  <strong>{i.qty}</strong>
                  <button className="btnGhost" onClick={()=>setQty(i.productId, i.qty+1)}>+</button>
                </div>
                <strong>{brl(p!.price * i.qty)}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p24">
        <h2 className="h2">Resumo</h2>
        <div className="small">Subtotal (sem entrega/cupom)</div>

        <div className="mt16 row" style={{justifyContent:'space-between'}}>
          <span>Subtotal</span>
          <strong>{brl(subtotal)}</strong>
        </div>

        <hr className="hr" />
        <Link className="btn" to="/checkout">Finalizar compra</Link>
        <div className="small" style={{marginTop:12}}>No checkout você escolhe cupom e gera o Pix (simulado).</div>
      </div>
    </div>
  )
}
