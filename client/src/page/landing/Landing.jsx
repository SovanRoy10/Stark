import LandingNavbar from "./LandingNavbar"
import LandingHero from "./LandingHero"
import LandingContent from "./LandingContent"

export default function Landing() {
  return (
    <main className='h-full bg-[#111827] overflow-auto'>
      <div className='mx-auto max-w-screen-xl h-full w-full'>
        <LandingNavbar/>
        <LandingHero/>
        <LandingContent/>
      </div>
    </main>
  )
}
