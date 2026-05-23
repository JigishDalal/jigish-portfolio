import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '#home', section: 'home' },
  { label: 'Skills', href: '#skills', section: 'skills' },
  { label: 'Journey', href: '#journey', section: 'journey' },
  { label: 'Works', href: '#works', section: 'works' },
  { label: 'Blog', href: '/blog', section: '' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onActiveSection = (event: Event) => {
      setActiveSection((event as CustomEvent<string>).detail);
    };

    window.addEventListener('portfolio-active-section', onActiveSection);
    return () => window.removeEventListener('portfolio-active-section', onActiveSection);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith('#')) return location.pathname === '/' && href.slice(1) === activeSection;
    return location.pathname.startsWith(href);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith('#') && location.pathname === '/') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`nav glass ${scrolled ? 'glass-2' : ''}`}
        style={{ transition: 'all 0.3s ease' }}
      >
        {/* Logo */}
        <Link to="/" className="nav-logo gradient-text" style={{ textDecoration: 'none' }}>
          JD
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              to={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {<Link
            to="/admin"
            style={{
              marginLeft: '8px',
              padding: '7px 16px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 600,
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.25)',
              color: 'var(--color-primary-2)',
              transition: 'all 0.2s',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
          </Link>}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="mobile-burger"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            color: 'var(--color-text)',
          }}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            }
          </svg>
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '72px',
              left: '16px',
              right: '16px',
              zIndex: 49,
              borderRadius: '16px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
            className="glass-2"
          >
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                to={link.href}
                className="nav-link"
                style={{ borderRadius: '10px', display: 'block' }}
                onClick={(e) => {
                  setMenuOpen(false);
                  handleScroll(e, link.href);
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="nav-link"
              style={{ borderRadius: '10px', color: 'var(--color-primary-2)', display: 'block' }}
              onClick={() => setMenuOpen(false)}
            >
              Admin Panel
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </>
  );
}
