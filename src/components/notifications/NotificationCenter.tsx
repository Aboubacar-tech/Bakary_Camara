import React, { useState } from 'react';
import { PushNotificationItem, Language } from '../../types/portfolio';
import { TRANSLATIONS } from '../../data/translations';
import { Bell, X, CheckCheck, AlertCircle, CheckCircle2, Info, Send, ShieldAlert } from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: PushNotificationItem[];
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  onTestNotification: () => void;
  language: Language;
  isDarkMode: boolean;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearNotifications,
  onTestNotification,
  language,
  isDarkMode
}) => {
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );

  const t = TRANSLATIONS[language].notifications;

  if (!isOpen) return null;

  const handleRequestNativePermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setBrowserPermission(perm);
        if (perm === 'granted') {
          new Notification('Bakary Camara - Cloud Portfolio', {
            body: language === 'en'
              ? 'Push notifications enabled! You will receive critical infrastructure alerts.'
              : 'Notifications push activées ! Vous recevrez les alertes critiques.',
            icon: '/favicon.ico'
          });
        }
      } catch (err) {
        console.error('Notification permission error:', err);
      }
    }
  };

  const getIcon = (type: PushNotificationItem['type']) => {
    switch (type) {
      case 'warning':
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-sky-500 shrink-0" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div
        className={`w-full max-w-md h-full border-l flex flex-col shadow-2xl animate-slide-left ${
          isDarkMode ? 'bg-neutral-900 border-white/10 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-center-title"
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isDarkMode ? 'border-white/10 bg-neutral-950/80' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 id="notification-center-title" className="text-base font-bold font-display">
                {t.title}
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {t.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
            }`}
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser Push Permission Banner */}
        <div className={`p-4 border-b space-y-2 ${
          isDarkMode ? 'bg-neutral-950 border-white/10' : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              {t.browserPush}
            </span>
            <span className={`font-mono text-[11px] ${
              browserPermission === 'granted' ? 'text-emerald-500 font-bold' : 'text-neutral-500'
            }`}>
              {browserPermission === 'granted' ? 'Active' : 'Off'}
            </span>
          </div>
          {browserPermission !== 'granted' ? (
            <button
              onClick={handleRequestNativePermission}
              className={`w-full py-1.5 px-3 text-xs font-medium rounded-lg border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                isDarkMode
                  ? 'bg-white/10 hover:bg-white/15 text-white border-white/10'
                  : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300 shadow-sm'
              }`}
            >
              <span>{t.enablePush}</span>
            </button>
          ) : (
            <div className="text-[11px] text-emerald-500 font-mono">
              {t.pushEnabled}
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className={`px-5 py-3 border-b flex items-center justify-between text-xs ${
          isDarkMode ? 'border-white/5 text-neutral-400' : 'border-neutral-100 text-neutral-500'
        }`}>
          <span>{notifications.length} {t.eventsCount}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onTestNotification}
              className="text-amber-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer font-mono"
            >
              <Send className="w-3 h-3" />
              <span>{t.simulateAlert}</span>
            </button>
            <button
              onClick={onMarkAllAsRead}
              className={`flex items-center gap-1 cursor-pointer transition-colors ${
                isDarkMode ? 'hover:text-white' : 'hover:text-neutral-900'
              }`}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{t.markAllRead}</span>
            </button>
          </div>
        </div>

        {/* Notification Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border transition-all ${
                notif.read
                  ? isDarkMode ? 'bg-neutral-950/40 border-white/5' : 'bg-neutral-50 border-neutral-100'
                  : isDarkMode
                  ? 'bg-neutral-950 border-amber-500/30 ring-1 ring-amber-500/20'
                  : 'bg-amber-50/40 border-amber-500/40 ring-1 ring-amber-500/30'
              }`}
            >
              <div className="flex items-start gap-3">
                {getIcon(notif.type)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">{notif.title}</span>
                    <span className={`text-[10px] font-mono ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      {notif.timestamp}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    {notif.message}
                  </p>
                  <div className={`pt-1 text-[10px] font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    Service: {notif.service}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className={`h-64 flex flex-col items-center justify-center text-center p-6 text-xs ${
              isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              <Bell className="w-8 h-8 mb-2 opacity-30" />
              <p>{t.emptyTitle}</p>
              <p className="mt-1 opacity-75">{t.emptyDesc}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between ${
          isDarkMode ? 'border-white/10 bg-neutral-950/80' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <button
            onClick={onClearNotifications}
            className="text-xs text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            {t.clearHistory}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
