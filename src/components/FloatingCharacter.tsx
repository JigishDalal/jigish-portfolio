import { useEffect, useState } from 'react';

const NOTES: Record<string, string> = {
  home: 'Hey, I’m Jigish’s tiny product co-pilot.',
  ask: 'Curious? Ask me anything about his work.',
  skills: 'Systems, shipped with a little personality.',
  journey: 'Every chapter starts with a real user problem.',
  works: 'Scroll on — the best work is just ahead.',
};

export default function FloatingCharacter() {
  const [section, setSection] = useState('home');

  useEffect(() => {
    const onSectionChange = (event: Event) => {
      setSection((event as CustomEvent<string>).detail);
    };
    window.addEventListener('portfolio-active-section', onSectionChange);
    return () => window.removeEventListener('portfolio-active-section', onSectionChange);
  }, []);

  return (
    <aside className="floating-character" aria-label="Jigish portfolio guide">
      <div className="character-note" key={section}>{NOTES[section] ?? NOTES.home}</div>
      <button className="character-button" type="button" onClick={() => document.querySelector('#ask')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Ask about Jigish">
        <span className="character-halo" />
        <span className="character-head"><i /><i /><b /></span>
        <span className="character-body"><i /><i /></span>
        <span className="character-phone" />
        <span className="character-spark character-spark-a" />
        <span className="character-spark character-spark-b" />
      </button>
    </aside>
  );
}
