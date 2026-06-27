import { usePlayer } from '../context/PlayerContext'
import { formatDuration } from '../lib/utils'
import {
  HiPlay, HiPause, HiVolumeUp, HiVolumeOff
} from 'react-icons/hi'
import {
  MdSkipNext, MdSkipPrevious, MdShuffle, MdRepeat, MdRepeatOne
} from 'react-icons/md'

export default function Player() {
  const {
    currentSong, isPlaying, progress, volume, isShuffle, repeatMode,
    togglePlay, handleNext, handlePrev, seek, setVolume,
    toggleShuffle, toggleRepeat, duration
  } = usePlayer()

  if (!currentSong) {
    return (
      <div className="h-20 bg-[#181818] border-t border-[#282828] flex items-center justify-center">
        <p className="text-[#B3B3B3] text-sm">No song playing</p>
      </div>
    )
  }

  const progressPct = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <div className="h-20 bg-[#181818] border-t border-[#282828] flex items-center px-4 gap-4">
      {/* Song Info */}
      <div className="flex items-center gap-3 w-72 min-w-0">
        <img
          src={currentSong.album?.image || 'https://picsum.photos/seed/default/56/56'}
          alt={currentSong.title}
          className="w-14 h-14 rounded object-cover flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-white text-sm font-medium truncate">{currentSong.title}</p>
          <p className="text-[#B3B3B3] text-xs truncate">{currentSong.artist?.name}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleShuffle}
            className={`transition-colors ${isShuffle ? 'text-[#1DB954]' : 'text-[#B3B3B3] hover:text-white'}`}
          >
            <MdShuffle className="text-xl" />
          </button>

          <button onClick={handlePrev} className="text-[#B3B3B3] hover:text-white transition-colors">
            <MdSkipPrevious className="text-2xl" />
          </button>

          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying
              ? <HiPause className="text-black text-base" />
              : <HiPlay className="text-black text-base ml-0.5" />
            }
          </button>

          <button onClick={handleNext} className="text-[#B3B3B3] hover:text-white transition-colors">
            <MdSkipNext className="text-2xl" />
          </button>

          <button
            onClick={toggleRepeat}
            className={`transition-colors ${repeatMode !== 'none' ? 'text-[#1DB954]' : 'text-[#B3B3B3] hover:text-white'}`}
          >
            {repeatMode === 'one' ? <MdRepeatOne className="text-xl" /> : <MdRepeat className="text-xl" />}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full max-w-lg">
          <span className="text-[#B3B3B3] text-xs w-10 text-right">{formatDuration(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={progress}
            onChange={e => seek(Number(e.target.value))}
            className="flex-1 h-1 accent-white"
          />
          <span className="text-[#B3B3B3] text-xs w-10">{formatDuration(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-40 justify-end">
        <button
          onClick={() => setVolume(v => v > 0 ? 0 : 0.7)}
          className="text-[#B3B3B3] hover:text-white transition-colors"
        >
          {volume === 0 ? <HiVolumeOff className="text-xl" /> : <HiVolumeUp className="text-xl" />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="w-24 h-1 accent-[#1DB954]"
        />
      </div>
    </div>
  )
}
