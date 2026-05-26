import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/* ──────────────────────────────────────────────────────────────
   Particle Field
   ────────────────────────────────────────────────────────────── */
function ParticleField({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Points>(null);
  const COUNT = 2200;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const palette = [
      new THREE.Color('#6366f1'), // indigo
      new THREE.Color('#a855f7'), // purple
      new THREE.Color('#9ca3af'), // gray
      new THREE.Color('#c4b5fd'), // lavender
    ];

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle drift
    meshRef.current.rotation.y = t * 0.018;
    meshRef.current.rotation.x = t * 0.007;
    // Mouse parallax
    meshRef.current.rotation.y += mouse.current[0] * 0.00012;
    meshRef.current.rotation.x += mouse.current[1] * 0.00012;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────
   Floating Geometry
   ────────────────────────────────────────────────────────────── */
interface ShapeProps {
  position: [number, number, number];
  geometry: 'torus' | 'icosahedron' | 'octahedron' | 'tetrahedron' | 'box';
  color: string;
  speed?: number;
  scale?: number;
  wireframe?: boolean;
}

function FloatingShape({ position, geometry, color, speed = 1, scale = 1, wireframe = false }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = t * 0.27;
    meshRef.current.rotation.y = t * 0.38;
    meshRef.current.rotation.z = t * 0.14;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case 'torus':       return <torusGeometry args={[1, 0.34, 14, 40]} />;
      case 'icosahedron': return <icosahedronGeometry args={[1, 1]} />;
      case 'octahedron':  return <octahedronGeometry args={[1, 0]} />;
      case 'tetrahedron': return <tetrahedronGeometry args={[1, 0]} />;
      case 'box':         return <boxGeometry args={[1, 1, 1]} />;
    }
  }, [geometry]);

  return (
    <Float
      speed={speed * 0.6}
      rotationIntensity={0.4}
      floatIntensity={0.7}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {geo}
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          transparent
          opacity={wireframe ? 0.18 : 0.1}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

/* ──────────────────────────────────────────────────────────────
   Ambient glow sphere (aura)
   ────────────────────────────────────────────────────────────── */
function GlowSphere({ position, color, radius }: { position: [number, number, number]; color: string; radius: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = 0.032 + Math.sin(t * 0.5) * 0.012;
    const s = 1 + Math.sin(t * 0.4) * 0.04;
    meshRef.current.scale.setScalar(s);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.04}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

/* ──────────────────────────────────────────────────────────────
   Distorted orb (hero centerpiece)
   ────────────────────────────────────────────────────────────── */
function DistortedOrb() {
  return (
    <Float speed={1.2} floatIntensity={0.5}>
      <Sphere args={[1.6, 64, 64]} position={[4.5, 0.5, -2]}>
        <MeshDistortMaterial
          color="#6366f1"
          distort={0.32}
          speed={2.5}
          roughness={0.2}
          metalness={0.05}
          transparent
          opacity={0.07}
        />
      </Sphere>
    </Float>
  );
}

/* ──────────────────────────────────────────────────────────────
   Camera controller (mouse parallax)
   ────────────────────────────────────────────────────────────── */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    target.current.set(mouse.current[0] * 0.0012, mouse.current[1] * -0.0008, 0);
    camera.position.lerp(
      new THREE.Vector3(target.current.x, target.current.y, 6),
      0.04
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ──────────────────────────────────────────────────────────────
   Main exported scene
   ────────────────────────────────────────────────────────────── */
export default function HeroScene3D() {
  const mouse = useRef<[number, number]>([0, 0]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = [
        e.clientX - window.innerWidth / 2,
        e.clientY - window.innerHeight / 2,
      ];
    };
    const onScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="hero-canvas-wrapper"
      style={{ opacity: Math.max(0, 1 - scrollY / 500) }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          {/* Lights */}
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 5, 5]} intensity={0.4} color="#6366f1" />
          <directionalLight position={[-5, -5, -5]} intensity={0.2} color="#a855f7" />
          <pointLight position={[0, 0, 3]} intensity={0.3} color="#c4b5fd" distance={12} />

          {/* Glow auras */}
          <GlowSphere position={[-5, 3, -4]} color="#6366f1" radius={4.5} />
          <GlowSphere position={[6, -3, -5]} color="#a855f7" radius={5} />

          {/* Floating geometric shapes */}
          <FloatingShape position={[-5, 2.5, -1]} geometry="torus"       color="#6366f1" speed={0.7} scale={1.1} wireframe />
          <FloatingShape position={[5.5, -1.5, -2]} geometry="icosahedron" color="#a855f7" speed={0.9} scale={0.85} wireframe />
          <FloatingShape position={[-4, -2.5, 0]} geometry="octahedron"   color="#6366f1" speed={1.1} scale={0.7} wireframe={false} />
          <FloatingShape position={[3.5, 3, -3]} geometry="tetrahedron"  color="#9ca3af" speed={0.6} scale={0.9} wireframe />
          <FloatingShape position={[0, -3.5, -2]} geometry="box"         color="#c4b5fd" speed={0.5} scale={0.6} wireframe />
          <FloatingShape position={[-2.5, 4, -2]} geometry="icosahedron" color="#6366f1" speed={1.3} scale={0.55} wireframe />

          {/* Distorted orb centerpiece */}
          <DistortedOrb />

          {/* Particles */}
          <ParticleField mouse={mouse} />

          {/* Camera parallax */}
          <CameraRig mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
