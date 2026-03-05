import Hero from './components/Hero'
import Setlist from './components/Setlist'
import Members from './components/Members'
import Venue from './components/Venue'

export default function App() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      <Hero />
      <Setlist />
      <Members />
      <Venue />
    </main>
  )
}
