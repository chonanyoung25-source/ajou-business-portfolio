
import React, { useState, useEffect } from 'react';

const StudioCover: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 25;
    const y = (clientY / window.innerHeight - 0.5) * 25;
    setMousePos({ x, y });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[90vh] flex items-center bg-slate-950 overflow-hidden px-6 md:px-12 lg:px-24"
    >
      {/* Dynamic Background: Data Beams & Glows */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x/5}% ${50 + mousePos.y/5}%, rgba(79, 70, 229, 0.2) 0%, transparent 50%)`
          }}
        ></div>
        
        {/* Animated Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent -rotate-12 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rotate-6 animate-pulse [animation-delay:1.5s]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Content Area */}
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(79,70,229,0.5)]">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
            </div>
            <span className="text-[11px] font-black tracking-[0.5em] text-indigo-400 uppercase">Creative Laboratory</span>
          </div>
          
          <h2 className="text-6xl md:text-[6.5rem] font-black text-white leading-[0.85] tracking-tighter mb-12">
            AI <br />
            <span className="instagram-dynamic">STUDIO</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-lg mb-12">
            데이터의 조각을 맞추어 <br className="hidden md:block" />
            <span className="text-white">새로운 비즈니스 로직</span>을 창조합니다.
          </p>
          
          <div className="flex items-center gap-8">
            <a 
              href="#studio-content"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('studio-content')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-12 py-5 bg-white text-slate-950 rounded-2xl font-bold text-[11px] tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105"
            >
              Explore Studio
            </a>
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Status</span>
               <span className="text-[11px] font-bold text-indigo-400">Innovating Now</span>
            </div>
          </div>
        </div>

        {/* Right 3D Visualization: Floating Puzzle Nodes */}
        <div className="relative flex justify-center items-center h-[500px]">
          <div 
            style={{ 
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
              transition: 'transform 0.4s ease-out'
            }}
            className="relative w-80 h-80"
          >
            {/* Core Object */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(79,70,229,0.5)] flex items-center justify-center transform rotate-12 group hover:rotate-0 transition-transform duration-1000">
               <div className="relative w-40 h-40 border-4 border-white/20 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
               </div>
               <svg className="absolute w-24 h-24 text-white animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
            </div>
            
            {/* Satellite Fragments */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-slate-800 border border-white/10 rounded-3xl shadow-2xl flex items-center justify-center animate-float [animation-delay:0.5s] rotate-[-15deg]">
               <span className="text-3xl">🧩</span>
            </div>
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] shadow-2xl flex items-center justify-center animate-float [animation-delay:1.2s] rotate-[20deg]">
               <span className="text-4xl">💡</span>
            </div>
          </div>
          
          {/* Subtle Outer Glow */}
          <div className="absolute inset-0 bg-indigo-500/10 blur-[150px] rounded-full -z-10"></div>
        </div>
      </div>

      {/* Aesthetic Bottom Accents */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-30">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
           <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Active Node</span>
        </div>
        <div className="w-px h-8 bg-slate-800"></div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Connect the dots <br/> lead the future</p>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default StudioCover;
