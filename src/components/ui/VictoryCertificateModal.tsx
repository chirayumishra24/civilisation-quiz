import React, { useState, useRef } from 'react';
import { WinnerType, GameStats } from '../../types/game';
import { Printer, X, Award, Shield, Compass, Sparkles, Check } from 'lucide-react';

interface VictoryCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: WinnerType;
  stats: GameStats;
}

export const VictoryCertificateModal: React.FC<VictoryCertificateModalProps> = ({
  isOpen,
  onClose,
  winner,
  stats,
}) => {
  const [studentNames, setStudentNames] = useState<string>('Team Archaeologists');
  const [isPrinting, setIsPrinting] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const isMohenjo = winner === 'mohenjo';
  const isDholavira = winner === 'dholavira';
  const isTie = winner === 'tie';

  const winningTeamTitle = isTie
    ? 'Team Mohenjo & Team Dholavira'
    : isMohenjo
    ? 'Team Mohenjo'
    : 'Team Dholavira';

  const winningScore = isTie
    ? Math.max(stats.mohenjoScore, stats.dholaviraScore)
    : isMohenjo
    ? stats.mohenjoScore
    : stats.dholaviraScore;

  const stagesBuilt = isTie
    ? Math.max(stats.mohenjoCityStage, stats.dholaviraCityStage)
    : isMohenjo
    ? stats.mohenjoCityStage
    : stats.dholaviraCityStage;

  const accuracy = isTie
    ? Math.round((stats.mohenjoAccuracy + stats.dholaviraAccuracy) / 2)
    : isMohenjo
    ? stats.mohenjoAccuracy
    : stats.dholaviraAccuracy;

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 150);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl my-auto space-y-4 print:my-0 print:max-w-none">
        {/* Action Controls (Hidden in Print) */}
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-200 shadow-clay-sm print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-700" />
            <span className="font-title text-sm text-stone-800 tracking-wide">
              Official Excavation Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-clay-sm active:scale-95 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-all active:scale-95"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Document */}
        <div
          ref={certRef}
          className="relative bg-[#FFFDF5] text-stone-900 p-8 sm:p-12 rounded-3xl border-8 border-double border-[#8B5A2B] shadow-2xl overflow-hidden print:border-8 print:shadow-none print:rounded-none print:w-full print:h-screen print:p-10 print:box-border"
          style={{
            backgroundImage:
              'radial-gradient(#D4A373 0.65px, transparent 0.65px), radial-gradient(#CCD5AE 0.65px, #FFFDF5 0.65px)',
            backgroundSize: '26px 26px',
            backgroundPosition: '0 0, 13px 13px',
          }}
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#8B5A2B]" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#8B5A2B]" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#8B5A2B]" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#8B5A2B]" />

          {/* Certificate Content */}
          <div className="relative text-center space-y-5 z-10">
            {/* Top Academy Crest */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#8B5A2B] text-amber-100 flex items-center justify-center shadow-md">
                <Award className="w-6 h-6" />
              </div>
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#8B5A2B]">
                Archaeological Survey & Education Initiative • Class 6 History
              </p>
              <h1 className="font-title text-2xl sm:text-4xl text-[#3E2723] tracking-wide mt-1">
                MASTER ARCHAEOLOGIST AWARD
              </h1>
              <p className="text-xs italic font-serif text-stone-600 mt-0.5">
                The Beginning of Indian Civilisation • Harappan Archaeological Study
              </p>
            </div>

            {/* Recipient Input (Editable on screen, clean text in print) */}
            <div className="py-2 border-y border-[#D4A373]/60 max-w-xl mx-auto space-y-1">
              <p className="text-xs uppercase tracking-widest text-stone-500 font-bold">
                This certificate of distinction is proudly presented to:
              </p>
              <div className="print:hidden">
                <input
                  type="text"
                  value={studentNames}
                  onChange={(e) => setStudentNames(e.target.value)}
                  placeholder="Click here to type student or captain names..."
                  className="w-full text-center font-title text-xl sm:text-2xl text-[#8B5A2B] bg-amber-50/50 hover:bg-amber-50 border-b-2 border-[#8B5A2B] focus:outline-none focus:border-amber-700 py-1 transition-all"
                />
                <span className="text-[10px] text-stone-400">
                  (Type student names above before printing)
                </span>
              </div>
              <div className="hidden print:block font-title text-2xl text-[#8B5A2B] border-b-2 border-[#8B5A2B] pb-1">
                {studentNames || winningTeamTitle}
              </div>
            </div>

            {/* Commendation Paragraph */}
            <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto leading-relaxed font-serif">
              In recognition of exceptional archaeological knowledge, urban planning acumen, and historical
              mastery demonstrated by{' '}
              <strong className="text-[#8B5A2B] font-bold">{winningTeamTitle}</strong> in recreating the
              baked-brick architecture, water engineering, and civic wonders of the ancient Indus Valley.
            </p>

            {/* Achievement Stats Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto py-2">
              <div className="p-2.5 rounded-2xl bg-amber-100/70 border border-[#D4A373] text-center">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-600">
                  City Constructed
                </span>
                <span className="font-title text-lg sm:text-xl text-[#3E2723]">
                  {stagesBuilt} / 12 Stages
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-amber-100/70 border border-[#D4A373] text-center">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-600">
                  Final Score
                </span>
                <span className="font-title text-lg sm:text-xl text-amber-700">
                  {winningScore} PTS
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-amber-100/70 border border-[#D4A373] text-center">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-600">
                  Quiz Accuracy
                </span>
                <span className="font-title text-lg sm:text-xl text-emerald-700">
                  {accuracy}%
                </span>
              </div>
            </div>

            {/* Footer Signatures & Date */}
            <div className="pt-4 flex items-end justify-between border-t border-[#D4A373]/60 max-w-xl mx-auto text-left text-xs text-stone-600">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Date of Excavation
                </span>
                <span className="font-semibold text-stone-800">{currentDate}</span>
              </div>

              {/* Seal Stamp */}
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#8B5A2B] flex flex-col items-center justify-center p-1 text-center bg-amber-50 shadow-inner">
                <Sparkles className="w-4 h-4 text-[#8B5A2B]" />
                <span className="text-[7px] font-black uppercase text-[#8B5A2B] tracking-tighter leading-none mt-0.5">
                  HARAPPA SEAL
                </span>
                <span className="text-[6px] font-semibold text-stone-500 leading-none">VERIFIED</span>
              </div>

              <div className="text-right">
                <div className="w-28 border-b border-stone-800 mb-1" />
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Chief Archaeological Surveyor
                </span>
                <span className="text-[9px] text-stone-400">Classroom Historian</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
