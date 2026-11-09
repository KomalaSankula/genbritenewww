import React, { useRef, useEffect, useState } from 'react'
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
    subtitle: 'Creative, imaginative & poetic vision',
    tag: 'Creativity & Arts',
    description: 'Thrives in open-ended creative inquiry, visual storytelling, and connecting big ideas across disciplines.',
    imageUrl:
      '/images/girl.png',
    imageAlt: 'Child looking thoughtfully outdoors with colorful face paint and creative imagination',
  },
  {
    title: 'The Explorer',
    subtitle: 'Curious, experiential & outdoor discovery',
    tag: 'Living Ecology',
    description: 'Learns through direct physical inquiry, botanical exploration, and hands-on scientific experimentation.',
    imageUrl:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Joyful children smiling and exploring together on green campus',
  },
  {
    title: 'The Quiet Observer',
    subtitle: 'Reflective, precise & deep analytical focus',
    tag: 'Inquiry & Rigour',
    description: 'Absorbs subtle nuances, builds deep conceptual clarity, and approaches challenges with calm, focused determination.',
    imageUrl:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Student focused thoughtfully on books and learning materials',
  },
  {
    title: 'The Energetic Questioner',
    subtitle: 'Bold, spirited & collaborative leadership',
    tag: 'Leadership & Voice',
    description: 'Sparks intellectual dialogue with passionate questions, rallies peer teams, and turns ideas into active movement.',
    imageUrl:
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Energetic students collaborating and raising questions together in classroom',
  },
]

const CHILDHOOD_MOTION_GALLERY = [
  {
    id: 'motion-1',
    title: 'Joyful Play',
    imageUrl: '/images/gallery-motion-play.jpg',
    imageAlt: 'Joyful elementary students running freely and laughing across sunlit botanical school grounds',
  },
  {
    id: 'motion-2',
    title: 'Hands-on Discovery',
    imageUrl: '/images/gallery-motion-discovery.jpg',
    imageAlt: 'Curious young student examining a green seedling and STEM robotics project with a bright smile',
  },
  {
    id: 'motion-3',
    title: 'Botanical Farm',
    imageUrl: '/images/gallery-motion-nature.jpg',
    imageAlt: 'Children gently planting saplings in rich organic garden soil at the campus botanical farm',
  },
  {
    id: 'motion-4',
    title: 'Creative Arts',
    imageUrl: '/images/gallery-motion-arts.jpg',
    imageAlt: 'Delighted young student painting vibrant watercolor brushstrokes on canvas in a sunlit art studio',
  },
  {
    id: 'motion-5',
    title: 'Active Athletics',
    imageUrl: '/images/gallery-motion-sports.jpg',
    imageAlt: 'Energetic students smiling and playing soccer on lush outdoor green sports turf',
  },
]

const CAMPUS_SLIDESHOW = [
  {
    id: 'camp-1',
    imageUrl: '/images/joyful-children-outdoor.png',
    alt: 'Children laughing and playing joyfully outdoors across the seven-acre campus',
  },
  {
    id: 'camp-2',
    imageUrl: '/images/academically-prepared.png',
    alt: 'Students engaged in collaborative inquiry and hands-on learning in modern Cambridge classroom',
  },
  {
    id: 'camp-3',
    imageUrl: '/images/happy-children.png',
    alt: 'Children hands in soil planting seeds and discovering living ecology on the campus farm',
  },
  {
    id: 'camp-4',
    imageUrl: '/images/section-02-children.jpg',
    alt: 'Joyful GenBright students smiling together outdoors',
  },
  {
    id: 'camp-5',
    imageUrl: '/images/section-04-whole-child.jpg',
    alt: 'Children exploring and discovering in nature at GenBright World School',
  },
  {
    id: 'camp-6',
    imageUrl: '/images/standing.png',
    alt: 'A school community member standing on campus',
  },
]

const COMMUNITY_IMAGE = {
  imageUrl: '/images/community-mentors-collaboration.jpg',
  alt: 'Female scientist mentor and community educators collaborating with young learners around robotics and ecology workshop at GenBright',
}

const FOUNDERS_AND_LEADERS = [
  {
    id: 'leader-1',
    num: '01',
    name: 'Dhanyabharathi Kannan',
    designation: 'Founder & Educationist',
    imageUrl: '/images/founder-dhanyabharathi.jpg',
    imageAlt: 'Dhanyabharathi Kannan, Founder & Educationist at GenBright World School',
  },
  {
    id: 'leader-2',
    num: '02',
    name: 'Dr. Ananya Sundaram',
    designation: 'Head of Cambridge & Pedagogical Research',
    imageUrl: '/images/educator-clean-portrait.jpg',
    imageAlt: 'Dr. Ananya Sundaram, Head of Cambridge & Pedagogical Research',
  },
  {
    id: 'leader-3',
    num: '03',
    name: 'Vikramaditya Sen',
    designation: 'Director of Living Ecology & Bio-design',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Vikramaditya Sen, Director of Living Ecology & Bio-design',
  },
  {
    id: 'leader-4',
    num: '04',
    name: 'Sarah Jenkins',
    designation: 'Dean of Whole-Child Well-Being & Pastoral Care',
    imageUrl: '/images/standing.png',
    imageAlt: 'Sarah Jenkins, Dean of Whole-Child Well-Being & Pastoral Care',
  },
  {
    id: 'leader-5',
    num: '05',
    name: 'Rajesh Ramanathan',
    designation: 'Head of STEAM Innovation & Cambridge Sciences',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Rajesh Ramanathan, Head of STEAM Innovation & Cambridge Sciences',
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
  const numInt = parseInt(number, 10) || 2
  const accentThemes = ['emerald', 'amber'] as const
  const theme = accentThemes[numInt % accentThemes.length]

  return (
    <div className={`gb-ref-header gb-ref-header--${theme} ${centered ? 'gb-ref-header--center' : ''}`}>
      <h2 className="gb-ref-title">
        <span className="gb-ref-title__dark">{titleDark} </span>
        <span className="gb-ref-title__grey">{titleGrey}</span>
      </h2>
    </div>
  )
}

function AnimatedCopy({ text, className }: { text: string; className: string }) {
  return <p className={className}>{text}</p>
}

function renderConceptIcon(pillarKey: string) {
  if (pillarKey === 'THINK') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
      </svg>
    )
  }
  if (pillarKey === 'FEEL') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    )
  }
  if (pillarKey === 'MOVE') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="4" r="2" />
        <path d="M6 19l4-3.5 3 2 4.5-1.5" />
        <path d="M8 12.5l3.5-3 3 1.5 3-2" />
        <path d="M12.5 11l-1 5" />
        <path d="M6.5 11.5L4 14" />
      </svg>
    )
  }
  /* PAUSE */
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" rx="2" />
      <rect x="14" y="4" width="4" height="16" rx="2" />
    </svg>
  )
}

