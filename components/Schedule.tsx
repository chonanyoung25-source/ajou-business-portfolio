
import React, { useState, useRef } from 'react';

interface Step {
  title: string;
  desc: string;
  icon: string;
  color: string;
  accent: string;
  pattern: React.ReactNode;
}

const ScheduleCard: React.FC<{ step: Step; index: number; onClick?: () => void }> = ({ step, index, onClick }) => {
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

  return (
    <div 
      className="perspective-1000 w-full group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
      }}
      onClick={onClick}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        className={`
          relative overflow-hidden p-12 bg-white border border-slate-100 rounded-[3.5rem] 
          shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] transition-all duration-500
          group-hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] group-hover:border-transparent
          flex flex-col items-center text-center h-full
        `}
      >
        {/* Dynamic Spotlight Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${spotlight.x}px ${spotlight.y}px, ${step.accent}20 0%, transparent 70%)`,
          }}
        ></div>

        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
          {step.pattern}
        </div>

        {/* Floating Icon Container */}
        <div className={`
          relative z-20 w-24 h-24 rounded-[2.5rem] bg-slate-50 flex items-center justify-center 
          text-5xl mb-10 transition-all duration-700
          group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl
          ${isHovered ? 'animate-bounce' : ''}
        `}
        style={{ boxShadow: isHovered ? `0 20px 40px -10px ${step.accent}40` : '' }}
        >
          {step.icon}
          
          {/* Subtle ring around icon */}
          <div className={`absolute -inset-2 border-2 border-dashed ${step.color} opacity-0 group-hover:opacity-20 rounded-full animate-[spin_10s_linear_infinite]`}></div>
        </div>

        <div className="relative z-20">
          <h4 className={`text-2xl font-black mb-4 transition-colors duration-300 ${isHovered ? 'text-slate-950' : 'text-slate-900'}`}>
            {step.title}
          </h4>
          <p className="text-slate-500 font-medium leading-relaxed max-w-[200px] mx-auto">
            {step.desc}
          </p>
        </div>

        {/* Bottom Number Indicator */}
        <div className="absolute bottom-8 flex items-center gap-3">
          <span className={`text-[10px] font-black tracking-widest uppercase transition-colors duration-500 ${isHovered ? 'text-slate-900' : 'text-slate-200'}`}>
            Phase 0{index + 1}
          </span>
          <div className={`h-px w-8 bg-slate-100 group-hover:w-16 transition-all duration-700 group-hover:bg-slate-900`}></div>
        </div>
      </div>
    </div>
  );
};

interface ScheduleProps {
  onMonthClick?: () => void;
  onTodoClick?: () => void;
  onTimetableClick?: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({ onMonthClick, onTodoClick, onTimetableClick }) => {
  const steps: Step[] = [
    {
      title: "MONTH",
      desc: "우선순위에 기반한 효율적인 시간 할당",
      icon: "📅",
      color: "text-indigo-600",
      accent: "#4f46e5",
      pattern: (
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      )
    },
    {
      title: "TO-DO LIST",
      desc: "필요한 자원과 공간의 선제적 확보",
      icon: "🔒",
      color: "text-emerald-600",
      accent: "#10b981",
      pattern: (
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, #10b981 0.5px, transparent 0.5px), linear-gradient(-45deg, #10b981 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
      )
    },
    {
      title: "Timetable",
      desc: "데이터 기반의 빈틈없는 일정 수행",
      icon: "🚀",
      color: "text-rose-600",
      accent: "#f43f5e",
      pattern: (
        <div className="w-full h-full flex flex-col gap-4 p-4">
           {Array.from({length: 10}).map((_, i) => (
             <div key={i} className="h-px bg-rose-600 w-full" style={{ opacity: (10 - i) / 10 }}></div>
           ))}
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="grid md:grid-cols-3 gap-10">
        {steps.map((step, i) => {
          let clickHandler = undefined;
          if (step.title === 'MONTH') clickHandler = onMonthClick;
          if (step.title === 'TO-DO LIST') clickHandler = onTodoClick;
          if (step.title === 'Timetable') clickHandler = onTimetableClick;
          
          return (
            <ScheduleCard 
              key={i} 
              step={step} 
              index={i} 
              onClick={clickHandler}
            />
          );
        })}
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default Schedule;
