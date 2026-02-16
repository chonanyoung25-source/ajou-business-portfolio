
import React, { useState, useEffect } from 'react';

interface TimetableProps {
  onClose: () => void;
}

interface ClassItem {
  id: string;
  name: string;
  day: number; // 0: Mon, 1: Tue, ... 4: Fri
  start: number; // Hour (e.g. 9.0)
  duration: number; // Hours (e.g. 1.25 for 75 mins)
  location: string;
  color: string;
}

const COLORS = [
  { name: 'Indigo', bg: 'bg-indigo-500', hex: '#6366f1' },
  { name: 'Blue', bg: 'bg-blue-600', hex: '#2563eb' },
  { name: 'Emerald', bg: 'bg-emerald-500', hex: '#10b981' },
  { name: 'Rose', bg: 'bg-rose-500', hex: '#f43f5e' },
  { name: 'Orange', bg: 'bg-orange-500', hex: '#f97316' },
  { name: 'Violet', bg: 'bg-violet-600', hex: '#7c3aed' },
  { name: 'Amber', bg: 'bg-amber-500', hex: '#f59e0b' },
];

const Timetable: React.FC<TimetableProps> = ({ onClose }) => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  // Load classes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ny_timetable_v1');
    if (saved) {
      setClasses(JSON.parse(saved));
    } else {
      // Default classes if empty
      const defaultClasses: ClassItem[] = [
        { id: '1', name: "경제원론", day: 0, start: 9.0, duration: 1.25, location: "다산관 101", color: "bg-indigo-500" },
        { id: '2', name: "경제원론", day: 2, start: 9.0, duration: 1.25, location: "다산관 101", color: "bg-indigo-500" },
        { id: '3', name: "경영최적화", day: 0, start: 13.5, duration: 1.25, location: "연암관 302", color: "bg-blue-600" },
      ];
      setClasses(defaultClasses);
    }
  }, []);

  // Save classes to localStorage
  useEffect(() => {
    if (classes.length > 0) {
      localStorage.setItem('ny_timetable_v1', JSON.stringify(classes));
    }
  }, [classes]);

  const handleAddClick = (day: number, hour: number) => {
    setEditingClass({
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      day,
      start: hour,
      duration: 1,
      location: '',
      color: COLORS[0].bg
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (cls: ClassItem) => {
    setEditingClass(cls);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass) return;

    if (classes.find(c => c.id === editingClass.id)) {
      setClasses(classes.map(c => c.id === editingClass.id ? editingClass : c));
    } else {
      setClasses([...classes, editingClass]);
    }
    setIsModalOpen(false);
    setEditingClass(null);
  };

  const handleDelete = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
    setIsModalOpen(false);
    setEditingClass(null);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-50 overflow-y-auto animate-fade-in scroll-smooth">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
      </div>

      {/* Controls */}
      <div className="fixed top-8 right-8 z-[210] flex gap-4">
        <button 
          onClick={() => {
            setEditingClass({
              id: Math.random().toString(36).substr(2, 9),
              name: '',
              day: 0,
              start: 9,
              duration: 1,
              location: '',
              color: COLORS[0].bg
            });
            setIsModalOpen(true);
          }}
          className="group flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="text-[10px] font-black tracking-widest uppercase">ADD CLASS</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="text-[10px] font-black tracking-widest uppercase">CLOSE</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase">Interactive Scheduler</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black text-slate-950 tracking-tighter leading-none mb-6">
            TIMETABLE<span className="text-blue-600">.</span>
          </h2>
          <p className="text-slate-400 font-medium tracking-tight">수업을 클릭하여 수정하거나, 빈 공간을 클릭하여 새 수업을 추가하세요.</p>
        </div>

        {/* Timetable Grid */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-soft overflow-hidden">
          <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] border-b border-slate-100">
            <div className="bg-slate-50 border-r border-slate-100 py-6"></div>
            {days.map(day => (
              <div key={day} className="py-6 text-center border-r border-slate-100 last:border-r-0">
                <span className="text-[11px] font-black text-slate-900 tracking-widest">{day}</span>
              </div>
            ))}
          </div>

          <div className="relative grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] h-[800px]">
            {/* Hour Rows */}
            <div className="bg-slate-50/50 border-r border-slate-100 flex flex-col">
              {hours.map(h => (
                <div key={h} className="flex-1 flex items-start justify-center pt-4 border-b border-slate-100 last:border-b-0">
                  <span className="text-[10px] font-black text-slate-300">{h}:00</span>
                </div>
              ))}
            </div>

            {/* Clickable Grid Cells for adding */}
            <div className="absolute inset-0 left-[80px] grid grid-cols-5 grid-rows-10">
               {Array.from({ length: 50 }).map((_, i) => {
                 const day = i % 5;
                 const hour = Math.floor(i / 5) + 9;
                 return (
                   <div 
                    key={i} 
                    onClick={() => handleAddClick(day, hour)}
                    className="border-r border-b border-slate-50 cursor-crosshair hover:bg-blue-50/30 transition-colors last:border-r-0"
                   ></div>
                 );
               })}
            </div>

            {/* Class Blocks */}
            <div className="absolute inset-0 left-[80px] pointer-events-none">
              <div className="relative w-full h-full grid grid-cols-5">
                {classes.map((cls) => {
                  const top = ((cls.start - 9) / (hours.length)) * 100;
                  const height = (cls.duration / (hours.length)) * 100;
                  
                  return (
                    <div 
                      key={cls.id}
                      className="absolute px-1 pointer-events-auto group/class"
                      style={{ 
                        left: `${cls.day * 20}%`, 
                        width: '20%', 
                        top: `${top}%`, 
                        height: `${height}%` 
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(cls);
                      }}
                    >
                      <div className={`
                        w-full h-full rounded-2xl p-4 shadow-lg border border-white/20 transition-all duration-500
                        ${cls.color} text-white flex flex-col justify-between
                        hover:scale-[1.02] hover:z-20 group-hover/class:shadow-xl cursor-pointer
                      `}>
                        <div className="overflow-hidden">
                          <p className="text-xs font-black tracking-tight leading-tight mb-1 truncate">{cls.name}</p>
                          <div className="flex items-center gap-1 opacity-60">
                            <span className="text-[9px] font-bold truncate">{cls.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between opacity-0 group-hover/class:opacity-100 transition-opacity">
                           <span className="text-[8px] font-black tracking-widest uppercase bg-black/10 px-2 py-0.5 rounded-full">Edit</span>
                           <span className="text-[8px] font-bold">{cls.start}:00 - {cls.start + cls.duration}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && editingClass && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-10 animate-scale-in">
              <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter">
                {classes.find(c => c.id === editingClass.id) ? '수업 정보 수정' : '새 수업 추가'}
              </h3>
              
              <form onSubmit={handleSave} className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Course Name</label>
                    <input 
                      autoFocus
                      required
                      type="text" 
                      value={editingClass.name}
                      onChange={e => setEditingClass({...editingClass, name: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all"
                      placeholder="과목명을 입력하세요"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Day</label>
                       <select 
                         value={editingClass.day}
                         onChange={e => setEditingClass({...editingClass, day: parseInt(e.target.value)})}
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none appearance-none"
                       >
                          {days.map((d, i) => <option key={d} value={i}>{d}</option>)}
                       </select>
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Location</label>
                       <input 
                         type="text" 
                         value={editingClass.location}
                         onChange={e => setEditingClass({...editingClass, location: e.target.value})}
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none"
                         placeholder="강의실"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Start Time (Hour)</label>
                       <input 
                         type="number" 
                         step="0.5"
                         min="9"
                         max="18"
                         value={editingClass.start}
                         onChange={e => setEditingClass({...editingClass, start: parseFloat(e.target.value)})}
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none"
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Duration (Hours)</label>
                       <input 
                         type="number" 
                         step="0.25"
                         min="0.5"
                         value={editingClass.duration}
                         onChange={e => setEditingClass({...editingClass, duration: parseFloat(e.target.value)})}
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none"
                       />
                    </div>
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Theme Color</label>
                    <div className="flex flex-wrap gap-3">
                       {COLORS.map(c => (
                         <button 
                           key={c.bg}
                           type="button"
                           onClick={() => setEditingClass({...editingClass, color: c.bg})}
                           className={`w-8 h-8 rounded-full ${c.bg} transition-all ${editingClass.color === c.bg ? 'ring-4 ring-slate-200 scale-125' : 'hover:scale-110'}`}
                         />
                       ))}
                    </div>
                 </div>

                 <div className="flex gap-4 pt-6">
                    <button 
                      type="submit"
                      className="flex-grow py-5 bg-blue-600 text-white rounded-2xl font-bold tracking-widest text-[11px] uppercase shadow-xl hover:bg-blue-700 transition-all"
                    >
                      Save Changes
                    </button>
                    {classes.find(c => c.id === editingClass.id) && (
                      <button 
                        type="button"
                        onClick={() => handleDelete(editingClass.id)}
                        className="px-8 py-5 bg-rose-50 text-rose-600 rounded-2xl font-bold tracking-widest text-[11px] uppercase hover:bg-rose-100 transition-all"
                      >
                        Delete
                      </button>
                    )}
                 </div>
              </form>
           </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default Timetable;
