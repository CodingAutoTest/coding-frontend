import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProblem } from './hooks/useProblem';
import { useTimer } from './hooks/useTimer';
import { executeCode, submitCode } from './api/problemApi';
import { CodeEditor, ProgrammingLanguage } from './components/CodeEditor';
import { TestCase } from './components/TestCase';
import { ProblemDescription } from './components/ProblemDescription';

export const ProblemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { problemData, testCases, loading, error } = useProblem(id || '');
  const { formattedTime, isRunning, startTimer, stopTimer, resetTimer } = useTimer();
  
  const [code, setCode] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('python');
  const [isAlgorithmVisible, setIsAlgorithmVisible] = useState<boolean>(false);
  const [selectedTestCase, setSelectedTestCase] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [submitModal, setSubmitModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'문제' | '결과' | '제출내역'>('문제');
  const [executeResults, setExecuteResults] = useState<any[]>([]);
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');

  const handleExecute = async () => {
    if (!code.trim()) {
      setErrorMessage('코드를 입력해주세요.');
      setErrorModal(true);
      return;
    }

    if (testCases.length === 0) {
      setErrorMessage('테스트 케이스가 없습니다.');
      setErrorModal(true);
      return;
    }

    setIsExecuting(true);
    try {
      const results = await executeCode(code, selectedLanguage, testCases.map(tc => tc.id));
      setExecuteResults(results);
      setShowModal(true);
    } catch (err) {
      console.error('실행 중 오류 발생:', err);
      setErrorMessage('코드 실행 중 오류가 발생했습니다.');
      setErrorModal(true);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = async () => {
    if (!id) return;
    
    if (!code.trim()) {
      setErrorMessage('코드를 입력해주세요.');
      setErrorModal(true);
      return;
    }

    if (testCases.length === 0) {
      setErrorMessage('테스트 케이스가 없습니다.');
      setErrorModal(true);
      return;
    }
    
    setIsSubmitting(true);
    try {
      await submitCode(
        Number(id),
        code,
        selectedLanguage,
        Number(localStorage.getItem('user_id'))
      );
      setSubmitModal(true);
    } catch (err) {
      console.error('제출 중 오류 발생:', err);
      setErrorMessage('코드 제출 중 오류가 발생했습니다.');
      setErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestCaseSelect = (index: number) => {
    setSelectedTestCase(index);
    const testCase = testCases[index];
    setInput1(testCase.input);
    setInput2(testCase.output);
  };

  if (loading) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="w-full h-full flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full h-full bg-white">
      <div className="w-full h-full bg-[#E2E2E2] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-5">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img
                src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/NYTElEXjgV/06l2kdio_expires_30_days.png"}
                className="w-[93px] h-[33px] object-fill"
                alt="logo"
              />
            </Link>
            <Link to="/" className="hover:bg-gray-100 p-2 rounded-full transition-colors">
              <img
                src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/NYTElEXjgV/55g7ytqq_expires_30_days.png"}
                className="w-[33px] h-[33px] object-fill"
                alt="menu"
              />
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-[#232323] text-[36px] font-bold w-[220px] text-right tabular-nums font-mono">
              {formattedTime}
            </span>
            <div className="flex items-center gap-4 min-w-[220px]">
              <button
                className="bg-[#4866C9] text-white font-bold px-6 py-2 rounded-lg w-[100px]"
                onClick={isRunning ? stopTimer : startTimer}
              >
                {isRunning ? "정지" : "시작"}
              </button>
              <button
                className="bg-[#FAF9F6] text-[#232323] font-bold px-6 py-2 rounded-lg w-[100px]"
                onClick={resetTimer}
                disabled={!isRunning && formattedTime === "00:00:00.00"}
              >
                초기화
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#232323] text-base font-bold">
              {"조민우"}
            </span>
            <img
              src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/NYTElEXjgV/pe3nhlg9_expires_30_days.png"}
              className="w-[60px] h-[60px] object-fill rounded-full"
              alt="profile"
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex gap-5 px-10 pb-10">
          <ProblemDescription
            problemData={problemData}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            isAlgorithmVisible={isAlgorithmVisible}
            onToggleAlgorithm={() => setIsAlgorithmVisible(!isAlgorithmVisible)}
          />
          
          <div className="flex-1">
            <CodeEditor
              code={code}
              language={selectedLanguage}
              onCodeChange={(value) => setCode(value || '')}
              onLanguageChange={setSelectedLanguage}
              isExecuting={isExecuting}
              isSubmitting={isSubmitting}
              onExecute={handleExecute}
              onSubmit={handleSubmit}
            />

            <TestCase
              testCases={testCases}
              selectedTestCase={selectedTestCase}
              onTestCaseSelect={handleTestCaseSelect}
              input={input1}
              output={input2}
            />
          </div>
        </div>
      </div>

      {/* 결과 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#232323]">실행 결과</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {executeResults.every(result => result.status === "Accepted") ? (
                <div className="text-green-600 font-bold text-center py-4">
                  모든 테스트 케이스 통과! 🎉
                </div>
              ) : (
                <div className="text-red-600 font-bold text-center py-4">
                  일부 테스트 케이스 실패
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 제출 결과 모달 */}
      {submitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#232323]">제출 완료</h2>
              <button
                onClick={() => setSubmitModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="text-center py-4">
              <p className="text-[#232323] font-bold">채점이 시작되었습니다.</p>
              <p className="text-[#666666] mt-2">제출 내역에서 결과를 확인할 수 있습니다.</p>
            </div>
          </div>
        </div>
      )}

      {/* 에러 모달 */}
      {errorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-red-500">오류</h2>
              <button
                onClick={() => setErrorModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="text-center py-4">
              <p className="text-[#232323] font-bold">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
