import { useState } from 'react'
import Hero from './components/Hero'
import Setlist from './components/Setlist'
import Members from './components/Members'
import Venue from './components/Venue'
import Comments from './components/Comments'

export default function App() {
  const [memberPreview, setMemberPreview] = useState(false)

  function handleMemberPreview() {
    setMemberPreview(true)
  }

  return (
    <main style={{ overflowX: 'hidden' }}>
      <Hero onMemberPreview={handleMemberPreview} memberPreview={memberPreview} />
      <Setlist memberPreview={memberPreview} />
      <Members />
      <Venue />
      <Comments />
    </main>
  )
}
