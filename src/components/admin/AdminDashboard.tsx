import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';
import BlogEditor from './BlogEditor';
import PortfolioEditor from './PortfolioEditor';
import { getBlogPosts } from '../../data/blog';
import { getPortfolioItems } from '../../data/portfolio';

type Tab = 'overview' | 'blog' | 'portfolio';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const blogCount = getBlogPosts().length;
  const portfolioCount = getPortfolioItems().length;

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview',   label: 'Overview',   icon: '📊' },
    { id: 'portfolio',  label: 'Portfolio',  icon: '💼' },
    { id: 'blog',       label: 'Blog',       icon: '✏️' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar glass">
        <div style={{ marginBottom: '32px', paddingLeft: '8px' }}>
          <div className="gradient-text" style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
            JD Admin
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>Content Manager</div>
        </div>

        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link to="/" className="admin-nav-item" style={{ fontSize: '13px' }}>🌐 View Site</Link>
          <Link to="/blog" className="admin-nav-item" style={{ fontSize: '13px' }}>📖 View Blog</Link>
          <button onClick={handleLogout} className="admin-nav-item" style={{ color: '#fca5a5', fontSize: '13px' }}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
              {activeTab === 'overview' ? '👋 Welcome back, Jigish' : activeTab === 'blog' ? '✏️ Blog Manager' : '💼 Portfolio Manager'}
            </h1>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '13px' }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Blog Posts', value: blogCount, icon: '✏️', color: '#6366f1', tab: 'blog' as Tab },
                { label: 'Portfolio Projects', value: portfolioCount, icon: '💼', color: '#a855f7', tab: 'portfolio' as Tab },
                { label: 'Featured Projects', value: getPortfolioItems().filter(i => i.featured).length, icon: '⭐', color: '#f59e0b', tab: 'portfolio' as Tab },
              ].map(stat => (
                <motion.div
                  key={stat.label}
                  className="card glass"
                  onClick={() => setActiveTab(stat.tab)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
                  <div style={{ fontSize: '40px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ color: 'var(--color-text-dim)', fontSize: '13px', marginTop: '4px' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick actions */}
            <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Quick Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {[
                { label: 'Write New Blog Post', icon: '✏️', tab: 'blog' as Tab, color: '#6366f1' },
                { label: 'Add Portfolio Project', icon: '➕', tab: 'portfolio' as Tab, color: '#a855f7' },
                { label: 'Manage Blog Posts', icon: '📋', tab: 'blog' as Tab, color: '#22d3ee' },
                { label: 'Manage Projects', icon: '🗂', tab: 'portfolio' as Tab, color: '#f59e0b' },
              ].map(action => (
                <motion.button
                  key={action.label}
                  onClick={() => setActiveTab(action.tab)}
                  whileHover={{ y: -2 }}
                  className="glass"
                  style={{
                    padding: '16px 20px', borderRadius: '12px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    border: `1px solid ${action.color}20`,
                    background: `${action.color}08`,
                    font: 'inherit', textAlign: 'left', color: 'var(--color-text)',
                    fontSize: '14px', fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{action.icon}</span>
                  {action.label}
                </motion.button>
              ))}
            </div>

            {/* Tips */}
            <div className="glass" style={{ marginTop: '32px', padding: '20px 24px', borderRadius: '14px', border: '1px solid rgba(99,102,241,0.15)' }}>
              <h4 style={{ color: 'var(--color-primary-2)', fontSize: '13px', fontFamily: 'var(--font-mono)', marginBottom: '8px', letterSpacing: '0.08em' }}>// HOW IT WORKS</h4>
              <ul style={{ color: 'var(--color-text-muted)', fontSize: '13px', lineHeight: 1.8, paddingLeft: '16px' }}>
                <li>All data is stored in your browser's <code style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.07)', padding: '1px 6px', borderRadius: '4px' }}>localStorage</code> — no server needed.</li>
                <li>Changes are saved automatically when you click <strong>Save</strong>.</li>
                <li>Blog posts render <strong>Markdown</strong> — use # headings, **bold**, `code`, etc.</li>
                <li>Featured projects appear highlighted in the Works section.</li>
                <li>Your session is active until you close the browser tab.</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <BlogEditor />
          </motion.div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <PortfolioEditor />
          </motion.div>
        )}
      </div>
    </div>
  );
}
