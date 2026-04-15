import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import ScrollShowcase from './components/sections/ScrollShowcase'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import SkillsTourOverlay from './components/sections/SkillsTourOverlay'

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <ScrollShowcase />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <SkillsTourOverlay />
    </>
  )
}
