import { Link } from 'react-router-dom'
import { useDataStore } from '../state/dataStore'

export default function Home() {
  const theme = useDataStore(s => s.theme)
  return (
    <div className="grid cols2" style={{alignItems:'start'}}>
      <div className="card p24">
        <div className="badge" style={{borderColor:'rgba(255,106,0,.22)'}}>✨ PWA instalável</div>
        <h1 className="h1" style={{marginTop:12}}>{theme.brandName}</h1>
        <p className="small" style={{fontSize:14, marginTop:10}}>
          {theme.bannerText} Escolha um restaurante, adicione no carrinho e finalize no Pix (simulado).
        </p>

        <div className="row" style={{gap:10, flexWrap:'wrap', marginTop:16}}>
          <Link className="btn" to="/restaurantes">Ver restaurantes</Link>
          <Link className="btnGhost" to="/admin/login">Entrar no admin</Link>
        </div>

        <hr className="hr" />
        <div className="small">
          Dica: no celular, abra o site e toque em <b>“Adicionar à tela inicial”</b> para instalar como app.
        </div>
      </div>

      <div className="card" style={{overflow:'hidden'}}>
        <img src={theme.bannerImage} alt="banner" style={{width:'100%', height:'100%', objectFit:'cover'}} />
      </div>
    </div>
  )
}
