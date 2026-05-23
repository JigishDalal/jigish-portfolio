import { useState } from 'react';
import { motion } from 'framer-motion';
import { getBlogPosts, saveBlogPosts, type BlogPost, generateSlug } from '../../data/blog';

const CATEGORIES = ['Tech', 'Flutter', 'Android', 'Career', 'Life'] as const;
const COVER_GRADIENTS = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #06b6d4, #6366f1)',
  'linear-gradient(135deg, #a855f7, #6366f1)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #10b981, #6366f1)',
  'linear-gradient(135deg, #ec4899, #8b5cf6)',
];

const EMPTY: Omit<BlogPost, 'id'> = {
  slug: '',
  title: '',
  category: 'Tech',
  tags: [],
  content: '# Your Post Title\n\nStart writing here...',
  excerpt: '',
  publishedAt: new Date().toISOString().split('T')[0],
  readTime: 5,
  coverColor: COVER_GRADIENTS[0],
};

export default function BlogEditor() {
  const [posts, setPosts] = useState<BlogPost[]>(getBlogPosts());
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<Omit<BlogPost, 'id'>>(EMPTY);
  const [tagInput, setTagInput] = useState('');
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);

  const openNew = () => {
    setForm({ ...EMPTY, publishedAt: new Date().toISOString().split('T')[0] });
    setTagInput('');
    setEditing(null);
    setIsNew(true);
    setPreview(false);
  };

  const openEdit = (post: BlogPost) => {
    setForm({ ...post });
    setTagInput('');
    setEditing(post);
    setIsNew(false);
    setPreview(false);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    const slug = form.slug || generateSlug(form.title);
    const newPost: BlogPost = {
      ...form,
      slug,
      id: editing?.id || Date.now().toString(),
    };
    let updated: BlogPost[];
    if (isNew) {
      updated = [newPost, ...posts];
    } else {
      updated = posts.map(p => p.id === editing?.id ? newPost : p);
    }
    saveBlogPosts(updated);
    setPosts(updated);
    setEditing(null);
    setIsNew(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDelete = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    saveBlogPosts(updated);
    setPosts(updated);
    setDeleteConfirm(null);
    if (editing?.id === id) { setEditing(null); setIsNew(false); }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm(f => ({ ...f, tags: [...f.tags, t] }));
    }
    setTagInput('');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: editing || isNew ? '1fr 1.4fr' : '1fr', gap: '24px' }}>
      {/* LEFT: Post List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>Blog Posts ({posts.length})</h2>
          <motion.button
            onClick={openNew}
            className="btn-primary"
            style={{ padding: '9px 18px', fontSize: '13px' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            + New Post
          </motion.button>
        </div>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: '10px 16px', borderRadius: '10px', marginBottom: '16px',
              background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)',
              color: '#6ee7b7', fontSize: '13px',
            }}
          >
            ✅ Saved successfully!
          </motion.div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-dim)' }}>
              No posts yet. Create your first post!
            </div>
          )}
          {posts.map(post => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass"
              style={{
                padding: '16px 20px', borderRadius: '12px',
                border: editing?.id === post.id ? '1px solid rgba(99,102,241,0.4)' : undefined,
                cursor: 'pointer',
              }}
              onClick={() => openEdit(post)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className={`category-badge category-${post.category.toLowerCase()}`}>{post.category}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-dim)' }}>{post.publishedAt}</span>
                  </div>
                  <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.title}
                  </p>
                  <p style={{ color: 'var(--color-text-dim)', fontSize: '12px', marginTop: '4px' }}>{post.readTime} min read</p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); setDeleteConfirm(post.id); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-dim)', fontSize: '16px', padding: '4px', flexShrink: 0, lineHeight: 1 }}
                  title="Delete"
                >
                  🗑
                </button>
              </div>
              {deleteConfirm === post.id && (
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                  <span style={{ fontSize: '12px', color: '#fca5a5' }}>Delete this post?</span>
                  <button onClick={() => handleDelete(post.id)} style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', fontSize: '12px', cursor: 'pointer' }}>Yes</button>
                  <button onClick={() => setDeleteConfirm(null)} style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '12px', cursor: 'pointer' }}>Cancel</button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT: Editor */}
      {(editing || isNew) && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="glass"
          style={{ padding: '28px', borderRadius: '16px', height: 'fit-content', position: 'sticky', top: '100px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>{isNew ? '✏️ New Post' : '✏️ Edit Post'}</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setPreview(v => !v)}
                className="btn-ghost"
                style={{ padding: '6px 14px', fontSize: '12px' }}
              >
                {preview ? '📝 Edit' : '👁 Preview'}
              </button>
              <button
                onClick={() => { setEditing(null); setIsNew(false); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-dim)', fontSize: '18px' }}
              >
                ✕
              </button>
            </div>
          </div>

          {!preview ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  className="form-input"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: generateSlug(e.target.value) }))}
                  placeholder="Post title..."
                />
              </div>
              <div className="form-group">
                <label className="form-label">Slug (auto-generated)</label>
                <input className="form-input" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="post-slug" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as BlogPost['category'] }))}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Read Time (min)</label>
                  <input type="number" className="form-input" min={1} max={60} value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: +e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Publish Date</label>
                <input type="date" className="form-input" value={form.publishedAt} onChange={e => setForm(f => ({ ...f, publishedAt: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Cover Gradient</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {COVER_GRADIENTS.map(g => (
                    <div
                      key={g}
                      onClick={() => setForm(f => ({ ...f, coverColor: g }))}
                      style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        background: g, cursor: 'pointer',
                        border: form.coverColor === g ? '2px solid #fff' : '2px solid transparent',
                        transition: 'border-color 0.2s',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Excerpt *</label>
                <textarea className="form-textarea" rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Short description for cards..." />
              </div>
              <div className="form-group">
                <label className="form-label">Tags</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  {form.tags.map(t => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '9999px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)', fontSize: '12px', color: 'var(--color-primary-2)' }}>
                      {t}
                      <button onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', lineHeight: 1, padding: '0 0 0 2px', fontSize: '12px' }}>✕</button>
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input className="form-input" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add tag + Enter" style={{ flex: 1 }} />
                  <button onClick={addTag} className="btn-ghost" style={{ padding: '10px 16px', fontSize: '12px', flexShrink: 0 }}>Add</button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Content (Markdown) *</label>
                <textarea
                  className="form-textarea"
                  rows={14}
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  placeholder="Write your post in Markdown..."
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.6 }}
                />
              </div>
              <motion.button
                onClick={handleSave}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!form.title || !form.content || !form.excerpt}
              >
                💾 {isNew ? 'Publish Post' : 'Save Changes'}
              </motion.button>
            </div>
          ) : (
            <div>
              <div style={{ height: '120px', background: form.coverColor, borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
                {form.category === 'Flutter' ? '🦋' : form.category === 'Android' ? '🤖' : form.category === 'Tech' ? '⚡' : form.category === 'Career' ? '🚀' : '✨'}
              </div>
              <h2 style={{ color: '#fff', marginBottom: '12px', fontSize: '22px' }}>{form.title || 'Untitled'}</h2>
              <p style={{ color: 'var(--color-text-dim)', marginBottom: '20px', fontSize: '13px' }}>{form.excerpt}</p>
              <div className="prose" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <ReactMarkdownPreview content={form.content} />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// Lazy inline preview using dangerouslySetInnerHTML for simplicity
function ReactMarkdownPreview({ content }: { content: string }) {
  // Simple markdown to HTML conversion for preview
  const html = content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|b|l|c|p])/gm, '<p>')
    .replace(/\n```[\s\S]*?```/g, m => `<pre><code>${m.replace(/```\w*\n?/g, '')}</code></pre>`);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
