import React from 'react';
import { Endorsement, Language } from '../../types/portfolio';
import { TRANSLATIONS } from '../../data/translations';
import { MessageSquareQuote, CheckCircle } from 'lucide-react';
import { ShaderDistortionCard } from '../three/ShaderDistortionCard';

interface EndorsementsSectionProps {
  endorsements: Endorsement[];
  language: Language;
  isDarkMode: boolean;
}

export const EndorsementsSection: React.FC<EndorsementsSectionProps> = ({
  endorsements,
  language,
  isDarkMode
}) => {
  const t = TRANSLATIONS[language].testimonials;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`space-y-2 pb-10 border-b ${
        isDarkMode ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
          <MessageSquareQuote className="w-4 h-4" />
          <span>{t.tag}</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-display ${
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

      {/* Endorsements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
        {endorsements.map((item) => (
          <ShaderDistortionCard
            key={item.id}
            className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              isDarkMode
                ? 'bg-slate-900/90 backdrop-blur-xl border-white/15'
                : 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-sm'
            }`}
            accentColor="#f59e0b"
          >
            <div className="space-y-4">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p className={`text-sm italic leading-relaxed font-normal ${
                isDarkMode ? 'text-slate-100' : 'text-slate-800'
              }`}>
                "{item.comment[language]}"
              </p>
            </div>

            {/* Author Lockup */}
            <div className={`pt-6 border-t mt-6 flex items-center justify-between ${
              isDarkMode ? 'border-white/10' : 'border-slate-200'
            }`}>
              <div>
                <div className={`text-sm font-bold flex items-center gap-1.5 ${
                  isDarkMode ? 'text-white' : 'text-slate-950'
                }`}>
                  <span>{item.authorName}</span>
                  {item.verified && (
                    <span title="Profil vérifié">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                  )}
                </div>
                <div className={`text-xs font-mono font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {item.authorRole} · {item.authorCompany}
                </div>
              </div>
              <span className={`text-xs font-mono font-medium ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {item.date}
              </span>
            </div>
          </ShaderDistortionCard>
        ))}
      </div>
    </section>
  );
};
