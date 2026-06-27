import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { SiSpotify } from 'react-icons/si'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <SiSpotify className="text-[#1DB954] text-5xl mb-8" />
      <h1 className="text-white text-3xl font-bold mb-8">Log in to Spotify</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="text-white text-sm font-semibold block mb-2">Email address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full bg-[#121212] border border-[#535353] text-white px-4 py-3 rounded focus:outline-none focus:border-white transition-colors"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label className="text-white text-sm font-semibold block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full bg-[#121212] border border-[#535353] text-white px-4 py-3 rounded focus:outline-none focus:border-white transition-colors"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1DB954] text-black font-bold py-3 rounded-full hover:bg-[#1ed760] transition-colors disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-[#B3B3B3] text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-white hover:underline font-semibold">Sign up for Spotify</Link>
        </p>
      </div>
    </div>
  )
}
