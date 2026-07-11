import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CSSProperties } from 'react';

const EXPERIENCE = [
  {
    company: 'Sunflower Lab',
    role: 'Software Developer',
    period: 'Dec 2023 – Present',
    color: '#6366f1',
    summary: 'Cross-platform app delivery, POS stability, AI camera workflows.',
    desc: 'Led end-to-end development of cross-platform mobile applications. Optimized Supply POS with AI camera edge detection, increasing stability to 90%. Mentored junior developers in agile sprint cycles.',
    highlights: ['Fullstack (Angular/Spring Boot)', 'AI-Assisted Dev', 'Performance Optimization', 'Agile/Scrum'],
  },
  {
    company: 'Pavans Group Techsoft',
    role: 'Senior Application Developer',
    period: 'Oct 2022 – Oct 2023',
    color: '#a855f7',
    summary: 'Flutter releases across iOS and Android, from QA to stores.',
    desc: 'Deployed high-performance Flutter applications for both iOS and Android platforms. Mastered the full release lifecycle from QA to App Store and Play Store deployment.',
    highlights: ['Flutter Expert', 'RESTful Integration', 'Store Deployment', 'iOS & Android'],
  },
  {
    company: 'Airan Limited',
    role: 'Application Developer',
    period: 'Jul 2021 – Aug 2022',
    color: '#22d3ee',
    summary: 'Banking apps, enterprise verification flows, Kotlin/Java systems.',
    desc: 'Developed the M-CTS mobile banking system for SCB, IDFC, and Axis Bank. Built an address verification app to streamline credit card processing workflows at enterprise scale.',
    highlights: ['Banking Security', 'Enterprise Scale', 'Kotlin/Java', 'WordPress'],
  },
  {
    company: 'Freelance',
    role: 'Android & WordPress Developer',
    period: 'May 2018 – Jun 2021',
    color: '#f59e0b',
    summary: 'Independent Android apps and web presence for real clients.',
    desc: 'Delivered 10+ custom Android applications across diverse industries. Managed digital presence and WordPress solutions for small and medium businesses across India.',
    highlights: ['Client Management', 'Custom Solutions', 'Scalable Architecture', '10+ Apps'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let frame = 0;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const distance = window.innerHeight + rect.height;
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / distance, 0), 1);
      section.style.setProperty('--experience-progress', progress.toFixed(3));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateProgress();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.experienceIndex ?? 0);
            setActiveCard(index);
          }
        });
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.2 },
    );

    section.querySelectorAll<HTMLElement>('[data-experience-index]').forEach((card) => observer.observe(card));
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="section experience-section">
      <div className="container experience-layout">
        <motion.div
          className="experience-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// experience</span>
          <h2 className="section-title">The Journey</h2>
          <p className="section-subtitle">
            Professional trajectory shaped by fintech, healthcare, and enterprise product development.
          </p>
          <div className="experience-summary glass">
            <span>8+ years</span>
            <span>Release focused</span>
            <span>Product systems</span>
          </div>
        </motion.div>

        <div className="experience-release-log">
          <div className="release-log-header">
            <span>Product Milestone</span>
            <span>Status</span>
          </div>

          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              data-experience-index={idx}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="release-item"
              style={{ '--accent': exp.color } as CSSProperties}
            >
              <button
                type="button"
                className={`release-card glass ${activeCard === idx ? 'is-active' : ''}`}
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                <div className="release-main">
                  <div className="release-title-row">
                    <div>
                      <h3 className="release-company">{exp.company}</h3>
                      <p>{exp.role}</p>
                    </div>
                    <span className="release-period">{exp.period}</span>
                  </div>

                  <p className="release-summary">{exp.summary}</p>

                  <div className="release-commits">
                    {exp.highlights.slice(0, 3).map((h) => (
                      <span key={h}>+ {h}</span>
                    ))}
                  </div>
                </div>

                <div className="release-status">
                  <span>{idx === 0 ? 'Current' : 'Shipped'}</span>
                  <motion.i
                    animate={{ rotate: expanded === idx ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.i>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {expanded === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="release-detail glass"
                  >
                    <p>{exp.desc}</p>
                    <div className="release-detail-tags">
                      {exp.highlights.map((h) => (
                        <span key={h}>{h}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="release-item education"
            data-experience-index={EXPERIENCE.length}
            style={{ '--accent': '#10b981' } as CSSProperties}
          >
            <div className={`release-card education-card glass ${activeCard === EXPERIENCE.length ? 'is-active' : ''}`}>
              <div className="release-main">
                <div className="release-title-row">
                  <div>
                    <h3>
                    Bachelor of Engineering — Computer Science
                    </h3>
                    <p>Gujarat Technological University</p>
                  </div>
                  <span className="release-period">June 2017</span>
                </div>
                <div className="release-commits">
                  {['+ Android Developer Nanodegree — Udacity (2018)', '+ GDG Baroda Member'].map(a => (
                    <span key={a}>{a}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
