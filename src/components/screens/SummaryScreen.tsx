import React from 'react';
import { ClayCard } from '../ui/ClayCard';
import { ClayButton } from '../ui/ClayButton';
import { RotateCcw, Home, Compass, Droplets, Trash2, Wheat, Hammer, FileText, CheckCircle2 } from 'lucide-react';

interface SummaryScreenProps {
  onPlayAgain: () => void;
  onHome: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({ onPlayAgain, onHome }) => {
  const topics = [
    {
      icon: <Compass className="w-6 h-6 text-blue-600" />,
      title: '1. Town Planning & Grid Layout',
      badge: 'Urban Architecture',
      points: [
        'Cities were divided into two main parts: a raised western Citadel for public structures and a lower residential town to the east.',
        'Streets cut each other at right angles in a planned grid layout, built with standardised baked bricks of 1:2:4 ratio.',
      ],
    },
    {
      icon: <Droplets className="w-6 h-6 text-sky-600" />,
      title: '2. Water Management & The Great Bath',
      badge: 'Hydraulic Engineering',
      points: [
        'The Great Bath at Mohenjo-daro was lined with bricks, coated with plaster, and made watertight with a layer of natural bitumen (tar).',
        'Dholavira featured 16 monumental rock-cut stone reservoirs to harvest every drop of monsoon rainfall.',
      ],
    },
    {
      icon: <Trash2 className="w-6 h-6 text-amber-700" />,
      title: '3. Covered Drainage & Sanitation',
      badge: 'Public Health',
      points: [
        'Every house had its own bathroom connected through wall pipes to covered street drains.',
        'Inspection holes with removable limestone slabs allowed regular cleaning and maintenance.',
      ],
    },
    {
      icon: <Wheat className="w-6 h-6 text-emerald-600" />,
      title: '4. Farming & Food Storage',
      badge: 'Agriculture',
      points: [
        'Harappans cultivated wheat, barley, pulses, peas, rice, sesame, and mustard, and were among the first to spin and weave cotton.',
        'Massive granaries with raised brick foundations and air ducts kept grain safe from dampness and floods.',
      ],
    },
    {
      icon: <Hammer className="w-6 h-6 text-orange-600" />,
      title: '5. Crafts & International Trade',
      badge: 'Industry & Commerce',
      points: [
        'Specialised workshops made beads of carnelian, lapis lazuli, shell, copper, bronze, gold, and silver.',
        'Trade extended to Mesopotamia (ancient Iraq) and Oman, regulated by standardised cubical weights made of chert.',
      ],
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      title: '6. Seals & Undeciphered Script',
      badge: 'Communication',
      points: [
        'Square steatite seals with carved animal motifs (bulls, unicorns, elephants) were pressed into wet clay to stamp trade goods.',
        'The Harappan script remains undeciphered to this day, leaving many secrets of their civilisation waiting to be unlocked.',
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-b from-[#FFFDF5] via-[#FFF8E7] to-[#F5E6D3]">
      {/* Top Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10">
        <button
          onClick={onHome}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/80 hover:bg-white text-stone-700 text-xs font-bold border border-stone-200 shadow-clay-sm transition-all active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <span className="font-title text-sm text-amber-900 uppercase tracking-wider">
          Class 6 History Learning Takeaways
        </span>
      </div>

      {/* Main Educational Cards */}
      <div className="w-full max-w-5xl my-auto space-y-6 z-10">
        <div className="text-center space-y-1">
          <h2 className="font-title text-3xl sm:text-5xl text-stone-900">
            WHAT DID WE DISCOVER?
          </h2>
          <p className="text-sm sm:text-base font-bold text-amber-900/80 max-w-2xl mx-auto">
            Key archaeological insights from the beginning of Indian civilisation (c. 2600 – 1900 BCE)
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          {topics.map((item, idx) => (
            <ClayCard
              key={idx}
              elevation="md"
              className="p-5 space-y-3 bg-white/95 border-amber-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center shadow-clay-sm">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-title text-base text-stone-900 mb-2">
                  {item.title}
                </h3>
                <ul className="space-y-2 text-xs text-stone-600 font-medium">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ClayCard>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <ClayButton
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-clay-lg"
            icon={<RotateCcw className="w-5 h-5" />}
            onClick={onPlayAgain}
          >
            Start Another Excavation
          </ClayButton>

          <ClayButton
            variant="neutral"
            size="lg"
            className="w-full sm:w-auto"
            icon={<Home className="w-4 h-4" />}
            onClick={onHome}
          >
            Return to Home Screen
          </ClayButton>
        </div>
      </div>

      <div className="text-xs font-semibold text-stone-400 pt-4">
        Aligned with CBSE / NCERT History Chapter: The Beginning of Indian Civilisation
      </div>
    </div>
  );
};
