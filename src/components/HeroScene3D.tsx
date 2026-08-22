import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import { isWebGLSupported } from '../utils/webglSupport';

// Number of particles for the volumetric torus
const PARTICLE_COUNT = 30000;

/* ──────────────────────────────────────────────────────────────
   Custom Torus WebGL Shader Definition
   ────────────────────────────────────────────────────────────── */
const TorusShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 }
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScroll;
    
    attribute float aRandom;
    
    varying vec3 vPosition;
    varying float vRandom;
    varying vec3 vNormal;

    void main() {
      vPosition = position;
      vRandom = aRandom;
      vNormal = normal;

      vec3 pos = position;

      // 1. Organic wave displacements along the surface normals
      float wave = sin(aRandom * 12.0 + uTime * 1.0) * 0.14;
      float ripple = cos(position.x * 1.5 + position.y * 1.5 + uTime * 1.8) * 0.08;
      
      pos += normal * (wave + ripple);

      // 2. Interactive mouse cursor repulsion
      vec3 mouse3D = vec3(uMouse.x * 4.5, uMouse.y * 3.5, 0.0);
      float distToMouse = distance(pos, mouse3D);
      if (distToMouse < 2.2) {
        float factor = (2.2 - distToMouse) / 2.2;
        factor = smoothstep(0.0, 1.0, factor);
        vec3 repulsion = normalize(pos - mouse3D) * factor * 0.45;
        repulsion.z *= 0.2;
        pos += repulsion;
      }

      // 3. Scroll influence: disperse particles outwards as user scrolls
      if (uScroll > 0.01) {
        pos += normal * uScroll * 1.8;
        pos.y += uScroll * 1.0;
      }

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      float size = 1.5 + aRandom * 2.0;
      gl_PointSize = size;
    }
  `,
  fragmentShader: `
    varying vec3 vPosition;
    varying float vRandom;
    varying vec3 vNormal;
    
    uniform float uTime;

    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) discard;

      float mixY = (vPosition.y + 2.5) / 5.0;
      mixY = clamp(mixY, 0.0, 1.0);

      float shimmer = sin(uTime * 2.5 + vRandom * 25.0) * 0.12 + 0.88;

      vec3 colorTop = vec3(0.12, 0.93, 0.65);
      vec3 colorBottom = vec3(0.39, 0.25, 0.97);
      
      vec3 finalColor = mix(colorBottom, colorTop, mixY);
      
      float rim = 1.0 - abs(vNormal.z);
      finalColor = mix(finalColor, vec3(0.85, 0.95, 1.0), rim * 0.15);

      float alpha = smoothstep(0.5, 0.15, dist) * 0.70 * shimmer;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

/* ──────────────────────────────────────────────────────────────
   Torus Particle System Component
   ────────────────────────────────────────────────────────────── */
function TorusParticles({
  mouse,
  scrollYProgress
}: {
  mouse: React.MutableRefObject<THREE.Vector2>;
  scrollYProgress: React.MutableRefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  const { positions, normals, randoms } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const norm = new Float32Array(PARTICLE_COUNT * 3);
    const rand = new Float32Array(PARTICLE_COUNT);

    const R = 2.4;
    const r = 0.95;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;

      const tubeRadius = r + (Math.random() - 0.5) * 0.55;

      const x = (R + tubeRadius * Math.cos(theta)) * Math.cos(phi);
      const y = (R + tubeRadius * Math.cos(theta)) * Math.sin(phi);
      const z = tubeRadius * Math.sin(theta);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const nx = Math.cos(theta) * Math.cos(phi);
      const ny = Math.cos(theta) * Math.sin(phi);
      const nz = Math.sin(theta);

      norm[i * 3] = nx;
      norm[i * 3 + 1] = ny;
      norm[i * 3 + 2] = nz;

      rand[i] = Math.random();
    }

    return { positions: pos, normals: norm, randoms: rand };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 }
  }), []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

      targetMouse.current.lerp(mouse.current, 0.06);
      materialRef.current.uniforms.uMouse.value.copy(targetMouse.current);

      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScroll.value,
        scrollYProgress.current,
        0.08
      );
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.045;
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.025;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-normal" args={[normals, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={TorusShaderMaterial.vertexShader}
        fragmentShader={TorusShaderMaterial.fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────
   Camera Parallax Controller
   ────────────────────────────────────────────────────────────── */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 6.2));

  useFrame(() => {
    targetPosition.current.set(mouse.current.x * 0.6, mouse.current.y * 0.4, 6.2);
    camera.position.lerp(targetPosition.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ──────────────────────────────────────────────────────────────
   Main Exported 3D Scene Component with Graceful Fallback
   ────────────────────────────────────────────────────────────── */
export default function HeroScene3D() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const scrollYProgress = useRef(0);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    if (!isWebGLSupported()) {
      setWebGLSupported(false);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = window.scrollY / window.innerHeight;
      scrollYProgress.current = Math.min(Math.max(progress, 0), 1.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!webGLSupported) {
    return <div className="hero-fallback-bg" />;
  }

  return (
    <div className="hero-canvas-wrapper">
      <WebGLErrorBoundary fallback={<div className="hero-fallback-bg" />}>
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 60 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false
          }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Suspense fallback={null}>
            <TorusParticles mouse={mouse} scrollYProgress={scrollYProgress} />
            <CameraRig mouse={mouse} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
