import React from 'react';
import { Flame, Volume2, Vibrate, Check, Globe, Droplets, SunDim } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';

export const HeatWarningScreen: React.FC = () => {
  const { 
    settings, 
    toggleLanguage, 
    setScreen, 
    triggerHapticPulse, 
    triggerVoiceAlert,
    isVibrating 
  } = useBand();

  const lang = settings.language;

  const handleVoice = () => {
    triggerHapticPulse('medium');
    triggerVoiceAlert(
      'Heat strain is increasing. Move to shade and rest. Drink water.',
      'உடல் வெப்ப அழுத்தம் அதிகரிக்கிறது. நிழலில் ஓய்வு எடுக்கவும். தண்ணீர் குடிக்கவும்.',
      'शारीरिक ताप तनाव बढ़ रहा है। छांव में जाएं और आराम करें। तुरंत पानी पिएं।'
    );
  };

  const handleAcknowledge = () => {
    triggerHapticPulse('medium');
    setScreen('RECOVERY');
  };

  const getTexts = () => {
    switch (lang) {
      case 'ta':
        return {
          status: 'பாதுகாப்பு எச்சரிக்கை',
          badge: 'உயர் வெப்ப அழுத்தம்',
          mainTitle: 'உடனே ஓய்வு எடுக்கவும்',
          subTitle: 'உடல் வெப்ப அழுத்தம் அதிகரிக்கிறது.',
          directive1: '1. நிழலில் ஓய்வு எடுக்கவும்',
          directive2: '2. உடனடியாக தண்ணீர் குடிக்கவும்',
          voiceBtn: 'குரல் ஒலி',
          okBtn: 'சரி (OK)',
          langBtn: 'தமிழ்'
        };
      case 'hi':
        return {
          status: 'सुरक्षा चेतावनी',
          badge: 'अत्यधिक ताप तनाव',
          mainTitle: 'तुरंत आराम करें',
          subTitle: 'शारीरिक ताप तनाव बढ़ रहा है।',
          directive1: '1. छांव में जाएं और आराम करें',
          directive2: '2. तुरंत ठंडा पानी पिएं',
          voiceBtn: 'आवाज सुनें',
          okBtn: 'स्वीकार (OK)',
          langBtn: 'हिन्दी'
        };
      default:
        return {
          status: 'SAFETY ALERT',
          badge: 'HIGH HEAT STRAIN',
          mainTitle: 'REST NOW',
          subTitle: 'Heat strain is increasing.',
          directive1: '1. Move to shade and rest.',
          directive2: '2. Drink water immediately.',
          voiceBtn: 'VOICE',
          okBtn: 'OK',
          langBtn: 'English'
        };
    }
  };

  const t = getTexts();

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-orange-950 via-slate-950 to-black select-none overflow-hidden relative border-2 border-orange-500/70 animate-pulse-subtle">
      <StatusBar title={t.status} showClock={false} />

      {/* Main Alert Content */}
      <div className="flex-1 flex flex-col justify-between px-3 py-1 items-center text-center">
        
        {/* Warning Indicator Header */}
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/50 text-orange-400">
          <Flame className="w-4 h-4 animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-wider">
            {t.badge}
          </span>
        </div>

        {/* Big Alert Title */}
        <div className="my-0.5">
          <h2 className="text-xl font-black font-display text-orange-400 tracking-tight leading-tight uppercase">
            {t.mainTitle}
          </h2>
          <p className="text-[10px] font-semibold text-slate-200 mt-0.5">
            {t.subTitle}
          </p>
        </div>

        {/* Action Directives Card */}
        <div className="w-full p-2 rounded-xl bg-orange-950/40 border border-orange-500/40 flex flex-col gap-1.5 text-left">
          <div className="flex items-center gap-2 text-slate-100 text-[10px]">
            <SunDim className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold">{t.directive1}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-100 text-[10px]">
            <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-semibold">{t.directive2}</span>
          </div>
        </div>

        {/* Sensory Feedback Status */}
        <div className="flex items-center gap-2 text-[8px] font-mono text-slate-400">
          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${isVibrating ? 'bg-orange-500 text-black font-bold' : 'bg-slate-900 border border-white/5'}`}>
            <Vibrate className="w-2.5 h-2.5" />
            <span>VIBRATION ON</span>
          </div>

          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 border border-white/5 text-orange-300">
            <Volume2 className="w-2.5 h-2.5" />
            <span>VOICE READY</span>
          </div>
        </div>

        {/* Large Accessible Touch Buttons */}
        <div className="w-full grid grid-cols-2 gap-2 mt-1">
          {/* Voice Prompt Playback Button */}
          <button
            onClick={handleVoice}
            className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 border border-white/20 transition-all cursor-pointer shadow-md"
            title="Speak voice warning in selected language"
          >
            <Volume2 className="w-4 h-4 text-orange-400" />
            <span>{t.voiceBtn}</span>
          </button>

          {/* OK / Acknowledge Button */}
          <button
            onClick={handleAcknowledge}
            className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-black font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-orange-500/30"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{t.okBtn}</span>
          </button>
        </div>

      </div>

      {/* Language Toggle & Screen Navigation */}
      <div className="w-full px-2 py-1 flex items-center justify-between border-t border-white/10 bg-slate-950/90 text-[9px] shrink-0">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-orange-300 cursor-pointer font-semibold transition-colors"
        >
          <Globe className="w-3 h-3 text-orange-400" />
          <span>{lang === 'en' ? 'தமிழ்' : lang === 'ta' ? 'हिन्दी' : 'English'}</span>
        </button>

        <button
          onClick={() => setScreen('HOME')}
          className="text-slate-400 hover:text-white font-medium cursor-pointer"
        >
          {lang === 'ta' ? 'முகப்புக்குச் செல் →' : lang === 'hi' ? 'मुख्य पृष्ठ →' : 'Dismiss to Home →'}
        </button>
      </div>
    </div>
  );
};
