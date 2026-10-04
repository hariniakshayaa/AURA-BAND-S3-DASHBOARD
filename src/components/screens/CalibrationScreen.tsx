import React from 'react';
import { Armchair, Footprints, RotateCcw, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const CalibrationScreen: React.FC = () => {
  const { 
    calibrationState, 
    nextCalibrationStep, 
    resetCalibration, 
    settings, 
    setScreen 
  } = useBand();

  const isTamil = settings.language === 'ta';

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={isTamil ? 'அடிப்படை அளவு' : 'CALIBRATE'} showClock={false} />

      {/* Screen Title */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <span className="text-[11.5px] font-black uppercase tracking-wider text-slate-200">
          {isTamil ? 'தனிநபர் அளவுத்திருத்தம்' : 'PERSONAL CALIBRATION'}
        </span>
        <span className="text-[8.5px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
          8–10 MIN
        </span>
      </div>

      {/* Step Progress Dots Indicator */}
      <div className="px-4 py-1 flex items-center justify-between">
        {/* Step 1: SIT */}
        <div className="flex flex-col items-center gap-0.5">
          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
            calibrationState.stage === 'SIT' 
              ? 'bg-blue-500 text-white ring-2 ring-blue-400/50' 
              : 'bg-emerald-500 text-black'
          }`}>

            1
          </div>
          <span className="text-[7.5px] uppercase font-bold text-slate-400">SIT</span>
        </div>

        <div className={`h-[2px] flex-1 mx-1 ${calibrationState.stage !== 'SIT' ? 'bg-emerald-500' : 'bg-slate-800'}`} />

        {/* Step 2: WALK */}
        <div className="flex flex-col items-center gap-0.5">
          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
            calibrationState.stage === 'WALK' 
              ? 'bg-blue-500 text-white ring-2 ring-blue-400/50' 
              : (calibrationState.stage === 'RECOVER' || calibrationState.stage === 'COMPLETE')
              ? 'bg-emerald-500 text-black' 
              : 'bg-slate-800 text-slate-500'
          }`}>
            2
          </div>
          <span className="text-[7.5px] uppercase font-bold text-slate-400">WALK</span>
        </div>

        <div className={`h-[2px] flex-1 mx-1 ${calibrationState.stage === 'RECOVER' || calibrationState.stage === 'COMPLETE' ? 'bg-emerald-500' : 'bg-slate-800'}`} />

        {/* Step 3: RECOVER */}
        <div className="flex flex-col items-center gap-0.5">
          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
            calibrationState.stage === 'RECOVER' 
              ? 'bg-blue-500 text-white ring-2 ring-blue-400/50' 
              : calibrationState.stage === 'COMPLETE'
              ? 'bg-emerald-500 text-black' 
              : 'bg-slate-800 text-slate-500'
          }`}>
            3
          </div>
          <span className="text-[7.5px] uppercase font-bold text-slate-400">RECOVER</span>
        </div>
      </div>

      {/* Main Guided Content */}
      <div className="flex-1 flex flex-col justify-around px-3 py-1 items-center text-center">
        
        {calibrationState.stage === 'COMPLETE' ? (
          /* CALIBRATION COMPLETE SUMMARY */
          <div className="w-full flex flex-col gap-1.5 items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>

            <div>
              <div className="text-[12px] font-black text-emerald-400 uppercase">
                {isTamil ? '✓ அளவுத்திருத்தம் முடிந்தது' : '✓ CALIBRATION COMPLETE'}
              </div>
              <div className="text-[9px] text-slate-300">
                {isTamil ? 'உங்கள் உடல் அடிப்படை அளவு தயாராக உள்ளது' : 'Your personal baseline is ready'}
              </div>
            </div>

            {/* Baseline Parameters (No confusing ML jargon, clean physiological baseline terms) */}
            <div className="w-full p-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col gap-1 text-[9px] text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Resting HR Range:</span>
                <span className="font-telemetry font-bold text-white">{calibrationState.restingHrRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">HR Rise Response:</span>
                <span className="font-telemetry font-bold text-white">{calibrationState.riseResponse}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Recovery Speed:</span>
                <span className="font-telemetry font-bold text-emerald-400">{calibrationState.recoverySpeed}</span>
              </div>
            </div>

            <button
              onClick={() => setScreen('HOME')}
              className="w-full py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-black font-bold text-xs cursor-pointer"
            >
              {isTamil ? 'முகப்புக்குச் செல்' : 'Done & Return Home'}
            </button>
          </div>
        ) : (
          /* ACTIVE CALIBRATION STEP */
          <>
            {/* Step Icon */}
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/40 flex items-center justify-center text-blue-400">
              {calibrationState.stage === 'SIT' && <Armchair className="w-6 h-6" />}
              {calibrationState.stage === 'WALK' && <Footprints className="w-6 h-6" />}
              {calibrationState.stage === 'RECOVER' && <RotateCcw className="w-6 h-6" />}
            </div>

            {/* Instruction Text */}
            <div>
              <div className="text-base font-black text-white uppercase tracking-tight">
                {calibrationState.stage === 'SIT' && (isTamil ? 'அமைதியாக அமரவும்' : 'SIT COMFORTABLY')}
                {calibrationState.stage === 'WALK' && (isTamil ? 'சாதாரணமாக நடக்கவும்' : 'WALK NORMALLY')}
                {calibrationState.stage === 'RECOVER' && (isTamil ? 'ஓய்வு எடுக்கவும்' : 'REST & RECOVER')}
              </div>
              <div className="text-[10px] text-slate-300 mt-0.5 leading-snug">
                {calibrationState.stage === 'SIT' && (isTamil ? 'கையை அசைக்காமல் 2 நிமிடம் ஓய்வெடுக்கவும்.' : 'Keep your arm still for 2 minutes.')}
                {calibrationState.stage === 'WALK' && (isTamil ? '5 நிமிடங்களுக்கு இயல்பாக நடக்கவும்.' : 'Walk normally for 5 minutes.')}
                {calibrationState.stage === 'RECOVER' && (isTamil ? '1-2 நிமிடங்களுக்கு அமர்ந்து ஓய்வெடுக்கவும்.' : 'Rest quietly for 1–2 minutes.')}
              </div>
            </div>

            {/* Next / Advance Step Button */}
            <button
              onClick={nextCalibrationStep}
              className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <span>{isTamil ? 'அடுத்த நிலை' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}

      </div>

      <ScreenFooter
        leftScreen={{ name: isTamil ? 'அவசரம்' : 'SOS', target: 'SOS' }}
        rightScreen={{ name: isTamil ? 'பேட்டரி' : 'BATTERY', target: 'BATTERY_DEVICE' }}
      />
    </div>
  );
};
