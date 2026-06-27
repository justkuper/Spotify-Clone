import { useEffect, useState } from 'react'
import api from '../lib/api'
import CardGrid from '../components/CardGrid'
import SongRow from '../components/SongRow'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const [data, setData] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    api.get('/home').then(r => setData(r.data))
  }, [])

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
  }

  if (!data) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="p-6">
      <h1 className="text-white text-3xl font-bold mb-6">
        {user ? `${greeting()}, ${user.name.split(' ')[0]}!` : greeting()}
      </h1>

      {/* Featured playlists grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {data.featured.map(p => (
          <div key={p.id} className="flex items-center gap-4 bg-[#ffffff26] hover:bg-[#ffffff40] rounded overflow-hidden cursor-pointer transition-colors group">
            <img src={p.image} alt={p.name} className="w-16 h-16 object-cover flex-shrink-0" />
            <span className="text-white font-bold text-sm pr-4">{p.name}</span>
          </div>
        ))}
      </div>

      {/* Trending */}
      <div className="mb-8">
        <h2 className="text-white text-xl font-bold mb-4">Trending</h2>
        <div className="space-y-1">
          {data.trending.map((song, i) => (
            <SongRow key={song.id} song={song} index={i} songs={data.trending} />
          ))}
        </div>
      </div>

      {/* New Releases */}
      <CardGrid title="New Releases" items={data.newReleases} type="album" />
    </div>
  )
}
