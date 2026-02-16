
import React, { useState, useEffect } from 'react';

const PromptCover: React.FC = () => {
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
      className="relative w-full min-h-[90vh] flex items-center justify-center bg-slate-950 overflow-hidden px-6"
    >
      {/* Matrix-like Background Particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border-r border-b border-indigo-500/10 flex items-center justify-center text-[8px] font-mono text-indigo-500/30 overflow-hidden">
               {Math.random() > 0.5 ? 'PROMPT' : 'ENGINEER'}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div 
          style={{ 
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) rotateX(${-mousePos.y * 0.2}deg) rotateY(${mousePos.x * 0.2}deg)`,
            transition: 'transform 0.4s ease-out'
          }}
          className="perspective-1000"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-indigo-400 text-[10px] font-black tracking-[0.4em] mb-10 uppercase animate-fade-in">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Artificial Intelligence Design
          </div>
          
          <h2 className="text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter mb-12 uppercase italic">
            Prompt <br />
            <span className="instagram-dynamic not-italic">Laboratory</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mb-16 px-4">
            비즈니스의 복잡한 질문을 AI가 이해할 수 있는 <br className="hidden md:block" />
            <span className="text-white border-b-2 border-indigo-500 pb-1">정교한 명령문의 형태</span>로 설계합니다.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
             <button 
               onClick={() => document.getElementById('prompt-lab')?.scrollIntoView({ behavior: 'smooth' })}
               className="px-14 py-6 bg-white text-slate-950 rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase hover:bg-indigo-600 hover:text-white transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95"
             >
               Start Engineering
             </button>
             <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold tracking-widest uppercase bg-white/5 px-6 py-4 rounded-2xl border border-white/10">
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Gemini 2.5 Flash Native
             </div>
          </div>
        </div>
      </div>

      {/* Floating 3D Chips */}
      <div 
        className="absolute top-1/4 right-[-5%] w-40 h-40 bg-indigo-600 rounded-3xl blur-[100px] opacity-20 animate-pulse"
        style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
      ></div>
      <div 
        className="absolute bottom-1/4 left-[-5%] w-60 h-60 bg-blue-600 rounded-full blur-[120px] opacity-10 animate-pulse"
        style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
      ></div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default PromptCover;
