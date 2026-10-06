import React, { useState } from 'react';
import { Project, Language } from '../../types/portfolio';
import { PROJECTS } from '../../data/portfolioData';
import { TRANSLATIONS } from '../../data/translations';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Layers } from 'lucide-react';

interface ProjectsSectionProps {
  language: Language;
  isDarkMode: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ language, isDarkMode }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const t = TRANSLATIONS[language].projects;

  const categories = [
    { id: 'all', label: t.all },
    { id: 'architecture', label: t.filterHa },
    { id: 'iac', label: t.filterIac },
    { id: 'serverless', label: t.filterFinops },
    { id: 'containers', label: t.filterDocker }
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projets" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b ${
        isDarkMode ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
            <Layers className="w-4 h-4" />
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

        {/* Interactive Filter Tabs */}
        <div className={`flex flex-wrap gap-1 p-1 rounded-xl border self-start md:self-end ${
          isDarkMode
            ? 'bg-slate-900/90 border-white/15 backdrop-blur-md'
            : 'bg-slate-100 border-slate-300'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : isDarkMode
                  ? 'text-slate-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenDetails={(p) => setSelectedProject(p)}
            language={language}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        language={language}
        isDarkMode={isDarkMode}
      />
    </section>
  );
};
