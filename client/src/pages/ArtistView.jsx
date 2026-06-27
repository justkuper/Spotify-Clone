import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../lib/api'
import SongRow from '../components/SongRow'
import { usePlayer } from '../context/PlayerContext'
import { HiPlay } from 'react-icons/hi'
import { formatFollowers } from '../lib/utils'

export default function ArtistView() {
  const { id } = useParams()
  const [artist, setArtist] = useState(null)
  const { playSong } = usePlayer()

  useEffect(() => {
    api.get(`/artists/${id}`).then(r => setArtist(r.data))
  }, [id])

  if (!artist) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      {/* Hero */}
      <div
        className="relative h-64 flex items-end p-6"
        style={{ background: `linear-gradient(to bottom, #3a3a3a, #121212)` }}
      >
        <img src={artist.image} alt={artist.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative z-10">
          <p className="text-white text-xs font-bold uppercase mb-2">Verified Artist</p>
          <h1 className="text-white text-5xl font-bold mb-2">{artist.name}</h1>
          <p className="text-white text-sm">{formatFollowers(artist.followers)}</p>
        </div>
      </div>

      <div className="px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => artist.songs.length && playSong(artist.songs[0], artist.songs)}
          className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          <HiPlay className="text-black text-2xl ml-1" />
        </button>
      </div>

      {/* Popular Songs */}
      <div className="px-4 mb-8">
        <h2 className="text-white text-xl font-bold mb-4 px-2">Popular</h2>
        {artist.songs.map((song, i) => (
          <SongRow key={song.id} song={song} index={i} songs={artist.songs} />
        ))}
      </div>

      {/* Albums */}
      <div className="px-6 mb-8">
        <h2 className="text-white text-xl font-bold mb-4">Albums</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {artist.albums.map(al => (
            <Link key={al.id} to={`/album/${al.id}`} className="bg-[#181818] hover:bg-[#282828] rounded-lg p-3 transition-colors">
              <img src={al.image} alt={al.title} className="w-full aspect-square rounded object-cover mb-3" />
              <p className="text-white text-sm font-semibold truncate">{al.title}</p>
              <p className="text-[#B3B3B3] text-xs mt-1">{al.year}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
