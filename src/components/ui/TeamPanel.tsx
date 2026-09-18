import React from 'react';
import { TeamId, TeamState, Question } from '../../types/game';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { Flame, Trophy } from 'lucide-react';

interface TeamPanelProps {
  team: TeamId;
  teamState: TeamState;
  question: Question | null;
  selectedOption: number | null;
  isSubmitted: boolean;
  eliminatedOptions: number[];
  hint: string | null;
  isSmartboard?: boolean;
  onSelectOption: (idx: number) => void;
  onSubmit: () => void;
  onUseLens: () => void;
  onUseFiftyFifty: () => void;
}

export const TeamPanel: React.FC<TeamPanelProps> = ({
  team,
  teamState,
  question,
  selectedOption,
  isSubmitted,
  eliminatedOptions,
  hint,
  isSmartboard = false,
  onSelectOption,
  onSubmit,
  onUseLens,
  onUseFiftyFifty,
}) => {
  const isMohenjo = team === 'mohenjo';

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Team Top Stats Mini Bar */}
      <div
        className={`p-3 rounded-2xl border-2 backdrop-blur-md shadow-clay-sm flex items-center justify-between ${
          isMohenjo
            ? 'bg-blue-50/80 border-blue-200 text-blue-950'
            : 'bg-orange-50/80 border-orange-200 text-orange-950'
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${
              isMohenjo ? 'bg-blue-600' : 'bg-orange-600'
            }`}
          >
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-500">Score</span>
            <p className="font-title text-base leading-none">{teamState.score} pts</p>
          </div>
        </div>

        {/* Streak indicator */}
        <div className="flex items-center gap-1.5">
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              teamState.streak >= 2
                ? 'bg-amber-400 text-amber-950 animate-bounce'
                : 'bg-stone-200/70 text-stone-600'
            }`}
          >
            <Flame
              className={`w-3.5 h-3.5 ${
                teamState.streak >= 2 ? 'text-rose-600 fill-rose-600' : 'text-stone-400'
              }`}
            />
            <span>Streak: {teamState.streak}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-1">
        <ProgressBar
          currentStage={teamState.cityStage}
          team={team}
          label={`${isMohenjo ? 'Mohenjo' : 'Dholavira'} Construction`}
        />
      </div>

      {/* Main Question Card */}
      <div className="flex-1 min-h-[360px]">
        <QuestionCard
          team={team}
          question={question}
          selectedOption={selectedOption}
          isSubmitted={isSubmitted}
          eliminatedOptions={eliminatedOptions}
          hint={hint}
          lensRemaining={teamState.lensUses}
          fiftyFiftyRemaining={teamState.fiftyFiftyUses}
          isSmartboard={isSmartboard}
          onSelectOption={onSelectOption}
          onSubmit={onSubmit}
          onUseLens={onUseLens}
          onUseFiftyFifty={onUseFiftyFifty}
        />
      </div>
    </div>
  );
};
