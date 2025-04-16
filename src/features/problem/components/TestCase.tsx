import React from 'react';
import { TestCase as TestCaseType } from '../api/problemApi';

interface TestCaseProps {
  testCases: TestCaseType[];
  selectedTestCase: number;
  onTestCaseSelect: (index: number) => void;
  input: string;
  output: string;
}

export const TestCase: React.FC<TestCaseProps> = ({
  testCases,
  selectedTestCase,
  onTestCaseSelect,
  input,
  output
}) => {
  return (
    <div className="bg-[#F4F4F4] rounded-lg shadow-md">
      <div className="bg-[#E9E9E9] px-5 py-2">
        <span className="text-[#232323] text-base">테스트 케이스</span>
      </div>
      <div className="p-5">
        <div className="flex gap-4 mb-5">
          {testCases.map((_, index) => (
            <button
              key={index}
              className={`px-8 py-2 rounded-lg ${
                selectedTestCase === index
                  ? 'bg-[#4866C9] text-white'
                  : 'bg-[#D9D9D9] text-[#232323]'
              }`}
              onClick={() => onTestCaseSelect(index)}
            >
              케이스 {index + 1}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-[#232323] text-base mb-2">입력</label>
            <input
              value={input}
              readOnly
              className="w-full bg-[#D9D9D9] text-[#232323] px-5 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-[#232323] text-base mb-2">출력</label>
            <input
              value={output}
              readOnly
              className="w-full bg-[#D9D9D9] text-[#232323] px-5 py-2 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 