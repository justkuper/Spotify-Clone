import { useNavigate } from 'react-router-dom'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'

export default function TopBar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#121212] sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#282828] transition-colors"
        >
          <HiChevronLeft className="text-xl" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#282828] transition-colors"
        >
          <HiChevronRight className="text-xl" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-semibold">{user.name}</span>
            <button
              onClick={logout}
              className="px-4 py-1.5 bg-[#282828] text-white text-sm rounded-full hover:bg-[#3e3e3e] transition-colors"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-1.5 text-[#B3B3B3] text-sm hover:text-white transition-colors"
            >
              Sign up
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-1.5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-transform"
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
