import * as XLSX from 'xlsx';
import { Question, Category, Difficulty, VisualType } from '../types/game';

interface RawRow {
  [key: string]: any;
}

export function parseExcelQuestions(fileData: ArrayBuffer): Question[] {
  const workbook = XLSX.read(fileData, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json: RawRow[] = XLSX.utils.sheet_to_json(worksheet);

  const questions: Question[] = [];

  json.forEach((row, index) => {
    const questionText = row['Question'] || row['question'] || row['QUESTION'];
    const optA = row['Option A'] || row['optionA'] || row['A'] || row['Option 1'];
    const optB = row['Option B'] || row['optionB'] || row['B'] || row['Option 2'];
    const optC = row['Option C'] || row['optionC'] || row['C'] || row['Option 3'];
    const optD = row['Option D'] || row['optionD'] || row['D'] || row['Option 4'];

    if (!questionText || !optA || !optB || !optC || !optD) return;

    let correct = 0;
    const rawCorrect = row['Correct Answer'] || row['correctAnswer'] || row['Answer'] || row['correct'];
    if (typeof rawCorrect === 'string') {
      const upper = rawCorrect.trim().toUpperCase();
      if (upper === 'A' || upper === '1') correct = 0;
      else if (upper === 'B' || upper === '2') correct = 1;
      else if (upper === 'C' || upper === '3') correct = 2;
      else if (upper === 'D' || upper === '4') correct = 3;
    } else if (typeof rawCorrect === 'number') {
      correct = rawCorrect >= 1 && rawCorrect <= 4 ? rawCorrect - 1 : rawCorrect;
    }

    const rawDiff = (row['Difficulty'] || row['difficulty'] || 'easy').toLowerCase();
    const difficulty: Difficulty = rawDiff === 'hard' ? 'hard' : rawDiff === 'medium' ? 'medium' : 'easy';

    const category: Category = (row['Category'] || row['category'] || 'Harappan Cities') as Category;
    const explanation = row['Explanation'] || row['explanation'] || 'Archaeological evidence from the Indus Valley.';
    const visualType = (row['Visual Type'] || row['visualType'] || 'none') as VisualType;

    questions.push({
      id: `custom-${Date.now()}-${index}`,
      question: String(questionText).trim(),
      options: [String(optA).trim(), String(optB).trim(), String(optC).trim(), String(optD).trim()],
      correctAnswer: correct,
      difficulty,
      category,
      explanation: String(explanation).trim(),
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
