
import React, { useRef, useState } from 'react';

interface AppCardProps {
  app: {
    name: string;
    type: string;
    desc: string;
    glow: string;
    gradient: string;
    image: string;
    link: string;
    bgEmoji: string;
  };
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 15;
    const rotateX = ((y / rect.height) - 0.5) * -15;

    setRotate({ x: rotateX, y: rotateY });
    setSpotlight({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className="flex-none w-[260px] md:w-[370px] snap-center group relative"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        className="relative h-full"
      >
        <div className={`absolute -inset-4 bg-gradient-to-br ${app.gradient} rounded-[4rem] opacity-0 group-hover:opacity-[0.12] blur-[40px] transition-all duration-1000`}></div>
        
        <a 
          href={app.link || '#'} 
          target={app.link ? "_blank" : "_self"}
          className={`
            relative block h-full min-h-[460px] bg-white border border-slate-100 rounded-[4rem] p-10
            shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 
            group-hover:border-transparent flex flex-col overflow-hidden
          `}
        >
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.8) 0%, transparent 60%)`,
              mixBlendMode: 'soft-light'
            }}
          ></div>

          <div className={`absolute top-[-30px] right-[-30px] text-[180px] opacity-[0.03] select-none pointer-events-none transition-all duration-1000 group-hover:scale-110 group-hover:rotate-12 group-hover:translate-x-4 group-hover:translate-y-4`}>
            {app.bgEmoji}
          </div>

          <div className={`
            relative z-10 w-20 h-20 rounded-[2rem] overflow-hidden bg-white
            flex items-center justify-center mb-10 shadow-xl border border-slate-50
            group-hover:scale-110 group-hover:rotate-[-5deg] group-hover:translate-z-10 transition-all duration-500
          `}>
            {app.image ? (
              <img src={app.image} alt={app.name} className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${app.gradient} text-white`}>
                <span className="text-3xl">🚀</span>
              </div>
            )}
          </div>

          <div className="relative z-10 flex-grow group-hover:translate-z-20 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-4">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] bg-blue-50/80 px-3 py-1 rounded-full">{app.type}</p>
            </div>
            <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 group-hover:text-slate-950 transition-colors tracking-tighter leading-tight">
              {app.name}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium group-hover:text-slate-700">
              {app.desc}
            </p>
          </div>
          
          <div className="relative z-10 mt-10 flex items-center gap-4">
            <div className="h-[3px] flex-grow bg-slate-50 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${app.gradient} w-0 group-hover:w-full transition-all duration-1000`}></div>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500 shadow-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

