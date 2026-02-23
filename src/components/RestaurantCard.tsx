import type { Restaurant } from '../types'
import { brl } from '../lib/format'
import { Link } from 'react-router-dom'

export default function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <Link to={`/restaurantes/${r.id}`} className="card p16" style={{display:'block'}}>
      <div className="row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
        <div className="row" style={{gap:12, alignItems:'center'}}>
          <div style={{width:44, height:44, borderRadius:14, background:'rgba(255,106,0,.12)', display:'grid', placeItems:'center', border:'1px solid rgba(255,106,0,.15)'}}>
            <strong style={{color:'var(--orange)'}}>{r.logoText ?? r.name.slice(0,2).toUpperCase()}</strong>
          </div>
          <div>
            <div style={{fontWeight:900}}>{r.name}</div>
            <div className="small">{r.description}</div>
            <div className="small" style={{marginTop:6}}>{r.tags.join(' • ')}</div>
          </div>
        </div>
        <div style={{textAlign:'right'}}>
          <div className="badge">⭐ {r.rating.toFixed(1)}</div>
          <div className="small" style={{marginTop:8}}>{r.etaMin} min • Entrega {brl(r.deliveryFee)}</div>
        </div>
      </div>
    </Link>
  )
}
