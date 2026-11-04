import type { ReactNode } from 'react'

export type IconName =
  | 'sparkle'
  | 'heart-hand'
  | 'shield-smile'
  | 'chat-star'
  | 'think'
  | 'feel'
  | 'move'
  | 'pause'
  | 'seed'
  | 'sprout'
  | 'sapling'
  | 'bloom'
  | 'flourish'
  | 'sun-run'
  | 'leaf-farm'
  | 'gear-steam'
  | 'compass-play'
  | 'palette'
  | 'hammer'
  | 'cpu'
  | 'globe'
  | 'users'
  | 'award'
  | 'briefcase'
  | 'graduation'
  | 'trophy'
  | 'book-open'
  | 'sun-heart'
  | 'home-heart'

interface VibrantIconProps {
  name: IconName
  color?: 'gold' | 'coral' | 'emerald' | 'sky' | 'amber' | 'violet'
  size?: number
}

export function VibrantIcon({ name, color = 'gold', size = 24 }: VibrantIconProps) {
  const renderPath = (): ReactNode => {
    switch (name) {
      case 'sparkle':
        return (
          <path
            d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      case 'heart-hand':
        return (
          <>
            <path
              d="M12 14C14.5 11.8 17 9.8 17 7.2C17 5.4 15.6 4 13.8 4C12.8 4 12 4.5 12 5.3C12 4.5 11.2 4 10.2 4C8.4 4 7 5.4 7 7.2C7 9.8 9.5 11.8 12 14Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M4 17.5C6.5 19.5 9.2 20.5 12 20.5C14.8 20.5 17.5 19.5 20 17.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        )
      case 'shield-smile':
        return (
          <>
            <path
              d="M12 3L19 6V11.5C19 16.2 15.9 19.9 12 21C8.1 19.9 5 16.2 5 11.5V6L12 3Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M9 13C9.8 14.2 10.8 14.8 12 14.8C13.2 14.8 14.2 14.2 15 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        )
      case 'chat-star':
        return (
          <>
            <path
              d="M20 11.5C20 15.6 16.4 19 12 19C10.6 19 9.3 18.7 8.1 18.1L4 19.5L5.3 15.8C4.5 14.5 4 13.1 4 11.5C4 7.4 7.6 4 12 4C16.4 4 20 7.4 20 11.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="11.5" r="1" fill="currentColor" />
            <circle cx="12" cy="11.5" r="1" fill="currentColor" />
            <circle cx="15" cy="11.5" r="1" fill="currentColor" />
          </>
        )
      case 'think':
        return (
          <>
            <circle cx="12" cy="10" r="6" stroke="currentColor" strokeWidth="1.8" />
            <path d="M9.5 16H14.5M10.5 19H13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M12 2V3M4 10H3M21 10H20M6.3 4.3L5.6 3.6M17.7 4.3L18.4 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )
      case 'feel':
        return (
          <path
            d="M12 20.5C12 20.5 4.5 15.2 4.5 9.3C4.5 6.6 6.6 4.5 9.3 4.5C10.9 4.5 12 5.4 12 6.6C12 5.4 13.1 4.5 14.7 4.5C17.4 4.5 19.5 6.6 19.5 9.3C19.5 15.2 12 20.5 12 20.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        )
      case 'move':
        return (
          <>
            <circle cx="14.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M7 19L10.5 14L13 15.5L16.5 10.5M8.5 10L12.5 8.5L15 11.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )
      case 'pause':
        return (
          <>
            <path
              d="M12 4C9 7.5 9 12.5 12 16C15 12.5 15 7.5 12 4Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M5 11C7.5 11 10 13 12 16C14 13 16.5 11 19 11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path d="M7 19.5H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )
      case 'seed':
      case 'sprout':
      case 'sapling':
      case 'bloom':
      case 'flourish':
      case 'leaf-farm':
        return (
          <>
            <path
              d="M12 21V10M12 14C8.5 14 6 11.5 6 8C9.5 8 12 10.5 12 14ZM12 11C15.5 11 18 8.5 18 5C14.5 5 12 7.5 12 11Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )
      case 'sun-run':
        return (
          <>
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M12 3V5M12 19V21M3 12H5M19 12H21M5.6 5.6L7 7M17 17L18.4 18.4M18.4 5.6L17 7M7 17L5.6 18.4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        )
      case 'gear-steam':
        return (
          <>
            <polygon
              points="12 3 19 7 19 17 12 21 5 17 5 7 12 3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
          </>
        )
      case 'compass-play':
        return (
          <>
            <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
            <polygon
              points="14.8 9.2 13 13 9.2 14.8 11 11 14.8 9.2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </>
        )
      case 'palette':
        return (
          <>
            <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="9.5" cy="9.5" r="1.2" fill="currentColor" />
            <circle cx="14.5" cy="9.5" r="1.2" fill="currentColor" />
            <circle cx="9.5" cy="14.5" r="1.2" fill="currentColor" />
          </>
        )
      case 'cpu':
        return (
          <>
            <rect x="6" y="6" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 3V6M15 3V6M9 18V21M15 18V21M3 9H6M3 15H6M18 9H21M18 15H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )
      default:
        return (
          <>
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 8V12L14.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )
    }
  }

  return (
    <span className={`gb-vibrant-icon gb-vibrant-icon--${color}`} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {renderPath()}
      </svg>
    </span>
  )
}

export function BotanicalDivider({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  return (
    <div className={`gb-botanical-divider gb-botanical-divider--${variant}`} aria-hidden="true">
      <span className="gb-botanical-line" />
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 3C16.5 8.5 19.5 11.5 25 14C19.5 16.5 16.5 19.5 14 25C11.5 19.5 8.5 16.5 3 14C8.5 11.5 11.5 8.5 14 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="14" r="2.5" fill="currentColor" />
      </svg>
      <span className="gb-botanical-line" />
    </div>
  )
}

