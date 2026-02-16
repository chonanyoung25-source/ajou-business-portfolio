
import React from 'react';

interface NavbarProps {
  scrolled: boolean;
  onHomeClick?: () => void;
  onWorkClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, onHomeClick, onWorkClick }) => {
  const navLinks = [
    { name: 'HOME', id: 'home' },
    { name: 'ABOUT', id: 'about' },
    { name: 'ACADEMICS', id: 'curriculum' },
    { name: 'APPS', id: 'apps' },
    { name: 'PROMPT LAB', id: 'prompts' },
    { name: 'TOEIC', id: 'toeic' },
    { name: 'SCHEDULE', id: 'schedule' },
    { name: 'READING', id: 'reading' },
    { name: 'WORK', id: 'projects' },
    { name: 'CONNECT', id: 'contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    if (id === 'home' && onHomeClick) {
      onHomeClick();
    }

    if (id === 'projects' && onWorkClick) {
      onWorkClick();
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full top-8 z-[100] flex justify-center px-6 pointer-events-none">
      <div className={`
        flex items-center gap-6 md:gap-10 px-8 md:px-10 py-5 rounded-full 
        bg-white/80 backdrop-blur-xl border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] 
        transition-all duration-500 pointer-events-auto
        ${scrolled ? 'scale-95 py-4' : 'scale-100'}
      `}>
        {/* Logo Section */}
        <div className="flex items-center mr-4">
          <a 
            href="#home" 
            onClick={(e) => handleScroll(e, 'home')}
            className="flex items-center group"
          >
            <span className="text-2xl font-black tracking-tighter text-slate-900">NY</span>
            <span className="w-1.5 h-1.5 bg-blue-600 ml-0.5 mt-2 rounded-[1px]"></span>
          </a>
        </div>

        {/* Links Section */}
        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => handleScroll(e, link.id)}
              className="whitespace-nowrap text-[9px] md:text-[10px] font-bold tracking-[0.15em] text-slate-500 hover:text-slate-900 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
