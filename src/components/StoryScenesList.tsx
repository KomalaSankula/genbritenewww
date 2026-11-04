import { useRef, useEffect, useState } from 'react'
import {
  STORY_SCENES,
  HERO_VIDEO_REELS,
  THIRTEEN_CENTRES,
  FOUR_PILLARS_DATA,
  type SceneCTA,
} from '../data/storyScenes'

const LEARNER_PROFILES = [
  {
    title: 'The Dreamer',
    imageUrl:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Child looking thoughtfully outdoors',
  },
  {
    title: 'The Explorer',
    imageUrl:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Child exploring the world around them',
  },
  {
    title: 'The Quiet Observer',
    imageUrl:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Student focused on learning',
  },
  {
    title: 'The Energetic Questioner',
    imageUrl:
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Students learning together in a classroom',
  },
]

interface StoryScenesListProps {
  onScrollTo: (id: string) => void
  onOpenModal: (modalId: string) => void
}

function SceneReferenceHeader({
  number,
  titleDark,
  titleGrey,
  centered = false,
}: {
  number: string
  titleDark: string
  titleGrey: string
  centered?: boolean
}) {
  const darkWords = titleDark.split(' ')
  const greyWords = titleGrey.split(' ')
  const numInt = parseInt(number, 10) || 2
  const accentThemes = ['emerald', 'amber'] as const
  const theme = accentThemes[numInt % accentThemes.length]

  return (
    <div className={`gb-ref-header gb-ref-header--${theme} ${centered ? 'gb-ref-header--center' : ''}`}>
      <h2 className="gb-ref-title">
        <span className="gb-ref-title__dark">
          {darkWords.map((word, i) => (
            <span key={`${word}-${i}`} className="gb-anim-word">
              <span
                className="gb-anim-word__inner"
                style={{ transitionDelay: `${0.08 + i * 0.06}s` }}
              >
                {word}
              </span>
            </span>
          ))}
        </span>
        <span className="gb-ref-title__grey">
          {greyWords.map((word, i) => (
            <span key={`${word}-${i}`} className="gb-anim-word">
              <span
                className="gb-anim-word__inner"
                style={{ transitionDelay: `${0.14 + (darkWords.length + i) * 0.06}s` }}
              >
                {word}
              </span>
            </span>
          ))}
        </span>
      </h2>
    </div>
  )
}

function AnimatedCopy({ text, className }: { text: string; className: string }) {
  const words = text.split(' ')
  return (
    <p className={`${className} gb-anim-copy`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="gb-copy-word"
          style={{ transitionDelay: `${0.22 + i * 0.018}s` }}
        >
          {word}
        </span>
      ))}
    </p>
  )
}

