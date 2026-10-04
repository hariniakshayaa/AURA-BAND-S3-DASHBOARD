import React, { useState } from 'react';
import { useBand } from '../../context/BandContext';
import { 
  Sliders, 
  Flame, 
  Heart, 
  Droplets, 
  Thermometer, 
  Activity, 
  Radio, 
  Wifi, 
  WifiOff, 
  Volume2, 
  Vibrate, 
  Play, 
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import type { RiskLevel, ScreenType, ActivityType } from '../../types/wearable';

export const DemoController: React.FC = () => {
  const { 
    sensorData, 
    updateSensorData, 
    aiRisk, 
    setRiskLevel, 
    currentScreen, 
    setScreen, 
    applyDemoScenario, 
    triggerHapticPulse, 
    triggerVoiceAlert,
    settings,
    updateSettings,
    toggleLanguage
  } = useBand();

  const [activeTab, setActiveTab] = useState<'scenarios' | 'sensors' | 'screens'>('scenarios');

  return (
    <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-3.5">
      
      {/* Header with Demo Badge */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight uppercase">
              Prototype Control Deck
            </h3>
            <span className="text-[10px] text-slate-400">
              Live Edge AI &amp; Sensor Simulation
            </span>
          </div>
        </div>

        {/* Mandatory Simulated Data Disclaimer Badge */}
        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[9px] font-mono font-bold tracking-wider">
          SIMULATED DATA
        </span>
      </div>

      {/* Control Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-white/5 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === 'scenarios' 
              ? 'bg-orange-500 text-black shadow-md font-bold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Scenarios
        </button>
        <button
          onClick={() => setActiveTab('sensors')}
          className={`py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === 'sensors' 
              ? 'bg-orange-500 text-black shadow-md font-bold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Sensors
        </button>
        <button
          onClick={() => setActiveTab('screens')}
          className={`py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === 'screens' 
              ? 'bg-orange-500 text-black shadow-md font-bold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Screens
        </button>
      </div>

      {/* ================= TAB 1: ONE-CLICK DEMO SCENARIOS ================= */}
      {activeTab === 'scenarios' && (
        <div className="flex flex-col gap-2.5">
          <div className="text-[11px] text-slate-400 font-medium">
            Instantly set wearable state for judge demonstrations:
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {/* Normal Green */}
            <button
              onClick={() => applyDemoScenario('NORMAL')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                aiRisk.riskLevel === 'NORMAL' && currentScreen === 'HOME'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                  : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
              }`}
            >
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>NORMAL</span>
                </div>
                <div className="text-[9.5px] text-slate-400 mt-0.5">Low Heat Strain</div>
              </div>
              <span className="text-[10px] font-mono opacity-60">01</span>
            </button>

            {/* Elevated Yellow */}
            <button
              onClick={() => applyDemoScenario('YELLOW')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                aiRisk.riskLevel === 'YELLOW' && currentScreen === 'HOME'
                  ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300 ring-1 ring-yellow-500'
                  : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
              }`}
            >
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span>ELEVATED</span>
                </div>
                <div className="text-[9.5px] text-slate-400 mt-0.5">Heat Index Rising</div>
              </div>
              <span className="text-[10px] font-mono opacity-60">02</span>
            </button>

            {/* Rest Needed Orange */}
            <button
              onClick={() => applyDemoScenario('ORANGE')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                aiRisk.riskLevel === 'ORANGE' && currentScreen === 'HEAT_WARNING'
                  ? 'bg-orange-500/25 border-orange-500 text-orange-300 ring-1 ring-orange-500'
                  : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
              }`}
            >
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span>REST NOW</span>
                </div>
                <div className="text-[9.5px] text-slate-400 mt-0.5">Full Orange Alert</div>
              </div>
              <span className="text-[10px] font-mono opacity-60">03</span>
            </button>

            {/* Emergency Red */}
            <button
              onClick={() => applyDemoScenario('RED')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                aiRisk.riskLevel === 'RED'
                  ? 'bg-rose-500/25 border-rose-500 text-rose-300 ring-1 ring-rose-500'
                  : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
              }`}
            >
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>EMERGENCY</span>
                </div>
                <div className="text-[9.5px] text-slate-400 mt-0.5">Critical Strain</div>
              </div>
              <span className="text-[10px] font-mono opacity-60">04</span>
            </button>

            {/* Fall Detected */}
            <button
              onClick={() => applyDemoScenario('FALL')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                currentScreen === 'FALL_DETECTION'
                  ? 'bg-rose-500/25 border-rose-500 text-rose-300 ring-1 ring-rose-500'
                  : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-rose-400">⚡ Fall Detected</div>
                <div className="text-[9.5px] text-slate-400 mt-0.5">10s Countdown</div>
              </div>
              <span className="text-[10px] font-mono opacity-60">05</span>
            </button>

            {/* Recovery Improving */}
            <button
              onClick={() => applyDemoScenario('RECOVERY')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                currentScreen === 'RECOVERY'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                  : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-emerald-400">✓ Recovery</div>
                <div className="text-[9.5px] text-slate-400 mt-0.5">Safe to Resume</div>
              </div>
              <span className="text-[10px] font-mono opacity-60">06</span>
            </button>

            {/* Signal Uncertain */}
            <button
              onClick={() => applyDemoScenario('UNCERTAIN')}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-amber-400">⚠ High Noise</div>
                <div className="text-[9.5px] text-slate-400 mt-0.5">Reading Uncertain</div>
              </div>
              <span className="text-[10px] font-mono opacity-60">07</span>
            </button>

            {/* Sensor Contact Lost */}
            <button
              onClick={() => applyDemoScenario('SENSOR_LOST')}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-rose-400">✗ Contact Lost</div>
                <div className="text-[9.5px] text-slate-400 mt-0.5">Data: NO DATA</div>
              </div>
              <span className="text-[10px] font-mono opacity-60">08</span>
            </button>
          </div>

          {/* Quick Hardware Action Bar */}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => triggerHapticPulse('heavy')}
                className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                <Vibrate className="w-3.5 h-3.5 text-orange-400" />
                <span>Test Haptic</span>
              </button>

              <button
                onClick={() => triggerVoiceAlert()}
                className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Test Voice</span>
              </button>
            </div>

            {/* Trilingual Direct Language Switcher */}
            <div className="flex items-center justify-between p-1.5 rounded-xl bg-slate-950 border border-white/5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Language:</span>
              <div className="flex items-center gap-1">
                {(['en', 'ta', 'hi'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => {
                      triggerHapticPulse('light');
                      updateSettings({ language: l });
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                      settings.language === l
                        ? 'bg-orange-500 text-black shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {l === 'en' ? 'English' : l === 'ta' ? 'தமிழ்' : 'हिन्दी'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ================= TAB 2: GRANULAR SENSOR SLIDERS ================= */}
      {activeTab === 'sensors' && (
        <div className="flex flex-col gap-2.5">
          {/* Heart Rate Slider */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-400" /> Heart Rate (PPG)
              </span>
              <span className="font-telemetry font-bold text-white">
                {sensorData.heartRate} BPM
              </span>
            </div>
            <input
              type="range"
              min="55"
              max="155"
              value={sensorData.heartRate}
              onChange={e => {
                const val = Number(e.target.value);
                updateSensorData({ heartRate: val });
                if (val > 115) setRiskLevel('RED');
                else if (val > 98) setRiskLevel('ORANGE');
                else if (val > 86) setRiskLevel('YELLOW');
                else setRiskLevel('NORMAL');
              }}
              className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Ambient Temp Slider */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Ambient Temp (SHT4x)
              </span>
              <span className="font-telemetry font-bold text-white">
                {sensorData.ambientTemp}°C
              </span>
            </div>
            <input
              type="range"
              min="24"
              max="46"
              value={sensorData.ambientTemp}
              onChange={e => {
                const val = Number(e.target.value);
                updateSensorData({ ambientTemp: val });
                if (val >= 38) setRiskLevel('ORANGE');
                else if (val >= 33) setRiskLevel('YELLOW');
              }}
              className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Humidity Slider */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-400" /> Rel Humidity
              </span>
              <span className="font-telemetry font-bold text-white">
                {sensorData.humidity}%
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="95"
              value={sensorData.humidity}
              onChange={e => updateSensorData({ humidity: Number(e.target.value) })}
              className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Activity Dropdown */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-300 flex items-center gap-1 font-medium">
              <Activity className="w-3.5 h-3.5 text-cyan-400" /> Activity State
            </span>
            <select
              value={sensorData.activity}
              onChange={e => updateSensorData({ activity: e.target.value as ActivityType })}
              className="bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200 rounded-lg px-2 py-1 cursor-pointer"
            >
              <option value="RESTING">Resting</option>
              <option value="WALKING">Walking</option>
              <option value="WORKING">Working</option>
              <option value="RUNNING">Running</option>
            </select>
          </div>

          {/* Toggles: Sensor Contact & Cellular */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800 text-xs">
            <button
              onClick={() => {
                const next = !sensorData.sensorContact;
                updateSensorData({
                  sensorContact: next,
                  signalStatus: next ? 'GOOD' : 'SENSOR_LOST',
                  signalQualityPercent: next ? 94 : 0
                });
              }}
              className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer ${
                sensorData.sensorContact 
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
              }`}
            >
              <span>Wrist Contact</span>
              <span className="font-bold">{sensorData.sensorContact ? 'LOCKED' : 'OFF'}</span>
            </button>

            <button
              onClick={() => {
                updateSensorData({ cellularAvailable: !sensorData.cellularAvailable });
              }}
              className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer ${
                sensorData.cellularAvailable 
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' 
                  : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
              }`}
            >
              <span>Cellular Net</span>
              <span className="font-bold">{sensorData.cellularAvailable ? 'ONLINE' : 'OFFLINE'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 3: SCREEN DIRECT JUMP ================= */}
      {activeTab === 'screens' && (
        <div className="flex flex-col gap-2">
          <div className="text-[11px] text-slate-400 font-medium">
            Jump to any of the 16 wearable screens:
          </div>

          <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto no-scrollbar pr-0.5">
            {[
              { id: 'HOME', label: '1. Home Screen' },
              { id: 'HEALTH', label: '2. Health Trends' },
              { id: 'ENVIRONMENT', label: '3. Environment' },
              { id: 'HYDRATION', label: '💧 Hydration Advisor' },
              { id: 'REST_ADVISOR', label: '⏸ Rest Advisor' },
              { id: 'AI_RISK', label: '4. Explainable AI' },
              { id: 'SIGNAL_QUALITY', label: '5. Signal Quality' },
              { id: 'HEAT_WARNING', label: '6. Heat Alert' },
              { id: 'RECOVERY', label: '8. Safe Recovery' },
              { id: 'FALL_DETECTION', label: '9. Fall Detect' },
              { id: 'SOS', label: '10. Emergency SOS' },
              { id: 'CALIBRATION', label: '11. Calibration' },
              { id: 'BATTERY_DEVICE', label: '12. Battery & HW' },
              { id: 'PRIVACY', label: '13. Data Privacy' },
              { id: 'SETTINGS', label: '14. Settings' },
              { id: 'WORKER_MODE', label: '18. Worker Mode' },
              { id: 'ELDERLY_MODE', label: '19. Elderly Mode' },
              { id: 'EDGE_AI', label: '22. Edge AI Pipeline' },
            ].map(item => (

              <button
                key={item.id}
                onClick={() => setScreen(item.id as ScreenType)}
                className={`p-1.5 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer truncate ${
                  currentScreen === item.id 
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
