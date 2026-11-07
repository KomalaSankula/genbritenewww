import { useState, type FormEvent } from 'react'
import { BRAND_FILM_VOICEOVER, BRAND_INFO } from '../data/storyScenes'

interface InteractiveModalProps {
  modalId: string | null
  onClose: () => void
}

export function InteractiveModal({ modalId, onClose }: InteractiveModalProps) {
  const [submitted, setSubmitted] = useState(false)

  if (!modalId) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <div className="gb-modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="gb-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="gb-modal-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>

        {submitted ? (
          <div className="gb-modal-confirmation">
            <span className="gb-eyebrow">THANK YOU FROM GENBRIGHT</span>
            <h3>Your request has been received.</h3>
            <p>
              Our admissions and community companions at {BRAND_INFO.schoolName} (Mokila,
              Hyderabad) will connect with you shortly.
            </p>
            <button
              type="button"
              className="gb-btn gb-btn--primary-forest"
              onClick={handleClose}
            >
              Return to the 15-Scene Story
            </button>
          </div>
        ) : (
          <>
            {modalId === 'admissions' && (
              <form className="gb-modal-form" onSubmit={handleSubmit}>
                <span className="gb-eyebrow">ADMISSIONS 2027–28 · MOKILA, HYDERABAD</span>
                <h3>Begin Your GenBright Journey</h3>
                <p>
                  Nursery to Grade 8 · Book a Campus Visit, Counsellor Call, or Admission
                  Information Pack.
                </p>
                <div className="gb-form-grid">
                  <label>
                    Parent / Guardian Name *
                    <input type="text" required placeholder="Your full name" />
                  </label>
                  <label>
                    Mobile Number *
                    <input type="tel" required placeholder="+91 98765 43210" />
                  </label>
                  <label>
                    Email Address *
                    <input type="email" required placeholder="parent@example.com" />
                  </label>
                  <label>
                    Child’s Name *
                    <input type="text" required placeholder="Child's name" />
                  </label>
                  <label>
                    Grade of Interest (2027–28) *
                    <select required defaultValue="">
                      <option value="" disabled>
                        Select Programme Stage
                      </option>
                      <option>Seed — Nursery & PP1</option>
                      <option>Sprout — PP2 & Grade 1</option>
                      <option>Sapling — Grades 2 & 3</option>
                      <option>Bloom — Grades 4 & 5</option>
                      <option>Flourish — Grades 6 to 8</option>
                    </select>
                  </label>
                  <label>
                    Preferred Next Step *
                    <select required defaultValue="Campus Visit">
                      <option>Campus Visit (Mokila)</option>
                      <option>Counsellor Call</option>
                      <option>Admission Information Pack</option>
                    </select>
                  </label>
                </div>
                <label className="gb-checkbox">
                  <input type="checkbox" required />
                  <span>
                    I consent to GenBright World School contacting me regarding admissions and
                    campus visits.
                  </span>
                </label>
                <button type="submit" className="gb-btn gb-btn--primary-forest">
                  Submit Enquiry →
                </button>
              </form>
            )}

            {modalId === 'parent-portal' && (
              <form className="gb-modal-form" onSubmit={handleSubmit}>
                <span className="gb-eyebrow">PARENT PORTAL · SECURE SIGN IN</span>
                <h3>Welcome Back, Parents</h3>
                <p>
                  Access your child’s Individual Learning Goal (ILG) updates, attendance,
                  calendar, school messages, and parent-mentor communications.
                </p>
                <div className="gb-form-stack">
                  <label>
                    Registered Email or Mobile *
                    <input type="text" required placeholder="parent@genbright.in" />
                  </label>
                  <label>
                    Password *
                    <input type="password" required placeholder="••••••••" />
                  </label>
                </div>
                <button type="submit" className="gb-btn gb-btn--primary-forest">
                  Secure Sign In →
                </button>
              </form>
            )}

            {modalId === 'student-portal' && (
              <form className="gb-modal-form" onSubmit={handleSubmit}>
                <span className="gb-eyebrow">STUDENT PORTAL · LEARNER WORKSPACE</span>
                <h3>Hello, Learner!</h3>
                <p>
                  Explore My Learning, My Projects, My Portfolio, My ILG Goals, and
                  Announcements in a safe, child-protected space.
                </p>
                <div className="gb-form-stack">
                  <label>
                    Learner ID *
                    <input type="text" required placeholder="GB-2027-001" />
                  </label>
                  <label>
                    Passcode *
                    <input type="password" required placeholder="••••••" />
                  </label>
                </div>
                <button type="submit" className="gb-btn gb-btn--primary-forest">
                  Student Sign In →
                </button>
              </form>
            )}

            {modalId === 'founder-letter' && (
              <div className="gb-modal-editorial">
                <span className="gb-eyebrow">SCENE 07 · FOUNDER’S LETTER</span>
                <h3>Experience Should Translate Into Everyday Care</h3>
                <p>
                  “For 35 years across five schools in Chennai, and through 15 years of
                  personally mentoring learners and educators, one truth has remained constant:
                  children flourish when they are deeply known and unhurriedly cared for.”
                </p>
                <p>
                  “At GenBright World School in Mokila, we designed every courtyard, our 13
                  Learning Centres, and our Think · Feel · Move · Pause philosophy around a
                  single promise—to protect the wonder of childhood while preparing your child
                  for the world ahead.”
                </p>
                <p className="gb-signature">
                  — <strong>Dhanyabharathi Kannan</strong>, Founder, GenBright World School
                </p>
              </div>
            )}

            {(modalId === 'film-voiceover' || modalId === 'bright-times') && (
              <div className="gb-modal-editorial">
                <span className="gb-eyebrow">
                  {modalId === 'film-voiceover'
                    ? '09 | FINAL BRAND FILM VOICEOVER'
                    : 'BRIGHT TIMES · EDITORIAL FEATURE'}
                </span>
                <h3>Rooted in Childhood. Ready for the World.</h3>
                {BRAND_FILM_VOICEOVER.map((paragraph, i) => (
                  <p key={i}>“{paragraph}”</p>
                ))}
              </div>
            )}

            {modalId === 'little-circle' && (
              <form className="gb-modal-form" onSubmit={handleSubmit}>
                <span className="gb-eyebrow">SCENE 11 · LITTLE CIRCLE ALLIANCE</span>
                <h3>Preschool Partnership Registration</h3>
                <div className="gb-form-grid">
                  <label>
                    Preschool Name *
                    <input type="text" required placeholder="Preschool name" />
                  </label>
                  <label>
                    Contact Person *
                    <input type="text" required placeholder="Director / Principal name" />
                  </label>
                  <label>
                    Locality in Hyderabad *
                    <input type="text" required placeholder="e.g., Mokila, Kokapet, Tellapur" />
                  </label>
                  <label>
                    Phone / Email *
                    <input type="text" required placeholder="Contact details" />
                  </label>
                </div>
                <button type="submit" className="gb-btn gb-btn--primary-forest">
                  Submit Partnership Interest →
                </button>
              </form>
            )}

            {modalId === 'community-partner' && (
              <form className="gb-modal-form" onSubmit={handleSubmit}>
                <span className="gb-eyebrow">SCENE 12 · COMMUNITY PARTNERSHIPS</span>
                <h3>Partner, Mentor or Volunteer with GenBright</h3>
                <div className="gb-form-grid">
                  <label>
                    Organisation / Individual *
                    <input type="text" required placeholder="Name or institution" />
                  </label>
                  <label>
                    Category *
                    <select required defaultValue="Arts & Culture">
                      <option>Arts & Culture</option>
                      <option>Industry & Technology</option>
                      <option>Higher Education</option>
                      <option>Environment & Farming</option>
                      <option>NGO & Social Impact</option>
                      <option>Sports & Wellbeing</option>
                    </select>
                  </label>
                  <label>
                    Contact Details *
                    <input type="text" required placeholder="Email or phone" />
                  </label>
                  <label>
                    Proposed Contribution *
                    <input type="text" required placeholder="Workshop, residency, mentorship..." />
                  </label>
                </div>
                <button type="submit" className="gb-btn gb-btn--primary-forest">
                  Submit Proposal →
                </button>
              </form>
            )}

            {modalId === 'careers' && (
              <form className="gb-modal-form" onSubmit={handleSubmit}>
                <span className="gb-eyebrow">SCENE 13 · CAREERS & EDUCATOR FELLOWSHIP</span>
                <h3>Grow as an Educator at GenBright</h3>
                <div className="gb-form-grid">
                  <label>
                    Full Name *
                    <input type="text" required placeholder="Your name" />
                  </label>
                  <label>
                    Email & Phone *
                    <input type="text" required placeholder="you@example.com" />
                  </label>
                  <label>
                    Role / Learning Centre of Interest *
                    <input type="text" required placeholder="Cambridge Mentor, STEAM, Arts..." />
                  </label>
                  <label>
                    Experience & Qualifications *
                    <input type="text" required placeholder="Years & credentials" />
                  </label>
                </div>
                <button type="submit" className="gb-btn gb-btn--primary-forest">
                  Submit Educator Profile →
                </button>
              </form>
            )}

            {!['admissions', 'parent-portal', 'student-portal', 'founder-letter', 'film-voiceover', 'bright-times', 'little-circle', 'community-partner', 'careers'].includes(modalId) && (
              <form className="gb-modal-form" onSubmit={handleSubmit}>
                <span className="gb-eyebrow">ENQUIRY &amp; CAMPUS VISIT · GENBRIGHT WORLD SCHOOL</span>
                <h3>Begin Your GenBright Journey</h3>
                <p>
                  Connect with our admissions &amp; academic counsellors at Mokila, Hyderabad.
                </p>
                <div className="gb-form-grid">
                  <label>
                    Your Name *
                    <input type="text" required placeholder="Full name" />
                  </label>
                  <label>
                    Mobile Number *
                    <input type="tel" required placeholder="+91 98765 43210" />
                  </label>
                  <label>
                    Email Address *
                    <input type="email" required placeholder="name@example.com" />
                  </label>
                  <label>
                    Interested In *
                    <select required defaultValue="Campus Visit">
                      <option>Campus Visit (Mokila)</option>
                      <option>Admissions 2027–28</option>
                      <option>Cambridge Curriculum Details</option>
                      <option>Counsellor Callback</option>
                    </select>
                  </label>
                </div>
                <button type="submit" className="gb-btn gb-btn--primary-forest">
                  Submit Enquiry →
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}

