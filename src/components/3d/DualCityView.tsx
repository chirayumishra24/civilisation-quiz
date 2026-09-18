import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { HarappanCity } from './HarappanCity';

interface DualCityViewProps {
  mohenjoStage: number;
  dholaviraStage: number;
}

export const DualCityView: React.FC<DualCityViewProps> = ({
  mohenjoStage,
  dholaviraStage,
}) => {
  const riverRef = useRef<THREE.Mesh>(null);

  // Subtle water shimmer
  useFrame(({ clock }) => {
    if (riverRef.current && riverRef.current.material) {
      const mat = riverRef.current.material as THREE.MeshStandardMaterial;
      mat.roughness = 0.15 + Math.sin(clock.getElapsedTime() * 1.5) * 0.05;
    }
  });

  return (
    <group>
      {/* ─── River Indus / Water Channel flowing between settlements ─── */}
      <group position={[0, -0.06, 0]}>
        <mesh ref={riverRef} position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[2.8, 0.08, 24]} />
          <meshStandardMaterial
            color="#2563EB"
            roughness={0.2}
            metalness={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* River banks */}
        <mesh position={[-1.5, 0.02, 0]} receiveShadow>
          <boxGeometry args={[0.3, 0.06, 24]} />
          <meshStandardMaterial color="#A68B5B" roughness={0.9} />
        </mesh>
        <mesh position={[1.5, 0.02, 0]} receiveShadow>
          <boxGeometry args={[0.3, 0.06, 24]} />
          <meshStandardMaterial color="#A68B5B" roughness={0.9} />
        </mesh>

        {/* Small river transport boat */}
        <group position={[0, 0.08, -2]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.12, 1.4]} />
            <meshStandardMaterial color="#5C3A21" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
            <meshStandardMaterial color="#3E2723" />
          </mesh>
          <mesh position={[0, 0.5, 0.2]}>
            <boxGeometry args={[0.4, 0.4, 0.02]} />
            <meshStandardMaterial color="#E0CDB0" />
          </mesh>
        </group>
      </group>

      {/* ─── TEAM MOHENJO (Western Settlement) ─── */}
      <group position={[-7.5, 0, 0]}>
        <HarappanCity stage={mohenjoStage} team="mohenjo" />
      </group>

      {/* ─── TEAM DHOLAVIRA (Eastern Settlement) ─── */}
      <group position={[7.5, 0, 0]}>
        <HarappanCity stage={dholaviraStage} team="dholavira" />
      </group>
    </group>
  );
};
