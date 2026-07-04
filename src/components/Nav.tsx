import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '/#home', isAnchor: true, hash: 'home' },
  { label: 'Skills', href: '/#skills', isAnchor: true, hash: 'skills' },
  { label: 'Journey', href: '/#journey', isAnchor: true, hash: 'journey' },
  { label: 'Works', href: '/#works', isAnchor: true, hash: 'works' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const onActiveSection = (event: Event) => {
      setActiveSection((event as CustomEvent<string>).detail);
    };

    window.addEventListener('portfolio-active-section', onActiveSection);
    return () => window.removeEventListener('portfolio-active-section', onActiveSection);
  }, []);

  const isLinkActive = (link: typeof NAV_LINKS[0]) => {
    if (link.isAnchor) {
      return location.pathname === '/' && link.hash === activeSection;
    }
    return location.pathname === link.href;
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, link: typeof NAV_LINKS[0]) => {
    if (link.isAnchor) {
      if (location.pathname === '/') {
        e.preventDefault();
        const target = document.querySelector(`#${link.hash}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* Sticky Navigation Bar */}
      <header className="sub-nav">
        <div className="sub-nav-container">
          <Link to="/" className="sub-nav-title">
            Jigish Dalal
          </Link>

          {/* Right section: Links + Blue pill button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Desktop Navigation Links */}
            <div className="sub-desktop-links" style={{ display: 'flex', gap: '20px' }}>
              {NAV_LINKS.map(link => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => handleScroll(e, link)}
                  className={`sub-nav-link ${isLinkActive(link) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Action pill button */}
            <a href="mailto:jigishdalal@gmail.com" className="sub-nav-btn">
              Hire Me
            </a>

            {/* Mobile hamburger menu button */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="sub-mobile-burger"
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                }
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '52px',
              left: '0',
              right: '0',
              zIndex: 998,
              background: 'rgba(245, 245, 247, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--color-border)',
              padding: '12px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                to={link.href}
                className={`sub-nav-link ${isLinkActive(link) ? 'active' : ''}`}
                style={{ fontSize: '14px', padding: '6px 0' }}
                onClick={(e) => {
                  setMenuOpen(false);
                  handleScroll(e, link);
                }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive adjustments */}
      <style>{`
        /* Adjust body padding for single sticky header */
        body {
          padding-top: 52px;
        }
        @media (max-width: 834px) {
          .sub-desktop-links { display: none !important; }
          .sub-mobile-burger { display: block !important; }
        }
      `}</style>
    </>
  );
}
