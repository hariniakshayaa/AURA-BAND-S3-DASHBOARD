import React from 'react';
import { Armchair, Clock, SunDim, ShieldAlert, Play, Wind, Droplets } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const RestAdvisorScreen: React.FC = () => {
  const { sensorData, settings, setScreen, triggerHapticPulse } = useBand();
  const lang = settings.language;

  const getTexts = () => {
    switch (lang) {
      case 'ta':
        return {
          title: 'ஓய்வு வழிகாட்டல்',
          badge: 'வேலை-ஓய்வு சுழற்சி',
          ratioLabel: 'பரிந்துரைக்கப்பட்ட சுழற்சி',
          dueLabel: 'அடுத்த கட்டாய ஓய்வு:',
          adviceHeader: 'செயலில் குளிர்விக்கும் வழிகள்:',
          tip1: '1. உடனடியாக மர நிழல் அல்லது விசிறி உள்ள பகுதிக்குச் செல்லவும்.',
          tip2: '2. தலைக்கவசம் மற்றும் கனமான கவச ஆடைகளைத் தளர்த்தவும்.',
          tip3: '3. கழுத்து மற்றும் மணிக்கட்டில் குளிர்ந்த நீரைத் தெளிக்கவும்.',
          startBtn: '15 நிமிட ஓய்வைத் தொடங்கவும்',
          disclaimer: 'ISO 7933 வெப்ப அழுத்த பாதுகாப்பு விதிகள் அடிப்படையில்.'
        };
      case 'hi':
        return {
          title: 'विश्राम सलाहकार',
          badge: 'कार्य-विश्राम चक्र',
          ratioLabel: 'अनुशंसित कार्य-विश्राम चक्र',
          dueLabel: 'अगला अनिवार्य विश्राम:',
          adviceHeader: 'सक्रिय शीतलन निर्देश:',
          tip1: '1. तुरंत छायादार या हवादार स्थान पर जाएं।',
          tip2: '2. सुरक्षा हेलमेट और भारी सुरक्षा जैकेट ढीला करें।',
          tip3: '3. गर्दन और कलाई पर ठंडा पानी लगाएं।',
          startBtn: '15 मिनट का विश्राम शुरू करें',
          disclaimer: 'ISO 7933 ताप तनाव सुरक्षा मानकों पर आधारित।'
        };
      default:
        return {
          title: 'REST-WORK ADVISOR',
          badge: 'OSHA / ISO 7933',
          ratioLabel: 'Prescribed Work-Rest Cycle',
          dueLabel: 'Mandatory Rest Break In:',
          adviceHeader: 'Active Cooling Directives:',
          tip1: '1. Move to shaded area with convective air circulation.',
          tip2: '2. Unbuckle heavy PPE harness and safety vest.',
          tip3: '3. Splash cool water on carotid neck pulse points.',
          startBtn: 'Start 15m Rest Break',
          disclaimer: 'Based on ISO 7933 Predicted Heat Strain safety guidelines.'
        };
    }
  };

  const t = getTexts();

  const handleStartRest = () => {
    triggerHapticPulse('medium');
    setScreen('RECOVERY');
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-amber-950/40 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={t.title} showClock={false} />

      {/* Screen Title */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <span className="text-[12px] font-black uppercase tracking-wider text-amber-300">
          {t.title}
        </span>
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
          {t.badge}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-around px-3 py-1">
        
        {/* Dynamic Work-Rest Cycle Ratio Card */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-between">
          <div>
            <div className="text-[8.5px] uppercase font-bold text-slate-400">
              {t.ratioLabel}
            </div>
            <div className="font-telemetry font-black text-sm text-amber-300 mt-0.5">
              {sensorData.workRestRatio}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[8px] text-slate-400 uppercase font-semibold">
              {t.dueLabel}
            </div>
            <div className="font-telemetry font-bold text-base text-rose-400">
              {sensorData.restBreakDueMinutes}m
            </div>
          </div>
        </div>

        {/* Active Cooling Directive Guidance Box */}
        <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/40 flex flex-col gap-1 text-[8.5px] text-slate-200">
          <div className="text-amber-300 font-bold uppercase tracking-wide flex items-center gap-1">
            <Wind className="w-3 h-3 text-amber-400" />
            <span>{t.adviceHeader}</span>
          </div>
          <div>{t.tip1}</div>
          <div>{t.tip2}</div>
          <div>{t.tip3}</div>
        </div>

        {/* Start Rest Break Button */}
        <button
          onClick={handleStartRest}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-black font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/25"
        >
          <Armchair className="w-4 h-4 fill-black" />
          <span>{t.startBtn}</span>
        </button>

        {/* Compliance Footer */}
        <div className="text-[7.5px] text-slate-400 text-center flex items-center justify-center gap-1">
          <ShieldAlert className="w-2.5 h-2.5 text-amber-400 shrink-0" />
          <span>{t.disclaimer}</span>
        </div>

      </div>

      <ScreenFooter
        leftScreen={{ name: lang === 'ta' ? 'நீரேற்றம்' : lang === 'hi' ? 'जलयोजन' : 'HYDRATE', target: 'HYDRATION' }}
        rightScreen={{ name: lang === 'ta' ? 'AI அபாயம்' : lang === 'hi' ? 'AI जोखिम' : 'AI RISK', target: 'AI_RISK' }}
      />
    </div>
  );
};
