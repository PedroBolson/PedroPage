import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ParallaxProvider } from 'react-scroll-parallax'
import './styles/main.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* ParallaxProvider habilita o contexto necessário para react-scroll-parallax */}
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </StrictMode>,
)
