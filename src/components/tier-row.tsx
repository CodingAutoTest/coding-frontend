// TierRow.tsx
interface TierRowProps {
    name: string;
    color: string;
    count: number;
    percent: number;
  }
  
  const TierRow = ({ name, color, count, percent}: TierRowProps) => {
    return (
      <>
        <div className="inline-flex justify-start items-start">
          <div className="w-[560px] self-stretch flex justify-start items-center">
            <div data-svg-wrapper>
              <svg
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="14"
                  height="14"
                  rx="4"
                  fill={color}
                />
              </svg>
            </div>
            <div className="w-96 flex justify-start items-center gap-2.5">
              <div className="justify-start text-black text-sm font-normal font-['Poppins']">
                {name}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-3.5 self-stretch inline-flex flex-col justify-center items-center gap-2.5">
                <div className="justify-start text-black text-xs font-semibold font-['Poppins']">
                  {count}
                </div>
              </div>
            </div>
            <div className="w-24 h-7 inline-flex flex-col justify-center items-end">
              <div className="self-stretch inline-flex justify-end items-center">
                <div className="justify-start text-black text-xl font-semibold font-['Poppins']">
                  {percent}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[500px] h-0 outline outline-1 outline-offset-[-0.50px] outline-black" />
      </>
    );
  };
  
  export default TierRow;
  