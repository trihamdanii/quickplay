# QuickPlay — Nuxt.js

Aplikasi streaming drama mobile-first, dibangun dengan Nuxt 3 + Tailwind CSS.

## Struktur Project

```
quickplay/
├── app.vue                    # Root app
├── nuxt.config.ts             # Konfigurasi Nuxt
├── tailwind.config.js         # Tailwind CSS
├── vercel.json                # Deploy config Vercel
├── error.vue                  # Halaman 404
├── assets/css/main.css        # Global styles
├── public/
│   ├── icon.png               # App icon
│   └── favicon.ico            # Favicon
├── composables/
│   ├── useApi.ts              # API fetching (ganti BASE_URL!)
│   └── useWatchlist.ts        # Watchlist localStorage
├── layouts/
│   └── default.vue            # Layout + Header + Navbar
├── components/
│   ├── AppHeader.vue          # Top header
│   ├── AppNavbar.vue          # Bottom navigation
│   ├── HeroBanner.vue         # Hero slider
│   ├── ContentSection.vue     # Row konten horizontal
│   └── icons/                 # SVG icon components
└── pages/
    ├── index.vue              # Beranda
    ├── discover.vue           # Jelajahi + filter genre
    ├── search.vue             # Pencarian dengan debounce
    ├── community.vue          # Komunitas / forum
    ├── profile.vue            # Profil user
    └── watch/[id].vue         # Halaman nonton detail
```

## Setup & Jalankan

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build untuk production
npm run build

# Preview build
npm run preview
```

## Hubungkan ke API

### 1. Buat file `.env`

```bash
cp .env.example .env
```

Isi nilainya:

```env
NUXT_PUBLIC_API_BASE_URL=https://api.quickplay.my.id
NUXT_PUBLIC_API_KEY=your_secret_key_here
```

### 2. Cara kerja autentikasi

Setiap request otomatis dikirim dengan **dua metode sekaligus**:

```
# Header
X-API-Key: your_secret_key_here

# Query string
GET /api/dramas?category=trending&api_key=your_secret_key_here
```

### 3. Deploy ke Vercel — set env vars

Di dashboard Vercel → **Settings → Environment Variables**, tambahkan:

| Key | Value |
|-----|-------|
| `NUXT_PUBLIC_API_BASE_URL` | `https://api.quickplay.my.id` |
| `NUXT_PUBLIC_API_KEY` | `your_secret_key_here` |

> **Jangan** commit file `.env` ke Git. Sudah di-ignore di `.gitignore`.


## Teknologi

- **Nuxt 3** — framework Vue SSR
- **Tailwind CSS** — styling utility-first
- **Poppins** — font dari Google Fonts
- **Vercel** — hosting & deployment
