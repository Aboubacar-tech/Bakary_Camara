import React, { useRef, useState, useEffect } from 'react';
import { Camera, Check, Sparkles } from 'lucide-react';

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
  allowUpload?: boolean;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 'md',
  showBadge = true,
  className = '',
  allowUpload = true
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [showUploadToast, setShowUploadToast] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bakary_custom_avatar');
      if (saved) {
        setAvatarUrl(saved);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setAvatarUrl(result);
          try {
            localStorage.setItem('bakary_custom_avatar', result);
            setShowUploadToast(true);
            setTimeout(() => setShowUploadToast(false), 3000);
          } catch {
            // storage quota fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-14 h-14',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-32 h-32 sm:w-40 sm:h-40'
  };

  const badgeSizeClasses = {
    sm: 'w-2.5 h-2.5 -bottom-0.5 -right-0.5',
    md: 'w-3.5 h-3.5 bottom-0 right-0',
    lg: 'w-4 h-4 bottom-1 right-1',
    xl: 'w-5 h-5 bottom-1.5 right-1.5'
  };

  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* Hidden file input for uploading actual photo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Mettre à jour la photo de profil"
      />

      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden p-0.5 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10 group transition-all duration-300 hover:ring-amber-400`}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Bakary Camara - Ingénieur Cloud AWS & DevOps"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* High-Fidelity SVG Portrait Likeness (Navy Blue Suit, White Shirt, Gray Silk Tie) */
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full rounded-full bg-gradient-to-b from-[#b8b3ad] via-[#9e9790] to-[#807971]"
            aria-label="Bakary Camara portrait"
          >
            <defs>
              <radialGradient id="studioLight" cx="45%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#d5cfc8" />
                <stop offset="60%" stopColor="#a39c94" />
                <stop offset="100%" stopColor="#6e6861" />
              </radialGradient>
              <linearGradient id="suitGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2c3b5d" />
                <stop offset="50%" stopColor="#1e2942" />
                <stop offset="100%" stopColor="#162035" />
              </linearGradient>
              <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#694129" />
                <stop offset="60%" stopColor="#4f2f1a" />
                <stop offset="100%" stopColor="#3d2212" />
              </linearGradient>
              <linearGradient id="tieGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8c857e" />
                <stop offset="100%" stopColor="#544e47" />
              </linearGradient>
            </defs>

            {/* Studio Neutral Background */}
            <circle cx="100" cy="100" r="100" fill="url(#studioLight)" />

            {/* Shoulders & Navy Suit Jacket */}
            <path
              d="M10 200 C15 155, 50 145, 78 140 L100 175 L122 140 C150 145, 185 155, 190 200 Z"
              fill="url(#suitGrad)"
            />

            {/* Jacket Lapels */}
            <path
              d="M62 143 L88 200 L100 200 L82 141 Z"
              fill="#1b253b"
            />
            <path
              d="M138 143 L112 200 L100 200 L118 141 Z"
              fill="#263452"
            />

            {/* White Dress Shirt V */}
            <polygon points="80,140 120,140 100,185" fill="#f8fafc" />

            {/* Shirt Collar Points */}
            <polygon points="80,136 100,158 92,138" fill="#e2e8f0" />
            <polygon points="120,136 100,158 108,138" fill="#ffffff" />

            {/* Gray Silk Necktie */}
            <polygon points="96,150 104,150 106,195 100,200 94,195" fill="url(#tieGrad)" />
            <polygon points="95,148 105,148 103,156 97,156" fill="#6b645d" />

            {/* Neck */}
            <rect x="88" y="112" width="24" height="34" rx="6" fill="#442816" />

            {/* Head & Jaw */}
            <path
              d="M68 85 C68 45, 132 45, 132 85 C132 118, 118 132, 100 132 C82 132, 68 118, 68 85 Z"
              fill="url(#skinGrad)"
            />

            {/* Short Neat Hair (buzzcut) */}
            <path
              d="M66 75 C65 42, 135 42, 134 75 C132 60, 126 50, 100 48 C74 50, 68 60, 66 75 Z"
              fill="#18120e"
            />

            {/* Ears */}
            <ellipse cx="66" cy="88" rx="5" ry="9" fill="#54321c" />
            <ellipse cx="134" cy="88" rx="5" ry="9" fill="#442614" />

            {/* Eyes */}
            <ellipse cx="86" cy="84" rx="4.5" ry="2.8" fill="#1c110a" />
            <ellipse cx="114" cy="84" rx="4.5" ry="2.8" fill="#1c110a" />
            <circle cx="87" cy="83.5" r="1" fill="#ffffff" />
            <circle cx="115" cy="83.5" r="1" fill="#ffffff" />

            {/* Eyebrows */}
            <path d="M79 78 Q87 75 93 78" stroke="#18120e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M107 78 Q113 75 121 78" stroke="#18120e" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Nose */}
            <path d="M99 82 L97 97 Q100 100 103 97 Z" fill="#3b2011" />

            {/* Mouth */}
            <path d="M89 110 Q100 113 111 110" stroke="#2b160b" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Subtle Goatee / Shadow */}
            <ellipse cx="100" cy="120" rx="3.5" ry="2" fill="#201108" opacity="0.6" />
          </svg>
        )}

        {/* Hover Camera Icon for Easy Photo Upload / Update */}
        {allowUpload && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer rounded-full"
            title="Mettre à jour ma photo (importer IMG-20260518-WA0004.jpg)"
            aria-label="Modifier la photo"
          >
            <Camera className="w-5 h-5 text-amber-300 drop-shadow" />
            <span className="text-[9px] font-mono mt-0.5 font-bold tracking-tight text-amber-200">Photo</span>
          </button>
        )}
      </div>

      {/* Online / Availability Beacon Badge */}
      {showBadge && (
        <span
          className={`absolute ${badgeSizeClasses[size]} rounded-full bg-emerald-400 ring-2 ring-[#090d16] animate-pulse shadow-md shadow-emerald-400/50`}
          title="Disponible immédiatement"
        />
      )}

      {/* Upload Toast Confirmation */}
      {showUploadToast && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-emerald-600 text-white text-[11px] font-mono font-bold rounded-lg shadow-lg whitespace-nowrap z-50 flex items-center gap-1.5 animate-fade-in">
          <Check className="w-3.5 h-3.5" />
          <span>Photo enregistrée avec succès !</span>
        </div>
      )}
    </div>
  );
};
