# Centralfood (PWA) 🍊

Um site estilo iFood (MVP) com:
- Listagem de restaurantes
- Cardápio, carrinho e checkout
- Geração de "QR Code Pix" **simulado** (exibe payload/ chave aleatória)
- Área Admin (login) para gerenciar restaurantes, produtos, banner e tema (salva no LocalStorage)
- PWA instalável (vira “app” no celular/desktop)

> **Importante:** este projeto é um MVP front-end (sem backend). Para produção real (pagamento automático, entrega automática, estoque multiusuário etc.) você vai precisar de um backend e integração Pix oficial.

## Rodar local
1) Instale o Node.js LTS  
2) No terminal, dentro da pasta do projeto:
```bash
npm install
npm run dev
```
Abra o link que o Vite mostrar.

## Build
```bash
npm run build
npm run preview
```

## Login Admin
- Usuário: **admin**
- Senha: **admin123**
(Altere em `src/config/admin.ts`)

## Colocar online (grátis)
Veja o passo a passo no final desta mensagem (Vercel e Cloudflare Pages).
