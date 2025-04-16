import React from 'react';
import { ProblemType } from '../api/problemApi';
import { getDifficultyTier, DIFFICULTY_TIERS } from '../types/difficulty';

interface ProblemDescriptionProps {
  problemData: ProblemType | null;
  activeTab: '문제' | '결과' | '제출내역';
  onTabClick: (tab: '문제' | '결과' | '제출내역') => void;
  isAlgorithmVisible: boolean;
  onToggleAlgorithm: () => void;
}

export const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  problemData,
  activeTab,
  onTabClick,
  isAlgorithmVisible,
  onToggleAlgorithm
}) => {
  const difficultyTier = problemData ? getDifficultyTier(problemData.difficulty) : 'bronze';
  const tierInfo = DIFFICULTY_TIERS[difficultyTier];

  return (
    <div className="flex-1 bg-[#F4F4F4] rounded-lg">
      {/* 상단 탭 메뉴 */}
      <div className="flex items-start bg-[#E9E9E9] rounded-tl-[10px] rounded-tr-[10px] sticky top-0 z-10">
        {(['문제', '결과', '제출내역'] as const).map((tab) => (
          <button
            key={tab}
            className={`flex flex-col shrink-0 items-start text-left pt-[7px] pb-[7px] pl-[20px] pr-[20px] rounded-tl-[10px] rounded-tr-[10px] border-0 ${
              activeTab === tab ? 'bg-[#4866C9] text-white' : 'bg-[#E9E9E9] text-[#232323]'
            }`}
            onClick={() => onTabClick(tab)}
          >
            <span className="text-[16px]">{tab}</span>
          </button>
        ))}
      </div>

      {/* 문제 내용 */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img
              src={tierInfo.icon}
              className="w-[24px] h-[24px] object-contain"
              alt={`${difficultyTier} tier`}
            />
            <span className="text-[#232323] text-[32px] font-bold">
              {problemData?.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 min-w-[60px]">
              {!isAlgorithmVisible && (
                <span className="text-[#232323] text-[12px]">
                  알고리즘
                </span>
              )}
              {isAlgorithmVisible && problemData?.tags && (
                <div className="flex gap-2">
                  {problemData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[#232323] text-[12px] bg-[#F0F0F0] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <button
                onClick={onToggleAlgorithm}
                className="hover:bg-gray-100 p-1 rounded transition-colors"
                title={isAlgorithmVisible ? "알고리즘 태그 숨기기" : "알고리즘 태그 보기"}
              >
                <img
                  src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/NYTElEXjgV/99ar7e65_expires_30_days.png"}
                  className="w-[19px] h-[19px] object-fill"
                  alt="algorithm-icon"
                />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#202224] text-xs font-bold mb-2">시간 제한</p>
                <p className="text-[#202224] text-xl font-bold">{problemData?.timeLimit}초</p>
              </div>
              <img
                src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/NYTElEXjgV/ykyv98xt_expires_30_days.png"}
                className="w-10 h-10 rounded-lg"
                alt="time-icon"
              />
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#202224] text-xs font-bold mb-2">메모리 제한</p>
                <p className="text-[#202224] text-xl font-bold">{problemData?.memoryLimit}MB</p>
              </div>
              <img
                src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/NYTElEXjgV/p9c7hs9c_expires_30_days.png"}
                className="w-10 h-10 rounded-lg"
                alt="memory-icon"
              />
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#202224] text-xs font-bold mb-2">정답률</p>
                <p className="text-[#202224] text-xl font-bold">
                  {(problemData?.acceptanceRate ?? 0 * 100).toFixed(2)}%
                </p>
              </div>
              <img
                src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/NYTElEXjgV/n1kgip76_expires_30_days.png"}
                className="w-10 h-10 rounded-lg"
                alt="success-rate-icon"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-[#232323] text-xl font-bold mb-4">문제</h2>
            <div className="h-px bg-[#73808D] mb-4"></div>
            <div 
              className="text-[#232323] text-base"
              dangerouslySetInnerHTML={{ __html: problemData?.description || '' }}
            />
          </div>

          <div>
            <h2 className="text-[#232323] text-xl font-bold mb-4">입력</h2>
            <div className="h-px bg-[#73808D] mb-4"></div>
            <div 
              className="text-[#232323] text-base"
              dangerouslySetInnerHTML={{ __html: problemData?.inputConstraints || '' }}
            />
          </div>

          <div>
            <h2 className="text-[#232323] text-xl font-bold mb-4">출력</h2>
            <div className="h-px bg-[#73808D] mb-4"></div>
            <div 
              className="text-[#232323] text-base"
              dangerouslySetInnerHTML={{ __html: problemData?.outputConstraints || '' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 