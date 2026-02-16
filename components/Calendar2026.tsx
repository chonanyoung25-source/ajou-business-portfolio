
import React, { useEffect, useState } from 'react';

interface Calendar2026Props {
  onClose: () => void;
}

const Calendar2026: React.FC<Calendar2026Props> = ({ onClose }) => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null);

  const months = [
    { name: 'January', days: 31, startDay: 4 }, // 2026년 1월 1일은 목요일(4)
    { name: 'February', days: 28, startDay: 0 },
    { name: 'March', days: 31, startDay: 0 },
    { name: 'April', days: 30, startDay: 3 },
    { name: 'May', days: 31, startDay: 5 },
    { name: 'June', days: 30, startDay: 1 },
    { name: 'July', days: 31, startDay: 3 },
    { name: 'August', days: 31, startDay: 6 },
    { name: 'September', days: 30, startDay: 2 },
    { name: 'October', days: 31, startDay: 4 },
    { name: 'November', days: 30, startDay: 0 },
    { name: 'December', days: 31, startDay: 2 },
  ];

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const renderMonth = (month: typeof months[0], mIdx: number, isDetail: boolean = false) => (
    <div 
      key={month.name} 
      onClick={() => !isDetail && setSelectedMonthIndex(mIdx)}
      className={`
        group transition-all duration-500 
        ${!isDetail ? 'cursor-pointer hover:scale-[1.02] animate-fade-in-up' : 'animate-scale-in'}
      `}
      style={{ 
        animationDelay: !isDetail ? `${mIdx * 50}ms` : '0ms',
        animationFillMode: 'forwards' 
      }}
    >
      <div className={`flex items-end justify-between border-b border-slate-100 pb-4 ${isDetail ? 'mb-12' : 'mb-8'}`}>
        <h3 className={`font-black text-slate-900 tracking-tighter transition-colors ${isDetail ? 'text-5xl md:text-7xl' : 'text-2xl group-hover:text-blue-600'}`}>
          {month.name}
        </h3>
        <span className={`font-black text-slate-300 uppercase tracking-widest ${isDetail ? 'text-2xl' : 'text-[10px]'}`}>
          {String(mIdx + 1).padStart(2, '0')}
        </span>
      </div>

      <div className={`grid grid-cols-7 gap-y-4 text-center ${isDetail ? 'gap-x-4 max-w-4xl mx-auto' : ''}`}>
        {dayNames.map(day => (
          <div key={day} className={`font-black text-slate-400 tracking-widest ${isDetail ? 'text-sm mb-4' : 'text-[9px]'}`}>{day}</div>
        ))}
        
        {/* Empty slots for previous month days */}
        {Array.from({ length: month.startDay }).map((_, i) => (
          <div key={`empty-${i}`} className={isDetail ? 'h-16' : 'h-8'}></div>
        ))}

        {/* Days of the month */}
        {Array.from({ length: month.days }).map((_, i) => {
          const dayNum = i + 1;
          return (
            <div 
              key={dayNum}
              className={`
                flex items-center justify-center font-bold rounded-xl transition-all
                hover:bg-slate-900 hover:text-white cursor-default
                ${isDetail ? 'h-16 text-xl' : 'h-8 text-[11px]'}
                text-slate-600
              `}
            >
              {dayNum}
            </div>
          );
        })}
      </div>

      {isDetail && (
        <div className="mt-20 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 animate-fade-in [animation-delay:400ms]">
          <h4 className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase mb-4">Focus of the Month</h4>
          <p className="text-slate-500 font-medium leading-relaxed italic">
            "이 달의 목표는 데이터 기반의 의사결정 프로세스를 정교화하고, <br className="hidden md:block" />
            핵심 프로젝트의 리소스를 최적화하여 조난영만의 가치를 증명하는 것입니다."
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] bg-white overflow-y-auto animate-fade-in px-6 md:px-12 py-20 scroll-smooth">
      {/* Controls */}
      <div className="fixed top-8 right-8 z-[210] flex gap-4">
        {selectedMonthIndex !== null && (
          <button 
            onClick={() => setSelectedMonthIndex(null)}
            className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-full shadow-lg hover:bg-slate-50 active:scale-95 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-[10px] font-black tracking-widest uppercase">Back to Year</span>
          </button>
        )}
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="text-[10px] font-black tracking-widest uppercase">CLOSE ARCHIVE</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        {selectedMonthIndex === null ? (
          <>
            {/* Year View Header */}
            <div className="mb-24 text-center">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <span className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase">Strategic Planning</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-black text-slate-950 tracking-tighter leading-none mb-8">
                2026<span className="text-blue-600">.</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                "클릭하여 각 월의 상세 계획과 통찰을 확인하세요."
              </p>
            </div>

            {/* 12 Months Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
              {months.map((month, mIdx) => renderMonth(month, mIdx))}
            </div>
          </>
        ) : (
          /* Detail Month View */
          <div className="max-w-4xl mx-auto pt-10">
            {renderMonth(months[selectedMonthIndex], selectedMonthIndex, true)}
          </div>
        )}

        {/* Footer info */}
        <div className="mt-40 border-t border-slate-100 pt-16 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
           <div className="flex items-center gap-6">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Ajou Univ. Business Portfolio</span>
              <div className="w-12 h-px bg-slate-200"></div>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">2026 Academic Calendar</span>
           </div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Built with Precision by NY.</p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Calendar2026;
