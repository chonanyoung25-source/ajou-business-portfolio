
import React from 'react';

interface CurriculumProps {
  onCourseClick: (courseName: string) => void;
}

const Curriculum: React.FC<CurriculumProps> = ({ onCourseClick }) => {
  const courses = [
    {
      name: "경제원론",
      eng: "Principles of Economics",
      category: "Foundation",
      desc: "시장 메커니즘과 자원 배분의 최적화 원리를 파악하여 거시적 안목 배양.",
      gradient: "from-indigo-500 to-blue-500",
      glow: "group-hover:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)]",
      customPage: true,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      bgIcon: (
        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      name: "경영최적화",
      eng: "Management Optimization",
      category: "Strategy",
      desc: "수학적 모델을 활용한 효율적 의사결정과 프로세스 혁신 방법론 습득.",
      gradient: "from-blue-600 to-cyan-500",
      glow: "group-hover:shadow-[0_40px_100px_-20px_rgba(37,99,235,0.3)]",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 011 1v8a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      bgIcon: (
        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 011 1v8a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: "회계학원론",
      eng: "Principles of Accounting",
      category: "Finance",
      desc: "재무제표의 구조를 이해하고 기업의 언어로 경영 성과를 측정하는 역량.",
      gradient: "from-emerald-500 to-teal-600",
      glow: "group-hover:shadow-[0_40px_100px_-20px_rgba(16,185,129,0.3)]",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      bgIcon: (
        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: "이문화관리",
      eng: "Cross-Cultural Management",
      category: "Global",
      desc: "다양한 문화권의 비즈니스 관습과 글로벌 리더십 전략 탐구.",
      gradient: "from-rose-500 to-orange-500",
      glow: "group-hover:shadow-[0_40px_100px_-20px_rgba(244,63,94,0.3)]",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      name: "비즈니스영어",
      eng: "Business English",
      category: "Communication",
      desc: "글로벌 비즈니스 환경에서의 효과적인 커뮤니케이션과 협상 기술.",
      gradient: "from-violet-600 to-indigo-500",
      glow: "group-hover:shadow-[0_40px_100px_-20px_rgba(139,92,246,0.3)]",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      bgIcon: (
        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      name: "통계적 데이터분석",
      eng: "Statistical Data Analysis",
      category: "Data",
      desc: "확률 모델과 추론 통계를 활용하여 비정형 데이터에서 인사이트 추출.",
      gradient: "from-orange-500 to-yellow-500",
      glow: "group-hover:shadow-[0_40px_100px_-20px_rgba(249,115,22,0.3)]",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      bgIcon: (
        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-20">
        <h2 className="text-[10px] font-black tracking-[0.5em] text-blue-600 uppercase mb-4">Academic Journey</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter">전공과목</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course, idx) => (
          <div key={idx} className="group relative cursor-pointer" onClick={() => onCourseClick(course.name)}>
            <div className={`absolute -inset-2 bg-gradient-to-br ${course.gradient} rounded-[3rem] opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-700`}></div>
            
            <div className={`
              relative h-full bg-white border border-slate-100 rounded-[3rem] p-10 
              shadow-soft transition-all duration-700 
              group-hover:translate-y-[-12px] group-hover:border-transparent 
              flex flex-col ${course.glow} overflow-hidden
            `}>
              <div className={`absolute top-[-20px] right-[-20px] opacity-[0.03] text-slate-950 group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000 pointer-events-none`}>
                {course.bgIcon}
              </div>

              <div className={`
                relative z-10 w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${course.gradient} 
                flex items-center justify-center text-white mb-10 shadow-lg 
                group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-500
              `}>
                {course.icon}
              </div>

              <div className="relative z-10 flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{course.category}</p>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-slate-950 transition-colors">{course.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 opacity-60">{course.eng}</p>
                <p className="text-[13px] text-slate-500 leading-relaxed font-medium group-hover:text-slate-600">
                  {course.desc}
                </p>
              </div>
              
              <div className="relative z-10 mt-10 flex items-center gap-3">
                <div className="h-[2px] flex-grow bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${course.gradient} w-0 group-hover:w-full transition-all duration-1000`}></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;
