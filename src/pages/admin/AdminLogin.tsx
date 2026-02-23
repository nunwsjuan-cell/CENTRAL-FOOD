import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ADMIN_PASS, ADMIN_USER } from '../../config/admin'
import { useAdminStore } from '../../state/adminStore'

export default function AdminLogin() {
  const nav = useNavigate()
  const login = useAdminStore(s => s.login)

  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')

  function submit() {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      login()
      nav('/admin')
    } else {
      setErr('Usuário ou senha inválidos.')
    }
  }

  return (
    <div className="grid" style={{maxWidth:520, margin:'0 auto'}}>
      <div className="card p24">
        <h2 className="h2">Login Admin</h2>
        <div className="small">Gerencie restaurantes, produtos, cupons e tema</div>

        <div className="mt16 grid" style={{gap:12}}>
          <div>
            <div className="small">Usuário</div>
            <input className="input" value={user} onChange={(e)=>setUser(e.target.value)} placeholder="admin" />
          </div>
          <div>
            <div className="small">Senha</div>
            <input className="input" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="admin123" />
          </div>
          {err && <div className="small" style={{color:'#b91c1c'}}>{err}</div>}
          <button className="btn" onClick={submit}>Entrar</button>
          <div className="small">Padrão: <b>admin</b> / <b>admin123</b></div>
        </div>
      </div>
    </div>
  )
}
