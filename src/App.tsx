import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import SkillsSpotlight from './components/sections/SkillsSpotlight'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <SkillsSpotlight />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
