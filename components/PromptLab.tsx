
import React, { useState, useEffect, useRef } from 'react';
import { Prompt } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const PromptLab: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [activeCategory, setActiveCategory] = useState<'Marketing' | 'Strategy' | 'Data' | 'Career' | 'All'>('All');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    category: 'Strategy' as Prompt['category'],
    content: '',
    description: ''
  });

  const categories: Prompt['category'][] = ['Marketing', 'Strategy', 'Data', 'Career'];

  useEffect(() => {
    const saved = localStorage.getItem('ny_prompts_v1');
    if (saved) {
      setPrompts(JSON.parse(saved));
    } else {
      const defaultPrompts: Prompt[] = [
        {
          id: '1',
          title: "STP 전략 고도화 프롬프트",
          category: 'Marketing',
          description: "신규 비즈니스 모델의 시장 세분화, 타겟팅, 포지셔닝을 위한 논리적 구조 설계.",
          content: "당신은 10년차 마케팅 전략가입니다. [브랜드명]을 위해 다음 조건에 맞는 STP 전략을 수립해 주세요: 1. 시장 세분화(Segmentation) 기준 제안 2. 가장 매력적인 타겟(Targeting) 선정 근거 3. 타겟의 뇌리에 박힐 포지셔닝(Positioning) 전략.",
          createdAt: Date.now()
        },
        {
          id: '2',
          title: "SWOT-AHP 연계 분석",
          category: 'Strategy',
          description: "단순 SWOT을 넘어 우선순위를 결정하기 위한 분석 프레임워크 제안.",
          content: "기업의 현재 상황 [상황설명]을 바탕으로 SWOT 분석을 실시하고, 각 항목이 기업의 중장기 목표 달성에 미치는 영향을 AHP(계층 분석 과정) 관점에서 분석하여 가장 시급한 전략 과제 3가지를 도출해 주세요.",
          createdAt: Date.now()
        },
        {
          id: '3',
          title: "SQL 쿼리 최적화 어드바이저",
          category: 'Data',
          description: "복잡한 비즈니스 지표 산출을 위한 데이터 추출 쿼리 고도화.",
          content: "다음 SQL 쿼리를 분석하여 1. 실행 성능을 개선할 수 있는 인덱스 전략 2. 중복 계산을 줄이기 위한 CTE 적용 방안 3. 결과값의 비즈니스적 해석 가능성을 높이는 컬럼 명칭 제안을 포함해 주세요: [SQL입력]",
          createdAt: Date.now()
        }
      ];
      setPrompts(defaultPrompts);
    }
  }, []);

  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem('ny_prompts_v1', JSON.stringify(prompts));
    }
  }, [prompts]);

  const handleTestPrompt = async () => {
    if (!selectedPrompt) return;
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await getGeminiResponse(`다음 프롬프트의 효과를 시뮬레이션해줘: "${selectedPrompt.content}"`);
      setTestResult(result);
    } catch (err) {
      setTestResult("AI 시뮬레이션 중 오류가 발생했습니다.");
    } finally {
      setIsTesting(false);
    }
  };

  const handleAddPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt: Prompt = {
      id: Math.random().toString(36).substr(2, 9),
      ...newPrompt,
      createdAt: Date.now()
    };
    setPrompts([prompt, ...prompts]);
    setIsModalOpen(false);
    setNewPrompt({ title: '', category: 'Strategy', content: '', description: '' });
  };

  const filteredPrompts = activeCategory === 'All' 
    ? prompts 
    : prompts.filter(p => p.category === activeCategory);

  return (
    <div id="prompt-lab" className="max-w-7xl mx-auto px-6 py-32 bg-slate-950 min-h-screen">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
        <div>
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 uppercase">
            Prompt <span className="text-indigo-500">Repository</span>
          </h3>
          <div className="flex flex-wrap gap-3">
             {['All', ...categories].map(cat => (
               <button 
                 key={cat}
                 onClick={() => setActiveCategory(cat as any)}
                 className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-[0_10px_30px_rgba(79,70,229,0.4)]' : 'bg-white/5 text-slate-500 border border-white/10 hover:bg-white/10'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-4 px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-[11px] tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
          Add New Logic
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPrompts.map((prompt) => (
          <div 
            key={prompt.id}
            onClick={() => { setSelectedPrompt(prompt); setTestResult(null); }}
            className={`
              group relative p-10 bg-white/5 border border-white/10 rounded-[2.5rem] cursor-pointer transition-all duration-500
              hover:bg-white/[0.08] hover:border-indigo-500/30 hover:translate-y-[-10px]
              ${selectedPrompt?.id === prompt.id ? 'border-indigo-500 bg-indigo-500/5' : ''}
            `}
          >
            <div className="flex items-center justify-between mb-8">
               <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 rounded-full">{prompt.category}</span>
               <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-indigo-500 transition-colors"></div>
            </div>
            <h4 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-indigo-400 transition-colors">{prompt.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8 opacity-70 group-hover:opacity-100">{prompt.description}</p>
            
            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
               <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Engineering Mode</span>
               <svg className="w-5 h-5 text-slate-700 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7" />
               </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Prompt Detail & Simulator */}
      {selectedPrompt && (
        <div className="mt-32 p-12 md:p-16 bg-white/[0.02] border border-white/10 rounded-[3.5rem] backdrop-blur-xl animate-fade-in-up overflow-hidden relative">
           <div className="absolute top-[-50px] right-[-50px] text-[200px] font-black text-white opacity-[0.02] select-none pointer-events-none italic">LOGIC</div>
           
           <div className="grid lg:grid-cols-12 gap-16 relative z-10">
              <div className="lg:col-span-6 space-y-10">
                 <div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4 block">Selected Prompt Schema</span>
                    <h3 className="text-4xl font-black text-white tracking-tighter mb-6">{selectedPrompt.title}</h3>
                    <div className="p-8 bg-slate-900 rounded-[2rem] border border-white/5 font-mono text-sm text-indigo-300 leading-relaxed shadow-inner">
                       <span className="text-slate-600 italic">// Engineering Input:</span> <br />
                       {selectedPrompt.content}
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                      onClick={handleTestPrompt}
                      disabled={isTesting}
                      className="flex-grow py-6 bg-indigo-600 text-white rounded-2xl font-black text-[11px] tracking-widest uppercase hover:bg-indigo-500 transition-all shadow-xl disabled:opacity-50"
                    >
                      {isTesting ? "Executing Logic..." : "Test with AI Simulator"}
                    </button>
                    <button 
                      onClick={() => setSelectedPrompt(null)}
                      className="px-10 py-6 bg-white/5 text-slate-400 border border-white/10 rounded-2xl font-black text-[11px] tracking-widest uppercase hover:bg-white/10 transition-all"
                    >
                      Close
                    </button>
                 </div>
              </div>

              <div className="lg:col-span-6">
                 <div className="h-full min-h-[400px] bg-black/40 border border-white/5 rounded-[2.5rem] p-10 flex flex-col overflow-hidden">
                    <div className="flex items-center gap-3 mb-8">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Simulator Output</span>
                    </div>

                    <div className="flex-grow overflow-y-auto pr-4 scroll-smooth">
                       {testResult ? (
                         <div className="text-slate-300 text-sm leading-relaxed font-medium space-y-4 animate-fade-in">
                            {testResult.split('\n').map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                         </div>
                       ) : isTesting ? (
                         <div className="h-full flex flex-col items-center justify-center opacity-30">
                            <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
                            <p className="text-[10px] font-black uppercase tracking-widest">Generating Insight...</p>
                         </div>
                       ) : (
                         <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                            <svg className="w-16 h-16 mb-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <p className="text-xs font-bold uppercase tracking-widest">Waiting for execution</p>
                         </div>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Add New Prompt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-fade-in" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-[3rem] shadow-2xl p-12 animate-scale-in">
              <h3 className="text-3xl font-black text-white mb-10 tracking-tighter">새로운 프롬프트 설계</h3>
              
              <form onSubmit={handleAddPrompt} className="space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Category</label>
                        <select 
                          value={newPrompt.category}
                          onChange={e => setNewPrompt({...newPrompt, category: e.target.value as any})}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white outline-none focus:border-indigo-500 transition-all appearance-none"
                        >
                           {categories.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Logic Title</label>
                        <input 
                          required
                          type="text" 
                          value={newPrompt.title}
                          onChange={e => setNewPrompt({...newPrompt, title: e.target.value})}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white outline-none focus:border-indigo-500 transition-all"
                          placeholder="프롬프트 이름"
                        />
                    </div>
                 </div>

                 <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Description</label>
                    <input 
                      required
                      type="text" 
                      value={newPrompt.description}
                      onChange={e => setNewPrompt({...newPrompt, description: e.target.value})}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white outline-none focus:border-indigo-500 transition-all"
                      placeholder="이 프롬프트가 해결하는 비즈니스 문제"
                    />
                 </div>

                 <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 block">System Prompt (The Core Logic)</label>
                    <textarea 
                      required
                      value={newPrompt.content}
                      onChange={e => setNewPrompt({...newPrompt, content: e.target.value})}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-indigo-300 outline-none h-32 resize-none focus:border-indigo-500 transition-all font-mono text-sm"
                      placeholder="AI에게 내릴 구체적인 명령문을 작성하세요."
                    />
                 </div>

                 <div className="pt-6">
                    <button 
                      type="submit"
                      className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-[11px] tracking-widest uppercase shadow-xl hover:bg-indigo-500 transition-all active:scale-95"
                    >
                      Archive Logic
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PromptLab;
