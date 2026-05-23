import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600)); // UX delay
    const ok = login(password);
    if (ok) {
      navigate('/admin/dashboard');
    } else {
      setError('Incorrect password. Access denied.');
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="mesh-bg" />

      {/* Decorative rings */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[200, 350, 500].map((size, i) => (
          <motion.div
            key={i}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: size, height: size,
              marginTop: -size / 2, marginLeft: -size / 2,
              borderRadius: '50%',
              border: `1px solid rgba(99,102,241,${0.08 - i * 0.02})`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}
      >
        <div className="glass-2" style={{ padding: '48px 40px', borderRadius: '24px' }}>
          {/* Lock icon */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <motion.div
              animate={{ rotateY: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                width: '72px', height: '72px',
                margin: '0 auto 16px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))',
                border: '1px solid rgba(99,102,241,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '32px',
              }}
            >
              🔐
            </motion.div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
              Admin Portal
            </h1>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '13px' }}>
              Enter your password to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className="form-input"
                placeholder="••••••••••"
                autoFocus
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#fca5a5',
                  fontSize: '13px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                ⚠️ {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="btn-primary"
              disabled={loading || !password}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'inline-block', fontSize: '14px' }}
                  >⟳</motion.span>
                  Verifying...
                </span>
              ) : 'Enter Dashboard →'}
            </motion.button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <a href="/" style={{ color: 'var(--color-text-dim)', fontSize: '12px', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary-2)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-dim)')}
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
