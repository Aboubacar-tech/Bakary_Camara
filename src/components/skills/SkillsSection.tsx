import React, { useState } from 'react';
import { SKILLS } from '../../data/portfolioData';
import { Language } from '../../types/portfolio';
import { TRANSLATIONS } from '../../data/translations';
import { Cpu, Terminal, Shield, Network, Globe, Check } from 'lucide-react';
import { ShaderDistortionCard } from '../three/ShaderDistortionCard';

interface SkillsSectionProps {
  language: Language;
  isDarkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ language, isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const t = TRANSLATIONS[language].skills;

  const categories = [
    { id: 'all', label: t.all, icon: Cpu },
    { id: 'cloud', label: t.catCloud, icon: Cpu },
    { id: 'iac', label: t.catIac, icon: Terminal },
    { id: 'devops', label: t.catDevops, icon: Shield },
    { id: 'network', label: t.catNetwork, icon: Network },
    { id: 'dev', label: t.catDev, icon: Globe }
  ];

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.details[language].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="competences" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b ${
        isDarkMode ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
            <Cpu className="w-4 h-4" />
            <span>{t.tag}</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-display ${
            isDarkMode ? 'text-white' : 'text-slate-950'
          }`}>
            {t.title}
          </h2>
          <p className={`text-base max-w-2xl font-normal leading-relaxed ${
            isDarkMode ? 'text-slate-200' : 'text-slate-700'
          }`}>
            {t.subtitle}
          </p>
        </div>

        {/* Search input */}
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-3.5 py-2 text-xs rounded-lg border focus:outline-none transition-colors font-medium ${
              isDarkMode
                ? 'bg-slate-900 border-white/15 text-white placeholder-slate-400 focus:border-amber-400'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500 shadow-sm'
            }`}
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pt-6 pb-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : isDarkMode
                  ? 'bg-slate-900/90 text-slate-200 hover:text-white border border-white/10'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill, idx) => (
          <ShaderDistortionCard
            key={idx}
            className={`p-5 rounded-xl border transition-all ${
              skill.highlight
                ? isDarkMode
                  ? 'border-amber-400/40 bg-amber-950/25 shadow-lg shadow-amber-950/20'
                  : 'border-amber-400/50 bg-amber-50/80 shadow-sm'
                : isDarkMode
                ? 'bg-slate-900/90 backdrop-blur-xl border-white/15 hover:border-white/30 hover:shadow-xl hover:shadow-black/50'
                : 'bg-white/95 backdrop-blur-xl border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
            accentColor={skill.highlight ? '#f59e0b' : '#38bdf8'}
          >
            <div className="space-y-3">
              {/* Skill Name & Level */}
              <div className="flex items-start justify-between gap-2">
                <h3 className={`text-sm font-bold transition-colors ${
                  isDarkMode ? 'text-white group-hover:text-amber-300' : 'text-slate-900 group-hover:text-amber-600'
                }`}>
                  {skill.name}
                </h3>
                <span className={`text-[11px] font-mono shrink-0 font-semibold ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  {skill.level[language]}
                </span>
              </div>

              {/* Skill Details */}
              <p className={`text-xs leading-relaxed font-normal ${
                isDarkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>
                {skill.details[language]}
              </p>

              {/* Status Indicator */}
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>{t.verifiedBadge}</span>
              </div>
            </div>
          </ShaderDistortionCard>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className={`text-center py-12 text-sm font-mono ${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {t.noResults}
        </div>
      )}
    </section>
  );
};
