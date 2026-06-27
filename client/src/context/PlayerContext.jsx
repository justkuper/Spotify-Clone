import { createContext, useContext, useState, useRef, useEffect } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState('none') // none | all | one
  const intervalRef = useRef(null)
  const durationRef = useRef(0)

  const currentSong = queue[currentIndex] || null

  useEffect(() => {
    if (currentSong) {
      durationRef.current = currentSong.duration
      setProgress(0)
    }
  }, [currentIndex, currentSong])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          const next = prev + 1
          if (next >= durationRef.current) {
            handleNext()
            return 0
          }
          return next
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying, currentIndex])

  const playSong = (song, songList = []) => {
    if (songList.length > 0) {
      const idx = songList.findIndex(s => s.id === song.id)
      setQueue(songList)
      setCurrentIndex(idx >= 0 ? idx : 0)
    } else {
      if (!queue.find(s => s.id === song.id)) {
        setQueue(prev => [...prev, song])
        setCurrentIndex(queue.length)
      } else {
        setCurrentIndex(queue.findIndex(s => s.id === song.id))
      }
    }
    setIsPlaying(true)
    setProgress(0)
  }

  const togglePlay = () => setIsPlaying(p => !p)

  const handleNext = () => {
    if (repeatMode === 'one') {
      setProgress(0)
      return
    }
    if (isShuffle) {
      const next = Math.floor(Math.random() * queue.length)
      setCurrentIndex(next)
    } else if (currentIndex < queue.length - 1) {
      setCurrentIndex(i => i + 1)
    } else if (repeatMode === 'all') {
      setCurrentIndex(0)
    } else {
      setIsPlaying(false)
    }
    setProgress(0)
  }

  const handlePrev = () => {
    if (progress > 3) {
      setProgress(0)
      return
    }
    setCurrentIndex(i => (i > 0 ? i - 1 : i))
    setProgress(0)
  }

  const seek = (val) => setProgress(val)

  const toggleShuffle = () => setIsShuffle(s => !s)
  const toggleRepeat = () => setRepeatMode(m => m === 'none' ? 'all' : m === 'all' ? 'one' : 'none')

  return (
    <PlayerContext.Provider value={{
      currentSong, queue, isPlaying, progress, volume,
      isShuffle, repeatMode,
      playSong, togglePlay, handleNext, handlePrev,
      seek, setVolume, toggleShuffle, toggleRepeat,
      duration: currentSong?.duration || 0,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
