import React, { useState } from 'react';
import { PROFILE_DATA, CERTIFICATIONS, PROJECTS, SKILLS, EDUCATION_DATA } from '../../data/portfolioData';
import { TRANSLATIONS } from '../../data/translations';
import { Language } from '../../types/portfolio';
import { X, Printer, Copy, Check, Mail, Phone, MapPin } from 'lucide-react';
import { ProfileAvatar } from '../common/ProfileAvatar';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isDarkMode: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  language,
  isDarkMode
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const t = TRANSLATIONS[language].resume;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const cvText = `
${PROFILE_DATA.name.toUpperCase()}
${PROFILE_DATA.title.toUpperCase()}
${PROFILE_DATA.location} • ${PROFILE_DATA.email} • ${PROFILE_DATA.phone} • ${PROFILE_DATA.linkedin} • ${PROFILE_DATA.github}

${t.professionalSummary}
${PROFILE_DATA.summary[language]}

${t.certificationsTitle}
${CERTIFICATIONS.map(c => `- ${c.title} — ${c.issuer}, ${c.date[language]}`).join('\n')}

${t.projectsTitle}
${PROJECTS.map((p, idx) => `${idx + 1}. ${p.title[language]}\n${p.summary[language]}\nLink: ${p.githubUrl}`).join('\n\n')}

${t.skillsTitle}
${SKILLS.map(s => `- ${s.name} (${s.level[language]}): ${s.details[language]}`).join('\n')}

${t.educationTitle}
${EDUCATION_DATA.map(e => `- ${e.degree[language]} — ${e.institution} (${e.period})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(cvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in print:p-0 print:bg-white print:static">
      <div
        className={`relative w-full max-w-4xl border rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 print:border-none print:shadow-none print:bg-white print:text-black print:m-0 print:rounded-none ${
          isDarkMode ? 'bg-neutral-900 border-white/15 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        {/* Action Header (Hidden in Print) */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between print:hidden ${
          isDarkMode ? 'border-white/10 bg-neutral-950/80' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <div className="flex items-center gap-2">
            <h2 id="resume-modal-title" className="text-base font-bold font-display">
              {t.title}
            </h2>
            <span className="text-xs text-amber-500 font-mono">[{t.formatTag}]</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white'
                  : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
              }`}
              title={t.copyBtn}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copiedBtn : t.copyBtn}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printBtn}</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ml-1 ${
                isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible space-y-8 print:p-0">
          
          {/* Header Block */}
          <div className={`border-b pb-6 space-y-4 ${
            isDarkMode ? 'border-white/15' : 'border-neutral-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <ProfileAvatar size="md" showBadge={false} allowUpload={true} />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                    {PROFILE_DATA.name.toUpperCase()}
                  </h1>
                  <span className="text-sm font-semibold font-mono text-amber-500">
                    {PROFILE_DATA.secondaryTitle}
                  </span>
                </div>
              </div>
            </div>

            <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {PROFILE_DATA.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                {PROFILE_DATA.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                {PROFILE_DATA.phoneFormatted}
              </span>
              <span>·</span>
              <a href={PROFILE_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-sky-500">
                linkedin.com/in/{PROFILE_DATA.linkedinHandle}
              </a>
              <span>·</span>
              <a href={PROFILE_DATA.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-sky-500">
                github.com/{PROFILE_DATA.githubUsername}
              </a>
            </div>
          </div>

          {/* Résumé Professionnel */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-amber-500 font-mono">
              {t.professionalSummary}
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed text-justify ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {PROFILE_DATA.summary[language]}
            </p>
          </div>

          {/* Certifications & Formations Cloud */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold tracking-wider uppercase text-amber-500 font-mono">
              {t.certificationsTitle}
            </h2>
            <ul className={`space-y-1.5 text-xs ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.id} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <div>
                    <strong className={isDarkMode ? 'text-white' : 'text-neutral-900'}>{cert.title}</strong> — {cert.issuer}, {cert.date[language]}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Projets Cloud */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold tracking-wider uppercase text-amber-500 font-mono">
              {t.projectsTitle}
            </h2>
            
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                  <strong className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {proj.title[language]}
                  </strong>
                  <span className={`font-mono text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {proj.subtitle[language]}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {proj.summary[language]}
                </p>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-sky-500 font-mono hover:underline inline-block"
                >
                  {proj.githubUrl.replace('https://', '')}
                </a>
              </div>
            ))}
          </div>

          {/* Compétences Techniques */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-amber-500 font-mono">
              {t.skillsTitle}
            </h2>
            <div className={`space-y-1.5 text-xs ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              <div>
                <strong className={isDarkMode ? 'text-white' : 'text-neutral-900'}>• AWS / Cloud :</strong> EC2, VPC, ELB/ALB, Auto Scaling, RDS (MySQL), IAM, Security Groups, S3, CloudWatch, EventBridge, Lambda
              </div>
              <div>
                <strong className={isDarkMode ? 'text-white' : 'text-neutral-900'}>• Infrastructure as Code :</strong> Terraform, CloudFormation, Ansible
              </div>
              <div>
                <strong className={isDarkMode ? 'text-white' : 'text-neutral-900'}>• DevOps & Systèmes :</strong> Linux (Ubuntu/CentOS), Docker, Git/GitHub, CI/CD (GitHub Actions), Bash, Python
              </div>
              <div>
                <strong className={isDarkMode ? 'text-white' : 'text-neutral-900'}>• Réseaux & Support :</strong> VPC, subnets publics/privés, NAT Gateway, protocoles TCP/IP, notions LAN/WAN
              </div>
            </div>
          </div>

          {/* Formation Académique */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-amber-500 font-mono">
              {t.educationTitle}
            </h2>
            <ul className={`space-y-1 text-xs ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {EDUCATION_DATA.map((edu, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <div>
                    <strong className={isDarkMode ? 'text-white' : 'text-neutral-900'}>{edu.degree[language]}</strong> — {edu.institution} ({edu.period})
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
