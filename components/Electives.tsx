
import React from 'react';

const Electives: React.FC = () => {
  const subjects = [
    {
      name: "문학과 미디어",
      category: "Humanities",
      desc: "고전 서사의 현대적 변주 분석을 통한 인문학적 상상력 배양.",
      gradient: "from-amber-400 to-orange-500",
      glow: "group-hover:shadow-[0_40px_100px_-20px_rgba(245,158,11,0.3)]",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      bgIcon: (
        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      name: "영어",
      category: "Language",
      desc: "글로벌 비즈니스 필수 커뮤니케이션 능력과 영문 텍스트 분석.",
      gradient: "from-sky-400 to-blue-500",
      glow: "group-hover:shadow-[0_40px_100px_-20px_rgba(14,165,233,0.3)]",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.5M14 22c0-5.523-4.477-10-10-10a10 10 0 0110 10z" />
        </svg>
      ),
      bgIcon: (
        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.5M14 22c0-5.523-4.477-10-10-10a10 10 0 0110 10z" />
        </svg>
      )
    },
    {
      name: "발명과 특허",
      category: "Innovation",
      desc: "아이디어의 지식재산권화 과정 이해 및 법적 보호 전략 학습.",
      gradient: "from-yellow-400 to-amber-600",
      glow: "group-hover:shadow-[0_40px_100px_-20px_rgba(234,179,8,0.3)]",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      bgIcon: (
        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      name: "아주상상프로젝트",
      category: "Project",
      desc: "학제 간 팀워크를 통한 사회 문제 발견 및 창의적 해결책 도출.",
      gradient: "from-purple-500 to-pink-600",
      glow: "group-hover:shadow-[0_40px_100px_-20px_rgba(168,85,247,0.3)]",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      bgIcon: (
        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-14">
        <h2 className="text-[10px] font-black tracking-[0.5em] text-amber-600 uppercase mb-4">Liberal Arts</h2>
        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tighter">교양과목</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {subjects.map((sub, idx) => (
          <div key={idx} className="group relative">
            <div className={`absolute -inset-2 bg-gradient-to-br ${sub.gradient} rounded-[3rem] opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-700`}></div>
            
            <div className={`
              relative h-full bg-white border border-slate-100 rounded-[3rem] p-10 
              shadow-soft transition-all duration-700 
              group-hover:translate-y-[-12px] group-hover:border-transparent 
              flex flex-col ${sub.glow} overflow-hidden
            `}>
              {/* Subtle Background Icon */}
              <div className={`absolute top-[-20px] right-[-20px] opacity-[0.03] text-slate-950 group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-1000 pointer-events-none`}>
                {sub.bgIcon}
              </div>

              <div className={`
                relative z-10 w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${sub.gradient} 
                flex items-center justify-center text-white mb-10 shadow-lg 
                group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-500
              `}>
                {sub.icon}
              </div>

              <div className="relative z-10 flex-grow">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{sub.category}</p>
                <h4 className="text-xl font-black text-slate-900 mb-6 group-hover:text-slate-950 transition-colors">{sub.name}</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed font-medium group-hover:text-slate-600">
                  {sub.desc}
                </p>
              </div>
              
              <div className="relative z-10 mt-10 flex items-center gap-3">
                <div className="h-[2px] flex-grow bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${sub.gradient} w-0 group-hover:w-full transition-all duration-1000`}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electives;
