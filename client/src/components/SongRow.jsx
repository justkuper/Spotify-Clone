import { usePlayer } from '../context/PlayerContext'
import { formatDuration } from '../lib/utils'
import { HiPlay, HiPause } from 'react-icons/hi'

export default function SongRow({ song, index, songs }) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer()
  const isActive = currentSong?.id === song.id

  const handleClick = () => {
    if (isActive) {
      togglePlay()
    } else {
      playSong(song, songs || [song])
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`group flex items-center gap-4 px-4 py-2 rounded cursor-pointer hover:bg-[#282828] transition-colors ${
        isActive ? 'text-[#1DB954]' : 'text-white'
      }`}
    >
      {/* Index / Play */}
      <div className="w-6 flex items-center justify-center flex-shrink-0">
        <span className={`text-sm group-hover:hidden ${isActive ? 'hidden' : 'text-[#B3B3B3]'}`}>
          {index + 1}
        </span>
        <span className={`hidden group-hover:flex items-center ${isActive && isPlaying ? '!flex' : ''}`}>
          {isActive && isPlaying
            ? <HiPause className="text-[#1DB954]" />
            : <HiPlay className="text-white" />
          }
        </span>
      </div>

      {/* Thumbnail + title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {song.album?.image && (
          <img src={song.album.image} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
        )}
        <div className="min-w-0">
          <p className={`text-sm font-medium truncate ${isActive ? 'text-[#1DB954]' : 'text-white'}`}>
            {song.title}
          </p>
          <p className="text-xs text-[#B3B3B3] truncate">{song.artist?.name}</p>
        </div>
      </div>

      {/* Album */}
      <p className="text-sm text-[#B3B3B3] truncate flex-1 hidden md:block">
        {song.album?.title}
      </p>

      {/* Duration */}
      <p className="text-sm text-[#B3B3B3] w-12 text-right flex-shrink-0">
        {formatDuration(song.duration)}
      </p>
    </div>
  )
}
