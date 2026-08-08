import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import images
import vc1 from '../assets/vc_1.png';
import vc2 from '../assets/vc_2.png';
import vc3 from '../assets/vc_3.png';
import vc4 from '../assets/vc_4.png';
import vc5 from '../assets/vc_5.png';

export default function VentureCheck() {
  const { scrollY } = useScroll();
  const yPhone1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const yPhone2 = useTransform(scrollY, [0, 1000], [0, -50]);

  useEffect(() => {
    document.title = "VentureCheck | AI Validation";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Validate your ideas instantly with AI powered insights.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Validate your ideas instantly with AI powered insights.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="vc-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .vc-page {
          background-color: #f6f7f9;
          min-height: 100vh;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #1a202c;
          overflow-x: hidden;
          /* Subtle mesh gradient background for the top */
          background-image: 
            radial-gradient(circle at 15% 50%, rgba(107, 102, 214, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 50%);
        }

        .vc-nav-placeholder {
          height: 80px;
          display: flex;
          align-items: center;
          padding: 0 5%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .vc-nav-placeholder .logo {
          font-weight: 700;
          font-size: 1.5rem;
          color: #1a202c;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .vc-nav-placeholder .logo-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #6b66d6;
        }
        
        .vc-nav-placeholder .logo-circle.secondary {
          background: rgba(107, 102, 214, 0.5);
          margin-left: -12px;
        }

        .vc-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5%;
        }

        /* Hero Section */
        .vc-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6rem 0 8rem 0;
          gap: 4rem;
        }

        @media (max-width: 900px) {
          .vc-hero {
            flex-direction: column;
            text-align: center;
            padding: 4rem 0;
          }
        }

        .vc-hero-content {
          flex: 1;
          max-width: 540px;
          position: relative;
        }

        .vc-hero-title {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          color: #0f172a;
        }

        @media (max-width: 600px) {
          .vc-hero-title {
            font-size: 2.5rem;
          }
        }

        .vc-hero-subtitle {
          font-size: 1.25rem;
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 600px) {
          .vc-hero-subtitle {
            font-size: 1.1rem;
          }
        }

        .vc-hero-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        @media (max-width: 900px) {
          .vc-hero-buttons {
            justify-content: center;
          }
        }

        .vc-btn-primary {
          background-color: #6b66d6;
          color: white;
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 12px;
          text-decoration: none;
          font-size: 1.1rem;
          transition: all 0.2s ease;
          box-shadow: 0 10px 25px -5px rgba(107, 102, 214, 0.4);
        }

        .vc-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(107, 102, 214, 0.5);
          background-color: #5a55c4;
        }

        .vc-social-proof {
          margin-top: 3rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 900px) {
          .vc-social-proof {
            justify-content: center;
          }
        }

        .vc-avatars {
          display: flex;
        }

        .vc-avatars img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid #f6f7f9;
          margin-left: -12px;
          background: #e2e8f0;
        }

        .vc-avatars img:first-child {
          margin-left: 0;
        }

        .vc-proof-text {
          font-size: 0.95rem;
          color: #4a5568;
          font-weight: 500;
        }

        /* Hero Image - Overlapping Tilted Phones */
        .vc-hero-images {
          flex: 1;
          position: relative;
          height: 600px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
        }

        @media (max-width: 900px) {
          .vc-hero-images {
            height: 500px;
          }
        }

        .vc-phone-mockup {
          position: absolute;
          width: 280px;
          border-radius: 40px;
          background: #fff;
          padding: 8px;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05);
        }

        .vc-phone-mockup img {
          width: 100%;
          height: auto;
          border-radius: 32px;
          display: block;
        }

        .vc-phone-1 {
          z-index: 2;
          transform: rotate(-5deg) translateY(0px) translateX(-50px);
        }

        .vc-phone-2 {
          z-index: 1;
          transform: rotate(5deg) translateY(40px) translateX(60px) scale(0.95);
          opacity: 0.9;
        }

        @media (max-width: 600px) {
          .vc-phone-mockup { width: 180px; }
          .vc-phone-1 { transform: rotate(-5deg) translateX(-15px); }
          .vc-phone-2 { transform: rotate(5deg) translateX(30px) translateY(20px) scale(0.95); }
          .vc-hero-images { height: 400px; }
        }

        /* Hover Tooltips */
        .vc-hover-tooltip {
          position: absolute;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.4);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          padding: 12px 16px;
          border-radius: 12px;
          width: 200px;
          pointer-events: none;
          z-index: 20;
        }

        .vc-tooltip-title {
          font-weight: 700;
          font-size: 0.9rem;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .vc-tooltip-desc {
          font-size: 0.8rem;
          color: #64748b;
          line-height: 1.4;
        }

        /* Tooltip variations */
        .vc-tooltip-left {
          top: 30%;
          right: 110%;
        }
        
        .vc-tooltip-left::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -6px;
          margin-top: -6px;
          border-width: 6px 0 6px 6px;
          border-style: solid;
          border-color: transparent transparent transparent rgba(255, 255, 255, 0.95);
        }

        .vc-tooltip-right {
          top: 40%;
          left: 110%;
        }

        .vc-tooltip-right::after {
          content: '';
          position: absolute;
          top: 50%;
          left: -6px;
          margin-top: -6px;
          border-width: 6px 6px 6px 0;
          border-style: solid;
          border-color: transparent rgba(255, 255, 255, 0.95) transparent transparent;
        }

        @media (max-width: 900px) {
          .vc-hover-tooltip { display: none; }
        }

        /* Features Overline Section */
        .vc-features-header {
          text-align: center;
          margin-bottom: 6rem;
          padding-top: 4rem;
        }

        .vc-overline {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #a0aec0;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .vc-features-title {
          font-size: 2.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #0f172a;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.2;
        }

        @media (max-width: 600px) {
          .vc-features-title { font-size: 2.25rem; }
        }

        /* Grid Features (Bento Style) */
        .vc-bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-bottom: 8rem;
        }

        @media (max-width: 1000px) {
          .vc-bento-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .vc-bento-grid { grid-template-columns: 1fr; }
        }

        .vc-bento-item {
          text-align: center;
          padding: 2rem;
        }

        .vc-bento-icon {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          margin: 0 auto 1.5rem auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }

        .icon-purple { background: #efeefc; color: #6b66d6; }
        .icon-green { background: #e6f6ee; color: #23a059; }
        .icon-orange { background: #fff0e6; color: #f97316; }
        .icon-blue { background: #e6f3ff; color: #0284c7; }

        .vc-bento-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.75rem;
        }

        .vc-bento-desc {
          color: #64748b;
          font-size: 1rem;
          line-height: 1.6;
        }

        /* Alternating How It Works Section */
        .vc-step {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6rem;
          margin-bottom: 8rem;
        }

        .vc-step:nth-child(even) {
          flex-direction: row-reverse;
        }

        @media (max-width: 900px) {
          .vc-step, .vc-step:nth-child(even) {
            flex-direction: column;
            gap: 3rem;
            text-align: center;
          }
        }

        .vc-step-content {
          flex: 1;
        }

        .vc-step-number {
          font-size: 5rem;
          font-weight: 700;
          color: #6b66d6;
          opacity: 0.9;
          line-height: 1;
          margin-bottom: 1rem;
          letter-spacing: -0.05em;
        }

        .vc-step-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
        }
        
        @media (max-width: 600px) {
          .vc-step-title { font-size: 1.75rem; }
          .vc-step-number { font-size: 3.5rem; }
        }

        .vc-step-desc {
          font-size: 1.15rem;
          color: #64748b;
          line-height: 1.6;
        }

        .vc-step-image {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .vc-step-mockup {
          width: 300px;
          border-radius: 40px;
          background: #fff;
          padding: 8px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
        
        @media (max-width: 600px) {
          .vc-step-mockup { width: 100%; max-width: 260px; }
        }

        .vc-step-mockup img {
          width: 100%;
          height: auto;
          border-radius: 32px;
          display: block;
        }

        /* CTA Section */
        .vc-cta-section {
          background: #1a202c;
          border-radius: 32px;
          padding: 5rem 2rem;
          text-align: center;
          margin-bottom: 6rem;
        }

        .vc-cta-title {
          color: #fff;
          font-size: 3rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }
        
        @media (max-width: 600px) {
          .vc-cta-title { font-size: 2rem; }
          .vc-cta-section { padding: 3rem 1.5rem; }
        }

        .vc-cta-desc {
          color: #a0aec0;
          font-size: 1.25rem;
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>

      {/* Fake Nav for realism */}
      <div className="vc-nav-placeholder">
        <div className="logo">
          <div className="logo-circle"></div>
          <div className="logo-circle secondary"></div>
          VentureCheck
        </div>
      </div>

      <div className="vc-container">

        {/* HERO SECTION */}
        <section className="vc-hero">
          <motion.div
            className="vc-hero-content"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.h1
              className="vc-hero-title"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              Validate all your startup ideas in one secure place.
            </motion.h1>
            <motion.p
              className="vc-hero-subtitle"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              VentureCheck is now available to download. Get real-time SWOT analysis, market sizing, and MVP architectures instantly.
            </motion.p>
            <motion.div
              className="vc-hero-buttons"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              <motion.a
                href="https://github.com/JigishDalal/ventureCheck"
                target="_blank"
                rel="noreferrer"
                className="vc-btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: 'inline-block' }}
              >
                View on GitHub
              </motion.a>
            </motion.div>

            <motion.div
              className="vc-social-proof"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
            </motion.div>
          </motion.div>

          <div className="vc-hero-images">
            <motion.div
              className="vc-phone-mockup vc-phone-1"
              style={{ y: yPhone1 }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: -50 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                whileHover="hover"
                initial="initial"
                variants={{
                  initial: {},
                  hover: { scale: 1.03, rotate: -2, zIndex: 10, transition: { duration: 0.2 } }
                }}
              >
                <img src={vc1} alt="VentureCheck App Main Screen" style={{ cursor: 'pointer' }} />

                <motion.div
                  className="vc-hover-tooltip vc-tooltip-left"
                  variants={{
                    initial: { opacity: 0, scale: 0.8, x: 20 },
                    hover: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } }
                  }}
                >
                  <div className="vc-tooltip-title">AI Architecture</div>
                  <div className="vc-tooltip-desc">Generates your MVP structure</div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="vc-phone-mockup vc-phone-2"
              style={{ y: yPhone2 }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 0.9, x: 60 }}
              transition={{ duration: 1, delay: 0.4, type: "spring" }}
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                whileHover="hover"
                initial="initial"
                variants={{
                  initial: {},
                  hover: { scale: 1.03, rotate: 2, zIndex: 10, transition: { duration: 0.2 } }
                }}
              >
                <img src={vc2} alt="VentureCheck App Validation" style={{ cursor: 'pointer' }} />

                <motion.div
                  className="vc-hover-tooltip vc-tooltip-right"
                  variants={{
                    initial: { opacity: 0, scale: 0.8, x: -20 },
                    hover: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } }
                  }}
                >
                  <div className="vc-tooltip-title">Market Sizing</div>
                  <div className="vc-tooltip-desc">Calculates TAM instantly</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES HEADER */}
        <motion.div
          className="vc-features-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="vc-overline">App Features</div>
          <h2 className="vc-features-title">VentureCheck makes your validation stress-free for you to have perfect control.</h2>
        </motion.div>

        {/* BENTO GRID */}
        <div className="vc-bento-grid">
          <motion.div className="vc-bento-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="vc-bento-icon icon-purple">⚡️</div>
            <h3 className="vc-bento-title">Instant Results</h3>
            <p className="vc-bento-desc">Validate your core idea in seconds instead of spending weeks on research.</p>
          </motion.div>
          <motion.div className="vc-bento-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="vc-bento-icon icon-green">🔒</div>
            <h3 className="vc-bento-title">Secure Analysis</h3>
            <p className="vc-bento-desc">Your startup ideas remain completely private and secure during processing.</p>
          </motion.div>
          <motion.div className="vc-bento-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <div className="vc-bento-icon icon-orange">📈</div>
            <h3 className="vc-bento-title">Market Data</h3>
            <p className="vc-bento-desc">Real-time market sizing and total addressable market (TAM) estimations.</p>
          </motion.div>
          <motion.div className="vc-bento-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="vc-bento-icon icon-blue">🤖</div>
            <h3 className="vc-bento-title">AI Powered</h3>
            <p className="vc-bento-desc">Leverage cutting edge LLMs to generate MVP architectures and prompts.</p>
          </motion.div>
        </div>

        {/* HOW IT WORKS HEADER */}
        <motion.div
          className="vc-features-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="vc-overline">How It Works</div>
          <h2 className="vc-features-title">Download the app, input your idea and voilà, you're all set!</h2>
        </motion.div>

        {/* STEPS */}
        <section className="vc-step">
          <motion.div
            className="vc-step-content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="vc-step-number">01</div>
            <h2 className="vc-step-title">Automated MVP Prompts</h2>
            <p className="vc-step-desc">
              Skip the boilerplate. VentureCheck automatically generates a highly detailed, professional prompt designed for AI coding assistants (like Cursor or Claude) to instantly build your Minimum Viable Product.
            </p>
          </motion.div>
          <motion.div
            className="vc-step-image"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="vc-step-mockup">
              <img src={vc3} alt="MVP Generator Prompt" />
            </div>
          </motion.div>
        </section>

        <section className="vc-step">
          <motion.div
            className="vc-step-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="vc-step-number">02</div>
            <h2 className="vc-step-title">Strategic SWOT Analysis</h2>
            <p className="vc-step-desc">
              Understand your market positioning before writing a single line of code. We break down the Strengths, Weaknesses, Opportunities, and Threats for your specific product niche.
            </p>
          </motion.div>
          <motion.div
            className="vc-step-image"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="vc-step-mockup">
              <img src={vc4} alt="SWOT Analysis" />
            </div>
          </motion.div>
        </section>

        <section className="vc-step">
          <motion.div
            className="vc-step-content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="vc-step-number">03</div>
            <h2 className="vc-step-title">Market Size & Verdict</h2>
            <p className="vc-step-desc">
              Get accurate Total Addressable Market (TAM) estimates, industry growth rates, and a final AI Recommendation Verdict on whether you should proceed with the venture.
            </p>
          </motion.div>
          <motion.div
            className="vc-step-image"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="vc-step-mockup">
              <img src={vc5} alt="Market Size and Growth" />
            </div>
          </motion.div>
        </section>

        {/* BOTTOM CTA */}
        <motion.section
          className="vc-cta-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="vc-cta-title">Ready to validate your next big idea?</h2>
          <p className="vc-cta-desc">
            Join thousands of founders using AI to skip the guesswork and launch successful products faster.
          </p>
          <a href="https://github.com/JigishDalal/ventureCheck" target="_blank" rel="noreferrer" className="vc-btn-primary">
            Get VentureCheck Now
          </a>
        </motion.section>

      </div>
    </div>
  );
}
