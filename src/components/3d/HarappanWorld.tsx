import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { DualCityView } from './DualCityView';
import { Eye, Layers, Compass } from 'lucide-react';
import {
  LandmarkInspectorDrawer,
  ArchaeologicalLandmark,
  ARCHAEOLOGICAL_LANDMARKS,
} from './LandmarkInspectorDrawer';

interface HarappanWorldProps {
  mohenjoStage: number;
  dholaviraStage: number;
  activeFocus?: 'both' | 'mohenjo' | 'dholavira';
}

export const HarappanWorld: React.FC<HarappanWorldProps> = ({
  mohenjoStage,
  dholaviraStage,
  activeFocus = 'both',
}) => {
  const [viewMode, setViewMode] = useState<'both' | 'mohenjo' | 'dholavira'>(activeFocus);
  const [showInspector, setShowInspector] = useState(false);
  const [selectedLandmark, setSelectedLandmark] = useState<ArchaeologicalLandmark | null>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const handleSwitchView = (mode: 'both' | 'mohenjo' | 'dholavira') => {
    setViewMode(mode);
    if (!controlsRef.current) return;
    if (mode === 'both') {
      controlsRef.current.target.set(0, 0, 0);
    } else if (mode === 'mohenjo') {
      controlsRef.current.target.set(-7.5, 0, 0);
    } else if (mode === 'dholavira') {
      controlsRef.current.target.set(7.5, 0, 0);
    }
  };

  const handleSelectLandmark = (landmark: ArchaeologicalLandmark) => {
    setSelectedLandmark(landmark);
    setShowInspector(true);
    if (controlsRef.current) {
      controlsRef.current.target.set(
        landmark.targetCoord[0],
        landmark.targetCoord[1],
        landmark.targetCoord[2]
      );
    }
  };

  const toggleInspector = () => {
    if (!showInspector) {
      const defaultLandmark =
        ARCHAEOLOGICAL_LANDMARKS.find((l) => Math.max(mohenjoStage, dholaviraStage) >= l.stageRequired) ||
        ARCHAEOLOGICAL_LANDMARKS[0];
      handleSelectLandmark(defaultLandmark);
    } else {
      setShowInspector(false);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[350px] rounded-3xl overflow-hidden shadow-clay bg-gradient-to-b from-[#E0F2FE] via-[#FEF3C7] to-[#F5E6D3] border-2 border-white/80">
      {/* View Toggle Pill Toolbar */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1.5 rounded-full bg-white/85 backdrop-blur-md shadow-clay-sm border border-white/60">
        <button
          onClick={() => handleSwitchView('mohenjo')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            viewMode === 'mohenjo'
              ? 'bg-mohenjo-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-mohenjo-600 hover:bg-mohenjo-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
          Mohenjo
        </button>
        <button
          onClick={() => handleSwitchView('both')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            viewMode === 'both'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Both Cities
        </button>
        <button
          onClick={() => handleSwitchView('dholavira')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            viewMode === 'dholavira'
              ? 'bg-dholavira-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-dholavira-600 hover:bg-dholavira-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-orange-400 inline-block"></span>
          Dholavira
        </button>

        <div className="w-[1px] h-4 bg-stone-300 mx-0.5" />

        <button
          onClick={toggleInspector}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
            showInspector
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-amber-800 hover:bg-amber-100/70'
          }`}
          title="Inspect reconstructed archaeological landmarks"
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Inspect Landmarks</span>
        </button>
      </div>

      {/* Orbit Tip Hint */}
      <div className="absolute bottom-3 right-4 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-sm text-white text-[11px]">
        <Eye className="w-3 h-3" />
        <span>Drag to rotate • Scroll to zoom</span>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera
          makeDefault
          position={[0, 14, 18]}
          fov={45}
          near={0.1}
          far={100}
        />
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.15}
          minDistance={6}
          maxDistance={32}
        />

        {/* Ambient & Ancient Indus Lighting */}
        <ambientLight intensity={0.65} color="#FFFBF0" />
        <directionalLight
          position={[12, 20, 14]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          color="#FFF7ED"
        />
        <directionalLight position={[-10, 8, -10]} intensity={0.4} color="#BAE6FD" />

        {/* Endless Sand Plane */}
        <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#EEDBBE" roughness={0.95} />
        </mesh>

        {/* Atmospheric Fog */}
        <fog attach="fog" args={['#F5E6D3', 25, 60]} />

        {/* Dual City Interactive Model */}
        <DualCityView mohenjoStage={mohenjoStage} dholaviraStage={dholaviraStage} />
      </Canvas>

      {/* Interactive Landmark Drawer Overlay */}
      <LandmarkInspectorDrawer
        isOpen={showInspector}
        onClose={() => setShowInspector(false)}
        selectedLandmark={selectedLandmark}
        onSelectLandmark={handleSelectLandmark}
        mohenjoStage={mohenjoStage}
        dholaviraStage={dholaviraStage}
      />
    </div>
  );
};
