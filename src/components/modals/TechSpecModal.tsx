import React from 'react';
import { X, Cpu, Radio, Shield, Battery, HardHat, FileText, CheckCircle2 } from 'lucide-react';

interface TechSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechSpecModal: React.FC<TechSpecModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-tight">
                AURA-BAND S3 Architecture Specifications
              </h2>
              <span className="text-xs text-slate-400">
                Offline-First Edge AI Wearable Reference Design
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 flex flex-col gap-4 text-xs text-slate-300">
          
          {/* Section 1: Processing & TinyML Engine */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between font-bold text-orange-400">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Cpu className="w-4 h-4" /> 1. Edge Compute &amp; TinyML Pipeline
              </span>
              <span className="font-mono text-[10px] text-slate-400">ESP32-S3 SOC</span>
            </div>
            <p className="leading-relaxed">
              Powered by an <strong>Espressif ESP32-S3</strong> dual-core Xtensa® 32-bit LX7 processor with dedicated vector instructions for neural network acceleration. The heat-strain classifier is a quantized <strong>INT8 TensorFlow Lite for Microcontrollers (TFLM)</strong> model running entirely on-chip in ~12ms inference latency.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
              <div className="p-2 rounded bg-slate-900 border border-white/5">
                <div className="text-slate-400">SRAM Footprint</div>
                <div className="text-white font-bold">&lt; 16 KB</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-white/5">
                <div className="text-slate-400">Flash Model Size</div>
                <div className="text-white font-bold">42 KB INT8</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-white/5">
                <div className="text-slate-400">Sampling Rate</div>
                <div className="text-white font-bold">50 Hz PPG / IMU</div>
              </div>
            </div>
          </div>

          {/* Section 2: Sensor Array */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/5 flex flex-col gap-2">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Radio className="w-4 h-4" /> 2. Industrial Sensor Subsystems
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-slate-900 border border-white/5">
                <strong className="text-white block mb-0.5">MAX30102 PPG Optical Pulse</strong>
                <span className="text-slate-400">Continuous micro-vascular blood flow, heart rate variability, and signal quality index (SQI).</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-white/5">
                <strong className="text-white block mb-0.5">Sensirion SHT4x Ambient</strong>
                <span className="text-slate-400">±0.2°C temp and ±1.8% RH for real-time heat index and psychrometric wet-bulb calculation.</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-white/5">
                <strong className="text-white block mb-0.5">ST LSM6DSOX 6-Axis IMU</strong>
                <span className="text-slate-400">Hardware finite state machine (FSM) detecting sudden impact shockwaves and worker immobility.</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-white/5">
                <strong className="text-white block mb-0.5">Medical-Grade Skin Thermistor</strong>
                <span className="text-slate-400">Direct wrist skin contact thermometry tracking thermal accumulation and micro-delta trends.</span>
              </div>
            </div>
          </div>

          {/* Section 3: Offline-First Reliability & ISO Standards */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/5 flex flex-col gap-2">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Shield className="w-4 h-4" /> 3. Offline Safety &amp; Non-Medical Guardrails
            </div>
            <ul className="flex flex-col gap-1.5 list-disc list-inside text-slate-300">
              <li>
                <strong>100% Offline Autonomy:</strong> Never depends on remote cloud servers to evaluate heat strain or trigger safety alarms.
              </li>
              <li>
                <strong>Standard-Compliant Safety:</strong> Safety thresholds are aligned with ISO 7933 (Predicted Heat Strain) and OSHA heat safety recommendations.
              </li>
              <li>
                <strong>Early Warning, Not Diagnosis:</strong> Clear non-medical language ensures field compliance without deceptive medical diagnostic claims.
              </li>
              <li>
                <strong>Sensor Quality Integrity:</strong> If band is loose or detached, the device explicitly flags "NO DATA" rather than misleading the wearer with a false "SAFE".
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Smart India Hackathon / Qualcomm Reference Prototype</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs cursor-pointer active:scale-95"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
};
