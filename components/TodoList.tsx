
import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoListProps {
  onClose: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ onClose }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('ny_todos_v1');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('ny_todos_v1', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;
  const progress = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  return (
    <div className="fixed inset-0 z-[200] bg-slate-50 overflow-y-auto animate-fade-in scroll-smooth">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-emerald-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-50 rounded-full blur-[100px] opacity-40"></div>
      </div>

      {/* Controls */}
      <div className="fixed top-8 right-8 z-[210]">
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="text-[10px] font-black tracking-widest uppercase">EXIT PLANNER</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
            <span className="text-[10px] font-black tracking-[0.4em] text-emerald-600 uppercase">Operational Excellence</span>
          </div>
          <h2 className="text-6xl font-black text-slate-950 tracking-tighter leading-none mb-6">
            TO-DO LIST<span className="text-emerald-500">.</span>
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            "작은 실행의 조각들이 모여 거대한 전략적 성과를 완성합니다."
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="bg-white rounded-[2rem] p-8 shadow-soft border border-slate-100 mb-10">
          <div className="flex items-end justify-between mb-4">
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Execution Progress</p>
                <p className="text-3xl font-black text-slate-900">{progress}% <span className="text-sm font-bold text-slate-300">completed</span></p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                <p className="text-sm font-bold text-emerald-600">{completedCount} / {todos.length} Tasks</p>
             </div>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
             <div 
               className="h-full bg-emerald-500 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)" 
               style={{ width: `${progress}%` }}
             ></div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={addTodo} className="group relative mb-12">
           <input 
             type="text"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             placeholder="수행할 전략적 과업을 입력하세요..."
             className="w-full pl-8 pr-16 py-6 bg-white border border-slate-100 rounded-3xl shadow-soft text-slate-900 font-medium placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/20 transition-all"
           />
           <button 
             type="submit"
             disabled={!inputValue.trim()}
             className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center disabled:opacity-20 hover:scale-105 active:scale-95 transition-all shadow-lg"
           >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
              </svg>
           </button>
        </form>

        {/* Todo Items */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="text-center py-20 opacity-20 flex flex-col items-center">
               <svg className="w-16 h-16 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
               </svg>
               <p className="font-bold tracking-widest uppercase text-xs">Waiting for your command</p>
            </div>
          ) : (
            todos.map(todo => (
              <div 
                key={todo.id}
                className={`
                  group relative flex items-center gap-6 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-soft transition-all duration-500
                  ${todo.completed ? 'opacity-50 grayscale' : 'hover:translate-x-2 hover:border-emerald-100'}
                `}
              >
                <button 
                  onClick={() => toggleTodo(todo.id)}
                  className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border-2
                    ${todo.completed 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                      : 'bg-white border-slate-100 text-transparent hover:border-emerald-300'}
                  `}
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                   </svg>
                </button>

                <div className="flex-grow">
                  <p className={`text-[17px] font-bold tracking-tight transition-all duration-500 ${todo.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {todo.text}
                  </p>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
                    Added: {new Date(todo.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-3 text-slate-300 hover:text-rose-500 transition-all"
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                   </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Motivation Footer */}
        <div className="mt-24 text-center border-t border-slate-100 pt-16">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-8">Persistence beats talent</p>
           <div className="flex justify-center gap-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= (todos.length / 2) ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
              ))}
           </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default TodoList;
