
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Nav from './components/Nav';
import Hero3D from './components/Hero3D';
import CustomCursor from './components/CustomCursor';
import ScrollInteractions from './components/ScrollInteractions';
import SectionTransition from './components/SectionTransition';
import DynamicBackground from './components/DynamicBackground';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import BlogPage from './components/Blog';
import BlogPostPage from './components/BlogPost';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import NotFound from './components/NotFound';
import VentureCheck from './components/VentureCheck';
import { useAdmin } from './hooks/useAdmin';

/* ── Progress bar ───────────────────────────────────────────── */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="progress-bar" style={{ scaleX }} />;
}

/* ── Home page ──────────────────────────────────────────────── */
function HomePage() {
  return (
    <>
      <Hero3D />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
    </>
  );
}

/* ── Protected Route ────────────────────────────────────────── */
function ProtectedAdmin() {
  const { isAuthenticated: authed } = useAdmin();
  return authed ? <AdminDashboard /> : <Navigate to="/admin" replace />;
}

/* ── Main App ───────────────────────────────────────────────── */
function AppLayout() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <ScrollInteractions />
      <SectionTransition />
      <DynamicBackground />
      <ProgressBar />

      <Routes>
        {/* Public routes — show Nav */}
        <Route
          path="/"
          element={
            <>
              <Nav />
              <HomePage />
            </>
          }
        />
        <Route
          path="/projects/venturecheck"
          element={
            <>
              <Nav />
              <VentureCheck />
              <Footer />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <Nav />
              <BlogPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <>
              <Nav />
              <BlogPostPage />
              <Footer />
            </>
          }
        />

        {/* Admin routes — no main Nav */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedAdmin />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppLayout;
