import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDataStore } from '../state/dataStore'
import ProductCard from '../components/ProductCard'
import Empty from '../components/Empty'

export default function Restaurant() {
  const { id } = useParams()
  const restaurants = useDataStore(s => s.restaurants)
  const products = useDataStore(s => s.products)

  const r = restaurants.find(x => x.id === id)
  const items = useMemo(() => products.filter(p => p.restaurantId === id), [products, id])

  if (!r) return <Empty title="Restaurante não encontrado" />

  const grouped = items.reduce<Record<string, typeof items>>((acc, p) => {
    acc[p.category] = acc[p.category] ?? []
    acc[p.category].push(p)
    return acc
  }, {})

  return (
    <>
      <div className="card" style={{overflow:'hidden'}}>
        <div style={{height:170, background:`url(${r.banner ?? '/banner.png'}) center/cover`}} />
        <div className="p24">
          <div className="row" style={{justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap'}}>
            <div>
              <h2 className="h2">{r.name}</h2>
              <div className="small" style={{marginTop:6}}>{r.description}</div>
              <div className="small" style={{marginTop:6}}>{r.tags.join(' • ')}</div>
            </div>
            <Link to="/carrinho" className="btn">Ir para o carrinho</Link>
          </div>
        </div>
      </div>

      <div className="mt16" />

      {items.length === 0 ? (
        <Empty title="Sem itens no cardápio" desc="O admin ainda não cadastrou produtos." />
      ) : (
        <div className="grid" style={{gap:18}}>
          {Object.entries(grouped).map(([cat, ps]) => (
            <section key={cat}>
              <div className="row" style={{justifyContent:'space-between'}}>
                <h3 className="h2">{cat}</h3>
                <span className="small">{ps.length} itens</span>
              </div>
              <div className="grid cols2 mt16">
                {ps.map(p => <ProductCard key={p.id} p={p} />)}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  )
}
