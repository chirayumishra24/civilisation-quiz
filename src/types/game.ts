/* ── Difficulty ── */
export type Difficulty = 'easy' | 'medium' | 'hard';

/* ── Question categories ── */
export type Category =
  | 'Early Settlements'
  | 'Harappan Cities'
  | 'Water Management'
  | 'Drainage'
  | 'Food & Farming'
  | 'Crafts'
  | 'Trade'
  | 'Seals'
  | 'Script'
  | 'Archaeological Evidence';

/* ── Visual question type ── */
export type VisualType =
  | 'none'
  | 'artifact'
  | 'drainage'
  | 'well'
  | 'seal'
  | 'weights'
  | 'city_planning'
  | 'settlement';

/* ── Question interface ── */
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  difficulty: Difficulty;
  category: Category;
  explanation: string;
  image?: string;
  visualType?: VisualType;
}

/* ── Teams ── */
export type TeamId = 'mohenjo' | 'dholavira';

export interface TeamInfo {
  id: TeamId;
  name: string;
  motto: string;
  primaryColor: string;
  secondaryColor: string;
}

export const TEAM_MOHENJO: TeamInfo = {
  id: 'mohenjo',
  name: 'Team Mohenjo',
  motto: 'Plan · Build · Discover',
  primaryColor: '#3B82F6',
  secondaryColor: '#DBEAFE',
};

export const TEAM_DHOLAVIRA: TeamInfo = {
  id: 'dholavira',
  name: 'Team Dholavira',
  motto: 'Explore · Trade · Thrive',
  primaryColor: '#F97316',
  secondaryColor: '#FFEDD5',
};

/* ── Team state ── */
export interface TeamState {
  score: number;
  correctAnswers: number;
  totalAnswered: number;
  streak: number;
  maxStreak: number;
  cityStage: number; // 0-12
  lensUses: number;  // max 2
  fiftyFiftyUses: number; // max 1
}

export const initialTeamState: TeamState = {
  score: 0,
  correctAnswers: 0,
  totalAnswered: 0,
  streak: 0,
  maxStreak: 0,
  cityStage: 0,
  lensUses: 2,
  fiftyFiftyUses: 1,
};

/* ── City stages ── */
export const CITY_STAGES = [
  { id: 1, name: 'Settlement', description: 'A small settlement of mud-brick houses appears.' },
  { id: 2, name: 'Planned Houses', description: 'Organised brick houses with courtyards are built.' },
  { id: 3, name: 'Streets', description: 'A planned grid of streets connects the houses.' },
  { id: 4, name: 'Wells', description: 'Brick-lined wells provide water to the settlement.' },
  { id: 5, name: 'Drainage', description: 'Covered drains manage wastewater systematically.' },
  { id: 6, name: 'Public Structures', description: 'Elevated platforms and public buildings appear.' },
  { id: 7, name: 'Food & Farming', description: 'Fields and grain storage support the settlement.' },
  { id: 8, name: 'Craft Production', description: 'Workshops for pottery, beads, and metalworking appear.' },
  { id: 9, name: 'Trade', description: 'Standardised weights and storage areas appear.' },
  { id: 10, name: 'Seals & Writing', description: 'Seals with animal motifs and undeciphered script appear.' },
  { id: 11, name: 'Expanded Settlement', description: 'The settlement grows with outer walls and more houses.' },
  { id: 12, name: 'Complete Civilisation', description: 'A thriving Harappan civilisation is complete!' },
] as const;

export const MAX_CITY_STAGES = 12;
export const TOTAL_ROUNDS = 12;
export const STREAK_THRESHOLD = 3;
export const GAME_DURATION_SECONDS = 300; // 5 minutes
export const RUSH_THRESHOLD_SECONDS = 60; // last 1 min

/* ── Screen state ── */
export type ScreenState = 'start' | 'teamSelect' | 'instructions' | 'game' | 'victory' | 'summary';

/* ── Round status ── */
export type RoundStatus = 'answering' | 'evaluating' | 'completed';

/* ── Evaluation ── */
export interface RoundEvaluation {
  mohenjoCorrect: boolean;
  dholaviraCorrect: boolean;
  mohenjoStagesAdded: number;
  dholaviraStagesAdded: number;
  mohenjoMessage: string;
  dholaviraMessage: string;
  mohenjoBonusStreak: boolean;
  dholaviraBonusStreak: boolean;
}

/* ── Winner ── */
export type WinnerType = 'mohenjo' | 'dholavira' | 'tie' | null;

/* ── Feedback ── */
export interface FeedbackState {
  type: 'correct' | 'incorrect' | 'timeout';
  team: TeamId;
  stagesAdded: number;
  message: string;
  stageName?: string;
}

/* ── Game stats ── */
export interface GameStats {
  mohenjoScore: number;
  dholaviraScore: number;
  mohenjoCorrect: number;
  dholaviraCorrect: number;
  mohenjoAccuracy: number;
  dholaviraAccuracy: number;
  mohenjoMaxStreak: number;
  dholaviraMaxStreak: number;
  mohenjoCityStage: number;
  dholaviraCityStage: number;
  totalRoundsPlayed: number;
}

/* ── Question Set (for Firebase game codes) ── */
export interface QuestionSet {
  code: string;
  teamAQuestions: Question[];
  teamBQuestions: Question[];
  createdAt: number;
  createdBy?: string;
  totalQuestions: number;
}
