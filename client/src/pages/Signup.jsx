import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { SiSpotify } from 'react-icons/si'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <SiSpotify className="text-[#1DB954] text-5xl mb-8" />
      <h1 className="text-white text-3xl font-bold mb-8">Sign up for free</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="text-white text-sm font-semibold block mb-2">What's your name?</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full bg-[#121212] border border-[#535353] text-white px-4 py-3 rounded focus:outline-none focus:border-white transition-colors"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="text-white text-sm font-semibold block mb-2">What's your email?</label>
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
          <label className="text-white text-sm font-semibold block mb-2">Create a password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full bg-[#121212] border border-[#535353] text-white px-4 py-3 rounded focus:outline-none focus:border-white transition-colors"
            placeholder="Create a password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1DB954] text-black font-bold py-3 rounded-full hover:bg-[#1ed760] transition-colors disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-[#282828] pt-8 w-full max-w-sm">
        <p className="text-[#B3B3B3] text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:underline font-semibold">Log in here</Link>
        </p>
      </div>
    </div>
  )
}
