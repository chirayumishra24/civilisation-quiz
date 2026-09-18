import React from 'react';
import { RoundEvaluation, Question } from '../../types/game';
import { CheckCircle2, XCircle, Sparkles, Hammer } from 'lucide-react';

interface FeedbackOverlayProps {
  evaluation: RoundEvaluation | null;
  mohenjoQuestion: Question | null;
  dholaviraQuestion: Question | null;
}

export const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  evaluation,
  mohenjoQuestion,
  dholaviraQuestion,
}) => {
  if (!evaluation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in pointer-events-none">
      <div className="w-full max-w-2xl bg-white/95 rounded-3xl p-6 border-4 border-amber-300 shadow-2xl space-y-4 animate-scale-in">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Round Evaluation
          </span>
          <h3 className="font-title text-2xl text-stone-900 mt-1">
            Civilisation Construction Update!
          </h3>
        </div>

        {/* Both Teams Evaluation Side-by-Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Team Mohenjo */}
          <div
            className={`p-4 rounded-2xl border-2 ${
              evaluation.mohenjoCorrect
                ? 'bg-blue-50 border-blue-300 text-blue-950'
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {evaluation.mohenjoCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500" />
              )}
              <span className="font-title text-base text-blue-700">Team Mohenjo</span>
            </div>
            <p className="text-sm font-bold">{evaluation.mohenjoMessage}</p>
            {evaluation.mohenjoBonusStreak && (
              <div className="mt-2 text-xs font-bold text-amber-700 flex items-center gap-1 bg-amber-100 p-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3-Streak Bonus: +1 Extra Stage!</span>
              </div>
            )}
            {mohenjoQuestion && (
              <p className="mt-2 text-xs text-stone-600 bg-white/80 p-2 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-800">Did you know? </span>
                {mohenjoQuestion.explanation}
              </p>
            )}
          </div>

          {/* Team Dholavira */}
          <div
            className={`p-4 rounded-2xl border-2 ${
              evaluation.dholaviraCorrect
                ? 'bg-orange-50 border-orange-300 text-orange-950'
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {evaluation.dholaviraCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500" />
              )}
              <span className="font-title text-base text-orange-700">Team Dholavira</span>
            </div>
            <p className="text-sm font-bold">{evaluation.dholaviraMessage}</p>
            {evaluation.dholaviraBonusStreak && (
              <div className="mt-2 text-xs font-bold text-amber-700 flex items-center gap-1 bg-amber-100 p-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3-Streak Bonus: +1 Extra Stage!</span>
              </div>
            )}
            {dholaviraQuestion && (
              <p className="mt-2 text-xs text-stone-600 bg-white/80 p-2 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-800">Did you know? </span>
                {dholaviraQuestion.explanation}
              </p>
            )}
          </div>
        </div>

        {/* Construction Visual Prompt */}
        <div className="text-center text-xs font-bold text-stone-500 flex items-center justify-center gap-2">
          <Hammer className="w-4 h-4 text-amber-600 animate-bounce" />
          <span>Look at the 3D world as new archaeological elements emerge!</span>
        </div>
      </div>
    </div>
  );
};
