import React from 'react';
import { PROFILE_DATA } from '../../data/portfolioData';
import { TRANSLATIONS } from '../../data/translations';
import { Language } from '../../types/portfolio';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, ShieldCheck, Cpu, Database, Activity } from 'lucide-react';
import { ShaderDistortionCard } from '../three/ShaderDistortionCard';
import { ProfileAvatar } from '../common/ProfileAvatar';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onExploreCloudWatch: () => void;
  onOpenCV: () => void;
  language: Language;
  isDarkMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onExploreCloudWatch,
  onOpenCV,
  language,
  isDarkMode
}) => {
  const t = TRANSLATIONS[language].hero;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Bold Typographic Impact & Core Value */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Profile Identity & Avatar Lockup */}
          <div className="flex items-center gap-4 sm:gap-5 pb-1">
            <ProfileAvatar size="lg" showBadge={true} allowUpload={true} />
            <div className="space-y-1.5">
              <div className={`flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <span className={`font-semibold flex items-center gap-1.5 ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-600'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
                  {t.statusBadge}
                </span>
                <span aria-hidden="true" className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>·</span>
                <span className={isDarkMode ? 'text-slate-200 font-medium' : 'text-slate-700 font-medium'}>{PROFILE_DATA.location}</span>
                <span aria-hidden="true" className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>·</span>
                <span className={`font-semibold ${isDarkMode ? 'text-sky-300' : 'text-sky-700'}`}>AWS SAA-C03</span>
              </div>
              <p className={`text-xs font-mono font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Photo officielle · {PROFILE_DATA.name}
              </p>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display leading-[1.05] drop-shadow-sm ${
              isDarkMode ? 'text-white' : 'text-slate-950'
            }`}>
              {t.titleLine1} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-sky-400 bg-clip-text text-transparent font-black">
                {t.titleLine2}
              </span>
            </h1>
            <p className={`text-lg sm:text-xl font-semibold ${
              isDarkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>
              {PROFILE_DATA.name}{' '}
              <span className={isDarkMode ? 'text-slate-300 font-normal' : 'text-slate-600 font-normal'}>
                / {t.role}
              </span>
            </p>
          </div>

          {/* Value Proposition */}
          <p className={`text-base sm:text-lg leading-relaxed max-w-2xl font-normal ${
            isDarkMode ? 'text-slate-200' : 'text-slate-700'
          }`}>
            {t.summary}
          </p>

          {/* Key Quantitative Proof Metrics */}
          <div className={`grid grid-cols-3 gap-4 pt-2 border-y py-4 max-w-xl ${
            isDarkMode ? 'border-white/15 bg-slate-900/50 backdrop-blur-md px-4 rounded-xl' : 'border-slate-200 bg-white/80 backdrop-blur-md px-4 rounded-xl shadow-xs'
          }`}>
            <div>
              <div className={`text-2xl sm:text-3xl font-extrabold font-mono tabular-nums ${
                isDarkMode ? 'text-white' : 'text-slate-950'
              }`}>
                99.9%
              </div>
              <div className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.stat1Label}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
                -62%
              </div>
              <div className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.stat2Label}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-400 tabular-nums">
                &lt; 5 min
              </div>
              <div className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.stat3Label}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreProjects}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold rounded-lg transition-all shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
            >
              <span>{t.btnProjects}</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreCloudWatch}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg border transition-all flex items-center gap-2 cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 hover:bg-slate-800 text-white border-white/20 hover:border-white/30'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <Activity className="w-4 h-4 text-sky-400" />
              <span>{t.btnCloudWatch}</span>
            </button>

            <button
              onClick={onOpenCV}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                isDarkMode
                  ? 'text-slate-200 hover:text-white hover:bg-white/10'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              {t.btnCV}
            </button>
          </div>

          {/* Social Links */}
          <div className={`flex items-center gap-4 text-sm pt-2 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <a
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 transition-colors font-medium ${
                isDarkMode ? 'hover:text-white' : 'hover:text-slate-950'
              }`}
            >
              <Github className="w-4 h-4" />
              <span className="font-mono text-xs">github.com/{PROFILE_DATA.githubUsername}</span>
            </a>
            <span aria-hidden="true" className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>·</span>
            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 transition-colors font-medium ${
                isDarkMode ? 'hover:text-white' : 'hover:text-slate-950'
              }`}
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
              <span className="font-mono text-xs">LinkedIn</span>
            </a>
            <span aria-hidden="true" className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>·</span>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className={`flex items-center gap-1.5 transition-colors font-medium ${
                isDarkMode ? 'hover:text-white' : 'hover:text-slate-950'
              }`}
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs">{PROFILE_DATA.email}</span>
            </a>
          </div>

        </div>

        {/* Right Column: Interactive 3D Cloud Topology Card */}
        <div className="lg:col-span-5 w-full">
          <ShaderDistortionCard
            className={`p-6 rounded-2xl border transition-all ${
              isDarkMode
                ? 'bg-slate-900/90 backdrop-blur-xl border-white/15 shadow-2xl shadow-black/60'
                : 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-xl shadow-slate-900/5'
            }`}
            accentColor="#f59e0b"
          >
            {/* Header with region status */}
            <div className={`flex items-center justify-between pb-4 border-b text-xs ${
              isDarkMode ? 'border-white/10' : 'border-slate-100'
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className={`font-mono font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  {t.awsRegionStatus}
                </span>
              </div>
              <span className="font-mono text-emerald-400 font-bold">{t.healthy}</span>
            </div>

            {/* Architecture Node Overview */}
            <div className="py-5 space-y-3.5">
              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                isDarkMode
                  ? 'bg-white/[0.04] border-white/10'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      AWS SAA-C03
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Solutions Architect Associate
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold">24/08/2026</span>
              </div>

              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                isDarkMode
                  ? 'bg-white/[0.04] border-white/10'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/15 text-sky-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Multi-AZ Auto Scaling
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      EC2 + ALB + VPC Private
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-sky-400 font-semibold">2 AZs</span>
              </div>

              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                isDarkMode
                  ? 'bg-white/[0.04] border-white/10'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      RDS MySQL Multi-AZ
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Standby Sync Replica
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">Lag: 2.1ms</span>
              </div>
            </div>

            {/* Live Trigger */}
            <div className={`pt-2 flex items-center justify-between text-xs font-mono ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <span>{t.shadersActive}</span>
              <button
                onClick={onExploreCloudWatch}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{t.openCloudwatch}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </ShaderDistortionCard>
        </div>

      </div>
    </section>
  );
};
