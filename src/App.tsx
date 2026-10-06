import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CloudCanvas } from './components/three/CloudCanvas';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { CloudWatchDashboard } from './components/dashboard/CloudWatchDashboard';
import { SkillsSection } from './components/skills/SkillsSection';
import { CertificationsSection } from './components/certifications/CertificationsSection';
import { EndorsementsSection } from './components/testimonials/EndorsementsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { ResumeModal } from './components/resume/ResumeModal';
import { PushNotificationItem, Endorsement, Language } from './types/portfolio';
import { INITIAL_NOTIFICATIONS, INITIAL_ENDORSEMENTS } from './data/portfolioData';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const mainContentRef = useRef<HTMLElement>(null);

  // Multi-Language State (Default: 'fr', also supports 'en' and 'bm')
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bakary_lang') as Language;
      if (saved && ['fr', 'en', 'bm'].includes(saved)) return saved;
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'en') return 'en';
    }
    return 'fr';
  });

  // Dark & Light Mode State (Strictly default to true = dark theme)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bakary_theme');
      if (saved) return saved === 'dark';
    }
    return true; // Default to dark mode
  });

  // Notifications State (Local client-side)
  const [notifications, setNotifications] = useState<PushNotificationItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bakary_notifications');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Endorsements
  const [endorsements] = useState<Endorsement[]>(INITIAL_ENDORSEMENTS);

  // Modals
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Sync theme with document class
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('bakary_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('bakary_theme', 'light');
    }
  }, [isDarkMode]);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('bakary_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  // Sync notifications to storage
  useEffect(() => {
    localStorage.setItem('bakary_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Section observer for Three.js camera choreographing
  useEffect(() => {
    const sectionIds = ['hero', 'projets', 'cloudwatch', 'competences', 'certifications', 'contact'];
    const handleScrollObserver = () => {
      const scrollPosition = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollObserver, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, []);

  // GSAP ScrollTrigger Fade-in & Slide-up on all main section containers
  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mainEl = mainContentRef.current;
    if (!mainEl) return;

    const ctx = gsap.context(() => {
      const sections = mainEl.querySelectorAll<HTMLElement>(':scope > section');

      sections.forEach((section, index) => {
        // Hero section enters immediately with a smooth entrance
        if (index === 0) {
          gsap.fromTo(
            section,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: 'power3.out',
              delay: 0.15
            }
          );
          return;
        }

        // All subsequent section containers enter with GSAP ScrollTrigger
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 45
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      });
    }, mainEl);

    return () => {
      ctx.revert();
    };
  }, [language]);

  // Keyboard Shortcuts (t: theme, l: language, r: resume)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 't' || e.key === 'T') {
        setIsDarkMode((prev) => !prev);
      } else if (e.key === 'l' || e.key === 'L') {
        setLanguage((prev) => (prev === 'fr' ? 'en' : prev === 'en' ? 'bm' : 'fr'));
      } else if (e.key === 'r' || e.key === 'R') {
        setIsResumeOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsNotifOpen(false);
        setIsResumeOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleTriggerNotification = (notif: PushNotificationItem) => {
    setNotifications((prev) => [notif, ...prev]);

    // Send native notification if granted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(notif.title, {
          body: notif.message,
          icon: '/favicon.ico'
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleTestNotification = () => {
    const mockServices = ['Amazon CloudWatch', 'AWS Lambda FinOps', 'EC2 Auto Scaling', 'Amazon CloudFront & S3'];
    const randomService = mockServices[Math.floor(Math.random() * mockServices.length)];
    handleTriggerNotification({
      id: `manual-test-${Date.now()}`,
      timestamp: 'À l\'instant',
      title: language === 'en'
        ? `System Alert: ${randomService}`
        : `Alerte Système : ${randomService}`,
      message: language === 'en'
        ? 'Real-time telemetry event executed on client device.'
        : 'Événement de télémétrie en direct exécuté sur le terminal client.',
      type: 'info',
      read: false,
      service: randomService
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#090d16] text-slate-100 selection:bg-amber-400/25 selection:text-amber-300'
          : 'bg-slate-50 text-slate-900 selection:bg-amber-500/25 selection:text-amber-900'
      }`}
    >
      {/* 3D WebGL Background Scene with GSAP-linked Camera and Custom Shaders */}
      <CloudCanvas currentSection={activeSection} isDarkMode={isDarkMode} />

      {/* Ambient Lighting & High-Contrast Atmospheric Scrim (Optimized for 100% text legibility) */}
      {isDarkMode ? (
        <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
          {/* Subtle atmospheric glow in top & right */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(56,189,248,0.08),transparent_70%)]" />
          <div className="absolute top-[35%] right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(245,158,11,0.05),transparent_70%)]" />
          {/* High-contrast gradient scrim to ensure all foreground typography is razor-sharp */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090d16]/85 via-[#090d16]/75 to-[#090d16]/90" />
        </div>
      ) : (
        <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
          <div className="absolute inset-0 bg-slate-50/70" />
        </div>
      )}

      {/* Top Bar Navigation (3-Zone Top Bar Contract with Theme and Language Selectors) */}
      <Navbar
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenNotifications={() => setIsNotifOpen(true)}
        unreadNotificationsCount={unreadCount}
        language={language}
        onSelectLanguage={setLanguage}
      />

      {/* Main Content Sections with GSAP ScrollTrigger Slide-Up & Fade-In */}
      <main ref={mainContentRef} className="relative z-10">
        <HeroSection
          onExploreProjects={() => scrollToSection('projets')}
          onExploreCloudWatch={() => scrollToSection('cloudwatch')}
          onOpenCV={() => setIsResumeOpen(true)}
          language={language}
          isDarkMode={isDarkMode}
        />

        <ProjectsSection
          language={language}
          isDarkMode={isDarkMode}
        />

        <CloudWatchDashboard
          onTriggerNotification={handleTriggerNotification}
          language={language}
          isDarkMode={isDarkMode}
        />

        <SkillsSection
          language={language}
          isDarkMode={isDarkMode}
        />

        <CertificationsSection
          language={language}
          isDarkMode={isDarkMode}
        />

        <EndorsementsSection
          endorsements={endorsements}
          language={language}
          isDarkMode={isDarkMode}
        />

        <ContactSection
          onOpenCV={() => setIsResumeOpen(true)}
          language={language}
          isDarkMode={isDarkMode}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenCV={() => setIsResumeOpen(true)}
        language={language}
        isDarkMode={isDarkMode}
      />

      {/* Modals & Dialogs (100% Client-Side) */}
      <NotificationCenter
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearNotifications={handleClearNotifications}
        onTestNotification={handleTestNotification}
        language={language}
        isDarkMode={isDarkMode}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        language={language}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
