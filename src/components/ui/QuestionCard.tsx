import React from 'react';
import { Question, TeamId, TeamInfo, TEAM_MOHENJO, TEAM_DHOLAVIRA } from '../../types/game';
import { ClayButton } from './ClayButton';
import { Search, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface QuestionCardProps {
  team: TeamId;
  question: Question | null;
  selectedOption: number | null;
  isSubmitted: boolean;
  eliminatedOptions: number[];
  hint: string | null;
  lensRemaining: number;
  fiftyFiftyRemaining: number;
  onSelectOption: (optionIndex: number) => void;
  onSubmit: () => void;
  onUseLens: () => void;
  onUseFiftyFifty: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  team,
  question,
  selectedOption,
  isSubmitted,
  eliminatedOptions,
  hint,
  lensRemaining,
  fiftyFiftyRemaining,
  onSelectOption,
  onSubmit,
  onUseLens,
  onUseFiftyFifty,
}) => {
  const isMohenjo = team === 'mohenjo';
  const info: TeamInfo = isMohenjo ? TEAM_MOHENJO : TEAM_DHOLAVIRA;

  if (!question) {
    return (
      <div className="w-full h-full min-h-[360px] flex items-center justify-center p-6 rounded-3xl bg-white/80 border-2 border-stone-200">
        <p className="text-sm font-semibold text-stone-500">Preparing next question...</p>
      </div>
    );
  }

  const optionPrefixes = ['A', 'B', 'C', 'D'];

  return (
    <div
      className={`w-full h-full flex flex-col justify-between p-4 sm:p-5 rounded-3xl border-2 backdrop-blur-md transition-all shadow-clay ${
        isMohenjo
          ? 'bg-gradient-to-b from-blue-50/90 to-indigo-50/80 border-blue-200'
          : 'bg-gradient-to-b from-amber-50/90 to-orange-50/80 border-orange-200'
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-black/5">
          <div>
            <span
              className={`font-title text-sm tracking-wide ${
                isMohenjo ? 'text-blue-700' : 'text-orange-700'
              }`}
            >
              {info.name}
            </span>
            <p className="text-[10px] font-medium text-stone-500">{info.motto}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200/80 text-stone-700">
              {question.category}
            </span>
            {question.visualType && question.visualType !== 'none' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 flex items-center gap-1">
                🏛️ Model Clue
              </span>
            )}
          </div>
        </div>

        {/* Question Text */}
        <div className="my-3">
          <p className="text-sm sm:text-base font-bold text-stone-800 leading-snug">
            {question.question}
          </p>
        </div>

        {/* Hint Callout if Archaeologist's Lens was used */}
        {hint && (
          <div className="mb-3 p-2.5 rounded-2xl bg-amber-100/90 border border-amber-300 text-amber-950 text-xs flex items-start gap-2 animate-slide-down">
            <Search className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Archaeologist's Lens: </span>
              <span>{hint}</span>
            </div>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-2">
          {question.options.map((option, idx) => {
            const isEliminated = eliminatedOptions.includes(idx);
            const isSelected = selectedOption === idx;

            let buttonClass = 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200 shadow-clay-sm';
            if (isEliminated) {
              buttonClass = 'bg-stone-100 text-stone-400 border-stone-200 opacity-40 cursor-not-allowed line-through';
            } else if (isSelected) {
              buttonClass = isMohenjo
                ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-300'
                : 'bg-orange-600 text-white border-orange-700 shadow-md ring-2 ring-orange-300';
            }

            return (
              <button
                key={idx}
                disabled={isEliminated || isSubmitted}
                onClick={() => onSelectOption(idx)}
                className={`w-full text-left p-2.5 sm:p-3 rounded-2xl border-2 transition-all flex items-start gap-2.5 active:scale-[0.98] ${buttonClass}`}
              >
                <span
                  className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isSelected
                      ? 'bg-white/30 text-white'
                      : isMohenjo
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {optionPrefixes[idx]}
                </span>
                <span className="text-xs sm:text-sm font-medium leading-tight pt-0.5">
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Lifelines & Submit Button */}
      <div className="mt-3 pt-3 border-t border-black/5 space-y-2">
        {/* Lifeline Buttons */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onUseLens}
            disabled={lensRemaining <= 0 || isSubmitted || !!hint}
            title="Archaeologist's Lens (Reveals hint)"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-white/70 hover:bg-white text-stone-700 border border-stone-200 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-clay-sm"
          >
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span>Lens ({lensRemaining})</span>
          </button>

          <button
            onClick={onUseFiftyFifty}
            disabled={fiftyFiftyRemaining <= 0 || isSubmitted || eliminatedOptions.length > 0}
            title="Evidence 50/50 (Removes 2 incorrect options)"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-white/70 hover:bg-white text-stone-700 border border-stone-200 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-clay-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>50:50 ({fiftyFiftyRemaining})</span>
          </button>
        </div>

        {/* Submit or Waiting State */}
        {isSubmitted ? (
          <div className="w-full py-2 px-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-center text-xs font-bold flex items-center justify-center gap-1.5 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Answer Locked In • Waiting for other team...</span>
          </div>
        ) : (
          <ClayButton
            variant={isMohenjo ? 'mohenjo' : 'dholavira'}
            size="md"
            className="w-full"
            disabled={selectedOption === null}
            onClick={onSubmit}
          >
            Lock In Answer
          </ClayButton>
        )}
      </div>
    </div>
  );
};
