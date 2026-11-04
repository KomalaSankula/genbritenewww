import { STORY_SCENES } from '../data/storyScenes'

interface StoryNavigatorProps {
  activeScene: string
  onScrollTo: (id: string) => void
}

export function StoryNavigator({ activeScene, onScrollTo }: StoryNavigatorProps) {
  return (
    <aside className="gb-story-rail" aria-label="15 Scene Chapter Rail">
      <div className="gb-story-rail__header">15 SCENES</div>
      <ul className="gb-story-rail__list">
        {STORY_SCENES.map((scene) => {
          const isActive = scene.id === activeScene
          return (
            <li key={scene.id}>
              <button
                type="button"
                className={`gb-story-rail__item ${isActive ? 'active' : ''} ${
                  scene.hasImage ? 'with-image' : 'no-image'
                }`}
                onClick={() => onScrollTo(scene.id)}
                title={`Scene ${scene.number}: ${scene.title} (${
                  scene.hasImage ? 'With Image' : 'No Image · Editorial'
                })`}
              >
                <span className="gb-story-rail__num">{scene.number}</span>
                <span className="gb-story-rail__dot" />
                <span className="gb-story-rail__tooltip">
                  <strong>
                    {scene.number}. {scene.blockName}
                  </strong>
                  <em>{scene.hasImage ? 'Image Story' : 'Pure Typography'}</em>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

