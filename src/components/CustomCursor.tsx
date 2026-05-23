import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canHover || reduceMotion) return undefined;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    document.documentElement.classList.add('custom-cursor-ready');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let frame = 0;

    const setCursorState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;

      cursor.classList.toggle('is-hovering-control', Boolean(target.closest('a, button, [role="button"], input, textarea, select')));
      cursor.classList.toggle('is-hovering-text', Boolean(target.closest('.cursor-text-zone')));
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      setCursorState(event.target);
    };

    const onMouseLeave = () => {
      cursor.classList.add('is-hidden');
    };

    const onMouseEnter = () => {
      cursor.classList.remove('is-hidden');
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.16;
      cursorY += (mouseY - cursorY) * 0.16;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.classList.remove('custom-cursor-ready');
      cursor.remove();
    };
  }, []);

  return null;
}
