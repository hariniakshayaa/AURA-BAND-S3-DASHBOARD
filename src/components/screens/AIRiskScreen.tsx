import React from 'react';
import { Cpu, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const AIRiskScreen: React.FC = () => {
  const { aiRisk, settings } = useBand();
  const lang = settings.language;

  // Risk styling & localized labels
  const getBadgeStyle = () => {
    switch (aiRisk.riskLevel) {
      case 'NORMAL':
        return { 
          color: 'text-emerald-400', 
          bg: 'bg-emerald-500/15', 
          border: 'border-emerald-500/40', 
          text: lang === 'ta' ? 'இயல்பு நிலை' : lang === 'hi' ? 'सामान्य स्थिति' : 'NORMAL' 
        };
      case 'YELLOW':
        return { 
          color: 'text-yellow-400', 
          bg: 'bg-yellow-500/15', 
          border: 'border-yellow-500/40', 
          text: lang === 'ta' ? 'கவனம் தேவை' : lang === 'hi' ? 'सावधानी बरतें' : 'ELEVATED' 
        };
      case 'ORANGE':
        return { 
          color: 'text-orange-400', 
          bg: 'bg-orange-500/20', 
          border: 'border-orange-500/50', 
          text: lang === 'ta' ? 'ஓய்வு தேவை' : lang === 'hi' ? 'आराम आवश्यक' : 'REST NEEDED' 
        };
      case 'RED':
        return { 
          color: 'text-rose-400', 
          bg: 'bg-rose-500/20', 
          border: 'border-rose-500/60', 
          text: lang === 'ta' ? 'அவசர நிலை' : lang === 'hi' ? 'आपातकाल' : 'EMERGENCY' 
        };
    }
  };

  const style = getBadgeStyle();
  const reasonsList = lang === 'ta' 
    ? aiRisk.reasons.ta 
    : lang === 'hi' 
    ? aiRisk.reasons.hi 
    : aiRisk.reasons.en;

  const headerTitle = lang === 'ta' ? 'AI அபாயம்' : lang === 'hi' ? 'AI जोखिम' : 'AI RISK';
  const screenTitle = lang === 'ta' ? 'விளக்கக்கூடிய AI' : lang === 'hi' ? 'स्पष्टीकरणीय AI' : 'EXPLAINABLE AI';
  const riskTitle = lang === 'ta' ? 'தற்போதைய அபாயம்' : lang === 'hi' ? 'वर्तमान स्तर' : 'Current Risk Level';
  const confTitle = lang === 'ta' ? 'நம்பகத்தன்மை' : lang === 'hi' ? 'विश्वसनीयता' : 'Confidence';
  const trendTitle = lang === 'ta' ? 'போக்கு' : lang === 'hi' ? 'प्रवृत्ति' : 'Risk Trend';
  const windowTitle = lang === 'ta' ? 'அபாயக் காலம்' : lang === 'hi' ? 'अनुमानित समय' : 'Risk Window';
  const whyTitle = lang === 'ta' ? 'ஏன்? முக்கியக் காரணங்கள்' : lang === 'hi' ? 'क्यों? मुख्य जोखिम कारक' : 'WHY? TOP RISK FACTORS';

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={headerTitle} showClock={false} />

      {/* Screen Title & Edge AI Badge */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-200">
            {screenTitle}
          </span>
        </div>
        <span className="text-[8.5px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono border border-orange-500/30">
          TinyML INT8
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-1.5 px-3 py-1 overflow-y-auto no-scrollbar">
        
        {/* Risk Banner & Telemetry Grid */}
        <div className={`p-2 rounded-xl ${style.bg} border ${style.border} flex items-center justify-between`}>
          <div>
            <div className="text-[8.5px] uppercase font-bold text-slate-400">
              {riskTitle}
            </div>
            <div className={`text-sm font-black uppercase ${style.color}`}>
              {style.text}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[8.5px] text-slate-400 font-medium">
              {confTitle}
            </span>
            <div className="font-telemetry font-bold text-sm text-white">
              {aiRisk.confidence}%
            </div>
          </div>
        </div>

        {/* Prediction Window & Trend */}
        <div className="grid grid-cols-2 gap-1.5">
          {/* Trend */}
          <div className="p-1.5 rounded-lg bg-slate-900/90 border border-white/5 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[8px] text-slate-400 uppercase font-semibold">
                {trendTitle}
              </div>
              <div className="text-[10px] font-bold text-amber-300 truncate">
                ↑ {aiRisk.riskTrend}
              </div>
            </div>
          </div>

          {/* Window */}
          <div className="p-1.5 rounded-lg bg-slate-900/90 border border-white/5 flex items-center gap-1.5">
            <ArrowUpRight className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[8px] text-slate-400 uppercase font-semibold">
                {windowTitle}
              </div>
              <div className="text-[10px] font-bold text-orange-300 truncate">
                {aiRisk.riskWindow}
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Explainable Reasons (Why?) */}
        <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[8.5px] text-slate-400 uppercase font-bold border-b border-white/5 pb-1">
            <span className="text-orange-400 truncate max-w-[170px]">
              {whyTitle}
            </span>
            <span className="font-mono text-[7.5px] text-slate-400">LOCAL MODEL</span>
          </div>

          <div className="flex flex-col gap-1 mt-0.5">
            {reasonsList.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[8.5px] leading-tight text-slate-200">
                <span className="text-orange-400 font-bold shrink-0">↑</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Early warning disclaimer */}
        <div className="text-[7.5px] text-slate-400 text-center leading-tight">
          {lang === 'ta' 
            ? 'முன்னெச்சரிக்கை வழிகாட்டல் மட்டுமே. துல்லியமான நோய் கணிப்பு அல்ல.' 
            : lang === 'hi'
            ? 'केवल प्रारंभिक चेतावनी मार्गदर्शन। चिकित्सा निदान नहीं।'
            : 'Early warning trend indicator based on on-device physiological pattern recognition.'}
        </div>

      </div>

      <ScreenFooter
        leftScreen={{ name: lang === 'ta' ? 'சுற்றுச்சூழல்' : lang === 'hi' ? 'पर्यावरण' : 'ENV', target: 'ENVIRONMENT' }}
        rightScreen={{ name: lang === 'ta' ? 'சென்சார்' : lang === 'hi' ? 'सिग्नल' : 'SIGNAL', target: 'SIGNAL_QUALITY' }}
      />
    </div>
  );
};
