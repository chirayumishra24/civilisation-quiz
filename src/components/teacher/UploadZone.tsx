import React, { useState, useRef } from 'react';
import { UploadCloud, FileSpreadsheet, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { parseExcelQuestions, generateSampleExcel } from '../../utils/excelParser';
import { Question } from '../../types/game';

interface UploadZoneProps {
  onQuestionsLoaded: (questions: Question[], fileName: string) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onQuestionsLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    try {
      setStatusMessage('Parsing file...');
      setIsError(false);

      if (file.name.endsWith('.json')) {
        const text = await file.text();
        const data = JSON.parse(text);
        const questions: Question[] = Array.isArray(data) ? data : data.questions || [];
        if (questions.length === 0) {
          throw new Error('No valid questions found in JSON');
        }
        onQuestionsLoaded(questions, file.name);
        setStatusMessage(`Successfully loaded ${questions.length} questions from ${file.name}!`);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const buffer = await file.arrayBuffer();
        const questions = parseExcelQuestions(buffer);
        if (questions.length === 0) {
          throw new Error('No valid question rows found in Excel sheet. Check headers.');
        }
        onQuestionsLoaded(questions, file.name);
        setStatusMessage(`Successfully loaded ${questions.length} questions from ${file.name}!`);
      } else {
        throw new Error('Please upload an Excel (.xlsx, .xls) or JSON file');
      }
    } catch (err: any) {
      setIsError(true);
      setStatusMessage(err.message || 'Failed to parse questions file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDownloadSample = () => {
    const bytes = generateSampleExcel();
    const blob = new Blob([bytes], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'harappan_civilisation_sample_questions.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Card */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-3 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-amber-500 bg-amber-50/80 scale-[1.01]'
            : 'border-amber-300/80 bg-white/70 hover:bg-amber-50/40 hover:border-amber-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.json"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              processFile(e.target.files[0]);
            }
          }}
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-clay-sm">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div>
            <h4 className="font-title text-base sm:text-lg text-stone-800">
              Drag & Drop Questions Spreadsheet (.xlsx, .xls, .json)
            </h4>
            <p className="text-xs text-stone-500 mt-1 font-medium">
              or click to browse your computer
            </p>
          </div>
        </div>
      </div>

      {/* Status Alert */}
      {statusMessage && (
        <div
          className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
            isError
              ? 'bg-rose-100 border border-rose-300 text-rose-800'
              : 'bg-emerald-100 border border-emerald-300 text-emerald-800'
          }`}
        >
          {isError ? (
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          )}
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Download Template Bar */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs">
        <div className="flex items-center gap-2 text-stone-700 font-medium">
          <FileSpreadsheet className="w-4 h-4 text-amber-600" />
          <span>Need a starting spreadsheet format?</span>
        </div>
        <button
          onClick={handleDownloadSample}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-amber-900 border border-amber-300 font-bold shadow-sm active:scale-95 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Excel Template</span>
        </button>
      </div>
    </div>
  );
};
