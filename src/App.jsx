import { useState } from 'react'
import Hero from './components/Hero'
import Setlist from './components/Setlist'
import Members from './components/Members'
import Venue from './components/Venue'
import Comments from './components/Comments'

export default function App() {
  const [memberPreview, setMemberPreview] = useState(
    () => localStorage.getItem('asdf_member_preview') === '1'
  )

  function handleMemberPreview() {
    localStorage.setItem('asdf_member_preview', '1')
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
