import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import SongRow from '../components/SongRow'
import { HiSearch } from 'react-icons/hi'

const GENRES = [
  { label: 'Pop', color: '#E8115B', seed: 'pop' },
  { label: 'Hip-Hop', color: '#BA5D07', seed: 'hiphop' },
  { label: 'R&B', color: '#1E3264', seed: 'rnb' },
  { label: 'Electronic', color: '#0D73EC', seed: 'electronic' },
  { label: 'Rock', color: '#E91429', seed: 'rock' },
  { label: 'Latin', color: '#8D67AB', seed: 'latin' },
  { label: 'Jazz', color: '#537AA1', seed: 'jazz' },
  { label: 'Classical', color: '#27856A', seed: 'classical' },
]

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const debounce = useRef(null)

  useEffect(() => {
    if (!query.trim()) { setResults(null); return }
    clearTimeout(debounce.current)
    setLoading(true)
    debounce.current = setTimeout(async () => {
      const res = await api.get(`/search?q=${encodeURIComponent(query)}`)
      setResults(res.data)
      setLoading(false)
    }, 300)
    return () => clearTimeout(debounce.current)
  }, [query])

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="relative mb-8 max-w-md">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B3B3B3] text-xl" />
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="w-full bg-white text-black pl-10 pr-4 py-3 rounded-full focus:outline-none text-sm"
        />
      </div>

      {/* No query: show genre cards */}
      {!query && (
        <>
          <h2 className="text-white text-xl font-bold mb-4">Browse all</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {GENRES.map(g => (
              <div
                key={g.label}
                className="relative rounded-lg overflow-hidden h-28 cursor-pointer"
                style={{ backgroundColor: g.color }}
              >
                <span className="absolute top-4 left-4 text-white font-bold text-lg">{g.label}</span>
                <img
                  src={`https://picsum.photos/seed/${g.seed}/120/120`}
                  alt=""
                  className="absolute bottom-0 right-0 w-20 h-20 object-cover rounded transform rotate-12 translate-x-4 translate-y-2"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="w-8 h-8 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div>
          {/* Songs */}
          {results.songs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-white text-xl font-bold mb-4">Songs</h2>
              <div className="space-y-1">
                {results.songs.map((song, i) => (
                  <SongRow key={song.id} song={song} index={i} songs={results.songs} />
                ))}
              </div>
            </div>
          )}

          {/* Artists */}
          {results.artists.length > 0 && (
            <div className="mb-8">
              <h2 className="text-white text-xl font-bold mb-4">Artists</h2>
              <div className="flex flex-wrap gap-4">
                {results.artists.map(a => (
                  <Link key={a.id} to={`/artist/${a.id}`} className="flex flex-col items-center gap-2 w-36 hover:bg-[#282828] p-3 rounded-lg transition-colors">
                    <img src={a.image} alt={a.name} className="w-24 h-24 rounded-full object-cover" />
                    <span className="text-white text-sm font-semibold text-center">{a.name}</span>
                    <span className="text-[#B3B3B3] text-xs">Artist</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Albums */}
          {results.albums.length > 0 && (
            <div className="mb-8">
              <h2 className="text-white text-xl font-bold mb-4">Albums</h2>
              <div className="flex flex-wrap gap-4">
                {results.albums.map(al => (
                  <Link key={al.id} to={`/album/${al.id}`} className="flex flex-col gap-2 w-36 hover:bg-[#282828] p-3 rounded-lg transition-colors">
                    <img src={al.image} alt={al.title} className="w-full aspect-square rounded object-cover" />
                    <span className="text-white text-sm font-semibold truncate">{al.title}</span>
                    <span className="text-[#B3B3B3] text-xs">{al.artist?.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.songs.length === 0 && results.artists.length === 0 && results.albums.length === 0 && (
            <p className="text-[#B3B3B3] text-center mt-8">No results for "{query}"</p>
          )}
        </div>
      )}
    </div>
  )
}
