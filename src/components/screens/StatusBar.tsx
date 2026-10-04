import React, { useState, useEffect } from 'react';
import { BatteryCharging, Cpu, WifiOff, Radio } from 'lucide-react';
import { useBand } from '../../context/BandContext';

export const StatusBar: React.FC<{ title?: string; showClock?: boolean }> = ({ title, showClock = true }) => {
  const { sensorData, settings } = useBand();
  const [timeStr, setTimeStr] = useState<string>('12:42');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex items-center justify-between px-3 pt-2 pb-1 text-[11px] font-medium tracking-wider text-slate-400 select-none z-20 shrink-0">
      {/* Left: Clock or Back Title */}
      <div className="flex items-center gap-1.5">
        {showClock ? (
          <span className="font-telemetry font-bold text-slate-200 tracking-tight">{timeStr}</span>
        ) : (
          <span className="text-[10px] font-semibold uppercase text-orange-400 truncate max-w-[80px]">
            {title}
          </span>
        )}

        {/* Offline-First Tiny Indicator */}
        <div 
          className="flex items-center gap-0.5 px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-semibold border border-emerald-500/30"
          title="Edge AI: Operating locally without cloud dependency"
        >
          <Cpu className="w-2.5 h-2.5 text-emerald-400" />
          <span className="tracking-tighter uppercase font-mono">LOCAL</span>
        </div>
      </div>

      {/* Right: Sensor Signal & Battery */}
      <div className="flex items-center gap-2">
        {/* Signal indicator */}
        <div className="flex items-center gap-0.5" title={`PPG Quality: ${sensorData.signalQualityPercent}%`}>
          {sensorData.signalStatus === 'GOOD' ? (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ) : sensorData.signalStatus === 'UNCERTAIN' ? (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          )}
        </div>

        {/* Cellular status */}
        {!sensorData.cellularAvailable ? (
          <span title="Cellular Offline">
            <WifiOff className="w-2.5 h-2.5 text-slate-500" />
          </span>
        ) : (
          <span title="Cellular Ready">
            <Radio className="w-2.5 h-2.5 text-slate-400" />
          </span>
        )}


        {/* Battery */}
        <div className="flex items-center gap-1 font-telemetry text-slate-300">
          <span className="text-[10px]">{sensorData.batteryPercent}%</span>
          <div className="relative w-3.5 h-2 rounded-[2px] border border-slate-500 flex items-center p-[1px]">
            <div 
              className={`h-full rounded-[1px] ${
                sensorData.batteryPercent > 20 ? 'bg-emerald-400' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, sensorData.batteryPercent)}%` }}
            />
            <div className="absolute -right-[2px] top-[2px] w-[1px] h-[3px] bg-slate-500 rounded-r-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
