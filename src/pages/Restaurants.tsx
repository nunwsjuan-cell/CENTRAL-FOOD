import { useMemo, useState } from 'react'
import RestaurantCard from '../components/RestaurantCard'
import { useDataStore } from '../state/dataStore'
import Empty from '../components/Empty'

export default function Restaurants() {
  const restaurants = useDataStore(s => s.restaurants)
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return restaurants
    return restaurants.filter(r => (r.name + ' ' + r.description + ' ' + r.tags.join(' ')).toLowerCase().includes(t))
  }, [restaurants, q])

  return (
    <>
      <div className="row" style={{justifyContent:'space-between', flexWrap:'wrap', gap:10}}>
        <div>
          <h2 className="h2">Restaurantes</h2>
          <div className="small">Pesquise e escolha onde pedir</div>
        </div>
        <input className="input" style={{maxWidth:360}} value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar restaurante..." />
      </div>

      <div className="grid cols2 mt16">
        {filtered.length === 0 ? (
          <Empty title="Nada encontrado" desc="Tente outro termo de busca." />
        ) : filtered.map(r => <RestaurantCard key={r.id} r={r} />)}
      </div>
    </>
  )
}
