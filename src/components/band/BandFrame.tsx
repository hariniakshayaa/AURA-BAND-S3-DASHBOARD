import React, { useRef, useState } from 'react';
import { useBand } from '../../context/BandContext';
import { HomeScreen } from '../screens/HomeScreen';
import { HealthScreen } from '../screens/HealthScreen';
import { EnvironmentScreen } from '../screens/EnvironmentScreen';
import { HydrationScreen } from '../screens/HydrationScreen';
import { RestAdvisorScreen } from '../screens/RestAdvisorScreen';
import { AIRiskScreen } from '../screens/AIRiskScreen';
import { SignalQualityScreen } from '../screens/SignalQualityScreen';
import { HeatWarningScreen } from '../screens/HeatWarningScreen';
import { RecoveryScreen } from '../screens/RecoveryScreen';
import { FallDetectionScreen } from '../screens/FallDetectionScreen';
import { SOSScreen } from '../screens/SOSScreen';
import { CalibrationScreen } from '../screens/CalibrationScreen';
import { BatteryDeviceScreen } from '../screens/BatteryDeviceScreen';
import { PrivacyScreen } from '../screens/PrivacyScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { WorkerModeScreen } from '../screens/WorkerModeScreen';
import { ElderlyModeScreen } from '../screens/ElderlyModeScreen';
import { EdgeAIScreen } from '../screens/EdgeAIScreen';
import { Power, Eye, Cpu, Activity, Flame } from 'lucide-react';

