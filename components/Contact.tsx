
import React, { useState, useRef } from 'react';

const Contact: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const contactItems = [
    {
      label: "Email",
      value: "young202520961@ajou.ac.kr",
      href: "mailto:young202520961@ajou.ac.kr",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: "Phone",
      value: "010-7531-6619",
      href: "tel:010-7531-6619",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative bg-slate-950 rounded-[3.5rem] p-10 md:p-16 text-center overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 hover:scale-[1.01]"
      >
        {/* Dynamic Interactive Background (Glow 유지) */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-25 group-hover:opacity-50"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(79, 70, 229, 0.2) 0%, transparent 60%)`
          }}
        ></div>
        
        {/* Animated Background Orbs */}
        <div className="absolute top-[-15%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[9px] font-black tracking-[0.3em] uppercase mb-6 backdrop-blur-md">
            <span className="w-1 h-1 bg-indigo-500 rounded-full animate-ping"></span>
            Open for Opportunities
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
            Let's Shape the <br />
            <span className="instagram-dynamic">Future Together</span>
          </h2>
          
          <p className="text-slate-400 text-base md:text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed opacity-90">
            창의적인 아이디어와 데이터 기반의 전략이 만나는 지점에서 <br className="hidden md:block" />
            새로운 가치를 함께 만들어가고 싶습니다.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-5 md:gap-8">
            {contactItems.map((item, idx) => (
              <a 
                key={idx}
                href={item.href} 
                className="group/item flex flex-col items-center gap-3 p-6 md:p-7 rounded-[2rem] bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:translate-y-[-6px] shadow-xl backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-900/50 group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-500">
                  {item.icon}
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-base md:text-lg font-bold text-white tracking-tight">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
          
          {/* Bottom Decoration ( dots scaled down ) */}
          <div className="mt-16 flex justify-center gap-3">
             {[1, 2, 3].map((i) => (
               <div key={i} className={`w-0.5 h-0.5 rounded-full bg-slate-800 transition-all duration-700 group-hover:scale-y-[3] group-hover:bg-indigo-500 delay-${i * 100}`}></div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
