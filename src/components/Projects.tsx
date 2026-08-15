import { motion } from 'framer-motion';
import { getPortfolioItems } from '../data/portfolio';

export default function Projects() {
  const items = getPortfolioItems().filter(item => item.featured).slice(0, 4);

  return (
    <section id="works" className="section works-section">
      <div className="container">
        <motion.div className="works-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-label">// selected works</span>
          <h2 className="section-title">Case Study Console</h2>
          <p className="section-subtitle">Production apps across healthcare, fintech, and enterprise, organized for quick scanning and deeper inspection.</p>
        </motion.div>

        <div className="case-study-grid">
          {items.map((item, index) => (
            <motion.article key={item.id} className="case-study-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .55, delay: index * .08 }}>
              <div className="case-study-art" style={{ background: item.coverColor }} aria-hidden="true"><span className="case-study-device"><b>{item.title}</b><small>{item.category}</small></span></div>
              <div className="case-study-body">
                <div className="case-study-meta"><span>{item.category} / {item.year}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="case-study-tags">{item.tech.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
