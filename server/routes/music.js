import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { songs, albums, artists, playlists } from '../data/mockData.js'
import { authMiddleware, JWT_SECRET } from '../middleware/auth.js'

const router = Router()

const enrichSong = (song) => {
  const artist = artists.find(a => a.id === song.artistId)
  const album = albums.find(al => al.id === song.albumId)
  return { ...song, artist, album }
}

const getUserFromReq = (req) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return null
  try {
    return jwt.verify(authHeader.split(' ')[1], JWT_SECRET)
  } catch {
    return null
  }
}

// Artists
router.get('/artists', (req, res) => res.json(artists))
router.get('/artists/:id', (req, res) => {
  const artist = artists.find(a => a.id === req.params.id)
  if (!artist) return res.status(404).json({ error: 'Not found' })
  const artistAlbums = albums.filter(al => al.artistId === artist.id)
  const artistSongs = songs.filter(s => s.artistId === artist.id).map(enrichSong)
  res.json({ ...artist, albums: artistAlbums, songs: artistSongs })
})

// Albums
router.get('/albums', (req, res) => {
  const enriched = albums.map(al => ({
    ...al,
    artist: artists.find(a => a.id === al.artistId)
  }))
  res.json(enriched)
})
router.get('/albums/:id', (req, res) => {
  const album = albums.find(al => al.id === req.params.id)
  if (!album) return res.status(404).json({ error: 'Not found' })
  const artist = artists.find(a => a.id === album.artistId)
  const albumSongs = songs.filter(s => s.albumId === album.id).map(enrichSong)
  res.json({ ...album, artist, songs: albumSongs })
})

// Songs
router.get('/songs', (req, res) => res.json(songs.map(enrichSong)))
router.get('/songs/:id', (req, res) => {
  const song = songs.find(s => s.id === req.params.id)
  if (!song) return res.status(404).json({ error: 'Not found' })
  res.json(enrichSong(song))
})

// Playlists
router.get('/playlists', (req, res) => {
  const user = getUserFromReq(req)
  const visible = playlists.filter(p => p.public || (user && p.userId === user.id))
  res.json(visible.map(p => ({
    ...p,
    songs: p.songIds.map(id => {
      const s = songs.find(s => s.id === id)
      return s ? enrichSong(s) : null
    }).filter(Boolean)
  })))
})

router.get('/playlists/:id', (req, res) => {
  const playlist = playlists.find(p => p.id === req.params.id)
  if (!playlist) return res.status(404).json({ error: 'Not found' })
  res.json({
    ...playlist,
    songs: playlist.songIds.map(id => {
      const s = songs.find(s => s.id === id)
      return s ? enrichSong(s) : null
    }).filter(Boolean)
  })
})

router.post('/playlists', authMiddleware, (req, res) => {
  const { name, description } = req.body
  if (!name) return res.status(400).json({ error: 'Name required' })
  const playlist = {
    id: `p${Date.now()}`,
    name,
    description: description || '',
    image: `https://picsum.photos/seed/${Date.now()}/300/300`,
    songIds: [],
    userId: req.user.id,
    public: false,
  }
  playlists.push(playlist)
  res.json({ ...playlist, songs: [] })
})

router.post('/playlists/:id/songs', authMiddleware, (req, res) => {
  const playlist = playlists.find(p => p.id === req.params.id)
  if (!playlist) return res.status(404).json({ error: 'Not found' })
  if (playlist.userId !== req.user.id) return res.status(403).json({ error: 'Forbidden' })
  const { songId } = req.body
  if (!playlist.songIds.includes(songId)) playlist.songIds.push(songId)
  res.json({
    ...playlist,
    songs: playlist.songIds.map(id => {
      const s = songs.find(s => s.id === id)
      return s ? enrichSong(s) : null
    }).filter(Boolean)
  })
})

router.delete('/playlists/:id/songs/:songId', authMiddleware, (req, res) => {
  const playlist = playlists.find(p => p.id === req.params.id)
  if (!playlist) return res.status(404).json({ error: 'Not found' })
  if (playlist.userId !== req.user.id) return res.status(403).json({ error: 'Forbidden' })
  playlist.songIds = playlist.songIds.filter(id => id !== req.params.songId)
  res.json({
    ...playlist,
    songs: playlist.songIds.map(id => {
      const s = songs.find(s => s.id === id)
      return s ? enrichSong(s) : null
    }).filter(Boolean)
  })
})

// Search
router.get('/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase()
  if (!q) return res.json({ songs: [], albums: [], artists: [], playlists: [] })
  res.json({
    songs: songs.filter(s => s.title.toLowerCase().includes(q)).map(enrichSong),
    albums: albums
      .filter(al => al.title.toLowerCase().includes(q))
      .map(al => ({ ...al, artist: artists.find(a => a.id === al.artistId) })),
    artists: artists.filter(a => a.name.toLowerCase().includes(q)),
    playlists: playlists.filter(p => p.public && p.name.toLowerCase().includes(q)),
  })
})

export default router
