import { useState, useEffect } from 'react'
import { NAV_ITEMS, STORY_SCENES } from '../data/storyScenes'

interface HeaderProps {
  activeScene: string
  onScrollTo: (id: string) => void
  onOpenModal: (modalId: string) => void
}

export function Header({ activeScene, onScrollTo, onOpenModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentSceneObj =
    STORY_SCENES.find((s) => s.id === activeScene) || STORY_SCENES[0]

  return (
    <header className={`gb-header ${scrolled ? 'gb-header--scrolled' : ''}`}>
      {/* Main Navigation Bar */}
      <div className="gb-container gb-nav">
        <button
          type="button"
          className="gb-brand"
          onClick={() => onScrollTo('scene-01')}
          aria-label="GenBright World School Home"
        >
          <img
            src="/genbright-logo.png"
            alt="GenBright World School Logo"
            className="gb-brand__logo"
          />
        </button>

        <nav className="gb-nav__links" aria-label="Story Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = item.scenes.includes(currentSceneObj.number)
            return (
              <button
                key={item.label}
                type="button"
                className={`gb-nav__link ${isActive ? 'active' : ''}`}
                onClick={() => onScrollTo(item.target)}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="gb-nav__actions">
          <button
            type="button"
            className="gb-portal-btn"
            onClick={() => onOpenModal('parent-portal')}
            aria-label="Parent Login"
          >
            <svg
              className="gb-portal-btn__icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="gb-portal-btn__text">Parent Login</span>
          </button>
          <button
            type="button"
            className="gb-portal-btn"
            onClick={() => onOpenModal('student-portal')}
            aria-label="Student Login"
          >
            <svg
              className="gb-portal-btn__icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <span className="gb-portal-btn__text">Student Login</span>
          </button>
          <button
            type="button"
            className="gb-apply-btn"
            onClick={() => onOpenModal('admissions')}
          >
            Apply Now
          </button>
          <button
            type="button"
            className="gb-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Compact Menu */}
      {mobileMenuOpen && (
        <div className="gb-mobile-menu">
          <div className="gb-mobile-menu__links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                className="gb-mobile-menu__link"
                onClick={() => {
                  onScrollTo(item.target)
                  setMobileMenuOpen(false)
                }}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="gb-mobile-menu__portals">
            <button
              type="button"
              className="gb-portal-btn"
              onClick={() => {
                onOpenModal('parent-portal')
                setMobileMenuOpen(false)
              }}
            >
              <svg
                className="gb-portal-btn__icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="gb-portal-btn__text">Parent Login</span>
            </button>
            <button
              type="button"
              className="gb-portal-btn"
              onClick={() => {
                onOpenModal('student-portal')
                setMobileMenuOpen(false)
              }}
            >
              <svg
                className="gb-portal-btn__icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span className="gb-portal-btn__text">Student Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
