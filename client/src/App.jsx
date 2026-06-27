import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PlayerProvider } from './context/PlayerContext'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import TopBar from './components/TopBar'
import Home from './pages/Home'
import Search from './pages/Search'
import Library from './pages/Library'
import PlaylistView from './pages/PlaylistView'
import AlbumView from './pages/AlbumView'
import ArtistView from './pages/ArtistView'
import Login from './pages/Login'
import Signup from './pages/Signup'

function AppLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#1a1a1a] to-[#121212]">
          <TopBar />
          {children}
        </main>
      </div>
      <Player />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<AppLayout><Home /></AppLayout>} />
            <Route path="/search" element={<AppLayout><Search /></AppLayout>} />
            <Route path="/library" element={<AppLayout><Library /></AppLayout>} />
            <Route path="/playlist/:id" element={<AppLayout><PlaylistView /></AppLayout>} />
            <Route path="/album/:id" element={<AppLayout><AlbumView /></AppLayout>} />
            <Route path="/artist/:id" element={<AppLayout><ArtistView /></AppLayout>} />
          </Routes>
        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
