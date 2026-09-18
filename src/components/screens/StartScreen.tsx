import React, { useState } from 'react';
import { ClayCard } from '../ui/ClayCard';
import { ClayButton } from '../ui/ClayButton';
import { Play, BookOpen, KeyRound, Sparkles, Shield, Compass, Landmark } from 'lucide-react';
import { HarappanWorld } from '../3d/HarappanWorld';

interface StartScreenProps {
  onStart: () => void;
  onInstructions: () => void;
  onTeacherDashboard: () => void;
  gameCode: string;
  setGameCode: (code: string) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  onInstructions,
  onTeacherDashboard,
  gameCode,
  setGameCode,
}) => {
  const [codeError, setCodeError] = useState('');

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden">
      {/* Background 3D preview backdrop */}
      <div className="absolute inset-0 opacity-40 pointer-events-none -z-10 blur-[1px]">
        <HarappanWorld mohenjoStage={8} dholaviraStage={8} activeFocus="both" />
      </div>

      {/* Top Banner / Classroom Badge */}
      <div className="w-full flex justify-between items-center max-w-5xl z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-200 shadow-clay-sm">
          <Landmark className="w-4 h-4 text-amber-700" />
          <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
            Class 6 History • Harappan Civilisation
          </span>
        </div>

        <button
          onClick={onTeacherDashboard}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/85 hover:bg-white text-stone-700 text-xs font-bold border border-stone-200 shadow-clay-sm transition-all hover:scale-105 active:scale-95"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>Teacher Dashboard</span>
        </button>
      </div>

      {/* Center Hero Card */}
      <div className="w-full max-w-3xl my-auto z-10 text-center space-y-6">
        <div className="space-y-2 animate-rise-in">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-bold uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Two-Team Interactive 3D Quiz
          </div>
          <h1 className="font-title text-4xl sm:text-6xl text-stone-900 tracking-wide drop-shadow-sm">
            CIVILISATION BUILDERS
          </h1>
          <p className="font-body text-base sm:text-xl font-bold text-amber-900/90 max-w-xl mx-auto">
            Build the City. Discover the Civilisation.
          </p>
        </div>

        {/* Two Teams Preview Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* Team Mohenjo */}
          <ClayCard variant="mohenjo" elevation="md" className="p-4 sm:p-5 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-title text-lg text-blue-700">Team Mohenjo</span>
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs font-bold text-blue-900/70">Plan • Build • Discover</p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Construct the Great Bath, brick wells, covered drains, and grid avenues of Mohenjo-daro.
            </p>
          </ClayCard>

          {/* Team Dholavira */}
          <ClayCard variant="dholavira" elevation="md" className="p-4 sm:p-5 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-title text-lg text-orange-700">Team Dholavira</span>
              <Compass className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-xs font-bold text-orange-900/70">Explore • Trade • Thrive</p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Carve stone water reservoirs, trade docks, craft quarters, and gateway signboards of Dholavira.
            </p>
          </ClayCard>
        </div>

        {/* Action Controls */}
        <div className="max-w-md mx-auto space-y-4 pt-2">
          {/* Game Code Input (optional) */}
          <div className="relative flex items-center">
            <KeyRound className="absolute left-4 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Enter 6-digit Game Code (Optional)"
              value={gameCode}
              onChange={(e) => {
                setGameCode(e.target.value.toUpperCase());
                setCodeError('');
              }}
              maxLength={8}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 border-2 border-stone-200 text-stone-800 placeholder-stone-400 text-sm font-bold shadow-clay-inset focus:outline-none focus:border-amber-400 tracking-wider"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <ClayButton
              variant="primary"
              size="lg"
              className="w-full sm:flex-1 text-base shadow-clay-lg"
              icon={<Play className="w-5 h-5 fill-white" />}
              onClick={onStart}
            >
              Start Building
            </ClayButton>

            <ClayButton
              variant="neutral"
              size="lg"
              className="w-full sm:w-auto"
              icon={<BookOpen className="w-4 h-4" />}
              onClick={onInstructions}
            >
              How to Play
            </ClayButton>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs font-semibold text-stone-500 z-10 pt-4">
        Interactive 3D Archaeological Reconstruction • Aligned with NCERT History Curriculum
      </div>
    </div>
  );
};
