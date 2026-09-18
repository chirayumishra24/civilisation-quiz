import React from 'react';
import { CITY_STAGES, MAX_CITY_STAGES } from '../../types/game';
import { Check } from 'lucide-react';

interface StageTimelineProps {
  mohenjoStage: number;
  dholaviraStage: number;
}

export const StageTimeline: React.FC<StageTimelineProps> = ({
  mohenjoStage,
  dholaviraStage,
}) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border-2 border-amber-200/60 shadow-clay-sm">
      <div className="flex items-center justify-between mb-1.5 px-1">
        <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
          Archaeological Progression Timeline
        </span>
        <div className="flex items-center gap-4 text-[11px] font-semibold">
          <span className="flex items-center gap-1.5 text-blue-700">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shadow-sm" />
            Mohenjo: Stage {mohenjoStage}/{MAX_CITY_STAGES}
          </span>
          <span className="flex items-center gap-1.5 text-orange-700">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block shadow-sm" />
            Dholavira: Stage {dholaviraStage}/{MAX_CITY_STAGES}
          </span>
        </div>
      </div>

      {/* 12 Horizontal Milestone Badges */}
      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 sm:gap-1.5">
        {CITY_STAGES.map((s) => {
          const mPassed = mohenjoStage >= s.id;
          const dPassed = dholaviraStage >= s.id;

          let badgeStyle = 'bg-stone-100 text-stone-400 border-stone-200';
          if (mPassed && dPassed) {
            badgeStyle = 'bg-gradient-to-r from-blue-100 to-orange-100 text-stone-800 border-amber-300 font-bold';
          } else if (mPassed) {
            badgeStyle = 'bg-blue-100/90 text-blue-800 border-blue-300 font-bold';
          } else if (dPassed) {
            badgeStyle = 'bg-orange-100/90 text-orange-800 border-orange-300 font-bold';
          }

          return (
            <div
              key={s.id}
              title={`${s.name}: ${s.description}`}
              className={`flex flex-col items-center justify-center p-1 rounded-xl border text-center transition-all ${badgeStyle}`}
            >
              <div className="flex items-center gap-0.5 text-[10px]">
                <span className="font-bold">{s.id}</span>
                {(mPassed || dPassed) && <Check className="w-2.5 h-2.5 text-emerald-600" />}
              </div>
              <span className="text-[9px] truncate max-w-full leading-tight font-medium hidden sm:inline-block">
                {s.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
