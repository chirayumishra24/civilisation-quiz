import React from 'react';
import { Monitor } from 'lucide-react';

interface SmartboardToggleProps {
  isSmartboard: boolean;
  onToggle: () => void;
  className?: string;
}

export const SmartboardToggle: React.FC<SmartboardToggleProps> = ({
  isSmartboard,
  onToggle,
  className = '',
}) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all active:scale-95 shadow-clay-sm border ${
        isSmartboard
          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-300'
          : 'bg-white/85 hover:bg-white text-stone-700 border-stone-200'
      } ${className}`}
      title={
        isSmartboard
          ? 'Smartboard Mode Active: Jumbo touch buttons for interactive whiteboard'
          : 'Enable Smartboard Mode for classroom interactive touchscreens'
      }
    >
      <Monitor className={`w-3.5 h-3.5 ${isSmartboard ? 'text-white' : 'text-stone-600'}`} />
      <span className="hidden sm:inline">
        {isSmartboard ? 'Smartboard: ON' : 'Smartboard Mode'}
      </span>
    </button>
  );
};
