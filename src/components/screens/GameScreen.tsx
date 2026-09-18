import React from 'react';
import { TopBar } from '../ui/TopBar';
import { CivilisationRushBanner } from '../ui/CivilisationRushBanner';
import { TeamPanel } from '../ui/TeamPanel';
import { HarappanWorld } from '../3d/HarappanWorld';
import { StageTimeline } from '../ui/StageTimeline';
import { FeedbackOverlay } from '../ui/FeedbackOverlay';
import { StreakBanner } from '../ui/StreakBanner';
import { useGame } from '../../hooks/useGame';

type GameScreenProps = ReturnType<typeof useGame>;

export const GameScreen: React.FC<GameScreenProps> = ({
  round,
  timer,
  mohenjoState,
  dholaviraState,
  mohenjoQuestion,
  dholaviraQuestion,
  mohenjoSelected,
  dholaviraSelected,
  mohenjoSubmitted,
  dholaviraSubmitted,
  mohenjoEliminated,
  dholaviraEliminated,
  mohenjoHint,
  dholaviraHint,
  evaluation,
  isStreakBanner,
  streakTeam,
  selectOption,
  submitAnswer,
  useArchaeologistLens,
  useFiftyFifty,
  setScreen,
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#FFFDF5] via-[#FFF8E7] to-[#F5E6D3] select-none">
      {/* Top Bar Header */}
      <TopBar
        round={round}
        timeLeft={timer.timeLeft}
        isRush={timer.isRush}
        formatTime={timer.formatTime}
        onHomeClick={() => setScreen('start')}
      />

      {/* Civilisation Rush Banner (Active in final 60s) */}
      <CivilisationRushBanner isRush={timer.isRush} />

      {/* Main 3-Column Arena */}
      <main className="flex-1 w-full max-w-[1700px] mx-auto p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
        {/* Team Mohenjo Panel (Left 3 cols) */}
        <section className="lg:col-span-3 h-full flex flex-col order-2 lg:order-1">
          <TeamPanel
            team="mohenjo"
            teamState={mohenjoState}
            question={mohenjoQuestion}
            selectedOption={mohenjoSelected}
            isSubmitted={mohenjoSubmitted}
            eliminatedOptions={mohenjoEliminated}
            hint={mohenjoHint}
            onSelectOption={(idx) => selectOption('mohenjo', idx)}
            onSubmit={() => submitAnswer('mohenjo')}
            onUseLens={() => useArchaeologistLens('mohenjo')}
            onUseFiftyFifty={() => useFiftyFifty('mohenjo')}
          />
        </section>

        {/* 3D Harappan World Canvas (Center 6 cols) */}
        <section className="lg:col-span-6 h-[400px] lg:h-auto min-h-[420px] flex flex-col order-1 lg:order-2">
          <HarappanWorld
            mohenjoStage={mohenjoState.cityStage}
            dholaviraStage={dholaviraState.cityStage}
          />
        </section>

        {/* Team Dholavira Panel (Right 3 cols) */}
        <section className="lg:col-span-3 h-full flex flex-col order-3 lg:order-3">
          <TeamPanel
            team="dholavira"
            teamState={dholaviraState}
            question={dholaviraQuestion}
            selectedOption={dholaviraSelected}
            isSubmitted={dholaviraSubmitted}
            eliminatedOptions={dholaviraEliminated}
            hint={dholaviraHint}
            onSelectOption={(idx) => selectOption('dholavira', idx)}
            onSubmit={() => submitAnswer('dholavira')}
            onUseLens={() => useArchaeologistLens('dholavira')}
            onUseFiftyFifty={() => useFiftyFifty('dholavira')}
          />
        </section>
      </main>

      {/* Bottom Timeline */}
      <footer className="w-full max-w-[1700px] mx-auto px-3 sm:px-4 pb-3">
        <StageTimeline
          mohenjoStage={mohenjoState.cityStage}
          dholaviraStage={dholaviraState.cityStage}
        />
      </footer>

      {/* Feedback Overlay Between Rounds */}
      <FeedbackOverlay
        evaluation={evaluation}
        mohenjoQuestion={mohenjoQuestion}
        dholaviraQuestion={dholaviraQuestion}
      />

      {/* Streak Celebration Banner */}
      <StreakBanner team={streakTeam} />
    </div>
  );
};
