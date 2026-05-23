import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CSSProperties } from 'react';
import { getPortfolioItems, type PortfolioItem } from '../data/portfolio';

const ALL_CATEGORIES = ['All', 'Mobile App', 'Web App', 'Fullstack', 'Open Source'];

function getLinkLabel(key: string) {
  if (key === 'playstore') return 'Play Store';
  if (key === 'appstore') return 'App Store';
  if (key === 'github') return 'GitHub';
  return 'Live';
}

function getProjectLinks(item: PortfolioItem) {
  return Object.entries(item.links).filter((entry): entry is [string, string] => Boolean(entry[1]));
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const items = useMemo(() => getPortfolioItems(), []);
  const filtered = useMemo(
    () => activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory),
    [activeCategory, items],
  );

  useEffect(() => {
    const activeProjectExists = filtered.some(item => item.id === activeProjectId);

    if (!activeProjectExists) {
      setActiveProjectId(filtered[0]?.id ?? null);
    }
  }, [activeProjectId, filtered]);

  const activeProject = filtered.find(item => item.id === activeProjectId) ?? filtered[0];
  const activeIndex = activeProject ? filtered.findIndex(item => item.id === activeProject.id) : 0;
  const projectLinks = activeProject ? getProjectLinks(activeProject) : [];

  return (
    <section id="works" className="section works-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="works-heading"
        >
          <span className="section-label">// selected works</span>
          <h2 className="section-title">Case Study Console</h2>
          <p className="section-subtitle">
            Production apps across healthcare, fintech, and enterprise, organized for quick scanning and deeper inspection.
          </p>
        </motion.div>

        <div className="works-console glass">
          <div className="works-toolbar">
            <div className="works-filter-tabs">
              {ALL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`works-filter ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="works-count">{filtered.length} projects</span>
          </div>

          <div className="works-console-grid">
            <div className="works-list" aria-label="Project list">
              {filtered.map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  onClick={() => setActiveProjectId(item.id)}
                  className={`works-row ${activeProject?.id === item.id ? 'active' : ''}`}
                  style={{ '--cover': item.coverColor } as CSSProperties}
                >
                  <span className="works-row-index">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="works-row-main">
                    <strong>{item.title}</strong>
                    <small>{item.category} / {item.year}</small>
                  </span>
                  <span className="works-row-signal" />
                </motion.button>
              ))}
            </div>

            <div className="works-feature-wrap">
              <AnimatePresence mode="wait">
                {activeProject && (
                  <motion.article
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="works-feature"
                    style={{ '--cover': activeProject.coverColor } as CSSProperties}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      e.currentTarget.style.setProperty('--x', `${x}%`);
                      e.currentTarget.style.setProperty('--y', `${y}%`);
                    }}
                  >
                    <div className="works-feature-preview" aria-hidden="true">
                      <div className="works-device-frame">
                        <span />
                        <div>
                          <strong>{activeProject.title}</strong>
                          <small>{activeProject.category}</small>
                        </div>
                      </div>
                    </div>

                    <div className="works-feature-content">
                      <div className="works-feature-meta">
                        <span>{activeProject.category}</span>
                        <span>{activeProject.year}</span>
                        <span>{activeIndex + 1} / {filtered.length}</span>
                      </div>

                      <h3>{activeProject.title}</h3>
                      <p>{activeProject.description}</p>

                      <div className="works-stack">
                        {activeProject.tech.map(tech => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>

                      <div className="works-feature-footer">
                        {projectLinks.length > 0 ? (
                          projectLinks.map(([key, href]) => (
                            <a key={key} href={href} target="_blank" rel="noreferrer" className="works-link">
                              {getLinkLabel(key)}
                            </a>
                          ))
                        ) : (
                          <span className="works-private">Private / Enterprise build</span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
