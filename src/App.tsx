import { useState, useEffect } from 'react'
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

  const scrollToScene = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="gb-app">
      <Header
        activeScene={activeScene}
        onScrollTo={scrollToScene}
        onOpenModal={(modalId) => setActiveModal(modalId)}
      />

      <StoryScenesList
        onScrollTo={scrollToScene}
        onOpenModal={(modalId) => setActiveModal(modalId)}
      />

      <Footer
        onScrollTo={scrollToScene}
        onOpenModal={(modalId) => setActiveModal(modalId)}
      />

      <InteractiveModal
        modalId={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  )
}

export default App
