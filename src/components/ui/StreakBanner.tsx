import React from 'react';
import { TeamId } from '../../types/game';
import { Flame, Sparkles } from 'lucide-react';

interface StreakBannerProps {
  team: TeamId | null;
}

export const StreakBanner: React.FC<StreakBannerProps> = ({ team }) => {
  if (!team) return null;
  const isMohenjo = team === 'mohenjo';

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce-in">
      <div
        className={`px-6 py-3 rounded-3xl border-3 shadow-2xl flex items-center gap-3 backdrop-blur-md ${
          isMohenjo
            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white border-blue-300 shadow-blue-500/50'
            : 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white border-orange-300 shadow-orange-500/50'
        }`}
      >
        <div className="p-2 rounded-2xl bg-white/20 animate-spin">
          <Sparkles className="w-6 h-6 text-amber-200" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
            <h4 className="font-title text-lg tracking-wider">ARCHAEOLOGY STREAK!</h4>
          </div>
          <p className="text-xs font-semibold text-white/90">
            {isMohenjo ? 'Team Mohenjo' : 'Team Dholavira'} scored 3 in a row! Bonus +1 Stage!
          </p>
        </div>
      </div>
    </div>
  );
};
