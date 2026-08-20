"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  RoundedBox,
  ContactShadows,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";

/* Warm premium palette in 3D — chocolate, caramel, cream, one gold accent */
const COLORS = {
  gold: "#f7b815",
  goldSoft: "#e0b25c",
  chocolate: "#4a2a1a",
  chocolateLight: "#6b3f28",
  glaze: "#57301c",
  cream: "#f5f0e8",
  dough: "#d9a066",
  caramel: "#b06a35",
  pistachio: "#c8b26b",
  silver: "#cfccc8",
  walnut: "#5a3423",
  walnutDeep: "#3f2418",
};

/* Deterministic pseudo-random so re-renders are stable */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ---------- Products ---------- */
function ChocolateBar() {
  const chunks = useMemo(() => {
    const list: [number, number][] = [];
    for (let x = 0; x < 4; x++) for (let z = 0; z < 2; z++) list.push([x, z]);
    return list;
  }, []);
  return (
    <group rotation={[-0.15, 0, 0]}>
      <RoundedBox args={[1.7, 0.28, 1]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial color={COLORS.chocolate} roughness={0.3} clearcoat={0.6} clearcoatRoughness={0.3} />
      </RoundedBox>
      {chunks.map(([x, z]) => (
        <RoundedBox
          key={`${x}-${z}`}
          args={[0.34, 0.18, 0.4]}
          radius={0.07}
          smoothness={4}
          position={[-0.61 + x * 0.41, 0.2, -0.22 + z * 0.44]}
        >
          <meshPhysicalMaterial color={COLORS.chocolateLight} roughness={0.26} clearcoat={0.7} clearcoatRoughness={0.28} />
        </RoundedBox>
      ))}
    </group>
  );
}

const DONUT = { R: 0.5, dough: 0.24, icing: 0.27, squash: 0.6, lift: 0.07 };
function Donut() {
  const sprinkles = useMemo(() => {
    const rand = seeded(42);
    const colors = [COLORS.gold, COLORS.cream, COLORS.caramel, COLORS.chocolateLight];
    return Array.from({ length: 26 }, () => {
      const theta = rand() * Math.PI * 2;
      const phi = 0.3 + rand() * 1.15;
      const ringRadius = DONUT.R + DONUT.icing * Math.cos(phi);
      return {
        pos: [
          Math.cos(theta) * ringRadius,
          DONUT.squash * DONUT.icing * Math.sin(phi) + DONUT.lift + 0.006,
          Math.sin(theta) * ringRadius,
        ] as [number, number, number],
        rot: [(rand() - 0.5) * 0.7, -theta + (rand() - 0.5) * 1.4, Math.PI / 2 + (rand() - 0.5) * 0.6] as [number, number, number],
        color: colors[Math.floor(rand() * colors.length)],
      };
    });
  }, []);
  return (
    <group rotation={[Math.PI / 2.4, 0, 0.2]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[DONUT.R, DONUT.dough, 32, 64]} />
        <meshStandardMaterial color={COLORS.dough} roughness={0.62} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, DONUT.lift, 0]} scale={[1, 1, DONUT.squash]}>
        <torusGeometry args={[DONUT.R, DONUT.icing, 32, 64]} />
        <meshPhysicalMaterial color={COLORS.glaze} roughness={0.18} clearcoat={0.9} clearcoatRoughness={0.2} />
      </mesh>
      {sprinkles.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot}>
          <capsuleGeometry args={[0.017, 0.06, 4, 8]} />
          <meshStandardMaterial color={s.color} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function SodaCan() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.36, 0.36, 1.05, 48]} />
        <meshStandardMaterial color={COLORS.cream} roughness={0.38} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.363, 0.363, 0.22, 48]} />
        <meshPhysicalMaterial color={COLORS.goldSoft} roughness={0.28} metalness={0.55} clearcoat={0.4} />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.29, 0.355, 0.12, 48]} />
        <meshStandardMaterial color={COLORS.silver} roughness={0.28} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0.645, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.27, 0.02, 12, 48]} />
        <meshStandardMaterial color={COLORS.silver} roughness={0.22} metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.56, 0]}>
        <cylinderGeometry args={[0.31, 0.26, 0.09, 48]} />
        <meshStandardMaterial color={COLORS.silver} roughness={0.28} metalness={0.85} />
      </mesh>
    </group>
  );
}

function useSwirlTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = COLORS.caramel;
    ctx.fillRect(0, 0, 512, 256);
    ctx.strokeStyle = COLORS.cream;
    ctx.lineWidth = 30;
    ctx.lineCap = "round";
    for (let i = -2; i < 11; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 64 - 60, 300);
      ctx.lineTo(i * 64 + 140, -44);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 8;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Lollipop() {
  const swirl = useSwirlTexture();
  return (
    <group rotation={[0.2, 0, 0.12]}>
      <mesh position={[0, -0.62, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 1.1, 16]} />
        <meshStandardMaterial color={COLORS.cream} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.14, 0]} rotation={[0.35, 0, 0.1]}>
        <sphereGeometry args={[0.42, 48, 48]} />
        <meshPhysicalMaterial map={swirl} roughness={0.12} clearcoat={1} clearcoatRoughness={0.12} />
      </mesh>
    </group>
  );
}

