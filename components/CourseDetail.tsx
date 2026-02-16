
import React, { useState, useEffect, useRef } from 'react';

interface CourseDetailProps {
  onClose: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ onClose }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const syllabus = [
    { id: "part1", part: "Part 1", title: "경제학 시작하기", chapters: ["Chapter 1 경제학의 열 가지 원리", "Chapter 2 경제학자처럼 생각하기", "Chapter 3 상호의존과 거래를 통한 이익"] },
    { id: "part2", part: "Part 2", title: "시장의 작동", chapters: ["Chapter 4 시장에서 작동하는 공급과 수요", "Chapter 5 탄력성: 개념 및 응용", "Chapter 6 공급, 수요, 정부정책"] },
    { id: "part3", part: "Part 3", title: "시장 및 후생", chapters: ["Chapter 7 소비자, 생산자, 시장 효율성", "Chapter 8 응용: 과세에 수반되는 비용", "Chapter 9 응용: 국제무역"] },
    { id: "part4", part: "Part 4", title: "공공부문 경제학", chapters: ["Chapter 10 외부효과", "Chapter 11 공공재와 공유자원", "Chapter 12 의료경제학", "Chapter 13 조세제도의 설계"] },
    { id: "part5", part: "Part 5", title: "기업 행태와 산업조직", chapters: ["Chapter 14 생산비용", "Chapter 15 경쟁시장에서의 기업", "Chapter 16 독점", "Chapter 17 독점적 경쟁", "Chapter 18 과점"] },
    { id: "part6", part: "Part 6", title: "노동시장 경제학", chapters: ["Chapter 19 생산요소시장", "Chapter 20 임금소득과 차별", "Chapter 21 소득 불평등과 빈곤"] },
    { id: "part7", part: "Part 7", title: "미시경제 추가 논제", chapters: ["Chapter 22 소비자 선택 이론", "Chapter 23 미시경제학의 새로운 학습주제"] },
    { id: "part8", part: "Part 8", title: "거시경제학의 자료", chapters: ["Chapter 24 국민소득의 측정", "Chapter 25 생활비의 측정"] },
    { id: "part9", part: "Part 9", title: "장기적으로 본 실물 경제", chapters: ["Chapter 26 생산과 성장", "Chapter 27 저축, 투자, 금융제도", "Chapter 28 기본적인 재무분석 방법", "Chapter 29 실업"] },
    { id: "part10", part: "Part 10", title: "장기적으로 본 화폐 및 물가", chapters: ["Chapter 30 화폐제도", "Chapter 31 통화 증가와 인플레이션"] },
    { id: "part11", part: "Part 11", title: "개방거시경제", chapters: ["Chapter 32 개방거시경제: 기본 개념", "Chapter 33 개방거시경제: 이론"] },
    { id: "part12", part: "Part 12", title: "단기적으로 본 경제 변동", chapters: ["Chapter 34 총수요 및 총공급 모형", "Chapter 35 통화정책 및 재정정책이 총수요에 미치는 영향", "Chapter 36 인플레이션과 실업의 단기적 상충관계"] },
    { id: "part13", part: "Part 13", title: "거시경제 끝맺기", chapters: ["Chapter 37 거시경제 정책에 관한 여섯 가지 논쟁", "Chapter 38 부록: 경제학자들의 데이터 활용방법"] }
  ];

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-[#FCFBF7] overflow-y-auto no-scrollbar animate-fade-in text-slate-900"
    >
      {/* Top Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#8B2323] z-[220] transition-all duration-300" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#F5F0E6] rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-[#EFEDE6] rounded-full blur-[100px] opacity-30"></div>
      </div>

      {/* Floating Controls */}
      <div className="fixed top-8 right-8 flex items-center gap-4 z-[210]">
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-xl border border-slate-200 rounded-full shadow-soft hover:bg-slate-900 hover:text-white transition-all duration-500"
        >
          <span className="text-[10px] font-black tracking-widest uppercase">CLOSE</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-12">
               <div className="h-[1px] w-12 bg-[#8B2323]"></div>
               <span className="text-[11px] font-black tracking-[0.4em] text-[#8B2323] uppercase">Course Profile</span>
            </div>
            
            <h1 className="text-7xl md:text-[8rem] font-serif italic text-slate-950 leading-[0.9] tracking-tighter mb-12">
              경제원론<span className="text-slate-200 ml-4 font-sans not-italic">1</span>
            </h1>
            
            <div className="space-y-8 mb-16 border-l border-slate-100 pl-8">
              <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl">
                세상의 작동 원리를 파악하는 <span className="text-slate-900 font-black">경제학의 정수</span>. <br />
                우리의 모든 선택은 경제적입니다.
              </p>
              <p className="text-base text-slate-400 leading-relaxed max-w-lg">
                단순한 수식을 넘어, 인간 행동의 본질과 사회적 상호작용의 거시적 흐름을 '맨큐의 경제학'이라는 아카이브를 통해 탐구합니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <button className="px-10 py-5 bg-slate-950 text-white rounded-2xl font-bold tracking-widest text-[11px] uppercase hover:scale-105 hover:bg-[#8B2323] transition-all shadow-xl">
                Study Materials
              </button>
              <a href="#syllabus" className="px-10 py-5 bg-white border border-slate-100 text-slate-950 rounded-2xl font-bold tracking-widest text-[11px] uppercase hover:bg-slate-50 transition-all shadow-sm">
                Explore Syllabus
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end perspective-1000">
            <div className="relative animate-float group">
              <div className="absolute inset-0 bg-slate-900/10 blur-[80px] rounded-full group-hover:bg-[#8B2323]/10 transition-colors duration-1000"></div>
              
              <div className="relative z-10 w-[320px] md:w-[460px] transform-gpu transition-all duration-1000 group-hover:rotate-y-12 group-hover:rotate-x-6">
                <img 
                  src="https://image.yes24.com/Goods/142691383/XL" 
                  alt="맨큐의 경제학 10판" 
                  className="w-full rounded-sm shadow-[20px_40px_80px_rgba(0,0,0,0.3)] border-l-[6px] border-[#8B2323]"
                />
                
                {/* Info Card Overlay */}
                <div className="absolute -bottom-10 -left-10 md:-left-20 bg-white/90 backdrop-blur-2xl p-8 rounded-3xl border border-white shadow-soft max-w-xs animate-fade-in-up [animation-delay:1s]">
                  <p className="text-[10px] font-black text-[#8B2323] uppercase tracking-widest mb-3">Core Textbook</p>
                  <p className="text-lg font-black text-slate-900 tracking-tight leading-tight">Mankiw's Principles of Economics</p>
                  <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span>10th Edition</span>
                    <span>N. Gregory Mankiw</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Grid Section */}
      <section id="syllabus" className="relative py-40">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex flex-col items-center mb-32 text-center">
            <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#8B2323] mb-12"></div>
            <h2 className="text-[13px] font-black tracking-[0.6em] text-[#8B2323] uppercase mb-6">Curriculum Blueprint</h2>
            <h3 className="text-6xl md:text-8xl font-serif italic text-slate-950 tracking-tighter">아카이브 목차</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {syllabus.map((part, idx) => (
              <div 
                key={part.id} 
                className="group opacity-0 animate-fade-in-up" 
                style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="relative mb-10 overflow-hidden">
                  <span className="text-[4rem] font-black text-slate-100 absolute -top-10 -left-4 select-none group-hover:text-[#F5F0E6] transition-colors duration-500">{part.part}</span>
                  <div className="relative pt-6 pl-2">
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-[#8B2323] transition-all duration-300">
                      {part.title}
                    </h4>
                    <div className="w-12 h-1 bg-[#8B2323] mt-4 transform origin-left group-hover:w-full transition-all duration-700"></div>
                  </div>
                </div>
                
                <ul className="space-y-4 pl-2">
                  {part.chapters.map((chapter, cIdx) => (
                    <li 
                      key={cIdx} 
                      className="flex items-start gap-4 text-slate-500 hover:text-slate-950 transition-all duration-300 cursor-default group/item py-1"
                    >
                      <span className="text-[10px] font-black text-[#8B2323] mt-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity">0{cIdx + 1}</span>
                      <span className="text-[15px] font-medium leading-relaxed group-hover/item:translate-x-1 transition-transform">{chapter}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Inspirational Quote */}
          <div className="mt-60 mb-20 text-center max-w-3xl mx-auto">
            <div className="mb-12 inline-block p-4 bg-slate-50 rounded-2xl">
              <svg className="w-10 h-10 text-[#8B2323] opacity-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.895 14.895 16 16 16L18 16C19.105 16 20 15.105 20 14L20 10C20 8.895 19.105 8 18 8L16 8C14.895 8 14.017 7.105 14.017 6L14.017 3L21 3L21 14C21 17.866 17.866 21 14 21L14.017 21ZM3 14C3 17.866 6.134 21 10 21L10.017 21L10.017 18C10.017 16.895 9.139 16 8.034 16L6.034 16C4.929 16 4.034 15.105 4.034 14L4.034 10C4.034 8.895 4.929 8 6.034 8L8.034 8C9.139 8 10.017 7.105 10.017 6L10.017 3L3.017 3L3.017 14L3 14Z" />
              </svg>
            </div>
            <p className="text-3xl md:text-4xl font-serif italic text-slate-800 leading-tight mb-8">
              "The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design."
            </p>
            <cite className="text-[11px] font-black tracking-widest text-slate-400 uppercase not-italic">— Friedrich Hayek</cite>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="py-24 bg-slate-950 text-white text-center">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-[10px] font-black tracking-[0.5em] text-[#8B2323] uppercase mb-12">Academic Journey Continues</p>
          <button 
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group relative inline-flex flex-col items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#8B2323] group-hover:border-[#8B2323] transition-all duration-500">
               <svg className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
               </svg>
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">Back to Top</span>
          </button>
        </div>
      </footer>

      {/* Global CSS for detail page */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-12 { transform: rotateY(12deg); }
        .rotate-x-6 { transform: rotateX(6deg); }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default CourseDetail;
