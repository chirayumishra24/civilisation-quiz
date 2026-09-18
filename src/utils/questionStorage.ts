import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Question, QuestionSet } from '../types/game';
import { splitQuestionsForTeams } from './questionManager';

const LOCAL_STORAGE_KEY_PREFIX = 'civilisation_set_';
const ACTIVE_QUESTIONS_KEY = 'civilisation_active_questions';

export function getStoredActiveQuestions(): Question[] | null {
  try {
    const data = localStorage.getItem(ACTIVE_QUESTIONS_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return null;
}

export function setStoredActiveQuestions(questions: Question[]): void {
  try {
    localStorage.setItem(ACTIVE_QUESTIONS_KEY, JSON.stringify(questions));
  } catch {}
}

export async function saveQuestionSet(
  code: string,
  questions: Question[],
  createdBy = 'Teacher'
): Promise<string> {
  const normalizedCode = code.toUpperCase().trim();
  const { teamA, teamB } = splitQuestionsForTeams(questions);

  const payload: QuestionSet = {
    code: normalizedCode,
    teamAQuestions: teamA,
    teamBQuestions: teamB,
    createdAt: Date.now(),
    createdBy,
    totalQuestions: questions.length,
  };

  // 1. Instant LocalStorage save (primary storage for classroom)
  try {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${normalizedCode}`, JSON.stringify(payload));
  } catch (e) {
    console.warn('LocalStorage save failed', e);
  }

  // 2. Non-blocking cloud sync in background (fire-and-forget, never block UI)
  try {
    const ref = doc(db, 'gameCodes', normalizedCode);
    Promise.race([
      setDoc(ref, payload),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1500)),
    ]).catch((err) => {
      // Cloud sync failed or timed out, local storage remains intact
    });
  } catch {
    // Ignore cloud errors
  }

  return normalizedCode;
}

export async function loadQuestionSet(code: string): Promise<QuestionSet | null> {
  const normalizedCode = code.toUpperCase().trim();

  // 1. Check LocalStorage first for instant speed
  try {
    const local = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${normalizedCode}`);
    if (local) {
      return JSON.parse(local) as QuestionSet;
    }
  } catch (e) {
    console.warn('LocalStorage load error', e);
  }

  // 2. Check Firestore with 1.5s timeout
  try {
    const ref = doc(db, 'gameCodes', normalizedCode);
    const snap = await Promise.race([
      getDoc(ref),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500)),
    ]);
    if (snap && 'exists' in snap && snap.exists()) {
      return snap.data() as QuestionSet;
    }
  } catch (e) {
    console.warn('Firestore load error', e);
  }

  return null;
}

export function generateGameCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