function Cookie() {
  const chips = useMemo(() => {
    const rand = seeded(7);
    return Array.from({ length: 10 }, () => {
      const angle = rand() * Math.PI * 2;
      const d = rand() * 0.38;
      const y = 0.3 * Math.sqrt(0.52 ** 2 - d ** 2) - 0.02;
      return { pos: [Math.cos(angle) * d, y, Math.sin(angle) * d] as [number, number, number], scale: 0.7 + rand() * 0.5 };
    });
  }, []);
  return (
    <group rotation={[Math.PI / 2.6, 0, 0]}>
      <mesh scale={[1, 0.3, 1]}>
        <sphereGeometry args={[0.52, 48, 32]} />
        <meshStandardMaterial color="#c98d4e" roughness={0.68} />
      </mesh>
      {chips.map((c, i) => (
        <mesh key={i} position={c.pos} scale={c.scale}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshPhysicalMaterial color={COLORS.chocolate} roughness={0.3} clearcoat={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Macaron() {
  return (
    <group rotation={[0.15, 0, 0]}>
      <mesh position={[0, 0.18, 0]} scale={[1, 0.5, 1]}>
        <sphereGeometry args={[0.45, 48, 32]} />
        <meshPhysicalMaterial color={COLORS.pistachio} roughness={0.5} clearcoat={0.25} />
      </mesh>
      <mesh position={[0, -0.18, 0]} scale={[1, 0.5, 1]}>
        <sphereGeometry args={[0.45, 48, 32]} />
        <meshPhysicalMaterial color={COLORS.pistachio} roughness={0.5} clearcoat={0.25} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 48]} />
        <meshStandardMaterial color={COLORS.cream} roughness={0.55} />
      </mesh>
    </group>
  );
}

/* ---------- One presented item on a riser ---------- */
const PRODUCTS = [ChocolateBar, SodaCan, Donut, Macaron, Cookie, Lollipop];

function RingItem({ Model, angle, radius }: { Model: () => React.ReactElement; angle: number; radius: number }) {
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  // Anchored at the platter's TOP surface (y = 0.1) so risers sit ON it — no
  // buried edges fighting the platter as the rig spins.
  return (
    <group position={[x, 0.1, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
      {/* plinth resting on the platter */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.6, 0.68, 0.16, 48]} />
        <meshPhysicalMaterial color={COLORS.cream} roughness={0.4} clearcoat={0.3} />
      </mesh>
      <mesh position={[0, 0.175, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.02, 12, 48]} />
        <meshStandardMaterial color={COLORS.goldSoft} roughness={0.3} metalness={0.5} />
      </mesh>
      <Float speed={2} rotationIntensity={0.12} floatIntensity={0.35}>
        <group position={[0, 0.95, 0]}>
          <Model />
        </group>
      </Float>
    </group>
  );
}

function Turntable() {
  const spin = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const radius = 2.5;

  useFrame((state, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.22; // slow, steady display spin
    if (tilt.current) {
      const { x, y } = state.pointer;
      tilt.current.rotation.z = THREE.MathUtils.damp(tilt.current.rotation.z, x * 0.06, 3, delta);
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, 0.12 - y * 0.05, 3, delta);
    }
  });

  return (
    <group ref={tilt} rotation={[0.12, 0, 0]} position={[0, -1.15, 0]}>
      {/* Rotating rig */}
      <group ref={spin}>
        {/* Platter (glossy cream) */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[3, 3, 0.16, 64]} />
          <meshPhysicalMaterial color={COLORS.cream} roughness={0.22} clearcoat={0.6} clearcoatRoughness={0.25} />
        </mesh>
        {/* Base (walnut) */}
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[2.7, 2.85, 0.34, 64]} />
          <meshStandardMaterial color={COLORS.walnut} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.42, 0]}>
          <cylinderGeometry args={[2.5, 2.6, 0.12, 64]} />
          <meshStandardMaterial color={COLORS.walnutDeep} roughness={0.55} />
        </mesh>
        {/* Gold rim, lifted just above the platter top so it never coplanar-fights */}
        <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.95, 0.035, 16, 120]} />
          <meshStandardMaterial color={COLORS.goldSoft} roughness={0.3} metalness={0.55} />
        </mesh>

        {PRODUCTS.map((Model, i) => (
          <RingItem key={i} Model={Model} angle={(i / PRODUCTS.length) * Math.PI * 2} radius={radius} />
        ))}
      </group>

      <ContactShadows position={[0, -0.48, 0]} opacity={0.32} scale={9} blur={2.6} far={2} color="#38251b" />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.7, 8.4], fov: 42, near: 3, far: 22 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 7, 5]} intensity={1.1} color="#fff2df" />
      <pointLight position={[-5, 3, 4]} intensity={0.4} color="#ffd88a" />
      <spotLight position={[0, 8, 2]} angle={0.5} penumbra={1} intensity={0.7} color="#fff6e8" />

      {/* Local studio lightbox — real reflections, no network fetch */}
      <Environment resolution={256}>
        <Lightformer intensity={2.2} position={[0, 4, 3]} scale={[7, 3, 1]} color="#fff6e8" />
        <Lightformer intensity={1.1} position={[-5, 1, -2]} rotation-y={Math.PI / 2} scale={[5, 2, 1]} color="#ffe3ba" />
        <Lightformer intensity={0.7} position={[5, -1, -1]} rotation-y={-Math.PI / 2} scale={[5, 2, 1]} color="#f5f0e8" />
        <Lightformer intensity={0.5} position={[0, -4, 0]} rotation-x={Math.PI / 2} scale={[6, 6, 1]} color="#e9dcc8" />
      </Environment>

      <Turntable />
    </Canvas>
  );
}
