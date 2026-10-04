import React from 'react';
import { 
  Heart, 
  Thermometer, 
  Flame, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  Droplets, 
  Info,
  ThermometerSun,
  Armchair,
  Clock
} from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const HomeScreen: React.FC = () => {
  const { 
    sensorData, 
    aiRisk, 
    setScreen, 
    settings,
    triggerHapticPulse 
  } = useBand();

  const lang = settings.language;

  // Trilingual Risk Configuration
  const getRiskConfig = () => {
    switch (aiRisk.riskLevel) {
      case 'NORMAL':
        return {
          title: lang === 'ta' ? 'நீங்கள் நலம்' : lang === 'hi' ? 'आप सुरक्षित हैं' : 'YOU ARE OK',
          subtitle: lang === 'ta' ? 'அபாயம்: குறைவு' : lang === 'hi' ? 'जोखिम: कम' : 'Risk: Low',
          badgeText: lang === 'ta' ? 'இயல்பு நிலை' : lang === 'hi' ? 'सामान्य' : 'NORMAL',
          colorClass: 'text-emerald-400',
          borderClass: 'border-emerald-500/50',
          bgClass: 'bg-emerald-500/10',
          glowClass: 'risk-glow-green',
          icon: ShieldCheck,
          accentBg: 'from-emerald-950/40 via-slate-900/60 to-black'
        };
      case 'YELLOW':
        return {
          title: lang === 'ta' ? 'கவனம் தேவை' : lang === 'hi' ? 'सावधानी बरतें' : 'TAKE CARE',
          subtitle: lang === 'ta' ? 'அபாயம்: கூடுகிறது' : lang === 'hi' ? 'तनाव बढ़ रहा है' : 'Risk: Elevated',
          badgeText: lang === 'ta' ? 'கவனம்' : lang === 'hi' ? 'सावधानी' : 'ELEVATED',
          colorClass: 'text-yellow-400',
          borderClass: 'border-yellow-500/50',
          bgClass: 'bg-yellow-500/10',
          glowClass: 'risk-glow-yellow',
          icon: AlertTriangle,
          accentBg: 'from-amber-950/40 via-slate-900/60 to-black'
        };
      case 'ORANGE':
        return {
          title: lang === 'ta' ? 'உடனே ஓய்வெடு' : lang === 'hi' ? 'तुरंत आराम करें' : 'REST NOW',
          subtitle: lang === 'ta' ? 'வெப்ப அழுத்தம் உயர்கிறது' : lang === 'hi' ? 'ताप तनाव बढ़ रहा है' : 'Heat strain rising',
          badgeText: lang === 'ta' ? 'ஓய்வு தேவை' : lang === 'hi' ? 'आराम आवश्यक' : 'REST NEEDED',
          colorClass: 'text-orange-400',
          borderClass: 'border-orange-500/60',
          bgClass: 'bg-orange-500/15',
          glowClass: 'risk-glow-orange',
          icon: Flame,
          accentBg: 'from-orange-950/50 via-slate-900/60 to-black'
        };
      case 'RED':
        return {
          title: lang === 'ta' ? 'உடனடி உதவி தேவை' : lang === 'hi' ? 'मदद लें' : 'GET HELP',
          subtitle: lang === 'ta' ? 'அவசர நிலை வாய்ப்பு' : lang === 'hi' ? 'संभावित आपातकाल' : 'Possible emergency',
          badgeText: lang === 'ta' ? 'அவசரம்' : lang === 'hi' ? 'आपातकाल' : 'EMERGENCY',
          colorClass: 'text-rose-400',
          borderClass: 'border-rose-500/70',
          bgClass: 'bg-rose-500/20',
          glowClass: 'risk-glow-red',
          icon: AlertCircle,
          accentBg: 'from-rose-950/60 via-slate-900/70 to-black'
        };
    }
  };

  const riskCfg = getRiskConfig();
  const RiskIcon = riskCfg.icon;

  return (
    <div className={`w-full h-full flex flex-col justify-between bg-gradient-to-b ${riskCfg.accentBg} select-none overflow-hidden relative`}>
      {/* Top Status */}
      <StatusBar showClock={true} />

      {/* Main Wearable Content Area */}
      <div className="flex-1 flex flex-col justify-around px-3 py-0.5 items-center text-center">
        
        {/* PROMINENT AMBIENT ENVIRONMENT TEMPERATURE BAR (Explicit User Request!) */}
        <button
          onClick={() => {
            triggerHapticPulse('light');
            setScreen('ENVIRONMENT');
          }}
          className="w-full flex items-center justify-between px-2.5 py-1 rounded-xl bg-slate-950/80 border border-amber-500/30 text-amber-300 hover:border-amber-500/60 transition-colors cursor-pointer"
          title="Ambient Environment Temperature & Humidity"
        >
          <div className="flex items-center gap-1.5">
            <ThermometerSun className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-[9.5px] font-bold tracking-tight uppercase text-slate-300">
              {lang === 'ta' ? 'சுற்றுச்சூழல்:' : lang === 'hi' ? 'पर्यावरण ताप:' : 'ENV TEMP:'}
            </span>
            <span className="font-telemetry font-black text-xs text-white">
              {sensorData.ambientTemp}°C
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-telemetry text-[9.5px] text-slate-300">
            <Droplets className="w-3 h-3 text-cyan-400" />
            <span>{sensorData.humidity}% RH</span>
            <span className="text-[8px] font-bold px-1 rounded bg-orange-500/20 text-orange-300">
              {sensorData.heatIndexText}
            </span>
          </div>
        </button>

        {/* Large Central Risk Indicator */}
        <button
          onClick={() => {
            triggerHapticPulse('light');
            setScreen('AI_RISK');
          }}
          className={`w-[136px] h-[136px] rounded-full border-2 ${riskCfg.borderClass} ${riskCfg.bgClass} ${riskCfg.glowClass} flex flex-col items-center justify-center p-2 transition-transform active:scale-95 cursor-pointer relative group`}
          title="Tap to see Edge AI Risk Explanation"
        >
          {aiRisk.riskLevel !== 'NORMAL' && (
            <span className={`absolute inset-0 rounded-full animate-ping opacity-25 border ${riskCfg.borderClass}`} />
          )}

          <div className="flex items-center gap-1 mb-0.5">
            <RiskIcon className={`w-3.5 h-3.5 ${riskCfg.colorClass}`} />
            <span className={`text-[9px] font-black tracking-wider uppercase ${riskCfg.colorClass}`}>
              {riskCfg.badgeText}
            </span>
          </div>

          <span className={`text-[15px] font-black font-display leading-tight tracking-tight uppercase ${riskCfg.colorClass}`}>
            {riskCfg.title}
          </span>

          <span className="text-[9.5px] text-slate-300 font-medium tracking-normal mt-0.5">
            {riskCfg.subtitle}
          </span>

          <div className="mt-0.5 flex items-center gap-1 text-[7.5px] text-slate-400 opacity-80 group-hover:opacity-100">
            <Info className="w-2.5 h-2.5" />
            <span>{lang === 'ta' ? 'விவரங்கள்' : lang === 'hi' ? 'विवरण' : 'TAP DETAILS'}</span>
          </div>
        </button>

        {/* Quick Glancable Physiological Vitals Row */}
        <div className="w-full grid grid-cols-2 gap-1 px-0.5">
          {/* Heart Rate Card */}
          <button 
            onClick={() => setScreen('HEALTH')}
            className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-rose-500/40 text-left transition-all active:scale-95 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-rose-500/15 flex items-center justify-center shrink-0">
              <Heart className="w-3.5 h-3.5 text-rose-400 animate-heartbeat" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-baseline gap-0.5">
                <span className="font-telemetry font-bold text-xs text-white leading-none">
                  {sensorData.heartRate}
                </span>
                <span className="text-[8px] text-slate-400 font-semibold">BPM</span>
              </div>
              <span className="text-[8px] text-slate-400 truncate">
                {lang === 'ta' ? 'இதயத் துடிப்பு' : lang === 'hi' ? 'हृदय गति' : 'Heart Rate'}
              </span>
            </div>
          </button>

          {/* Skin Temperature Trend */}
          <button 
            onClick={() => setScreen('HEALTH')}
            className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-amber-500/40 text-left transition-all active:scale-95 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-telemetry font-bold text-xs text-white leading-none">
                {sensorData.skinTempTrend}
              </span>
              <span className="text-[8px] text-slate-400 truncate">
                {lang === 'ta' ? 'தோல் வெப்பம்' : lang === 'hi' ? 'त्वचा ताप' : 'Skin Delta'}
              </span>
            </div>
          </button>
        </div>

        {/* DYNAMIC ACTION DIRECTIVES: DRINK WATER & TAKE REST (Explicit User Request!) */}
        <div className="w-full grid grid-cols-2 gap-1 px-0.5">
          {/* Hydration Advisor Shortcut */}
          <button
            onClick={() => {
              triggerHapticPulse('light');
              setScreen('HYDRATION');
            }}
            className="flex items-center justify-between p-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-500/60 text-left transition-all active:scale-95 cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-cyan-400" />
              <div className="text-[8.5px] font-bold text-cyan-300 leading-tight">
                {lang === 'ta' ? 'நீர் அருந்து' : lang === 'hi' ? 'पानी पिएं' : 'Drink Water'}
              </div>
            </div>
            <span className="font-mono text-[8px] text-slate-400 font-semibold">
              {sensorData.nextDrinkMinutes}m
            </span>
          </button>

          {/* Rest Advisor Shortcut */}
          <button
            onClick={() => {
              triggerHapticPulse('light');
              setScreen('REST_ADVISOR');
            }}
            className="flex items-center justify-between p-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 hover:border-amber-500/60 text-left transition-all active:scale-95 cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <Armchair className="w-3 h-3 text-amber-400" />
              <div className="text-[8.5px] font-bold text-amber-300 leading-tight">
                {lang === 'ta' ? 'ஓய்வெடு' : lang === 'hi' ? 'विश्राम लें' : 'Rest Break'}
              </div>
            </div>
            <span className="font-mono text-[8px] text-slate-400 font-semibold">
              {sensorData.restBreakDueMinutes}m
            </span>
          </button>
        </div>

      </div>

      {/* Screen Navigation Footer */}
      <ScreenFooter
        leftScreen={{ name: lang === 'ta' ? 'நீரேற்றம்' : lang === 'hi' ? 'जलयोजन' : 'HYDRATE', target: 'HYDRATION' }}
        centerAction={{ label: lang === 'ta' ? 'SOS உதவி' : lang === 'hi' ? 'आपातकाल' : 'SOS', action: () => setScreen('SOS') }}
        rightScreen={{ name: lang === 'ta' ? 'உடல் நலம்' : lang === 'hi' ? 'स्वास्थ्य' : 'HEALTH', target: 'HEALTH' }}
      />
    </div>
  );
};
