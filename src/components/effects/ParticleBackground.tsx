import { useEffect, useState, memo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

// Opções do fundo de partículas: circuit board / geometric connections
const particleOptions: ISourceOptions = {
  id: 'pb-particles',
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: { value: 70, density: { enable: true } },
    color: { value: ['#3b82f6', '#06b6d4', '#818cf8'] },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: { enable: true, speed: 0.5, sync: false },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    links: {
      enable: true,
      distance: 160,
      color: '#3b82f6',
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.4,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'bounce' },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
      onClick: { enable: true, mode: 'push' },
    },
    modes: {
      grab: { distance: 180, links: { opacity: 0.4 } },
      push: { quantity: 2 },
    },
  },
  detectRetina: true,
}

const ParticleBackground = memo(function ParticleBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="pb-particles"
      className="absolute inset-0 w-full h-full"
      options={particleOptions}
    />
  )
})

export default ParticleBackground
