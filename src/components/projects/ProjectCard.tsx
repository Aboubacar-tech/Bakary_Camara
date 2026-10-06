import React from 'react';
import { Project, Language } from '../../types/portfolio';
import { TRANSLATIONS } from '../../data/translations';
import { ArrowUpRight, Github, Cpu, Code2, Zap, Box } from 'lucide-react';
import { ShaderDistortionCard } from '../three/ShaderDistortionCard';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  language: Language;
  isDarkMode: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  language,
  isDarkMode
}) => {
  const t = TRANSLATIONS[language].projects;

  const getCategoryIcon = () => {
    switch (project.category) {
      case 'architecture':
        return <Cpu className="w-5 h-5 text-amber-500" />;
      case 'iac':
        return <Code2 className="w-5 h-5 text-sky-500" />;
      case 'serverless':
        return <Zap className="w-5 h-5 text-emerald-500" />;
      case 'containers':
        return <Box className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <ShaderDistortionCard
      className={`h-full rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
        isDarkMode
          ? 'bg-slate-900/90 backdrop-blur-xl border-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-black/60'
          : 'bg-white/95 backdrop-blur-xl border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5'
      }`}
      accentColor={project.category === 'architecture' ? '#f59e0b' : project.category === 'iac' ? '#38bdf8' : '#10b981'}
    >
      <div className="space-y-4">
        {/* Unboxed Metadata Header (NO PILLS) */}
        <div className={`flex items-center justify-between text-xs font-mono ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            {getCategoryIcon()}
            <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              {project.role[language]}
            </span>
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`transition-colors p-1 ${
              isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
            title="GitHub"
            aria-label={`Code source pour ${project.title[language]}`}
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Project Title and Subtitle */}
        <div>
          <h3 className={`text-xl font-bold font-display transition-colors ${
            isDarkMode
              ? 'text-white group-hover:text-amber-400'
              : 'text-slate-900 group-hover:text-amber-600'
          }`}>
            {project.title[language]}
          </h3>
          <p className={`text-xs mt-1 font-mono font-medium ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {project.subtitle[language]}
          </p>
        </div>

        {/* Summary */}
        <p className={`text-sm leading-relaxed line-clamp-3 font-normal ${
          isDarkMode ? 'text-slate-200' : 'text-slate-700'
        }`}>
          {project.summary[language]}
        </p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border ${
                isDarkMode
                  ? 'bg-white/[0.04] border-white/10'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {m.label[language]}
              </div>
              <div className={`text-base font-extrabold font-mono tabular-nums ${
                isDarkMode ? 'text-white' : 'text-slate-950'
              }`}>
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Stack list - unboxed with separators */}
        <div className={`pt-2 text-xs font-mono font-medium ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {project.stack.slice(0, 4).map((tech, idx) => (
            <span key={idx}>
              {tech}
              {idx < Math.min(project.stack.length, 4) - 1 && (
                <span className={`mx-1.5 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`}>·</span>
              )}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className={`ml-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className={`pt-5 border-t mt-5 flex items-center justify-between ${
        isDarkMode ? 'border-white/10' : 'border-slate-200'
      }`}>
        <button
          onClick={() => onOpenDetails(project)}
          className="text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer group/btn text-amber-400 hover:text-amber-300"
        >
          <span>{t.viewDetails}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </ShaderDistortionCard>
  );
};
