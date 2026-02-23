import { Outlet, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useCartStore } from '../state/cartStore'
import { useAdminStore } from '../state/adminStore'
import { useDataStore } from '../state/dataStore'

function useBoot() {
  const cart = useCartStore()
  const admin = useAdminStore()
  const data = useDataStore()

  useEffect(() => {
    data.load()
    cart.load()
    admin.load()
  }, [])

  useEffect(() => { data.save() }, [data.theme, data.restaurants, data.products, data.coupons])
  useEffect(() => { cart.save() }, [cart.items])
}

export default function Layout() {
  useBoot()
  const { pathname } = useLocation()
  const cartCount = useCartStore(s => s.items.reduce((a,b)=>a+b.qty,0))
  const theme = useDataStore(s => s.theme)

  useEffect(() => {
    document.documentElement.style.setProperty('--orange', theme.primary)
  }, [theme.primary])

  return (
    <>
      <header style={{position:'sticky', top:0, zIndex:50, backdropFilter:'blur(10px)', background:'rgba(255,255,255,.8)', borderBottom:'1px solid var(--border)'}}>
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px'}}>
          <Link to="/" className="row" style={{gap:10}}>
            <div className="badge" style={{borderColor:'rgba(255,106,0,.25)'}}>
              <span style={{fontSize:18}}>{theme.logoEmoji}</span>
              <strong>{theme.brandName}</strong>
            </div>
          </Link>

          <nav className="row" style={{gap:10}}>
            <Link className="btnGhost" to="/restaurantes">Restaurantes</Link>
            <Link className="btnGhost" to="/pedidos">Pedidos</Link>
            <Link className="btn" to="/carrinho">Carrinho {cartCount>0 ? `(${cartCount})` : ''}</Link>
          </nav>
        </div>
        {pathname.startsWith('/admin') && (
          <div style={{background:'rgba(17,24,39,.95)', color:'#fff'}}>
            <div className="container" style={{padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <strong>Modo Admin</strong>
              <Link to="/" style={{opacity:.9}}>Voltar para a loja</Link>
            </div>
          </div>
        )}
      </header>

      <main className="container" style={{padding:'18px 16px 40px'}}>
        <Outlet />
      </main>

      <footer style={{borderTop:'1px solid var(--border)', background:'#fff'}}>
        <div className="container" style={{padding:'18px 16px', display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap'}}>
          <div>
            <strong>{theme.brandName}</strong>
            <div className="small">MVP estilo iFood • PWA instalável</div>
          </div>
          <div className="small">
            Admin: <span className="kbd">/admin</span> • Login: <span className="kbd">admin</span>/<span className="kbd">admin123</span>
          </div>
        </div>
      </footer>
    </>
  )
}
