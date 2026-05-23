
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

const SKILLS = [
  {
    category: 'Languages & Frameworks',
    icon: '⚡',
    color: '#6366f1',
    level: 92,
    focus: 'Production mobile interfaces and typed application logic.',
    items: ['Kotlin', 'Java', 'Dart', 'Flutter', 'Angular', 'TypeScript', 'Spring Boot'],
  },
  {
    category: 'Databases & Cloud',
    icon: '☁️',
    color: '#22d3ee',
    level: 84,
    focus: 'Reliable sync, API integration, and app data layers.',
    items: ['MySQL', 'Firebase', 'Firestore', 'REST APIs', 'SQLite'],
  },
  {
    category: 'Tools & Design',
    icon: '🛠',
    color: '#a855f7',
    level: 88,
    focus: 'Developer workflows from design handoff to release QA.',
    items: ['Android Studio', 'Xcode', 'VS Code', 'Figma', 'Postman', 'Jira', 'Git'],
  },
  {
    category: 'Specializations',
    icon: '🤖',
    color: '#f59e0b',
    level: 90,
    focus: 'Polished app behavior, performance, and complex user flows.',
    items: ['AI-Assisted Dev', 'Material Design', 'Cupertino UI', 'Edge Detection', 'Performance Tuning'],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Skills() {
  return (
    <section id="skills" className="section capabilities-section">
      <div className="container">
        <motion.div
          className="capabilities-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// capabilities</span>
          <h2 className="section-title">What I Build With</h2>
          <p className="section-subtitle">
            A practical toolkit shaped across 8+ years of shipping production-grade mobile and web products.
          </p>
        </motion.div>

        <motion.div
          className="capabilities-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SKILLS.map((group) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              className="capability-card glass"
              style={{ '--accent': group.color, '--level': `${group.level}%` } as CSSProperties}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--x', `${x}%`);
                e.currentTarget.style.setProperty('--y', `${y}%`);
              }}
            >
              <div className="capability-card-inner">
                <div className="capability-header">
                  <div className="capability-icon">
                    {group.icon}
                  </div>
                  <div>
                    <p className="capability-eyebrow">Capability</p>
                    <h3 className="capability-title">
                      {group.category}
                    </h3>
                  </div>
                </div>

                <p className="capability-focus">{group.focus}</p>

                <div className="capability-meter" aria-label={`${group.category} depth ${group.level}%`}>
                  <span />
                </div>

                <div className="capability-tags">
                  {group.items.map((item) => (
                    <span key={item} className="tag capability-tag">{item}</span>
                  ))}
                </div>
              </div>

              <div className="capability-watermark" aria-hidden="true">
                <span>
                  {group.icon}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="capability-stat-strip glass"
        >
          {[
            { val: '8+', label: 'Years of Experience' },
            { val: '10+', label: 'Production Apps' },
            { val: '4', label: 'Tech Stacks Mastered' },
            { val: '3', label: 'App Stores Published' },
          ].map((s) => (
            <div key={s.label} className="capability-stat">
              <div className="gradient-text capability-stat-value">
                {s.val}
              </div>
              <div className="capability-stat-label">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
