import React from 'react';
import { Heart, Thermometer, CheckCircle2, Play, ShieldAlert, ArrowDown } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const RecoveryScreen: React.FC = () => {
  const { 
    sensorData, 
    settings, 
    setRiskLevel, 
    setScreen, 
    triggerHapticPulse 
  } = useBand();

  const lang = settings.language;

  const handleResume = () => {
    triggerHapticPulse('medium');
    setRiskLevel('NORMAL');
    setScreen('HOME');
  };

  const getTexts = () => {
    switch (lang) {
      case 'ta':
        return {
          status: 'மீட்பு நிலை',
          title: 'உடல் சீரடைதல்',
          badge: 'சீராகிறது',
          hrLabel: 'இதயத் துடிப்பு',
          skinLabel: 'தோல் வெப்பம்',
          skinStatus: 'சீராக உள்ளது',
          bannerTitle: '✓ உடல் நலம் சீராகிறது',
          bannerBody: 'மெதுவாக தொடரவும். தொடர்ந்து தண்ணீர் குடிக்கவும்.',
          resumeBtn: 'மீண்டும் தொடரவும்',
          disclaimer: 'பாதுகாப்புப் பரிந்துரை மட்டுமே. மருத்துவச் சான்று அல்ல.'
        };
      case 'hi':
        return {
          status: 'पुनर्प्राप्ति',
          title: 'पुनर्प्राप्ति निगरानी',
          badge: 'स्थिर हो रहा है',
          hrLabel: 'हृदय गति',
          skinLabel: 'त्वचा तापमान',
          skinStatus: 'सामान्य स्थिर',
          bannerTitle: '✓ स्वास्थ्य में सुधार हो रहा है',
          bannerBody: 'धीरे-धीरे काम पुनः प्रारंभ करें। पानी पीते रहें।',
          resumeBtn: 'काम पुनः शुरू करें',
          disclaimer: 'केवल सुरक्षा अनुशंसा। चिकित्सा प्रमाण पत्र नहीं।'
        };
      default:
        return {
          status: 'RECOVERY',
          title: 'RECOVERY MONITOR',
          badge: 'STABILIZING',
          hrLabel: 'Heart Rate',
          skinLabel: 'Skin Temp',
          skinStatus: 'STABLE',
          bannerTitle: '✓ RECOVERY IMPROVING',
          bannerBody: 'Resume activity slowly. Keep drinking water.',
          resumeBtn: 'RESUME ACTIVITY',
          disclaimer: 'Safety recommendation only. Not a medical clearance.'
        };
    }
  };

  const t = getTexts();

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-emerald-950/40 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={t.status} showClock={false} />

      {/* Screen Title */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <span className="text-[11.5px] font-black uppercase tracking-wider text-emerald-400">
          {t.title}
        </span>
        <span className="text-[8.5px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
          {t.badge}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-around px-3 py-1">
        
        {/* Physiological Normalization Cards */}
        <div className="grid grid-cols-2 gap-1.5">
          {/* Heart Rate Drop Card */}
          <div className="p-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[8.5px] text-slate-400 font-semibold uppercase">
              <Heart className="w-3 h-3 text-rose-400" />
              <span>{t.hrLabel}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xs text-slate-400 line-through">88</span>
              <ArrowDown className="w-3 h-3 text-emerald-400" />
              <span className="font-telemetry font-bold text-lg text-emerald-400">
                {sensorData.heartRate}
              </span>
              <span className="text-[8.5px] text-slate-400">BPM</span>
            </div>
          </div>

          {/* Skin Temperature Stability */}
          <div className="p-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[8.5px] text-slate-400 font-semibold uppercase">
              <Thermometer className="w-3 h-3 text-amber-400" />
              <span>{t.skinLabel}</span>
            </div>
            <div className="mt-1">
              <span className="font-telemetry font-bold text-base text-emerald-400">
                {sensorData.skinTemp}°C
              </span>
              <div className="text-[7.5px] text-emerald-300 font-semibold uppercase">
                {t.skinStatus}
              </div>
            </div>
          </div>
        </div>

        {/* Positive Recovery Banner */}
        <div className="p-2 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div className="min-w-0">
            <div className="text-[11px] font-black text-emerald-300 uppercase leading-tight">
              {t.bannerTitle}
            </div>
            <div className="text-[8.5px] text-slate-200 mt-0.5 leading-snug">
              {t.bannerBody}
            </div>
          </div>
        </div>

        {/* Big Touch Button to Resume Work */}
        <button
          onClick={handleResume}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-black font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/25"
        >
          <Play className="w-4 h-4 fill-black" />
          <span>{t.resumeBtn}</span>
        </button>

        {/* Safety Notice */}
        <div className="flex items-center justify-center gap-1 text-[7.5px] text-slate-400 text-center">
          <ShieldAlert className="w-2.5 h-2.5 text-amber-400 shrink-0" />
          <span>{t.disclaimer}</span>
        </div>

      </div>

      <ScreenFooter
        leftScreen={{ name: lang === 'ta' ? 'எச்சரிக்கை' : lang === 'hi' ? 'चेतावनी' : 'ALERT', target: 'HEAT_WARNING' }}
        rightScreen={{ name: lang === 'ta' ? 'முகப்பு' : lang === 'hi' ? 'मुख्य' : 'HOME', target: 'HOME' }}
      />
    </div>
  );
};
