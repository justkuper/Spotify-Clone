import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../lib/api'
import SongRow from '../components/SongRow'
import { usePlayer } from '../context/PlayerContext'
import { HiPlay } from 'react-icons/hi'
import { formatDuration } from '../lib/utils'

export default function AlbumView() {
  const { id } = useParams()
  const [album, setAlbum] = useState(null)
  const { playSong } = usePlayer()

  useEffect(() => {
    api.get(`/albums/${id}`).then(r => setAlbum(r.data))
  }, [id])

  if (!album) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const totalDuration = album.songs.reduce((sum, s) => sum + s.duration, 0)

  return (
    <div>
      <div className="flex items-end gap-6 p-6 bg-gradient-to-b from-[#4a4a4a] to-[#121212]">
        <img src={album.image} alt={album.title} className="w-52 h-52 rounded shadow-2xl object-cover flex-shrink-0" />
        <div>
          <p className="text-white text-xs font-semibold uppercase mb-2">Album</p>
          <h1 className="text-white text-4xl font-bold mb-2">{album.title}</h1>
          <div className="flex items-center gap-2 text-sm text-[#B3B3B3]">
            <Link to={`/artist/${album.artist?.id}`} className="text-white font-semibold hover:underline">
              {album.artist?.name}
            </Link>
            <span>·</span>
            <span>{album.year}</span>
            <span>·</span>
            <span>{album.songs.length} songs, {formatDuration(totalDuration)}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => album.songs.length && playSong(album.songs[0], album.songs)}
          className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          <HiPlay className="text-black text-2xl ml-1" />
        </button>
      </div>

      <div className="px-2 pb-24">
        {album.songs.map((song, i) => (
          <SongRow key={song.id} song={song} index={i} songs={album.songs} />
        ))}
      </div>
    </div>
  )
}
