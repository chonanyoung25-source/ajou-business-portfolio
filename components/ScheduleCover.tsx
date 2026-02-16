
import React from 'react';

const ScheduleCover: React.FC = () => {
  return (
    <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center bg-white overflow-hidden pt-32 px-4">
      {/* Subtle Background */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] -z-10"></div>

      {/* Text Content */}
      <div className="text-center mb-20 animate-fade-in relative z-10">
        <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight uppercase text-slate-900">
          <span className="naver-dynamic">CHO NANYOUNG'S<br />스케줄 관리</span>
        </h2>
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          효율적인 시간 배분과 체계적인 계획으로 성과를 극대화합니다.
        </p>
      </div>

      {/* Laptop Mockup (Restored to Original Size) */}
      <div className="relative w-full max-w-5xl mx-auto group animate-fade-in-up">
        {/* Laptop Body */}
        <div className="relative bg-slate-900 p-2 rounded-[2rem] shadow-2xl overflow-hidden">
          {/* Bezel / Screen Area */}
          <div className="bg-white rounded-[1.6rem] aspect-[16/10] overflow-hidden relative">
            {/* Top Navigation Bar Mockup */}
            <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-6 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>
            </div>

            {/* Schedule UI Mockup */}
            <div className="p-8 h-full">
              <div className="grid grid-cols-3 gap-6 mb-8">
                {['Business Room A', 'Business Room B', 'Business Room C'].map((room, i) => (
                  <div key={i} className="text-center p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <p className="text-xs font-black text-slate-900 mb-1">{room}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Capacity: {5 + i*5}</p>
                  </div>
                ))}
              </div>
              
              {/* Timeline Grid */}
              <div className="space-y-6">
                {[10, 11, 12, 13].map((time) => (
                  <div key={time} className="flex items-center gap-4 relative">
                    <span className="text-[10px] font-black text-slate-300 w-10">{time}:00</span>
                    <div className="flex-grow h-px bg-slate-100"></div>
                    
                    {time === 10 && (
                      <div className="absolute left-16 top-0 w-[40%] bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded-lg shadow-sm">
                        <p className="text-[10px] font-black text-indigo-900 mb-1">인사팀 피드백 솔루션 도입 검토</p>
                        <p className="text-[8px] text-slate-400 font-bold">10:10 - 10:45</p>
                      </div>
                    )}
                    {time === 10 && (
                      <div className="absolute left-[58%] top-4 w-[30%] bg-rose-50 border-l-4 border-rose-500 p-3 rounded-lg shadow-sm">
                        <p className="text-[10px] font-black text-rose-900 mb-1">외수수익 수정결재</p>
                        <p className="text-[8px] text-slate-400 font-bold">10:40 - 11:20</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Laptop Hinge */}
        <div className="h-4 w-[102%] bg-slate-800 -mt-2 mx-auto rounded-b-xl relative z-10 border-b-4 border-slate-950/20"></div>
      </div>
    </div>
  );
};

export default ScheduleCover;
