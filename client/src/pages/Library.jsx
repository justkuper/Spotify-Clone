import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function Library() {
  const [playlists, setPlaylists] = useState([])
  const [albums, setAlbums] = useState([])
  const [tab, setTab] = useState('playlists')
  const { user } = useAuth()

  useEffect(() => {
    api.get('/playlists').then(r => setPlaylists(r.data))
    api.get('/albums').then(r => setAlbums(r.data))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-white text-2xl font-bold mb-4">Your Library</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['playlists', 'albums'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors ${
              tab === t ? 'bg-white text-black' : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'playlists' && (
        <div className="space-y-2">
          {playlists.map(p => (
            <Link
              key={p.id}
              to={`/playlist/${p.id}`}
              className="flex items-center gap-4 p-2 rounded hover:bg-[#282828] transition-colors"
            >
              <img src={p.image} alt={p.name} className="w-12 h-12 rounded object-cover flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">{p.name}</p>
                <p className="text-[#B3B3B3] text-xs">
                  {p.public ? 'Public' : 'Private'} · {p.songs?.length || 0} songs
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {tab === 'albums' && (
        <div className="space-y-2">
          {albums.map(al => (
            <Link
              key={al.id}
              to={`/album/${al.id}`}
              className="flex items-center gap-4 p-2 rounded hover:bg-[#282828] transition-colors"
            >
              <img src={al.image} alt={al.title} className="w-12 h-12 rounded object-cover flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">{al.title}</p>
                <p className="text-[#B3B3B3] text-xs">Album · {al.artist?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
