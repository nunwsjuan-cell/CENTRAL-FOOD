export default function Empty({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="card p24" style={{textAlign:'center'}}>
      <div style={{fontSize:40}}>🍊</div>
      <h2 className="h2" style={{marginTop:8}}>{title}</h2>
      {desc && <div className="small" style={{marginTop:8}}>{desc}</div>}
    </div>
  )
}
