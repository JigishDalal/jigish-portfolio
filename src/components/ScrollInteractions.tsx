import { useEffect } from 'react';

const SECTION_IDS = ['home', 'ask', 'skills', 'journey', 'works'];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export default function ScrollInteractions() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = SECTION_IDS
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;
    let activeSection = 'home';

    const setActiveSection = (next: string) => {
      if (next === activeSection) return;

      activeSection = next;
      window.dispatchEvent(new CustomEvent('portfolio-active-section', { detail: next }));
      document.documentElement.dataset.activeSection = next;
    };

    const update = () => {
      const viewportCenter = window.innerHeight * 0.46;
      let closest = sections[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportCenter);
        const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));

        section.style.setProperty('--section-progress', progress.toFixed(3));

        if (distance < closestDistance && rect.bottom > 120) {
          closest = section;
          closestDistance = distance;
        }
      });

      if (closest) {
        setActiveSection(closest.id);
      }

      if (reduceMotion) return;

      document.querySelectorAll<HTMLElement>('.capability-card').forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
        const shift = (progress - 0.5) * (index % 2 === 0 ? -10 : 10);
        card.style.setProperty('--scroll-shift', `${shift.toFixed(2)}px`);
      });

      document.querySelectorAll<HTMLElement>('.works-feature-preview').forEach((preview) => {
        const rect = preview.getBoundingClientRect();
        const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
        const shift = (progress - 0.5) * -18;
        preview.style.setProperty('--preview-shift', `${shift.toFixed(2)}px`);
      });
    };

    const requestUpdate = () => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return null;
}
