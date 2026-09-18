import { useState, useCallback } from 'react';
import { TeamId, CITY_STAGES, MAX_CITY_STAGES } from '../types/game';

export interface StageInfo {
  id: number;
  name: string;
  description: string;
}

export function useCityProgress() {
  const [mohenjoStage, setMohenjoStage] = useState<number>(0);
  const [dholaviraStage, setDholaviraStage] = useState<number>(0);
  const [lastBuiltTeam, setLastBuiltTeam] = useState<TeamId | null>(null);

  const getStageInfo = useCallback((stage: number): StageInfo | null => {
    if (stage <= 0) return null;
    const s = CITY_STAGES.find((item) => item.id === Math.min(stage, MAX_CITY_STAGES));
    return s || null;
  }, []);

  const advanceStage = useCallback((team: TeamId, amount: number = 1): number => {
    let newStage = 0;
    if (team === 'mohenjo') {
      setMohenjoStage((prev) => {
        newStage = Math.min(MAX_CITY_STAGES, prev + amount);
        return newStage;
      });
    } else {
      setDholaviraStage((prev) => {
        newStage = Math.min(MAX_CITY_STAGES, prev + amount);
        return newStage;
      });
    }
    setLastBuiltTeam(team);
    return newStage;
  }, []);

  const resetStages = useCallback(() => {
    setMohenjoStage(0);
    setDholaviraStage(0);
    setLastBuiltTeam(null);
  }, []);

  const isComplete = useCallback((team: TeamId): boolean => {
    const stage = team === 'mohenjo' ? mohenjoStage : dholaviraStage;
    return stage >= MAX_CITY_STAGES;
  }, [mohenjoStage, dholaviraStage]);

  return {
    mohenjoStage,
    dholaviraStage,
    lastBuiltTeam,
    getStageInfo,
    advanceStage,
    resetStages,
    isComplete,
  };
}
