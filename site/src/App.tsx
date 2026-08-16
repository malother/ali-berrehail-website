import { lazy, Suspense, useEffect } from 'react'
import { LangProvider } from './i18n'
import { startScrollEngine } from './lib/scroll'
import SceneBoundary from './components/three/SceneBoundary'
import HeroVideoLayer from './components/HeroVideoLayer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import Ecosystem from './components/Ecosystem'
import Differentiator from './components/Differentiator'
import Services from './components/Services'
import Sourcing from './components/Sourcing'
import Comprehensive from './components/Comprehensive'
import Catalog from './components/Catalog'
import PrivateLabel from './components/PrivateLabel'
import Quality from './components/Quality'
import Logistics from './components/Logistics'
import About from './components/About'
import TrustSection from './components/TrustSection'
import CtaSection from './components/CtaSection'
import Inquiry from './components/Inquiry'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const UniverseCanvas = lazy(() => import('./components/three/UniverseCanvas'))

export default function App() {
  useEffect(() => startScrollEngine(), [])

  return (
    <LangProvider>
      {/* Cinematic hero video atmosphere — below the 3D canvas (DOM order: video first,
          both z-0, canvas paints above), below vignette/content */}
      <HeroVideoLayer />
      {/* Persistent cinematic 3D universe behind the entire page */}
      <Suspense fallback={null}>
        <SceneBoundary>
          <UniverseCanvas />
        </SceneBoundary>
      </Suspense>
      {/* Legibility vignette above the canvas, below the content */}
      <div className="vignette pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <Ecosystem />
          <Differentiator />
          <Services />
          <Sourcing />
          <Comprehensive />
          <Catalog />
          <PrivateLabel />
          <Quality />
          <Logistics />
          <About />
          <TrustSection />
          <CtaSection />
          <Inquiry />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LangProvider>
  )
}