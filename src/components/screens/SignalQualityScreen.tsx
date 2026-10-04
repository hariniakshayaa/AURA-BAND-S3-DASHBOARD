import React from 'react';
import { Radio, CheckCircle, AlertTriangle, XCircle, RefreshCw, Activity, ShieldAlert } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const SignalQualityScreen: React.FC = () => {
  const { sensorData, settings, updateSensorData, triggerHapticPulse } = useBand();
  const isTamil = settings.language === 'ta';

  // Toggle sensor state for live demonstration
  const handleToggleContact = () => {
    triggerHapticPulse('medium');
    if (sensorData.sensorContact) {
      updateSensorData({ sensorContact: false, signalStatus: 'SENSOR_LOST', signalQualityPercent: 0 });
    } else {
      updateSensorData({ sensorContact: true, signalStatus: 'GOOD', signalQualityPercent: 94, motionNoise: 'LOW' });
    }
  };

  const handleToggleNoise = () => {
    triggerHapticPulse('medium');
    if (sensorData.motionNoise === 'HIGH') {
      updateSensorData({ motionNoise: 'LOW', signalStatus: 'GOOD', signalQualityPercent: 94 });
    } else {
      updateSensorData({ motionNoise: 'HIGH', signalStatus: 'UNCERTAIN', signalQualityPercent: 42 });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={isTamil ? 'சிக்னல் தரம்' : 'SIGNAL'} showClock={false} />

      {/* Screen Title */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <span className="text-[12px] font-black uppercase tracking-wider text-slate-300">
          {isTamil ? 'சென்சார் ஒருமைப்பாடு' : 'SIGNAL INTEGRITY'}
        </span>
        <span className={`text-[8.5px] font-mono px-1.5 py-0.5 rounded ${
          sensorData.signalStatus === 'GOOD' 
            ? 'bg-emerald-500/20 text-emerald-300' 
            : sensorData.signalStatus === 'UNCERTAIN'
            ? 'bg-amber-500/20 text-amber-300'
            : 'bg-rose-500/20 text-rose-300'
        }`}>
          {sensorData.signalStatus}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-1.5 px-3 py-1 overflow-y-auto no-scrollbar">
        
        {/* State 1: SENSOR CONTACT LOST */}
        {!sensorData.sensorContact ? (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/60 flex flex-col items-center text-center gap-1.5 animate-pulse">
            <XCircle className="w-8 h-8 text-rose-500" />
            <div className="text-[13px] font-black uppercase text-rose-300 leading-tight">
              {isTamil ? '⚠ சென்சார் தொடர்பு துண்டிக்கப்பட்டது' : '⚠ SENSOR CONTACT LOST'}
            </div>
            <div className="text-[10px] text-slate-300 leading-snug">
              {isTamil ? 'தயவுசெய்து பேண்டை கையில் சரியாக அணியவும்.' : 'Please wear the band correctly on your wrist.'}
            </div>

            {/* Crucial requirement: Show NO DATA, never SAFE */}
            <div className="mt-1 px-3 py-1 rounded bg-black/60 border border-rose-500/40 font-mono text-[10px] text-rose-400 font-bold">
              DATA: NO DATA
            </div>
          </div>
        ) : sensorData.signalStatus === 'UNCERTAIN' ? (
          /* State 2: READING UNCERTAIN (Too much movement) */
          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/60 flex flex-col items-center text-center gap-1">
            <AlertTriangle className="w-7 h-7 text-amber-400 animate-bounce" />
            <div className="text-[12px] font-black uppercase text-amber-300 leading-tight">
              {isTamil ? '⚠ அளவீடு நிச்சயமற்றது' : '⚠ READING UNCERTAIN'}
            </div>
            <div className="text-[9.5px] text-slate-200 font-medium leading-snug">
              {isTamil ? 'அதிக உடல் அசைவு கண்டறியப்பட்டது.' : 'Too much movement artifacts.'}
            </div>
            <div className="text-[9px] text-amber-200 bg-amber-950/60 px-2 py-1 rounded border border-amber-500/30">
              {isTamil ? 'பேண்டை இறுக்கி 1 நிமிடம் அமைதியாக ஓய்வெடுக்கவும்.' : 'Tighten the band and rest still for one minute.'}
            </div>
          </div>
        ) : (
          /* State 3: GOOD SIGNAL */
          <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
            <div>
              <div className="text-[9px] uppercase font-bold text-slate-400">
                {isTamil ? 'சிக்னல் தரம்' : 'Signal Quality'}
              </div>
              <div className="text-xl font-telemetry font-black text-emerald-400">
                {sensorData.signalQualityPercent}%
              </div>
              <div className="text-[9px] text-emerald-300 font-semibold">
                {isTamil ? 'சிறப்பான இணைப்பு' : 'OPTIMAL CONTACT'}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        )}

        {/* Sub-sensor Health Diagnostic Checklist */}
        <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col gap-1 text-[9px]">
          <div className="flex items-center justify-between text-slate-400 font-bold uppercase pb-1 border-b border-white/5">
            <span>{isTamil ? 'சென்சார் நிலை' : 'HARDWARE SENSORS'}</span>
            <span>STATUS</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">PPG Optical Pulse</span>
            <span className={sensorData.sensorContact ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              {sensorData.sensorContact ? '✓ GOOD' : '✗ NO SIGNAL'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">6-Axis IMU Motion</span>
            <span className={sensorData.motionNoise === 'HIGH' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
              {sensorData.motionNoise === 'HIGH' ? '⚠ NOISY' : '✓ STABLE'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">Skin Thermistor</span>
            <span className="text-emerald-400 font-bold">✓ ACTIVE</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">Electrode Contact</span>
            <span className={sensorData.sensorContact ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              {sensorData.sensorContact ? '✓ LOCKED' : '✗ DETACHED'}
            </span>
          </div>
        </div>

        {/* Live Simulation Interaction Buttons */}
        <div className="grid grid-cols-2 gap-1.5 pt-0.5">
          <button
            onClick={handleToggleContact}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[8.5px] font-semibold text-slate-300 border border-white/10 active:scale-95 cursor-pointer text-center"
          >
            {sensorData.sensorContact ? '⚡ Simulate Detach' : '⚡ Re-attach Band'}
          </button>
          <button
            onClick={handleToggleNoise}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[8.5px] font-semibold text-slate-300 border border-white/10 active:scale-95 cursor-pointer text-center"
          >
            {sensorData.motionNoise === 'HIGH' ? '⚡ Steady Arm' : '⚡ Simulate Jerk'}
          </button>
        </div>

      </div>

      <ScreenFooter
        leftScreen={{ name: isTamil ? 'AI அபாயம்' : 'AI RISK', target: 'AI_RISK' }}
        rightScreen={{ name: isTamil ? 'எச்சரிக்கை' : 'ALERT', target: 'HEAT_WARNING' }}
      />
    </div>
  );
};
