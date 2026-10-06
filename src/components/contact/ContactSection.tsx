import React, { useState } from 'react';
import { PROFILE_DATA } from '../../data/portfolioData';
import { TRANSLATIONS } from '../../data/translations';
import { Language } from '../../types/portfolio';
import { Mail, Phone, MapPin, Send, Check, Copy, ExternalLink, Github, Linkedin, MessageCircle, FileText } from 'lucide-react';
import { ShaderDistortionCard } from '../three/ShaderDistortionCard';
import { ProfileAvatar } from '../common/ProfileAvatar';

interface ContactSectionProps {
  onOpenCV: () => void;
  language: Language;
  isDarkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenCV,
  language,
  isDarkMode
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const t = TRANSLATIONS[language].contact;

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`space-y-2 pb-12 border-b ${
        isDarkMode ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
          <Mail className="w-4 h-4" />
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 items-start">
        
        {/* Left Column: Direct Contacts & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <ShaderDistortionCard
            className={`p-6 rounded-2xl border space-y-6 ${
              isDarkMode ? 'bg-slate-900/90 backdrop-blur-xl border-white/15 shadow-xl shadow-black/50' : 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-sm'
            }`}
            accentColor="#f59e0b"
          >
            <div className="flex items-center gap-3.5">
              <ProfileAvatar size="md" showBadge={true} allowUpload={true} />
              <div>
                <h3 className={`text-lg font-bold font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                  {t.directTitle}
                </h3>
                <p className={`text-xs font-mono font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {PROFILE_DATA.name} · {PROFILE_DATA.location}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Email */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                isDarkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-[11px] font-mono font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t.emailLabel}
                    </div>
                    <a
                      href={`mailto:${PROFILE_DATA.email}`}
                      className={`text-sm font-bold transition-colors ${
                        isDarkMode ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-amber-600'
                      }`}
                    >
                      {PROFILE_DATA.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PROFILE_DATA.email, 'email')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    isDarkMode ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                  }`}
                  title="Copier l'email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                isDarkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/15 text-sky-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-[11px] font-mono font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t.phoneLabel}
                    </div>
                    <a
                      href={`tel:${PROFILE_DATA.phone}`}
                      className={`text-sm font-bold transition-colors ${
                        isDarkMode ? 'text-white hover:text-sky-400' : 'text-slate-900 hover:text-sky-600'
                      }`}
                    >
                      {PROFILE_DATA.phoneFormatted}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PROFILE_DATA.phone, 'phone')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    isDarkMode ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                  }`}
                  title="Copier le numéro"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                isDarkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-[11px] font-mono font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {t.locLabel}
                  </div>
                  <div className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {PROFILE_DATA.location} ({t.mobility})
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`https://wa.me/22376577421?text=${encodeURIComponent('Bonjour Bakary, j\'ai consulté votre portfolio AWS et souhaite échanger avec vous.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.whatsappBtn}</span>
              </a>

              <button
                onClick={onOpenCV}
                className={`py-2.5 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border-white/15'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>{t.cvBtn}</span>
              </button>
            </div>

            {/* Social links */}
            <div className={`pt-4 border-t flex items-center justify-around text-xs font-mono font-medium ${
              isDarkMode ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'
            }`}>
              <a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 transition-colors ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-slate-950'
                }`}
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <span className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>·</span>
              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 transition-colors ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-slate-950'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </ShaderDistortionCard>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7">
          <div className={`p-8 rounded-2xl border space-y-6 ${
            isDarkMode ? 'bg-slate-900/90 backdrop-blur-xl border-white/15 shadow-xl shadow-black/50' : 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-sm'
          }`}>
            <div>
              <h3 className={`text-xl font-extrabold font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                {t.formTitle}
              </h3>
              <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.formSubtitle}
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className={`text-base font-bold font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {t.successTitle}
                </h4>
                <p className={`text-xs max-w-sm mx-auto leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  {t.successMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-xs font-mono font-medium block mb-1.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs transition-colors focus:outline-none font-medium ${
                        isDarkMode
                          ? 'bg-slate-950 border border-white/15 text-white placeholder-slate-400 focus:border-amber-400'
                          : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-mono font-medium block mb-1.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                      {t.emailInputLabel}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs transition-colors focus:outline-none font-medium ${
                        isDarkMode
                          ? 'bg-slate-950 border border-white/15 text-white placeholder-slate-400 focus:border-amber-400'
                          : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`text-xs font-mono font-medium block mb-1.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    {t.subjectLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={t.subjectPlaceholder}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs transition-colors focus:outline-none font-medium ${
                      isDarkMode
                        ? 'bg-slate-950 border border-white/15 text-white placeholder-slate-400 focus:border-amber-400'
                        : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-mono font-medium block mb-1.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    {t.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={t.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full p-4 rounded-xl text-xs transition-colors focus:outline-none resize-none leading-relaxed font-normal ${
                      isDarkMode
                        ? 'bg-slate-950 border border-white/15 text-white placeholder-slate-400 focus:border-amber-400'
                        : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.sendBtn}</span>
                </button>
              </form>
            )}

            <div className={`pt-2 text-[11px] font-mono border-t ${
              isDarkMode ? 'text-slate-300 border-white/10' : 'text-slate-600 border-slate-200'
            }`}>
              <span className="font-medium">{t.responseTime}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
