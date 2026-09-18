import React, { useState } from 'react';
import { TOTAL_ROUNDS } from '../../types/game';
import { soundManager } from '../../utils/soundManager';
import { Clock, Volume2, VolumeX, Flame, Award } from 'lucide-react';
import { FullScreenButton } from './FullScreenButton';
import { SmartboardToggle } from './SmartboardToggle';

interface TopBarProps {
  round: number;
  timeLeft: number;
  isRush: boolean;
  formatTime: (seconds?: number) => string;
  onHomeClick?: () => void;
  isSmartboard?: boolean;
  onToggleSmartboard?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  round,
  timeLeft,
  isRush,
  formatTime,
  onHomeClick,
  isSmartboard = false,
  onToggleSmartboard,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  const toggleSound = () => {
    const next = !soundEnabled;
    soundManager.setEnabled(next);
    setSoundEnabled(next);
  };

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 bg-white/75 backdrop-blur-md border-b-2 border-amber-200/60 shadow-sm z-30">
      {/* Brand & Home */}
      <div className="flex items-center gap-3">
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2 group text-left transition-transform active:scale-95"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-clay-sm">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-title text-base sm:text-lg text-amber-950 tracking-wide leading-none">
              CIVILISATION BUILDERS
            </h1>
            <p className="text-[11px] font-semibold text-amber-700/80 tracking-wider uppercase">
              Class 6 History Digital Lab
            </p>
          </div>
        </button>
      </div>

      {/* Round & Timer Center Capsule */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Round Badge */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-100/80 border border-amber-200 shadow-clay-inset">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Round
          </span>
          <span className="font-title text-sm text-amber-700">
            {round}
          </span>
          <span className="text-xs font-semibold text-amber-800/60">
            / {TOTAL_ROUNDS}
          </span>
        </div>

        {/* Timer Badge */}
        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-2xl border transition-all duration-300 ${
            isRush
              ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30 animate-pulse'
              : 'bg-white/90 text-stone-800 border-amber-200 shadow-clay-sm'
          }`}
        >
          {isRush ? (
            <Flame className="w-4 h-4 text-amber-200 animate-bounce" />
          ) : (
            <Clock className="w-4 h-4 text-amber-600" />
          )}
          <span className="font-title text-sm sm:text-base tracking-wider">
            {formatTime(timeLeft) === 'Untimed' ? 'Teacher-Led (Untimed)' : formatTime(timeLeft)}
          </span>
          {isRush && (
            <span className="text-[10px] font-bold uppercase tracking-widest bg-rose-700 px-1.5 py-0.5 rounded">
              2X RUSH
            </span>
          )}
        </div>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-2">
        {onToggleSmartboard && (
          <SmartboardToggle isSmartboard={isSmartboard} onToggle={onToggleSmartboard} />
        )}

        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          className="p-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all active:scale-90 shadow-clay-sm"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <VolumeX className="w-4 h-4 text-rose-500" />
          )}
        </button>
        <FullScreenButton />
      </div>
    </header>
  );
};
