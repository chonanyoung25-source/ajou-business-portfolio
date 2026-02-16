
import React, { useState, useRef } from 'react';
import { generateProfessionalImage } from '../services/geminiService';

const AIStudio: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const defaultImageUrl = "https://labs.google/71ddc0ed-40f9-49e4-a6e7-cc04ecb7702a";

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: x * 10, y: y * -10 });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsProcessing(true);
    
    // Preview original
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setOriginalPreview(base64);
      
      try {
        const result = await generateProfessionalImage(
          base64, 
          file.type, 
          "현대적이고 깔끔한 화이트톤의 글로벌 테크 기업 사무실"
        );
        
        if (result) {
          setResultImage(result);
        } else {
          setError("이미지 생성에 실패했습니다. (안전 필터에 의해 차단되었을 수 있습니다)");
        }
      } catch (err) {
        setError("AI 서버 통신 중 오류가 발생했습니다.");
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="mb-24 text-center">
        <h2 className="text-[11px] font-black tracking-[0.6em] text-indigo-500 uppercase mb-4">AI Research Lab</h2>
        <h3 className="text-4xl md:text-6xl font-extrabold text-slate-950 tracking-tighter uppercase mb-6">INSIGHT CONNECTION</h3>
        <div className="w-16 h-1 bg-slate-900 mx-auto rounded-full"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-16 items-start">
        {/* Left: Interactive Lab Canvas */}
        <div className="lg:col-span-7" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => setRotate({x:0, y:0})}>
          <div 
            className="relative aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.3)] bg-slate-950 transition-all duration-700 ease-out"
            style={{ 
              transform: `perspective(1500px) rotateY(${rotate.x}deg) rotateX(${rotate.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Displaying Result or Loading or Default */}
            {isProcessing ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-30">
                 <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-8"></div>
                 <p className="text-indigo-400 font-black text-xs tracking-[0.3em] uppercase animate-pulse">Connecting Chaos into Order...</p>
                 <div className="mt-4 flex gap-2">
                    {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}}></div>)}
                 </div>
              </div>
            ) : resultImage ? (
              <img src={resultImage} alt="AI Result" className="w-full h-full object-cover animate-fade-in" />
            ) : originalPreview ? (
              <div className="relative h-full">
                <img src={originalPreview} alt="Original" className="w-full h-full object-cover opacity-40 grayscale" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <p className="text-white font-bold tracking-widest text-[10px] uppercase">Original Analysis...</p>
                </div>
              </div>
            ) : (
              <img src={defaultImageUrl} alt="Default Insight" className="w-full h-full object-cover opacity-80" />
            )}

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 via-transparent to-white/5 pointer-events-none"></div>
            
            {/* Error Message Toast */}
            {error && (
              <div className="absolute bottom-10 left-10 right-10 bg-rose-500/90 backdrop-blur-xl p-4 rounded-2xl text-white text-[11px] font-bold text-center animate-fade-in">
                {error}
              </div>
            )}

            {/* Framing accents */}
            <div className="absolute inset-10 border border-white/10 rounded-[2.5rem] pointer-events-none"></div>
          </div>
          
          <div className="mt-12 flex items-center justify-between px-10">
             <div className="flex gap-4">
                <div className="w-3 h-3 rounded-full bg-indigo-500 animate-ping"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lab Live Status: Ready</p>
             </div>
             {resultImage && (
               <button 
                 onClick={() => {setResultImage(null); setOriginalPreview(null);}}
                 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
               >
                 Reset Lab
               </button>
             )}
          </div>
        </div>

        {/* Right: Functional UI */}
        <div className="lg:col-span-5 pt-10">
          <div className="relative">
            <span className="text-[140px] font-serif text-slate-50 absolute -top-24 -left-12 select-none -z-10 leading-none">“</span>
            
            <h4 className="text-3xl font-black text-slate-950 leading-tight tracking-tighter mb-8">
              데이터의 조각을 맞추어 <br />
              <span className="text-indigo-600">당신의 가치</span>를 <br />
              새롭게 창조합니다.
            </h4>
            
            <p className="text-slate-500 text-base font-medium leading-relaxed mb-12">
              조난영의 스튜디오는 단순한 시각화를 넘어, 인공지능이 데이터를 연결할 때 발생하는 시너지를 직접 체험할 수 있는 공간입니다. <br /><br />
              본인의 사진을 업로드하여 AI가 분석한 **'결정적 인사이트 배경'**을 확인해보세요.
            </p>

            <div className="space-y-6">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className={`
                  w-full py-6 rounded-[2rem] font-black text-[11px] tracking-[0.3em] uppercase transition-all shadow-2xl
                  ${isProcessing ? 'bg-slate-100 text-slate-400' : 'bg-slate-950 text-white hover:bg-indigo-600 hover:scale-[1.02]'}
                `}
              >
                {isProcessing ? "Processing Data..." : "Upload & Connect (AI Lab)"}
              </button>
              
              <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                 </div>
                 <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                   AI가 인물의 특성을 유지하며 비즈니스 로직에 적합한 <span className="text-slate-900 underline underline-offset-4">Strategic Background</span>를 합성합니다.
                 </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-10 border-t border-slate-100 flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-white shadow-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Authentic Vision</p>
                <p className="text-[11px] font-bold text-slate-900">Connect the dots, lead the logic.</p>
             </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default AIStudio;
