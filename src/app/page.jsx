'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import SpotifySection from '../components/SpotifySection'
import TourSection from '../components/TourSection'
import VideoSection from '../components/VideoSection'
import GallerySection from '../components/GallerySection'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const fadeSection = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.22, ease: 'easeOut' },
}

export default function Page() {
  const [lang, setLang] = useState('en')
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem('sena-language', lang)
  }, [lang])

  return (
    <main className="h-screen overflow-hidden bg-[#070706] text-white">
      <Nav
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />
      <div className="fixed inset-x-0 top-[74px] bottom-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div key="home" {...fadeSection}>
              <Hero lang={lang} onNavigate={setActiveSection} />
            </motion.div>
          )}
          {activeSection === 'music' && (
            <motion.div key="music" {...fadeSection}>
              <SpotifySection lang={lang} />
            </motion.div>
          )}
          {activeSection === 'tour' && (
            <motion.div key="tour" {...fadeSection}>
              <TourSection lang={lang} />
            </motion.div>
          )}
          {activeSection === 'videos' && (
            <motion.div key="videos" {...fadeSection}>
              <VideoSection lang={lang} />
            </motion.div>
          )}
          {activeSection === 'photos' && (
            <motion.div key="photos" {...fadeSection}>
              <GallerySection lang={lang} />
            </motion.div>
          )}
          {activeSection === 'about' && (
            <motion.div key="about" {...fadeSection}>
              <AboutSection lang={lang} />
            </motion.div>
          )}
          {activeSection === 'contact' && (
            <motion.div key="contact" {...fadeSection}>
              <ContactSection lang={lang} />
              <Footer lang={lang} onNavigate={setActiveSection} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
