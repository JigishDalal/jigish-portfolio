import { useEffect, useState } from 'react';

const SECTION_TONES: Record<string, string> = {
  home: 'home',
  skills: 'skills',
  journey: 'journey',
  works: 'works',
};

export default function SectionTransition() {
  const [tone, setTone] = useState('home');
  const [sweepKey, setSweepKey] = useState(0);

  useEffect(() => {
    const onActiveSection = (event: Event) => {
      const section = (event as CustomEvent<string>).detail;
      setTone(SECTION_TONES[section] ?? 'home');
      setSweepKey(key => key + 1);
    };

    window.addEventListener('portfolio-active-section', onActiveSection);
    return () => window.removeEventListener('portfolio-active-section', onActiveSection);
  }, []);

  return (
    <div className="section-transition-layer" aria-hidden="true">
      <div className={`section-wash tone-${tone}`} />
      <div key={sweepKey} className="section-sweep" />
    </div>
  );
}
