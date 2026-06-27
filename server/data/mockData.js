export const artists = [
  { id: 'a1', name: 'The Weeknd', image: 'https://picsum.photos/seed/weeknd/300/300', genre: 'R&B', followers: 52000000 },
  { id: 'a2', name: 'Taylor Swift', image: 'https://picsum.photos/seed/taylor/300/300', genre: 'Pop', followers: 91000000 },
  { id: 'a3', name: 'Drake', image: 'https://picsum.photos/seed/drake/300/300', genre: 'Hip-Hop', followers: 68000000 },
  { id: 'a4', name: 'Billie Eilish', image: 'https://picsum.photos/seed/billie/300/300', genre: 'Pop', followers: 74000000 },
  { id: 'a5', name: 'Kendrick Lamar', image: 'https://picsum.photos/seed/kendrick/300/300', genre: 'Hip-Hop', followers: 42000000 },
  { id: 'a6', name: 'Doja Cat', image: 'https://picsum.photos/seed/doja/300/300', genre: 'Pop/Rap', followers: 38000000 },
]

export const albums = [
  { id: 'al1', title: 'After Hours', artistId: 'a1', image: 'https://picsum.photos/seed/afterhours/300/300', year: 2020, genre: 'R&B' },
  { id: 'al2', title: 'Midnights', artistId: 'a2', image: 'https://picsum.photos/seed/midnights/300/300', year: 2022, genre: 'Pop' },
  { id: 'al3', title: 'Certified Lover Boy', artistId: 'a3', image: 'https://picsum.photos/seed/clb/300/300', year: 2021, genre: 'Hip-Hop' },
  { id: 'al4', title: 'Happier Than Ever', artistId: 'a4', image: 'https://picsum.photos/seed/happier/300/300', year: 2021, genre: 'Pop' },
  { id: 'al5', title: 'Mr. Morale', artistId: 'a5', image: 'https://picsum.photos/seed/morale/300/300', year: 2022, genre: 'Hip-Hop' },
  { id: 'al6', title: 'Planet Her', artistId: 'a6', image: 'https://picsum.photos/seed/planet/300/300', year: 2021, genre: 'Pop/Rap' },
]

export const songs = [
  { id: 's1', title: 'Blinding Lights', artistId: 'a1', albumId: 'al1', duration: 200, plays: 3800000000 },
  { id: 's2', title: 'Save Your Tears', artistId: 'a1', albumId: 'al1', duration: 215, plays: 2100000000 },
  { id: 's3', title: 'Starboy', artistId: 'a1', albumId: 'al1', duration: 230, plays: 2500000000 },
  { id: 's4', title: 'Anti-Hero', artistId: 'a2', albumId: 'al2', duration: 200, plays: 2800000000 },
  { id: 's5', title: 'Lavender Haze', artistId: 'a2', albumId: 'al2', duration: 202, plays: 1900000000 },
  { id: 's6', title: 'Midnight Rain', artistId: 'a2', albumId: 'al2', duration: 174, plays: 1400000000 },
  { id: 's7', title: 'Champagne Poetry', artistId: 'a3', albumId: 'al3', duration: 337, plays: 890000000 },
  { id: 's8', title: 'Way 2 Sexy', artistId: 'a3', albumId: 'al3', duration: 260, plays: 780000000 },
  { id: 's9', title: 'Happier Than Ever', artistId: 'a4', albumId: 'al4', duration: 298, plays: 1600000000 },
  { id: 's10', title: 'Therefore I Am', artistId: 'a4', albumId: 'al4', duration: 174, plays: 1200000000 },
  { id: 's11', title: 'N95', artistId: 'a5', albumId: 'al5', duration: 229, plays: 670000000 },
  { id: 's12', title: 'Die Hard', artistId: 'a5', albumId: 'al5', duration: 281, plays: 590000000 },
  { id: 's13', title: 'Need to Know', artistId: 'a6', albumId: 'al6', duration: 215, plays: 1100000000 },
  { id: 's14', title: 'Kiss Me More', artistId: 'a6', albumId: 'al6', duration: 208, plays: 980000000 },
]

// In-memory user store
export const users = []

// In-memory playlist store
export const playlists = [
  {
    id: 'p1',
    name: 'Today\'s Top Hits',
    description: 'The hottest tracks right now',
    image: 'https://picsum.photos/seed/tophits/300/300',
    songIds: ['s1', 's4', 's9', 's13', 's5'],
    userId: 'system',
    public: true,
  },
  {
    id: 'p2',
    name: 'Chill Vibes',
    description: 'Relax and unwind',
    image: 'https://picsum.photos/seed/chill/300/300',
    songIds: ['s2', 's6', 's10', 's12'],
    userId: 'system',
    public: true,
  },
  {
    id: 'p3',
    name: 'Hip-Hop Mix',
    description: 'Best hip-hop tracks',
    image: 'https://picsum.photos/seed/hiphop/300/300',
    songIds: ['s7', 's8', 's11', 's12', 's13'],
    userId: 'system',
    public: true,
  },
]
