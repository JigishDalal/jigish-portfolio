import { useEffect, lazy, Suspense } from 'react';

const HeroScene3D = lazy(() => import('./HeroScene3D'));

export default function Hero3D() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.vesper-hero');
    const container = document.querySelector<HTMLElement>('.vesper-container');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let scrollFrame = 0;

    // Sequential fade-in animation for elements
    const elementsToReveal = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.vesper-kicker-wrapper, .vesper-title, .vesper-bottom-left, .vesper-bottom-right'
      )
    );

    elementsToReveal.forEach((el, index) => {
      const delay = reduceMotion ? 0 : index * 180 + 200;
      window.setTimeout(() => {
        el.classList.add('vesper-reveal-active');
      }, delay);
    });

    const updateScroll = () => {
      if (!hero || !container) return;

      const heroH = hero.offsetHeight || window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / heroH, 0), 1);

      hero.style.setProperty('--hero-scroll', progress.toFixed(3));

      if (!reduceMotion) {
        // Fade out and shift up slightly as the user scrolls down
        const opacity = Math.max(1 - progress * 1.6, 0);
        const translateY = -(progress * 70);
        container.style.opacity = opacity.toFixed(3);
        container.style.transform = `translateY(${translateY.toFixed(2)}px)`;
      }
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        updateScroll();
      });
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="hero-scroll-pin">
      <section id="home" className="hero vesper-hero">
        {/* 3D Background Canvas — lazy loaded for performance */}
        <Suspense fallback={null}>
          <HeroScene3D />
        </Suspense>

        <div className="vesper-container">
          {/* Top kicker badge */}
          <div className="vesper-kicker-wrapper vesper-reveal">
            <span className="vesper-kicker-pill">Available for new opportunities</span>
          </div>

          {/* Large Vesper Headline */}
          <h1 className="vesper-title vesper-reveal">
            Hi, I'm Jigish. <br />
            <span className="vesper-title-gradient">Mobile &amp; Systems Engineer.</span>
          </h1>

          {/* Bottom Split Layout */}
          <div className="vesper-bottom-grid">
            {/* Left Column: Meta Tags */}
            <div className="vesper-bottom-left vesper-reveal">
              <div className="vesper-tag-group">
                <span className="vesper-tag-pill">[ FULL STACK ]</span>
                <span className="vesper-tag-pill">[ INTUITIVE UX ]</span>
                <span className="vesper-tag-pill">[ MOBILE SYSTEMS ]</span>
              </div>
            </div>

            {/* Right Column: Bio Description & Custom Buttons */}
            <div className="vesper-bottom-right vesper-reveal">
              <p className="vesper-description">
                I specialize in building scalable mobile applications, intelligent real-time workflows, and premium interactive user experiences for modern platforms.
              </p>

              <div className="vesper-actions">
                {/* Vesper-style capsule button with spark indicator */}
                <a href="#contact" className="vesper-btn vesper-btn-primary">
                  <span>Send Request</span>
                  <span className="vesper-btn-spark" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                      <path d="M8 0L9.5 5.5L15 6L10.5 8.5L12 14L8 11L4 14L5.5 8.5L1 6L6.5 5.5L8 0Z" />
                    </svg>
                  </span>
                </a>

                <a href="#works" className="vesper-btn vesper-btn-secondary">
                  <span>View Projects</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator" aria-hidden="true">
          <span className="scroll-dot" />
          <span className="scroll-label">Scroll</span>
        </div>
      </section>
    </div>
  );
}
