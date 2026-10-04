import React from 'react';
import { BatteryCharging, Cpu, CheckCircle2, ShieldCheck, Zap, Radio } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const BatteryDeviceScreen: React.FC = () => {
  const { sensorData, settings } = useBand();
  const isTamil = settings.language === 'ta';

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={isTamil ? 'சாதன நிலை' : 'DEVICE'} showClock={false} />

      {/* Screen Title */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <span className="text-[12px] font-black uppercase tracking-wider text-slate-200">
          {isTamil ? 'பேட்டரி & சாதனம்' : 'DEVICE & POWER'}
        </span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
          HEALTHY
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-1.5 px-3 py-1 overflow-y-auto no-scrollbar">
        
        {/* Battery Main Card */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <BatteryCharging className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-[9px] text-slate-400 uppercase font-semibold">
                {isTamil ? 'பேட்டரி அளவு' : 'Battery Level'}
              </div>
              <div className="text-xl font-telemetry font-black text-white">
                {sensorData.batteryPercent}%
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-telemetry font-bold text-emerald-400">
              ~{sensorData.batteryHoursRemaining} hrs
            </span>
            <div className="text-[8px] text-slate-400 uppercase">REMAINING</div>
          </div>
        </div>

        {/* Offline-First Architecture Banner (Mandatory requirement!) */}
        <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2">
          <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-[9px] text-slate-200 leading-snug">
            <strong className="text-emerald-300 block font-bold">
              {isTamil ? 'ஆஃப்லைன்-முதல் கட்டமைப்பு' : 'OFFLINE-FIRST ARCHITECTURE'}
            </strong>
            {isTamil 
              ? 'இணையம் இன்றி பாதுகாப்புக் கணிப்பு சாதனத்திலேயே நடைபெறுகிறது.' 
              : 'Safety detection continues locally without relying on cloud servers.'}
          </div>
        </div>

        {/* Sensor Diagnostics Status */}
        <div className="p-2 rounded-xl bg-slate-900/90 border border-white/5 flex flex-col gap-1 text-[8.5px]">
          <div className="text-slate-400 font-bold uppercase pb-0.5 border-b border-white/5">
            {isTamil ? 'சென்சார் உறுதிப்பாடு' : 'HARDWARE HEALTH'}
          </div>

          <div className="grid grid-cols-2 gap-1 text-slate-300">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>PPG Pulse: OK</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Temp: OK</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>IMU Motion: OK</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>SHT4x Env: OK</span>
            </div>
          </div>
        </div>

      </div>

      <ScreenFooter
        leftScreen={{ name: isTamil ? 'அளவு' : 'CALIB', target: 'CALIBRATION' }}
        rightScreen={{ name: isTamil ? 'தனியுரிமை' : 'PRIVACY', target: 'PRIVACY' }}
      />
    </div>
  );
};