export function StoryScenesList({ onScrollTo, onOpenModal }: StoryScenesListProps) {
  const mainRef = useRef<HTMLElement | null>(null)
  const centresCarouselRef = useRef<HTMLDivElement | null>(null)
  const [canScrollCentresBack, setCanScrollCentresBack] = useState(false)
  const [canScrollCentresForward, setCanScrollCentresForward] = useState(true)
  const [activePillarIndex, setActivePillarIndex] = useState(3)

  useEffect(() => {
    const root = mainRef.current
    if (!root) return
    const scenes = root.querySelectorAll<HTMLElement>('.gb-scene')
    if (typeof IntersectionObserver === 'undefined') {
      scenes.forEach((s) => s.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    scenes.forEach((s, index) => {
      if (index < 2) s.classList.add('is-visible')
      observer.observe(s)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const carousel = centresCarouselRef.current
    if (!carousel) return

    const updateControls = () => {
      setCanScrollCentresBack(carousel.scrollLeft > 1)
      setCanScrollCentresForward(
        carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1
      )
    }

    updateControls()
    carousel.addEventListener('scroll', updateControls, { passive: true })
    window.addEventListener('resize', updateControls)

    return () => {
      carousel.removeEventListener('scroll', updateControls)
      window.removeEventListener('resize', updateControls)
    }
  }, [])

  const scrollCentres = (direction: -1 | 1) => {
    const carousel = centresCarouselRef.current
    const firstSlide = carousel?.querySelector<HTMLElement>('.gb-centre-slide')
    if (!carousel || !firstSlide) return

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0
    carousel.scrollBy({
      left: direction * (firstSlide.offsetWidth + gap),
      behavior: 'smooth',
    })
  }

  const handleCta = (cta: SceneCTA) => {
    if (cta.actionType === 'scroll') {
      onScrollTo(cta.target)
    } else {
      onOpenModal(cta.target)
    }
  }

  const currentHeroReel = HERO_VIDEO_REELS[0]

  return (
    <main ref={mainRef} className="gb-story-main">
      {STORY_SCENES.map((scene, idx) => {
        const isImageScene = scene.hasImage
        const bgSurfaceClass =
          scene.number === '01'
            ? 'gb-scene--hero-fullvideo'
            : idx % 2 === 1
            ? 'gb-scene--alabaster'
            : 'gb-scene--white'

        return (
          <section
            key={scene.id}
            id={scene.id}
            className={`gb-scene ${bgSurfaceClass} ${
              isImageScene ? 'gb-scene--with-image' : 'gb-scene--no-image'
            }`}
          >
            {/* SCENE 01: HERO FILM */}
            {scene.number === '01' ? (
              <div className="gb-hero-fullvideo-stage">
                <video
                  key={currentHeroReel.id}
                  className="gb-hero-fullvideo__media"
                  poster={currentHeroReel.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={currentHeroReel.videoUrl} type="video/mp4" />
                  <source src={currentHeroReel.fallbackUrl} type="video/mp4" />
                </video>
                <div className="gb-hero-fullvideo__scrim" aria-hidden="true" />

                <div className="gb-container gb-hero-overlay">
                  <div className="gb-hero-overlay__inner">
                    <h1 className="gb-hero-overlay__title">
                      <span className="gb-hero-overlay__title-light">{scene.titleDark}</span>{' '}
                      <span className="gb-hero-overlay__title-gold">{scene.titleGrey}</span>
                    </h1>
                    <AnimatedCopy text={scene.copy} className="gb-hero-overlay__copy" />
                    <div className="gb-cta-group gb-feature-ctas gb-hero-overlay__ctas">
                      <button
                        type="button"
                        className="gb-btn gb-btn--primary-gold"
                        onClick={() => handleCta(scene.primaryCta)}
                      >
                        {scene.primaryCta.label}
                      </button>
                      <button
                        type="button"
                        className="gb-btn gb-btn--outline-light"
                        onClick={() => handleCta(scene.secondaryCta)}
                      >
                        {scene.secondaryCta.label}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="gb-container gb-scene__container">
                {/* SCENE 08: 13 LEARNING CENTRES */}
                {scene.number === '08' ? (
                  <div className="gb-layout-scene08">
                      <div className="gb-section-header-stack">
                      <SceneReferenceHeader
                        number={scene.number}
                        titleDark={scene.titleDark}
                        titleGrey={scene.titleGrey}
                      />
                      <AnimatedCopy text={scene.copy} className="gb-lead-copy" />
                    </div>

                    <div className="gb-centres-carousel" role="region" aria-label="13 Learning Centres carousel">
                      <div
                        className="gb-centres-carousel__track"
                        ref={centresCarouselRef}
                        id="learning-centres-carousel"
                        role="list"
                        aria-label="Learning centre cards"
                        tabIndex={0}
                      >
                        {THIRTEEN_CENTRES.map((centre, index) => (
                          <article
                            key={centre.num}
                            className="gb-centre-slide"
                            role="listitem"
                            aria-label={`${index + 1} of ${THIRTEEN_CENTRES.length}: ${centre.name}`}
                          >
                            <img
                              className="gb-centre-slide__image"
                              src={centre.imageUrl}
                              alt={`${centre.name} learning centre`}
                              loading={index < 3 ? 'eager' : 'lazy'}
                              decoding="async"
                            />
                            <div className="gb-centre-slide__content">
                              <span className="gb-centre-slide__number">{centre.num}</span>
                              <h3>{centre.name}</h3>
                            </div>
                          </article>
                        ))}
                      </div>

                      <div className="gb-centres-carousel__controls">
                        <button
                          type="button"
                          className="gb-centres-carousel__button"
                          onClick={() => scrollCentres(-1)}
                          disabled={!canScrollCentresBack}
                          aria-label="Previous learning centre"
                          aria-controls="learning-centres-carousel"
                        >
                          <span aria-hidden="true">←</span>
                        </button>
                        <button
                          type="button"
                          className="gb-centres-carousel__button"
                          onClick={() => scrollCentres(1)}
                          disabled={!canScrollCentresForward}
                          aria-label="Next learning centre"
                          aria-controls="learning-centres-carousel"
                        >
                          <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </div>

                    <div className="gb-cta-group">
                      <button
                        type="button"
                        className="gb-btn gb-btn--primary-forest"
                        onClick={() => handleCta(scene.primaryCta)}
                      >
                        {scene.primaryCta.label}
                      </button>
                      <button
                        type="button"
                        className="gb-btn gb-btn--outline-dark"
                        onClick={() => handleCta(scene.secondaryCta)}
                      >
                        {scene.secondaryCta.label}
                      </button>
                    </div>
                  </div>
                ) : scene.number === '02' ? (
                  <div className="gb-scene02-layout">
                    <div className="gb-scene02-layout__visual">
                      <img src={scene.imageUrl} alt={scene.imageAlt} />
                    </div>

                    <div className="gb-scene02-layout__content">
                      <SceneReferenceHeader
                        number={scene.number}
                        titleDark={scene.titleDark}
                        titleGrey={scene.titleGrey}
                      />
                      <AnimatedCopy text={scene.copy} className="gb-lead-copy" />

                      <div className="gb-cta-group gb-feature-ctas">
                        <button
                          type="button"
                          className="gb-btn gb-btn--primary-forest"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="gb-btn gb-btn--outline-dark"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '03' ? (
                  <div className="gb-learning-profiles">
                    <div className="gb-learning-profiles__intro">
                      <SceneReferenceHeader
                        number={scene.number}
                        titleDark={scene.titleDark}
                        titleGrey={scene.titleGrey}
                      />
                      <AnimatedCopy text={scene.copy} className="gb-body-copy" />
                    </div>

                    <ul
                      className="gb-learner-card-grid"
                      aria-label="Different ways children learn"
                    >
                      {LEARNER_PROFILES.map((profile) => (
                        <li className="gb-learner-card" key={profile.title}>
                          <article>
                            <img
                              className="gb-learner-card__image"
                              src={profile.imageUrl}
                              alt={profile.imageAlt}
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="gb-learner-card__content">
                              <h3>{profile.title}</h3>
                            </div>
                          </article>
                        </li>
                      ))}
                    </ul>

                    <div className="gb-cta-group gb-feature-ctas">
                      <button
                        type="button"
                        className="gb-btn gb-btn--primary-forest"
                        onClick={() => handleCta(scene.primaryCta)}
                      >
                        {scene.primaryCta.label}
                      </button>
                      <button
                        type="button"
                        className="gb-btn gb-btn--outline-dark"
                        onClick={() => handleCta(scene.secondaryCta)}
                      >
                        {scene.secondaryCta.label}
                      </button>
                    </div>
                  </div>
                ) : scene.number === '04' ? (
                  <div className="gb-scene04-deck-layout">
                    <div className="gb-section-header-stack">
                      <SceneReferenceHeader
                        number={scene.number}
                        titleDark={scene.titleDark}
                        titleGrey={scene.titleGrey}
                      />
                      <AnimatedCopy text={scene.copy} className="gb-lead-copy" />
                    </div>

                    {/* Stacked Pillars Deck as in reference screenshot */}
                    <div className="gb-stacked-deck-container">
                      <div className="gb-deck-tabs-bar" role="tablist" aria-label="Four Pillars of Learning">
                        {FOUR_PILLARS_DATA.map((pillar, pIdx) => (
                          <button
                            key={pillar.key}
                            type="button"
                            role="tab"
                            aria-selected={activePillarIndex === pIdx}
                            className={`gb-deck-tab-pill ${activePillarIndex === pIdx ? 'active' : ''}`}
                            onClick={() => setActivePillarIndex(pIdx)}
                          >
                            <span className="gb-deck-tab-pill__num">0{pIdx + 1}</span>
                            <span className="gb-deck-tab-pill__name">{pillar.key}</span>
                          </button>
                        ))}
                      </div>

                      <div className="gb-stacked-deck">
                        {FOUR_PILLARS_DATA.map((pillar, pIdx) => {
                          const diff = (pIdx - activePillarIndex + FOUR_PILLARS_DATA.length) % FOUR_PILLARS_DATA.length
                          const isActive = diff === 0
                          return (
                            <article
                              key={pillar.key}
                              className={`gb-deck-card ${isActive ? 'is-active' : ''} gb-deck-card--offset-${diff}`}
                              onClick={() => setActivePillarIndex(pIdx)}
                              style={{ zIndex: FOUR_PILLARS_DATA.length - diff }}
                            >
                              <div className="gb-deck-card__body">
                                <span className={`gb-deck-card__badge gb-deck-card__badge--${pillar.key.toLowerCase()}`}>
                                  {pillar.key}
                                </span>
                                <h3 className="gb-deck-card__quote">{pillar.quote}</h3>
                                <p className="gb-deck-card__desc">{pillar.description}</p>

                                <div className="gb-deck-card__controls">
                                  <span className="gb-deck-card__step">0{pIdx + 1} / 04 · {pillar.subtitle}</span>
                                  <div className="gb-deck-card__arrow-btns">
                                    <button
                                      type="button"
                                      className="gb-deck-arrow-btn"
                                      aria-label="Previous Pillar"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActivePillarIndex((prev) => (prev - 1 + FOUR_PILLARS_DATA.length) % FOUR_PILLARS_DATA.length)
                                      }}
                                    >
                                      ←
                                    </button>
                                    <button
                                      type="button"
                                      className="gb-deck-arrow-btn"
                                      aria-label="Next Pillar"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActivePillarIndex((prev) => (prev + 1) % FOUR_PILLARS_DATA.length)
                                      }}
                                    >
                                      →
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="gb-deck-card__visual">
                                <img src={pillar.imageUrl} alt={pillar.imageAlt} />
                              </div>
                            </article>
                          )
                        })}
                      </div>
                    </div>

                    <div className="gb-cta-group gb-feature-ctas">
                      <button
                        type="button"
                        className="gb-btn gb-btn--primary-forest"
                        onClick={() => handleCta(scene.primaryCta)}
                      >
                        {scene.primaryCta.label}
                      </button>
                      <button
                        type="button"
                        className="gb-btn gb-btn--outline-dark"
                        onClick={() => handleCta(scene.secondaryCta)}
                      >
                        {scene.secondaryCta.label}
                      </button>
                    </div>
                  </div>
                ) : isImageScene ? (
                  /* IMAGE SCENES (03, 05, 07, 09, 11, 13, 15): STRICTLY PDF HEADLINE + PDF COPY + PDF CTAS + IMAGE */
                  <div className="gb-split-scene">
                    <div className="gb-split-scene__text">
                      <SceneReferenceHeader
                        number={scene.number}
                        titleDark={scene.titleDark}
                        titleGrey={scene.titleGrey}
                      />
                      <AnimatedCopy text={scene.copy} className="gb-body-copy" />

                      <div className="gb-cta-group">
                        <button
                          type="button"
                          className="gb-btn gb-btn--primary-forest"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="gb-btn gb-btn--outline-dark"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    <div className="gb-split-scene__visual">
                      <div className="gb-fixa-media-card">
                        <img src={scene.imageUrl} alt={scene.imageAlt} />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* TEXT SCENES (02, 04, 06, 10, 12, 14): STRICTLY PDF HEADLINE + PDF COPY + PDF CTAS */
                  <div className="gb-section-header-stack">
                    <SceneReferenceHeader
                      number={scene.number}
                      titleDark={scene.titleDark}
                      titleGrey={scene.titleGrey}
                    />
                    <AnimatedCopy text={scene.copy} className="gb-lead-copy" />

                    <div className="gb-cta-group">
                      <button
                        type="button"
                        className="gb-btn gb-btn--primary-forest"
                        onClick={() => handleCta(scene.primaryCta)}
                      >
                        {scene.primaryCta.label}
                      </button>
                      <button
                        type="button"
                        className="gb-btn gb-btn--outline-dark"
                        onClick={() => handleCta(scene.secondaryCta)}
                      >
                        {scene.secondaryCta.label}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )
      })}
    </main>
  )
}
