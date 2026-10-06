import React from 'react';
import { PROFILE_DATA } from '../../data/portfolioData';
import { TRANSLATIONS } from '../../data/translations';
import { Language } from '../../types/portfolio';
import { Github, Linkedin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenCV: () => void;
  language: Language;
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCV, language, isDarkMode }) => {
  const t = TRANSLATIONS[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-12 px-4 sm:px-6 lg:px-8 text-xs ${
      isDarkMode ? 'border-white/10 bg-[#090d16] text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Rights */}
        <div className="space-y-1 text-center sm:text-left">
          <div className={`font-bold font-display text-sm ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
            {PROFILE_DATA.name}
          </div>
          <div className={`font-mono text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {PROFILE_DATA.title} · {PROFILE_DATA.location}
          </div>
          <div className={`text-[11px] pt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            © {new Date().getFullYear()} Bakary Camara. {t.rights}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-medium">
          <button
            onClick={onOpenCV}
            className={`transition-colors cursor-pointer ${
              isDarkMode ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            {t.cvLink}
          </button>
          <span className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>·</span>
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors flex items-center gap-1 ${
              isDarkMode ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <span className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>·</span>
          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors flex items-center gap-1 ${
              isDarkMode ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className={`p-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 font-mono text-xs font-semibold ${
            isDarkMode
              ? 'bg-slate-900 border-white/15 hover:border-amber-400 text-slate-200 hover:text-white'
              : 'bg-white border-slate-300 hover:border-amber-500 text-slate-700 hover:text-slate-950 shadow-sm'
          }`}
          title={t.top}
        >
          <ArrowUp className="w-4 h-4" />
          <span className="hidden sm:inline">{t.top}</span>
        </button>

      </div>
    </footer>
  );
};
