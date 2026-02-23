export function generatePixPayload(orderId: string, amount: number) {
  // Simulação de payload Pix. Em produção, gere via PSP/banco (Pix Cobrança).
  const chave = randomKey(32)
  const payload = `00020126580014BR.GOV.BCB.PIX0136${chave}520400005303986540${amount.toFixed(2)}5802BR5920CENTRALFOOD DEMO6009SAO PAULO62120508${orderId}6304`
  return { payload, chave }
}

export function randomKey(len: number) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789abcdefghijkmnopqrstuvwxyz'
  let out = ''
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)]
  return out
}
