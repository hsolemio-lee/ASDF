import Hero from './components/Hero'
import Setlist from './components/Setlist'
import Members from './components/Members'
import NavDots from './components/NavDots'

function App() {
  return (
    <div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      <NavDots />
      <section id="hero">
        <Hero />
      </section>
      <section id="setlist">
        <Setlist />
      </section>
      <section id="members">
        <Members />
      </section>
    </div>
  )
}

export default App
