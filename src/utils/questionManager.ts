import { Question } from '../types/game';

export function shuffleQuestionOptions(q: Question): Question {
  const correctText = q.options[q.correctAnswer];
  const shuffledOptions = [...q.options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }
  const newCorrectIndex = shuffledOptions.indexOf(correctText);
  return {
    ...q,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex !== -1 ? newCorrectIndex : 0,
  };
}

export class QuestionManager {
  private questions: Question[];
  private usedIds: Set<string> = new Set();
  private currentIndex = 0;

  constructor(questions: Question[]) {
    this.questions = this.shuffle([...questions]);
  }

  private shuffle(arr: Question[]): Question[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getNextQuestion(): Question | null {
    if (this.currentIndex >= this.questions.length) {
      // Reshuffle and restart
      this.questions = this.shuffle(this.questions);
      this.currentIndex = 0;
      this.usedIds.clear();
    }
    const q = this.questions[this.currentIndex];
    this.currentIndex++;
    this.usedIds.add(q.id);
    return shuffleQuestionOptions(q);
  }

  reset(): void {
    this.questions = this.shuffle(this.questions);
    this.currentIndex = 0;
    this.usedIds.clear();
  }

  getUsedCount(): number {
    return this.usedIds.size;
  }
}

/**
 * Split questions into two roughly equal sets for the two teams.
 * Ensures both teams get questions from each category.
 */
export function splitQuestionsForTeams(
  allQuestions: Question[]
): { teamA: Question[]; teamB: Question[] } {
  // Group by category
  const byCategory = new Map<string, Question[]>();
  for (const q of allQuestions) {
    const list = byCategory.get(q.category) || [];
    list.push(q);
    byCategory.set(q.category, list);
  }

  const teamA: Question[] = [];
  const teamB: Question[] = [];

  // Alternate questions from each category
  for (const [, questions] of byCategory) {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    shuffled.forEach((q, i) => {
      if (i % 2 === 0) teamA.push(q);
      else teamB.push(q);
    });
  }

  return { teamA, teamB };
}
