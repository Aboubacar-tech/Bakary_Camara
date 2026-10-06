import React, { useState, useEffect, useRef } from 'react';
import { CloudMetric, PushNotificationItem, Language } from '../../types/portfolio';
import { INITIAL_CLOUDWATCH_METRICS } from '../../data/portfolioData';
import { TRANSLATIONS } from '../../data/translations';
import { Activity, AlertTriangle, CheckCircle2, Play, Pause, Flame, Download, Sliders, Shield } from 'lucide-react';
import { ShaderDistortionCard } from '../three/ShaderDistortionCard';

interface CloudWatchDashboardProps {
  onTriggerNotification: (notification: PushNotificationItem) => void;
  language: Language;
  isDarkMode: boolean;
}

export const CloudWatchDashboard: React.FC<CloudWatchDashboardProps> = ({
  onTriggerNotification,
  language,
  isDarkMode
}) => {
  const [metrics, setMetrics] = useState<CloudMetric[]>(INITIAL_CLOUDWATCH_METRICS);
  const [refreshInterval, setRefreshInterval] = useState<number>(3000);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [activeEnv, setActiveEnv] = useState<string>('prod');
  const [cpuThreshold, setCpuThreshold] = useState<number>(70);
  const [isSurgeActive, setIsSurgeActive] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('En direct');
  const surgeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const t = TRANSLATIONS[language].cloudwatch;

  // Live metrics simulation
  useEffect(() => {
    if (!isLive) return;

    const timer = setInterval(() => {
      setLastSyncTime(new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'fr-FR'));

      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => {
          let delta = 0;
          let newHistory = [...metric.history];

          if (metric.id === 'cpu-utilization') {
            delta = isSurgeActive ? (Math.random() * 6 - 2) : (Math.random() * 4 - 2);
            let nextVal = Math.max(10, Math.min(98, metric.currentValue + delta));
            if (isSurgeActive) nextVal = Math.max(78, nextVal);

            newHistory.push(Number(nextVal.toFixed(1)));
            if (newHistory.length > 12) newHistory.shift();

            const isWarning = nextVal > cpuThreshold;
            return {
              ...metric,
              currentValue: Number(nextVal.toFixed(1)),
              history: newHistory,
              status: isWarning ? 'warning' : 'healthy',
              threshold: cpuThreshold
            };
          }

          if (metric.id === 'alb-latency') {
            delta = (Math.random() * 2 - 1);
            let nextVal = Math.max(8, Math.min(80, metric.currentValue + delta));
            newHistory.push(Number(nextVal.toFixed(1)));
            if (newHistory.length > 12) newHistory.shift();
            return {
              ...metric,
              currentValue: Number(nextVal.toFixed(1)),
              history: newHistory
            };
          }

          if (metric.id === 'rds-replication-lag') {
            delta = (Math.random() * 0.4 - 0.2);
            let nextVal = Math.max(0.8, Math.min(10, metric.currentValue + delta));
            newHistory.push(Number(nextVal.toFixed(1)));
            if (newHistory.length > 12) newHistory.shift();
            return {
              ...metric,
              currentValue: Number(nextVal.toFixed(1)),
              history: newHistory
            };
          }

          return metric;
        })
      );
    }, refreshInterval);

    return () => clearInterval(timer);
  }, [isLive, refreshInterval, isSurgeActive, cpuThreshold, language]);

  const [isInvalidatingCdn, setIsInvalidatingCdn] = useState<boolean>(false);

  // CloudFront Invalidation Handler
  const handleInvalidateCloudFront = () => {
    setIsInvalidatingCdn(true);
    setTimeout(() => {
      setIsInvalidatingCdn(false);
      setMetrics((prev) =>
        prev.map((m) =>
          m.id === 's3-cache-hit-rate'
            ? { ...m, currentValue: 99.9, history: [...m.history.slice(1), 99.9] }
            : m
        )
      );

      onTriggerNotification({
        id: `cdn-invalidated-${Date.now()}`,
        timestamp: 'À l\'instant',
        title: language === 'en'
          ? 'Amazon CloudFront: Invalidation Completed'
          : 'Amazon CloudFront : Invalidation terminée',
        message: language === 'en'
          ? 'Paths "/*" invalidated across 450+ edge locations. Cache refreshed to 99.9%.'
          : 'Chemins "/*" purgés sur 450+ Edge Locations. Cache rafraîchi à 99.9%.',
        type: 'success',
        read: false,
        service: 'CloudFront CDN / S3'
      });
    }, 1500);
  };

  // Handle simulated traffic surge
  const handleSimulateSurge = () => {
    setIsSurgeActive(true);
    setMetrics((prev) =>
      prev.map((m) =>
        m.id === 'cpu-utilization'
          ? { ...m, currentValue: 84.5, status: 'warning' }
          : m.id === 'asg-instances'
          ? { ...m, currentValue: 4 }
          : m
      )
    );

    // Trigger alert push notification
    onTriggerNotification({
      id: `alert-surge-${Date.now()}`,
      timestamp: 'À l\'instant',
      title: language === 'en'
        ? 'CloudWatch Alert: CPU Spike (>80%) Detected'
        : 'CloudWatch Alerte : Pic de CPU (>80%) détecté',
      message: language === 'en'
        ? 'Target Tracking policy triggered. Auto scaling spawned 2 new instances in eu-west-3a and eu-west-3b.'
        : 'Politique Target Tracking EC2 déclenchée. Scale-out automatique : 2 nouvelles instances créées.',
      type: 'warning',
      read: false,
      service: 'Auto Scaling / CloudWatch'
    });

    if (surgeTimeoutRef.current) clearTimeout(surgeTimeoutRef.current);
    surgeTimeoutRef.current = setTimeout(() => {
      setIsSurgeActive(false);
      setMetrics((prev) =>
        prev.map((m) =>
          m.id === 'cpu-utilization'
            ? { ...m, currentValue: 34.0, status: 'healthy' }
            : m.id === 'asg-instances'
            ? { ...m, currentValue: 2 }
            : m
        )
      );

      onTriggerNotification({
        id: `alert-normal-${Date.now()}`,
        timestamp: 'À l\'instant',
        title: language === 'en' ? 'Auto Scaling: Healthy Recovery' : 'Auto Scaling : Retour à la normale',
        message: language === 'en' ? 'CPU load stabilized under 40%. Capacity restored.' : 'Charge CPU stabilisée sous 40%. Capacité ajustée à 2 instances.',
        type: 'success',
        read: false,
        service: 'Auto Scaling'
      });
    }, 8000);
  };

  // Export JSON metrics
  const handleExportMetrics = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(metrics, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bakary-camara-metrics-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="cloudwatch" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b ${
        isDarkMode ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold">
            <Activity className="w-4 h-4" />
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

        {/* Live Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Pause / Resume */}
          <button
            onClick={() => setIsLive(!isLive)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer font-medium ${
              isDarkMode
                ? 'bg-slate-900 border-white/15 text-slate-200 hover:text-white hover:bg-slate-800'
                : 'bg-white border-slate-300 text-slate-800 hover:text-slate-950 shadow-sm'
            }`}
            title={isLive ? t.pause : t.live}
          >
            {isLive ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            <span className="font-mono text-xs">{isLive ? t.live : t.pause}</span>
          </button>

          {/* Traffic Surge Trigger */}
          <button
            onClick={handleSimulateSurge}
            disabled={isSurgeActive}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isSurgeActive
                ? 'bg-red-500/25 text-red-400 border border-red-500/50 animate-pulse'
                : isDarkMode
                ? 'bg-slate-900 hover:bg-slate-800 text-white border border-white/15 hover:border-amber-400/50'
                : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm hover:border-amber-500'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${isSurgeActive ? 'text-red-400' : 'text-amber-400'}`} />
            <span>{isSurgeActive ? t.surgingBtn : t.surgeBtn}</span>
          </button>

          {/* CloudFront Invalidate Cache Button */}
          <button
            onClick={handleInvalidateCloudFront}
            disabled={isInvalidatingCdn}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isInvalidatingCdn
                ? 'bg-sky-500/25 text-sky-300 border border-sky-500/50 animate-pulse'
                : isDarkMode
                ? 'bg-slate-900 hover:bg-slate-800 text-white border border-white/15 hover:border-sky-400/50'
                : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm hover:border-sky-500'
            }`}
            title="Purger le cache global Amazon CloudFront"
          >
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            <span>{isInvalidatingCdn ? 'Invalidation CDN...' : 'Purger Cache CloudFront'}</span>
          </button>

          {/* Configuration toggle */}
          <button
            onClick={() => setShowConfig(!showConfig)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900 border-white/15 text-slate-200 hover:text-white'
                : 'bg-white border-slate-300 text-slate-800 hover:text-slate-950 shadow-sm'
            }`}
            title={t.configTitle}
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Export button */}
          <button
            onClick={handleExportMetrics}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900 border-white/15 text-slate-200 hover:text-white'
                : 'bg-white border-slate-300 text-slate-800 hover:text-slate-950 shadow-sm'
            }`}
            title={t.exportJson}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Threshold Config Panel */}
      {showConfig && (
        <div className={`mt-6 p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 text-xs animate-fade-in ${
          isDarkMode ? 'bg-neutral-900/90 border-white/10' : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div className="flex items-center gap-3">
            <span className={`font-mono ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {t.alertThreshold}: {cpuThreshold}%
            </span>
            <input
              type="range"
              min="40"
              max="90"
              value={cpuThreshold}
              onChange={(e) => setCpuThreshold(Number(e.target.value))}
              className="w-36 h-1.5 rounded-lg appearance-none cursor-pointer accent-amber-500 bg-neutral-300 dark:bg-neutral-700"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}>
              {t.refreshSpeed}:
            </span>
            {[1000, 3000, 5000].map((rate) => (
              <button
                key={rate}
                onClick={() => setRefreshInterval(rate)}
                className={`px-2.5 py-1 rounded font-mono cursor-pointer transition-colors ${
                  refreshInterval === rate
                    ? 'bg-amber-400 text-neutral-950 font-bold'
                    : isDarkMode
                    ? 'bg-neutral-800 text-neutral-400'
                    : 'bg-white text-neutral-600 border border-neutral-200'
                }`}
              >
                {rate / 1000}s
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Environment Filter Tabs */}
      <div className="flex items-center justify-between pt-6 text-xs">
        <div className={`flex items-center gap-1.5 font-mono ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
          <span className="font-medium">{t.syncLabel} : {lastSyncTime}</span>
        </div>
        <div className={`flex gap-1 p-1 rounded-lg border ${
          isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-slate-100 border-slate-300'
        }`}>
          {[
            { id: 'prod', label: t.envProd },
            { id: 'staging', label: t.envStaging },
            { id: 'dev', label: t.envDev }
          ].map((env) => (
            <button
              key={env.id}
              onClick={() => setActiveEnv(env.id)}
              className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                activeEnv === env.id
                  ? isDarkMode ? 'bg-slate-800 text-white font-bold' : 'bg-white text-slate-950 font-bold shadow-sm'
                  : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              {env.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
        {metrics.map((metric) => {
          const isWarning = metric.status === 'warning';
          return (
            <ShaderDistortionCard
              key={metric.id}
              className={`p-5 rounded-2xl border transition-all ${
                isWarning
                  ? 'border-red-500/50 bg-red-950/25 shadow-xl shadow-red-950/40'
                  : isDarkMode
                  ? 'bg-slate-900/90 backdrop-blur-xl border-white/15 hover:border-white/30 hover:shadow-xl hover:shadow-black/50'
                  : 'bg-white/95 backdrop-blur-xl border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
              accentColor={isWarning ? '#ef4444' : '#38bdf8'}
            >
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {metric.category.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isWarning ? (
                      <span className="text-red-400 font-mono flex items-center gap-1 font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        ALERTE
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        NORMAL
                      </span>
                    )}
                  </div>
                </div>

                {/* Name & Big Metric */}
                <div>
                  <div className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {metric.name[language]}
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className={`text-3xl font-extrabold font-mono tabular-nums ${
                      isDarkMode ? 'text-white' : 'text-slate-950'
                    }`}>
                      {metric.currentValue}
                    </span>
                    <span className={`text-sm font-mono font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {metric.unit}
                    </span>
                  </div>
                </div>

                {/* Sparkline Graphic Visualization */}
                <div className="space-y-1.5 pt-2">
                  <div className={`flex items-center justify-between text-[11px] font-mono font-medium ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <span>{t.recentHistory}</span>
                    <span>Seuil: {metric.threshold}{metric.unit}</span>
                  </div>
                  <div className={`h-10 flex items-end gap-1 p-1 rounded-lg border ${
                    isDarkMode ? 'bg-black/60 border-white/10' : 'bg-slate-100 border-slate-200'
                  }`}>
                    {metric.history.map((val, idx) => {
                      const maxVal = Math.max(...metric.history, metric.threshold * 1.1, 10);
                      const heightPercent = Math.min(100, Math.max(15, (val / maxVal) * 100));
                      const isHigh = val > metric.threshold;
                      return (
                        <div
                          key={idx}
                          className="flex-1 rounded-sm transition-all duration-300"
                          style={{
                            height: `${heightPercent}%`,
                            backgroundColor: isHigh ? '#ef4444' : '#38bdf8',
                            opacity: 0.5 + (idx / metric.history.length) * 0.5
                          }}
                          title={`Valeur: ${val}${metric.unit}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </ShaderDistortionCard>
          );
        })}
      </div>

      {/* Cloud Architecture Status Ribbon */}
      <div className={`mt-8 p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 text-xs ${
        isDarkMode ? 'bg-slate-900/90 backdrop-blur-xl border-white/15' : 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className={`font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
            {t.slaNote}
          </span>
        </div>
        <div className={`font-mono font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          AWS Well-Architected Framework
        </div>
      </div>
    </section>
  );
};
