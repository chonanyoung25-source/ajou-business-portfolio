
import React, { useState, useEffect } from 'react';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 4,
      title: "Block Master",
      category: "Digital Tool",
      description: "효율적인 블록 관리와 비즈니스 로직을 시각화한 구글 앱스 스크립트 기반 웹 애플리케이션.",
      detailedDescription: "Block Master는 복잡한 데이터 구조를 블록 단위로 관리하고 자동화할 수 있는 커스텀 툴입니다. 경영 효율성을 극대화하기 위해 설계되었습니다.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      tags: ["Apps Script", "Automation"],
      externalLink: "https://script.google.com/macros/s/AKfycbzDbeh-sR5hIBHJolVlN499G02tcSAhy8SdPq3oiKVzheQONyHOtbU5ygQT3sifLAlK/exec"
    }
  ];

  const categories = ['All', 'Digital Tool'];
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
  }, [selectedProject]);

  const handleProjectClick = (project: Project) => {
    if (project.externalLink) {
      window.open(project.externalLink, '_blank');
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-xs font-bold tracking-[0.4em] text-indigo-600 uppercase mb-4">Portfolio</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">주요 프로젝트</h3>
      </div>

      <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-8 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 border ${
              activeFilter === cat
                ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
                : 'bg-white text-slate-400 border-slate-100 hover:border-slate-900 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="flex justify-center md:justify-start">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative" onClick={() => handleProjectClick(project)}>
              <div className={`absolute -inset-2 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-[3rem] opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-700`}></div>
              
              <div className={`
                relative h-full bg-white border border-slate-100 rounded-[3rem] p-10 
                shadow-soft transition-all duration-700 
                group-hover:translate-y-[-12px] group-hover:border-transparent 
                flex flex-col hover:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)] cursor-pointer
              `}>
                {/* Dynamic Image Container */}
                <div className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden mb-10 shadow-lg group-hover:shadow-indigo-200/50 transition-all duration-500">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-1 transition-all duration-1000" 
                  />
                  
                  {/* Digital Effect Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                     <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-20 -translate-y-full animate-[scan_3s_linear_infinite]"></div>
                     <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/40"></div>
                     <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/40"></div>
                  </div>
                  
                  <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-700"></div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{project.category}</p>
                    {project.externalLink && (
                      <div className="flex items-center gap-1 text-indigo-500 animate-pulse">
                        <span className="text-[8px] font-bold uppercase tracking-tighter">Live Link</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors tracking-tighter">
                    {project.title}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] px-2.5 py-1 bg-slate-50 text-slate-400 rounded-lg font-bold uppercase group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">{tag}</span>
                    ))}
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>
                
                <div className="mt-10 flex items-center gap-3">
                  <div className="h-[2px] flex-grow bg-slate-50 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-indigo-500 to-blue-500 w-0 group-hover:w-full transition-all duration-1000`}></div>
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

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
      `}</style>

      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProject(null)}></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[3.5rem] shadow-2xl overflow-y-auto animate-fade-in-up">
            <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 z-10 p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-5 h-[300px] md:h-auto"><img src={selectedProject.image} className="w-full h-full object-cover" /></div>
              <div className="md:col-span-7 p-10 md:p-14">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full mb-6 inline-block">{selectedProject.category}</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tighter">{selectedProject.title}</h2>
                <div className="space-y-8">
                  <p className="text-slate-600 leading-relaxed font-medium">{selectedProject.detailedDescription}</p>
                  {selectedProject.caseStudy && (
                    <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 font-medium text-slate-700 italic">"{selectedProject.caseStudy}"</div>
                  )}
                  <button onClick={() => setSelectedProject(null)} className="w-full py-5 bg-slate-950 text-white rounded-[1.5rem] font-bold tracking-widest text-[11px] hover:bg-indigo-600 transition-all shadow-xl uppercase">Close Project</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
