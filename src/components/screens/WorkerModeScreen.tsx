import React from 'react';
import { Flame, SunDim, Droplets, Check, Volume2 } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const WorkerModeScreen: React.FC = () => {
  const { settings, setScreen, triggerHapticPulse, triggerVoiceAlert } = useBand();
  const isTamil = settings.language === 'ta';

  const handleVoice = () => {
    triggerHapticPulse('medium');
    triggerVoiceAlert(
      'High heat. Rest now. Move to shade. Drink water.',
      'அதிக வெப்பம். உடனே ஓய்வு எடுக்கவும். நிழலுக்குச் செல்லவும். தண்ணீர் குடிக்கவும்.'
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-black select-none overflow-hidden relative border-4 border-amber-500">
      <StatusBar title={isTamil ? 'தொழிலாளர் முறை' : 'WORKER'} showClock={false} />

      {/* Main High-Contrast Outdoor Worker Content */}
      <div className="flex-1 flex flex-col justify-between p-3 text-center items-center">
        
        {/* Header Icon + High Heat Banner */}
        <div className="w-full py-1.5 px-3 rounded-lg bg-amber-500 text-black flex items-center justify-center gap-2">
          <Flame className="w-5 h-5 fill-black" />
          <span className="text-base font-black uppercase tracking-wider font-display">
            {isTamil ? 'அதிக வெப்பம்' : 'HIGH HEAT'}
          </span>
        </div>

        {/* Big Action Instruction */}
        <div className="my-1">
          <div className="text-3xl font-black text-amber-400 uppercase font-display leading-none tracking-tight">
            {isTamil ? 'உடனே ஓய்வெடு' : 'REST NOW'}
          </div>
        </div>

        {/* Massive Simple Directives (Ultra-readable under bright sunlight) */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full py-2 px-3 rounded-xl bg-slate-900 border-2 border-white/20 flex items-center gap-3">
            <SunDim className="w-7 h-7 text-amber-400 shrink-0" />
            <span className="text-sm font-black text-white uppercase text-left leading-tight">
              {isTamil ? 'நிழலுக்குச் செல்' : 'MOVE TO SHADE'}
            </span>
          </div>

          <div className="w-full py-2 px-3 rounded-xl bg-slate-900 border-2 border-white/20 flex items-center gap-3">
            <Droplets className="w-7 h-7 text-cyan-400 shrink-0" />
            <span className="text-sm font-black text-white uppercase text-left leading-tight">
              {isTamil ? 'தண்ணீர் குடி' : 'DRINK WATER'}
            </span>
          </div>
        </div>

        {/* Big Touch Controls */}
        <div className="w-full grid grid-cols-2 gap-2 mt-1">
          <button
            onClick={handleVoice}
            className="py-3 rounded-xl bg-slate-800 text-amber-400 font-black text-xs flex items-center justify-center gap-1.5 border border-amber-500/40 active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isTamil ? 'ஒலி' : 'VOICE'}</span>
          </button>

          <button
            onClick={() => {
              triggerHapticPulse('medium');
              setScreen('HOME');
            }}
            className="py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-lg"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isTamil ? 'சரி (OK)' : 'OK'}</span>
          </button>
        </div>

      </div>

      <ScreenFooter
        leftScreen={{ name: isTamil ? 'அமைப்புகள்' : 'SETTINGS', target: 'SETTINGS' }}
        rightScreen={{ name: isTamil ? 'முதியோர்' : 'ELDERLY', target: 'ELDERLY_MODE' }}
      />
    </div>
  );
};
