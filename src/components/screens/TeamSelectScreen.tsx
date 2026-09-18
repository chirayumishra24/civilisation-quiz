import React from 'react';
import { ClayCard } from '../ui/ClayCard';
import { ClayButton } from '../ui/ClayButton';
import { ArrowLeft, Play, Shield, Compass, CheckCircle2 } from 'lucide-react';

interface TeamSelectScreenProps {
  onConfirm: () => void;
  onBack: () => void;
}

export const TeamSelectScreen: React.FC<TeamSelectScreenProps> = ({ onConfirm, onBack }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8">
      {/* Top Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/80 hover:bg-white text-stone-700 text-xs font-bold border border-stone-200 shadow-clay-sm transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="font-title text-sm text-amber-900 uppercase tracking-wider">
          Two Teams • Simultaneous Match
        </span>
      </div>

      {/* Main Team Showcase */}
      <div className="w-full max-w-4xl my-auto space-y-6 text-center">
        <div className="space-y-1">
          <h2 className="font-title text-3xl sm:text-5xl text-stone-900">
            CHOOSE YOUR EXPEDITION
          </h2>
          <p className="text-sm sm:text-base font-bold text-stone-600">
            Both teams will answer archaeological questions simultaneously on the same board!
          </p>
        </div>

        {/* Two Massive Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Team Mohenjo */}
          <ClayCard variant="mohenjo" elevation="lg" className="p-6 sm:p-8 space-y-4 relative overflow-hidden border-3 border-blue-300">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-800">
                Settlement Alpha
              </span>
              <h3 className="font-title text-2xl text-blue-900">TEAM MOHENJO</h3>
              <p className="text-xs font-bold text-blue-700">Plan • Build • Discover</p>
            </div>
            <ul className="space-y-2 text-xs font-medium text-stone-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Specialises in Great Bath & Citadel architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Engineers deep brick-lined wells & drains</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Uncovers steatite seals with unicorn motifs</span>
              </li>
            </ul>
          </ClayCard>

          {/* Team Dholavira */}
          <ClayCard variant="dholavira" elevation="lg" className="p-6 sm:p-8 space-y-4 relative overflow-hidden border-3 border-orange-300">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-800">
                Settlement Beta
              </span>
              <h3 className="font-title text-2xl text-orange-950">TEAM DHOLAVIRA</h3>
              <p className="text-xs font-bold text-orange-700">Explore • Trade • Thrive</p>
            </div>
            <ul className="space-y-2 text-xs font-medium text-stone-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600" />
                <span>Masters monumental stone-cut water reservoirs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600" />
                <span>Navigates coastal trade and overseas bead exports</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600" />
                <span>Deciphers giant white gypsum inscription signboards</span>
              </li>
            </ul>
          </ClayCard>
        </div>

        {/* Start Game Button */}
        <div className="pt-4 flex justify-center">
          <ClayButton
            variant="primary"
            size="lg"
            className="px-10 py-4 text-base shadow-clay-lg"
            icon={<Play className="w-5 h-5 fill-white" />}
            onClick={onConfirm}
          >
            Enter Excavation Site
          </ClayButton>
        </div>
      </div>

      <div className="text-xs font-semibold text-stone-400">
        Ready for round 1: Both teams answer simultaneously
      </div>
    </div>
  );
};
