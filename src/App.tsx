import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Restaurants from './pages/Restaurants'
import Restaurant from './pages/Restaurant'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import AdminLogin from './pages/admin/AdminLogin'
import AdminPanel from './pages/admin/AdminPanel'
import { useAdminStore } from './state/adminStore'

export default function App() {
  const { isAuthed } = useAdminStore()
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<Restaurants />} />
        <Route path="/restaurantes/:id" element={<Restaurant />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pedidos" element={<Orders />} />
        <Route path="/admin" element={isAuthed ? <AdminPanel /> : <Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
