import React, { useState } from 'react';
import { CERTIFICATIONS, EDUCATION_DATA } from '../../data/portfolioData';
import { Certification, Language } from '../../types/portfolio';
import { TRANSLATIONS } from '../../data/translations';
import { Award, ExternalLink, CheckCircle, GraduationCap, X, ShieldCheck } from 'lucide-react';
import { ShaderDistortionCard } from '../three/ShaderDistortionCard';

interface CertificationsSectionProps {
  language: Language;
  isDarkMode: boolean;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  language,
  isDarkMode
}) => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const t = TRANSLATIONS[language].certifications;

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`space-y-2 pb-12 border-b ${
        isDarkMode ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
          <Award className="w-4 h-4" />
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

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {CERTIFICATIONS.map((cert) => {
          const isFeatured = cert.id === 'aws-saa-c03';
          return (
            <ShaderDistortionCard
              key={cert.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all cursor-pointer ${
                isFeatured
                  ? isDarkMode
                    ? 'border-amber-400/40 bg-amber-950/25 shadow-xl shadow-amber-950/20'
                    : 'border-amber-400/50 bg-amber-50/80 shadow-md shadow-amber-500/10'
                  : isDarkMode
                  ? 'bg-slate-900/90 backdrop-blur-xl border-white/15 hover:border-white/30 hover:shadow-xl hover:shadow-black/50'
                  : 'bg-white/95 backdrop-blur-xl border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
              accentColor={isFeatured ? '#f59e0b' : '#38bdf8'}
            >
              <div className="space-y-4">
                {/* Header Metadata (NO PILLS) */}
                <div className={`flex items-center justify-between text-xs font-mono font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  <span className="text-amber-400 font-semibold">{cert.issuer}</span>
                  <span aria-hidden="true" className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>·</span>
                  <span>{cert.date[language]}</span>
                </div>

                {/* Title */}
                <div>
                  <h3 className={`text-lg font-bold font-display transition-colors ${
                    isDarkMode ? 'text-white group-hover:text-amber-300' : 'text-slate-900 group-hover:text-amber-600'
                  }`}>
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-medium mt-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{cert.status[language]}</span>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed font-normal ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  {cert.description[language]}
                </p>

                {/* Skills verified */}
                <div className={`text-xs font-mono font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {cert.skills.map((skill, idx) => (
                    <span key={idx}>
                      {skill}
                      {idx < cert.skills.length - 1 && (
                        <span className={`mx-1.5 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`}>·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className={`pt-6 border-t mt-6 flex items-center justify-between ${
                isDarkMode ? 'border-white/10' : 'border-slate-200'
              }`}>
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer text-amber-400 hover:text-amber-300"
                >
                  <span>{t.viewCert}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </ShaderDistortionCard>
          );
        })}
      </div>

      {/* Academic Education Timeline */}
      <div className={`mt-20 pt-12 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>{t.academicTag}</span>
        </div>
        <h3 className={`text-2xl font-extrabold font-display mb-8 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
          {t.academicTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EDUCATION_DATA.map((edu, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border space-y-2 transition-colors ${
                isDarkMode
                  ? 'bg-slate-900/90 backdrop-blur-xl border-white/10 hover:border-white/20'
                  : 'bg-white/95 backdrop-blur-xl border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="text-xs text-amber-400 font-mono font-semibold">{edu.period}</div>
              <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {edu.degree[language]}
              </h4>
              <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                {edu.institution}
              </div>
              <p className={`text-xs leading-relaxed pt-1 font-normal ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {edu.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Credential Details Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`relative w-full max-w-lg border rounded-2xl p-6 shadow-2xl space-y-5 ${
            isDarkMode ? 'bg-neutral-900 border-white/15 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className={`text-xs font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {selectedCert.issuer}
                  </div>
                  <h3 className="text-base font-bold">{selectedCert.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 text-xs font-mono ${
              isDarkMode ? 'bg-neutral-950 border-white/10' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}>Statut :</span>
                <span className="text-emerald-500 font-semibold">{selectedCert.status[language]}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}>Date :</span>
                <span>{selectedCert.date[language]}</span>
              </div>
              {selectedCert.credentialId && (
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}>ID :</span>
                  <span className="text-amber-500">{selectedCert.credentialId}</span>
                </div>
              )}
            </div>

            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              {selectedCert.description[language]}
            </p>

            <div className="flex items-center justify-between pt-2">
              {selectedCert.link && (
                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:underline font-mono"
                >
                  <span>{t.officialPage}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-semibold rounded-lg hover:bg-amber-300 transition-colors ml-auto cursor-pointer shadow-sm"
              >
                {t.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
