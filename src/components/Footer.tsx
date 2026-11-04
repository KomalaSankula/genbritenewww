import { BRAND_INFO } from '../data/storyScenes'

interface FooterProps {
  onScrollTo: (id: string) => void
  onOpenModal: (modalId: string) => void
}

export function Footer({ onScrollTo, onOpenModal }: FooterProps) {
  return (
    <footer className="gb-footer">
      <div className="gb-container">
        {/* 07 | Footer Sketch (4 Columns from PDF Page 9) */}
        <div className="gb-footer__grid">
          <div className="gb-footer__col">
            <h3>Discover</h3>
            <ul>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-01')}>
                  Story
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-07')}>
                  Founders
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-04')}>
                  Philosophy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-05')}>
                  Academics
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-06')}>
                  Campus
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-15')}>
                  Admissions
                </button>
              </li>
            </ul>
          </div>

          <div className="gb-footer__col">
            <h3>Connect</h3>
            <ul>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-09')}>
                  Gallery
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-10')}>
                  News &amp; Events
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-14')}>
                  Archives
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-11')}>
                  Little Circle
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-12')}>
                  Community Partnerships
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-13')}>
                  Careers
                </button>
              </li>
            </ul>
          </div>

          <div className="gb-footer__col">
            <h3>Our Community</h3>
            <ul>
              <li>
                <button type="button" onClick={() => onScrollTo('scene-12')}>
                  Weekend Club
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenModal('parent-portal')}>
                  Parent Portal
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenModal('student-portal')}>
                  Student Portal
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenModal('bright-times')}>
                  Bright Times
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenModal('admissions')}>
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="gb-footer__col">
            <h3>Visit Us</h3>
            <p className="gb-footer__address">{BRAND_INFO.address}</p>
            <p className="gb-footer__contact">
              <a href={`mailto:${BRAND_INFO.email}`}>{BRAND_INFO.email}</a>
              <br />
              <span>{BRAND_INFO.website}</span>
              <br />
              <button
                type="button"
                className="gb-text-link gb-text-link--gold"
                onClick={() => onOpenModal('admissions')}
              >
                Directions
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="gb-footer__legal">
          <div className="gb-footer__legal-links">
            <span>Privacy Policy</span>
            <span>Child Safeguarding</span>
            <span>Terms</span>
            <span>Accessibility</span>
            <span>Website Policies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
