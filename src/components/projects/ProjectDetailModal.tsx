import React, { useState } from 'react';
import { Project, Language } from '../../types/portfolio';
import { TRANSLATIONS } from '../../data/translations';
import { X, Github, ExternalLink, CheckCircle, Copy, Check, Terminal, Play, AlertTriangle } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  language: Language;
  isDarkMode: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  language,
  isDarkMode
}) => {
  const [copied, setCopied] = useState(false);
  const [simulatedAzState, setSimulatedAzState] = useState<'normal' | 'failing' | 'recovered'>('normal');
  const [calcInstances, setCalcInstances] = useState(4);

  if (!project) return null;

  const t = TRANSLATIONS[language].projects;

  const handleCopySnippet = () => {
    if (project.architectureDetails.iacSnippet) {
      navigator.clipboard.writeText(project.architectureDetails.iacSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSimulateOutage = () => {
    setSimulatedAzState('failing');
    setTimeout(() => {
      setSimulatedAzState('recovered');
      setTimeout(() => setSimulatedAzState('normal'), 3500);
    }, 2000);
  };

  // FinOps calculation for project 3
  const hourlyRatePerInstance = 0.0464; // t3.medium
  const devHoursSaved = 440; // Saved per month
  const monthlySavings = (calcInstances * devHoursSaved * hourlyRatePerInstance).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className={`relative w-full max-w-4xl border rounded-2xl shadow-2xl overflow-hidden my-8 ${
          isDarkMode
            ? 'bg-neutral-900 border-white/15 text-neutral-100'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Header */}
        <div className={`p-6 border-b flex items-start justify-between ${
          isDarkMode ? 'border-white/10 bg-neutral-950/60' : 'border-neutral-100 bg-neutral-50/80'
        }`}>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-500 mb-1">
              <span>{project.role[language]}</span>
              <span aria-hidden="true">·</span>
              <span>{t.modalSubtitle}</span>
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold font-display">
              {project.title[language]}
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {project.subtitle[language]}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDarkMode
                ? 'text-neutral-400 hover:text-white hover:bg-white/10'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border ${
                  isDarkMode
                    ? 'bg-white/[0.03] border-white/5'
                    : 'bg-neutral-50 border-neutral-100'
                }`}
              >
                <div className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {m.label[language]}
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono mt-0.5 tabular-nums">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Simulation Module for HA Project */}
          {project.id === 'haute-dispo-aws' && (
            <div className={`p-5 rounded-xl border space-y-4 ${
              isDarkMode
                ? 'bg-neutral-950/80 border-amber-500/20'
                : 'bg-amber-50/40 border-amber-500/20'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-500" />
                    {t.simulationTitle}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {t.simulationDesc}
                  </p>
                </div>
                <button
                  onClick={handleSimulateOutage}
                  disabled={simulatedAzState !== 'normal'}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.simulateFailoverBtn}</span>
                </button>
              </div>

              {/* Simulation Visualizer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Zone A */}
                <div className={`p-4 rounded-lg border transition-all ${
                  simulatedAzState === 'failing'
                    ? 'border-red-500/50 bg-red-950/20'
                    : isDarkMode ? 'border-white/10 bg-neutral-900/60' : 'border-neutral-200 bg-white'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-medium">{t.zoneA}</span>
                    <span className={`font-mono text-xs font-semibold ${
                      simulatedAzState === 'failing' ? 'text-red-500 animate-pulse' : 'text-emerald-500'
                    }`}>
                      {simulatedAzState === 'failing' ? t.outageStatus : t.normalStatus}
                    </span>
                  </div>
                  <div className={`space-y-1.5 text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    <div>EC2 Instances: {simulatedAzState === 'failing' ? '0 active (Drain)' : '2 running'}</div>
                    <div>RDS Standby: {simulatedAzState === 'failing' ? 'Promu Master' : 'Primary Master'}</div>
                  </div>
                </div>

                {/* Zone B */}
                <div className={`p-4 rounded-lg border transition-all ${
                  simulatedAzState === 'failing'
                    ? 'border-emerald-500/50 bg-emerald-950/20 ring-1 ring-emerald-500/30'
                    : isDarkMode ? 'border-white/10 bg-neutral-900/60' : 'border-neutral-200 bg-white'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-medium">{t.zoneB}</span>
                    <span className="font-mono text-xs text-emerald-500 font-semibold">
                      {simulatedAzState === 'failing' ? '100% TRAFFIC' : t.normalStatus}
                    </span>
                  </div>
                  <div className={`space-y-1.5 text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    <div>EC2 Instances: {simulatedAzState === 'failing' ? '4 running (Auto Scaled)' : '2 running'}</div>
                    <div>RDS Status: {simulatedAzState === 'failing' ? 'Active Master (Failover sync)' : 'Secondary Standby'}</div>
                  </div>
                </div>
              </div>

              {simulatedAzState === 'recovered' && (
                <div className="text-xs text-emerald-500 font-mono flex items-center gap-1.5 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/30">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{t.failoverSuccess}</span>
                </div>
              )}
            </div>
          )}

          {/* Interactive Calculator for Cost Optimizer */}
          {project.id === 'cost-optimizer-serverless' && (
            <div className={`p-5 rounded-xl border space-y-4 ${
              isDarkMode
                ? 'bg-neutral-950/80 border-emerald-500/20'
                : 'bg-emerald-50/40 border-emerald-500/20'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    {t.finopsCalcTitle}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {t.finopsCalcDesc}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-emerald-500 tabular-nums">
                    ${monthlySavings}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {t.finopsSavingsLabel} · <span className="text-emerald-400 font-semibold font-mono">${(Number(monthlySavings) * 12).toFixed(0)}/an</span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className={`text-[11px] font-mono mr-1 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Préréglages :
                </span>
                {[
                  { label: 'Startup (3 EC2)', count: 3 },
                  { label: 'PME (8 EC2)', count: 8 },
                  { label: 'Entreprise (20 EC2)', count: 20 }
                ].map((preset) => (
                  <button
                    key={preset.count}
                    onClick={() => setCalcInstances(preset.count)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      calcInstances === preset.count
                        ? 'bg-emerald-500 text-neutral-950 font-bold'
                        : isDarkMode
                        ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-white/5'
                        : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <div className={`flex justify-between text-xs font-mono ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <span>{t.finopsDevInstances}: {calcInstances}</span>
                  <span>19h00 - 08h00 + Weekend</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={calcInstances}
                  onChange={(e) => setCalcInstances(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                {t.problemTitle}
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {project.architectureDetails.problem[language]}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t.solutionTitle}
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {project.architectureDetails.solution[language]}
              </p>
            </div>
          </div>

          {/* Key Components */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">{t.componentsTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.architectureDetails.components.map((comp, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border space-y-1 ${
                    isDarkMode
                      ? 'bg-white/[0.02] border-white/5'
                      : 'bg-neutral-50 border-neutral-100'
                  }`}
                >
                  <div className="text-sm font-medium text-amber-500">{comp.name}</div>
                  <div className={`text-xs leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {comp.role[language]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results achieved */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">{t.resultsTitle}</h3>
            <ul className="space-y-2">
              {project.architectureDetails.results.map((res, idx) => (
                <li
                  key={idx}
                  className={`text-sm flex items-start gap-2.5 ${
                    isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>{res[language]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* IaC Snippet */}
          {project.architectureDetails.iacSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {t.codeSnippetTitle}
                </span>
                <button
                  onClick={handleCopySnippet}
                  className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1 font-mono cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.copiedCode}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.copyCode}</span>
                    </>
                  )}
                </button>
              </div>
              <pre className={`p-4 rounded-xl border text-xs font-mono overflow-x-auto leading-relaxed ${
                isDarkMode
                  ? 'bg-neutral-950 border-white/10 text-neutral-300'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-100'
              }`}>
                <code>{project.architectureDetails.iacSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-2">
            <div className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Stack & Services AWS
            </div>
            <div className={`flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {project.stack.map((tech, idx) => (
                <span key={idx}>
                  {tech}
                  {idx < project.stack.length - 1 && (
                    <span className={`ml-2 ${isDarkMode ? 'text-neutral-600' : 'text-neutral-300'}`}>·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className={`p-6 border-t flex items-center justify-between ${
          isDarkMode ? 'border-white/10 bg-neutral-950/60' : 'border-neutral-100 bg-neutral-50/80'
        }`}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
              isDarkMode
                ? 'bg-neutral-800 hover:bg-neutral-700 text-white border-white/10'
                : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-200'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>{t.githubLink}</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
