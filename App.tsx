
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AcademicsCover from './components/AcademicsCover';
import Curriculum from './components/Curriculum';
import Electives from './components/Electives';
import AppShowcase from './components/AppShowcase';
import PromptCover from './components/PromptCover';
import PromptLab from './components/PromptLab';
import ToeicCover from './components/ToeicCover';
import ToeicLab from './components/ToeicLab';
import ScheduleCover from './components/ScheduleCover';
import Schedule from './components/Schedule';
import ReadingCover from './components/ReadingCover';
import Reading from './components/Reading';
import WorkCover from './components/WorkCover';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import CourseDetail from './components/CourseDetail';
import Calendar2026 from './components/Calendar2026';
import TodoList from './components/TodoList';
import Timetable from './components/Timetable';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);
  const [showTimetable, setShowTimetable] = useState(false);
  const [homeResetKey, setHomeResetKey] = useState(0);
  const [workResetKey, setWorkResetKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = () => {
    setHomeResetKey(prev => prev + 1);
  };

  const handleWorkClick = () => {
    setWorkResetKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} onHomeClick={handleHomeClick} onWorkClick={handleWorkClick} />
      <main>
        <section id="home">
          <Hero resetKey={homeResetKey} />
        </section>
        <section id="about" className="py-32 bg-white">
          <About />
        </section>
        <section id="curriculum" className="pt-32 pb-16 bg-white">
          <AcademicsCover />
          <Curriculum onCourseClick={setSelectedCourse} />
        </section>
        <section id="electives" className="pb-32 bg-white">
          <Electives />
        </section>
        <section id="apps" className="py-32 bg-slate-50/30">
          <AppShowcase />
        </section>
        <section id="prompts" className="bg-slate-950">
          <PromptCover />
          <PromptLab />
        </section>
        <section id="toeic" className="bg-slate-50">
          <ToeicCover />
          <ToeicLab />
        </section>
        <section id="schedule" className="bg-white">
          <ScheduleCover />
          <Schedule 
            onMonthClick={() => setShowCalendar(true)} 
            onTodoClick={() => setShowTodoList(true)}
            onTimetableClick={() => setShowTimetable(true)}
          />
        </section>
        <section id="reading" className="pt-32 pb-32 bg-white">
          <ReadingCover />
          <Reading />
        </section>
        <section id="projects" className="bg-slate-50/50 overflow-hidden">
          <WorkCover resetKey={workResetKey} />
          <div className="py-32">
            <Projects />
          </div>
        </section>
        <section id="contact" className="py-32 bg-white">
          <Contact />
        </section>
      </main>
      <AIChat />
      
      {/* Overlays */}
      {selectedCourse === '경제원론' && (
        <CourseDetail onClose={() => setSelectedCourse(null)} />
      )}

      {showCalendar && (
        <Calendar2026 onClose={() => setShowCalendar(false)} />
      )}

      {showTodoList && (
        <TodoList onClose={() => setShowTodoList(false)} />
      )}

      {showTimetable && (
        <Timetable onClose={() => setShowTimetable(false)} />
      )}

      <footer className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl font-black tracking-tighter mb-4">
            NY<span className="text-blue-500">.</span>
          </p>
          <p className="text-slate-500 text-xs tracking-widest uppercase font-bold">
            © 2025 Cho Nanyoung. Built with Precision.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