const AppShowcase: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const apps = [
    {
      name: "Google Gemini",
      type: "Multi-modal AI",
      desc: "구글의 최신 멀티모달 AI 기술을 활용하여 텍스트, 이미지, 음성을 통합 이해하고 혁신적인 비즈니스 솔루션을 제안합니다.",
      glow: "hover:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)]",
      gradient: "from-indigo-500 via-blue-600 to-sky-400",
      image: "https://img.etnews.com/news/article/2025/11/19/news-p.v1.20251119.4702eac6599845279da88c9af09d55b6_P1.jpg",
      link: "https://gemini.google.com/app?hl=ko",
      bgEmoji: "🤖"
    },
    {
      name: "Google AI Studio",
      type: "Developer Tool",
      desc: "구글의 최신 모델을 테스트하고 맞춤형 AI 애플리케이션을 신속하게 개발할 수 있는 강력한 브라우저 기반 프로토타이핑 도구입니다.",
      glow: "hover:shadow-[0_40px_100px_-20px_rgba(59,130,246,0.3)]",
      gradient: "from-blue-600 via-indigo-500 to-purple-400",
      image: "https://t1.daumcdn.net/brunch/service/user/3XFk/image/08V84rFaQpuwQDALuy6tM9VemN4.png",
      link: "https://aistudio.google.com/apps",
      bgEmoji: "🛠️"
    },
    {
      name: "Google Labs",
      type: "Experimental AI",
      desc: "구글의 최신 AI 실험 프로젝트들을 가장 먼저 경험하고 창의적인 아이디어를 실현해볼 수 있는 혁신적인 실험 공간입니다.",
      glow: "hover:shadow-[0_40px_100px_-20px_rgba(251,191,36,0.3)]",
      gradient: "from-amber-400 via-orange-500 to-yellow-400",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIAodfn7Is1_l9qWEEWRyXgUk2Tk2o4VApzQ&s",
      link: "https://labs.google/fx/ko",
      bgEmoji: "🧪"
    },
    {
      name: "ChatGPT",
      type: "Conversational AI",
      desc: "OpenAI의 대화형 인공지능으로 복잡한 문제 해결, 창의적 글쓰기, 논리적 추론을 통해 효율적인 경영 의사결정을 지원합니다.",
      glow: "hover:shadow-[0_40px_100px_-20px_rgba(16,185,129,0.3)]",
      gradient: "from-emerald-500 via-green-600 to-teal-400",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      link: "https://chatgpt.com/",
      bgEmoji: "💬"
    },
    {
      name: "Claude",
      type: "Anthropic AI",
      desc: "Anthropic에서 개발한 AI로, 자연스러운 대화와 정교한 글쓰기, 코드 작성 및 데이터 요약에 최적화되어 협업 효율을 극대화합니다.",
      glow: "hover:shadow-[0_40px_100px_-20px_rgba(217,119,87,0.3)]",
      gradient: "from-[#D97757] via-[#B1543A] to-[#8E432E]",
      image: "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/h1Pi/image/pAEjU4qSMy0Mc-x9OUDd8zaPffI.jpg",
      link: "https://claude.ai/new",
      bgEmoji: "🎭"
    },
    {
      name: "NotebookLM",
      type: "AI Research tool",
      desc: "구글의 AI 기반 개인화 연구 도구로, 문서 업로드와 분석을 통해 통찰력 있는 요약과 오디오 브리핑을 생성하여 학습 효율을 높입니다.",
      glow: "hover:shadow-[0_40px_100px_-20px_rgba(59,130,246,0.3)]",
      gradient: "from-blue-500 via-indigo-500 to-cyan-400",
      image: "https://aimatters.co.kr/wp-content/uploads/2025/09/AI-Matters-%EA%B8%B0%EC%82%AC-%EC%8D%B8%EB%84%A4%EC%9D%BC-google-notebooklm.jpg",
      link: "https://notebooklm.google.com/?icid=home_maincta&_gl=1*lun8b5*_up*MQ..*_ga*MjAzNzI5MjAwLjE3NjgwNTI3Mjk.*_ga_W0LDH41ZCB*czE3NjgwNTI3MjkkbzEkZzAkdDE3NjgwNTI3MjkkajYwJGwwJGww",
      bgEmoji: "📓"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
      {/* Featured App Showcase Cover (Scaled down by ~20%) */}
      <section className="mb-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black text-slate-950 text-center mb-16 max-w-3xl tracking-tight leading-tight px-4 animate-fade-in">
          An Intelligent & Proven Way to Transform <br className="hidden md:block" />
          <span className="instagram-dynamic">AI APP</span>
        </h1>

        <div className="relative w-full max-w-2xl aspect-[16/10] md:aspect-[16/8] flex justify-center items-center pointer-events-none select-none">
          {/* Background Decorative Grid/Dots */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative flex items-center justify-center w-full h-full perspective-1000">
            
            {/* Left Page Layer (Text Detail) */}
            <div className="absolute left-[5%] md:left-[15%] w-[45%] h-[80%] bg-white border border-slate-100 rounded-lg shadow-xl -rotate-6 transform origin-bottom-right z-0 animate-fade-in-up [animation-delay:0.2s] p-6 overflow-hidden opacity-60 md:opacity-100">
               <div className="w-6 h-6 bg-slate-50 rounded mb-3"></div>
               <div className="space-y-2">
                 <div className="w-full h-1.5 bg-slate-100 rounded"></div>
                 <div className="w-4/5 h-1.5 bg-slate-100 rounded"></div>
                 <div className="w-full h-1.5 bg-slate-100 rounded"></div>
               </div>
            </div>

            {/* Right Page Layer (Graph Detail) */}
            <div className="absolute right-[5%] md:right-[15%] w-[45%] h-[80%] bg-white border border-slate-100 rounded-lg shadow-xl rotate-6 transform origin-bottom-left z-0 animate-fade-in-up [animation-delay:0.4s] p-6 overflow-hidden opacity-60 md:opacity-100">
               <div className="w-full h-1.5 bg-slate-100 rounded mb-4"></div>
               <div className="relative w-full aspect-square border-l-2 border-b-2 border-slate-100 mt-2">
                  <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,100 Q20,80 40,90 T80,10 T100,20" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="1000" className="animate-[shimmer_3s_infinite_linear]" />
                  </svg>
               </div>
            </div>

            {/* Center Featured Book/Card Layer (Scaled down) */}
            <div className="relative z-10 w-[190px] md:w-[270px] aspect-[3/4] bg-white border border-slate-100 rounded-xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] animate-float flex flex-col p-8 md:p-11 text-center border-l-[6px] border-indigo-600 group">
              
              {/* Featured Circular Badge (Scaled down) */}
              <div className="absolute -top-10 -right-6 md:-top-14 md:-right-10 w-20 h-20 md:w-26 md:h-26 bg-indigo-100 border-4 border-white rounded-full flex flex-col items-center justify-center text-center shadow-2xl animate-pulse">
                 <span className="text-[7px] md:text-[9px] font-black text-indigo-900 tracking-tighter uppercase mb-0.5">NY AI</span>
                 <span className="text-xs md:text-lg font-black text-indigo-600 leading-tight">ECO<br/>SYSTEM</span>
                 <span className="text-[6px] md:text-[8px] font-bold text-slate-400 uppercase mt-0.5 tracking-widest">2025 ver.</span>
              </div>

              <div className="mb-6 opacity-40">
                 <p className="text-[8px] font-black tracking-widest text-slate-400 uppercase">Management & Innovation</p>
              </div>

              <div className="flex-grow flex flex-col justify-center gap-3">
                 <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-[0.85] tracking-tighter transition-all group-hover:scale-110">
                    <span className="text-indigo-600">Smart</span> <br/>
                    Visionary
                 </h2>
                 <div className="w-10 h-0.5 bg-slate-100 mx-auto rounded-full my-3"></div>
                 <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
                    A Comprehensive Guide to <br/>
                    AI-Driven Business Optimization
                 </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50">
                <p className="text-xs md:text-base font-black text-slate-900 uppercase tracking-widest">Cho Nanyoung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-16 text-center md:text-left">
        <h2 className="text-[11px] font-black tracking-[0.6em] text-blue-600 uppercase mb-4">Digital Production</h2>
        <div className="flex items-end gap-4">
           <h3 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter leading-none uppercase">TOOLS</h3>
           <div className="h-0.5 flex-grow bg-slate-100 mb-2 rounded-full"></div>
        </div>
      </div>

      <div className="relative group/container">
        {/* Left Floating Arrow Button */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/70 backdrop-blur-xl border border-slate-100 shadow-2xl flex items-center justify-center text-slate-900 hover:bg-slate-950 hover:text-white hover:scale-110 transition-all duration-300 opacity-0 group-hover/container:opacity-100 hidden md:flex"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Floating Arrow Button */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/70 backdrop-blur-xl border border-slate-100 shadow-2xl flex items-center justify-center text-slate-900 hover:bg-slate-950 hover:text-white hover:scale-110 transition-all duration-300 opacity-0 group-hover/container:opacity-100 hidden md:flex"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-20 px-4 items-stretch"
          style={{ scrollBehavior: 'smooth' }}
        >
          {apps.map((app, idx) => (
            <AppCard key={idx} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
