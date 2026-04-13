// ============================================================
// CUTAD API v1.0 — https://www.cutad.web.id/docs
// Base URL  : https://www.cutad.web.id
// Format    : {BASE}/public/api/v1/{provider}/{action}?{params}
// Auth      : X-API-Key header + ?api_key= query
// Rate Limit: 30 req/menit per key
// ============================================================

const CUTAD_BASE = 'https://www.cutad.web.id'

// ============================================================
// Config — baca dari .env via runtimeConfig
// ============================================================
const getConfig = () => {
  try {
    const config = useRuntimeConfig()
    return {
      apiKey: (config.public.apiKey as string) ?? '',
    }
  } catch {
    return { apiKey: '' }
  }
}

// ============================================================
// Core fetch helper
// Kirim API key via Header (X-API-Key) + Query (?api_key=)
// ============================================================
const apiFetch = async <T>(
  path: string,
  params: Record<string, string | number> = {}
): Promise<T | null> => {
  const { apiKey } = getConfig()

  const url = new URL(`${CUTAD_BASE}${path}`)
  if (apiKey) url.searchParams.set('api_key', apiKey)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v))
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'X-API-Key': apiKey } : {}),
      },
    })
    if (!res.ok) {
      console.error(`[CUTAD] ${res.status} ${res.statusText} — ${url}`)
      return null
    }
    return (await res.json()) as T
  } catch (e) {
    console.error('[CUTAD] Network error:', e)
    return null
  }
}

// ============================================================
// Types — normalized untuk semua provider
// ============================================================
export interface ContentItem {
  id: string | number          // provider ID (format beda tiap provider)
  title: string
  cover: string | null
  synopsis: string
  episodeCount: number
  genre?: string
  year?: string
  rating?: string
  actors?: string[]
  provider: Provider
  // raw: beda tiap provider, simpan aslinya
  _raw?: any
}

export interface Episode {
  id: string | number
  title: string
  sequence?: number
  season?: number
  episode?: number
}

export interface WatchResult {
  videoUrl?: string
  embedUrl?: string
  servers?: { name: string; url: string }[]
  subtitles?: { lang: string; url: string }[]
  streams?: { quality: string; url: string }[]
  type?: 'direct' | 'embed'
  platform?: string
  isM3u8?: boolean
}

export interface RankSection {
  name: string
  items: ContentItem[]
}

export type Provider =
  | 'anime'
  | 'donghua'
  | 'dramabox'
  | 'melolo'
  | 'film1'
  | 'sfilmindo'
  | 'moviebox'
  | 'freereels'
  | 'reelshort'
  | 'flickreels'

// ============================================================
// Normalizer — mapping response mentah ke ContentItem
// ============================================================
const normalizeItem = (raw: any, provider: Provider): ContentItem => {
  // DramaBox pakai field berbeda
  if (provider === 'dramabox') {
    return {
      id: raw.bookId ?? raw.id,
      title: raw.bookName ?? raw.title ?? '',
      cover: raw.cover ?? null,
      synopsis: raw.introduction ?? raw.introduce ?? '',
      episodeCount: raw.totalChapters ?? raw.chapters?.length ?? 0,
      provider,
      _raw: raw,
    }
  }
  // ReelShort
  if (provider === 'reelshort') {
    return {
      id: raw.filteredTitle ?? raw.bookId ?? raw.id,
      title: raw.bookName ?? raw.title ?? '',
      cover: raw.cover ?? raw.coverImgUrl ?? null,
      synopsis: raw.introduction ?? raw.introduce ?? '',
      episodeCount: raw.totalOfEpisodes ?? 0,
      provider,
      _raw: raw,
    }
  }
  // MovieBox — ada rating, genre, actors
  if (provider === 'moviebox') {
    return {
      id: raw.fakeId ?? raw.id,
      title: raw.title ?? '',
      cover: raw.coverImgUrl ?? raw.cover ?? null,
      synopsis: raw.introduce ?? '',
      episodeCount: raw.totalOfEpisodes ?? raw.episodes?.length ?? 0,
      genre: raw.genre ?? '',
      year: raw.year ?? '',
      rating: raw.rating ?? '',
      actors: raw.actors ?? [],
      provider,
      _raw: raw,
    }
  }
  // Default: anime, donghua, melolo, film1, sfilmindo, freereels, flickreels
  return {
    id: raw.fakeId ?? raw.id ?? raw.bookId ?? raw.seriesKey ?? raw.playletId ?? raw.drId,
    title: raw.title ?? raw.bookName ?? raw.name ?? '',
    cover: raw.coverImgUrl ?? raw.cover ?? raw.thumbnail ?? null,
    synopsis: raw.introduce ?? raw.introduction ?? raw.synopsis ?? '',
    episodeCount: raw.totalOfEpisodes ?? raw.episodes?.length ?? raw.chapters?.length ?? 0,
    provider,
    _raw: raw,
  }
}

const normalizeEpisode = (raw: any, provider: Provider): Episode => {
  if (provider === 'dramabox') {
    return {
      id: raw.id,
      title: raw.chapterName ?? `Episode ${raw.index}`,
      sequence: raw.index,
    }
  }
  if (provider === 'moviebox') {
    return {
      id: raw.id,
      title: raw.title ?? `S${raw.season}E${raw.episode}`,
      season: raw.season,
      episode: raw.episode,
    }
  }
  if (provider === 'flickreels') {
    // watch ID = playletId::chapterId
    return {
      id: `${raw.playletId ?? ''}::${raw.id ?? raw.chapterId}`,
      title: raw.title ?? raw.chapterName ?? `Episode ${raw.sequence ?? ''}`,
      sequence: raw.sequence,
    }
  }
  return {
    id: raw.id ?? raw.videoFakeId,
    title: raw.title ?? raw.chapterName ?? `Episode ${raw.sequence ?? ''}`,
    sequence: raw.sequence,
  }
}

