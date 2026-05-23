import { useEffect } from 'react';

export default function Hero3D() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.bento-hero');
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

      const progress = Math.min(window.scrollY / 360, 1);
      hero.style.setProperty('--hero-scroll', progress.toFixed(3));
      hero.classList.toggle('is-scroll-active', progress > 0.05);
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
    <section id="home" className="hero bento-hero">
      <div className="hero-bento-grid">

        {/* Main large typography card */}
        <div
          className="bento-card col-span-2 main-title-card"
        >
          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />
          <p className="hero-kicker">Available for new opportunities</p>
          <h1 className="bento-title cursor-text-zone">
            Hi, I’m Jigish <br />
            Crafting premium mobile experiences.
          </h1>
          <p className="bento-desc">
            I specialize in scalable mobile apps, real-time systems, intelligent workflows, and modern user experiences across fintech, healthcare, and enterprise platforms.
          </p>
          <div className="hero-actions">
            <a href="/blog" className="bento-btn bento-btn-dark">
              Read the blog
            </a>
            <a href="#journey" className="bento-btn">
              About me
            </a>
          </div>
          <p className="hero-location">Vadodara, India</p>
          <div className="hero-scroll-line" />
        </div>

        {/* Small stats card */}
        <div
          className="bento-card flex-center stat-card"
        >
          <div className="stat-number"><span data-count-to="8">0</span>+</div>
          <div className="stat-label">Years of<br />Experience</div>
        </div>

        {/* Small stats card 2 */}
        <div
          className="bento-card flex-center stat-card"
        >
          <div className="stat-number"><span data-count-to="10">0</span>+</div>
          <div className="stat-label">Apps<br />Shipped</div>
        </div>

        {/* Roles/Tags card */}
        <div
          className="bento-card tags-card col-span-2"
        >
          <ul className="bento-tags">
            <li>FLUTTER</li>
            <li>ANDROID</li>
            <li>ARCHITECTURE</li>
            <li>PERFORMANCE</li>
            <li>FINTECH</li>
            <li>HEALTHCARE</li>
            <li>ENTERPRISE</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
