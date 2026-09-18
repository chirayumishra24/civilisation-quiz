import React from 'react';
import { WinnerType, GameStats } from '../../types/game';
import { ClayCard } from '../ui/ClayCard';
import { ClayButton } from '../ui/ClayButton';
import { Trophy, RotateCcw, BookOpen, Home, Sparkles, CheckCircle2 } from 'lucide-react';
import { HarappanWorld } from '../3d/HarappanWorld';

interface VictoryScreenProps {
  winner: WinnerType;
  stats: GameStats;
  onPlayAgain: () => void;
  onSummary: () => void;
  onHome: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  winner,
  stats,
  onPlayAgain,
  onSummary,
  onHome,
}) => {
  const isMohenjoWinner = winner === 'mohenjo';
  const isDholaviraWinner = winner === 'dholavira';
  const isTie = winner === 'tie';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-b from-[#FFFDF5] via-[#FFF8E7] to-[#F5E6D3]">
      {/* Top Banner */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10">
        <button
          onClick={onHome}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/80 hover:bg-white text-stone-700 text-xs font-bold border border-stone-200 shadow-clay-sm transition-all active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-100 border border-amber-300">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
            Excavation Completed!
          </span>
        </div>
      </div>

      {/* Main Content Arena */}
      <div className="w-full max-w-5xl my-auto space-y-6 z-10">
        {/* Winner Hero Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-3xl bg-amber-400 text-amber-950 shadow-clay-lg mb-2">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <h2 className="font-title text-3xl sm:text-6xl text-stone-900 tracking-wide">
            {isTie
              ? 'HONOURABLE CIVILISATION TIE!'
              : isMohenjoWinner
              ? 'TEAM MOHENJO VICTORIOUS!'
              : 'TEAM DHOLAVIRA VICTORIOUS!'}
          </h2>

          <p className="text-sm sm:text-base font-bold text-stone-600 max-w-xl mx-auto">
            {isTie
              ? 'Both teams developed remarkable Harappan settlements with peerless architectural planning.'
              : isMohenjoWinner
              ? 'Team Mohenjo has constructed a monumental Bronze Age city of baked brick, pure water, and order.'
              : 'Team Dholavira has engineered world-class reservoirs, vibrant trade networks, and stone ramparts.'}
          </p>
        </div>

        {/* 3D Showcase Window */}
        <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden shadow-clay border-2 border-white/80">
          <HarappanWorld
            mohenjoStage={stats.mohenjoCityStage}
            dholaviraStage={stats.dholaviraCityStage}
            activeFocus={isMohenjoWinner ? 'mohenjo' : isDholaviraWinner ? 'dholavira' : 'both'}
          />
        </div>

        {/* Detailed Comparative Stats Table */}
        <ClayCard elevation="lg" className="p-5 sm:p-6 bg-white/90 border-amber-200">
          <h3 className="font-title text-base sm:text-lg text-stone-800 mb-4 text-center">
            Excavation Match Statistics
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="py-2 px-3 text-stone-500 font-bold uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="py-2 px-3 font-title text-blue-700 text-center">
                    Team Mohenjo
                  </th>
                  <th className="py-2 px-3 font-title text-orange-700 text-center">
                    Team Dholavira
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                <tr>
                  <td className="py-2.5 px-3 font-bold">City Construction Stage</td>
                  <td className="py-2.5 px-3 text-center font-bold text-blue-700">
                    Stage {stats.mohenjoCityStage} / 12
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-orange-700">
                    Stage {stats.dholaviraCityStage} / 12
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold">Total Score</td>
                  <td className="py-2.5 px-3 text-center font-bold text-stone-900">
                    {stats.mohenjoScore} pts
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-stone-900">
                    {stats.dholaviraScore} pts
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold">Correct Answers</td>
                  <td className="py-2.5 px-3 text-center">
                    {stats.mohenjoCorrect} questions
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {stats.dholaviraCorrect} questions
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold">Historical Accuracy</td>
                  <td className="py-2.5 px-3 text-center">
                    {stats.mohenjoAccuracy}%
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {stats.dholaviraAccuracy}%
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold">Max Excavation Streak</td>
                  <td className="py-2.5 px-3 text-center">
                    {stats.mohenjoMaxStreak} in a row
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {stats.dholaviraMaxStreak} in a row
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ClayCard>

        {/* Next Steps CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <ClayButton
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-clay-lg"
            icon={<BookOpen className="w-5 h-5" />}
            onClick={onSummary}
          >
            What Did We Discover? (Summary)
          </ClayButton>

          <ClayButton
            variant="neutral"
            size="lg"
            className="w-full sm:w-auto"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={onPlayAgain}
          >
            Play Again
          </ClayButton>
        </div>
      </div>

      <div className="text-xs font-semibold text-stone-400 pt-4">
        Antiquity preserved • Harappan Civilisation Digital Activity
      </div>
    </div>
  );
};
