import React, { useEffect, useRef, useState } from 'react';
import { useBand } from '../../context/BandContext';
import { 
  Activity, 
  Cpu, 
  Droplets, 
  ThermometerSun, 
  Armchair, 
  ShieldCheck, 
  Flame, 
  Heart, 
  Zap, 
  Layers, 
  Clock, 
  Users, 
  Radio, 
  HardDrive,
  BarChart3,
  Waves
} from 'lucide-react';

export const AdvancedTelemetryStation: React.FC = () => {
  const { sensorData, aiRisk, settings, setScreen, updateSensorData, triggerHapticPulse, playWaterSound } = useBand();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pulsePhase, setPulsePhase] = useState<number>(0);
  const lang = settings.language;

  // Live Canvas Waveform Animation (Simulated PPG Optical Blood Volume Pulse)
  useEffect(() => {
    let animId: number;
    let t = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      // Dark oscilloscope canvas clear
      ctx.fillStyle = '#06070a';
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw PPG Pulse Waveform
      ctx.beginPath();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = aiRisk.riskLevel === 'RED' ? '#ef4444' : aiRisk.riskLevel === 'ORANGE' ? '#f97316' : '#06b6d4';
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 8;

      const hrFreq = sensorData.heartRate / 60; // beats per second

      for (let x = 0; x < w; x++) {
        const timeNorm = (x / w) * 3 + t;
        // Simulated PPG dicrotic notch mathematical waveform
        const cycle = (timeNorm * hrFreq) % 1;
        let yNorm = 0;
        if (cycle < 0.25) {
          // Systolic upstroke
          yNorm = Math.sin((cycle / 0.25) * (Math.PI / 2));
        } else if (cycle < 0.45) {
          // Systolic descent & dicrotic notch
          yNorm = 1 - Math.sin(((cycle - 0.25) / 0.2) * (Math.PI / 2)) * 0.45;
        } else if (cycle < 0.6) {
          // Diastolic wave peak
          yNorm = 0.55 + Math.sin(((cycle - 0.45) / 0.15) * Math.PI) * 0.18;
        } else {
          // Diastolic decay
          yNorm = 0.55 * (1 - (cycle - 0.6) / 0.4);
        }

        const y = h * 0.85 - yNorm * (h * 0.65);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      t += 0.018;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [sensorData.heartRate, aiRisk.riskLevel]);

  return (
    <div className="w-full bg-slate-900/95 border border-slate-800 rounded-3xl p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-4">
      
      {/* Station Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Waves className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight uppercase flex items-center gap-2">
              <span>Edge Telemetry &amp; Field Station</span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-500/30">
                LIVE 50Hz STREAM
              </span>
            </h3>
            <span className="text-[10px] text-slate-400">
              ISO 7933 PHS Heat Balance &amp; Realtime Physiological Oscilloscope
            </span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ESP32-S3 DUAL CORE @ 240MHz
          </span>
        </div>
      </div>

      {/* Grid Section 1: Live PPG Oscilloscope & TinyML Feature Vector */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        
        {/* Live Pulse Oscilloscope (8 cols) */}
        <div className="md:col-span-8 p-3 rounded-2xl bg-slate-950 border border-white/5 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-slate-200">MAX30102 PPG Optical Waveform (AC Signal)</span>
            </div>
            <div className="flex items-center gap-3 font-telemetry text-[10px] text-slate-400">
              <span>PI: <strong className="text-white">4.8%</strong></span>
              <span>SQI: <strong className="text-emerald-400">{sensorData.signalQualityPercent}%</strong></span>
              <span>HR: <strong className="text-rose-400 font-bold">{sensorData.heartRate} BPM</strong></span>
            </div>
          </div>

          {/* Canvas Waveform */}
          <div className="w-full h-24 rounded-xl overflow-hidden border border-slate-800 bg-[#06070a] relative">
            <canvas ref={canvasRef} width={500} height={96} className="w-full h-full block" />
            <div className="absolute top-1.5 left-2 text-[9px] font-mono text-cyan-400/80 bg-black/60 px-1.5 py-0.5 rounded">
              Systolic dP/dt Pulse Derivative
            </div>
          </div>
        </div>

        {/* TinyML Live Feature Activation Vectors (4 cols) */}
        <div className="md:col-span-4 p-3 rounded-2xl bg-slate-950 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-900">
            <span className="font-bold text-orange-400 flex items-center gap-1.5 text-[11px]">
              <Cpu className="w-3.5 h-3.5" /> TinyML Neural Inputs
            </span>
            <span className="font-mono text-[9px] text-slate-400">INT8</span>
          </div>

          <div className="flex flex-col gap-1.5 mt-1.5 text-[10px]">
            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span>Skin Temp Delta</span>
                <span className="font-mono text-white font-bold">{sensorData.skinTempTrend}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span>HR Drift vs Base</span>
                <span className="font-mono text-white font-bold">+{sensorData.heartRate - sensorData.baselineHeartRate} BPM</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: `${Math.min(100, (sensorData.heartRate - 60) * 1.2)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span>Heat Load Stress Ratio</span>
                <span className="font-mono text-white font-bold">{sensorData.humidity}% RH</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: `${sensorData.humidity}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-2 pt-1 border-t border-slate-900 flex justify-between items-center text-[9.5px] font-mono">
            <span className="text-slate-400">Inference:</span>
            <span className="text-emerald-400 font-bold">11.8 ms (Local Xtensa Core 1)</span>
          </div>
        </div>

      </div>

      {/* Grid Section 2: ADVANCED HYDRATION & REST BREAK ADVISOR (User Request!) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        {/* Card A: Advanced Hydration Engine */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-cyan-500/20 flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-slate-900">
            <div className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-black text-white uppercase tracking-tight">
                Dynamic Hydration Engine
              </span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">
              TARGET: 2500 mL
            </span>
          </div>

          {/* Telemetry Row */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
              <div className="text-[9px] text-slate-400 uppercase">Sweat Loss</div>
              <div className="font-telemetry font-bold text-sm text-cyan-300 mt-0.5">
                {sensorData.sweatRateMlPerHour} <span className="text-[8px] text-slate-400 font-normal">mL/h</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
              <div className="text-[9px] text-slate-400 uppercase">Intake Logged</div>
              <div className="font-telemetry font-bold text-sm text-emerald-400 mt-0.5">
                {sensorData.waterIntakeTotalMl} <span className="text-[8px] text-slate-400 font-normal">mL</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
              <div className="text-[9px] text-slate-400 uppercase">Next Drink In</div>
              <div className="font-telemetry font-bold text-sm text-orange-400 mt-0.5">
                {sensorData.nextDrinkMinutes} <span className="text-[8px] text-slate-400 font-normal">mins</span>
              </div>
            </div>
          </div>

          {/* Interactive Hydration Action Bar */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="text-[10px] text-slate-300 leading-tight">
              <strong>Active Intake Recommendation:</strong> Sip 250 mL every 15m to counter evaporative deficit.
            </div>

            <button
              onClick={() => {
                triggerHapticPulse('medium');
                playWaterSound();
                const newTotal = sensorData.waterIntakeTotalMl + 250;
                updateSensorData({
                  waterIntakeTotalMl: newTotal,
                  hydrationLevelPercent: Math.min(100, Math.round((newTotal / 2500) * 100)),
                  nextDrinkMinutes: 15
                });
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 active:scale-95 text-black font-black text-xs shrink-0 cursor-pointer shadow-md transition-all"
            >
              +250 mL Log Drink
            </button>
          </div>
        </div>

        {/* Card B: Work-Rest Advisory Station (OSHA / ISO 7933 PHS) */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/20 flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-slate-900">
            <div className="flex items-center gap-1.5">
              <Armchair className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black text-white uppercase tracking-tight">
                Work-Rest Cycle Advisor (ISO 7933)
              </span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
              {sensorData.workRestRatio}
            </span>
          </div>

          {/* Work/Rest Metric Columns */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
              <div className="text-[9px] text-slate-400 uppercase">Work Session</div>
              <div className="font-telemetry font-bold text-sm text-slate-200 mt-0.5">
                {sensorData.workSessionMinutes} <span className="text-[8px] text-slate-400 font-normal">mins</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
              <div className="text-[9px] text-slate-400 uppercase">Mandatory Break</div>
              <div className="font-telemetry font-bold text-sm text-rose-400 mt-0.5">
                {sensorData.restBreakDueMinutes} <span className="text-[8px] text-slate-400 font-normal">mins</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5">
              <div className="text-[9px] text-slate-400 uppercase">Rest Duration</div>
              <div className="font-telemetry font-bold text-sm text-amber-400 mt-0.5">
                {sensorData.restDurationRecommended} <span className="text-[8px] text-slate-400 font-normal">mins</span>
              </div>
            </div>
          </div>

          {/* Direct Rest Action Trigger */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="text-[10px] text-slate-300 leading-tight">
              <strong>Cooling Directive:</strong> Seek ventilated shade, loosen protective gear, apply cool water to wrists.
            </div>

            <button
              onClick={() => {
                triggerHapticPulse('medium');
                setScreen('REST_ADVISOR');
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-black font-black text-xs shrink-0 cursor-pointer shadow-md transition-all"
            >
              Open Rest Advisor
            </button>
          </div>
        </div>

      </div>

      {/* Grid Section 3: Field Worker Fleet Safety Grid (Multi-Worker Industrial View) */}
      <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black text-white uppercase tracking-tight">
              Simulated Fleet Safety Grid (Industrial / Agricultural Site)
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-400">
            BLE MESH LOCAL DISCOVERY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          {/* Worker 1: Ramesh (Current Device) */}
          <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-between">
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Ramesh (This Device)</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Zone A • Agricultural Field</div>
            </div>
            <div className="text-right font-telemetry">
              <div className="text-white font-bold">{sensorData.heartRate} BPM</div>
              <div className="text-[9px] text-amber-400 font-semibold">{sensorData.ambientTemp}°C</div>
            </div>
          </div>

          {/* Worker 2: Murugan */}
          <div className="p-2.5 rounded-xl bg-slate-900 border border-orange-500/40 flex items-center justify-between">
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span>Murugan (Band #02)</span>
              </div>
              <div className="text-[10px] text-orange-300 mt-0.5">Zone B • Rest Prescribed</div>
            </div>
            <div className="text-right font-telemetry">
              <div className="text-orange-400 font-bold">104 BPM</div>
              <div className="text-[9px] text-orange-300 font-semibold">37°C</div>
            </div>
          </div>

          {/* Worker 3: Kavitha */}
          <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between">
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Kavitha (Band #03)</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Zone C • Packing Shed</div>
            </div>
            <div className="text-right font-telemetry">
              <div className="text-white font-bold">78 BPM</div>
              <div className="text-[9px] text-slate-400 font-semibold">31°C</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
