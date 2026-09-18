import React from 'react';
import { Flame, Zap } from 'lucide-react';

interface CivilisationRushBannerProps {
  isRush: boolean;
}

export const CivilisationRushBanner: React.FC<CivilisationRushBannerProps> = ({ isRush }) => {
  if (!isRush) return null;

  return (
    <div className="w-full bg-gradient-to-r from-rose-600 via-amber-500 to-orange-600 text-white py-1 px-4 text-center shadow-md animate-pulse z-20 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-rose-300">
      <Flame className="w-4 h-4 text-amber-200 animate-bounce" />
      <Zap className="w-3.5 h-3.5 text-yellow-200" />
      <span>Civilisation Rush Active: Every correct answer builds +2 Stages!</span>
      <Zap className="w-3.5 h-3.5 text-yellow-200" />
      <Flame className="w-4 h-4 text-amber-200 animate-bounce" />
    </div>
  );
};
