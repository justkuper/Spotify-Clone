import { NavLink } from 'react-router-dom'
import { HiHome, HiSearch, HiCollection, HiPlus, HiHeart } from 'react-icons/hi'
import { SiSpotify } from 'react-icons/si'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import api from '../lib/api'

export default function Sidebar() {
  const { user } = useAuth()
  const [playlists, setPlaylists] = useState([])
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')

  useEffect(() => {
    if (user) {
      api.get('/playlists').then(r => setPlaylists(r.data.filter(p => p.userId === user.id)))
    }
  }, [user])

  const createPlaylist = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    const res = await api.post('/playlists', { name: newName })
    setPlaylists(prev => [...prev, res.data])
    setNewName('')
    setCreating(false)
  }

  const navClass = ({ isActive }) =>
    `flex items-center gap-4 px-3 py-2 rounded text-sm font-semibold transition-colors ${
      isActive ? 'text-white' : 'text-[#B3B3B3] hover:text-white'
    }`

  return (
    <aside className="flex flex-col w-64 min-w-[240px] bg-black h-full">
      {/* Logo */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <SiSpotify className="text-white text-3xl" />
          <span className="text-white font-bold text-xl">Spotify</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="px-3 space-y-1">
        <NavLink to="/" end className={navClass}>
          <HiHome className="text-2xl" /> Home
        </NavLink>
        <NavLink to="/search" className={navClass}>
          <HiSearch className="text-2xl" /> Search
        </NavLink>
        <NavLink to="/library" className={navClass}>
          <HiCollection className="text-2xl" /> Your Library
        </NavLink>
      </nav>

      <div className="border-t border-[#282828] my-4 mx-3" />

      {/* User Playlists */}
      <div className="px-3 space-y-1 flex-1 overflow-hidden flex flex-col">
        {user && (
          <>
            <button
              onClick={() => setCreating(true)}
              className="flex items-center gap-3 px-3 py-2 text-[#B3B3B3] hover:text-white text-sm font-semibold transition-colors rounded"
            >
              <span className="bg-[#B3B3B3] text-black rounded-sm p-0.5">
                <HiPlus className="text-base" />
              </span>
              Create Playlist
            </button>

            <NavLink to="/liked" className={navClass}>
              <span className="bg-gradient-to-br from-indigo-400 to-indigo-900 p-0.5 rounded-sm">
                <HiHeart className="text-white text-base" />
              </span>
              Liked Songs
            </NavLink>
          </>
        )}

        {creating && (
          <form onSubmit={createPlaylist} className="px-2 mt-2">
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Playlist name"
              className="w-full bg-[#282828] text-white text-sm px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-white"
              onBlur={() => !newName && setCreating(false)}
            />
          </form>
        )}

        <div className="border-t border-[#282828] my-2" />

        <div className="overflow-y-auto flex-1 space-y-1">
          {playlists.map(p => (
            <NavLink
              key={p.id}
              to={`/playlist/${p.id}`}
              className="block px-3 py-1.5 text-sm text-[#B3B3B3] hover:text-white truncate transition-colors"
            >
              {p.name}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  )
}
