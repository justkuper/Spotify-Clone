import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api'
import SongRow from '../components/SongRow'
import { usePlayer } from '../context/PlayerContext'
import { HiPlay } from 'react-icons/hi'

export default function PlaylistView() {
  const { id } = useParams()
  const [playlist, setPlaylist] = useState(null)
  const { playSong } = usePlayer()

  useEffect(() => {
    api.get(`/playlists/${id}`).then(r => setPlaylist(r.data))
  }, [id])

  if (!playlist) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const handlePlay = () => {
    if (playlist.songs.length > 0) playSong(playlist.songs[0], playlist.songs)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-end gap-6 p-6 bg-gradient-to-b from-[#535353] to-[#121212]">
        <img
          src={playlist.image}
          alt={playlist.name}
          className="w-52 h-52 rounded shadow-2xl object-cover flex-shrink-0"
        />
        <div>
          <p className="text-white text-xs font-semibold uppercase mb-2">Playlist</p>
          <h1 className="text-white text-4xl font-bold mb-2">{playlist.name}</h1>
          {playlist.description && (
            <p className="text-[#B3B3B3] text-sm mb-3">{playlist.description}</p>
          )}
          <p className="text-[#B3B3B3] text-sm">{playlist.songs.length} songs</p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 flex items-center gap-4">
        <button
          onClick={handlePlay}
          className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          <HiPlay className="text-black text-2xl ml-1" />
        </button>
      </div>

      {/* Songs */}
      <div className="px-2 pb-24">
        {playlist.songs.length === 0 ? (
          <p className="text-[#B3B3B3] text-center py-8">No songs yet</p>
        ) : (
          playlist.songs.map((song, i) => (
            <SongRow key={song.id} song={song} index={i} songs={playlist.songs} />
          ))
        )}
      </div>
    </div>
  )
}
