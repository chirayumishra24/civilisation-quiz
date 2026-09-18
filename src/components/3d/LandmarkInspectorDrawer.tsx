import React from 'react';
import { X, Sparkles, BookOpen, Compass, ChevronRight, Eye } from 'lucide-react';

export interface ArchaeologicalLandmark {
  id: string;
  name: string;
  city: 'Mohenjo-daro' | 'Dholavira' | 'Both';
  stageRequired: number;
  ncertTopic: string;
  significance: string;
  funFact: string;
  targetCoord: [number, number, number];
}

export const ARCHAEOLOGICAL_LANDMARKS: ArchaeologicalLandmark[] = [
  {
    id: 'great_bath',
    name: 'The Great Bath',
    city: 'Mohenjo-daro',
    stageRequired: 6,
    ncertTopic: 'Public Architecture & Ritual Cleansing',
    significance:
      'A rectangular tank lined with baked bricks, coated with plaster, and sealed with a layer of natural bitumen (tar) to make it completely waterproof.',
    funFact:
      'Steps led down into the water on the north and south sides, with rooms on three sides including one with a large well.',
    targetCoord: [-8.8, 0.5, 0.4],
  },
  {
    id: 'granary',
    name: 'The Great Granary',
    city: 'Mohenjo-daro',
    stageRequired: 7,
    ncertTopic: 'Food Storage & Surplus Management',
    significance:
      'Massive raised brick foundation with ventilation ducts beneath the floorboards to protect stored barley, wheat, and sesame from ground moisture.',
    funFact:
      'Strategically positioned near the riverbank for rapid loading of barges and distribution to surrounding farming villages.',
    targetCoord: [-9.5, 1.0, -1.8],
  },
  {
    id: 'brick_wells',
    name: 'Cylindrical Brick Wells',
    city: 'Mohenjo-daro',
    stageRequired: 4,
    ncertTopic: 'Urban Sanitation & Clean Water',
    significance:
      'Engineered using wedge-shaped (trapezoidal) baked bricks so the circular arch naturally resisted inward soil and water pressure.',
    funFact:
      'Archaeologists estimate Mohenjo-daro possessed more than 700 wells—one for almost every neighborhood block.',
    targetCoord: [-8.3, 0.5, -0.6],
  },
  {
    id: 'drainage',
    name: 'Covered Street Drains',
    city: 'Both',
    stageRequired: 5,
    ncertTopic: 'Advanced Civic Wastewater Engineering',
    significance:
      'Underground brick channels laid with a gentle gradient, covered with removable stone slabs and brick tiles for sanitation cleaning.',
    funFact:
      'House bathroom drains discharged into small silt-traps (soak pits) so solid debris remained behind before water entered street drains.',
    targetCoord: [0, 0.2, 0],
  },
  {
    id: 'reservoirs',
    name: 'Rock-Cut Water Reservoirs',
    city: 'Dholavira',
    stageRequired: 9,
    ncertTopic: 'Rainwater Harvesting in Arid Zones',
    significance:
      'Carved directly into living sandstone bedrock to capture seasonal rainwater cascading from the Mansar and Manhar streams in the Rann of Kutch.',
    funFact:
      'Dholavira had a cascade of 16 interconnected reservoirs that stored an estimated 250,000 cubic meters of fresh water.',
    targetCoord: [8.8, 0.5, 1.2],
  },
  {
    id: 'craft_workshop',
    name: 'Bead Workshop & Chert Weights',
    city: 'Both',
    stageRequired: 8,
    ncertTopic: 'Craft Specialization & Standard Weights',
    significance:
      'Standardized cubical chert stone weights graded in a binary scale (1, 2, 4, 8, 16, 32 up to 12,800 units) for precious carnelian beads and metals.',
    funFact:
      'Bead polishers utilized specialized micro-drills made of copper and hardened chert to drill through carnelian beads.',
    targetCoord: [6.8, 0.5, -1.4],
  },
  {
    id: 'seals',
    name: 'Steatite Seals & Signboard',
    city: 'Both',
    stageRequired: 10,
    ncertTopic: 'Indus Script & Commercial Branding',
    significance:
      'Square soapstone (steatite) seals engraved with unicorns, humped bulls, tigers, and undeciphered pictographic script stamped on clay tags.',
    funFact:
      'Dholavira revealed a giant wooden gateway signboard inlaid with 10 large white gypsum symbols, readable from afar by incoming caravans.',
    targetCoord: [6.2, 0.8, 0.5],
  },
  {
    id: 'citadel_walls',
    name: 'The Citadel Fortifications',
    city: 'Both',
    stageRequired: 11,
    ncertTopic: 'Town Planning & Dual-Level Cities',
    significance:
      'Harappan cities were divided into an elevated western Citadel (for civic assemblies and defense) and a lower eastern residential town.',
    funFact:
      'Dholavira had a unique three-tier division: Citadel, Middle Town, and Lower Town, all encircled by monumental stone ramparts.',
    targetCoord: [0, 1.5, -4],
  },
];

interface LandmarkInspectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLandmark: ArchaeologicalLandmark | null;
  onSelectLandmark: (landmark: ArchaeologicalLandmark) => void;
  mohenjoStage: number;
  dholaviraStage: number;
}

export const LandmarkInspectorDrawer: React.FC<LandmarkInspectorDrawerProps> = ({
  isOpen,
  onClose,
  selectedLandmark,
  onSelectLandmark,
  mohenjoStage,
  dholaviraStage,
}) => {
  if (!isOpen) return null;

  const currentMaxStage = Math.max(mohenjoStage, dholaviraStage);

  return (
    <div className="absolute inset-x-3 bottom-3 sm:bottom-4 z-20 max-w-4xl mx-auto animate-rise-in">
      <div className="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-amber-300 shadow-clay-lg">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-amber-100 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-title text-sm sm:text-base text-stone-900 leading-tight">
                Archaeological Landmark Inspector
              </h4>
              <p className="text-[10px] text-amber-800 font-semibold">
                NCERT Class 6 History • Archaeological Discoveries
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-all active:scale-95"
            title="Close Inspector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Landmark Details Card */}
        {selectedLandmark ? (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                  {selectedLandmark.city}
                </span>
                <h3 className="font-title text-lg text-amber-950">
                  {selectedLandmark.name}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                {selectedLandmark.ncertTopic}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#FFFDF5] border border-amber-200">
                <span className="block font-bold text-stone-700 uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-amber-600" />
                  Archaeological Significance
                </span>
                <p className="text-stone-700 leading-relaxed font-medium">
                  {selectedLandmark.significance}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
                <span className="block font-bold text-amber-900 uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  NCERT Excavation Detail
                </span>
                <p className="text-stone-700 leading-relaxed font-medium">
                  {selectedLandmark.funFact}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-stone-500 py-1 font-medium">
            Select an excavated landmark below to inspect its architecture, engineering, and historical significance:
          </p>
        )}

        {/* Landmarks Selector Carousel / Badges */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {ARCHAEOLOGICAL_LANDMARKS.map((item) => {
            const isUnlocked = currentMaxStage >= item.stageRequired;
            const isSelected = selectedLandmark?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectLandmark(item)}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-clay-sm'
                    : isUnlocked
                    ? 'bg-amber-100/70 hover:bg-amber-100 text-stone-800 border border-amber-300'
                    : 'bg-stone-100 text-stone-400 border border-stone-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{item.name}</span>
                {!isUnlocked && (
                  <span className="text-[9px] text-stone-400">
                    (Stg {item.stageRequired})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
