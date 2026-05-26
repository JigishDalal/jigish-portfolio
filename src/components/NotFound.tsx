import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <div
        className="not-found-container"
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '4rem 3rem',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            style={{ fontSize: '5rem', lineHeight: 1 }}
          >
            🌌
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            404 - Lost in Space
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '1.1rem',
              maxWidth: '400px',
              margin: '0 0 1rem 0',
            }}
          >
            The page you are looking for has drifted off into the cosmos. Let's get you back home.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              ← Back to Earth
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
