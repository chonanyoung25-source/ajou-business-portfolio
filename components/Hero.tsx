
import React, { useEffect, useState, useRef, useMemo } from 'react';

// 퍼즐 조각의 상/하/좌/우 모양을 결정하는 타입
type SideType = 'tab' | 'blank' | 'flat';

interface PuzzlePieceProps {
  row: number;
  col: number;
  rows: number;
  cols: number;
  isSolved: boolean;
  mousePos: { x: number; y: number };
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ row, col, rows, cols, isSolved, mousePos }) => {
  const i = row * cols + col;

  const pieceShape = useMemo(() => {
    const top: SideType = row === 0 ? 'flat' : (Math.random() > 0.5 ? 'tab' : 'blank');
    const bottom: SideType = row === rows - 1 ? 'flat' : (Math.random() > 0.5 ? 'tab' : 'blank');
    const left: SideType = col === 0 ? 'flat' : (Math.random() > 0.5 ? 'tab' : 'blank');
    const right: SideType = col === cols - 1 ? 'flat' : (Math.random() > 0.5 ? 'tab' : 'blank');
    
    let path = "M 20,20 ";
    if (top === 'flat') path += "L 80,20 ";
    else if (top === 'tab') path += "L 40,20 C 40,0 60,0 60,20 L 80,20 ";
    else path += "L 40,20 C 40,40 60,40 60,20 L 80,20 ";
    
    if (right === 'flat') path += "L 80,80 ";
    else if (right === 'tab') path += "L 80,40 C 100,40 100,60 80,60 L 80,80 ";
    else path += "L 80,40 C 60,40 60,60 80,60 L 80,80 ";
    
    if (bottom === 'flat') path += "L 20,80 ";
    else if (bottom === 'tab') path += "L 60,80 C 60,100 40,100 40,80 L 20,80 ";
    else path += "L 60,80 C 60,60 40,60 40,80 L 20,80 ";
    
    if (left === 'flat') path += "Z";
    else if (left === 'tab') path += "L 20,60 C 0,60 0,40 20,40 Z";
    else path += "L 20,60 C 40,60 40,40 20,40 Z";

    return path;
  }, [row, col, rows, cols]);

  const randomInit = useMemo(() => ({
    x: (Math.random() - 0.5) * 2500,
    y: (Math.random() - 0.5) * 2500,
    z: Math.random() * 2000 + 1000,
    rotateX: (Math.random() - 0.5) * 360,
    rotateY: (Math.random() - 0.5) * 360,
    rotateZ: (Math.random() - 0.5) * 360,
    delay: (row + col) * 5 + Math.random() * 30, 
    floatDelay: Math.random() * 5,
  }), [row, col]);

  const parallaxX = mousePos.x * (15 + Math.random() * 10);
  const parallaxY = mousePos.y * (15 + Math.random() * 10);

  return (
    <div 
      className={`absolute transition-all ${isSolved ? 'animate-idle-float' : ''}`}
      style={{
        width: `${100 / cols}%`,
        height: `${100 / rows}%`,
        left: `${(col / cols) * 100}%`,
        top: `${(row / rows) * 100}%`,
        transform: isSolved 
          ? `translate3d(${parallaxX}px, ${parallaxY}px, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)` 
          : `translate3d(${randomInit.x}px, ${randomInit.y}px, ${randomInit.z}px) rotateX(${randomInit.rotateX}deg) rotateY(${randomInit.rotateY}deg) rotateZ(${randomInit.rotateZ}deg)`,
        opacity: isSolved ? 0.95 : 0,
        transitionDuration: isSolved ? '700ms' : '400ms',
        transitionDelay: isSolved ? `${randomInit.delay}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
        zIndex: isSolved ? 0 : 50,
        animationDelay: isSolved ? `${randomInit.floatDelay}s` : '0s'
      } as React.CSSProperties}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-[125%] h-[125%] -translate-x-[12%] -translate-y-[12%] filter drop-shadow-xl"
      >
        <path 
          d={pieceShape} 
          fill={i % 7 === 0 ? '#F8FAFC' : 'transparent'} 
          stroke="#E2E8F0" 
          strokeWidth="0.6"
          className="transition-colors duration-1000"
        />
        <path 
          d={pieceShape} 
          fill="none" 
          stroke="white" 
          strokeWidth="0.3" 
          strokeOpacity="0.6"
          className="translate-x-[-0.6px] translate-y-[-0.6px]"
        />
      </svg>
    </div>
  );
};

interface PuzzleBackgroundProps {
  resetKey: number;
}

const PuzzleBackground: React.FC<PuzzleBackgroundProps> = ({ resetKey }) => {
  const [isSolved, setIsSolved] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: number;
    
    const startCycle = () => {
      setIsSolved(true);
      timeoutId = window.setTimeout(() => {
        setIsSolved(false);
        timeoutId = window.setTimeout(startCycle, 600);
      }, 2000);
    };

    setIsSolved(false);
    timeoutId = window.setTimeout(startCycle, 0);

    return () => window.clearTimeout(timeoutId);
  }, [resetKey]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const rows = 6;
  const cols = 8;
  const pieces = Array.from({ length: rows * cols });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 pointer-events-none overflow-hidden bg-white"
      style={{ perspective: '2000px' }}
    >
      <div className="relative w-full h-full">
        {pieces.map((_, i) => (
          <PuzzlePiece 
            key={`${resetKey}-${i}`} 
            row={Math.floor(i / cols)} 
            col={i % cols} 
            rows={rows} 
            cols={cols} 
            isSolved={isSolved}
            mousePos={mousePos}
          />
        ))}
      </div>
      
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent pointer-events-none transition-opacity duration-[2000ms] ${isSolved ? 'opacity-100 animate-light-sweep' : 'opacity-0'}`} 
        style={{ transform: 'rotate(45deg) scale(4)' }}
      ></div>
    </div>
  );
};

interface HeroProps {
  resetKey: number;
}

const Hero: React.FC<HeroProps> = ({ resetKey }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const keywords = [
    {
      id: "01",
      title: "전문성 (Expertise)",
      desc: "경영학적 원리와 데이터 분석 툴을 결합한 실무적 통찰력"
    },
    {
      id: "02",
      title: "최적화 (Optimization)",
      desc: "제한된 자원 속에서 최상의 성과를 도출하는 전략적 사고"
    },
    {
      id: "03",
      title: "적응력 (Adaptability)",
      desc: "빠르게 변화하는 시장 환경을 유연하게 리딩하는 능력"
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-hidden">
      <PuzzleBackground resetKey={resetKey} />
      
      <div className="absolute top-[-5%] left-[-5%] w-[60vw] h-[60vw] bg-indigo-50/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-rose-50/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow [animation-delay:2s]"></div>

      <div className="flex-grow flex items-center pt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md text-slate-500 text-[10px] font-bold mb-12 border border-slate-100 shadow-sm uppercase tracking-[0.3em]">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              Business Strategy Designer
            </div>
            
            <h1 className="text-[3.2rem] md:text-[5.8rem] font-extrabold text-slate-950 leading-[0.95] tracking-tighter mb-10 lowercase">
              <span className="instagram-dynamic py-2">cho</span> <br />
              <span className="instagram-dynamic py-2">nanyoung</span>
            </h1>
            
            <div className="relative mb-14">
              <div className="absolute left-0 top-0 w-1 h-full bg-indigo-600/20"></div>
              <p className="text-xl md:text-2xl text-slate-500 pl-8 max-w-2xl leading-relaxed font-medium italic break-keep">
                "다양한 AI 기술을 활용하여 <br />
                경영학의 지표를 바꾸고 창조적 가치를 창출합니다."
              </p>
            </div>

            <div className="flex items-center gap-8">
              <a 
                href="#projects" 
                onClick={(e) => handleScroll(e, 'projects')}
                className="group relative px-14 py-5 bg-slate-950 text-white rounded-full font-bold overflow-hidden transition-all shadow-2xl hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 text-[11px] tracking-[0.25em] uppercase">Enter Portfolio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </a>
              
              <div className="flex -space-x-3">
                {['MKT', 'SQL', 'BI'].map((tool, i) => (
                  <div key={tool} className="w-12 h-12 rounded-full border-2 border-white bg-slate-50 shadow-sm flex items-center justify-center text-[8px] font-black text-slate-400 transition-all hover:translate-y-[-6px] hover:z-10 hover:bg-slate-900 hover:text-white cursor-default uppercase">
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-lg glass-card rounded-[4rem] p-12 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-white/50 relative z-10 animate-fade-in-up">
              <div className="space-y-16">
                {keywords.map((kw, idx) => (
                  <div key={kw.id} className="group relative transition-all duration-500 hover:translate-x-3">
                    <div className="flex items-center gap-5 mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center text-[11px] font-black group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                        {kw.id}
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight">{kw.title}</h4>
                    </div>
                    <p className="text-slate-500 leading-relaxed font-medium pl-14 border-l border-slate-100 group-hover:border-indigo-200 transition-colors">
                      {kw.desc}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-3xl shadow-soft flex items-center justify-center animate-float">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 011 1v8a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>

            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply blur-[120px] opacity-10 animate-pulse"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply blur-[120px] opacity-10 animate-pulse [animation-delay:2s]"></div>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden h-24 md:h-32 mt-auto">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(79, 70, 229, 0.04)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(37, 99, 235, 0.03)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255, 255, 255, 0.6)" />
          </g>
        </svg>
      </div>

      <style>{`
        @keyframes idle-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(3px, -5px) rotate(1deg); }
          66% { transform: translate(-2px, 3px) rotate(-1deg); }
        }
        .animate-idle-float {
          animation: idle-float 8s ease-in-out infinite;
        }

        @keyframes light-sweep {
          0% { transform: translateX(-150%) rotate(45deg) scale(4); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateX(150%) rotate(45deg) scale(4); opacity: 0; }
        }
        .animate-light-sweep {
          animation: light-sweep 10s linear infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.1); opacity: 0.25; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
