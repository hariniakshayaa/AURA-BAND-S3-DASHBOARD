import React from 'react';
import { AlertCircle, PhoneCall, MessageSquare, MapPin, WifiOff, Radio, X, Volume2 } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const SOSScreen: React.FC = () => {
  const { 
    sosState, 
    triggerSOS, 
    cancelSOS, 
    sensorData, 
    settings, 
    setScreen, 
    triggerHapticPulse 
  } = useBand();

  const isTamil = settings.language === 'ta';

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-rose-950 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={isTamil ? 'அவசர உதவி' : 'EMERGENCY'} showClock={false} />

      {/* Screen Title */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <span className="text-[12px] font-black uppercase tracking-wider text-rose-400">
          {isTamil ? 'அவசர உதவி (SOS)' : 'SAFETY SOS'}
        </span>
        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">
          DIRECT ALARM
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-around px-3 py-1 items-center text-center">
        
        {sosState === 'ACTIVE' ? (
          /* SOS ACTIVE STATE */
          <div className="w-full flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-rose-600/30 border-2 border-rose-500 flex items-center justify-center animate-pulse">
              <AlertCircle className="w-8 h-8 text-rose-400 animate-spin" />
            </div>

            <div>
              <div className="text-base font-black text-rose-400 uppercase tracking-tight">
                {isTamil ? 'அவசர உதவி செயலில் உள்ளது' : 'SOS ACTIVE'}
              </div>
              <div className="text-[10px] text-slate-300 mt-0.5">
                {isTamil ? 'அவசர தகவல் அனுப்பப்படுகிறது...' : 'Transmitting emergency distress beacon...'}
              </div>
            </div>

            {/* Offline vs Online Handling (Mandatory requirement: never claim SMS works without cellular!) */}
            {!sensorData.cellularAvailable ? (
              <div className="w-full p-2 rounded-xl bg-amber-950/60 border border-amber-500/50 flex flex-col gap-1 text-left text-[9px]">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>{isTamil ? '⚠ செல்லுலார் சிக்னல் இல்லை' : '⚠ CELLULAR UNAVAILABLE'}</span>
                </div>
                <div className="text-slate-300">
                  {isTamil 
                    ? 'உள்ளூர் அவசர எச்சரிக்கை ஒலி & BLE பீக்கன் இயக்கப்பட்டுள்ளது.' 
                    : 'Local emergency buzzer & BLE nearby beacon active.'}
                </div>
              </div>
            ) : (
              <div className="w-full p-2 rounded-xl bg-slate-900/90 border border-rose-500/40 flex flex-col gap-1.5 text-left text-[9.5px]">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>✓ Caregiver SMS: {settings.emergencyContact.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>✓ GPS: 13.0827° N, 80.2707° E</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>✓ Auto-Dial: {settings.emergencyContact.phone}</span>
                </div>
              </div>
            )}

            {/* Cancel SOS Button */}
            <button
              onClick={cancelSOS}
              className="mt-1 py-1.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 font-bold text-[10px] flex items-center gap-1 border border-white/10 cursor-pointer"
            >
              <X className="w-3 h-3 text-slate-400" />
              <span>{isTamil ? 'ரத்து செய்' : 'Cancel SOS Alert'}</span>
            </button>
          </div>
        ) : (
          /* IDLE / READY STATE (Huge SOS Button) */
          <>
            <div className="text-[10px] text-slate-300 max-w-[200px] leading-tight">
              {isTamil 
                ? 'அவசர உதவிக்கு கீழே உள்ள பொத்தானை அழுத்தவும்' 
                : 'Press and hold button below to send emergency alert'}
            </div>

            {/* Giant Circular Touch Target */}
            <button
              onClick={triggerSOS}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 active:scale-90 flex flex-col items-center justify-center text-white border-4 border-rose-400/50 shadow-xl shadow-rose-600/40 cursor-pointer transition-transform group"
            >
              <span className="text-2xl font-black font-display tracking-wider">
                SOS
              </span>
              <span className="text-[8px] font-bold text-rose-200 uppercase mt-0.5 tracking-tighter">
                {isTamil ? 'உதவி' : 'HOLD 1S'}
              </span>
            </button>

            {/* Configured Contact Info */}
            <div className="w-full px-2 py-1.5 rounded-lg bg-slate-900/80 border border-white/5 flex items-center justify-between text-[9px]">
              <div className="text-left">
                <div className="text-slate-400 uppercase text-[8px] font-semibold">
                  {isTamil ? 'அவசர தொடர்பு' : 'PRIMARY CONTACT'}
                </div>
                <div className="text-white font-bold truncate max-w-[120px]">
                  {settings.emergencyContact.name}
                </div>
              </div>
              <span className="font-telemetry text-slate-400 text-[8.5px]">
                {settings.emergencyContact.phone}
              </span>
            </div>
          </>
        )}

      </div>

      <ScreenFooter
        leftScreen={{ name: isTamil ? 'முகப்பு' : 'HOME', target: 'HOME' }}
        rightScreen={{ name: isTamil ? 'அமைப்புகள்' : 'SETUP', target: 'CALIBRATION' }}
      />
    </div>
  );
};
