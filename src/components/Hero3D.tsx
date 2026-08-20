import { useEffect, lazy, Suspense } from 'react';

const HeroScene3D = lazy(() => import('./HeroScene3D'));

export default function Hero3D() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.bento-hero');
    const grid = document.querySelector<HTMLElement>('.hero-bento-grid');
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.hero-bento-grid .bento-card'));
    const statCards = Array.from(document.querySelectorAll<HTMLElement>('.hero-bento-grid .stat-card'));
    const countEls = Array.from(document.querySelectorAll<HTMLElement>('[data-count-to]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: number[] = [];
    let countFrame = 0;
    let scrollFrame = 0;

    cards.forEach((card, index) => {
      const delay = reduceMotion ? 0 : index * 150;
      const timer = window.setTimeout(() => card.classList.add('bento-visible'), delay);
      timers.push(timer);
    });

    const updateScroll = () => {
      if (!hero) return;

      const heroH = hero.offsetHeight || window.innerHeight;
      // progress 0→1 over the hero section height
      const raw = window.scrollY / heroH;
      const progress = Math.min(Math.max(raw, 0), 1);

      hero.style.setProperty('--hero-scroll', progress.toFixed(3));
      hero.classList.toggle('is-scroll-active', progress > 0.05);

      if (!reduceMotion && grid) {
        // Zoom out: scale from 1.08 → 1.0 as scroll goes 0 → 0.6
        const scaleProgress = Math.min(progress / 0.6, 1);
        const scale = 1.08 - scaleProgress * 0.08;
        // Parallax: shifts up by up to 60px
        const translateY = -(progress * 60);
        // Fade: stays opaque until 0.5, then fades to 0 at 1.0
        const opacity = progress > 0.5 ? Math.max(1 - (progress - 0.5) * 2, 0) : 1;

        grid.style.transform = `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(2)}px)`;
        grid.style.opacity = opacity.toFixed(3);
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

    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

    if (reduceMotion) {
      countEls.forEach((el) => {
        el.textContent = el.dataset.countTo ?? '0';
      });
    } else {
      const start = performance.now();
      const animateCounts = (now: number) => {
        const progress = Math.min((now - start) / 1500, 1);
        const eased = easeOutCubic(progress);

        countEls.forEach((el) => {
          const end = Number(el.dataset.countTo ?? 0);
          el.textContent = String(Math.round(end * eased));
        });

        if (progress < 1) {
          countFrame = requestAnimationFrame(animateCounts);
        }
      };

      countFrame = requestAnimationFrame(animateCounts);
    }

    const cleanups = statCards.map((card) => {
      const onMove = (event: MouseEvent) => {
        if (reduceMotion) return;

        card.classList.add('is-tilting');
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 16;
        const rotateX = ((0.5 - (y / rect.height)) * 16);

        card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      };

      const onLeave = () => {
        card.classList.remove('is-tilting');
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      return () => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => {
      timers.forEach(window.clearTimeout);
      cancelAnimationFrame(countFrame);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener('scroll', onScroll);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="hero-scroll-pin">
      <section id="home" className="hero bento-hero">
        {/* 3D Background Canvas — lazy loaded for performance */}
        <Suspense fallback={null}>
          <HeroScene3D />
        </Suspense>

        <div className="hero-bento-grid">

          {/* Main large typography card */}
          <div className="bento-card col-span-3 main-title-card">
            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />
            <p className="hero-kicker">Available for new opportunities</p>
            <h1 className="bento-title cursor-text-zone">Hi, I'm Jigish</h1>
            <p className="bento-desc">
              I specialize in scalable mobile apps, real-time systems, intelligent workflows, and modern user experiences across fintech, healthcare, and enterprise platforms.
            </p>
            <div className="hero-actions">
              <a href="#works" className="bento-btn bento-btn-dark">
                View projects
              </a>
              <a href="#journey" className="bento-btn">
                About me
              </a>
            </div>
            <p className="hero-location">Vadodara, India</p>
            <div className="hero-scroll-line" />
          </div>

          <div className="bento-card flex-center stat-card hero-side-stat">
            <div className="stat-number"><span data-count-to="8">0</span>+</div>
            <div className="stat-label">Years of<br />Experience</div>
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
