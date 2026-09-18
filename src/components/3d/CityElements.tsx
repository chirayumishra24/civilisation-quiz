import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Earth & terracotta palette
const BRICK_COLOR = '#C4704F';
const BRICK_DARK = '#A04D2E';
const STONE_COLOR = '#B89B72';
const PLASTER_COLOR = '#E5D3B3';
const DRAIN_COLOR = '#7A6B5D';
const WATER_COLOR = '#3B82F6';
const WOOD_COLOR = '#6D4C41';
const CROP_COLOR = '#84CC16';

export const BrickHouse: React.FC<{
  position: [number, number, number];
  size?: [number, number, number];
  hasCourtyard?: boolean;
  rotation?: number;
}> = ({ position, size = [1.2, 0.9, 1.2], hasCourtyard = false, rotation = 0 }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Main House Body */}
      <mesh position={[0, size[1] / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={BRICK_COLOR} roughness={0.85} />
      </mesh>
      {/* Flat roof coping */}
      <mesh position={[0, size[1] + 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[size[0] + 0.1, 0.08, size[2] + 0.1]} />
        <meshStandardMaterial color={BRICK_DARK} roughness={0.8} />
      </mesh>
      {/* Doorway / Entrance */}
      <mesh position={[0, size[1] * 0.35, size[2] / 2 + 0.01]}>
        <boxGeometry args={[0.3, size[1] * 0.7, 0.02]} />
        <meshStandardMaterial color="#2B1810" roughness={0.9} />
      </mesh>
      {/* Inner Courtyard Opening if specified */}
      {hasCourtyard && (
        <mesh position={[0, size[1] + 0.01, 0]}>
          <boxGeometry args={[size[0] * 0.4, 0.1, size[2] * 0.4]} />
          <meshStandardMaterial color="#2B1810" />
        </mesh>
      )}
    </group>
  );
};

export const PlannedStreet: React.FC<{
  start: [number, number, number];
  length: number;
  width?: number;
  horizontal?: boolean;
}> = ({ start, length, width = 0.8, horizontal = false }) => {
  return (
    <mesh
      position={[
        start[0] + (horizontal ? length / 2 : 0),
        0.02,
        start[2] + (horizontal ? 0 : length / 2),
      ]}
      receiveShadow
    >
      <boxGeometry args={horizontal ? [length, 0.02, width] : [width, 0.02, length]} />
      <meshStandardMaterial color="#D7BA89" roughness={0.9} />
    </mesh>
  );
};

export const CoveredDrain: React.FC<{
  position: [number, number, number];
  length: number;
  horizontal?: boolean;
}> = ({ position, length, horizontal = false }) => {
  return (
    <group position={position}>
      {/* Drain slab covers */}
      <mesh
        position={[horizontal ? length / 2 : 0, 0.04, horizontal ? 0 : length / 2]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={horizontal ? [length, 0.04, 0.22] : [0.22, 0.04, length]} />
        <meshStandardMaterial color={DRAIN_COLOR} roughness={0.95} />
      </mesh>
    </group>
  );
};

export const BrickWell: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Well rim */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.38, 0.5, 16]} />
        <meshStandardMaterial color={BRICK_DARK} roughness={0.8} />
      </mesh>
      {/* Water inside */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.1, 16]} />
        <meshStandardMaterial color={WATER_COLOR} roughness={0.1} metalness={0.2} transparent opacity={0.85} />
      </mesh>
      {/* Stone apron around well */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[0.6, 0.65, 0.04, 16]} />
        <meshStandardMaterial color={STONE_COLOR} roughness={0.9} />
      </mesh>
    </group>
  );
};

export const ElevatedPlatform: React.FC<{
  position: [number, number, number];
  size: [number, number, number];
}> = ({ position, size }) => {
  return (
    <group position={position}>
      <mesh position={[0, size[1] / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={PLASTER_COLOR} roughness={0.85} />
      </mesh>
      {/* Citadel crenellations / parapet */}
      <mesh position={[0, size[1] + 0.08, 0]} castShadow>
        <boxGeometry args={[size[0] + 0.1, 0.16, size[2] + 0.1]} />
        <meshStandardMaterial color={BRICK_DARK} roughness={0.8} />
      </mesh>
    </group>
  );
};

export const GreatBath: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Raised Platform Base */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.4, 2.4]} />
        <meshStandardMaterial color={BRICK_COLOR} roughness={0.8} />
      </mesh>
      {/* Sunken Bath Basin */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[2.2, 0.3, 1.4]} />
        <meshStandardMaterial color="#1E293B" roughness={0.7} />
      </mesh>
      {/* Bath Water (Bitumen lined) */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2.1, 0.1, 1.3]} />
        <meshStandardMaterial color="#0284C7" roughness={0.15} transparent opacity={0.8} />
      </mesh>
      {/* Surrounding Pillared Veranda Base */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[3.3, 0.1, 2.5]} />
        <meshStandardMaterial color={BRICK_DARK} roughness={0.85} />
      </mesh>
    </group>
  );
};

