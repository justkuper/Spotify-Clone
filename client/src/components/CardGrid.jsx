import { usePlayer } from '../context/PlayerContext'
import { HiPlay } from 'react-icons/hi'

export default function CardGrid({ title, items, type = 'album' }) {
  const { playSong } = usePlayer()

  const handlePlay = (item) => {
    if (type === 'song') {
      playSong(item, [item])
    } else if (item.songs?.length > 0) {
      playSong(item.songs[0], item.songs)
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-[#181818] hover:bg-[#282828] rounded-lg p-3 cursor-pointer transition-colors group relative"
          >
            <div className="relative mb-3">
              <img
                src={item.image || item.album?.image || 'https://picsum.photos/seed/default/200/200'}
                alt={item.title || item.name}
                className={`w-full aspect-square object-cover ${type === 'artist' ? 'rounded-full' : 'rounded'}`}
              />
              <button
                onClick={() => handlePlay(item)}
                className="absolute bottom-2 right-2 w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-lg"
              >
                <HiPlay className="text-black text-lg ml-0.5" />
              </button>
            </div>
            <p className="text-white text-sm font-semibold truncate">{item.title || item.name}</p>
            <p className="text-[#B3B3B3] text-xs mt-1 truncate">
              {item.artist?.name || item.genre || item.description || ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
