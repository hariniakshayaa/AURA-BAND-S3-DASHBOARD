import React from 'react';
import { AlertTriangle, Check, PhoneCall, Volume2 } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const ElderlyModeScreen: React.FC = () => {
  const { settings, setScreen, triggerHapticPulse, triggerVoiceAlert, triggerSOS } = useBand();
  const isTamil = settings.language === 'ta';

  const handleVoice = () => {
    triggerHapticPulse('heavy');
    triggerVoiceAlert(
      'Please rest now. Sit in the shade and drink some water.',
      'தயவுசெய்து ஓய்வெடுக்கவும். நிழலில் அமர்ந்து தண்ணீர் குடிக்கவும்.'
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-black select-none overflow-hidden relative border-4 border-yellow-400">
      <StatusBar title={isTamil ? 'முதியோர் முறை' : 'ELDERLY'} showClock={false} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-around p-3 text-center items-center">
        
        {/* Warning Icon Badge */}
        <div className="w-14 h-14 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-yellow-400 animate-pulse" />
        </div>

        {/* Very Large Headline */}
        <div>
          <div className="text-2xl font-black text-yellow-300 uppercase font-display leading-tight">
            {isTamil ? '⚠ ஓய்வு எடுக்கவும்' : '⚠ REST NOW'}
          </div>
          <div className="text-sm font-bold text-white mt-1 leading-snug">
            {isTamil ? 'தயவுசெய்து நிழலில் அமரவும்.' : 'Please sit in the shade.'}
          </div>
        </div>

        {/* Voice replay button */}
        <button
          onClick={handleVoice}
          className="w-full py-1.5 px-3 rounded-xl bg-slate-900 border border-yellow-400/50 flex items-center justify-center gap-2 text-yellow-300 font-bold text-xs cursor-pointer active:scale-95"
        >
          <Volume2 className="w-4 h-4" />
          <span>{isTamil ? 'குரல் வழிகாட்டலைக் கேள்' : 'Hear Voice Instruction'}</span>
        </button>

        {/* Huge Touch Targets: [ OK ] and [ HELP ] */}
        <div className="w-full grid grid-cols-2 gap-2 mt-1">
          {/* OK button */}
          <button
            onClick={() => {
              triggerHapticPulse('medium');
              setScreen('HOME');
            }}
            className="py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-black text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>{isTamil ? 'சரி' : 'OK'}</span>
          </button>

          {/* HELP button (direct SOS) */}
          <button
            onClick={() => {
              triggerHapticPulse('heavy');
              triggerSOS();
            }}
            className="py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-rose-600/30"
          >
            <PhoneCall className="w-5 h-5" />
            <span>{isTamil ? 'உதவி' : 'HELP'}</span>
          </button>
        </div>

      </div>

      <ScreenFooter
        leftScreen={{ name: isTamil ? 'தொழிலாளர்' : 'WORKER', target: 'WORKER_MODE' }}
        rightScreen={{ name: isTamil ? 'முகப்பு' : 'HOME', target: 'HOME' }}
      />
    </div>
  );
};
