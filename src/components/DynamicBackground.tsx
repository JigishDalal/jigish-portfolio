import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function DynamicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select all our circle elements
    const circles = containerRef.current?.querySelectorAll('.scroll-circle');
    if (!circles || circles.length === 0) return;

    // Create a main scrubbed timeline keyed to the overall body scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // Smooth follow scrub matching scroll speed
      }
    });

    // Circle 1: Top-Right (Scales up, rotates, and fades in)
    tl.to('.circle-1', {
      scale: 2.2,
      rotation: 120,
      opacity: 0.12,
      ease: 'none'
    }, 0);

    // Circle 2: Middle-Left (Scales up, rotates, and fades in)
    tl.to('.circle-2', {
      scale: 1.8,
      rotation: -90,
      opacity: 0.15,
      ease: 'none'
    }, 0);

    // Circle 3: Center Concentric (Huge expansion, subtle rotation)
    tl.to('.circle-3', {
      scale: 2.5,
      rotation: 180,
      opacity: 0.08,
      ease: 'none'
    }, 0);

    // Circle 4: Bottom-Right (Scales up, rotates, and fades in)
    tl.to('.circle-4', {
      scale: 1.6,
      rotation: 60,
      opacity: 0.14,
      ease: 'none'
    }, 0);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="dynamic-bg-container" style={{ background: 'var(--color-bg)' }}>
      {/* Circle 1: Top-Right */}
      <div className="scroll-circle circle-1" style={{
        position: 'absolute',
        top: '15%',
        right: '5%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        border: '1.5px dashed rgba(0, 0, 0, 0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transform: 'scale(0.4)',
        pointerEvents: 'none'
      }}>
        {/* Inner concentric ring */}
        <div style={{
          width: '75%',
          height: '75%',
          borderRadius: '50%',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          position: 'relative'
        }}>
          {/* Faint crosshairs */}
          <div style={{ position: 'absolute', top: '50%', left: '-10%', right: '-10%', height: '1px', background: 'rgba(0, 0, 0, 0.02)' }} />
          <div style={{ position: 'absolute', left: '50%', top: '-10%', bottom: '-10%', width: '1px', background: 'rgba(0, 0, 0, 0.02)' }} />
          <span style={{
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'rgba(0, 0, 0, 0.15)',
            letterSpacing: '0.1em'
          }}>R-175</span>
        </div>
      </div>

      {/* Circle 2: Middle-Left */}
      <div className="scroll-circle circle-2" style={{
        position: 'absolute',
        top: '45%',
        left: '-5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transform: 'scale(0.3)',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          border: '1.5px dashed rgba(0, 0, 0, 0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{
            width: '50%',
            height: '50%',
            borderRadius: '50%',
            border: '1px solid rgba(0, 0, 0, 0.04)'
          }} />
          <span style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            color: 'rgba(0, 0, 0, 0.2)',
          }}>SYS.LOC // 45.12</span>
        </div>
      </div>

      {/* Circle 3: Center Concentric */}
      <div className="scroll-circle circle-3" style={{
        position: 'absolute',
        top: '65%',
        left: '40%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        border: '2px solid rgba(0, 0, 0, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transform: 'scale(0.5)',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '90%',
          height: '90%',
          borderRadius: '50%',
          border: '1px dashed rgba(0, 0, 0, 0.03)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '70%',
            height: '70%',
            borderRadius: '50%',
            border: '1px solid rgba(0, 0, 0, 0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '40%',
              height: '40%',
              borderRadius: '50%',
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }} />
          </div>
          {/* Plus sign labels */}
          <div style={{ position: 'absolute', top: '-10px', color: 'rgba(0,0,0,0.2)', fontSize: '12px' }}>+</div>
          <div style={{ position: 'absolute', bottom: '-10px', color: 'rgba(0,0,0,0.2)', fontSize: '12px' }}>+</div>
          <div style={{ position: 'absolute', left: '-10px', color: 'rgba(0,0,0,0.2)', fontSize: '12px' }}>+</div>
          <div style={{ position: 'absolute', right: '-10px', color: 'rgba(0,0,0,0.2)', fontSize: '12px' }}>+</div>
        </div>
      </div>

      {/* Circle 4: Bottom-Right */}
      <div className="scroll-circle circle-4" style={{
        position: 'absolute',
        bottom: '10%',
        right: '2%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        border: '1.5px solid rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transform: 'scale(0.3)',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '80%',
          height: '80%',
          borderRadius: '50%',
          border: '1px dashed rgba(0, 0, 0, 0.04)',
          position: 'relative'
        }}>
          {/* Crosshairs */}
          <div style={{ position: 'absolute', top: '50%', left: '-15%', right: '-15%', height: '1px', background: 'rgba(0,0,0,0.015)' }} />
          <div style={{ position: 'absolute', left: '50%', top: '-15%', bottom: '-15%', width: '1px', background: 'rgba(0,0,0,0.015)' }} />
          <span style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'rgba(0, 0, 0, 0.15)',
            letterSpacing: '0.1em'
          }}>SCALE.CTRL</span>
        </div>
      </div>
    </div>
  );
}
