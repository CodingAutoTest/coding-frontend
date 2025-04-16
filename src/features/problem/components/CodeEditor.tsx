import React from 'react';
import Editor from '@monaco-editor/react';

export type ProgrammingLanguage = 'python' | 'java' | 'javascript' | 'cpp';

export const LANGUAGE_LABELS: Record<ProgrammingLanguage, string> = {
  python: 'Python',
  java: 'Java',
  javascript: 'JavaScript',
  cpp: 'C++'
};

interface CodeEditorProps {
  code: string;
  language: ProgrammingLanguage;
  onCodeChange: (value: string | undefined) => void;
  onLanguageChange: (language: ProgrammingLanguage) => void;
  isExecuting: boolean;
  isSubmitting: boolean;
  onExecute: () => void;
  onSubmit: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  isExecuting,
  isSubmitting,
  onExecute,
  onSubmit
}) => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false);

  return (
    <div className="bg-[#F4F4F4] rounded-lg mb-5 overflow-hidden shadow-md">
      <div className="flex justify-between items-center bg-[#E9E9E9] px-5 py-2">
        <span className="text-[#232323] text-base">코드</span>
        <div className="relative">
          <button
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            className="flex items-center gap-2 text-[#232323] text-base hover:bg-[#D9D9D9] px-3 py-1 rounded-lg transition-colors"
          >
            {LANGUAGE_LABELS[language]}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isLanguageMenuOpen && (
            <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-1 z-10">
              {Object.entries(LANGUAGE_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  className={`w-full text-left px-4 py-2 hover:bg-[#F4F4F4] ${
                    language === key ? 'bg-[#F4F4F4]' : ''
                  }`}
                  onClick={() => {
                    onLanguageChange(key as ProgrammingLanguage);
                    setIsLanguageMenuOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="h-[400px]">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          onChange={onCodeChange}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <div className="flex justify-end gap-4 bg-[#E9E9E9] p-5">
        <button
          className="bg-[#FAF9F6] text-[#232323] px-6 py-2 rounded-lg"
          onClick={onExecute}
          disabled={isExecuting}
        >
          {isExecuting ? "실행 중..." : "실행"}
        </button>
        <button
          className="bg-[#4866C9] text-white px-6 py-2 rounded-lg"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "제출 중..." : "제출"}
        </button>
      </div>
    </div>
  );
}; 