export const BandFrame: React.FC = () => {
  const { 
    currentScreen, 
    screenPowered, 
    toggleScreenPower, 
    goHome, 
    goBack,
    setScreen,
    triggerHapticPulse, 
    isVibrating,
    showHardwareCallouts,
    setShowHardwareCallouts
  } = useBand();

  // Touch / Swipe Gesture Simulation
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    setTouchStartX(e.clientX);
    setTouchStartY(e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.clientX - touchStartX;
    const deltaY = e.clientY - touchStartY;

    // Detect horizontal swipe
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swipe Left (advance next)
        triggerHapticPulse('light');
        if (currentScreen === 'HOME') setScreen('HEALTH');
        else if (currentScreen === 'HEALTH') setScreen('ENVIRONMENT');
        else if (currentScreen === 'ENVIRONMENT') setScreen('HYDRATION');
        else if (currentScreen === 'HYDRATION') setScreen('REST_ADVISOR');
        else if (currentScreen === 'REST_ADVISOR') setScreen('AI_RISK');
        else if (currentScreen === 'AI_RISK') setScreen('SIGNAL_QUALITY');
        else if (currentScreen === 'SIGNAL_QUALITY') setScreen('HEAT_WARNING');
      } else {
        // Swipe Right (go back)
        triggerHapticPulse('light');
        goBack();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Render active wearable screen
  const renderCurrentScreen = () => {
    if (!screenPowered) {
      return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4 text-center select-none">
          <div className="text-slate-700 text-xs font-mono">OLED OFF</div>
          <div className="text-[10px] text-slate-800 mt-1">Click Digital Crown to Wake</div>
        </div>
      );
    }

    switch (currentScreen) {
      case 'HOME':
        return <HomeScreen />;
      case 'HEALTH':
        return <HealthScreen />;
      case 'ENVIRONMENT':
        return <EnvironmentScreen />;
      case 'HYDRATION':
        return <HydrationScreen />;
      case 'REST_ADVISOR':
        return <RestAdvisorScreen />;
      case 'AI_RISK':
        return <AIRiskScreen />;
      case 'SIGNAL_QUALITY':
        return <SignalQualityScreen />;
      case 'HEAT_WARNING':
        return <HeatWarningScreen />;
      case 'RECOVERY':
        return <RecoveryScreen />;
      case 'FALL_DETECTION':
        return <FallDetectionScreen />;
      case 'SOS':
        return <SOSScreen />;
      case 'CALIBRATION':
        return <CalibrationScreen />;
      case 'BATTERY_DEVICE':
        return <BatteryDeviceScreen />;
      case 'PRIVACY':
        return <PrivacyScreen />;
      case 'SETTINGS':
        return <SettingsScreen />;
      case 'WORKER_MODE':
        return <WorkerModeScreen />;
      case 'ELDERLY_MODE':
        return <ElderlyModeScreen />;
      case 'EDGE_AI':
        return <EdgeAIScreen />;
      default:
        return <HomeScreen />;
    }
  };


  return (
    <div className="relative flex flex-col items-center justify-center select-none py-6">
      
      {/* ================= TOP STRAP ================= */}
      <div className="relative w-44 h-28 bg-[#15171d] rounded-t-2xl shadow-inner flex flex-col items-center justify-end overflow-hidden border-t-2 border-x-2 border-slate-700/40">
        {/* Strap Texture / Ribbing */}
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,#000,#000_3px,#2c303c_3px,#2c303c_6px)]" />
        {/* Adjustment Pinholes */}
        <div className="flex flex-col gap-3 mb-2 z-10">
          <div className="w-2.5 h-4 rounded-full bg-[#0a0b0e] border border-slate-700 shadow-inner" />
          <div className="w-2.5 h-4 rounded-full bg-[#0a0b0e] border border-slate-700 shadow-inner" />
          <div className="w-2.5 h-4 rounded-full bg-[#0a0b0e] border border-slate-700 shadow-inner" />
        </div>
        {/* Metal Pin Clasp Accent */}
        <div className="w-16 h-2 rounded bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 shadow mb-1 z-10" />
      </div>

      {/* ================= HARDWARE CALLOUTS (OPTIONAL OVERLAY) ================= */}
      {showHardwareCallouts && (
        <>
          {/* Top Left: SHT4x Sensor */}
          <div className="hidden lg:flex absolute -left-44 top-20 items-center gap-2 animate-fade-in z-30">
            <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-amber-500/50 text-[10px] shadow-lg backdrop-blur-md">
              <div className="font-bold text-amber-400 flex items-center gap-1">
                <Flame className="w-3 h-3" /> SHT4x Ambient Sensor
              </div>
              <div className="text-[8.5px] text-slate-300">Temp &amp; Rel Humidity at 1 Hz</div>
            </div>
            <div className="w-12 h-[1px] bg-amber-500/60" />
            <div className="w-2 h-2 rounded-full bg-amber-400 shadow-glow" />
          </div>

          {/* Top Right: Crown Button */}
          <div className="hidden lg:flex absolute -right-48 top-44 items-center gap-2 animate-fade-in z-30">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-glow" />
            <div className="w-12 h-[1px] bg-cyan-500/60" />
            <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/50 text-[10px] shadow-lg backdrop-blur-md">
              <div className="font-bold text-cyan-400">Rotary Crown &amp; Home</div>
              <div className="text-[8.5px] text-slate-300">Click to Wake / Go Home</div>
            </div>
          </div>

          {/* Bottom Left: ESP32-S3 Edge AI */}
          <div className="hidden lg:flex absolute -left-48 bottom-32 items-center gap-2 animate-fade-in z-30">
            <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-orange-500/50 text-[10px] shadow-lg backdrop-blur-md">
              <div className="font-bold text-orange-400 flex items-center gap-1">
                <Cpu className="w-3 h-3" /> ESP32-S3 TinyML
              </div>
              <div className="text-[8.5px] text-slate-300">INT8 Quantized Neural Model</div>
            </div>
            <div className="w-12 h-[1px] bg-orange-500/60" />
            <div className="w-2 h-2 rounded-full bg-orange-400 shadow-glow" />
          </div>

          {/* Bottom Right: Optical PPG & Thermistor */}
          <div className="hidden lg:flex absolute -right-48 bottom-32 items-center gap-2 animate-fade-in z-30">
            <div className="w-2 h-2 rounded-full bg-rose-400 shadow-glow" />
            <div className="w-12 h-[1px] bg-rose-500/60" />
            <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-rose-500/50 text-[10px] shadow-lg backdrop-blur-md">
              <div className="font-bold text-rose-400 flex items-center gap-1">
                <Activity className="w-3 h-3" /> PPG + Skin Thermistor
              </div>
              <div className="text-[8.5px] text-slate-300">50 Hz Pulse &amp; Micro-trend</div>
            </div>
          </div>
        </>
      )}

      {/* ================= SMART BAND CHASSIS ================= */}
      <div 
        className={`relative z-20 transition-transform ${isVibrating ? 'animate-vibrate' : ''}`}
        style={{ transformOrigin: 'center center' }}
      >
        {/* Main Watch Case (Aerospace Matte Graphite Chassis) */}
        <div className="relative w-[280px] h-[450px] sm:w-[294px] sm:h-[468px] rounded-[48px] bg-gradient-to-b from-[#252830] via-[#1a1c23] to-[#121318] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] flex items-center justify-center">
          
          {/* Subtle Outer Bezel Rim */}
          <div className="w-full h-full rounded-[40px] bg-[#0c0d11] p-[8px] flex items-center justify-center relative band-screen-bezel">
            
            {/* Screen Glass Surface */}
            <div 
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              className="w-full h-full rounded-[32px] bg-black overflow-hidden relative cursor-grab active:cursor-grabbing flex flex-col"
              title="Interactive Wearable Screen — Swipe Left/Right or Tap to Navigate"
            >
              {/* Screen Glare Highlight */}
              <div className="absolute inset-0 pointer-events-none oled-glare z-30" />

              {/* ACTIVE WEARABLE SCREEN CONTENT */}
              <div className="w-full h-full z-10 flex flex-col">
                {renderCurrentScreen()}
              </div>
            </div>
          </div>

          {/* ================= PHYSICAL DIGITAL CROWN (RIGHT SIDE) ================= */}
          <button
            onClick={() => {
              triggerHapticPulse('medium');
              if (!screenPowered) {
                toggleScreenPower();
              } else {
                goHome();
              }
            }}
            className="absolute -right-3.5 top-28 w-4 h-14 rounded-r-md bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 border-y border-r border-slate-400/50 shadow-md cursor-pointer hover:brightness-125 active:scale-95 flex flex-col items-center justify-center gap-1 group z-30"
            title="Digital Crown: Click to return Home / Wake display"
          >
            {/* Crown Knurling Ridges */}
            <span className="w-2.5 h-[2px] bg-slate-800 rounded-full" />
            <span className="w-2.5 h-[2px] bg-slate-800 rounded-full" />
            <span className="w-2.5 h-[2px] bg-slate-800 rounded-full" />
            <span className="w-2.5 h-[2px] bg-slate-800 rounded-full" />
          </button>

          {/* ================= SECONDARY PHYSICAL ACTION BUTTON ================= */}
          <button
            onClick={() => {
              triggerHapticPulse('heavy');
              setScreen('SOS');
            }}
            className="absolute -right-2.5 top-48 w-3 h-10 rounded-r-sm bg-gradient-to-r from-slate-700 to-slate-600 border border-slate-500/40 shadow cursor-pointer hover:bg-rose-900/60 active:scale-95 z-30"
            title="Emergency Hardware Button: Direct SOS"
          />

          {/* Microphone Port Hole (Left Side) */}
          <div className="absolute -left-1 top-36 w-1 h-2 rounded-full bg-black/80 border border-white/10" title="Microphone Port" />
        </div>
      </div>

      {/* ================= BOTTOM STRAP ================= */}
      <div className="relative w-44 h-28 bg-[#15171d] rounded-b-2xl shadow-inner flex flex-col items-center justify-start overflow-hidden border-b-2 border-x-2 border-slate-700/40">
        {/* Strap Texture / Ribbing */}
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,#000,#000_3px,#2c303c_3px,#2c303c_6px)]" />
        {/* Adjustment Pinholes */}
        <div className="flex flex-col gap-3 mt-3 z-10">
          <div className="w-2.5 h-4 rounded-full bg-[#0a0b0e] border border-slate-700 shadow-inner" />
          <div className="w-2.5 h-4 rounded-full bg-[#0a0b0e] border border-slate-700 shadow-inner" />
          <div className="w-2.5 h-4 rounded-full bg-[#0a0b0e] border border-slate-700 shadow-inner" />
        </div>
      </div>

      {/* Quick Interactive Tooltip / Hint underneath Band */}
      <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
        <button
          onClick={toggleScreenPower}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10 cursor-pointer active:scale-95 transition-all text-[11px]"
        >
          <Power className={`w-3 h-3 ${screenPowered ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span>{screenPowered ? 'Screen ON' : 'Screen OFF'}</span>
        </button>

        <button
          onClick={() => setShowHardwareCallouts(!showHardwareCallouts)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full border cursor-pointer active:scale-95 transition-all text-[11px] ${
            showHardwareCallouts 
              ? 'bg-orange-500/20 text-orange-300 border-orange-500/50' 
              : 'bg-slate-800/80 text-slate-400 border-white/10 hover:bg-slate-700'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Hardware Callouts</span>
        </button>
      </div>

    </div>
  );
};
