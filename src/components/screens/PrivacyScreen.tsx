import React from 'react';
import { Lock, ShieldCheck, Check, HardDrive, KeyRound } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const PrivacyScreen: React.FC = () => {
  const { settings } = useBand();
  const isTamil = settings.language === 'ta';

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={isTamil ? 'தனியுரிமை' : 'PRIVACY'} showClock={false} />

      {/* Screen Title */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <span className="text-[12px] font-black uppercase tracking-wider text-slate-200">
          {isTamil ? 'உங்கள் தரவுப் பாதுகாப்பு' : 'YOUR DATA'}
        </span>
        <Lock className="w-3.5 h-3.5 text-cyan-400" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-around px-3 py-1">
        
        {/* Core Privacy Highlight Box */}
        <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-[9.5px] text-slate-200 leading-snug">
            <strong className="text-cyan-300 block font-bold mb-0.5">
              {isTamil ? 'உள்ளூர் பாதுகாப்பு' : 'ZERO CLOUD SURVEILLANCE'}
            </strong>
            {isTamil 
              ? 'உங்கள் அசல் உடலியல் தகவல்கள் எப்போதும் சாதனத்தை விட்டு வெளியேறாது.' 
              : 'Your raw physiological data stays on the device.'}
          </div>
        </div>

        {/* 4 Privacy Pillars */}
        <div className="p-2 rounded-xl bg-slate-900/90 border border-white/5 flex flex-col gap-1.5 text-[9px]">
          <div className="flex items-center gap-1.5 text-slate-200">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{isTamil ? 'அபாயம் சாதனத்திலேயே கணக்கிடப்படுகிறது' : 'Risk processed on device'}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-200">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{isTamil ? 'அசல் PPG துடிப்பு உள்ளூரிலேயே இருக்கும்' : 'Raw PPG stays local'}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-200">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{isTamil ? 'அவசரச் சுருக்கங்கள் மட்டுமே பகிரப்படும்' : 'Only summaries are shared'}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-200">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{isTamil ? 'பகிர்வுக்கு உங்கள் அனுமதி தேவை' : 'Sharing requires explicit permission'}</span>
          </div>
        </div>

        {/* Device Storage Status */}
        <div className="flex items-center justify-center gap-1 text-[8px] text-slate-400">
          <HardDrive className="w-3 h-3 text-slate-400" />
          <span>Encrypted Local Flash (ESP32-S3 eFuse)</span>
        </div>

      </div>

      <ScreenFooter
        leftScreen={{ name: isTamil ? 'பேட்டரி' : 'BATTERY', target: 'BATTERY_DEVICE' }}
        rightScreen={{ name: isTamil ? 'அமைப்புகள்' : 'SETTINGS', target: 'SETTINGS' }}
      />
    </div>
  );
};
