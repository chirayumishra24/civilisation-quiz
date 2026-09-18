import * as XLSX from 'xlsx';

export interface SampleQuestionRow {
  Question: string;
  'Option A': string;
  'Option B': string;
  'Option C': string;
  'Option D': string;
  'Correct Option': string;
  Category: string;
  Difficulty: string;
  Explanation: string;
}

export const SAMPLE_EXCEL_QUESTIONS: SampleQuestionRow[] = [
  {
    Question: 'Which material was most commonly used to build houses and city walls in Mohenjo-daro?',
    'Option A': 'Baked bricks',
    'Option B': 'Bamboo and palm leaves',
    'Option C': 'Cut marble and granite',
    'Option D': 'Sun-dried animal skins',
    'Correct Option': 'A',
    Category: 'Harappan Cities',
    Difficulty: 'easy',
    Explanation: 'Harappans manufactured standardized baked bricks with uniform dimensions (ratio 1:2:4) for supreme durability.',
  },
  {
    Question: 'What special natural material was applied to waterproof the Great Bath at Mohenjo-daro?',
    'Option A': 'Natural bitumen (tar)',
    'Option B': 'Melted copper sheets',
    'Option C': 'Beeswax and tree resin',
    'Option D': 'Animal fat and lime',
    'Correct Option': 'A',
    Category: 'Water Management',
    Difficulty: 'medium',
    Explanation: 'A layer of natural bitumen (tar) was applied over mortar and bricks to prevent water leakage in the Great Bath.',
  },
  {
    Question: 'How was the Harappan urban wastewater system designed along streets?',
    'Option A': 'Covered brick drains with inspection cleaning holes',
    'Option B': 'Open wooden aqueducts above street level',
    'Option C': 'Large roadside ditches without covers',
    'Option D': 'Water was left to flow freely across pathways',
    'Correct Option': 'A',
    Category: 'Drainage',
    Difficulty: 'easy',
    Explanation: 'Every house was connected to covered street drains featuring inspection traps for periodic cleaning.',
  },
  {
    Question: 'What material were the famous animal-engraved Harappan seals primarily carved from?',
    'Option A': 'Steatite (soapstone)',
    'Option B': 'Solid cast gold',
    'Option C': 'Polished glass',
    'Option D': 'Carved teak wood',
    'Correct Option': 'A',
    Category: 'Seals',
    Difficulty: 'medium',
    Explanation: 'Steatite is a soft talc stone that was easily carved with animal motifs and Harappan script, then fired to harden.',
  },
  {
    Question: 'Which ancient port city possessed a massive stone-lined tidal dockyard for maritime sea trade?',
    'Option A': 'Lothal',
    'Option B': 'Kalibangan',
    'Option C': 'Banawali',
    'Option D': 'Mehrgarh',
    'Correct Option': 'A',
    Category: 'Trade',
    Difficulty: 'easy',
    Explanation: 'Lothal in Gujarat features a massive brick tidal dockyard connected to the Gulf of Khambhat for seafaring ships.',
  },
  {
    Question: 'What unique feature was discovered at the citadel gateway of Dholavira?',
    'Option A': 'A large ten-symbol inscription signboard made of white gypsum',
    'Option B': 'A pair of golden elephant statues',
    'Option C': 'An iron blast furnace',
    'Option D': 'A royal palace throne hall',
    'Correct Option': 'A',
    Category: 'Archaeological Evidence',
    Difficulty: 'hard',
    Explanation: 'Dholavira revealed one of the oldest signboards in the world, with 10 large Indus symbols inlaid in white gypsum stone.',
  },
];

export function downloadSampleExcelTemplate(): void {
  // 1. Create a new workbook
  const wb = XLSX.utils.book_new();

  // 2. Convert sample rows to a worksheet
  const ws = XLSX.utils.json_to_sheet(SAMPLE_EXCEL_QUESTIONS);

  // 3. Set custom column widths for easy viewing in Excel
  ws['!cols'] = [
    { wch: 45 }, // Question
    { wch: 25 }, // Option A
    { wch: 25 }, // Option B
    { wch: 25 }, // Option C
    { wch: 25 }, // Option D
    { wch: 16 }, // Correct Option
    { wch: 22 }, // Category
    { wch: 14 }, // Difficulty
    { wch: 45 }, // Explanation
  ];

  // 4. Append sheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Questions');

  // 5. Trigger download
  XLSX.writeFile(wb, 'Harappan_Civilisation_Question_Template.xlsx');
}
