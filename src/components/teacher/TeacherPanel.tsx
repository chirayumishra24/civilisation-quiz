import React, { useState } from 'react';
import { ClayCard } from '../ui/ClayCard';
import { ClayButton } from '../ui/ClayButton';
import { UploadZone } from './UploadZone';
import { QuestionPreview } from './QuestionPreview';
import { QUESTIONS_BANK } from '../../data/questions';
import { Question, Category, Difficulty } from '../../types/game';
import { saveQuestionSet, generateGameCode, setStoredActiveQuestions } from '../../utils/questionStorage';
import {
  ArrowLeft,
  KeyRound,
  Copy,
  Check,
  PlusCircle,
  RotateCcw,
  Download,
  Share2,
  Play,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface TeacherPanelProps {
  initialQuestions?: Question[];
  onBack: () => void;
  onUpdateQuestions?: (questions: Question[]) => void;
  onLaunchGame?: (questions: Question[]) => void;
}

export const TeacherPanel: React.FC<TeacherPanelProps> = ({
  initialQuestions,
  onBack,
  onUpdateQuestions,
  onLaunchGame,
}) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions || QUESTIONS_BANK);
  const [isSheetUploaded, setIsSheetUploaded] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [activeCode, setActiveCode] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Single Question Add state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptA, setNewOptA] = useState('');
  const [newOptB, setNewOptB] = useState('');
  const [newOptC, setNewOptC] = useState('');
  const [newOptD, setNewOptD] = useState('');
  const [newCorrect, setNewCorrect] = useState(0);
  const [newCategory, setNewCategory] = useState<Category>('Harappan Cities');
  const [newDifficulty, setNewDifficulty] = useState<Difficulty>('easy');
  const [newExplanation, setNewExplanation] = useState('');

  const handleSheetLoaded = (newBatch: Question[], fileName: string) => {
    setQuestions(newBatch);
    setIsSheetUploaded(true);
    setUploadedFileName(fileName);
    setActiveCode(''); // Reset code so teacher generates a fresh code for this sheet
    setStoredActiveQuestions(newBatch);
    onUpdateQuestions?.(newBatch);
  };

  const handleGenerateCode = async () => {
    if (!isSheetUploaded && questions.length === 0) return;
    setIsSaving(true);
    const code = generateGameCode();
    await saveQuestionSet(code, questions);
    setStoredActiveQuestions(questions);
    onUpdateQuestions?.(questions);
    setActiveCode(code);
    setIsSaving(false);
  };

  const handleCopyCode = () => {
    if (!activeCode) return;
    navigator.clipboard.writeText(activeCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => {
      const updated = prev.filter((q) => q.id !== id);
      setStoredActiveQuestions(updated);
      onUpdateQuestions?.(updated);
      return updated;
    });
  };

  const handleResetDefault = () => {
    setQuestions(QUESTIONS_BANK);
    setIsSheetUploaded(false);
    setUploadedFileName('');
    setActiveCode('');
    setStoredActiveQuestions(QUESTIONS_BANK);
    onUpdateQuestions?.(QUESTIONS_BANK);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `harappan_questions_${Date.now()}.json`;
    a.click();
  };

  const handleAddManualQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newOptA || !newOptB || !newOptC || !newOptD) return;

    const created: Question = {
      id: `manual-${Date.now()}`,
      question: newQuestion.trim(),
      options: [newOptA.trim(), newOptB.trim(), newOptC.trim(), newOptD.trim()],
      correctAnswer: newCorrect,
      category: newCategory,
      difficulty: newDifficulty,
      explanation: newExplanation.trim() || 'Archaeological evidence from Harappan excavations.',
    };

    const updated = [created, ...questions];
    setQuestions(updated);
    setStoredActiveQuestions(updated);
    onUpdateQuestions?.(updated);
    setNewQuestion('');
    setNewOptA('');
    setNewOptB('');
    setNewOptC('');
    setNewOptD('');
    setNewExplanation('');
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-8 bg-gradient-to-b from-[#FFFDF5] via-[#FFF8E7] to-[#F5E6D3]">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onUpdateQuestions?.(questions);
                onBack();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/80 hover:bg-white text-stone-700 text-xs font-bold border border-stone-200 shadow-clay-sm transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Game</span>
            </button>

            <ClayButton
              variant="primary"
              size="sm"
              icon={<Play className="w-3.5 h-3.5 fill-white" />}
              onClick={() => (onLaunchGame ? onLaunchGame(questions) : onBack())}
            >
              Play with These Questions Now
            </ClayButton>
          </div>

          <div className="text-right">
            <h2 className="font-title text-xl sm:text-2xl text-stone-900 leading-tight">
              Teacher Dashboard
            </h2>
            <p className="text-[11px] font-bold text-amber-800">
              {questions.length} Questions {isSheetUploaded ? `(from ${uploadedFileName})` : 'Loaded'}
            </p>
          </div>
        </div>

        {/* STEP 1: Upload Excel / JSON Sheet */}
        <ClayCard elevation="md" className="p-6 bg-white/95 border-amber-300">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Step 1: Upload Sheet
              </span>
              <h3 className="font-title text-base sm:text-lg text-stone-900 mt-1">
                Upload Questions Spreadsheet (.xlsx, .xls, .json)
              </h3>
            </div>
            {isSheetUploaded && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Uploaded: {uploadedFileName}</span>
              </span>
            )}
          </div>
          <UploadZone onQuestionsLoaded={handleSheetLoaded} />
        </ClayCard>

        {/* STEP 2: Generate Game Code for Students (Unlocked ONLY after sheet upload) */}
        <ClayCard
          elevation="md"
          className={`p-6 border-2 transition-all ${
            isSheetUploaded
              ? 'bg-white/95 border-emerald-400 ring-2 ring-emerald-100 shadow-clay'
              : 'bg-stone-50/75 border-stone-200 opacity-70'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    isSheetUploaded
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {isSheetUploaded ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Step 2: Unlocked — Ready to Generate Code</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 text-stone-500" />
                      <span>Step 2: Locked (Upload Sheet in Step 1 First)</span>
                    </>
                  )}
                </span>
              </div>
              <h3 className="font-title text-base sm:text-lg text-stone-900">
                Generate Student Game Code
              </h3>
              <p className="text-xs text-stone-600 max-w-md">
                {isSheetUploaded
                  ? `Generate a 6-digit session code linked to your ${questions.length} questions from ${uploadedFileName}. Students can enter this code to play your test.`
                  : 'Please upload an Excel spreadsheet in Step 1 above. The student game code will only be generated for your uploaded sheet.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {activeCode ? (
                <div className="flex items-center gap-2 p-2 rounded-2xl bg-amber-100 border-2 border-amber-300 shadow-clay-inset">
                  <KeyRound className="w-5 h-5 text-amber-700 ml-2" />
                  <span className="font-title text-2xl tracking-widest text-amber-950 px-2">
                    {activeCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 shadow-sm transition-all active:scale-90"
                    title="Copy Code"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-stone-600" />
                    )}
                  </button>
                </div>
              ) : (
                <ClayButton
                  variant={isSheetUploaded ? 'primary' : 'neutral'}
                  size="md"
                  onClick={handleGenerateCode}
                  disabled={!isSheetUploaded || isSaving}
                >
                  {isSaving
                    ? 'Generating...'
                    : isSheetUploaded
                    ? 'Generate Game Code'
                    : 'Upload Sheet First'}
                </ClayButton>
              )}
            </div>
          </div>
        </ClayCard>

        {/* Question Bank Preview & Management */}
        <ClayCard elevation="md" className="p-6 bg-white/95 border-amber-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-title text-base sm:text-lg text-stone-900">
                Active Question Bank ({questions.length} Questions)
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Questions will be automatically balanced across Team Mohenjo and Team Dholavira.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Cancel Add' : 'Add Question'}</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold shadow-sm active:scale-95 transition-all border border-stone-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={handleResetDefault}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold shadow-sm active:scale-95 transition-all border border-stone-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Add Question Form Accordion */}
          {showAddForm && (
            <form
              onSubmit={handleAddManualQuestion}
              className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-3 animate-slide-down text-xs"
            >
              <h4 className="font-title text-sm text-stone-900">Add New History Question</h4>

              <div>
                <label className="font-bold text-stone-700">Question Text</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Which Harappan site had 16 large stone water reservoirs?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl bg-white border border-stone-200 font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700">Option A</label>
                  <input
                    type="text"
                    required
                    value={newOptA}
                    onChange={(e) => setNewOptA(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl bg-white border border-stone-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700">Option B</label>
                  <input
                    type="text"
                    required
                    value={newOptB}
                    onChange={(e) => setNewOptB(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl bg-white border border-stone-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700">Option C</label>
                  <input
                    type="text"
                    required
                    value={newOptC}
                    onChange={(e) => setNewOptC(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl bg-white border border-stone-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700">Option D</label>
                  <input
                    type="text"
                    required
                    value={newOptD}
                    onChange={(e) => setNewOptD(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl bg-white border border-stone-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-stone-700">Correct Option</label>
                  <select
                    value={newCorrect}
                    onChange={(e) => setNewCorrect(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-xl bg-white border border-stone-200 font-semibold"
                  >
                    <option value={0}>Option A</option>
                    <option value={1}>Option B</option>
                    <option value={2}>Option C</option>
                    <option value={3}>Option D</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Category)}
                    className="w-full mt-1 p-2 rounded-xl bg-white border border-stone-200 font-semibold"
                  >
                    <option value="Early Settlements">Early Settlements</option>
                    <option value="Harappan Cities">Harappan Cities</option>
                    <option value="Water Management">Water Management</option>
                    <option value="Drainage">Drainage</option>
                    <option value="Food & Farming">Food & Farming</option>
                    <option value="Crafts">Crafts</option>
                    <option value="Trade">Trade</option>
                    <option value="Seals">Seals</option>
                    <option value="Script">Script</option>
                    <option value="Archaeological Evidence">Archaeological Evidence</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as Difficulty)}
                    className="w-full mt-1 p-2 rounded-xl bg-white border border-stone-200 font-semibold"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700">Historical Explanation / Fact</label>
                <input
                  type="text"
                  placeholder="Archaeological context shown when students answer..."
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl bg-white border border-stone-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl bg-stone-200 text-stone-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold shadow-sm"
                >
                  Save Question
                </button>
              </div>
            </form>
          )}

          {/* Interactive Preview Table */}
          <QuestionPreview
            questions={questions}
            onDeleteQuestion={handleDeleteQuestion}
          />
        </ClayCard>
      </div>
    </div>
  );
};
