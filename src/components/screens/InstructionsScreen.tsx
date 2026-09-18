import React from 'react';
import { ClayCard } from '../ui/ClayCard';
import { ClayButton } from '../ui/ClayButton';
import { ArrowLeft, Play, Layers, Hammer, Flame, Sparkles } from 'lucide-react';

interface InstructionsScreenProps {
  onStart: () => void;
  onBack: () => void;
}

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ onStart, onBack }) => {
  const steps = [
    {
      num: '01',
      icon: <Layers className="w-6 h-6 text-amber-600" />,
      title: 'Two Teams, Simultaneous Turns',
      desc: 'Team Mohenjo and Team Dholavira answer different archaeological questions each round side-by-side on the board.',
    },
    {
      num: '02',
      icon: <Hammer className="w-6 h-6 text-amber-600" />,
      title: 'Build the 3D Civilisation',
      desc: 'Every correct answer adds +1 Construction Stage: mud-brick houses, grid streets, brick wells, covered drains, and public citadels emerge in real-time.',
    },
    {
      num: '03',
      icon: <Flame className="w-6 h-6 text-rose-500" />,
      title: 'Excavation Streaks & Rush',
      desc: 'Answer 3 in a row correctly for an Archaeology Streak bonus (+1 stage). In the final 60 seconds, Civilisation Rush doubles all construction!',
    },
    {
      num: '04',
      icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
      title: 'Archaeological Lifelines',
      desc: "Use the Archaeologist's Lens (2 uses) for historical clues or the Evidence 50:50 (1 use) to eliminate two incorrect choices.",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8">
      {/* Top Navigation */}
      <div className="w-full max-w-5xl flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/80 hover:bg-white text-stone-700 text-xs font-bold border border-stone-200 shadow-clay-sm transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="font-title text-sm text-amber-900 uppercase tracking-wider">
          Archaeologist Field Guide
        </span>
      </div>

      {/* Center 4-Step Cards */}
      <div className="w-full max-w-4xl my-auto space-y-6 text-center">
        <div className="space-y-1">
          <h2 className="font-title text-3xl sm:text-5xl text-stone-900">
            HOW TO BUILD THE CIVILISATION
          </h2>
          <p className="text-sm sm:text-base font-bold text-amber-900/80">
            Master the 12 stages of the Indus Valley settlement through historical enquiry!
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {steps.map((step) => (
            <ClayCard
              key={step.num}
              elevation="md"
              className="p-5 space-y-3 bg-white/90 border-amber-200/70 relative"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center shadow-clay-sm">
                  {step.icon}
                </div>
                <span className="font-title text-2xl text-amber-300">{step.num}</span>
              </div>
              <h3 className="font-title text-base sm:text-lg text-stone-900">
                {step.title}
              </h3>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {step.desc}
              </p>
            </ClayCard>
          ))}
        </div>

        {/* Start Game Action */}
        <div className="pt-2 flex justify-center">
          <ClayButton
            variant="primary"
            size="lg"
            className="px-10 py-4 text-base shadow-clay-lg"
            icon={<Play className="w-5 h-5 fill-white" />}
            onClick={onStart}
          >
            I'm Ready — Start Building!
          </ClayButton>
        </div>
      </div>

      <div className="text-xs font-semibold text-stone-400">
        Class 6 History • Archaeological Evidence • Urban Planning
      </div>
    </div>
  );
};