export const FarmFields: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Plowed Furrows */}
      {[-0.6, -0.2, 0.2, 0.6].map((offset, idx) => (
        <mesh key={idx} position={[0, 0.04, offset]} receiveShadow>
          <boxGeometry args={[2.0, 0.05, 0.25]} />
          <meshStandardMaterial color="#5C3A21" roughness={0.95} />
        </mesh>
      ))}
      {/* Barley/Wheat crops */}
      {[-0.6, -0.2, 0.2, 0.6].map((offset, idx) => (
        <mesh key={`crop-${idx}`} position={[0, 0.12, offset]}>
          <boxGeometry args={[1.8, 0.12, 0.15]} />
          <meshStandardMaterial color={CROP_COLOR} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
};

export const Granary: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Air ducts / foundation blocks */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.3, 1.4]} />
        <meshStandardMaterial color={BRICK_COLOR} roughness={0.85} />
      </mesh>
      {/* Granary upper chamber */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.6, 1.2]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.7} />
      </mesh>
      {/* Pitched ventilation roof */}
      <mesh position={[0, 1.0, 0]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 1.0, 0.4, 4]} />
        <meshStandardMaterial color="#4A2810" roughness={0.8} />
      </mesh>
    </group>
  );
};

export const CraftWorkshop: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Workshop floor & shed */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.7, 1.1]} />
        <meshStandardMaterial color={BRICK_COLOR} roughness={0.85} />
      </mesh>
      {/* Terracotta Kiln (Dome) */}
      <mesh position={[0.7, 0.25, 0.3]} castShadow>
        <sphereGeometry args={[0.28, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#991B1B" roughness={0.9} />
      </mesh>
      {/* Pots / Jars outside */}
      <mesh position={[0.6, 0.1, -0.3]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.2, 8]} />
        <meshStandardMaterial color={BRICK_DARK} roughness={0.8} />
      </mesh>
      <mesh position={[0.75, 0.08, -0.15]} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 0.16, 8]} />
        <meshStandardMaterial color="#B45309" roughness={0.8} />
      </mesh>
    </group>
  );
};

export const TradeDockAndWeights: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Dock platform */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.3, 1.2]} />
        <meshStandardMaterial color={STONE_COLOR} roughness={0.8} />
      </mesh>
      {/* Cubical Chert Weights */}
      <mesh position={[-0.6, 0.36, 0.2]} castShadow>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[-0.4, 0.34, 0.2]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#64748B" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Bull Cart representation */}
      <group position={[0.4, 0.25, 0]}>
        {/* Cart bed */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.5, 0.06, 0.35]} />
          <meshStandardMaterial color={WOOD_COLOR} roughness={0.7} />
        </mesh>
        {/* Solid Wooden Wheels */}
        <mesh position={[0, 0.12, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.04, 16]} />
          <meshStandardMaterial color="#451A03" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.12, -0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.04, 16]} />
          <meshStandardMaterial color="#451A03" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

export const SteatiteSealPedestal: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const sealRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (sealRef.current) {
      sealRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group position={position}>
      {/* Pedestal */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.35, 0.6, 16]} />
        <meshStandardMaterial color={STONE_COLOR} roughness={0.7} />
      </mesh>
      {/* Floating Rotating Harappan Steatite Seal */}
      <group ref={sealRef} position={[0, 0.85, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.45, 0.45, 0.08]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Unicorn / Bull engraving emblem simulation */}
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[0.28, 0.28, 0.01]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};

export const CityWall: React.FC<{
  position: [number, number, number];
  length: number;
  horizontal?: boolean;
}> = ({ position, length, horizontal = false }) => {
  return (
    <group position={position}>
      <mesh
        position={[horizontal ? length / 2 : 0, 0.45, horizontal ? 0 : length / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={horizontal ? [length, 0.9, 0.35] : [0.35, 0.9, length]} />
        <meshStandardMaterial color={BRICK_DARK} roughness={0.9} />
      </mesh>
      {/* Bastion tower */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.4, 1.2, 12]} />
        <meshStandardMaterial color={BRICK_COLOR} roughness={0.85} />
      </mesh>
    </group>
  );
};

export const HarappanTree: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.8, 8]} />
        <meshStandardMaterial color="#5C3A21" roughness={0.9} />
      </mesh>
      {/* Foliage (Neem / Peepal tree) */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.45, 12, 12]} />
        <meshStandardMaterial color="#15803D" roughness={0.7} />
      </mesh>
      <mesh position={[0.15, 1.15, 0.1]} castShadow>
        <sphereGeometry args={[0.3, 10, 10]} />
        <meshStandardMaterial color="#16A34A" roughness={0.7} />
      </mesh>
    </group>
  );
};
