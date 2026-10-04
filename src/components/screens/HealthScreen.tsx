import React from 'react';
import { Heart, Thermometer, Activity, Radio, ShieldAlert } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const HealthScreen: React.FC = () => {
  const { sensorData, settings, setScreen } = useBand();
  const lang = settings.language;

  const getTexts = () => {
    switch (lang) {
      case 'ta':
        return {
          status: 'உடல் நலம்',
          title: 'உடல் நிலை விவரம்',
          realtime: 'நேரலை',
          hrLabel: 'இதயத் துடிப்பு',
          hrBase: 'அடிப்படை: 68 BPM',
          skinLabel: 'தோல் வெப்பநிலை',
          skinTrend: 'போக்கு',
          activityLabel: 'செயல்பாடு',
          recoveryLabel: 'மீட்பு நிலை',
          recoveryGood: 'நன்றாக உள்ளது',
          signalLabel: 'சென்சார் சிக்னல்',
          signalStatus: sensorData.signalStatus === 'GOOD' ? 'தொடர்பு சிறப்பானது' : 'சீரற்ற அசைவு',
          disclaimer: 'முன்னெச்சரிக்கை பாதுகாப்பு அளவீடு மட்டுமே. மருத்துவ சிகிச்சைக்கானது அல்ல.'
        };
      case 'hi':
        return {
          status: 'स्वास्थ्य',
          title: 'शारीरिक मापदंड',
          realtime: 'लाइव',
          hrLabel: 'हृदय गति',
          hrBase: 'बेसलाइन: 68 BPM',
          skinLabel: 'त्वचा तापमान',
          skinTrend: 'प्रवृत्ति',
          activityLabel: 'शारीरिक गतिविधि',
          recoveryLabel: 'पुनर्प्राप्ति स्थिति',
          recoveryGood: 'अच्छी स्थिति',
          signalLabel: 'सेंसर सिग्नल गुणवत्ता',
          signalStatus: sensorData.signalStatus === 'GOOD' ? 'उत्कृष्ट संपर्क' : 'अत्यधिक हलचल',
          disclaimer: 'केवल प्रारंभिक सुरक्षा चेतावनी। चिकित्सा निदान हेतु नहीं।'
        };
      default:
        return {
          status: 'HEALTH',
          title: 'PHYSIO METRICS',
          realtime: 'REALTIME',
          hrLabel: 'Heart Rate',
          hrBase: 'Base: 68 BPM',
          skinLabel: 'Skin Temperature',
          skinTrend: 'TREND',
          activityLabel: 'Activity',
          recoveryLabel: 'Recovery Index',
          recoveryGood: 'Good',
          signalLabel: 'Signal Quality',
          signalStatus: sensorData.signalStatus === 'GOOD' ? 'PPG Contact Optimal' : 'Movement Artifacts',
          disclaimer: 'Early-warning safety wearable. Not for medical diagnosis.'
        };
    }
  };

  const t = getTexts();

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={t.status} showClock={false} />

      {/* Screen Title */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <span className="text-[11.5px] font-black uppercase tracking-wider text-slate-300">
          {t.title}
        </span>
        <span className="text-[8.5px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
          {t.realtime}
        </span>
      </div>

      {/* Scrollable / Glancable Content Area */}
      <div className="flex-1 flex flex-col gap-1.5 px-3 py-1 overflow-y-auto no-scrollbar">
        
        {/* Heart Rate Card */}
        <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
              <Heart className="w-4 h-4 text-rose-400 animate-heartbeat" />
            </div>
            <div>
              <div className="text-[9.5px] text-slate-400 uppercase font-semibold">
                {t.hrLabel}
              </div>
              <div className="text-[8.5px] text-slate-400">
                {t.hrBase}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="font-telemetry font-bold text-xl text-white">
              {sensorData.heartRate}
            </span>
            <span className="text-[9.5px] text-rose-400 ml-1 font-semibold">BPM</span>
          </div>
        </div>

        {/* Skin Temperature Card */}
        <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Thermometer className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-[9.5px] text-slate-400 uppercase font-semibold">
                {t.skinLabel}
              </div>
              <div className="text-[8.5px] text-slate-400">
                {sensorData.skinTemp}°C
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="font-telemetry font-bold text-base text-amber-300">
              {sensorData.skinTempTrend}
            </span>
            <div className="text-[7.5px] text-slate-400 uppercase">{t.skinTrend}</div>
          </div>
        </div>

        {/* Activity & Recovery Grid */}
        <div className="grid grid-cols-2 gap-1.5">
          {/* Activity Card */}
          <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[8.5px] text-slate-400 font-semibold uppercase">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>{t.activityLabel}</span>
            </div>
            <div className="text-[11px] font-bold text-white uppercase mt-1 truncate">
              {sensorData.activity}
            </div>
          </div>

          {/* Recovery Card */}
          <button 
            onClick={() => setScreen('RECOVERY')}
            className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between hover:border-emerald-500/40 text-left cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1 text-[8.5px] text-slate-400 font-semibold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{t.recoveryLabel}</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-400 mt-1">
              {t.recoveryGood}
            </div>
          </button>
        </div>

        {/* Signal Quality Card */}
        <button 
          onClick={() => setScreen('SIGNAL_QUALITY')}
          className="p-2 rounded-xl bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 flex items-center justify-between text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-[9.5px] text-slate-300 font-semibold">
                {t.signalLabel}
              </div>
              <div className="text-[8px] text-slate-400">
                {t.signalStatus}
              </div>
            </div>
          </div>
          <span className="font-telemetry font-bold text-sm text-cyan-300">
            {sensorData.signalQualityPercent}%
          </span>
        </button>

        {/* Safety Disclaimer Banner */}
        <div className="px-2 py-1 rounded bg-slate-950/80 border border-white/5 flex items-center gap-1.5 text-[7.5px] text-slate-400">
          <ShieldAlert className="w-3 h-3 text-orange-400 shrink-0" />
          <span>{t.disclaimer}</span>
        </div>

      </div>

      <ScreenFooter
        leftScreen={{ name: lang === 'ta' ? 'முகப்பு' : lang === 'hi' ? 'मुख्य' : 'HOME', target: 'HOME' }}
        rightScreen={{ name: lang === 'ta' ? 'சுற்றுச்சூழல்' : lang === 'hi' ? 'पर्यावरण' : 'ENV', target: 'ENVIRONMENT' }}
      />
    </div>
  );
};
