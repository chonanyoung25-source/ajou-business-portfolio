
import React, { useState, useEffect, useMemo } from 'react';

interface WorkCoverProps {
  resetKey?: number;
}

const WorkCover: React.FC<WorkCoverProps> = ({ resetKey = 0 }) => {
  const [isAssembled, setIsAssembled] = useState(false);

  useEffect(() => {
    // resetKey가 변경될 때마다 애니메이션 즉시 초기화 후 빠르게 실행
    setIsAssembled(false);
    // 딜레이를 150ms -> 30ms로 대폭 단축
    const timer = setTimeout(() => setIsAssembled(true), 30);
    return () => clearTimeout(timer);
  }, [resetKey]);

  const segments = 16; // 원기둥을 구성할 수직 분면 수
  const rows = 5;      // 원기둥의 높이 층수
  const radius = 220;  // 원기둥의 반지름

  const pieces = useMemo(() => {
    return Array.from({ length: segments * rows }).map((_, i) => {
      const row = Math.floor(i / segments);
      const col = i % segments;
      
      return {
        id: i,
        row,
        col,
        // 초기 흩어진 위치 (3D 공간상 랜덤 좌표)
        initX: (Math.random() - 0.5) * 2200,
        initY: (Math.random() - 0.5) * 1800,
        initZ: (Math.random() - 0.5) * 3500,
        // 초기 랜덤 회전값
        initRotateX: Math.random() * 720,
        initRotateY: Math.random() * 720,
        initRotateZ: Math.random() * 720,
        // 조립 시 순차적 느낌을 위한 랜덤 딜레이 (800ms -> 300ms로 단축)
        delay: Math.random() * 300,
      };
    });
  }, []);

  // 배경 그래프 경로 생성
  const graphPath = "M0,100 L50,80 L100,90 L150,60 L200,70 L250,30 L300,50 L350,20 L400,40 L450,10 L500,30 L550,0 L600,20 L650,-10 L700,10 L750,-30 L800,-10";

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      {/* Dynamic Background Data Graph */}
      <div className="absolute inset-0 z-0 opacity-20 flex items-center justify-center">
        <svg 
          viewBox="0 -50 800 200" 
          className="w-[120%] h-auto transform scale-150 rotate-[-2deg]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#03C75A" stopOpacity="0" />
              <stop offset="50%" stopColor="#03C75A" stopOpacity="1" />
              <stop offset="100%" stopColor="#03C75A" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Grid Lines */}
          <g className="stroke-white/5 stroke-[0.5]">
            {[0, 50, 100, 150].map(y => (
              <line key={y} x1="0" y1={y} x2="800" y2={y} />
            ))}
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1={i * 50} y1="-50" x2={i * 50} y2="150" />
            ))}
          </g>

          {/* Main Animated Graph Line (애니메이션 시간 5s -> 3s 단축) */}
          <path
            d={graphPath}
            fill="none"
            stroke="url(#graphGradient)"
            strokeWidth="2"
            strokeDasharray="2000"
            strokeDashoffset="2000"
            filter="url(#glow)"
            className={`transition-all duration-[3000ms] ease-in-out ${isAssembled ? 'animate-draw-graph' : ''}`}
          />
        </svg>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 opacity-10 blur-[150px] scale-150 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, #dc2743 0%, #bc1888 30%, transparent 70%)' }}></div>
      
      {/* Overlay Text Content */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-fade-in">
          <span className="text-[10px] font-black tracking-[0.4em] text-pink-500 uppercase">Strategic Architecture</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase animate-fade-in-up">
          Key <br />
          Projects
        </h2>
      </div>

      {/* 3D Scene Container */}
      <div className="relative w-full h-full flex items-center justify-center perspective-[2000px] z-10">
        <div 
          className={`relative w-0 h-0 preserve-3d transition-transform duration-[12000ms] ease-linear ${isAssembled ? 'animate-cylinder-rotation' : ''}`}
        >
          {pieces.map((p) => {
            const angle = (p.col / segments) * 360;
            const yPos = (p.row - (rows - 1) / 2) * 85;

            return (
              <div
                key={`${resetKey}-${p.id}`}
                className="absolute preserve-3d transition-all duration-[1200ms] cubic-bezier(0.19, 1, 0.22, 1)"
                style={{
                  width: '70px',
                  height: '80px',
                  left: '-35px',
                  top: '-40px',
                  transform: isAssembled
                    ? `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yPos}px)`
                    : `translate3d(${p.initX}px, ${p.initY}px, ${p.initZ}px) rotateX(${p.initRotateX}deg) rotateY(${p.initRotateY}deg) rotateZ(${p.initRotateZ}deg)`,
                  opacity: isAssembled ? 1 : 0,
                  transitionDelay: isAssembled ? `${p.delay}ms` : '0ms',
                }}
              >
                <div className="w-full h-full relative group preserve-3d">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f09433]/90 via-[#dc2743]/90 to-[#bc1888]/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                       <div className="absolute top-1/2 left-0 w-full h-px bg-white"></div>
                       <div className="absolute left-1/2 top-0 w-px h-full bg-white"></div>
                    </div>
                    <span className="text-[8px] font-black text-white/40 select-none">NY</span>
                    <div className="absolute top-1 left-1 right-1 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-lg"></div>
                  </div>
                  <div className={`absolute -inset-1 bg-pink-500/20 blur-sm rounded-xl opacity-0 ${isAssembled ? 'animate-pulse opacity-100' : ''}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Narrative Caption */}
      <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 text-center z-30 transition-opacity duration-1000 ${isAssembled ? 'opacity-100 delay-[1000ms]' : 'opacity-0'}`}>
        <p className="text-white/60 font-medium text-lg md:text-xl max-w-xl mx-auto leading-relaxed italic">
          "파편화된 아이디어와 데이터의 조각들을 <br />
          하나의 견고한 비즈니스 로직으로 구축합니다."
        </p>
      </div>

      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        @keyframes cylinder-rotation {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        @keyframes draw-graph {
          0% { stroke-dashoffset: 2000; }
          100% { stroke-dashoffset: 0; }
        }

        .animate-draw-graph {
          animation: draw-graph 3s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        .animate-cylinder-rotation {
          animation: cylinder-rotation 25s linear infinite;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default WorkCover;
