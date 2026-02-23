import { create } from 'zustand'
import { LS_KEYS, safeJsonParse } from '../lib/storage'

type AdminState = {
  isAuthed: boolean
  load: () => void
  login: () => void
  logout: () => void
}

export const useAdminStore = create<AdminState>((set, get) => ({
  isAuthed: false,
  load: () => set({ isAuthed: safeJsonParse<boolean>(localStorage.getItem(LS_KEYS.ADMIN_AUTH), false) }),
  login: () => { localStorage.setItem(LS_KEYS.ADMIN_AUTH, 'true'); set({ isAuthed: true }) },
  logout: () => { localStorage.removeItem(LS_KEYS.ADMIN_AUTH); set({ isAuthed: false }) }
}))
