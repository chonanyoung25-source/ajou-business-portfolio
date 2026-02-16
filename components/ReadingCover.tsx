
import React, { useState, useEffect } from 'react';

const ReadingCover: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 15;
    const y = (clientY / window.innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[80vh] flex items-center bg-[#FDFCF7] overflow-hidden px-6 md:px-12 lg:px-24 mb-20"
    >
      {/* Background Mixed Gradient */}
      <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-indigo-50/30 via-transparent to-amber-50/50"></div>
      
      {/* Decorative Floating Quotes Fragments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-px bg-slate-200 -rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-px bg-amber-200 rotate-12 animate-pulse [animation-delay:1s]"></div>
        <span className="absolute top-[20%] left-[10%] text-[100px] font-serif text-slate-100/50 select-none">"</span>
        <span className="absolute bottom-[20%] right-[10%] text-[100px] font-serif text-amber-100/50 select-none transform rotate-180">"</span>
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Text Content */}
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-4 mb-10">
            <span className="h-[2px] w-12 bg-amber-500"></span>
            <span className="text-[11px] font-black tracking-[0.5em] text-amber-600 uppercase">Curated Thoughts</span>
          </div>
          
          <h2 className="text-6xl md:text-[5.5rem] font-extrabold text-slate-950 leading-[0.9] tracking-tighter mb-10">
            지식의 확장, <br />
            <span className="text-indigo-600">독서 아카이브</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-lg mb-12 italic">
            "한 페이지의 문장이 삶의 방향을 바꾸듯, <br className="hidden md:block" />
            인문학적 깊이를 더하는 사유의 기록입니다."
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-12 py-5 bg-slate-950 text-white rounded-2xl font-bold text-[12px] tracking-widest uppercase hover:bg-amber-600 transition-all shadow-2xl hover:scale-105">
              독서 기록 보기
            </button>
            <div className="flex items-center gap-4 px-6">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                      <div className={`w-full h-full bg-indigo-${i*100+300}`}></div>
                   </div>
                 ))}
               </div>
               <span className="text-[11px] font-bold text-slate-400">12권의 통찰</span>
            </div>
          </div>
        </div>

        {/* Right 3D Visual (Pinterest inspired Book Stack) */}
        <div className="relative flex justify-center items-center h-[500px]">
          <div 
            style={{ 
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) rotateX(${-mousePos.y * 0.4}deg) rotateY(${mousePos.x * 0.4}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
            className="relative"
          >
            {/* Pinterest Style Large Character/Object Icon */}
            <div className="relative w-64 h-80 md:w-80 md:h-[400px] bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-l-[12px] border-amber-500 flex flex-col p-10 transform -rotate-3 hover:rotate-0 transition-all duration-700">
               <div className="flex-grow flex items-center justify-center">
                  <svg className="w-32 h-32 text-amber-500 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
               </div>
               <div className="space-y-3">
                  <div className="w-full h-2 bg-slate-50 rounded"></div>
                  <div className="w-4/5 h-2 bg-slate-50 rounded"></div>
                  <div className="w-full h-2 bg-slate-50 rounded"></div>
               </div>
            </div>
            
            {/* Floating Accessory Labels */}
            <div className="absolute -top-10 -right-10 bg-indigo-600 text-white p-6 rounded-3xl shadow-2xl rotate-12 animate-float">
               <span className="text-2xl">📝</span>
            </div>
            <div className="absolute bottom-20 -left-16 bg-white border border-slate-100 p-5 rounded-[2rem] shadow-xl -rotate-6 animate-float [animation-delay:1.5s]">
               <p className="text-[10px] font-black text-amber-600 uppercase mb-1">Status</p>
               <p className="text-sm font-bold text-slate-900 tracking-tight">On Thinking</p>
            </div>
          </div>
          
          {/* Background Glow */}
          <div className="absolute inset-0 bg-amber-200/10 blur-[100px] rounded-full -z-10"></div>
        </div>
      </div>

      {/* Aesthetic Bottom Info */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-10">
        <div className="flex flex-col items-center">
           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Progress</span>
           <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-amber-500"></div>
           </div>
        </div>
        <div className="h-10 w-px bg-slate-100"></div>
        <p className="text-[11px] font-bold text-slate-400">AJOU BUSINESS <br/> READING GROUP</p>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default ReadingCover;
