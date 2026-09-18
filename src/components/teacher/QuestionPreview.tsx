import React, { useState } from 'react';
import { Question } from '../../types/game';
import {
  Search,
  Trash2,
  Eye,
  X,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  Sparkles,
} from 'lucide-react';
import { ClayCard } from '../ui/ClayCard';

interface QuestionPreviewProps {
  questions: Question[];
  onDeleteQuestion: (id: string) => void;
}

export const QuestionPreview: React.FC<QuestionPreviewProps> = ({
  questions,
  onDeleteQuestion,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [previewModalQuestion, setPreviewModalQuestion] = useState<Question | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const categories = Array.from(new Set(questions.map((q) => q.category)));

  const filtered = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || q.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const optionPrefixes = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-4">
      {/* Top Filter and View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search questions, keywords, or explanations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-400 shadow-sm"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 focus:outline-none focus:border-amber-400 shadow-sm"
          >
            <option value="all">All Categories ({questions.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* View Switcher: Table vs Cards */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 self-end sm:self-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'table'
                ? 'bg-white text-stone-800 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'cards'
                ? 'bg-white text-stone-800 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Card Preview</span>
          </button>
        </div>
      </div>

      {/* ─── MODE 1: TABLE VIEW WITH EXPANDABLE DETAILS & PREVIEW BUTTON ─── */}
      {viewMode === 'table' ? (
        <div className="max-h-[500px] overflow-y-auto rounded-2xl border-2 border-stone-200 bg-white/95 shadow-clay-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 sticky top-0 z-10">
              <tr>
                <th className="py-2.5 px-3 font-bold text-stone-600">#</th>
                <th className="py-2.5 px-3 font-bold text-stone-600">Question</th>
                <th className="py-2.5 px-3 font-bold text-stone-600">Category</th>
                <th className="py-2.5 px-3 font-bold text-stone-600">Difficulty</th>
                <th className="py-2.5 px-3 font-bold text-stone-600 text-right">Preview / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-stone-400 font-semibold">
                    No questions found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((q, idx) => {
                  const isExpanded = expandedId === q.id;

                  return (
                    <React.Fragment key={q.id}>
                      <tr className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-stone-400 align-top">
                          {idx + 1}
                        </td>
                        <td className="py-2.5 px-3 max-w-md">
                          <p className="font-bold text-stone-800">{q.question}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              ✓ {q.options[q.correctAnswer]}
                            </span>
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : q.id)}
                              className="text-[11px] text-amber-800 font-bold flex items-center gap-0.5 hover:underline"
                            >
                              {isExpanded ? (
                                <>
                                  <span>Hide Options</span>
                                  <ChevronUp className="w-3 h-3" />
                                </>
                              ) : (
                                <>
                                  <span>View All 4 Options</span>
                                  <ChevronDown className="w-3 h-3" />
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap align-top">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-[10px] font-bold">
                            {q.category}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap align-top">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              q.difficulty === 'easy'
                                ? 'bg-emerald-100 text-emerald-800'
                                : q.difficulty === 'medium'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {q.difficulty}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap align-top">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setPreviewModalQuestion(q)}
                              title="Preview as Student Card"
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold transition-all text-[11px] shadow-sm"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Preview</span>
                            </button>
                            <button
                              onClick={() => onDeleteQuestion(q.id)}
                              title="Delete Question"
                              className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Options Detail Row */}
                      {isExpanded && (
                        <tr className="bg-amber-50/50">
                          <td colSpan={5} className="p-3 pl-8">
                            <div className="p-3 rounded-xl bg-white border border-amber-200 space-y-2">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                                Answer Options & Archaeological Context
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {q.options.map((opt, oIdx) => {
                                  const isCorrect = oIdx === q.correctAnswer;
                                  return (
                                    <div
                                      key={oIdx}
                                      className={`p-2 rounded-lg border text-xs flex items-center gap-2 ${
                                        isCorrect
                                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                          : 'bg-stone-50 border-stone-200 text-stone-700'
                                      }`}
                                    >
                                      <span
                                        className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                                          isCorrect
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-stone-200 text-stone-600'
                                        }`}
                                      >
                                        {optionPrefixes[oIdx]}
                                      </span>
                                      <span>{opt}</span>
                                      {isCorrect && (
                                        <span className="ml-auto text-[10px] uppercase font-bold text-emerald-700">
                                          Correct
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              <p className="text-xs text-stone-600 pt-1 border-t border-stone-100">
                                <span className="font-bold text-amber-900">Historical Explanation: </span>
                                {q.explanation}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* ─── MODE 2: CARD PREVIEW GRID ─── */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[550px] overflow-y-auto p-1">
          {filtered.map((q) => (
            <ClayCard
              key={q.id}
              elevation="sm"
              className="p-4 space-y-3 bg-white/95 border-amber-200 flex flex-col justify-between relative hover:border-amber-400 transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                    {q.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        q.difficulty === 'easy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.difficulty === 'medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <button
                      onClick={() => onDeleteQuestion(q.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors"
                      title="Delete Question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs font-bold text-stone-800 my-2">{q.question}</p>

                <div className="space-y-1.5">
                  {q.options.map((opt, idx) => {
                    const isCorrect = idx === q.correctAnswer;
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl text-xs flex items-center gap-2 border ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                            isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {optionPrefixes[idx]}
                        </span>
                        <span className="truncate">{opt}</span>
                        {isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <p className="text-[11px] text-stone-500 italic truncate max-w-[240px]">
                  {q.explanation}
                </p>
                <button
                  onClick={() => setPreviewModalQuestion(q)}
                  className="flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg transition-all"
                >
                  <Eye className="w-3 h-3" />
                  <span>Interactive Preview</span>
                </button>
              </div>
            </ClayCard>
          ))}
        </div>
      )}

      {/* ─── STUDENT QUESTION CARD INTERACTIVE PREVIEW MODAL ─── */}
      {previewModalQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-300 space-y-4 animate-scale-in relative">
            <button
              onClick={() => setPreviewModalQuestion(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-title text-base text-stone-900">
                  Student Live Card Preview
                </h4>
                <p className="text-[11px] font-semibold text-stone-500">
                  How this question will appear in Team Mohenjo / Dholavira panels
                </p>
              </div>
            </div>

            {/* Simulated Live Question Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-50/90 to-indigo-50/80 border-2 border-blue-200 shadow-clay-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200/50">
                <span className="font-title text-xs text-blue-800">
                  Team Mohenjo (Preview)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-200/80 text-blue-900">
                  {previewModalQuestion.category}
                </span>
              </div>

              <p className="text-sm font-bold text-stone-900 leading-snug">
                {previewModalQuestion.question}
              </p>

              <div className="space-y-2">
                {previewModalQuestion.options.map((opt, i) => {
                  const isCorrect = i === previewModalQuestion.correctAnswer;
                  return (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border-2 flex items-center gap-2.5 text-xs font-semibold ${
                        isCorrect
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                          : 'bg-white text-stone-800 border-stone-200'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                          isCorrect ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {optionPrefixes[i]}
                      </span>
                      <span>{opt}</span>
                      {isCorrect && (
                        <span className="ml-auto text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded">
                          Correct Choice
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 text-xs">
                <span className="font-bold">Historical Fact / Feedback: </span>
                <span>{previewModalQuestion.explanation}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewModalQuestion(null)}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