// ============================================================
// Parse sections dari response rank (konsisten lintas provider)
// ============================================================
const parseSections = (json: any, provider: Provider): RankSection[] => {
  const sections: any[] = json?.data?.sections ?? []
  return sections.map((sec: any) => ({
    name: sec.name ?? '',
    items: (sec.items ?? []).map((item: any) => normalizeItem(item, provider)),
  }))
}

// ============================================================
// RANK — daftar konten per provider
// ============================================================
export const useRank = async (
  provider: Provider,
  page = 1,
  size = 20
): Promise<RankSection[]> => {
  const json = await apiFetch(`/public/api/v1/${provider}/rank`, { page, size })
  if (!json) return []
  return parseSections(json, provider)
}

// Shortcut: ambil semua item flat dari semua section
export const useRankFlat = async (
  provider: Provider,
  page = 1,
  size = 20
): Promise<ContentItem[]> => {
  const sections = await useRank(provider, page, size)
  return sections.flatMap(s => s.items)
}

// ============================================================
// DETAIL — info lengkap + daftar episode
// ============================================================
export interface DetailResult {
  item: ContentItem
  episodes: Episode[]
}

export const useDetail = async (
  provider: Provider,
  id: string | number
): Promise<DetailResult | null> => {
  const json = await apiFetch(`/public/api/v1/${provider}/detail`, { id: String(id) })
  if (!json) return null

  const raw = json.data ?? {}
  const item = normalizeItem(raw, provider)

  // Episodes: dramabox → chapters, moviebox → episodes, lainnya → episodes
  const rawEps: any[] =
    raw.chapters ?? raw.episodes ?? raw.episodeList ?? []
  const episodes = rawEps.map((ep: any) => normalizeEpisode(ep, provider))

  return { item, episodes }
}

// ============================================================
// WATCH — URL video / embed
// ============================================================
export const useWatch = async (
  provider: Provider,
  id: string | number,
  extra?: Record<string, string>
): Promise<WatchResult | null> => {
  const params: Record<string, string | number> = { id: String(id), ...extra }
  const json = await apiFetch(`/public/api/v1/${provider}/watch`, params)
  if (!json) return null

  const d = json.data ?? {}

  // FlickReels → raw m3u8 (bukan JSON biasa)
  if (provider === 'flickreels') {
    return { videoUrl: d.videoUrl ?? d.url, isM3u8: true, type: 'direct' }
  }

  // Donghua → embed + servers
  if (provider === 'donghua') {
    return {
      videoUrl: d.videoUrl ?? null,
      embedUrl: d.embedUrl ?? null,
      servers: d.servers ?? [],
      type: d.type ?? 'embed',
      platform: d.platform ?? null,
    }
  }

  // MovieBox → multi-quality + subtitles
  if (provider === 'moviebox') {
    return {
      videoUrl: d.videoUrl ?? null,
      subtitles: d.subtitles ?? [],
      streams: d.streams ?? [],
      type: 'direct',
    }
  }

  // FreeReels → subtitles
  if (provider === 'freereels') {
    return {
      videoUrl: d.videoUrl ?? null,
      subtitles: d.subtitles ?? [],
      type: 'direct',
    }
  }

  // Default: anime, melolo, dramabox, film1, sfilmindo, reelshort
  return {
    videoUrl: d.videoUrl ?? null,
    type: 'direct',
  }
}

// ============================================================
// SEARCH — cari konten berdasarkan judul
// (Hanya: anime, moviebox, freereels, reelshort, flickreels)
// Melolo = filter lokal dari cache, hasil terbatas
// ============================================================
export const useSearch = async (
  provider: Provider,
  query: string,
  page = 1,
  size = 20
): Promise<ContentItem[]> => {
  if (!query.trim()) return []
  const json = await apiFetch(`/public/api/v1/${provider}/search`, {
    q: query,
    page,
    size,
  })
  if (!json) return []
  const items: any[] = json.data?.items ?? json.data ?? []
  return items.map((item: any) => normalizeItem(item, provider))
}

// ============================================================
// EPISODES — daftar episode ringkas (anime)
// ============================================================
export const useEpisodes = async (
  provider: Provider,
  id: string | number
): Promise<Episode[]> => {
  const json = await apiFetch(`/public/api/v1/${provider}/episodes`, {
    id: String(id),
  })
  if (!json) return []
  const rawEps: any[] = json.data?.episodes ?? json.data ?? []
  return rawEps.map((ep: any) => normalizeEpisode(ep, provider))
}

// ============================================================
// Daftar semua provider yang tersedia
// ============================================================
export const PROVIDERS: { id: Provider; label: string; emoji: string }[] = [
  { id: 'anime',      label: 'Anime',           emoji: '🎮' },
  { id: 'donghua',    label: 'Donghua',          emoji: '🐉' },
  { id: 'dramabox',   label: 'DramaBox',         emoji: '📱' },
  { id: 'melolo',     label: 'Melolo',           emoji: '🎞️' },
  { id: 'film1',      label: 'Film',             emoji: '🎥' },
  { id: 'sfilmindo',  label: 'Film Indonesia',   emoji: '🇮🇩' },
  { id: 'moviebox',   label: 'MovieBox',         emoji: '🎬' },
  { id: 'freereels',  label: 'FreeReels',        emoji: '😊' },
  { id: 'reelshort',  label: 'ReelShort',        emoji: '📺' },
  { id: 'flickreels', label: 'FlickReels',       emoji: '🎞️' },
]
