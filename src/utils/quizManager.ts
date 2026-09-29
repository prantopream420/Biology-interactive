import { EXPANDED_QUIZ_POOL } from '../data/expandedQuizBank';
import { QuizQuestion } from '../types';

const STORAGE_KEY_QUESTIONS = 'ct_drill_active_20_questions';
const STORAGE_KEY_TIMESTAMP = 'ct_drill_session_timestamp';
const REGENERATE_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes in milliseconds

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Selects 20 randomized questions ensuring balanced coverage across all 11 topics
 */
export function generateRandom20Questions(): QuizQuestion[] {
  // Group by topic
  const grouped = new Map<string, QuizQuestion[]>();
  EXPANDED_QUIZ_POOL.forEach((q) => {
    const list = grouped.get(q.topicId) || [];
    list.push(q);
    grouped.set(q.topicId, list);
  });

  const selected: QuizQuestion[] = [];
  const allShuffled: QuizQuestion[] = [];

  // Pick at least 1-2 from every topic first to guarantee complete CT syllabus coverage
  grouped.forEach((questions) => {
    const shuffled = shuffleArray(questions);
    if (shuffled.length > 0) {
      selected.push(shuffled[0]);
    }
    if (shuffled.length > 1) {
      allShuffled.push(...shuffled.slice(1));
    }
  });

  // Fill up the rest until we reach exactly 20 questions
  const remainingNeeded = 20 - selected.length;
  const shuffledRemainder = shuffleArray(allShuffled);
  selected.push(...shuffledRemainder.slice(0, remainingNeeded));

  // If still less than 20 (safety fallback), fill from whole pool
  if (selected.length < 20) {
    const usedIds = new Set(selected.map((q) => q.id));
    const unused = EXPANDED_QUIZ_POOL.filter((q) => !usedIds.has(q.id));
    selected.push(...shuffleArray(unused).slice(0, 20 - selected.length));
  }

  return shuffleArray(selected).slice(0, 20);
}

/**
 * Loads current 20 questions or generates a new set if:
 * 1. User freshly opened the app (sessionStorage is empty or app was closed)
 * 2. 30 minutes have elapsed since last generation
 */
export function getOrRegenerate20Questions(forceRegenerate: boolean = false): {
  questions: QuizQuestion[];
  generatedAt: number;
  timeRemainingMs: number;
} {
  const now = Date.now();
  let storedQuestionsJson: string | null = null;
  let storedTimeStr: string | null = null;

  try {
    // sessionStorage automatically clears when user closes the app/browser session
    storedQuestionsJson = sessionStorage.getItem(STORAGE_KEY_QUESTIONS);
    storedTimeStr = sessionStorage.getItem(STORAGE_KEY_TIMESTAMP);
  } catch {}

  const lastGenTime = storedTimeStr ? parseInt(storedTimeStr, 10) : 0;
  const isExpired = !lastGenTime || now - lastGenTime >= REGENERATE_INTERVAL_MS;

  if (forceRegenerate || isExpired || !storedQuestionsJson) {
    const fresh20 = generateRandom20Questions();
    try {
      sessionStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(fresh20));
      sessionStorage.setItem(STORAGE_KEY_TIMESTAMP, now.toString());
    } catch {}

    return {
      questions: fresh20,
      generatedAt: now,
      timeRemainingMs: REGENERATE_INTERVAL_MS,
    };
  }

  // Load existing session set
  try {
    const existing = JSON.parse(storedQuestionsJson) as QuizQuestion[];
    const timeRemaining = Math.max(0, REGENERATE_INTERVAL_MS - (now - lastGenTime));
    return {
      questions: existing,
      generatedAt: lastGenTime,
      timeRemainingMs: timeRemaining,
    };
  } catch {
    const fresh20 = generateRandom20Questions();
    return {
      questions: fresh20,
      generatedAt: now,
      timeRemainingMs: REGENERATE_INTERVAL_MS,
    };
  }
}
