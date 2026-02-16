
import React, { useState, useEffect } from 'react';

const ToeicCover: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 30;
    const y = (clientY / window.innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[85vh] flex items-center bg-[#0F172A] overflow-hidden px-6 md:px-12 lg:px-24"
    >
      {/* World Map Background Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path d="M100,200 Q150,150 200,200 T300,250 T400,200 T500,150 T600,200 T700,250 T800,200 T900,150" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-[0_10px_30px_rgba(79,70,229,0.3)]">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9-9H3m9 9V3m0 9L3 3" />
               </svg>
            </div>
            <span className="text-[11px] font-black tracking-[0.5em] text-indigo-400 uppercase">Global Communication</span>
          </div>
          
          <h2 className="text-6xl md:text-[6rem] font-black text-white leading-[0.85] tracking-tighter mb-10">
            TOEIC <br />
            <span className="instagram-dynamic">STRATEGY</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-lg mb-12">
            비즈니스 영어를 정복하여 <br className="hidden md:block" />
            <span className="text-white">글로벌 커리어</span>의 문을 엽니다.
          </p>
          
          <div className="flex flex-wrap items-center gap-8">
            <button 
              onClick={() => document.getElementById('toeic-lab')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-5 bg-white text-slate-950 rounded-2xl font-bold text-[11px] tracking-widest uppercase hover:bg-indigo-500 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Start Studying
            </button>
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Target Score</span>
               <span className="text-2xl font-black text-white italic tracking-tighter">990<span className="text-indigo-500">.</span></span>
            </div>
          </div>
        </div>

        {/* Visual 3D Object (Boarding Pass / Passport Motif) */}
        <div className="relative flex justify-center items-center h-[500px]">
          <div 
            style={{ 
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) rotateX(${-mousePos.y * 0.4}deg) rotateY(${mousePos.x * 0.4}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
            className="relative w-80 h-96 bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col p-8 border-l-[12px] border-indigo-600 group hover:rotate-0 transition-transform duration-700"
          >
            <div className="flex justify-between items-start mb-10">
               <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Flight Status</p>
                  <h4 className="text-xl font-black text-slate-900 tracking-tighter">TOEIC 990</h4>
               </div>
               <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
               </div>
            </div>

            <div className="space-y-6 flex-grow">
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Gate / Seat</p>
                  <p className="text-sm font-bold text-slate-950">AJOU BUSINESS / A-20</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex-grow p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[8px] font-black text-slate-400 uppercase mb-1">From</p>
                     <p className="text-sm font-bold text-slate-950">CAMPUS</p>
                  </div>
                  <div className="flex-grow p-4 bg-indigo-600 rounded-2xl text-white">
                     <p className="text-[8px] font-black text-white/60 uppercase mb-1">To</p>
                     <p className="text-sm font-bold">GLOBAL</p>
                  </div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-slate-200 flex items-center justify-between">
               <div className="flex gap-1">
                  {[1,2,3,4,5,6,7].map(i => <div key={i} className="w-1 h-6 bg-slate-200 rounded-full"></div>)}
                  {[1,2,3].map(i => <div key={i} className="w-1 h-6 bg-indigo-200 rounded-full"></div>)}
               </div>
               <span className="text-[10px] font-black text-slate-300 italic tracking-widest uppercase">BOARDING PASS</span>
            </div>
          </div>
          
          {/* Subtle Outer Glow */}
          <div className="absolute inset-0 bg-indigo-500/10 blur-[150px] rounded-full -z-10 animate-pulse"></div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default ToeicCover;
