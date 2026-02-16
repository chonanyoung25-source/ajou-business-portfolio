
import React, { useState, useEffect } from 'react';

const AcademicsCover: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[85vh] flex items-center bg-[#F8FAFC] overflow-hidden px-6 md:px-12 lg:px-24 mb-20"
    >
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#6366f1 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content Area */}
        <div className="animate-fade-in-left">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-[2px] w-10 bg-indigo-600"></span>
            <span className="text-[11px] font-black tracking-[0.4em] text-indigo-600 uppercase">Academic Excellence</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold text-slate-950 leading-[1.1] tracking-tighter mb-10">
            경영학적 혁신을 <br />
            <span className="text-indigo-600">설계하는 과정</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-lg mb-12">
            데이터 분석 역량과 전략적 사고를 결합하여 <br className="hidden md:block" />
            현실의 복잡한 비즈니스 문제를 해결합니다.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#curriculum"
              className="px-10 py-4 bg-slate-950 text-white rounded-full font-bold text-[12px] tracking-widest uppercase hover:bg-indigo-600 transition-all shadow-xl hover:scale-105"
            >
              전공과목 탐색
            </a>
            <button 
              className="px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-bold text-[12px] tracking-widest uppercase hover:bg-slate-50 transition-all shadow-sm"
            >
              학습 로드맵
            </button>
          </div>
        </div>

        {/* Right Visual Area (Ryan-like 3D Object) */}
        <div className="relative flex justify-center items-center h-[400px] md:h-[600px]">
          <div 
            style={{ 
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) rotateX(${-mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
              transition: 'transform 0.2s ease-out'
            }}
            className="relative w-72 h-72 md:w-96 md:h-96"
          >
            {/* Styled 3D Academic Element */}
            <div className="absolute inset-0 bg-indigo-600 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(79,70,229,0.4)] flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-700">
               <svg className="w-40 h-40 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
               </svg>
            </div>
            {/* Floating Nodes */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400 rounded-3xl shadow-xl flex items-center justify-center animate-float [animation-delay:1s] transform rotate-12">
               <span className="text-2xl">📊</span>
            </div>
            <div className="absolute bottom-10 left-[-40px] w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center animate-float [animation-delay:2s] transform -rotate-6 border border-slate-50">
               <span className="text-3xl">💡</span>
            </div>
          </div>
          
          {/* Background Glow */}
          <div className="absolute inset-0 bg-indigo-200/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        </div>
      </div>

      {/* Bottom Pagination Style Info */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-slate-900">01</span>
          <div className="w-12 h-[2px] bg-slate-900 rounded-full"></div>
          <span className="text-[10px] font-black text-slate-300">03</span>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left { animation: fade-in-left 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default AcademicsCover;