export const StoryScenesList = React.memo(function StoryScenesList({ onScrollTo, onOpenModal }: StoryScenesListProps) {
  const mainRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const centresCarouselRef = useRef<HTMLDivElement | null>(null)
  const [canScrollCentresBack, setCanScrollCentresBack] = useState(false)
  const [canScrollCentresForward, setCanScrollCentresForward] = useState(true)
  const [campusSlideIndex, setCampusSlideIndex] = useState(0)
  const [isCampusPaused, setIsCampusPaused] = useState(false)
  const [leaderSlideIndex, setLeaderSlideIndex] = useState(0)
  const [isLeaderPaused, setIsLeaderPaused] = useState(false)

  const handlePrevCampusSlide = () => {
    setCampusSlideIndex((prev) => (prev - 1 + CAMPUS_SLIDESHOW.length) % CAMPUS_SLIDESHOW.length)
  }

  const handleNextCampusSlide = () => {
    setCampusSlideIndex((prev) => (prev + 1) % CAMPUS_SLIDESHOW.length)
  }

  useEffect(() => {
    if (isCampusPaused) return
    const timer = setInterval(() => {
      setCampusSlideIndex((prev) => (prev + 1) % CAMPUS_SLIDESHOW.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isCampusPaused])

  // Auto-slide leadership carousel with hover pause
  useEffect(() => {
    if (isLeaderPaused) return
    const timer = setInterval(() => {
      setLeaderSlideIndex((prev) => (prev + 1) % FOUNDERS_AND_LEADERS.length)
    }, 4200)
    return () => clearInterval(timer)
  }, [isLeaderPaused])

  // Pause Hero video when not visible in viewport to prevent GPU/CPU background decoding lag
  useEffect(() => {
    const video = videoRef.current
    if (!video || typeof IntersectionObserver === 'undefined') return
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.05 }
    )
    videoObserver.observe(video)
    return () => videoObserver.disconnect()
  }, [])

  // Optimized scene entrance observer: once visible, keep it visible to avoid thrashing CSS styles during fast scrolling
  useEffect(() => {
    const root = mainRef.current
    if (!root) return
    const scenes = root.querySelectorAll<HTMLElement>('.gb-scene')
    if (typeof IntersectionObserver === 'undefined') {
      scenes.forEach((s) => s.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '100px 0px' }
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
      {STORY_SCENES.map((scene) => {
        const isImageScene = scene.hasImage
        const num = parseInt(scene.number, 10)
        const bgSurfaceClass =
          scene.number === '01'
            ? 'gb-scene--hero-fullvideo !p-0 !m-0 !border-0 !bg-transparent'
            : scene.number === '03'
              ? 'gb-scene--alabaster ![content-visibility:visible] ![contain:none] relative'
              : scene.number === '05'
                ? 'gb-scene--alabaster !bg-[#ffffff] !p-0'
                : scene.number === '09'
                  ? 'gb-scene--alabaster !bg-[#ffffff]'
                  : scene.number === '10'
                    ? 'gb-scene--alabaster !p-0 !w-full !max-w-full !border-b-0'
                    : scene.number === '11'
                      ? 'gb-scene--white !bg-[#ffffff]'
                      : scene.number === '12'
                        ? 'gb-scene--alabaster !bg-[rgba(231,232,226,0.6)]'
                        : scene.number === '13' || scene.number === '14'
                          ? 'gb-scene--white !bg-[#ffffff]'
                          : scene.number === '15'
                            ? 'gb-scene--white !bg-[#ffffff] !p-0 !m-0 !border-b-0 !w-full !max-w-full'
                            : [7].includes(num)
                              ? 'gb-scene--alabaster'
                              : 'gb-scene--white'

        return (
          <section
            key={scene.id}
            id={scene.id}
            className={`gb-scene ${bgSurfaceClass} ${isImageScene ? 'gb-scene--with-image' : 'gb-scene--no-image'
              } ${scene.number === '05' || scene.number === '10' || scene.number === '15' ? 'gb-scene--fluid' : ''} ${scene.number === '10' || scene.number === '15' ? 'gb-scene--fullwidth' : ''} ${scene.number === '15' ? 'gb-scene--attached-footer' : ''}`}
          >
            {/* SCENE 01: HERO FILM */}
            {scene.number === '01' ? (
              <div className="relative w-full h-[calc(100vh-60px)] min-h-[600px] overflow-hidden flex items-center">
                <video
                  ref={videoRef}
                  key={currentHeroReel.id}
                  className="absolute inset-0 w-full h-full object-cover block z-[1]"
                  poster={currentHeroReel.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={currentHeroReel.videoUrl} type="video/mp4" />
                  <source src={currentHeroReel.fallbackUrl} type="video/mp4" />
                </video>
                <div
                  className="absolute inset-0 z-[2] pointer-events-none bg-[linear-gradient(180deg,rgba(13,38,25,0.38)_0%,rgba(19,54,36,0.20)_35%,rgba(24,68,46,0.18)_65%,rgba(13,38,25,0.42)_100%)]"
                  aria-hidden="true"
                />

                <div className="relative z-[3] w-full max-w-[1320px] mx-auto py-0 px-8 max-[640px]:!px-[1.15rem] text-center">
                  <div className="max-w-[900px] mx-auto">
                    <h1 className="font-[var(--font-display)] uppercase text-[clamp(2.15rem,6.5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] mb-4 [text-shadow:0_3px_20px_rgba(0,0,0,0.45)]">
                      <span className="block !text-[#ffffff] !font-bold !uppercase">{scene.titleDark}</span>{' '}
                      <span className="!block !text-[var(--gb-gold-light,#f2c94c)] !font-bold !uppercase">{scene.titleGrey}</span>
                    </h1>
                    <AnimatedCopy
                      text={scene.copy}
                      className="!text-[clamp(1.15rem,1.35vw,1.28rem)] !leading-[1.74] !text-[#ffffff] ![text-shadow:0_2px_14px_rgba(0,0,0,0.6)] !max-w-[860px] !mt-[1.4rem] !mx-auto !mb-0"
                    />
                    <div className="flex flex-wrap items-center justify-center gap-[0.85rem] mt-5 max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                      <button
                        type="button"
                        className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-transparent hover:!border-[#829b70] hover:!text-[#ffffff] hover:!backdrop-blur-[12px] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(0,0,0,0.24)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[rgba(255,255,255,0.12)] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                        onClick={() => handleCta(scene.primaryCta)}
                      >
                        {scene.primaryCta.label}
                      </button>
                      <button
                        type="button"
                        className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[rgba(255,255,255,0.16)] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] ![backdrop-filter:blur(14px)_saturate(140%)] !shadow-[0_8px_24px_rgba(0,0,0,0.16),inset_0_1px_1px_rgba(255,255,255,0.25)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[rgba(130,155,112,0.36)] hover:!border-[#829b70] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_12px_30px_rgba(0,0,0,0.26)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#829b70] active:!bg-[rgba(255,255,255,0.24)] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.2)] focus:!bg-[rgba(255,255,255,0.24)] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.2)] focus-visible:!bg-[rgba(255,255,255,0.24)] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.2)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                        onClick={() => handleCta(scene.secondaryCta)}
                      >
                        {scene.secondaryCta.label}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={scene.number === '15' ? 'gb-container-fluid gb-scene__container--fluid !w-full !max-w-full !p-0 !m-0' : scene.number === '05' || scene.number === '10' ? 'gb-container-fluid gb-scene__container--fluid' : `gb-container gb-scene__container ${scene.number === '03' ? 'relative h-full' : ''}`}>
                {/* SCENE 08: 13 LEARNING CENTRES */}
                {scene.number === '08' ? (
                  <div className="w-full">
                    <div className="max-w-[860px] mt-0 mx-auto mb-[0.85rem] text-center flex flex-col items-center">
                      <div className="!mb-8 text-center">
                        <h2 className="!font-[var(--font-display)] !font-bold !uppercase !tracking-[-0.02em] !leading-[1.14] !text-center !whitespace-nowrap !text-[clamp(2rem,3.4vw,3rem)] !mb-0 max-[580px]:!whitespace-normal">
                          <span className="!inline !text-[#132c20] !font-bold !uppercase">What will they </span>
                          <span className="!inline !text-[#7f9b68] !font-bold !uppercase">discover here?</span>
                        </h2>
                      </div>
                      <AnimatedCopy
                        text={scene.copy}
                        className="font-[var(--font-sans)] text-[1.02rem] leading-[1.72] !text-[#000000] max-w-[780px] mx-auto my-0 text-center"
                      />

                      {/* Buttons placed ABOVE the carousel images */}
                      <div className="flex flex-row !flex-nowrap justify-center items-center gap-5 mt-[0.85rem] mx-auto mb-0 opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    <div className="w-full" role="region" aria-label="13 Learning Centres carousel">
                      {/* TOP CONTROLS: MOVED ABOVE CAROUSEL TRACK WITH CRISP SVG ICONS */}
                      <div className="flex justify-end items-center gap-3 mt-0 mb-[0.45rem] w-full">
                        <button
                          type="button"
                          className="inline-grid w-12 h-12 place-items-center border-[1.5px] border-solid border-[#2d6643] rounded-full bg-[#ffffff] text-[#2d6643] cursor-pointer transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_4px_12px_rgba(45,102,67,0.1)] hover:enabled:border-[#2d6643] hover:enabled:!bg-[#2d6643] hover:enabled:!text-[#ffffff] hover:enabled:-translate-y-[2px] hover:enabled:shadow-[0_8px_22px_rgba(45,102,67,0.28)] active:border-[#2d6643] active:!bg-[#2d6643] active:!text-[#ffffff] active:-translate-y-[2px] active:shadow-[0_8px_22px_rgba(45,102,67,0.28)] disabled:cursor-not-allowed disabled:opacity-55 disabled:border-[rgba(19,44,32,0.16)] disabled:bg-[#fafbfa] disabled:text-[#5d7568] disabled:translate-y-0 disabled:shadow-none focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--gb-gold)] focus-visible:outline-offset-[3px] [&_svg]:block [&_svg]:stroke-current [&_svg]:transition-transform [&_svg]:duration-200"
                          onClick={() => scrollCentres(-1)}
                          disabled={!canScrollCentresBack}
                          aria-label="Previous learning centre"
                          aria-controls="learning-centres-carousel"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="inline-grid w-12 h-12 place-items-center border-[1.5px] border-solid border-[#2d6643] rounded-full bg-[#ffffff] text-[#2d6643] cursor-pointer transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_4px_12px_rgba(45,102,67,0.1)] hover:enabled:border-[#2d6643] hover:enabled:!bg-[#2d6643] hover:enabled:!text-[#ffffff] hover:enabled:-translate-y-[2px] hover:enabled:shadow-[0_8px_22px_rgba(45,102,67,0.28)] active:border-[#2d6643] active:!bg-[#2d6643] active:!text-[#ffffff] active:-translate-y-[2px] active:shadow-[0_8px_22px_rgba(45,102,67,0.28)] disabled:cursor-not-allowed disabled:opacity-55 disabled:border-[rgba(19,44,32,0.16)] disabled:bg-[#fafbfa] disabled:text-[#5d7568] disabled:translate-y-0 disabled:shadow-none focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--gb-gold)] focus-visible:outline-offset-[3px] [&_svg]:block [&_svg]:stroke-current [&_svg]:transition-transform [&_svg]:duration-200"
                          onClick={() => scrollCentres(1)}
                          disabled={!canScrollCentresForward}
                          aria-label="Next learning centre"
                          aria-controls="learning-centres-carousel"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </button>
                      </div>

                      <div
                        className="grid grid-flow-col auto-cols-[calc((100%-4rem)/5)] gap-4 overflow-x-auto overscroll-x-contain pt-1 px-0 pb-3 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--gb-gold)] focus-visible:outline-offset-[3px] max-[1200px]:auto-cols-[calc((100%-3rem)/4)] max-[900px]:auto-cols-[calc((100%-1.7rem)/3)] max-[900px]:gap-[0.85rem] max-[640px]:auto-cols-[calc((100%-0.75rem)/2)] max-[640px]:gap-3 max-[440px]:auto-cols-[82%]"
                        ref={centresCarouselRef}
                        id="learning-centres-carousel"
                        role="list"
                        aria-label="Learning centre cards"
                        tabIndex={0}
                      >
                        {THIRTEEN_CENTRES.map((centre, index) => (
                          <article
                            key={centre.num}
                            className="group relative min-w-0 min-h-[clamp(300px,24vw,360px)] max-[640px]:min-h-[290px] overflow-hidden rounded-[12px] bg-[var(--gb-forest)] border border-solid border-[rgba(19,44,32,0.2)] snap-start isolate opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 after:absolute after:z-[1] after:content-[''] after:inset-0 after:bg-[linear-gradient(180deg,rgba(19,44,32,0.02)_28%,rgba(19,44,32,0.3)_56%,rgba(19,44,32,0.92)_100%)] after:pointer-events-none"
                            role="listitem"
                            aria-label={`${index + 1} of ${THIRTEEN_CENTRES.length}: ${centre.name}`}
                          >
                            <img
                              className="absolute -z-[1] inset-0 w-full h-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                              src={centre.imageUrl}
                              alt={`${centre.name} learning centre`}
                              loading={index < 3 ? 'eager' : 'lazy'}
                              decoding="async"
                            />
                            <div className="absolute z-[2] right-[1.15rem] bottom-[1.15rem] left-[1.15rem] text-[#ffffff]">
                              <span className="inline-block mb-[0.35rem] text-[var(--gb-gold-light)] text-[0.75rem] font-bold tracking-[0.12em]">{centre.num}</span>
                              <h3 className="text-[#ffffff] text-[clamp(0.95rem,1.2vw,1.2rem)] font-bold tracking-[0.03em] uppercase leading-[1.25] text-balance m-0">{centre.name}</h3>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : scene.number === '02' ? (
                  <div className="w-full max-w-[1320px] mx-auto py-0 px-8 max-[640px]:!px-[1.15rem]">
                    <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(320px,0.95fr)] items-center gap-[clamp(2rem,4vw,3.5rem)] max-[800px]:grid-cols-1 max-[800px]:gap-9">
                      <div className="block !text-left !ml-0">
                        <div className="block !text-left !ml-0 !mb-8">
                          <h2 className="block !text-left !ml-0 !mb-0 !font-[var(--font-display)] text-[clamp(2.2rem,3.8vw,3.25rem)] !font-bold !uppercase !tracking-[-0.02em] !leading-[1.14]">
                            <span className="!block !text-left !ml-0 !text-[#132c20] !font-bold !uppercase">{scene.titleDark} </span>
                            <span className="!block !text-left !ml-0 !text-[#7f9b68] !font-bold !uppercase">{scene.titleGrey}</span>
                          </h2>
                        </div>
                        <AnimatedCopy
                          text={scene.copy}
                          className="block !text-left !ml-0 max-w-[620px] text-[clamp(0.98rem,1.15vw,1.1rem)] leading-[1.72] !text-[#000000] !mb-[clamp(1.75rem,2.5vw,2.25rem)]"
                        />

                        <div className="flex flex-wrap items-center !justify-start !ml-0 mt-0 gap-[0.85rem] opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                          <button
                            type="button"
                            className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                            onClick={() => handleCta(scene.primaryCta)}
                          >
                            {scene.primaryCta.label}
                          </button>
                          <button
                            type="button"
                            className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                            onClick={() => handleCta(scene.secondaryCta)}
                          >
                            {scene.secondaryCta.label}
                          </button>
                        </div>
                      </div>

                      <div
                        className="flex items-center justify-center gap-[clamp(0.65rem,1.3vw,1.1rem)] w-full max-w-[480px] mx-auto my-0 max-[800px]:max-w-[380px] max-[800px]:mt-4 max-[800px]:mx-auto max-[800px]:mb-0"
                        aria-label="Photo showcase of joyful GenBright children"
                      >
                        <div className="group relative overflow-hidden rounded-full bg-[#ebece6] border-[3px] border-solid border-[#ffffff] shadow-[0_16px_36px_rgba(19,44,32,0.12)] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),box-shadow_0.5s_ease] flex-1 h-[clamp(250px,23vw,310px)] max-[800px]:h-[250px] animate-[gbPillFloatLeft_6.5s_ease-in-out_infinite] hover:[animation-play-state:paused] hover:!-translate-y-[10px] hover:!scale-[1.03] hover:shadow-[0_28px_60px_rgba(19,44,32,0.24)] after:content-[''] after:absolute after:-top-1/2 after:-left-1/2 after:w-[200%] after:h-[200%] after:bg-[linear-gradient(60deg,transparent_42%,rgba(255,255,255,0.28)_50%,transparent_58%)] after:pointer-events-none after:animate-[gbShimmerSweep_8s_cubic-bezier(0.4,0,0.2,1)_infinite] after:z-[2]">
                          <img
                            src="/images/section-02-children.jpg"
                            alt="Joyful children smiling together"
                            className="block w-full h-full object-cover object-center [transition:transform_0.65s_cubic-bezier(0.22,1,0.36,1),filter_0.65s_ease] group-hover:scale-110 group-hover:brightness-[1.04]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="group relative overflow-hidden rounded-full bg-[#ebece6] border-[3px] border-solid border-[#ffffff] shadow-[0_20px_44px_rgba(19,44,32,0.16)] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),box-shadow_0.5s_ease] flex-[1.08] h-[clamp(310px,29vw,380px)] max-[800px]:h-[310px] z-[1] animate-[gbPillFloatCenter_7.5s_ease-in-out_infinite_0.5s] hover:[animation-play-state:paused] hover:!-translate-y-[10px] hover:!scale-[1.03] hover:shadow-[0_28px_60px_rgba(19,44,32,0.24)] after:content-[''] after:absolute after:-top-1/2 after:-left-1/2 after:w-[200%] after:h-[200%] after:bg-[linear-gradient(60deg,transparent_42%,rgba(255,255,255,0.28)_50%,transparent_58%)] after:pointer-events-none after:animate-[gbShimmerSweep_8s_cubic-bezier(0.4,0,0.2,1)_infinite] after:z-[2]">
                          <img
                            src="/images/joyful-children-outdoor.png"
                            alt="Children laughing and playing outdoors on green campus"
                            className="block w-full h-full object-cover object-center [transition:transform_0.65s_cubic-bezier(0.22,1,0.36,1),filter_0.65s_ease] group-hover:scale-110 group-hover:brightness-[1.04]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="group relative overflow-hidden rounded-full bg-[#ebece6] border-[3px] border-solid border-[#ffffff] shadow-[0_16px_36px_rgba(19,44,32,0.12)] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),box-shadow_0.5s_ease] flex-1 h-[clamp(250px,23vw,310px)] max-[800px]:h-[250px] animate-[gbPillFloatRight_8s_ease-in-out_infinite_1s] hover:[animation-play-state:paused] hover:!-translate-y-[10px] hover:!scale-[1.03] hover:shadow-[0_28px_60px_rgba(19,44,32,0.24)] after:content-[''] after:absolute after:-top-1/2 after:-left-1/2 after:w-[200%] after:h-[200%] after:bg-[linear-gradient(60deg,transparent_42%,rgba(255,255,255,0.28)_50%,transparent_58%)] after:pointer-events-none after:animate-[gbShimmerSweep_8s_cubic-bezier(0.4,0,0.2,1)_infinite] after:z-[2]">
                          <img
                            src="/images/happy-children.png"
                            alt="Children learning and having fun together"
                            className="block w-full h-full object-cover object-center [transition:transform_0.65s_cubic-bezier(0.22,1,0.36,1),filter_0.65s_ease] group-hover:scale-110 group-hover:brightness-[1.04]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '03' ? (
                  /* SCENE 03: WHAT IF THEY LEARN DIFFERENTLY? */
                  <div className="relative w-full max-w-[1280px] mx-auto my-0">
                    <div className="relative z-[1] max-w-[860px] mt-0 mx-auto mb-10 text-center">
                      <div className="!mb-8">
                        <h2 className="!mb-0 !font-[var(--font-display)] text-[clamp(2.1rem,3.35vw,3rem)] !font-bold !uppercase !tracking-[-0.02em] !leading-[1.14] text-center">
                          <span className="!block !text-[#132c20] !font-bold !uppercase">{scene.titleDark} </span>
                          <span className="!block !text-[#7f9b68] !font-bold !uppercase">{scene.titleGrey}</span>
                        </h2>
                      </div>
                      <AnimatedCopy
                        text={scene.copy}
                        className="max-w-[780px] mt-5 mx-auto mb-0 text-center text-[clamp(1rem,1.1vw,1.1rem)] leading-[1.75] !text-[#000000]"
                      />

                      {/* Buttons placed ABOVE the images */}
                      <div className="relative z-[6] flex flex-wrap justify-center items-center gap-[0.85rem] mt-5 mx-auto mb-0 opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    {/* Single parent div container wrapping all four images with sticky scroll interaction */}
                    <div className="sticky top-[80px] z-[5] w-full max-[768px]:top-[70px] [@media(max-height:520px)]:static">
                      <ul
                        className="grid grid-cols-4 gap-[clamp(1rem,2vw,1.5rem)] list-none items-stretch max-w-[1240px] mx-auto my-0 p-0 max-[1080px]:grid-cols-2 max-[1080px]:max-w-[720px] max-[560px]:grid-cols-2 max-[560px]:gap-3 max-[560px]:max-w-[440px] max-[560px]:mx-auto max-[560px]:my-0"
                        aria-label="Different ways children learn"
                      >
                        {LEARNER_PROFILES.map((profile, idx) => {
                          const delayClass =
                            idx === 0
                              ? '[.is-visible_&]:delay-[180ms]'
                              : idx === 1
                                ? '[.is-visible_&]:delay-[270ms]'
                                : idx === 2
                                  ? '[.is-visible_&]:delay-[360ms]'
                                  : '[.is-visible_&]:delay-[450ms]'
                          return (
                            <li
                              className={`group overflow-hidden bg-[#ffffff] border border-solid border-[rgba(19,44,32,0.12)] rounded-[18px] shadow-[0_10px_26px_rgba(19,44,32,0.06)] opacity-0 translate-y-6 [transition:opacity_0.6s_cubic-bezier(0.22,1,0.36,1),transform_0.6s_cubic-bezier(0.22,1,0.36,1),box-shadow_0.28s_cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 ${delayClass} hover:!-translate-y-1 hover:shadow-[0_18px_36px_rgba(19,44,32,0.12)]`}
                              key={profile.title}
                            >
                              <article className="h-full flex flex-col">
                                <img
                                  className="block w-full aspect-[4/5] object-cover bg-[#ebece6] transition-transform duration-500 ease-[ease] group-hover:scale-[1.04]"
                                  src={profile.imageUrl}
                                  alt={profile.imageAlt}
                                  loading="lazy"
                                  decoding="async"
                                />
                              </article>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                ) : scene.number === '04' ? (
                  /* SCENE 04: A WHOLE-CHILD PHILOSOPHY (GLASSMORPHISM OVERLAPPING CARDS MATCHING REFERENCE) */
                  <div className="w-full relative">
                    {/* TOP SPLIT: TEXT ON LEFT, WIDE NATURE PHOTO ON RIGHT */}
                    <div className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] gap-[clamp(2rem,3.8vw,3.75rem)] items-stretch relative max-[1024px]:grid-cols-1 max-[1024px]:gap-8">
                      <div className="flex flex-col justify-start pr-[clamp(0.5rem,1.5vw,1.5rem)] pt-2 pb-[clamp(3.25rem,4.5vw,4.75rem)] z-[2] min-w-0 box-border max-[1024px]:!pr-0 max-[1024px]:!pb-6 max-[1024px]:!w-full max-[1024px]:!min-w-0">
                        <h2 className="!font-[var(--font-display)] !text-[clamp(1.65rem,3.35vw,3.15rem)] !font-bold !leading-[1.14] !tracking-[-0.02em] !mt-0 !mx-0 !mb-8 !uppercase !break-words max-[768px]:!text-[clamp(1.4rem,5.5vw,2.1rem)] max-[768px]:!leading-[1.15]">
                          <span className="!text-[#132c20] !block !font-bold !uppercase !leading-[1.08] !m-0 !p-0 min-[901px]:!whitespace-nowrap max-[768px]:!whitespace-normal max-[768px]:!break-words">{scene.titleDark}</span>
                          <span className="!text-[#7f9b68] !block !font-bold !uppercase !leading-[1.08] !m-0 !p-0 !break-words max-[768px]:!whitespace-normal">{scene.titleGrey}</span>
                        </h2>

                        <AnimatedCopy
                          text={scene.copy}
                          className="text-[clamp(0.98rem,1.2vw,1.1rem)] leading-[1.72] !text-[#000000] mt-0 mx-0 mb-6 max-w-[580px]"
                        />

                        <div className="flex flex-row !flex-nowrap gap-3 items-center justify-start mt-6 w-full opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                          <button
                            type="button"
                            className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-3 !h-[52px] !py-0 !pr-2 !pl-[1.35rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.92rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-[38px] after:!h-[38px] after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:15px_15px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[1280px]:!h-[48px] max-[1280px]:!pl-4 max-[1280px]:!pr-1.5 max-[1280px]:!gap-2.5 max-[1280px]:!text-[0.86rem] max-[1280px]:after:!w-[34px] max-[1280px]:after:!h-[34px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                            onClick={() => handleCta(scene.primaryCta)}
                          >
                            {scene.primaryCta.label}
                          </button>
                          <button
                            type="button"
                            className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-3 !h-[52px] !py-0 !pr-2 !pl-[1.35rem] !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.92rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-[38px] after:!h-[38px] after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:15px_15px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[1280px]:!h-[48px] max-[1280px]:!pl-4 max-[1280px]:!pr-1.5 max-[1280px]:!gap-2.5 max-[1280px]:!text-[0.86rem] max-[1280px]:after:!w-[34px] max-[1280px]:after:!h-[34px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                            onClick={() => handleCta(scene.secondaryCta)}
                          >
                            {scene.secondaryCta.label}
                          </button>
                        </div>
                      </div>

                      <div className="w-full h-full relative flex flex-col">
                        <div className="group w-full h-full min-h-[clamp(420px,42vw,510px)] rounded-[24px] overflow-hidden shadow-[0_20px_48px_rgba(19,44,32,0.1),0_4px_14px_rgba(19,44,32,0.04)] bg-[#e4ece5] !border-none max-[1024px]:h-[340px] max-[640px]:h-[260px]">
                          <img
                            src="/images/section-04-whole-child.jpg"
                            alt="Children exploring, discovering and playing in nature at GenBright World School"
                            className="w-full h-full object-cover object-[center_30%] block transition-transform duration-400 ease-[ease] group-hover:scale-[1.02]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 4 CARDS: FIRST 2 ARE SOLID, ONLY LAST 2 ARE GLASSMORHPIC OVER IMAGE */}
                    <div
                      className="grid grid-cols-4 gap-[clamp(0.85rem,1.4vw,1.35rem)] w-[90%] mt-[clamp(-3rem,-2.5vw,-2rem)] mx-auto mb-0 relative z-10 max-[1024px]:grid-cols-2 max-[1024px]:-mt-10 max-[640px]:grid-cols-1 max-[640px]:mt-6"
                      aria-label="Four Pillars of Whole-Child Philosophy"
                    >
                      {FOUR_PILLARS_DATA.map((pillar, pIdx) => {
                        const variantClasses =
                          pIdx === 0
                            ? '!bg-[#ffffff]'
                            : pIdx === 1
                              ? '!bg-[#edede6]'
                              : pIdx === 2
                                ? '!bg-[#ffffff] !backdrop-blur-none hover:!bg-[linear-gradient(145deg,rgba(255,255,255,0.84)_0%,rgba(255,255,255,0.68)_100%)] hover:![backdrop-filter:blur(18px)_saturate(180%)]'
                                : '!bg-[#edede6] !backdrop-blur-none hover:!bg-[linear-gradient(145deg,rgba(237,237,230,0.88)_0%,rgba(237,237,230,0.72)_100%)] hover:![backdrop-filter:blur(18px)_saturate(180%)]'

                        return (
                          <div
                            key={pillar.key}
                            className={`group flex flex-col !border-[1.5px] !border-solid !border-[#adc09f] !rounded-[18px] py-[clamp(1.4rem,1.8vw,1.85rem)] px-[clamp(1.15rem,1.5vw,1.5rem)] !shadow-none [transition:transform_0.28s_cubic-bezier(0.22,1,0.36,1),border-color_0.28s_ease,background_0.28s_ease] hover:!-translate-y-2 hover:!border-[#7f9b68] hover:!shadow-none ${variantClasses}`}
                          >
                            <div className="!flex !items-center !justify-start !mb-[1.35rem] !w-full">
                              <div
                                className="!w-[46px] !h-[46px] !rounded-[12px] !bg-transparent !border-[1.5px] !border-solid !border-[#7f9b68] !flex !items-center !justify-center !text-[#132c20] !shadow-none ![transition:transform_0.24s_cubic-bezier(0.22,1,0.36,1),border-color_0.24s_ease] group-hover:!bg-transparent group-hover:!border-[#617b4e] group-hover:!text-[#132c20] group-hover:!-translate-y-[2px] [&_svg]:!w-[22px] [&_svg]:!h-[22px] [&_svg]:!stroke-[#132c20] [&_svg]:!text-[#132c20] [&_svg]:!block"
                                aria-hidden="true"
                              >
                                {renderConceptIcon(pillar.key)}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="font-[var(--font-sans)] text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[#5d7568] mb-[0.45rem]">{pillar.kicker}</div>
                              <h3 className="font-[var(--font-sans)] text-[clamp(1.6rem,2.1vw,2.1rem)] font-extrabold leading-[1.08] tracking-[-0.015em] text-[#132c20] mt-0 mx-0 mb-[0.85rem]">{pillar.title}</h3>
                              <p className="font-[var(--font-sans)] text-[0.92rem] leading-[1.62] !text-[#000000] m-0">{pillar.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : scene.number === '05' ? (
                  /* SCENE 05: ACADEMIC RIGOUR (50/50 DARK SPLIT DESIGN MATCHING USER REFERENCE) */
                  <div className="grid grid-cols-2 w-full max-w-full m-0 rounded-none shadow-none bg-[#162e22] items-stretch min-h-[clamp(520px,46vw,680px)] max-[960px]:grid-cols-1">
                    {/* LEFT FULL-HEIGHT CLASSROOM PHOTO */}
                    <div className="relative w-full h-full min-h-[520px] max-[960px]:min-h-[320px] max-[960px]:h-[340px] max-[640px]:min-h-[260px] max-[640px]:h-[260px]">
                      <img
                        src="/images/academically-prepared.png"
                        alt="Teacher and students engaged in learning in modern Cambridge classroom"
                        className="w-full h-full object-cover block"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* RIGHT DARK COLUMN */}
                    <div className="bg-[#162e22] py-[clamp(3rem,5.5vw,6rem)] px-[clamp(2.5rem,5vw,5.5rem)] flex flex-col justify-center text-left max-[640px]:!py-10 max-[640px]:!px-5">
                      <h2 className="!font-[var(--font-display)] !text-[clamp(2.3rem,4vw,3.35rem)] !font-bold !leading-[1.14] !tracking-[-0.02em] !uppercase !mt-0 !mx-0 !mb-5">
                        <span className="!text-[#ffffff] !font-bold !uppercase">WILL THEY BE</span><br />
                        <span className="!block !text-[var(--gb-gold-light,#f2c94c)] !font-bold !uppercase">ACADEMICALLY PREPARED?</span>
                      </h2>

                      <p className="font-[var(--font-sans)] !text-[clamp(0.94rem,1.05vw,1.04rem)] !leading-[1.7] !text-[rgba(255,255,255,0.88)] !mt-0 !mx-0 !mb-8 max-w-[520px]">
                        {scene.copy}
                      </p>

                      <div className="flex flex-row !flex-nowrap items-center gap-3 mt-5 opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-3 !h-[52px] !py-0 !pr-2 !pl-[1.35rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.92rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-[38px] after:!h-[38px] after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:15px_15px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[1400px]:!h-[48px] max-[1400px]:!pl-4 max-[1400px]:!pr-1.5 max-[1400px]:!gap-2 max-[1400px]:!text-[0.85rem] max-[1400px]:after:!w-[34px] max-[1400px]:after:!h-[34px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-3 !h-[52px] !py-0 !pr-2 !pl-[1.35rem] !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.92rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-[38px] after:!h-[38px] after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:15px_15px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[1400px]:!h-[48px] max-[1400px]:!pl-4 max-[1400px]:!pr-1.5 max-[1400px]:!gap-2 max-[1400px]:!text-[0.85rem] max-[1400px]:after:!w-[34px] max-[1400px]:after:!h-[34px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '06' ? (
                  /* SCENE 06: CAMPUS & CHILDHOOD — NORMAL IMAGE SHAPE, STRICTLY SPECIFIED CONTENT */
                  <div className="grid grid-cols-[minmax(360px,1.05fr)_minmax(320px,0.95fr)] gap-[clamp(2.5rem,5vw,4.5rem)] items-center relative p-0 w-full max-[900px]:grid-cols-1 max-[900px]:gap-9">
                    {/* LEFT CONTENT COLUMN: STRICTLY TITLE, BODY COPY, AND CTAS */}
                    <div className="flex flex-col items-start text-left min-w-0">
                      <h2 className="font-[var(--font-display)] text-[clamp(2.3rem,4vw,3.45rem)] font-bold leading-[1.15] tracking-[-0.025em] uppercase mt-0 mx-0 !mb-8">
                        <span className="text-[#132c20]">{scene.titleDark} </span>
                        <span className="!text-[#7f9b68]">{scene.titleGrey}</span>
                      </h2>

                      <AnimatedCopy
                        text={scene.copy}
                        className="font-[var(--font-sans)] text-[clamp(0.98rem,1.12vw,1.08rem)] leading-[1.76] !text-[#000000] mt-0 mx-0 mb-8 max-w-[560px] text-left"
                      />

                      <div className="flex flex-row !flex-nowrap gap-3 items-center mt-5 opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[1100px]:!h-[48px] max-[1100px]:!pl-4 max-[1100px]:!pr-1.5 max-[1100px]:!gap-2.5 max-[1100px]:!text-[0.88rem] max-[1100px]:after:!w-[34px] max-[1100px]:after:!h-[34px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[1100px]:!h-[48px] max-[1100px]:!pl-4 max-[1100px]:!pr-1.5 max-[1100px]:!gap-2.5 max-[1100px]:!text-[0.88rem] max-[1100px]:after:!w-[34px] max-[1100px]:after:!h-[34px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: PREVIOUS ARCH SHAPED IMAGE STYLE WITH SLIDING CAROUSEL */}
                    <div className="relative w-full flex justify-center">
                      <div
                        className="group w-full max-w-[520px] h-[clamp(380px,42vw,500px)] rounded-tr-[clamp(140px,18vw,220px)] rounded-bl-[clamp(45px,6vw,85px)] rounded-tl-[14px] rounded-br-[14px] overflow-hidden shadow-[0_20px_48px_rgba(19,44,32,0.1)] bg-[#f4f6f4] relative max-[900px]:max-w-full max-[900px]:h-[clamp(280px,52vw,400px)]"
                        role="region"
                        aria-label="Campus photos carousel"
                        onMouseEnter={() => setIsCampusPaused(true)}
                        onMouseLeave={() => setIsCampusPaused(false)}
                      >
                        <div
                          className="flex w-full h-full transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                          style={{ transform: `translateX(-${campusSlideIndex * 100}%)` }}
                        >
                          {CAMPUS_SLIDESHOW.map((slide, idx) => (
                            <div key={slide.id} className="flex-[0_0_100%] w-full h-full relative overflow-hidden">
                              <img
                                src={slide.imageUrl}
                                alt={slide.alt}
                                className="w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                                loading={idx === 0 ? 'eager' : 'lazy'}
                                decoding="async"
                              />
                            </div>
                          ))}
                        </div>

                        {/* SLIDER NAVIGATION ARROWS */}
                        <button
                          type="button"
                          className="absolute top-1/2 left-[14px] -translate-y-1/2 w-[42px] h-[42px] rounded-full bg-[rgba(255,255,255,0.92)] backdrop-blur-[8px] border-[1.5px] border-solid border-[rgba(19,44,32,0.14)] text-[#132c20] grid place-items-center cursor-pointer z-10 transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_4px_14px_rgba(0,0,0,0.16)] p-0 hover:bg-[#132c20] hover:text-[#ffffff] hover:border-[#132c20] hover:-translate-y-1/2 hover:scale-[1.08] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
                          onClick={handlePrevCampusSlide}
                          aria-label="Previous campus photo"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="absolute top-1/2 right-[14px] -translate-y-1/2 w-[42px] h-[42px] rounded-full bg-[rgba(255,255,255,0.92)] backdrop-blur-[8px] border-[1.5px] border-solid border-[rgba(19,44,32,0.14)] text-[#132c20] grid place-items-center cursor-pointer z-10 transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_4px_14px_rgba(0,0,0,0.16)] p-0 hover:bg-[#132c20] hover:text-[#ffffff] hover:border-[#132c20] hover:-translate-y-1/2 hover:scale-[1.08] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
                          onClick={handleNextCampusSlide}
                          aria-label="Next campus photo"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>

                        {/* SLIDER DOTS */}
                        <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 flex items-center gap-[6px] z-10 py-1 px-[10px] bg-[rgba(19,44,32,0.45)] backdrop-blur-[8px] rounded-full border border-solid border-[rgba(255,255,255,0.2)]" aria-label="Campus photo indicators">
                          {CAMPUS_SLIDESHOW.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              className={`h-[7px] rounded-full border-0 cursor-pointer transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] p-0 ${dotIdx === campusSlideIndex ? 'w-[22px] bg-[#ffffff]' : 'w-[7px] bg-[rgba(255,255,255,0.5)]'}`}
                              onClick={() => setCampusSlideIndex(dotIdx)}
                              aria-label={`Go to slide ${dotIdx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '07' ? (
                  /* SCENE 07: WHO ARE THE PEOPLE BEHIND THIS SCHOOL (5-IMAGE SLIDING CAROUSEL WITH NAME, DESIGNATION & NUMBER BESIDE TEXT) */
                  <div className="grid grid-cols-[minmax(320px,0.95fr)_minmax(0,1.15fr)] gap-[clamp(2.5rem,5vw,4.5rem)] items-center max-w-[1220px] mx-auto my-0 max-[900px]:grid-cols-1 max-[900px]:gap-9">
                    {/* LEFT 5-IMAGE SLIDING CAROUSEL */}
                    <div
                      className="w-full aspect-[4/4.8] max-w-[500px] relative"
                      aria-label="People behind this school carousel"
                      onMouseEnter={() => setIsLeaderPaused(true)}
                      onMouseLeave={() => setIsLeaderPaused(false)}
                    >
                      <div className="relative w-full h-full rounded-[24px] overflow-hidden shadow-[0_20px_48px_rgba(19,44,32,0.14)] border border-solid border-[rgba(19,44,32,0.08)] bg-[#132c20]">
                        <div
                          className="flex w-full h-full transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                          style={{ transform: `translateX(-${leaderSlideIndex * 100}%)` }}
                        >
                          {FOUNDERS_AND_LEADERS.map((leader, idx) => (
                            <div key={leader.id} className="group flex-[0_0_100%] w-full h-full relative overflow-hidden">
                              <img
                                src={leader.imageUrl}
                                alt={leader.imageAlt}
                                className="w-full h-full object-cover object-[center_top] block transition-transform duration-[600ms] ease-[ease] group-hover:scale-[1.03]"
                                loading={idx === 0 ? 'eager' : 'lazy'}
                                decoding="async"
                              />
                              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,28,18,0.3)_0%,transparent_38%,rgba(10,28,18,0.72)_72%,rgba(10,28,18,0.95)_100%)] pointer-events-none z-[1]" />

                              {/* Bottom Name & Designation Panel with Number Beside Text in Corner */}
                              <div className="absolute bottom-0 left-0 right-0 pt-6 px-[1.6rem] pb-[3.2rem] z-[2] text-left">
                                <div className="flex items-center justify-between gap-4 mb-[0.35rem]">
                                  <span className="block font-[var(--font-sans)] text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--gb-gold-light,#f2c94c)] mb-0">PEOPLE BEHIND THIS SCHOOL</span>
                                  <div className="static bg-[rgba(19,44,32,0.75)] backdrop-blur-[8px] border border-solid border-[rgba(255,255,255,0.22)] text-[#ffffff] py-[3px] px-[10px] rounded-full font-[var(--font-display)] text-[0.8rem] tracking-[0.06em] font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.2)] shrink-0 translate-y-[10px]">
                                    <span className="text-[var(--gb-gold-light,#f2c94c)] font-bold">{leader.num}</span>
                                    <span className="mx-1 my-0 opacity-60">/</span>
                                    <span className="opacity-85">05</span>
                                  </div>
                                </div>
                                <h3 className="!font-[var(--font-display)] !text-[clamp(1.4rem,1.8vw,1.75rem)] !font-bold !text-[#ffffff] !mt-0 !mx-0 !mb-[0.35rem] !leading-[1.18] [text-shadow:0_2px_8px_rgba(0,0,0,0.4)] !uppercase">{leader.name}</h3>
                                <p className="!font-[var(--font-sans)] !text-[0.88rem] !leading-[1.4] !text-[rgba(255,255,255,0.9)] !m-0">{leader.designation}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Carousel Dots Navigation (Buttons hidden as requested, smooth auto-sliding active) */}
                        <div className="absolute bottom-[14px] left-0 right-0 flex items-center justify-center z-[5]">
                          <div className="flex gap-[6px] items-center" role="tablist">
                            {FOUNDERS_AND_LEADERS.map((l, dIdx) => (
                              <button
                                key={l.id}
                                type="button"
                                className={`h-2 rounded-full border-0 cursor-pointer transition-all duration-[250ms] ease-[ease] p-0 ${dIdx === leaderSlideIndex ? 'w-6 bg-[var(--gb-gold-light,#f2c94c)]' : 'w-2 bg-[rgba(255,255,255,0.45)]'}`}
                                onClick={() => setLeaderSlideIndex(dIdx)}
                                aria-label={`View ${l.name}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="flex flex-col min-w-0">
                      <h2 className="!font-[var(--font-display)] text-[clamp(2.3rem,4vw,3.35rem)] !font-bold !leading-[1.14] !tracking-[-0.02em] !uppercase text-[#132c20] mt-0 mx-0 !mb-8">
                        <span className="!block !text-[#132c20] !font-bold !uppercase">Who are the people</span>{' '}
                        <span className="!block !text-[#7f9b68] !font-bold !uppercase">behind this school?</span>
                      </h2>

                      <p className="font-[var(--font-sans)] text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] !text-[#000000] mt-0 mx-0 mb-8 max-w-[580px]">
                        {scene.copy}
                      </p>

                      {/* 3 Metric Columns matching user reference (17 / 85 / 537 style) */}
                      <div className="flex gap-[clamp(1.75rem,3.5vw,3.25rem)] mb-9 py-5 px-0 border-0 border-t border-b border-solid border-[rgba(19,44,32,0.1)] max-[480px]:gap-4" aria-label="Key school heritage metrics">
                        <div>
                          <strong className="block font-[var(--font-display)] text-[clamp(2.95rem,4.4vw,3.8rem)] max-[480px]:text-[2.2rem] font-extrabold leading-none text-[#132c20] mb-[0.35rem]">35+</strong>
                          <span className="block font-[var(--font-sans)] text-[0.82rem] font-semibold text-[#718277] leading-[1.3]">Years Experience</span>
                        </div>
                        <div>
                          <strong className="block font-[var(--font-display)] text-[clamp(2.95rem,4.4vw,3.8rem)] max-[480px]:text-[2.2rem] font-extrabold leading-none text-[#132c20] mb-[0.35rem]">5</strong>
                          <span className="block font-[var(--font-sans)] text-[0.82rem] font-semibold text-[#718277] leading-[1.3]">Chennai Schools</span>
                        </div>
                        <div>
                          <strong className="block font-[var(--font-display)] text-[clamp(2.95rem,4.4vw,3.8rem)] max-[480px]:text-[2.2rem] font-extrabold leading-none text-[#132c20] mb-[0.35rem]">15+</strong>
                          <span className="block font-[var(--font-sans)] text-[0.82rem] font-semibold text-[#718277] leading-[1.3]">Years Mentorship</span>
                        </div>
                      </div>

                      <div className="flex flex-row !flex-nowrap gap-3 items-center mt-5 opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[1100px]:!h-[48px] max-[1100px]:!pl-4 max-[1100px]:!pr-1.5 max-[1100px]:!gap-2.5 max-[1100px]:!text-[0.88rem] max-[1100px]:after:!w-[34px] max-[1100px]:after:!h-[34px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[1100px]:!h-[48px] max-[1100px]:!pl-4 max-[1100px]:!pr-1.5 max-[1100px]:!gap-2.5 max-[1100px]:!text-[0.88rem] max-[1100px]:after:!w-[34px] max-[1100px]:after:!h-[34px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '09' ? (
                  /* SCENE 09: CHILDHOOD IN MOTION (5-IMAGE MOSAIC MATCHING USER REFERENCE: 1 BIG ON LEFT, 2X2 ON RIGHT) */
                  <div className="w-full max-w-[1240px] mx-auto my-0">
                    {/* Header Stack: Title + Copy + CTA Buttons placed ABOVE gallery */}
                    <div className="!mt-0 !mx-auto !mb-[clamp(1.75rem,3vw,2.5rem)] !max-w-[780px] !text-center">
                      <h2 className="!font-[var(--font-display)] text-[clamp(2.3rem,4.2vw,3.55rem)] !font-bold !leading-[1.14] !tracking-[-0.02em] !uppercase text-[#132c20] !text-center !mt-0 !mx-auto !mb-4 !block !whitespace-nowrap max-[600px]:!whitespace-normal">
                        <span className="!inline !text-[#132c20] !font-bold !uppercase">Childhood</span>{' '}
                        <span className="!inline !text-[#7f9b68] !font-bold !uppercase">in Motion</span>
                      </h2>
                      <p className="font-[var(--font-sans)] text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.68] !text-[#000000] !mt-0 !mx-auto !mb-6 !text-center !max-w-[680px]">
                        {scene.copy}
                      </p>

                      <div className="flex flex-row !flex-nowrap gap-[0.85rem] items-center !justify-center !mt-5 !mx-auto !mb-0 opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    {/* 5-Image Mosaic Grid matching reference (1 Big on Left, 2x2 on Right, badge pills removed as requested) */}
                    <div className="grid grid-cols-[minmax(320px,1fr)_minmax(0,1.15fr)] gap-[clamp(0.85rem,1.5vw,1.25rem)] h-[clamp(520px,46vw,620px)] max-w-[1160px] mx-auto my-0 w-full max-[900px]:grid-cols-1 max-[900px]:h-auto" aria-label="Childhood in Motion Gallery">
                      {/* Left Big Card */}
                      <div className="group relative rounded-[20px] overflow-hidden bg-[#f4f6f3] !border-none shadow-[0_12px_32px_rgba(19,44,32,0.06)] h-full w-full max-[900px]:h-[380px]">
                        <img
                          src={CHILDHOOD_MOTION_GALLERY[0].imageUrl}
                          alt={CHILDHOOD_MOTION_GALLERY[0].imageAlt}
                          className="w-full h-full object-cover object-[center_bottom] block transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* Right 2x2 Subgrid */}
                      <div className="grid grid-cols-2 grid-rows-2 gap-[clamp(0.85rem,1.5vw,1.25rem)] h-full w-full max-[900px]:h-[520px] max-[580px]:grid-cols-1 max-[580px]:grid-rows-[auto] max-[580px]:h-auto">
                        {CHILDHOOD_MOTION_GALLERY.slice(1).map((item, sIdx) => {
                          const objPos =
                            sIdx === 1
                              ? 'object-[center_top]'
                              : sIdx === 3
                                ? 'object-[center_25%]'
                                : 'object-center'
                          return (
                            <div key={item.id} className="group relative rounded-[20px] overflow-hidden bg-[#f4f6f3] !border-none shadow-[0_12px_32px_rgba(19,44,32,0.06)] h-full w-full max-[580px]:h-[240px]">
                              <img
                                src={item.imageUrl}
                                alt={item.imageAlt}
                                className={`w-full h-full object-cover ${objPos} block transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105`}
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ) : scene.number === '10' ? (
                  /* SCENE 10: FULL-WIDTH NEWS & HAPPENINGS BANNER */
                  <div className="!w-full !max-w-full !m-0">
                    <div className="relative !w-full !max-w-full !rounded-none !border-x-0 !shadow-none border-t border-b border-solid border-[rgba(255,255,255,0.1)] bg-[linear-gradient(105deg,rgba(10,28,18,0.94)_0%,rgba(13,36,22,0.88)_46%,rgba(16,44,28,0.68)_75%,rgba(12,34,20,0.45)_100%),url('/images/section-10-growing-bg.jpg')] bg-cover bg-[center_right] bg-no-repeat py-[clamp(3.5rem,5.5vw,5.5rem)] px-[clamp(2rem,5vw,5rem)] max-[900px]:py-12 max-[900px]:px-7 max-[900px]:bg-[linear-gradient(180deg,rgba(10,28,18,0.96)_0%,rgba(13,36,22,0.90)_65%,rgba(16,44,28,0.65)_100%),url('/images/section-10-growing-bg.jpg')]">
                      <div className="max-w-[1320px] mx-auto my-0 grid grid-cols-[1fr_auto] items-center gap-[clamp(2rem,4vw,3.5rem)] max-[900px]:grid-cols-1 max-[900px]:gap-8">
                        <div className="min-w-0">
                          <h2 className="!font-[var(--font-display)] !text-[clamp(1.95rem,2.9vw,2.8rem)] !font-bold !leading-[1.14] !tracking-[-0.02em] !uppercase mb-5 mt-0 mx-0">
                            <span className="!text-[#ffffff] !font-bold !uppercase">{scene.titleDark} </span>
                            <span className="!block !text-[#7f9b68] !font-bold !uppercase">{scene.titleGrey}</span>
                          </h2>
                          <AnimatedCopy
                            text={scene.copy}
                            className="font-[var(--font-sans)] !text-[1.02rem] !leading-[1.72] !text-[rgba(255,255,255,0.92)] max-w-[620px] m-0"
                          />
                        </div>

                        <div className="flex justify-end items-center shrink-0 min-w-max max-[900px]:justify-start max-[768px]:!min-w-0 max-[768px]:!w-full">
                          <div className="flex flex-row !flex-nowrap gap-3 items-center justify-end mt-5 opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[900px]:justify-start max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                            <button
                              type="button"
                              className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[52px] !py-0 !pr-2 !pl-[1.4rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[rgba(255,255,255,0.4)] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.94rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[1200px]:!h-[48px] max-[1200px]:!pl-4 max-[1200px]:!pr-1.5 max-[1200px]:!gap-2.5 max-[1200px]:!text-[0.88rem] max-[1200px]:after:!w-[34px] max-[1200px]:after:!h-[34px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                              onClick={() => handleCta(scene.primaryCta)}
                            >
                              {scene.primaryCta.label}
                            </button>
                            <button
                              type="button"
                              className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[52px] !py-0 !pr-2 !pl-[1.4rem] !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.94rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[1200px]:!h-[48px] max-[1200px]:!pl-4 max-[1200px]:!pr-1.5 max-[1200px]:!gap-2.5 max-[1200px]:!text-[0.88rem] max-[1200px]:after:!w-[34px] max-[1200px]:after:!h-[34px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                              onClick={() => handleCta(scene.secondaryCta)}
                            >
                              {scene.secondaryCta.label}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '11' ? (
                  /* SCENE 11: GENBRIGHT LITTLE CIRCLE (EXACT 4-IMAGE PINWHEEL COLLAGE MATCHING USER REFERENCE) */
                  <div className="w-full max-w-[1240px] mx-auto my-0 relative pt-4 px-0 pb-8">
                    <div className="relative w-full max-w-[1120px] mx-auto my-0 min-h-[680px] h-[clamp(640px,58vw,720px)] max-[900px]:h-auto max-[900px]:min-h-0 max-[900px]:grid max-[900px]:grid-cols-2 max-[900px]:gap-4 max-[580px]:grid-cols-1">
                      {/* TOP-LEFT IMAGE: EARLY-YEARS READING & WONDER */}
                      <div className="group absolute top-0 left-0 w-[clamp(280px,32vw,370px)] h-[clamp(280px,31vw,350px)] z-[1] border-0 rounded-[16px] overflow-hidden shadow-[0_16px_36px_rgba(19,44,32,0.08),0_4px_12px_rgba(19,44,32,0.04)] bg-[#f4f6f3] transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] max-[900px]:static max-[900px]:w-full max-[900px]:h-[180px] max-[900px]:order-2 max-[580px]:h-[200px]">
                        <img
                          src="/images/girl.png"
                          alt="Young child exploring creativity through outdoor painting"
                          className="w-full h-full object-cover object-[center_top] block transition-transform duration-400 ease-[ease] group-hover:scale-[1.04]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* TOP-RIGHT IMAGE: MONTESSORI SENSORY LEARNING & BLOCKS */}
                      <div className="group absolute top-0 right-0 w-[clamp(290px,33vw,385px)] h-[clamp(290px,32vw,365px)] z-[15] rounded-[18px] overflow-hidden shadow-[0_24px_50px_rgba(19,44,32,0.22),0_6px_18px_rgba(19,44,32,0.12)] border-[3px] border-solid border-[rgba(255,255,255,0.95)] bg-[#f4f6f3] transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] max-[900px]:static max-[900px]:w-full max-[900px]:h-[180px] max-[900px]:order-2 max-[580px]:h-[200px]">
                        <img
                          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85"
                          alt="Preschool discovery with hands-on early learning sensory blocks and materials"
                          className="w-full h-full object-cover object-center block transition-transform duration-400 ease-[ease] group-hover:scale-[1.04]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* BOTTOM-LEFT IMAGE: NURTURING EDUCATORS & PRESCHOOL CIRCLE */}
                      <div className="group absolute bottom-0 left-0 w-[clamp(280px,32vw,370px)] h-[clamp(280px,31vw,350px)] z-[1] rounded-[16px] overflow-hidden shadow-[0_16px_36px_rgba(19,44,32,0.08),0_4px_12px_rgba(19,44,32,0.04)] bg-[#f4f6f3] transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] max-[900px]:static max-[900px]:w-full max-[900px]:h-[180px] max-[900px]:order-2 max-[580px]:h-[200px]">
                        <img
                          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85"
                          alt="Early childhood educators nurturing toddlers and young learners"
                          className="w-full h-full object-cover object-center block transition-transform duration-400 ease-[ease] group-hover:scale-[1.04]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* BOTTOM-RIGHT IMAGE: JOYFUL OUTDOOR NATURE PLAY & FRIENDSHIP */}
                      <div className="group absolute bottom-0 right-0 w-[clamp(360px,44vw,510px)] h-[clamp(280px,31vw,350px)] z-[1] rounded-[16px] overflow-hidden shadow-[0_16px_36px_rgba(19,44,32,0.08),0_4px_12px_rgba(19,44,32,0.04)] bg-[#f4f6f3] transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] max-[900px]:static max-[900px]:w-full max-[900px]:h-[180px] max-[900px]:order-2 max-[580px]:h-[200px]">
                        <img
                          src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=85"
                          alt="Preschool children playing happily together outdoors across green lawns"
                          className="w-full h-full object-cover object-center block transition-transform duration-400 ease-[ease] group-hover:scale-[1.04]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* CENTER OVERLAPPING WHITE CONTENT CARD */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[clamp(450px,56vw,650px)] !bg-[#ffffff] !backdrop-blur-none !border !border-solid !border-[rgba(19,44,32,0.1)] rounded-[24px] p-[clamp(2.2rem,3.4vw,3.5rem)] !shadow-[0_20px_50px_rgba(19,44,32,0.12),0_4px_14px_rgba(19,44,32,0.04)] flex flex-col text-left max-[900px]:static max-[900px]:translate-x-0 max-[900px]:translate-y-0 max-[900px]:w-full max-[900px]:col-span-full max-[900px]:order-1 max-[900px]:py-8 max-[900px]:px-7 max-[580px]:!py-7 max-[580px]:!px-[1.15rem]">
                        <h2 className="!font-[var(--font-display)] !text-[clamp(1.95rem,2.75vw,2.6rem)] !font-bold !leading-[1.15] !tracking-[-0.02em] !uppercase !mt-0 !mx-0 !mb-2 max-w-[480px]">
                          <span className="!block !text-[#132c20] !font-bold !uppercase">{scene.titleDark}</span>
                          <span className="!block !text-[#7f9b68] !font-bold !uppercase">{scene.titleGrey}</span>
                        </h2>

                        <p className="inline-block font-[var(--font-sans)] text-[0.84rem] italic text-[#556b5e] mt-0 mx-0 mb-5 pb-[0.45rem] border-0 border-b-[1.5px] border-solid border-[rgba(127,155,104,0.35)] tracking-[0.02em] w-fit">Preschool Partnership Alliance · GenBright</p>

                        <p className="font-[var(--font-sans)] text-[clamp(0.92rem,1.1vw,1.02rem)] leading-[1.7] !text-[#000000] mt-0 mx-0 mb-[1.85rem] max-w-[480px]">{scene.copy}</p>

                        <div className="flex flex-row !flex-nowrap gap-2.5 items-center mt-5 w-full opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                          <button
                            type="button"
                            className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-2.5 !h-[50px] !py-0 !pr-1.5 !pl-4 !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.88rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-9 after:!h-9 after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:15px_15px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[1280px]:!h-[46px] max-[1280px]:!pl-3.5 max-[1280px]:!pr-1.5 max-[1280px]:!gap-2 max-[1280px]:!text-[0.8rem] max-[1280px]:after:!w-8 max-[1280px]:after:!h-8 max-[900px]:!h-[50px] max-[900px]:!pl-5 max-[900px]:!pr-2 max-[900px]:!gap-3 max-[900px]:!text-[0.9rem] max-[900px]:after:!w-9 max-[900px]:after:!h-9 max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                            onClick={() => handleCta(scene.primaryCta)}
                          >
                            {scene.primaryCta.label}
                          </button>
                          <button
                            type="button"
                            className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-2.5 !h-[50px] !py-0 !pr-1.5 !pl-4 !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.88rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-9 after:!h-9 after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:15px_15px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[1280px]:!h-[46px] max-[1280px]:!pl-3.5 max-[1280px]:!pr-1.5 max-[1280px]:!gap-2 max-[1280px]:!text-[0.8rem] max-[1280px]:after:!w-8 max-[1280px]:after:!h-8 max-[900px]:!h-[50px] max-[900px]:!pl-5 max-[900px]:!pr-2 max-[900px]:!gap-3 max-[900px]:!text-[0.9rem] max-[900px]:after:!w-9 max-[900px]:after:!h-9 max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                            onClick={() => handleCta(scene.secondaryCta)}
                          >
                            {scene.secondaryCta.label}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '12' ? (
                  /* SCENE 12: IT TAKES A COMMUNITY — OVERLAPPING DARK CARD & IMAGE LAYOUT MATCHING USER REFERENCE */
                  <div className="relative w-full max-w-[1260px] mx-auto my-0 min-h-[520px] flex items-center justify-end py-8 pr-[55px] pl-0 max-[1080px]:pr-0 max-[860px]:flex-col max-[860px]:items-stretch max-[860px]:min-h-0 max-[860px]:py-4 max-[860px]:px-0">
                    {/* Overlapping Dark Content Card (Left) */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[clamp(500px,48vw,610px)] bg-[#1c3629] rounded-[6px] py-[clamp(2rem,3.2vw,2.85rem)] px-[clamp(2.4rem,3.6vw,3.5rem)] shadow-[0_24px_60px_rgba(10,24,17,0.32)] z-10 flex flex-col text-left max-[860px]:relative max-[860px]:top-auto max-[860px]:left-auto max-[860px]:translate-y-0 max-[860px]:w-full max-[860px]:order-2 max-[860px]:-mt-[30px] max-[860px]:pt-9 max-[860px]:px-7 max-[860px]:pb-[4.5rem] max-[580px]:!pt-7 max-[580px]:!px-[1.15rem] max-[580px]:!pb-[4.5rem]">
                      <h2 className="!font-[var(--font-display)] !text-[clamp(1.75rem,2.3vw,2.35rem)] !font-bold !leading-[1.15] !tracking-[-0.02em] !uppercase !mt-0 !mx-0 !mb-[0.85rem] max-w-[480px]">
                        <span className="!block !text-[#ffffff]">{scene.titleDark}</span>{' '}
                        <span className="!block !text-[var(--gb-gold-light,#f2c94c)]">{scene.titleGrey}</span>
                      </h2>

                      <p className="!font-[var(--font-sans)] !text-[clamp(0.88rem,0.98vw,0.96rem)] !leading-[1.65] !text-[rgba(255,255,255,0.88)] !mt-0 !mx-0 !mb-5 !max-w-[460px]">
                        {scene.copy}
                      </p>

                      <div className="flex flex-row !flex-nowrap items-center gap-3 mt-5 opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[1150px]:gap-2 max-[860px]:gap-3.5 max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-2.5 !h-[46px] !py-0 !pr-1.5 !pl-4 !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.85rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-[34px] after:!h-[34px] after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:15px_15px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[1150px]:!h-[42px] max-[1150px]:!pl-3.5 max-[1150px]:!pr-1 max-[1150px]:!gap-2 max-[1150px]:!text-[0.78rem] max-[1150px]:after:!w-8 max-[1150px]:after:!h-8 max-[860px]:!h-[50px] max-[860px]:!pl-5 max-[860px]:!pr-2 max-[860px]:!gap-3.5 max-[860px]:!text-[0.9rem] max-[860px]:after:!w-9 max-[860px]:after:!h-9 max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-2.5 !h-[46px] !py-0 !pr-1.5 !pl-4 !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.85rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-[34px] after:!h-[34px] after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:15px_15px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[1150px]:!h-[42px] max-[1150px]:!pl-3.5 max-[1150px]:!pr-1 max-[1150px]:!gap-2 max-[1150px]:!text-[0.78rem] max-[1150px]:after:!w-8 max-[1150px]:after:!h-8 max-[860px]:!h-[50px] max-[860px]:!pl-5 max-[860px]:!pr-2 max-[860px]:!gap-3.5 max-[860px]:!text-[0.9rem] max-[860px]:after:!w-9 max-[860px]:after:!h-9 max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    {/* Main Photo Outer Container with Underlapping Wireframe Box */}
                    <div className="relative w-[82%] z-[2] max-[1080px]:w-[74%] max-[860px]:w-full max-[860px]:order-1">
                      {/* Decorative Wireframe Box tucked directly behind photo bottom-left corner */}
                      <div className="absolute -left-8 -bottom-8 w-[82px] h-[82px] border-2 border-solid border-[rgba(28,54,41,0.42)] rounded-[2px] z-[1] pointer-events-none max-[860px]:hidden" aria-hidden="true" />

                      {/* Main Featured Photo (Single image, no multi-image carousel) */}
                      <div className="relative w-full h-[clamp(440px,42vw,550px)] rounded-[6px] overflow-hidden shadow-[0_16px_45px_rgba(19,44,32,0.12)] bg-[#ebece6] z-[2] max-[860px]:h-[320px] max-[580px]:h-[240px]">
                        <img
                          src={COMMUNITY_IMAGE.imageUrl}
                          alt={COMMUNITY_IMAGE.alt}
                          className="w-full h-full object-cover object-center block"
                          loading="eager"
                          decoding="async"
                        />

                        {/* Overlapping Bottom-Right Dark Button with Down Arrow */}
                        <button
                          type="button"
                          className="absolute right-0 bottom-0 w-[76px] h-[70px] bg-[#1c3629] rounded-tl-[10px] rounded-br-[6px] border-0 text-[#ffffff] grid place-items-center cursor-pointer [transition:background_0.24s_ease,transform_0.24s_ease] z-[5] shadow-[-4px_-4px_16px_rgba(0,0,0,0.15)] hover:bg-[#274d3a] hover:-translate-y-0.5 max-[580px]:!w-[60px] max-[580px]:!h-[54px]"
                          onClick={() => onScrollTo('scene-13')}
                          aria-label="Scroll to next chapter"
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <polyline points="19 12 12 19 5 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '13' ? (
                  /* SCENE 13: WHAT IF TEACHING COULD BE A JOURNEY OF DISCOVERY, TOO? (2 IMAGES LAYOUT) */
                  <div className="grid grid-cols-[1.05fr_1.15fr] gap-[clamp(2.5rem,5vw,4.5rem)] items-center max-w-[1280px] mx-auto my-0 max-[900px]:grid-cols-1 max-[900px]:gap-10">
                    <div className="flex flex-col min-w-0">
                      <div className="!mb-8">
                        <h2 className="!font-[var(--font-display)] !text-[clamp(1.85rem,2.7vw,2.5rem)] !font-bold !leading-[1.15] !tracking-[-0.02em] !uppercase !mt-0 !mx-0 !mb-0 max-w-[600px]">
                          <span className="!block whitespace-nowrap max-[640px]:whitespace-normal !text-[#132c20] !font-bold !uppercase">What if teaching could be</span>
                          <span className="!block whitespace-nowrap max-[640px]:whitespace-normal !text-[#7f9b68] !font-bold !uppercase">a journey of</span>
                          <span className="!block whitespace-nowrap max-[640px]:whitespace-normal !text-[#7f9b68] !font-bold !uppercase">discovery, too?</span>
                        </h2>
                      </div>
                      <AnimatedCopy
                        text={scene.copy}
                        className="font-[var(--font-sans)] !mt-0 !mx-0 !mb-7 !text-[clamp(1rem,1.2vw,1.12rem)] !leading-[1.7] !text-[#000000] max-w-[780px]"
                      />

                      <div className="flex flex-row !flex-nowrap items-center gap-3.5 mt-5 opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[1150px]:gap-2.5 max-[900px]:gap-3.5 max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-3.5 !h-[52px] !py-0 !pr-2 !pl-5 !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.92rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-[38px] after:!h-[38px] after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[1150px]:!h-[44px] max-[1150px]:!pl-3.5 max-[1150px]:!pr-1.5 max-[1150px]:!gap-2 max-[1150px]:!text-[0.82rem] max-[1150px]:after:!w-8 max-[1150px]:after:!h-8 max-[900px]:!h-[52px] max-[900px]:!pl-5 max-[900px]:!pr-2 max-[900px]:!gap-3.5 max-[900px]:!text-[0.92rem] max-[900px]:after:!w-[38px] max-[900px]:after:!h-[38px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-3.5 !h-[52px] !py-0 !pr-2 !pl-5 !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.92rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-[38px] after:!h-[38px] after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[1150px]:!h-[44px] max-[1150px]:!pl-3.5 max-[1150px]:!pr-1.5 max-[1150px]:!gap-2 max-[1150px]:!text-[0.82rem] max-[1150px]:after:!w-8 max-[1150px]:after:!h-8 max-[900px]:!h-[52px] max-[900px]:!pl-5 max-[900px]:!pr-2 max-[900px]:!gap-3.5 max-[900px]:!text-[0.92rem] max-[900px]:after:!w-[38px] max-[900px]:after:!h-[38px] max-[768px]:!h-[54px] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!gap-[1.15rem] max-[768px]:!text-[0.95rem] max-[768px]:after:!w-10 max-[768px]:after:!h-10 max-[768px]:!box-border max-[768px]:!shrink"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    {/* 2 IMAGES MATCHING USER REQUEST "this section adding 2 images" */}
                    <div className="grid grid-cols-2 gap-5 items-center min-w-0 max-[580px]:grid-cols-1 max-[580px]:gap-4" aria-label="Educator journey and collaboration">
                      <div className="group rounded-[20px] overflow-hidden shadow-[0_12px_36px_rgba(19,44,32,0.08)] h-[clamp(340px,34vw,440px)] max-[580px]:h-[240px]">
                        <img
                          src="/images/educator-discovery-mentor.jpg"
                          alt="Inspiring progressive educator mentoring elementary students around a botanical inquiry table"
                          className="w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="group rounded-[20px] overflow-hidden shadow-[0_12px_36px_rgba(19,44,32,0.08)] h-[clamp(340px,34vw,440px)] translate-y-6 max-[900px]:translate-y-0 max-[580px]:h-[240px]">
                        <img
                          src="/images/educator-clean-portrait.jpg"
                          alt="Passionate progressive school educator smiling warmly by modern campus windows"
                          className="w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                ) : scene.number === '14' ? (
                  /* SCENE 14: LIVING ARCHIVES (MATCHING USER REFERENCE BANNER WITH ARCHIVE ARTIFACT BACKGROUND) */
                  <div className="w-full max-w-[1240px] mx-auto my-0">
                    <div className="relative rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.22)] min-h-[420px] flex items-center justify-center py-[clamp(2.75rem,5vw,4.25rem)] px-[clamp(1.5rem,3vw,2.5rem)] max-[600px]:!py-10 max-[600px]:!px-[1.15rem] max-[600px]:!rounded-[18px] max-[600px]:!min-h-0">
                      {/* Background Visual: Handcrafted ceramic artifacts and publications */}
                      <div className="absolute inset-0 z-0" aria-hidden="true">
                        <img
                          src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1600&q=85"
                          alt="Ceramic memory artifacts and publications representing living school archives"
                          className="w-full h-full object-cover block"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,44,32,0.72)_0%,rgba(19,44,32,0.84)_100%)] backdrop-blur-[2px]" />
                      </div>

                      {/* Centered Content Stack matching user reference */}
                      <div className="relative z-[1] text-center max-w-[760px] mx-auto my-0 flex flex-col items-center">
                        <h2 className="!font-[var(--font-display)] text-[clamp(2.3rem,4vw,3.35rem)] !font-bold !leading-[1.14] !tracking-[-0.02em] !uppercase !text-[#ffffff] mt-0 mx-0 mb-[1.15rem]">
                          Some moments deserve<br />
                          <span className="!block !text-[#7f9b68] !font-bold !uppercase">to be remembered.</span>
                        </h2>
                        <p className="font-[var(--font-sans)] text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.68] text-[rgba(255,255,255,0.92)] mt-0 mx-0 mb-[1.85rem] max-w-[640px]">
                          {scene.copy}
                        </p>

                        {/* Primary and Secondary CTA Buttons on the same line */}
                        <div className="flex flex-row !flex-nowrap justify-center items-center gap-5 mt-2 opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                          <button
                            type="button"
                            className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                            onClick={() => handleCta(scene.primaryCta)}
                          >
                            {scene.primaryCta.label}
                          </button>
                          <button
                            type="button"
                            className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#ffffff] !text-[#718a60] !border-[1.5px] !border-solid !border-[#829b70] !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-[1.5px] active:!border-[#829b70] active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-[1.5px] focus:!border-[#829b70] focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-[1.5px] focus-visible:!border-[#829b70] focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                            onClick={() => handleCta(scene.secondaryCta)}
                          >
                            {scene.secondaryCta.label}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '15' ? (
                  /* SCENE 15: YOUR NEXT CHAPTER STARTS HERE — STAGE DESIGN (MATCHING USER REFERENCE) */
                  <div className="relative !w-full !max-w-full !m-0 !rounded-none !border-0 !shadow-none overflow-hidden min-h-[clamp(360px,36vw,440px)]">
                    <div className="absolute inset-0 z-0 !rounded-none" aria-hidden="true">
                      <img
                        src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=85"
                        alt="Parents and family looking ahead across the sunlit green campus landscape"
                        className="w-full h-full object-cover object-[center_right] block !rounded-none"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0c2b18_0%,rgba(12,43,24,0.94)_42%,rgba(12,43,24,0.65)_68%,rgba(12,43,24,0.15)_100%)] max-[900px]:bg-[linear-gradient(180deg,rgba(12,43,24,0.96)_0%,rgba(12,43,24,0.88)_60%,rgba(12,43,24,0.4)_100%)] pointer-events-none" />
                    </div>

                    <div className="relative z-[1] flex flex-col justify-center min-h-[clamp(360px,36vw,440px)] max-w-[1320px] mx-auto my-0 py-[clamp(1rem,2.5vw,2rem)] px-8 w-full max-[900px]:py-6 max-[900px]:px-7 max-[600px]:!pt-10 max-[600px]:!px-[1.15rem] max-[600px]:!pb-8">
                      <div className="max-w-[780px]">
                        <h2 className="!font-[var(--font-display)] !text-[clamp(2.1rem,3.6vw,3rem)] !font-bold !leading-[1.14] !tracking-[-0.02em] !uppercase !text-[#ffffff] !mt-0 !mx-0 !mb-8">
                          <span className="!block whitespace-nowrap max-[640px]:whitespace-normal !text-[#7f9b68] !font-bold !uppercase">Perhaps their next chapter</span>
                          <span className="!block whitespace-nowrap max-[640px]:whitespace-normal !text-[#7f9b68] !font-bold !uppercase">begins here.</span>
                        </h2>
                        <p className="font-[var(--font-sans)] !text-[clamp(0.92rem,1.1vw,1.02rem)] !leading-[1.62] !text-[rgba(255,255,255,0.88)] !mt-0 !mx-0 !mb-6 max-w-[540px]">{scene.copy}</p>

                        <div className="flex flex-row !flex-nowrap gap-4 items-center mt-5 opacity-0 translate-y-6 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 [.is-visible_&]:delay-[360ms] max-[768px]:!flex-col max-[768px]:!items-center max-[768px]:!w-full max-[768px]:!gap-3">
                          <button
                            type="button"
                            className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#829b70] !text-[#ffffff] !border-2 !border-solid !border-[#829b70] !shadow-[0_6px_20px_rgba(130,155,112,0.28)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#ffffff] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23829b70%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-[#718a60] hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.36)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] active:!bg-[#829b70] active:!border-2 active:!border-[#829b70] active:!text-[#ffffff] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus:!bg-[#829b70] focus:!border-2 focus:!border-[#829b70] focus:!text-[#ffffff] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] focus-visible:!bg-[#829b70] focus-visible:!border-2 focus-visible:!border-[#829b70] focus-visible:!text-[#ffffff] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.22)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                            onClick={() => handleCta(scene.primaryCta)}
                          >
                            {scene.primaryCta.label}
                          </button>
                          <button
                            type="button"
                            className="relative overflow-hidden z-[1] !inline-flex !items-center justify-center !whitespace-nowrap !gap-[1.15rem] !h-[54px] !py-0 !pr-2 !pl-[1.65rem] !rounded-full !bg-[#ffffff] !text-[#718a60] !border-0 !shadow-[0_4px_14px_rgba(130,155,112,0.12)] !font-[var(--font-sans)] !font-medium !text-[0.95rem] leading-none text-center tracking-[0.01em] !outline-none !cursor-pointer !transition-all !duration-[240ms] !ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[75%] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:-skew-x-[24deg] before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:-z-[1] hover:before:left-[140%] after:!content-[''] after:!inline-block after:!w-10 after:!h-10 after:!rounded-full after:!shrink-0 after:!bg-[#829b70] after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23ffffff%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] after:!bg-no-repeat after:!bg-center after:!bg-[length:16px_16px] after:!transition-[transform,background-color] after:!duration-[240ms,200ms] after:!ease-[cubic-bezier(0.22,1,0.36,1),ease] hover:!bg-[#718a60] hover:!border-0 hover:!text-[#ffffff] hover:!-translate-y-[2px] hover:!shadow-[0_10px_24px_rgba(113,138,96,0.32)] hover:after:!translate-x-[2px] hover:after:!-translate-y-[2px] hover:after:!bg-[#ffffff] hover:after:!bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23718a60%27%20stroke-width=%272.8%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cline%20x1=%277%27%20y1=%2717%27%20x2=%2717%27%20y2=%277%27/%3E%3Cpolyline%20points=%277%207%2017%207%2017%2017%27/%3E%3C/svg%3E')] active:!bg-[#ffffff] active:!border-0 active:!text-[#718a60] active:!outline-none active:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus:!bg-[#ffffff] focus:!border-0 focus:!text-[#718a60] focus:!outline-none focus:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] focus-visible:!bg-[#ffffff] focus-visible:!border-0 focus-visible:!text-[#718a60] focus-visible:!outline-none focus-visible:!shadow-[0_0_0_3px_rgba(130,155,112,0.4),0_8px_24px_rgba(0,0,0,0.18)] max-[768px]:!w-fit max-[768px]:!max-w-full max-[768px]:!self-center max-[768px]:!justify-center max-[768px]:!whitespace-normal max-[768px]:!py-0 max-[768px]:!pr-2 max-[768px]:!pl-5 max-[768px]:!box-border max-[768px]:!shrink"
                            onClick={() => handleCta(scene.secondaryCta)}
                          >
                            {scene.secondaryCta.label}
                          </button>
                        </div>
                      </div>
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
})
