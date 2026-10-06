import React, { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../../data/portfolioData';
import { TRANSLATIONS } from '../../data/translations';
import { Language } from '../../types/portfolio';
import { Sun, Moon, Bell, Menu, X, Globe } from 'lucide-react';
import { ProfileAvatar } from '../common/ProfileAvatar';

interface NavbarProps {
  activeSection: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  isDarkMode,
  onToggleTheme,
  onOpenNotifications,
  unreadNotificationsCount,
  language,
  onSelectLanguage
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = TRANSLATIONS[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t.home },
    { id: 'projets', label: t.projects },
    { id: 'cloudwatch', label: t.cloudwatch },
    { id: 'competences', label: t.skills },
    { id: 'certifications', label: t.certifications },
    { id: 'contact', label: t.contact }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: 'FR' },
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'bm', label: 'Bamanankan', flag: 'BM' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? 'bg-[#090d16]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-900/5'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark with personal avatar */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className={`flex items-center gap-2.5 text-base sm:text-lg font-extrabold tracking-tight font-display transition-colors ${
            isDarkMode ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-amber-600'
          }`}
        >
          <ProfileAvatar size="sm" showBadge={false} allowUpload={false} />
          <span>{PROFILE_DATA.name}</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative py-1 text-sm transition-colors cursor-pointer ${
                activeSection === link.id
                  ? isDarkMode
                    ? 'text-amber-400 font-bold'
                    : 'text-amber-600 font-bold'
                  : isDarkMode
                  ? 'hover:text-white text-slate-300'
                  : 'hover:text-slate-950 text-slate-700'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                    isDarkMode ? 'bg-amber-400' : 'bg-amber-600'
                  }`}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Language Switcher, Theme Switcher, Notifications, CTA) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Multi-language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'border-white/15 hover:border-white/30 bg-slate-900/80 text-slate-200 hover:text-white'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-100 text-slate-800 hover:text-slate-950'
              }`}
              title="Changer la langue / Switch language / Kan yɛlɛma"
              aria-label="Changer la langue"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase font-bold">{language}</span>
            </button>

            {langMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-36 rounded-xl shadow-xl py-1.5 border z-50 text-xs font-mono animate-fade-in ${
                  isDarkMode
                    ? 'bg-neutral-900 border-white/10 text-neutral-200 shadow-black/50'
                    : 'bg-white border-neutral-200 text-neutral-800 shadow-neutral-200'
                }`}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onSelectLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors cursor-pointer ${
                      language === l.code
                        ? isDarkMode
                          ? 'bg-amber-500/10 text-amber-400 font-bold'
                          : 'bg-amber-50 text-amber-600 font-bold'
                        : isDarkMode
                        ? 'hover:bg-white/5 text-neutral-400 hover:text-white'
                        : 'hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] opacity-60">[{l.flag}]</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDarkMode
                ? 'text-slate-300 hover:text-white hover:bg-white/10'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
            }`}
            aria-label={isDarkMode ? t.themeLight : t.themeDark}
            title={isDarkMode ? t.themeLight : t.themeDark}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-800" />
            )}
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={onOpenNotifications}
            className={`relative p-2 rounded-lg transition-colors cursor-pointer ${
              isDarkMode
                ? 'text-slate-300 hover:text-white hover:bg-white/10'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
            }`}
            aria-label={`Notifications (${unreadNotificationsCount})`}
            title={t.notifications}
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            )}
          </button>

          {/* Primary Action CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shadow-sm cursor-pointer bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20"
          >
            {t.discuss}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
              isDarkMode
                ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl ${
            isDarkMode
              ? 'bg-neutral-950/95 border-white/10'
              : 'bg-white/95 border-neutral-200'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? isDarkMode
                    ? 'bg-amber-500/10 text-amber-400 font-semibold'
                    : 'bg-amber-50 text-amber-600 font-semibold'
                  : isDarkMode
                  ? 'text-neutral-300 hover:bg-white/5 hover:text-white'
                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Mobile Language Switcher row */}
          <div className="pt-3 border-t border-neutral-500/20 flex items-center justify-between">
            <span className={`text-xs font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Langue / Language:
            </span>
            <div className="flex gap-1.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onSelectLanguage(l.code)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-colors ${
                    language === l.code
                      ? 'bg-amber-400 text-neutral-950'
                      : isDarkMode
                      ? 'bg-neutral-900 text-neutral-400 hover:text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {l.flag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
