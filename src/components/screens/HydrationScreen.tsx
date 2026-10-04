import React from 'react';
import { Droplets, Plus, Check, AlertCircle, Sparkles, Activity } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const HydrationScreen: React.FC = () => {
  const { sensorData, updateSensorData, settings, triggerHapticPulse, playWaterSound } = useBand();
  const lang = settings.language;

  // Trilingual Text Helpers
  const getTexts = () => {
    switch (lang) {
      case 'ta':
        return {
          title: 'நீரேற்ற ஆலோசனை',
          badge: 'டைனமிக் நீர் தேவை',
          sweatRateLabel: 'வியர்வை இழப்பு விகிதம்',
          intakeLabel: 'இன்றைய நீர் நுகர்வு',
          targetLabel: 'இலக்கு: 2500 mL',
          recommendationTitle: 'நீரேற்ற வழிகாட்டல்',
          recommendationBody: `தற்போதைய வெப்பநிலைக்கு (${sensorData.ambientTemp}°C) ஒவ்வொரு 15 நிமிடங்களுக்கும் 250 mL தண்ணீர் குடிக்கவும்.`,
          logBtn: '+250 mL தண்ணீர் பதிவு செய்',
          dehydrationRisk: 'நீரிழப்பு அபாயம்: குறைவு',
          nextDrinkIn: 'அடுத்த குவளை:'
        };
      case 'hi':
        return {
          title: 'जलयोजन सलाहकार',
          badge: 'गतिशील जल आवश्यकता',
          sweatRateLabel: 'पसीना निकलने की दर',
          intakeLabel: 'आज पिया गया पानी',
          targetLabel: 'लक्ष्य: 2500 mL',
          recommendationTitle: 'जल सेवन अनुशंसा',
          recommendationBody: `वर्तमान तापमान (${sensorData.ambientTemp}°C) के अनुसार हर 15 मिनट में 250 mL पानी पिएं।`,
          logBtn: '+250 mL पानी दर्ज करें',
          dehydrationRisk: 'निर्जलीकरण जोखिम: सामान्य',
          nextDrinkIn: 'अगली बार:'
        };
      default:
        return {
          title: 'HYDRATION ADVISOR',
          badge: 'SWEAT DEPLETION',
          sweatRateLabel: 'Estimated Sweat Loss',
          intakeLabel: 'Logged Intake Today',
          targetLabel: 'Target: 2500 mL',
          recommendationTitle: 'Active Recommendation',
          recommendationBody: `At ${sensorData.ambientTemp}°C and ${sensorData.humidity}% humidity, drink 250 mL every 15 mins to offset sweat loss.`,
          logBtn: '+250 mL Log Water',
          dehydrationRisk: 'Estimated Dehydration Risk: LOW',
          nextDrinkIn: 'Next Drink in:'
        };
    }
  };

  const t = getTexts();

  const handleLogDrink = () => {
    triggerHapticPulse('medium');
    playWaterSound();
    const newTotal = sensorData.waterIntakeTotalMl + 250;
    const newPercent = Math.min(100, Math.round((newTotal / 2500) * 100));
    updateSensorData({
      waterIntakeTotalMl: newTotal,
      hydrationLevelPercent: newPercent,
      nextDrinkMinutes: 15
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-cyan-950/40 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={t.title} showClock={false} />

      {/* Screen Title & Badge */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <span className="text-[12px] font-black uppercase tracking-wider text-cyan-300">
          {t.title}
        </span>
        <span className="text-[8.5px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
          {t.badge}
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-around px-3 py-1">
        
        {/* Dynamic Telemetry Metrics: Sweat Rate & Intake */}
        <div className="grid grid-cols-2 gap-1.5">
          {/* Sweat Loss Rate */}
          <div className="p-2 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[8.5px] text-slate-400 font-semibold uppercase">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>{t.sweatRateLabel}</span>
            </div>
            <div className="mt-1">
              <span className="font-telemetry font-bold text-lg text-cyan-300">
                {sensorData.sweatRateMlPerHour}
              </span>
              <span className="text-[9px] text-slate-400 ml-1">mL/hr</span>
            </div>
          </div>

          {/* Current Logged Intake */}
          <div className="p-2 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[8.5px] text-slate-400 font-semibold uppercase">
              <Droplets className="w-3 h-3 text-blue-400" />
              <span>{t.intakeLabel}</span>
            </div>
            <div className="mt-1">
              <span className="font-telemetry font-bold text-lg text-emerald-400">
                {sensorData.waterIntakeTotalMl}
              </span>
              <span className="text-[9px] text-slate-400 ml-1">mL</span>
            </div>
          </div>
        </div>

        {/* Dynamic Water Intake Recommendation Banner */}
        <div className="p-2.5 rounded-xl bg-cyan-950/50 border border-cyan-500/40 flex items-start gap-2">
          <Droplets className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
          <div className="text-[9.5px] leading-snug text-slate-200">
            <strong className="text-cyan-300 block font-bold mb-0.5">
              {t.recommendationTitle}
            </strong>
            {t.recommendationBody}
          </div>
        </div>

        {/* Log Drink Button */}
        <button
          onClick={handleLogDrink}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 active:scale-95 text-black font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/25"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>{t.logBtn}</span>
        </button>

        {/* Countdown & Hydration Risk Status */}
        <div className="flex items-center justify-between px-2 py-1 rounded bg-black/60 border border-white/5 text-[8px] font-mono text-slate-400">
          <span>{t.nextDrinkIn} <strong className="text-cyan-300 font-bold">{sensorData.nextDrinkMinutes}m</strong></span>
          <span className="text-emerald-400 font-bold">{t.dehydrationRisk}</span>
        </div>

      </div>

      <ScreenFooter
        leftScreen={{ name: lang === 'ta' ? 'சுற்றுச்சூழல்' : lang === 'hi' ? 'पर्यावरण' : 'ENV', target: 'ENVIRONMENT' }}
        rightScreen={{ name: lang === 'ta' ? 'ஓய்வு' : lang === 'hi' ? 'विश्राम' : 'REST', target: 'REST_ADVISOR' }}
      />
    </div>
  );
};
