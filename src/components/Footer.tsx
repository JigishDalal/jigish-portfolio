import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CONTACT = {
  email: 'Jigishdalal1995@gmail.com',
  phone: '+91-9409592045',
  location: 'Vadodara, Gujarat, India',
  linkedin: 'https://linkedin.com/in/jigishdalal',
  github: 'https://github.com/jigishdalal',
};

export default function Footer() {
  return (
    <footer id="contact" style={{ padding: '80px 24px 64px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '60px' }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: '28px', fontWeight: 600, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '12px', letterSpacing: '-0.02em' }}>
               Jigish
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', lineHeight: 1.6, maxWidth: '220px' }}>
              Senior Software Developer specializing in Flutter & Android. Building the future, one app at a time.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: '12px', fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-dim)', marginBottom: '16px' }}>
              Navigate
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', lineHeight: '2.41' }}>
              {[
                { label: 'Home', href: '/#home' },
                { label: 'Skills', href: '/#skills' },
                { label: 'Journey', href: '/#journey' },
                { label: 'Works', href: '/#works' },
              ].map(link => (
                <Link key={link.label} to={link.href} style={{ color: 'var(--color-text-muted)', fontSize: '14px', transition: 'color 0.2s', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '12px', fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-dim)', marginBottom: '16px' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', lineHeight: '2.41' }}>
              <a href={`mailto:${CONTACT.email}`} style={{ color: 'var(--color-text-muted)', fontSize: '13px', wordBreak: 'break-all', transition: 'color 0.2s', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                📧 {CONTACT.email}
              </a>
              <a href={`tel:${CONTACT.phone}`} style={{ color: 'var(--color-text-muted)', fontSize: '13px', transition: 'color 0.2s', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                📞 {CONTACT.phone}
              </a>
              <span style={{ color: 'var(--color-text-dim)', fontSize: '13px', fontFamily: 'var(--font-body)' }}>📍 {CONTACT.location}</span>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 style={{ fontSize: '12px', fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-dim)', marginBottom: '16px' }}>
              Let's Build
            </h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
              Open to exciting opportunities and collaborations.
            </p>
            <motion.a
              href={`mailto:${CONTACT.email}`}
              className="btn-primary"
              style={{ display: 'inline-flex', fontSize: '13px' }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch →
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '32px',
          borderTop: '1px solid var(--color-border)',
        }}>
          <p style={{ color: 'var(--color-text-dim)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
            © {new Date().getFullYear()} Jigish Dalal. Built with React + Tailwind-free Vanilla CSS.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { label: 'LinkedIn', href: CONTACT.linkedin, icon: '💼' },
              { label: 'GitHub', href: CONTACT.github, icon: '🐙' },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  color: 'var(--color-text-dim)', fontSize: '12px',
                  padding: '6px 14px', borderRadius: '9999px',
                  border: '1px solid var(--color-border)',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-body)'
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-text-dim)'; }}
              >
                {s.icon} {s.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
