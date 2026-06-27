import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import musicRoutes from './routes/music.js'
import { songs, albums, artists, playlists } from './data/mockData.js'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api', musicRoutes)

// Featured / home endpoint
app.get('/api/home', (req, res) => {
  const enrichSong = (song) => {
    const artist = artists.find(a => a.id === song.artistId)
    const album = albums.find(al => al.id === song.albumId)
    return { ...song, artist, album }
  }

  res.json({
    featured: playlists.filter(p => p.public).slice(0, 3),
    recentlyPlayed: songs.slice(0, 6).map(enrichSong),
    trending: songs.sort((a, b) => b.plays - a.plays).slice(0, 8).map(enrichSong),
    newReleases: albums.map(al => ({ ...al, artist: artists.find(a => a.id === al.artistId) })).slice(0, 6),
  })
})

app.listen(PORT, () => {
  console.log(`🎵 Spotify Clone server running on http://localhost:${PORT}`)
})
