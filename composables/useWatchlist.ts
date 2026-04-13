// Composable untuk menyimpan watchlist user di localStorage
import type { Drama } from './useApi'

const STORAGE_KEY = 'qp_watchlist'

export const useWatchlist = () => {
  const watchlist = useState<Drama[]>('watchlist', () => [])

  // Load from localStorage on client
  const load = () => {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) watchlist.value = JSON.parse(stored)
      } catch {}
    }
  }

  const save = () => {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist.value))
    }
  }

  const add = (drama: Drama) => {
    if (!watchlist.value.find(d => d.id === drama.id)) {
      watchlist.value.push(drama)
      save()
    }
  }

  const remove = (id: string | number) => {
    watchlist.value = watchlist.value.filter(d => d.id !== id)
    save()
  }

  const toggle = (drama: Drama) => {
    if (isInWatchlist(drama.id)) {
      remove(drama.id)
    } else {
      add(drama)
    }
  }

  const isInWatchlist = (id: string | number) => {
    return watchlist.value.some(d => d.id === id)
  }

  return { watchlist, load, add, remove, toggle, isInWatchlist }
}
