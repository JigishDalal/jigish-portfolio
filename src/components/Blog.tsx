import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getBlogPosts, BLOG_CATEGORIES, type BlogPost } from '../data/blog';

function BlogCard({ post, idx }: { post: BlogPost; idx: number }) {
  const categoryClass = `category-${post.category.toLowerCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.div
          className="blog-card glass"
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Cover Gradient */}
          <div style={{
            width: '100%',
            height: '180px',
            background: post.coverColor,
            borderRadius: '16px 16px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.2)',
            }} />
            <span style={{ fontSize: '48px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
              {post.category === 'Flutter' ? '🦋' :
               post.category === 'Android' ? '🤖' :
               post.category === 'Tech' ? '⚡' :
               post.category === 'Career' ? '🚀' : '✨'}
            </span>
          </div>

          <div style={{ padding: '24px' }}>
            {/* Category + Read time */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className={`category-badge ${categoryClass}`}>{post.category}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-dim)' }}>
                {post.readTime} min read
              </span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '10px' }}>
              {post.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              {post.excerpt}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className="tag" style={{ fontSize: '10px', padding: '2px 8px' }}>#{tag}</span>
              ))}
            </div>

            {/* Date + Arrow */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-dim)' }}>
                {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
              <motion.span
                style={{ color: 'var(--color-primary-2)', fontSize: '18px' }}
                whileHover={{ x: 4 }}
              >
                →
              </motion.span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const allPosts = getBlogPosts();

  const filtered = useMemo(() => {
    return allPosts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allPosts, activeCategory, search]);

  return (
    <div style={{ minHeight: '100svh', paddingTop: '100px' }}>
      <div className="mesh-bg" />
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '80px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '48px' }}
          className="blog-page-header"
        >
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-dim)', fontSize: '13px', marginBottom: '24px', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary-2)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-dim)')}
          >
            ← Back to Portfolio
          </Link>
          <span className="section-label">// thoughts & insights</span>
          <h1 className="section-title">The Blog</h1>
          <p className="section-subtitle">
            Candid takes on mobile development, career growth, and building software that matters.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ marginBottom: '24px' }}
        >
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input"
            style={{ maxWidth: '400px', background: 'var(--color-surface)' }}
          />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="filter-tabs"
        >
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + search}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {filtered.length > 0 ? (
              filtered.map((post, idx) => <BlogCard key={post.id} post={post} idx={idx} />)
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: 'var(--color-text-dim)' }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
                <p>No posts found. Try a different search or category.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Admin link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '60px' }}
        >
          <Link to="/admin" className="btn-ghost">✏️ Admin: Write New Post</Link>
        </motion.div>
      </div>
    </div>
  );
}
