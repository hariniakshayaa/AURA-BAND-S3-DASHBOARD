import React, { useState } from 'react';
import { BandProvider, useBand } from './context/BandContext';
import { BandFrame } from './components/band/BandFrame';
import { DemoController } from './components/controls/DemoController';
import { HackathonStepper } from './components/controls/HackathonStepper';
import { TechSpecModal } from './components/modals/TechSpecModal';
import { AdvancedTelemetryStation } from './components/dashboard/AdvancedTelemetryStation';
import { 
  ShieldCheck, 
  Cpu, 
  Flame, 
  Award, 
  Radio, 
  Volume2, 
  Globe, 
  Info, 
  Sparkles,
  Zap,
  RotateCcw,
  ThermometerSun,
  Droplets,
  Armchair,
  Activity,
  Layers,
  LayoutGrid
} from 'lucide-react';
import type { Language } from './types/wearable';

const DashboardContent: React.FC = () => {
  const { 
    settings, 
    setLanguage, 
    toggleLanguage, 
    triggerVoiceAlert, 
    applyDemoScenario,
    sensorData,
    aiRisk
  } = useBand();

  const [isTechModalOpen, setIsTechModalOpen] = useState<boolean>(false);
  const [activeViewTab, setActiveViewTab] = useState<'wearable' | 'telemetry' | 'split'>('split');
  const lang = settings.language;

  return (
    <div className="min-h-screen bg-[#07080b] text-slate-100 flex flex-col justify-between selection:bg-orange-500/30">
      
      {/* ================= TOP BRANDING & QUICK TELEMETRY BAR ================= */}
      <header className="w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Product Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 shrink-0">
              <Flame className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg tracking-tight text-white">
                  AURA-BAND S3
                </span>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[9.5px] font-mono font-bold border border-orange-500/30">
                  EDGE AI
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9.5px] font-mono border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  OFFLINE-FIRST
                </span>
              </div>
              <p className="text-[10.5px] text-slate-400 font-medium hidden md:block">
                Heat &amp; Health Safety Wearable — On-Device TinyML for Agricultural &amp; Industrial Field Workers
              </p>
            </div>
          </div>

          {/* Real-time Environment & Hydration Quick Glancable Strip */}
          <div className="hidden xl:flex items-center gap-3 px-3 py-1 rounded-2xl bg-slate-900/80 border border-white/5 text-xs">
            {/* Ambient Temp */}
            <div className="flex items-center gap-1.5" title="Ambient Environment Temperature">
              <ThermometerSun className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Ambient:</span>
              <strong className="text-white font-telemetry">{sensorData.ambientTemp}°C</strong>
              <span className="text-[10px] text-slate-500 font-mono">({sensorData.humidity}% RH)</span>
            </div>

            <span className="text-slate-700">|</span>

            {/* Hydration target */}
            <div className="flex items-center gap-1.5" title="Real-time Hydration Deficit">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">Hydration:</span>
              <strong className="text-cyan-300 font-telemetry">{sensorData.waterIntakeTotalMl} mL</strong>
              <span className="text-[10px] text-orange-400 font-mono font-bold">Drink: {sensorData.nextDrinkMinutes}m</span>
            </div>

            <span className="text-slate-700">|</span>

            {/* Rest Break */}
            <div className="flex items-center gap-1.5" title="Work-Rest Prescribed Ratio">
              <Armchair className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Rest Due:</span>
              <strong className="text-rose-400 font-telemetry">{sensorData.restBreakDueMinutes}m</strong>
            </div>
          </div>

          {/* Action Buttons & Trilingual Language Switcher */}
          <div className="flex items-center gap-2">
            
            {/* 3-Language Selector: English / தமிழ் / हिन्दी */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-700 gap-0.5">
              {(['en', 'ta', 'hi'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    lang === l
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l === 'en' ? 'EN' : l === 'ta' ? 'தமிழ்' : 'हिन्दी'}
                </button>
              ))}
            </div>

            {/* Hardware Architecture Spec Modal */}
            <button
              onClick={() => setIsTechModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold cursor-pointer active:scale-95 transition-all"
            >
              <Cpu className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">ESP32-S3 Specs</span>
              <span className="sm:hidden">Specs</span>
            </button>

            {/* Reset Scenario Button */}
            <button
              onClick={() => applyDemoScenario('NORMAL')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-all"
              title="Reset to Normal Baseline"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* ================= VIEW SELECTOR TABS ================= */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-white/5 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveViewTab('split')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeViewTab === 'split' 
                ? 'bg-orange-500 text-black font-black shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Unified Command Console</span>
          </button>
          <button
            onClick={() => setActiveViewTab('wearable')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeViewTab === 'wearable' 
                ? 'bg-orange-500 text-black font-black shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Virtual Wearable Hero</span>
          </button>
          <button
            onClick={() => setActiveViewTab('telemetry')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeViewTab === 'telemetry' 
                ? 'bg-orange-500 text-black font-black shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Live Oscilloscope &amp; Fleet</span>
          </button>
        </div>

        {/* Live Status Badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>RISK:</span>
          <span className={`font-black uppercase px-2 py-0.5 rounded ${
            aiRisk.riskLevel === 'NORMAL' ? 'bg-emerald-500/20 text-emerald-300' :
            aiRisk.riskLevel === 'YELLOW' ? 'bg-yellow-500/20 text-yellow-300' :
            aiRisk.riskLevel === 'ORANGE' ? 'bg-orange-500/25 text-orange-300' :
            'bg-rose-500/25 text-rose-300'
          }`}>
            {aiRisk.riskLevel}
          </span>
        </div>
      </div>

      {/* ================= MAIN WORKSPACE ================= */}
      <main className="max-w-7xl mx-auto w-full px-4 py-3 flex-1 flex flex-col justify-center gap-5">
        
        {/* VIEW 1 & 3: WEARABLE & SPLIT VIEW */}
        {(activeViewTab === 'split' || activeViewTab === 'wearable') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* LEFT COLUMN: 16-Step Hackathon Walkthrough Stepper */}
            <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-4">
              <HackathonStepper />

              {/* Safety Guidance Card */}
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex flex-col gap-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Early-Warning Guardrails</span>
                </div>
                <div className="flex flex-col gap-1 text-[11px] text-slate-400 leading-snug">
                  <div>• <strong className="text-slate-200">Hydration Alert:</strong> Proactive intake recommendations based on heat and sweat rate.</div>
                  <div>• <strong className="text-slate-200">Rest Advisor:</strong> Prescribed Work/Rest cycles matching OSHA/ISO 7933 PHS.</div>
                  <div>• <strong className="text-slate-200">Trilingual Audio:</strong> Natural speech alerts in English, தமிழ், and हिन्दी.</div>
                  <div>• <strong className="text-slate-200">Zero False-Safe:</strong> Drops to "NO DATA" if band contact is lost.</div>
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: Hero Virtual Smart-Band Device */}
            <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col items-center justify-center">
              <BandFrame />
            </div>

            {/* RIGHT COLUMN: Prototype Control Deck */}
            <div className="lg:col-span-4 order-3 flex flex-col gap-4">
              <DemoController />
            </div>

          </div>
        )}

        {/* VIEW 2 & 3: ADVANCED TELEMETRY & COMMANDER STATION */}
        {(activeViewTab === 'split' || activeViewTab === 'telemetry') && (
          <div className="w-full">
            <AdvancedTelemetryStation />
          </div>
        )}

      </main>

      {/* ================= COMPLIANCE & TECHNICAL FOOTER ================= */}
      <footer className="w-full border-t border-white/5 bg-slate-950/80 px-4 py-3 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-[11px]">
            <strong className="text-slate-300">Offline-First Heat &amp; Health Safety Wearable:</strong> Designed for agricultural workers, construction crews, and elderly individuals under high heat strain.
          </div>
          <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
            <span>ESP32-S3</span>
            <span>•</span>
            <span>MAX30102 PPG</span>
            <span>•</span>
            <span>SHT4x</span>
            <span>•</span>
            <span>LSM6DSOX IMU</span>
            <span>•</span>
            <span className="text-emerald-400">ISO 7933 PHS</span>
          </div>
        </div>
      </footer>

      {/* Technical Specifications Architecture Modal */}
      <TechSpecModal isOpen={isTechModalOpen} onClose={() => setIsTechModalOpen(false)} />

    </div>
  );
};

export default function App() {
  return (
    <BandProvider>
      <DashboardContent />
    </BandProvider>
  );
}
