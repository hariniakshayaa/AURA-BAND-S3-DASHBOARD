import React, { useState, useEffect } from 'react';
import { useBand, HACKATHON_STEPS } from '../../context/BandContext';
import { 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const HackathonStepper: React.FC = () => {
  const { 
    currentStepIndex, 
    goToStep, 
    nextStep, 
    prevStep, 
    settings,
    triggerVoiceAlert 
  } = useBand();

  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const currentStep = HACKATHON_STEPS[currentStepIndex];

  // Auto-play timer for presentation mode
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isAutoPlaying) {
      timer = setInterval(() => {
        if (currentStepIndex < HACKATHON_STEPS.length - 1) {
          nextStep();
        } else {
          setIsAutoPlaying(false);
        }
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentStepIndex]);

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-3">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight uppercase flex items-center gap-1.5">
              <span>Hackathon Demo Guide</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono font-semibold">
                16-STEP FLOW
              </span>
            </h3>
            <span className="text-[10px] text-slate-400">
              Smart India Hackathon &amp; Qualcomm Technical Demo
            </span>
          </div>
        </div>

        {/* Step Counter */}
        <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
          Step {currentStep.id} / 16
        </span>
      </div>

      {/* Current Step Card */}
      <div className="p-3 rounded-2xl bg-slate-950 border border-white/5 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-xs font-black text-white tracking-tight">
              {currentStep.title}
            </div>
            <div className="text-[10px] text-orange-300 font-semibold mt-0.5">
              {currentStep.subtitle}
            </div>
          </div>
          
          <button
            onClick={() => {
              if (currentStep.voiceMessageEn) {
                triggerVoiceAlert(currentStep.voiceMessageEn, currentStep.voiceMessageTa);
              }
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition-colors shrink-0"
            title="Play Step Voice Alert"
          >
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Step Explanation */}
        <p className="text-[11px] text-slate-300 leading-snug pt-1 border-t border-slate-900">
          {currentStep.description}
        </p>

        {/* Target screen badge */}
        <div className="flex items-center gap-2 pt-1 text-[9px] font-mono text-slate-400">
          <span>Active Watch Screen:</span>
          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            {currentStep.screenToOpen}
          </span>
        </div>
      </div>

      {/* Step Navigation Bar */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center gap-1 cursor-pointer transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        {/* Auto Play toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            isAutoPlaying 
              ? 'bg-amber-500 text-black shadow-md animate-pulse' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isAutoPlaying ? 'Pause Walkthrough' : 'Auto Play'}</span>
        </button>

        <button
          onClick={nextStep}
          disabled={currentStepIndex === HACKATHON_STEPS.length - 1}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-black text-black flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-md shadow-orange-500/20"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

      {/* Mini Step Pills Grid (Quick jump to any step) */}
      <div className="grid grid-cols-8 gap-1 pt-1 border-t border-slate-800">
        {HACKATHON_STEPS.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => goToStep(idx)}
            className={`py-1 rounded text-[9.5px] font-mono font-bold transition-all cursor-pointer ${
              currentStepIndex === idx
                ? 'bg-orange-500 text-black shadow font-black scale-105'
                : idx < currentStepIndex
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-950 text-slate-500 hover:bg-slate-800 hover:text-slate-300'
            }`}
            title={step.title}
          >
            {step.id}
          </button>
        ))}
      </div>

    </div>
  );
};
