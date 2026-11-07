import { useState, useEffect, useCallback } from 'react'
import { Header } from './components/Header'
import { StoryScenesList } from './components/StoryScenesList'
import { Footer } from './components/Footer'
import { InteractiveModal } from './components/InteractiveModal'
import { STORY_SCENES } from './data/storyScenes'
import './App.css'

export function App() {
  const [activeScene, setActiveScene] = useState<string>('scene-01')
  const [activeModal, setActiveModal] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveScene(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: 0.05,
      }
    )

    STORY_SCENES.forEach((scene) => {
      const el = document.getElementById(scene.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToScene = useCallback((id: string) => {
    const cleanId = id.replace(/^#/, '')
    const el = document.getElementById(cleanId)
    if (el) {
      const header = document.querySelector('header')
      const headerHeight = header ? header.getBoundingClientRect().height : 72
      const targetY = el.getBoundingClientRect().top + window.pageYOffset - headerHeight + 2

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth',
      })
    } else {
      console.warn(`[GenBright] Target section #${cleanId} not found`)
    }
  }, [])

  const handleOpenModal = useCallback((modalId: string) => {
    setActiveModal(modalId)
  }, [])

  const handleCloseModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  return (
    <div className="gb-app">
      <Header
        activeScene={activeScene}
        onScrollTo={scrollToScene}
        onOpenModal={handleOpenModal}
      />

      <StoryScenesList
        onScrollTo={scrollToScene}
        onOpenModal={handleOpenModal}
      />

      <Footer
        onScrollTo={scrollToScene}
        onOpenModal={handleOpenModal}
      />

      <InteractiveModal
        modalId={activeModal}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default App
