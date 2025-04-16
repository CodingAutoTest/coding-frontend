import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LabelList,
} from "recharts";
import TierRow from "@/components/tier-row";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // lucide-react 아이콘 사용

const tierData = [
  { name: "브론즈", count: 10, color: "#B98B5A", percent: 10 },
  { name: "실버", count: 20, color: "#97A5AD", percent: 20 },
  { name: "골드", count: 15, color: "#FFBF61", percent: 15 },
  { name: "플레티넘", count: 25, color: "#6FECC0", percent: 25 },
  { name: "다이아", count: 20, color: "#61ABF5", percent: 20 },
  { name: "마스터", count: 10, color: "#FF724F", percent: 10 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    const total = tierData.reduce((sum, entry) => sum + entry.count, 0);
    const percent = ((value / total) * 100).toFixed(1);
    return (
      <div className="bg-white border px-2 py-1 text-sm rounded shadow">
        <p>
          {name}: {percent}%
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {tierData[index].name}
    </text>
  );
};

const MypageTier = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = 3;

  const components = [
    <div className="text-lg font-bold">1번 컴포넌트</div>,
    <div className="text-lg font-bold">2번 컴포넌트</div>,
    <div className="text-lg font-bold">3번 컴포넌트</div>,
  ];

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < components.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <div className="w-full px-20 relative bg-white inline-flex justify-between items-center overflow-hidden">
        <img className="w-28 h-28" src="https://placehold.co/116x116" />
        <div className="left-[308px] top-[47px] absolute flex justify-start items-center gap-12">
          <div className="justify-start text-neutral-800 text-base font-bold font-['Nunito_Sans']">
            문제
          </div>
          <div className="justify-start text-neutral-400 text-base font-bold font-['Nunito_Sans']">
            클래스
          </div>
          <div className="justify-start text-neutral-800 text-base font-bold font-['Nunito_Sans']">
            랭킹
          </div>
          <div className="justify-start text-neutral-400 text-base font-bold font-['Nunito_Sans']">
            실전테스트
          </div>
        </div>
        <div className="flex justify-start items-center gap-10">
          <div className="text-right justify-start text-amber-400 text-base font-bold font-['Nunito_Sans']">
            프리미엄
          </div>
          <div className="justify-start text-neutral-800 text-base font-bold font-['Nunito_Sans']">
            로그아웃
          </div>
          <div className="p-2.5 bg-zinc-100 rounded-[100px] flex justify-start items-start gap-2.5">
            <div data-svg-wrapper className="relative">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M28.8236 12.1518C28.8236 17.0468 24.8988 20.9719 20.0003 20.9719C15.1035 20.9719 11.177 17.0468 11.177 12.1518C11.177 7.25675 15.1035 3.33337 20.0003 3.33337C24.8988 3.33337 28.8236 7.25675 28.8236 12.1518ZM20.0003 36.6667C12.7709 36.6667 6.66699 35.4917 6.66699 30.9583C6.66699 26.4233 12.8093 25.2899 20.0003 25.2899C27.2314 25.2899 33.3337 26.4649 33.3337 30.9983C33.3337 35.5334 27.1914 36.6667 20.0003 36.6667Z"
                  fill="#131313"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-72 flex flex-col justify-start items-center relative">
        <img
          className="w-full h-52 bg-center bg-cover"
          src="src/assets/images/background.png"
        />
        <div className="w-[836px] h-28 inline-flex justify-between items-end relative">
          <img
            className="w-24 h-24 bg-white rounded-full border border-black absolute rounded-[90px] top-[-50px] left-0 z-10"
            src="src/assets/images/profile.png"
          />
          <div className="ml-auto">
            <button className="w-32 h-11 px-6 py-3 bg-slate-600/50 rounded-[5px] flex justify-center items-center gap-2.5">
              <span className="text-black text-lg font-normal font-['Roboto']">
                프로필편집
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[874px] h-20 flex flex-col justify-center items-start">
        <div className="justify-start text-black text-2xl font-semibold font-['Poppins']">
          changwook
        </div>
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="w-16 flex justify-start items-center gap-[3px]">
            <div data-svg-wrapper>
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_917_3563)">
                  <path
                    d="M6.28508 10.2583C5.5756 10.9528 4.42531 10.9528 3.71584 10.2583L0.532107 7.14183C-0.177369 6.44734 -0.177369 5.32134 0.532107 4.62685L3.71584 1.51037C4.42531 0.815879 5.5756 0.815879 6.28508 1.51037L9.46881 4.62685C10.1783 5.32134 10.1783 6.44734 9.46881 7.14183L6.28508 10.2583Z"
                    fill="url(#paint0_linear_917_3563)"
                  />
                  <path
                    d="M5.93532 9.901C5.42021 10.4052 4.58071 10.4052 4.0656 9.901L0.881867 6.78452C0.372711 6.28612 0.372711 5.48256 0.881867 4.98416L4.0656 1.86768C4.58071 1.36344 5.42021 1.36344 5.93532 1.86768L9.11905 4.98416C9.62821 5.48256 9.62821 6.28612 9.11905 6.78452L5.93532 9.901Z"
                    stroke="white"
                    stroke-opacity="0.4"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_917_3563"
                    x="0"
                    y="0.989502"
                    width="10.001"
                    height="10.7898"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.117138 0 0 0 0 0.176258 0 0 0 0 0.202862 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_917_3563"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_917_3563"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_917_3563"
                    x1="5.00044"
                    y1="11.5158"
                    x2="5.00044"
                    y2="0.252899"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#8AA8B5" />
                    <stop offset="1" stop-color="#DCE5E8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="text-slate-500 text-xs font-semibold font-['Poppins'] whitespace-nowrap">
              Silver 600
            </div>
          </div>
          <div className="justify-start text-zinc-400 text-[8px] font-semibold font-['Poppins']">
            Silver 600 | 승급까지 100
          </div>
        </div>
        <div className="relative w-[873px] h-4 bg-green-400/20 rounded-[5px]">
          <div
            className="absolute top-0 left-0 h-full bg-green-400 rounded-[5px]"
            style={{ width: "80%" }}
          />
        </div>
      </div>
      <div className="w-[1145px] h-[528px] flex flex-col justify-center items-center gap-14">
        <div className="self-stretch inline-flex justify-center items-center gap-16">
          <div
            data-size="48"
            className="w-0 h-12 relative origin-top-left -rotate-90 overflow-hidden"
          >
            <div data-svg-wrapper className="left-[4px] top-[4px] absolute">
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5 14.5L14.5 22.5M14.5 22.5L22.5 30.5M14.5 22.5H30.5M22.5 2.5C33.5457 2.5 42.5 11.4543 42.5 22.5C42.5 33.5457 33.5457 42.5 22.5 42.5C11.4543 42.5 2.5 33.5457 2.5 22.5C2.5 11.4543 11.4543 2.5 22.5 2.5Z"
                  stroke="var(--Icon-Default-Default, #1E1E1E)"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="relative w-[921px] h-96 px-5 py-2.5 bg-neutral-100 rounded-2xl inline-flex flex-col justify-center items-center gap-12">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`absolute -left-20 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full 
          ${
            currentIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
            >
              <ChevronLeft size={28} />
            </button>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-start text-black text-[10px] font-semibold font-['Poppins']">
                난이도 분포
              </div>
              <div className="self-stretch justify-start text-black text-lg font-semibold font-['Poppins']">
                80문제 해결
              </div>
            </div>
            <div className="h-64 inline-flex justify-center items-center gap-16">
              <div className="w-96 h-96 p-2 transform translate-x-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tierData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={120}
                      label={renderCustomLabel} // 라벨 항상 표시
                      labelLine={false} // 라벨선 제거
                    >
                      {tierData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-[560px] h-52 inline-flex flex-col justify-center items-center gap-[3px] transform -translate-x-[60px]">
                <div className="inline-flex justify-center items-center gap-[73px]">
                  <div className="w-48 flex justify-center items-center gap-2.5">
                    <div className="justify-start text-black text-[10px] font-semibold font-['Poppins']">
                      난이도
                    </div>
                  </div>
                  <div className="justify-start text-black text-[10px] font-semibold font-['Poppins']">
                    문제
                  </div>
                </div>
                {tierData.map((tier, index) => (
                  <TierRow
                    key={index}
                    name={tier.name}
                    color={tier.color}
                    count={tier.count}
                    percent={tier.count}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={goToNext}
              disabled={currentIndex === components.length - 1}
              className={`absolute -right-20 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full  
          ${
            currentIndex === components.length - 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
            >
              <ChevronRight size={28} />
            </button>
          </div>
          <div
            data-size="48"
            className="w-0 h-12 relative origin-top-left rotate-90 overflow-hidden"
          >
            <div data-svg-wrapper className="left-[4px] top-[4px] absolute">
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5 30.5L30.5 22.5M30.5 22.5L22.5 14.5M30.5 22.5H14.5M22.5 42.5C11.4543 42.5 2.5 33.5457 2.5 22.5C2.5 11.4543 11.4543 2.5 22.5 2.5C33.5457 2.5 42.5 11.4543 42.5 22.5C42.5 33.5457 33.5457 42.5 22.5 42.5Z"
                  stroke="var(--Icon-Default-Default, #1E1E1E)"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="inline-flex justify-start items-center gap-14">
          {Array.from({ length: total }).map((_, index) => (
            <div key={index} data-svg-wrapper>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7.5"
                  fill={index === currentIndex ? "#375D5B" : "#D9D9D9"}
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MypageTier;
