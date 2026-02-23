import type { Product } from '../types'
import { brl } from '../lib/format'
import { useCartStore } from '../state/cartStore'

export default function ProductCard({ p }: { p: Product }) {
  const add = useCartStore(s => s.add)
  return (
    <div className="card p16">
      <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
        <div style={{flex:1}}>
          <div style={{fontWeight:900}}>{p.name}</div>
          <div className="small" style={{marginTop:6}}>{p.description}</div>
          <div style={{marginTop:12, fontWeight:900}}>{brl(p.price)}</div>
        </div>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'flex-end'}}>
          <span className="badge">{p.category}</span>
          <button className="btn" onClick={() => add(p.id, 1)}>Adicionar</button>
        </div>
      </div>
    </div>
  )
}
