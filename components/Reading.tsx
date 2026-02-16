
import React, { useState, useRef, useEffect } from 'react';
import { Book } from '../types';

const GRADIENTS = [
  "from-blue-400 to-indigo-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-600",
  "from-rose-400 to-pink-600",
  "from-purple-400 to-violet-600",
];

const ReadingCard: React.FC<{ book: Book; onDelete: (id: string) => void }> = ({ book, onDelete }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((y / rect.height) - 0.5) * -12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.delete-btn')) return;
    if (book.link) {
      window.open(book.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="perspective-1000 w-full group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        onClick={handleCardClick}
        className={`
          relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-[3.5rem] p-8
          shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] transition-all duration-500
          group-hover:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.15)] group-hover:bg-white/90
          cursor-pointer overflow-hidden h-full flex flex-col
        `}
      >
        {/* Delete Button */}
        <button 
          onClick={() => onDelete(book.id)}
          className="delete-btn absolute top-6 right-6 z-30 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative w-full aspect-[3/4.2] rounded-[1.8rem] overflow-hidden mb-10 shadow-2xl transition-all duration-700 group-hover:translate-z-20 group-hover:scale-[1.03] group-hover:-translate-y-2">
          <img 
            src={book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"} 
            alt={book.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div className="relative z-10 space-y-4 flex-grow">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase tracking-[0.2em] rounded-full">
              {book.author}
            </span>
          </div>
          
          <h4 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight">
            {book.title}
          </h4>
          
          <p className="text-[13px] text-slate-500 leading-relaxed font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">
            "{book.insight}"
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div className="flex -space-x-1">
             {[1,2,3].map(i => (
               <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-100 group-hover:bg-indigo-200 transition-colors"></div>
             ))}
          </div>
          <div className="flex items-center gap-2">
             <span className="text-[9px] font-black text-slate-300 group-hover:text-indigo-600 uppercase tracking-widest transition-colors">Review</span>
             <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7" />
                </svg>
             </div>
          </div>
        </div>
      </div>
      
      <div className={`absolute -inset-4 bg-gradient-to-br ${book.gradient} rounded-[4rem] opacity-0 group-hover:opacity-[0.08] blur-[60px] transition-all duration-1000 -z-10`}></div>
    </div>
  );
};

const Reading: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: '',
    author: '',
    insight: '',
    image: '',
    link: '',
    gradient: GRADIENTS[0]
  });

  useEffect(() => {
    const savedBooks = localStorage.getItem('ny_reading_list_v1');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      const defaultBooks: Book[] = [
        {
          id: '1',
          title: "자유론 (On Liberty)",
          author: "존 스튜어트 밀",
          insight: "개인의 개성과 자유가 사회 발전의 원동력임을 배우다.",
          image: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791171311606.jpg",
          gradient: "from-blue-400 to-indigo-500",
          link: "https://script.google.com/macros/s/AKfycbwXrTCFzQfpUbVqhj5e-lr1eTdsp_ZzOtxjH9OgFnhFCU14FR6JXNsxUQuy5mhBRZyX/exec"
        }
      ];
      setBooks(defaultBooks);
    }
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('ny_reading_list_v1', JSON.stringify(books));
    }
  }, [books]);

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;

    const bookToAdd: Book = {
      id: Math.random().toString(36).substr(2, 9),
      title: newBook.title!,
      author: newBook.author!,
      insight: newBook.insight || "독서 후 얻은 통찰을 기록하세요.",
      image: newBook.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      gradient: newBook.gradient || GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
      link: newBook.link || ""
    };

    setBooks([bookToAdd, ...books]);
    setIsModalOpen(false);
    setNewBook({ title: '', author: '', insight: '', image: '', link: '', gradient: GRADIENTS[0] });
  };

  const handleDeleteBook = (id: string) => {
    if (confirm('정말 이 독서 기록을 삭제하시겠습니까?')) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
        <div>
          <h2 className="text-[10px] font-black tracking-[0.5em] text-indigo-600 uppercase mb-4">Intellectual Growth</h2>
          <div className="flex items-center gap-6">
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tighter">독서 아카이브</h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-indigo-600 hover:scale-110 transition-all shadow-xl active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-slate-400 text-sm font-medium max-w-xs md:text-right">
          비즈니스적 통찰력을 기르기 위한 <br className="hidden md:block" />
          난영의 인문학적 탐구 기록입니다.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="py-40 text-center border-2 border-dashed border-slate-100 rounded-[4rem] bg-slate-50/50">
           <p className="text-slate-300 font-black text-xs uppercase tracking-[0.3em] mb-4">Archive is empty</p>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="text-indigo-600 font-bold hover:underline"
           >
             첫 번째 통찰력을 기록해보세요
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {books.map((book) => (
            <ReadingCard key={book.id} book={book} onDelete={handleDeleteBook} />
          ))}
        </div>
      )}

      {/* Modal for Adding Book */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-10 animate-scale-in">
              <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter">독서 통찰 추가</h3>
              
              <form onSubmit={handleAddBook} className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Book Title</label>
                        <input 
                          autoFocus
                          required
                          type="text" 
                          value={newBook.title}
                          onChange={e => setNewBook({...newBook, title: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/20 transition-all"
                          placeholder="책 제목"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Author</label>
                        <input 
                          required
                          type="text" 
                          value={newBook.author}
                          onChange={e => setNewBook({...newBook, author: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none"
                          placeholder="저자"
                        />
                    </div>
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">One-line Insight</label>
                    <textarea 
                      value={newBook.insight}
                      onChange={e => setNewBook({...newBook, insight: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none h-24 resize-none"
                      placeholder="이 책에서 얻은 가장 결정적인 통찰을 한 문장으로 기록하세요."
                    />
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Cover Image URL</label>
                    <input 
                      type="text" 
                      value={newBook.image}
                      onChange={e => setNewBook({...newBook, image: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none"
                      placeholder="이미지 주소 (https://...)"
                    />
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Review Link (Optional)</label>
                    <input 
                      type="text" 
                      value={newBook.link}
                      onChange={e => setNewBook({...newBook, link: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none"
                      placeholder="블로그나 노트 링크"
                    />
                 </div>

                 <div className="pt-6">
                    <button 
                      type="submit"
                      className="w-full py-5 bg-slate-950 text-white rounded-2xl font-bold tracking-widest text-[11px] uppercase shadow-xl hover:bg-indigo-600 transition-all active:scale-95"
                    >
                      Archive Insight
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .translate-z-20 { transform: translateZ(20px); }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default Reading;
