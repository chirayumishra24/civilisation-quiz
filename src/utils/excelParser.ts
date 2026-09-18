import * as XLSX from 'xlsx';
import { Question, Category, Difficulty, VisualType } from '../types/game';

interface RawRow {
  [key: string]: any;
}

function getFieldValue(row: RawRow, candidates: string[]): any {
  for (const k of Object.keys(row)) {
    const cleanKey = k.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const c of candidates) {
      const cleanCandidate = c.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanKey === cleanCandidate) {
        return row[k];
      }
    }
  }
  return undefined;
}

export function parseExcelQuestions(fileData: ArrayBuffer): Question[] {
  const workbook = XLSX.read(fileData, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json: RawRow[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  const questions: Question[] = [];

  json.forEach((row, index) => {
    const questionText = getFieldValue(row, ['question', 'questions', 'questiontext', 'q', 'title', 'problem']);
    const optA = getFieldValue(row, ['optiona', 'option1', 'a', 'choicea', 'choice1', 'ans1', 'opt1', 'opta']);
    const optB = getFieldValue(row, ['optionb', 'option2', 'b', 'choiceb', 'choice2', 'ans2', 'opt2', 'optb']);
    const optC = getFieldValue(row, ['optionc', 'option3', 'c', 'choicec', 'choice3', 'ans3', 'opt3', 'optc']);
    const optD = getFieldValue(row, ['optiond', 'option4', 'd', 'choiced', 'choice4', 'ans4', 'opt4', 'optd']);

    if (!questionText || !optA || !optB || !optC || !optD) return;

    const options = [
      String(optA).trim(),
      String(optB).trim(),
      String(optC).trim(),
      String(optD).trim(),
    ];

    const rawCorrect = getFieldValue(row, ['correctanswer', 'correctoption', 'answer', 'correct', 'ans', 'rightanswer', 'key']);

    let correct = 0;
    if (rawCorrect !== undefined && rawCorrect !== null && rawCorrect !== '') {
      if (typeof rawCorrect === 'number') {
        correct = rawCorrect >= 1 && rawCorrect <= 4 ? rawCorrect - 1 : (rawCorrect >= 0 && rawCorrect < 4 ? rawCorrect : 0);
      } else {
        const rawStr = String(rawCorrect).trim();
        const upper = rawStr.toUpperCase();
        if (upper === 'A' || upper === '1' || upper === 'OPTION A' || upper === 'OPTION 1') correct = 0;
        else if (upper === 'B' || upper === '2' || upper === 'OPTION B' || upper === 'OPTION 2') correct = 1;
        else if (upper === 'C' || upper === '3' || upper === 'OPTION C' || upper === 'OPTION 3') correct = 2;
        else if (upper === 'D' || upper === '4' || upper === 'OPTION D' || upper === 'OPTION 4') correct = 3;
        else {
          // Check if correct answer matches option text
          const matchIdx = options.findIndex((opt) => opt.toLowerCase() === rawStr.toLowerCase());
          if (matchIdx !== -1) {
            correct = matchIdx;
          }
        }
      }
    }

    const rawDiff = String(getFieldValue(row, ['difficulty', 'level', 'diff']) || 'easy').toLowerCase();
    const difficulty: Difficulty = rawDiff === 'hard' ? 'hard' : rawDiff === 'medium' ? 'medium' : 'easy';

    const rawCat = getFieldValue(row, ['category', 'topic', 'unit', 'theme', 'chapter']);
    const category: Category = (rawCat ? String(rawCat).trim() : 'Harappan Cities') as Category;

    const rawExpl = getFieldValue(row, ['explanation', 'explain', 'fact', 'notes', 'reason', 'solution']);
    const explanation = rawExpl ? String(rawExpl).trim() : 'Archaeological evidence from the Indus Valley excavations.';

    const rawVisual = getFieldValue(row, ['visualtype', 'visual', 'type']);
    const visualType = (rawVisual ? String(rawVisual).trim() : 'none') as VisualType;

    questions.push({
      id: `custom-${Date.now()}-${index}`,
      question: String(questionText).trim(),
      options,
      correctAnswer: correct,
      difficulty,
      category,
      explanation,
      visualType,
    });
  });

  return questions;
}

export function generateSampleExcel(): Uint8Array {
  const sampleData = [
    {
      Question: 'Which material was most commonly used to build houses in Mohenjo-daro?',
      'Option A': 'Baked bricks',
      'Option B': 'Bamboo and thatch',
      'Option C': 'Iron sheets',
      'Option D': 'Marble slabs',
      'Correct Answer': 'A',
      Category: 'Harappan Cities',
      Difficulty: 'easy',
      Explanation: 'Harappans used standardised kiln-baked bricks with a ratio of 1:2:4.',
      'Visual Type': 'settlement',
    },
    {
      Question: 'What special feature was found in the Great Bath at Mohenjo-daro?',
      'Option A': 'Water heated by electric coils',
      'Option B': 'Natural bitumen used as waterproofing',
      'Option C': 'Glass windows',
      'Option D': 'Fountains connected to steam engines',
      'Correct Answer': 'B',
      Category: 'Water Management',
      Difficulty: 'medium',
      Explanation: 'A layer of natural tar (bitumen) was applied between brick layers to prevent water leakage.',
      'Visual Type': 'artifact',
    },
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Questions');
  return XLSX.write(wb, { type: 'array', bookType: 'xlsx' }) as Uint8Array;
}
