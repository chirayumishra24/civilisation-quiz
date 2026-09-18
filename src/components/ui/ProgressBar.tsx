import React from 'react';
import { MAX_CITY_STAGES, TeamId } from '../../types/game';

interface ProgressBarProps {
  currentStage: number;
  team: TeamId;
  label?: string;
  showSegments?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStage,
  team,
  label,
  showSegments = true,
}) => {
  const isMohenjo = team === 'mohenjo';
  const percentage = Math.min(100, Math.round((currentStage / MAX_CITY_STAGES) * 100));

  const fillGradient = isMohenjo
    ? 'from-blue-500 via-indigo-500 to-blue-600'
    : 'from-amber-500 via-orange-500 to-amber-600';

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <div className="flex justify-between items-center text-xs font-semibold px-1">
          <span className={isMohenjo ? 'text-blue-900' : 'text-orange-950'}>{label}</span>
          <span className="font-bold text-stone-600">
            {currentStage} / {MAX_CITY_STAGES} Stages ({percentage}%)
          </span>
        </div>
      )}

      {/* Outer track */}
      <div className="relative h-4 sm:h-5 w-full rounded-full bg-stone-200/80 p-0.5 shadow-clay-inset overflow-hidden">
        {/* Animated fill */}
        <div
          className={`h-full rounded-full bg-gradient-to-r ${fillGradient} transition-all duration-700 ease-out shadow-sm flex items-center justify-end pr-1`}
          style={{ width: `${percentage}%` }}
        >
          {percentage > 15 && (
            <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
          )}
        </div>

        {/* 12 segment dividers */}
        {showSegments && (
          <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
            {Array.from({ length: MAX_CITY_STAGES - 1 }).map((_, i) => (
              <div
                key={i}
                className="w-0.5 h-full bg-black/10"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
