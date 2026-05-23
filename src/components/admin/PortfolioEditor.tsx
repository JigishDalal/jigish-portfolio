import { useState } from 'react';
import { motion } from 'framer-motion';
import { getPortfolioItems, savePortfolioItems, PORTFOLIO_CATEGORIES, type PortfolioItem, type PortfolioCategory } from '../../data/portfolio';

const COVER_GRADIENTS = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #06b6d4, #6366f1)',
  'linear-gradient(135deg, #a855f7, #6366f1)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #10b981, #6366f1)',
  'linear-gradient(135deg, #ec4899, #8b5cf6)',
  'linear-gradient(135deg, #22d3ee, #a855f7)',
  'linear-gradient(135deg, #84cc16, #06b6d4)',
];

const EMPTY_ITEM: Omit<PortfolioItem, 'id'> = {
  title: '',
  category: 'Mobile App',
  description: '',
  tech: [],
  links: {},
  coverColor: COVER_GRADIENTS[0],
  featured: false,
  year: new Date().getFullYear().toString(),
};

export default function PortfolioEditor() {
  const [items, setItems] = useState<PortfolioItem[]>(getPortfolioItems());
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<Omit<PortfolioItem, 'id'>>(EMPTY_ITEM);
  const [techInput, setTechInput] = useState('');
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState<string>('All');

  const openNew = () => {
    setForm({ ...EMPTY_ITEM, year: new Date().getFullYear().toString() });
    setTechInput('');
    setEditing(null);
    setIsNew(true);
  };

  const openEdit = (item: PortfolioItem) => {
    setForm({ ...item });
    setTechInput('');
    setEditing(item);
    setIsNew(false);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.description.trim()) return;
    const newItem: PortfolioItem = {
      ...form,
      id: editing?.id || Date.now().toString(),
    };
    let updated: PortfolioItem[];
    if (isNew) {
      updated = [newItem, ...items];
    } else {
      updated = items.map(i => i.id === editing?.id ? newItem : i);
    }
    savePortfolioItems(updated);
    setItems(updated);
    setEditing(null);
    setIsNew(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDelete = (id: string) => {
    const updated = items.filter(i => i.id !== id);
    savePortfolioItems(updated);
    setItems(updated);
    setDeleteConfirm(null);
    if (editing?.id === id) { setEditing(null); setIsNew(false); }
  };

  const toggleFeatured = (id: string) => {
    const updated = items.map(i => i.id === id ? { ...i, featured: !i.featured } : i);
    savePortfolioItems(updated);
    setItems(updated);
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.tech.includes(t)) {
      setForm(f => ({ ...f, tech: [...f.tech, t] }));
    }
    setTechInput('');
  };

  const filteredItems = filterCat === 'All' ? items : items.filter(i => i.category === filterCat);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: editing || isNew ? '1fr 1.3fr' : '1fr', gap: '24px' }}>
      {/* LEFT: Items List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>Portfolio ({items.length})</h2>
          <motion.button onClick={openNew} className="btn-primary" style={{ padding: '9px 18px', fontSize: '13px' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            + Add Project
          </motion.button>
        </div>

        {saved && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '10px 16px', borderRadius: '10px', marginBottom: '16px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: '#6ee7b7', fontSize: '13px' }}>
            ✅ Saved successfully!
          </motion.div>
        )}

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {['All', ...PORTFOLIO_CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`filter-tab ${filterCat === cat ? 'active' : ''}`}
              style={{ padding: '5px 12px', fontSize: '11px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-dim)' }}>No projects in this category.</div>
          )}
          {filteredItems.map(item => (
            <motion.div key={item.id} layout initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="glass"
              style={{ padding: '16px 20px', borderRadius: '12px', border: editing?.id === item.id ? '1px solid rgba(99,102,241,0.4)' : undefined, cursor: 'pointer' }}
              onClick={() => openEdit(item)}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: item.coverColor, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>{item.title}</span>
                    {item.featured && <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '9999px', background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', color: '#fcd34d' }}>⭐ Featured</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-primary-2)', padding: '2px 8px', borderRadius: '9999px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>{item.category}</span>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>{item.year}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => toggleFeatured(item.id)}
                    title={item.featured ? 'Unfeature' : 'Feature'}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', opacity: item.featured ? 1 : 0.3, transition: 'opacity 0.2s' }}
                  >⭐</button>
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-dim)', fontSize: '16px', lineHeight: 1 }}
                  >🗑</button>
                </div>
              </div>
              {deleteConfirm === item.id && (
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                  <span style={{ fontSize: '12px', color: '#fca5a5' }}>Delete this project?</span>
                  <button onClick={() => handleDelete(item.id)} style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', fontSize: '12px', cursor: 'pointer' }}>Yes</button>
                  <button onClick={() => setDeleteConfirm(null)} style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '12px', cursor: 'pointer' }}>Cancel</button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT: Editor Form */}
      {(editing || isNew) && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}
          className="glass" style={{ padding: '28px', borderRadius: '16px', height: 'fit-content', position: 'sticky', top: '100px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>{isNew ? '➕ New Project' : '✏️ Edit Project'}</h3>
            <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-dim)', fontSize: '18px' }}>✕</button>
          </div>

          <div className="form-group">
            <label className="form-label">Project Title *</label>
            <input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Amazing App..." />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as PortfolioCategory }))}>
                {PORTFOLIO_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Year</label>
              <input className="form-input" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="2024" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea className="form-textarea" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What this project does..." />
          </div>

          <div className="form-group">
            <label className="form-label">Cover Gradient</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {COVER_GRADIENTS.map(g => (
                <div key={g} onClick={() => setForm(f => ({ ...f, coverColor: g }))}
                  style={{ width: '36px', height: '36px', borderRadius: '8px', background: g, cursor: 'pointer', border: form.coverColor === g ? '2px solid #fff' : '2px solid transparent', transition: 'border-color 0.2s' }}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tech Stack</label>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
              {form.tech.map(t => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '9999px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)', fontSize: '12px', color: 'var(--color-primary-2)' }}>
                  {t}<button onClick={() => setForm(f => ({ ...f, tech: f.tech.filter(x => x !== t) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', lineHeight: 1, padding: '0 0 0 2px', fontSize: '12px' }}>✕</button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input className="form-input" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())} placeholder="Flutter, React... + Enter" style={{ flex: 1 }} />
              <button onClick={addTech} className="btn-ghost" style={{ padding: '10px 14px', fontSize: '12px', flexShrink: 0 }}>Add</button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Links (optional)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { key: 'live', placeholder: 'https://yourapp.com', label: '🌐 Live URL' },
                { key: 'github', placeholder: 'https://github.com/...', label: '⌨ GitHub' },
                { key: 'playstore', placeholder: 'https://play.google.com/...', label: '▶ Play Store' },
                { key: 'appstore', placeholder: 'https://apps.apple.com/...', label: ' App Store' },
              ].map(({ key, placeholder, label }) => (
                <input
                  key={key}
                  className="form-input"
                  value={(form.links as Record<string, string>)[key] || ''}
                  onChange={e => setForm(f => ({ ...f, links: { ...f.links, [key]: e.target.value } }))}
                  placeholder={`${label}: ${placeholder}`}
                  style={{ fontSize: '12px' }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '14px 16px', borderRadius: '10px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', cursor: 'pointer' }}
            onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
          >
            <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: form.featured ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'transparent', border: form.featured ? 'none' : '1px solid var(--color-border-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
              {form.featured && <span style={{ color: '#fff', fontSize: '12px', lineHeight: 1 }}>✓</span>}
            </div>
            <div>
              <div style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>⭐ Featured Project</div>
              <div style={{ color: 'var(--color-text-dim)', fontSize: '11px' }}>Show prominently on the homepage</div>
            </div>
          </div>

          <motion.button
            onClick={handleSave}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!form.title || !form.description}
          >
            💾 {isNew ? 'Add Project' : 'Save Changes'}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
