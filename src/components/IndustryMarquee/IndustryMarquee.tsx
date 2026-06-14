import React from "react";
import { industries } from "@/constants/industries";

const IndustryMarquee = () => {
  return (
    <>
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .industry-marquee {
          display: flex;
          width: max-content;
          animation: scrollMarquee 600s linear infinite;
        }
        .industry-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="overflow-hidden relative flex items-center py-2">
        <div className="industry-marquee gap-5">
          {[...industries, ...industries].map((ind, index) => (
            <div
              key={index}
              className="border border-blue-50 bg-white hover:bg-blue-50/50 w-max pr-6 pl-4 h-[80px] rounded-xl flex items-center justify-start py-1 transition-all duration-300 group shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-lg gap-3 shrink-0"
            >
              <div className="text-2xl text-[#00C9FF] group-hover:scale-110 transition-transform duration-300 shrink-0">
                <ind.icon />
              </div>
              <p className="text-[13px] font-semibold text-left text-gray-600 group-hover:text-[#00C9FF] transition-colors whitespace-nowrap">
                {ind.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default IndustryMarquee;
