
import React, { useState, useEffect } from 'react';

const AcademicAchievementCard: React.FC = () => {
  return (
    <div className="md:col-span-2 md:row-span-2 bg-white rounded-[3rem] p-12 flex flex-col justify-between border border-slate-100 shadow-soft hover:shadow-hover transition-all duration-700 group relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-[2.5] transform rotate-12 group-hover:rotate-0 transition-transform duration-1000 text-indigo-900 pointer-events-none">
         <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
         </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h4 className="text-[10px] font-black tracking-[0.4em] text-indigo-600 uppercase">Academic Status</h4>
            <p className="text-xs font-bold text-slate-400">Ajou Univ. Business Administration</p>
          </div>
        </div>

        <h3 className="text-4xl font-black mb-12 leading-tight tracking-tighter">성실함으로 쌓아온<br />지식의 기록들.</h3>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-white shadow-inner group-hover:bg-indigo-50 transition-all duration-500">
            <p className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">이수 학기</p>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">2</span>
              <span className="text-lg font-bold text-slate-400">/ 8</span>
            </div>
            <div className="mt-6 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-600 w-1/4 group-hover:w-[25%] transition-all duration-1000"></div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-white shadow-inner group-hover:bg-indigo-50 transition-all duration-500">
            <p className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">이수 학점</p>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">35</span>
              <span className="text-lg font-bold text-slate-400">학점</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-6 italic">Goal: Global Data Specialist</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-10 mt-10 border-t border-slate-50 flex items-center justify-between">
        <p className="text-[11px] text-slate-500 font-medium max-w-[280px]">
          경영학적 전문 지식을 체계적으로 습득하며, <br />
          매 학기 목표 이상의 성취를 달성하고 있습니다.
        </p>
        <div className="flex gap-1.5">
           {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-indigo-200"></div>)}
        </div>
      </div>
    </div>
  );
};

const ClockCard: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  
  const dateString = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="md:col-span-2 bg-slate-50 rounded-[3rem] p-10 text-slate-900 flex flex-col justify-center relative overflow-hidden border border-slate-200/60 shadow-soft hover:shadow-hover transition-all duration-500 hover:scale-[1.01] group">
      {/* Background Subtle Accents */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-100/50 rounded-full blur-[80px] opacity-40 group-hover:opacity-70 transition-opacity"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-blue-100/50 rounded-full blur-[80px] opacity-30 group-hover:opacity-60 transition-opacity"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h4 className="text-[10px] font-black tracking-[0.4em] text-indigo-600 mb-4 uppercase">Time Management</h4>
          <p className="text-5xl md:text-7xl font-black tracking-tighter tabular-nums text-slate-950">
            {timeString}
          </p>
          <p className="mt-4 text-slate-400 font-bold text-xs tracking-widest uppercase">
            {dateString}
          </p>
        </div>

        <div className="hidden md:block h-20 w-px bg-slate-200/80"></div>

        <div className="max-w-[200px] text-center md:text-right">
          <p className="text-[13px] text-slate-600 font-medium leading-relaxed italic">
            "효율적인 경영은 <br />
            정확한 시간 관리에서 <br />
            시작됩니다."
          </p>
          <div className="mt-6 flex justify-center md:justify-end gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
    </div>
  );
};

const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<{ temp: number; code: number; humidity: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.2636&longitude=127.0286&current=temperature_2m,relative_humidity_2m,weather_code');
        const data = await response.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
          humidity: data.current.relative_humidity_2m
        });
      } catch (error) {
        console.error("Weather fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const getWeatherUI = (code: number) => {
    if (code <= 1) return { icon: '☀️', label: 'Clear', bg: 'bg-amber-50 border-amber-100', text: 'text-amber-600' };
    if (code <= 3) return { icon: '☁️', label: 'Cloudy', bg: 'bg-slate-50 border-slate-100', text: 'text-slate-600' };
    if (code <= 48) return { icon: '🌫️', label: 'Foggy', bg: 'bg-slate-100 border-slate-200', text: 'text-slate-500' };
    if (code <= 67) return { icon: '🌧️', label: 'Rainy', bg: 'bg-blue-50 border-blue-100', text: 'text-blue-600' };
    return { icon: '❄️', label: 'Snowy', bg: 'bg-indigo-50 border-indigo-100', text: 'text-indigo-600' };
  };

  const ui = weather ? getWeatherUI(weather.code) : { icon: '📍', label: 'Suwon', bg: 'bg-slate-50 border-slate-100', text: 'text-slate-500' };

  return (
    <div className={`md:col-span-1 ${ui.bg} rounded-[3rem] p-10 border flex flex-col justify-between shadow-soft hover:shadow-hover transition-all duration-500 group overflow-hidden relative`}>
      <div className="absolute -right-4 -top-4 text-7xl opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700">
        {ui.icon}
      </div>
      
      <div>
        <p className={`${ui.text} font-black text-[9px] tracking-[0.3em] uppercase mb-4`}>Live in Suwon</p>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-8 w-24 bg-slate-200 rounded-lg"></div>
            <div className="h-4 w-16 bg-slate-100 rounded-md"></div>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">{weather?.temp}°</span>
              <span className="text-sm font-bold text-slate-400 mb-1">{ui.label}</span>
            </div>
            <p className="text-[12px] text-slate-500 mt-4 leading-relaxed font-medium">
              아주대학교 캠퍼스는 지금 <br />
              <span className="font-bold text-slate-800">{ui.label}</span> 날씨입니다.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-black/5 flex items-center justify-between">
         <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Humidity</span>
            <span className="text-xs font-bold text-slate-600">{weather?.humidity}%</span>
         </div>
         <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
            <svg className={`w-4 h-4 ${ui.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
         </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-20">
        <h2 className="text-[10px] font-black tracking-[0.5em] text-indigo-600 uppercase mb-4">Core Competencies</h2>
        <div className="flex items-end justify-between">
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter uppercase">ABOUT NANYOUNG</h3>
          <p className="text-slate-400 font-bold hidden md:block italic tracking-tight opacity-60 uppercase text-[10px]">Efficiency meets Creativity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
        {/* Bento Card 1: Academic Achievement */}
        <AcademicAchievementCard />

        {/* Bento Card 2: Live Clock Card (Now Slate-50 for higher contrast) */}
        <ClockCard />

        {/* Bento Card 3: Experience Image */}
        <div className="md:col-span-1 bg-white rounded-[3rem] border border-slate-100 shadow-soft hover:shadow-hover transition-all duration-500 group overflow-hidden relative">
          <img 
            src="https://cdn.news.unn.net/news/photo/202412/572175_387032_946.jpg" 
            alt="Jo Nanyoung Activity" 
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
             <p className="text-white text-[10px] font-black uppercase tracking-widest">Featured Activity</p>
          </div>
        </div>

        {/* Bento Card 4: Weather & Location */}
        <WeatherCard />
      </div>
    </div>
  );
};

export default About;
