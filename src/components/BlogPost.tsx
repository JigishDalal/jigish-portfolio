import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogPost, getBlogPosts } from '../data/blog';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPost(slug) : undefined;
  const allPosts = getBlogPosts();
  const related = allPosts.filter(p => p.slug !== slug && p.category === post?.category).slice(0, 2);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) {
    return (
      <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <div style={{ fontSize: '48px' }}>📭</div>
        <h2 style={{ color: '#fff' }}>Post not found</h2>
        <button onClick={() => navigate('/blog')} className="btn-primary">Back to Blog</button>
      </div>
    );
  }

  const categoryClass = `category-${post.category.toLowerCase()}`;

  return (
    <div style={{ minHeight: '100svh', paddingTop: '80px' }}>
      <div className="mesh-bg" />

      {/* Hero Banner */}
      <div style={{
        width: '100%',
        height: '360px',
        background: post.coverColor,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}
        >
          <div style={{ fontSize: '64px', marginBottom: '16px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}>
            {post.category === 'Flutter' ? '🦋' :
             post.category === 'Android' ? '🤖' :
             post.category === 'Tech' ? '⚡' :
             post.category === 'Career' ? '🚀' : '✨'}
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 800, color: '#fff', maxWidth: '800px', lineHeight: 1.2, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            {post.title}
          </h1>
        </motion.div>
      </div>

      <div className="container-narrow" style={{ padding: '48px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Back nav */}
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-dim)', fontSize: '13px', marginBottom: '32px', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary-2)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-dim)')}
        >
          ← All Posts
        </Link>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '40px' }}
        >
          <span className={`category-badge ${categoryClass}`}>{post.category}</span>
          <span style={{ color: 'var(--color-text-dim)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
            {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span style={{ color: 'var(--color-text-dim)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
            · {post.readTime} min read
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {post.tags.map(tag => (
              <span key={tag} className="tag" style={{ fontSize: '10px', padding: '2px 8px' }}>#{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Author Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="glass"
          style={{ padding: '20px 24px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}
        >
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', fontWeight: 800, color: '#fff',
            fontFamily: 'var(--font-heading)', flexShrink: 0,
          }}>
            JD
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '15px' }}>Jigish Dalal</div>
            <div style={{ color: 'var(--color-text-dim)', fontSize: '12px' }}>Senior Software Developer · Flutter & Android Expert</div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="prose"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Related Posts */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: '64px' }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>Related Posts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <motion.div
                    className="card glass"
                    whileHover={{ y: -4 }}
                    style={{ padding: '20px' }}
                  >
                    <span className={`category-badge category-${p.category.toLowerCase()}`} style={{ marginBottom: '10px', display: 'inline-flex' }}>
                      {p.category}
                    </span>
                    <h4 style={{ color: '#fff', fontSize: '15px', lineHeight: 1.4, marginBottom: '8px' }}>{p.title}</h4>
                    <p style={{ color: 'var(--color-text-dim)', fontSize: '12px' }}>{p.readTime} min read →</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/blog" className="btn-ghost">← Back to All Posts</Link>
        </div>
      </div>
    </div>
  );
}
