import React from 'react';
import { Settings, Globe, Volume2, Vibrate, Mic, UserCheck, HardHat, HeartHandshake, Wifi, ChevronRight } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const SettingsScreen: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    setLanguage, 
    setScreen, 
    triggerHapticPulse 
  } = useBand();

  const isTamil = settings.language === 'ta';

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={isTamil ? 'அமைப்புகள்' : 'SETTINGS'} showClock={false} />

      {/* Screen Title */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <span className="text-[12px] font-black uppercase tracking-wider text-slate-200">
          {isTamil ? 'சாதன அமைப்புகள்' : 'DEVICE SETTINGS'}
        </span>
        <Settings className="w-3.5 h-3.5 text-slate-400" />
      </div>

      {/* Scrollable Settings List */}
      <div className="flex-1 flex flex-col gap-1.5 px-3 py-1 overflow-y-auto no-scrollbar">
        
        {/* Language Selection */}
        <div className="p-2 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-semibold text-slate-200">
              {isTamil ? 'மொழி' : 'Language'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-colors ${
                settings.language === 'en' 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold cursor-pointer transition-colors ${
                settings.language === 'ta' 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold cursor-pointer transition-colors ${
                settings.language === 'hi' 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>


        {/* Worker Mode Shortcut & Toggle */}
        <div className="p-2 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardHat className="w-3.5 h-3.5 text-amber-400" />
            <div>
              <span className="text-[10px] font-semibold text-slate-200 block leading-tight">
                {isTamil ? 'தொழிலாளர் முறை' : 'Worker Mode'}
              </span>
              <span className="text-[8px] text-slate-400">
                {isTamil ? 'பெரிய எழுத்து & எளிய UI' : 'High-contrast outdoor UI'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                triggerHapticPulse('medium');
                setScreen('WORKER_MODE');
              }}
              className="px-1.5 py-0.5 text-[8.5px] rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 cursor-pointer"
            >
              VIEW
            </button>
            <button
              onClick={() => {
                triggerHapticPulse('light');
                updateSettings({ workerMode: !settings.workerMode });
              }}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                settings.workerMode ? 'bg-amber-500' : 'bg-slate-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.workerMode ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Elderly Mode Shortcut & Toggle */}
        <div className="p-2 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
            <div>
              <span className="text-[10px] font-semibold text-slate-200 block leading-tight">
                {isTamil ? 'முதியோர் முறை' : 'Elderly Mode'}
              </span>
              <span className="text-[8px] text-slate-400">
                {isTamil ? 'மிகப்பெரிய எழுத்துக்கள்' : 'Extra large fonts & voice'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                triggerHapticPulse('medium');
                setScreen('ELDERLY_MODE');
              }}
              className="px-1.5 py-0.5 text-[8.5px] rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 cursor-pointer"
            >
              VIEW
            </button>
            <button
              onClick={() => {
                triggerHapticPulse('light');
                updateSettings({ elderlyMode: !settings.elderlyMode });
              }}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                settings.elderlyMode ? 'bg-rose-500' : 'bg-slate-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.elderlyMode ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Vibration & Voice Toggles */}
        <div className="grid grid-cols-2 gap-1.5">
          {/* Vibration */}
          <button
            onClick={() => {
              triggerHapticPulse('medium');
              updateSettings({ vibrationEnabled: !settings.vibrationEnabled });
            }}
            className="p-1.5 rounded-lg bg-slate-900/90 border border-white/5 flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-[9px] text-slate-300">
              <Vibrate className="w-3 h-3 text-orange-400" />
              <span>Vibration</span>
            </div>
            <span className={`text-[8.5px] font-bold ${settings.vibrationEnabled ? 'text-emerald-400' : 'text-slate-500'}`}>
              {settings.vibrationEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Voice */}
          <button
            onClick={() => {
              triggerHapticPulse('medium');
              updateSettings({ voiceAlertEnabled: !settings.voiceAlertEnabled });
            }}
            className="p-1.5 rounded-lg bg-slate-900/90 border border-white/5 flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-[9px] text-slate-300">
              <Volume2 className="w-3 h-3 text-cyan-400" />
              <span>Voice</span>
            </div>
            <span className={`text-[8.5px] font-bold ${settings.voiceAlertEnabled ? 'text-emerald-400' : 'text-slate-500'}`}>
              {settings.voiceAlertEnabled ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

        {/* Emergency Contact */}
        <div className="p-2 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <div className="min-w-0">
              <div className="text-[10px] font-semibold text-slate-200">
                {settings.emergencyContact.name}
              </div>
              <div className="text-[8px] text-slate-400">
                {settings.emergencyContact.phone}
              </div>
            </div>
          </div>
          <span className="text-[8px] font-mono text-emerald-400">CONFIGURED</span>
        </div>

        {/* Edge AI Technical Screen Link */}
        <button
          onClick={() => {
            triggerHapticPulse('medium');
            setScreen('EDGE_AI');
          }}
          className="p-2 rounded-xl bg-orange-950/30 border border-orange-500/30 hover:border-orange-500/60 flex items-center justify-between text-left cursor-pointer transition-colors"
        >
          <span className="text-[9.5px] font-bold text-orange-300">
            ⚡ Edge AI Pipeline (Judges Demo)
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
        </button>

      </div>

      <ScreenFooter
        leftScreen={{ name: isTamil ? 'தனியுரிமை' : 'PRIVACY', target: 'PRIVACY' }}
        rightScreen={{ name: isTamil ? 'தொழிலாளர்' : 'WORKER', target: 'WORKER_MODE' }}
      />
    </div>
  );
};
