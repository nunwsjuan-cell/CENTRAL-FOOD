import { useMemo, useState } from 'react'
import { useAdminStore } from '../../state/adminStore'
import { useDataStore } from '../../state/dataStore'
import type { Product, Restaurant } from '../../types'
import { brl } from '../../lib/format'

type Tab = 'tema' | 'restaurantes' | 'produtos' | 'cupons' | 'reset'

export default function AdminPanel() {
  const logout = useAdminStore(s => s.logout)
  const data = useDataStore()

  const [tab, setTab] = useState<Tab>('tema')
  const restaurants = data.restaurants
  const products = data.products
  const coupons = data.coupons

  const [editingRest, setEditingRest] = useState<Restaurant | null>(null)
  const [editingProd, setEditingProd] = useState<Product | null>(null)

  const productsByRest = useMemo(() => {
    const map: Record<string, Product[]> = {}
    for (const p of products) {
      map[p.restaurantId] = map[p.restaurantId] ?? []
      map[p.restaurantId].push(p)
    }
    return map
  }, [products])

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card p24">
        <div className="row" style={{justifyContent:'space-between', flexWrap:'wrap', gap:10}}>
          <div>
            <h2 className="h2">Painel Admin</h2>
            <div className="small">Tudo salva no LocalStorage (MVP)</div>
          </div>
          <button className="btnGhost" onClick={logout}>Sair</button>
        </div>

        <div className="row" style={{gap:10, flexWrap:'wrap', marginTop:16}}>
          <button className={tab==='tema' ? 'btn' : 'btnGhost'} onClick={()=>setTab('tema')}>Tema</button>
          <button className={tab==='restaurantes' ? 'btn' : 'btnGhost'} onClick={()=>setTab('restaurantes')}>Restaurantes</button>
          <button className={tab==='produtos' ? 'btn' : 'btnGhost'} onClick={()=>setTab('produtos')}>Produtos</button>
          <button className={tab==='cupons' ? 'btn' : 'btnGhost'} onClick={()=>setTab('cupons')}>Cupons</button>
          <button className={tab==='reset' ? 'btn' : 'btnGhost'} onClick={()=>setTab('reset')}>Reset</button>
        </div>
      </div>

      {tab === 'tema' && (
        <div className="card p24">
          <h3 className="h2">Tema / Identidade</h3>
          <div className="small">Troque cor, nome, banner e emoji</div>
          <div className="grid cols2 mt16">
            <div>
              <div className="small">Nome da marca</div>
              <input className="input" value={data.theme.brandName} onChange={(e)=>data.updateTheme({brandName:e.target.value})} />
            </div>
            <div>
              <div className="small">Emoji logo</div>
              <input className="input" value={data.theme.logoEmoji} onChange={(e)=>data.updateTheme({logoEmoji:e.target.value})} />
            </div>
            <div>
              <div className="small">Cor principal</div>
              <input className="input" value={data.theme.primary} onChange={(e)=>data.updateTheme({primary:e.target.value})} placeholder="#ff6a00" />
            </div>
            <div>
              <div className="small">Banner (texto)</div>
              <input className="input" value={data.theme.bannerText} onChange={(e)=>data.updateTheme({bannerText:e.target.value})} />
            </div>
            <div style={{gridColumn:'1 / -1'}}>
              <div className="small">Banner (imagem URL/caminho)</div>
              <input className="input" value={data.theme.bannerImage} onChange={(e)=>data.updateTheme({bannerImage:e.target.value})} />
              <div className="small" style={{marginTop:8}}>Ex.: /banner.png</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'restaurantes' && (
        <div className="grid cols2">
          <div className="card p24">
            <div className="row" style={{justifyContent:'space-between'}}>
              <h3 className="h2">Restaurantes</h3>
              <button className="btn" onClick={()=>setEditingRest({
                id: '',
                name: '',
                description: '',
                tags: [],
                rating: 4.5,
                deliveryFee: 5.0,
                etaMin: 40,
                banner: '/banner.png',
                logoText: ''
              })}>Novo</button>
            </div>

            <div className="mt16 grid" style={{gap:12}}>
              {restaurants.map(r => (
                <div key={r.id} className="card p16" style={{boxShadow:'none'}}>
                  <div className="row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
                    <div>
                      <div style={{fontWeight:900}}>{r.name}</div>
                      <div className="small">{r.tags.join(' • ')}</div>
                      <div className="small" style={{marginTop:6}}>
                        ⭐ {r.rating.toFixed(1)} • {r.etaMin} min • Entrega {brl(r.deliveryFee)} • Produtos: {productsByRest[r.id]?.length ?? 0}
                      </div>
                    </div>
                    <div className="row">
                      <button className="btnGhost" onClick={()=>setEditingRest(r)}>Editar</button>
                      <button className="btnGhost" onClick={()=>data.deleteRestaurant(r.id)}>Excluir</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p24">
            <h3 className="h2">{editingRest ? 'Editar / Criar' : 'Selecione um restaurante'}</h3>
            <div className="small">Salvar aplica na loja</div>

            {!editingRest ? (
              <div className="mt16 small">Clique em <b>Editar</b> ou <b>Novo</b>.</div>
            ) : (
              <div className="mt16 grid" style={{gap:12}}>
                <div>
                  <div className="small">Nome</div>
                  <input className="input" value={editingRest.name} onChange={(e)=>setEditingRest({...editingRest, name:e.target.value})} />
                </div>
                <div>
                  <div className="small">Descrição</div>
                  <input className="input" value={editingRest.description} onChange={(e)=>setEditingRest({...editingRest, description:e.target.value})} />
                </div>
                <div>
                  <div className="small">Tags (separe por vírgula)</div>
                  <input className="input" value={editingRest.tags.join(', ')} onChange={(e)=>setEditingRest({...editingRest, tags:e.target.value.split(',').map(x=>x.trim()).filter(Boolean)})} />
                </div>
                <div className="grid cols2">
                  <div>
                    <div className="small">Nota (0-5)</div>
                    <input className="input" value={String(editingRest.rating)} onChange={(e)=>setEditingRest({...editingRest, rating: Number(e.target.value) || 0})} />
                  </div>
                  <div>
                    <div className="small">Tempo (min)</div>
                    <input className="input" value={String(editingRest.etaMin)} onChange={(e)=>setEditingRest({...editingRest, etaMin: Number(e.target.value) || 0})} />
                  </div>
                </div>
                <div className="grid cols2">
                  <div>
                    <div className="small">Taxa entrega</div>
                    <input className="input" value={String(editingRest.deliveryFee)} onChange={(e)=>setEditingRest({...editingRest, deliveryFee: Number(e.target.value) || 0})} />
                  </div>
                  <div>
                    <div className="small">Logo (texto)</div>
                    <input className="input" value={editingRest.logoText ?? ''} onChange={(e)=>setEditingRest({...editingRest, logoText: e.target.value})} />
                  </div>
                </div>
                <div>
                  <div className="small">Banner (URL/caminho)</div>
                  <input className="input" value={editingRest.banner ?? ''} onChange={(e)=>setEditingRest({...editingRest, banner:e.target.value})} />
                </div>
                <div className="row" style={{justifyContent:'space-between', marginTop:6}}>
                  <button className="btnGhost" onClick={()=>setEditingRest(null)}>Cancelar</button>
                  <button className="btn" onClick={()=>{
                    const r = editingRest
                    data.upsertRestaurant({
                      id: r.id || undefined,
                      name: r.name.trim() || 'Restaurante',
                      description: r.description.trim(),
                      tags: r.tags,
                      rating: r.rating,
                      deliveryFee: r.deliveryFee,
                      etaMin: r.etaMin,
                      banner: r.banner,
                      logoText: r.logoText
                    })
                    setEditingRest(null)
                  }}>Salvar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'produtos' && (
        <div className="grid cols2">
          <div className="card p24">
            <div className="row" style={{justifyContent:'space-between'}}>
              <h3 className="h2">Produtos</h3>
              <button className="btn" onClick={()=>setEditingProd({
                id: '',
                restaurantId: restaurants[0]?.id ?? '',
                name: '',
                description: '',
                price: 0,
                category: 'Geral'
              })}>Novo</button>
            </div>
            <div className="small">Cadastre itens do cardápio</div>

            <div className="mt16 grid" style={{gap:12}}>
              {products.map(p => {
                const r = restaurants.find(x => x.id === p.restaurantId)
                return (
                  <div key={p.id} className="card p16" style={{boxShadow:'none'}}>
                    <div className="row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
                      <div>
                        <div style={{fontWeight:900}}>{p.name}</div>
                        <div className="small">{r?.name ?? '—'} • {p.category}</div>
                        <div className="small" style={{marginTop:6}}>{brl(p.price)}</div>
                      </div>
                      <div className="row">
                        <button className="btnGhost" onClick={()=>setEditingProd(p)}>Editar</button>
                        <button className="btnGhost" onClick={()=>data.deleteProduct(p.id)}>Excluir</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card p24">
            <h3 className="h2">{editingProd ? 'Editar / Criar' : 'Selecione um produto'}</h3>
            <div className="small">Salvar aplica na loja</div>

            {!editingProd ? (
              <div className="mt16 small">Clique em <b>Editar</b> ou <b>Novo</b>.</div>
            ) : (
              <div className="mt16 grid" style={{gap:12}}>
                <div>
                  <div className="small">Restaurante</div>
                  <select className="input" value={editingProd.restaurantId} onChange={(e)=>setEditingProd({...editingProd, restaurantId:e.target.value})}>
                    {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
                <div>
                  <div className="small">Nome</div>
                  <input className="input" value={editingProd.name} onChange={(e)=>setEditingProd({...editingProd, name:e.target.value})} />
                </div>
                <div>
                  <div className="small">Descrição</div>
                  <input className="input" value={editingProd.description} onChange={(e)=>setEditingProd({...editingProd, description:e.target.value})} />
                </div>
                <div className="grid cols2">
                  <div>
                    <div className="small">Preço</div>
                    <input className="input" value={String(editingProd.price)} onChange={(e)=>setEditingProd({...editingProd, price:Number(e.target.value) || 0})} />
                  </div>
                  <div>
                    <div className="small">Categoria</div>
                    <input className="input" value={editingProd.category} onChange={(e)=>setEditingProd({...editingProd, category:e.target.value})} />
                  </div>
                </div>

                <div className="row" style={{justifyContent:'space-between', marginTop:6}}>
                  <button className="btnGhost" onClick={()=>setEditingProd(null)}>Cancelar</button>
                  <button className="btn" onClick={()=>{
                    const p = editingProd
                    data.upsertProduct({
                      id: p.id || undefined,
                      restaurantId: p.restaurantId,
                      name: p.name.trim() || 'Produto',
                      description: p.description.trim(),
                      price: p.price,
                      category: p.category.trim() || 'Geral'
                    })
                    setEditingProd(null)
                  }}>Salvar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'cupons' && (
        <div className="grid cols2">
          <div className="card p24">
            <h3 className="h2">Cupons</h3>
            <div className="small">Crie e remova cupons</div>

            <div className="mt16 grid" style={{gap:12}}>
              {coupons.map(c => (
                <div key={c.code} className="card p16" style={{boxShadow:'none'}}>
                  <div className="row" style={{justifyContent:'space-between'}}>
                    <div>
                      <div style={{fontWeight:900}}>{c.code}</div>
                      <div className="small">{c.discountPct}% off</div>
                    </div>
                    <button className="btnGhost" onClick={()=>data.deleteCoupon(c.code)}>Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CouponForm />
        </div>
      )}

      {tab === 'reset' && (
        <div className="card p24">
          <h3 className="h2">Resetar dados</h3>
          <div className="small">Volta para os dados de exemplo e limpa tudo salvo</div>
          <div className="row" style={{gap:10, marginTop:16, flexWrap:'wrap'}}>
            <button className="btnGhost" onClick={()=>data.resetAll()}>Resetar dados da loja</button>
            <button className="btnGhost" onClick={()=>{
              localStorage.removeItem('centralfood_orders')
              alert('Pedidos apagados.')
            }}>Apagar pedidos</button>
          </div>
        </div>
      )}
    </div>
  )
}

function CouponForm() {
  const data = useDataStore()
  const [code, setCode] = useState('')
  const [pct, setPct] = useState('10')

  return (
    <div className="card p24">
      <h3 className="h2">Novo cupom</h3>
      <div className="small">Ex.: CENTRAL10</div>

      <div className="mt16 grid" style={{gap:12}}>
        <div>
          <div className="small">Código</div>
          <input className="input" value={code} onChange={(e)=>setCode(e.target.value.toUpperCase())} />
        </div>
        <div>
          <div className="small">Desconto (%)</div>
          <input className="input" value={pct} onChange={(e)=>setPct(e.target.value)} />
        </div>

        <button className="btn" onClick={()=>{
          const c = code.trim().toUpperCase()
          const n = Number(pct)
          if (!c || !Number.isFinite(n) || n <= 0 || n > 90) {
            alert('Cupom inválido. Use 1 a 90%.')
            return
          }
          data.upsertCoupon({ code: c, discountPct: Math.round(n) })
          setCode('')
          setPct('10')
        }}>Salvar cupom</button>
      </div>
    </div>
  )
}
