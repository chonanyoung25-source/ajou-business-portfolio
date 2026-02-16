
import React, { useState, useEffect } from 'react';
import { ToeicVocab } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const ToeicLab: React.FC = () => {
  const [currentScore, setCurrentScore] = useState(850);
  const [activeTab, setActiveTab] = useState<'Vocab' | 'RC' | 'LC' | 'AI'>('Vocab');
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [grammarInput, setGrammarInput] = useState('');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const vocabs: ToeicVocab[] = [
    { word: 'Prerequisite', meaning: '전제 조건, 필수 과목', example: 'Good communication is a prerequisite for success.', category: 'Business' },
    { word: 'Acquisition', meaning: '인수, 습득', example: 'The corporate acquisition was finalized yesterday.', category: 'Finance' },
    { word: 'Endorsement', meaning: '지지, 보증, 서명', example: 'The product received a celebrity endorsement.', category: 'Mkt' },
    { word: 'Compliance', meaning: '준수, 따름', example: 'All employees must act in compliance with rules.', category: 'Law' },
    { word: 'Remittance', meaning: '송금, 납부', example: 'Please send your remittance by Friday.', category: 'Finance' },
    { word: 'Feasibility', meaning: '실행 가능성', example: 'We need to conduct a feasibility study first.', category: 'Strategy' as any },
  ];

  const handleAiCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grammarInput.trim() || isAiLoading) return;
    setIsAiLoading(true);
    setAiFeedback(null);
    try {
      const response = await getGeminiResponse(`다음 비즈니스 영어 문장을 분석하고 더 정중하거나 정확한 표현으로 고쳐줘: "${grammarInput}"`);
      setAiFeedback(response);
    } catch (err) {
      setAiFeedback("AI 분석 중 오류가 발생했습니다.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div id="toeic-lab" className="max-w-7xl mx-auto px-6 py-32 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
        <div>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 uppercase">
            TOEIC <span className="text-indigo-600">STUDIO</span>
          </h3>
          <div className="flex flex-wrap gap-3">
             {['Vocab', 'RC', 'LC', 'AI'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
               >
                 {tab === 'AI' ? 'AI Assistant' : tab}
               </button>
             ))}
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft w-full md:w-[400px]">
           <div className="flex justify-between items-end mb-4">
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Roadmap to 990</p>
                 <p className="text-3xl font-black text-slate-900">{currentScore} <span className="text-sm font-bold text-slate-300">/ 990</span></p>
              </div>
              <span className="text-xs font-black text-indigo-600 italic">Excellent!</span>
           </div>
           <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1)" 
                style={{ width: `${(currentScore / 990) * 100}%` }}
              ></div>
           </div>
        </div>
      </div>

      <div className="animate-fade-in-up">
        {activeTab === 'Vocab' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vocabs.map((v, i) => (
              <div 
                key={i} 
                className="perspective-1000 h-[280px] cursor-pointer group"
                onClick={() => setFlippedCard(flippedCard === i ? null : i)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${flippedCard === i ? 'rotate-y-180' : ''}`}>
                  {/* Front */}
                  <div className="absolute inset-0 bg-white rounded-[2.5rem] border border-slate-100 shadow-soft p-10 flex flex-col justify-between backface-hidden">
                    <div>
                      <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full">{v.category}</span>
                      <h4 className="text-3xl font-black text-slate-900 mt-6 tracking-tight">{v.word}</h4>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Flip for Meaning</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] p-10 flex flex-col justify-center text-white rotate-y-180 backface-hidden shadow-2xl">
                     <h4 className="text-2xl font-black mb-4">{v.meaning}</h4>
                     <p className="text-sm font-medium leading-relaxed opacity-80 italic">"{v.example}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'RC' && (
          <div className="grid md:grid-cols-2 gap-10">
             <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-soft">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-6">Part 5-6 Strategy</h4>
                <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter">문법 및 어휘 <br />초고속 풀이 루틴</h3>
                <ul className="space-y-6">
                   {[
                     "전치사 vs 접속사 구별 (주어/동사 유무 확인)",
                     "수일치/시제/태의 3단계 확인 절차",
                     "명사 앞/뒤 형용사 및 분사 위치 파악",
                     "복합 명사 및 빈출 숙어 암기"
                   ].map((item, i) => (
                     <li key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-[10px] font-black">{i+1}</div>
                        <p className="text-slate-600 font-medium">{item}</p>
                     </li>
                   ))}
                </ul>
             </div>
             <div className="bg-slate-900 p-12 rounded-[3rem] text-white relative overflow-hidden">
                <div className="absolute top-[-20px] right-[-20px] text-[150px] font-black opacity-[0.03] select-none pointer-events-none">RC</div>
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-6">Part 7 Strategy</h4>
                <h3 className="text-3xl font-black mb-8 tracking-tighter text-white">독해 지문 <br />데이터 스캔 기법</h3>
                <p className="text-slate-400 font-medium leading-relaxed mb-10">
                  비즈니스 이메일, 광고, 기사는 정형화된 패턴이 있습니다. <br />
                  질문의 키워드를 지문에서 역으로 추적하여 필요한 정보만 <br />
                  데이터처럼 추출하는 훈련이 핵심입니다.
                </p>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 italic text-sm text-indigo-300">
                  "Speed is a byproduct of precision."
                </div>
              </div>
          </div>
        )}

        {activeTab === 'LC' && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[4rem] border border-slate-100 shadow-soft text-center">
             <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-8 animate-float">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
             </div>
             <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Listening Archive</h3>
             <p className="text-slate-500 font-medium mb-12">쉐도잉 및 딕테이션 훈련을 위한 오디오 리소스가 준비 중입니다.</p>
             <div className="flex gap-4">
                <div className="px-6 py-3 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">Part 1-2: Reflex</div>
                <div className="px-6 py-3 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">Part 3-4: Context</div>
             </div>
          </div>
        )}

        {activeTab === 'AI' && (
          <div className="grid lg:grid-cols-12 gap-12">
             <div className="lg:col-span-5">
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">AI 비즈니스 영어 <br /><span className="text-indigo-600">교정 어시스턴트</span></h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-10">
                   작성한 문장을 입력해보세요. <br />
                   Gemini AI가 토익 빈출 문법과 비즈니스 에티켓에 맞게 <br />
                   가장 세련된 표현으로 다듬어 드립니다.
                </p>
                <form onSubmit={handleAiCheck} className="space-y-6">
                   <textarea 
                     value={grammarInput}
                     onChange={e => setGrammarInput(e.target.value)}
                     className="w-full p-8 bg-white border border-slate-200 rounded-[2rem] shadow-soft font-medium text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/20 transition-all h-40 resize-none"
                     placeholder="교정받고 싶은 영어 문장을 입력하세요..."
                   />
                   <button 
                     type="submit"
                     disabled={isAiLoading || !grammarInput.trim()}
                     className="w-full py-6 bg-slate-950 text-white rounded-2xl font-black text-[11px] tracking-widest uppercase hover:bg-indigo-600 transition-all shadow-xl active:scale-95 disabled:opacity-20"
                   >
                     {isAiLoading ? "Analyzing Logic..." : "Analyze & Refine"}
                   </button>
                </form>
             </div>
             <div className="lg:col-span-7">
                <div className="h-full min-h-[400px] bg-white border border-slate-200 rounded-[3rem] p-12 shadow-soft flex flex-col relative overflow-hidden">
                   <div className="absolute top-[-50px] right-[-50px] text-[180px] font-black text-indigo-500/5 select-none pointer-events-none">AI</div>
                   <div className="flex items-center gap-3 mb-10">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Refinement Output</span>
                   </div>
                   
                   <div className="flex-grow overflow-y-auto pr-4 scroll-smooth">
                      {aiFeedback ? (
                        <div className="text-slate-700 text-lg leading-relaxed font-medium space-y-6 animate-fade-in">
                           {aiFeedback.split('\n').map((line, i) => (
                             <p key={i}>{line}</p>
                           ))}
                        </div>
                      ) : isAiLoading ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-30">
                           <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
                           <p className="text-[10px] font-black uppercase tracking-widest">Linguistic processing...</p>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                           <svg className="w-20 h-20 mb-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                           </svg>
                           <p className="text-xs font-bold uppercase tracking-widest">Input a sentence to start AI coaching</p>
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default ToeicLab;
