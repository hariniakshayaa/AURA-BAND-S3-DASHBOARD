import React from 'react';
import { AlertCircle, Check, PhoneCall, MessageSquare, MapPin, HeartCrack } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';

export const FallDetectionScreen: React.FC = () => {
  const { 
    fallState, 
    fallCountdown, 
    cancelFall, 
    escalateFallToSOS, 
    settings 
  } = useBand();

  const lang = settings.language;

  const getTexts = () => {
    switch (lang) {
      case 'ta':
        return {
          status: 'விபத்து கண்டறிதல்',
          cancelledTitle: '✓ எச்சரிக்கை ரத்து செய்யப்பட்டது',
          cancelledSub: 'தகவல் எதுவும் அனுப்பப்படவில்லை.',
          sendingSosTitle: '🚨 அவசர உதவி அனுப்பப்படுகிறது',
          badge: 'விபத்து கண்டறியப்பட்டது',
          question: 'நீங்கள் நலமா?',
          questionSub: 'பதிலளிக்காவிடில் அவசர உதவி கோரப்படும்',
          okBtn: "நான் நலம் (I'M OK)",
          bypassBtn: 'உடனடி உதவி தேவை →'
        };
      case 'hi':
        return {
          status: 'गिरना दर्ज',
          cancelledTitle: '✓ अलार्म रद्द कर दिया गया',
          cancelledSub: 'कोई संदेश नहीं भेजा गया।',
          sendingSosTitle: '🚨 आपातकालीन सहायता संदेश भेजा जा रहा है',
          badge: 'गिरने की घटना दर्ज',
          question: 'क्या आप ठीक हैं?',
          questionSub: 'अनुत्तरित रहने पर स्वचालित SOS भेजा जाएगा',
          okBtn: 'मैं ठीक हूँ — रद्द करें',
          bypassBtn: 'तुरंत सहायता भेजें →'
        };
      default:
        return {
          status: 'FALL DETECT',
          cancelledTitle: '✓ ALERT CANCELLED',
          cancelledSub: 'No message was sent.',
          sendingSosTitle: '🚨 SENDING SOS...',
          badge: 'FALL DETECTED',
          question: 'ARE YOU OK?',
          questionSub: 'SOS will trigger automatically',
          okBtn: "I'M OK — CANCEL",
          bypassBtn: 'Send Help Now →'
        };
    }
  };

  const t = getTexts();

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-rose-950 via-slate-950 to-black select-none overflow-hidden relative border-2 border-rose-600/80">
      <StatusBar title={t.status} showClock={false} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-around px-3 py-1 items-center text-center">
        
        {/* State A: CANCELLED */}
        {fallState === 'CANCELLED' ? (
          <div className="flex flex-col items-center justify-center p-3 text-center gap-2 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
              <Check className="w-8 h-8 text-emerald-400 stroke-[3]" />
            </div>
            <div>
              <div className="text-sm font-black text-emerald-400 uppercase tracking-tight">
                {t.cancelledTitle}
              </div>
              <div className="text-[10px] text-slate-300 font-medium mt-1">
                {t.cancelledSub}
              </div>
            </div>
          </div>
        ) : fallState === 'SOS_TRIGGERED' ? (
          /* State B: ESCALATING TO SOS */
          <div className="flex flex-col items-center justify-center p-3 text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center animate-ping">
              <AlertCircle className="w-7 h-7 text-rose-500" />
            </div>
            <div className="text-xs font-black text-rose-400 uppercase">
              {t.sendingSosTitle}
            </div>
            <div className="w-full flex flex-col gap-1 text-[9px] text-slate-300 text-left bg-black/60 p-2 rounded-lg border border-rose-500/30">
              <div className="flex items-center gap-1.5 text-rose-300">
                <MessageSquare className="w-3 h-3 text-rose-400" />
                <span>SMS → {settings.emergencyContact.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-300">
                <PhoneCall className="w-3 h-3 text-rose-400" />
                <span>CALL → {settings.emergencyContact.phone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-300">
                <MapPin className="w-3 h-3 text-rose-400" />
                <span>GPS → 13.0827° N, 80.2707° E</span>
              </div>
            </div>
          </div>
        ) : (
          /* State C: ACTIVE COUNTDOWN (10s) */
          <>
            {/* Header Badge */}
            <div className="flex items-center gap-1 px-3 py-0.5 rounded-full bg-rose-500/25 border border-rose-500/60 text-rose-400">
              <HeartCrack className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[9.5px] font-black uppercase tracking-wider">
                {t.badge}
              </span>
            </div>

            {/* Prompt Question */}
            <div className="my-0.5">
              <div className="text-lg font-black font-display text-white tracking-tight uppercase">
                {t.question}
              </div>
              <div className="text-[9px] text-slate-300">
                {t.questionSub}
              </div>
            </div>

            {/* Circular Countdown Ring Graphic */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-slate-800"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-rose-500 transition-all duration-1000 ease-linear"
                  strokeWidth="6"
                  strokeDasharray="213"
                  strokeDashoffset={213 - (213 * fallCountdown) / 10}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center font-telemetry">
                <span className="text-2xl font-black text-rose-400 leading-none">
                  {fallCountdown}
                </span>
                <span className="text-[7.5px] uppercase font-bold text-slate-400">SEC</span>
              </div>
            </div>

            {/* Crucial Cancel Button */}
            <button
              onClick={cancelFall}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-black font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/30"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{t.okBtn}</span>
            </button>

            {/* Immediate SOS Bypass Button */}
            <button
              onClick={escalateFallToSOS}
              className="text-[9px] text-rose-400/80 hover:text-rose-300 font-semibold uppercase underline cursor-pointer"
            >
              {t.bypassBtn}
            </button>
          </>
        )}

      </div>
    </div>
  );
};
