// Web Audio API & Speech Synthesis for Wearable Sound/Vibration Simulation

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a subtle haptic tactile buzz pulse
 */
export function playHapticBuzz(intensity: 'light' | 'medium' | 'heavy' = 'medium') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const freq = intensity === 'light' ? 140 : intensity === 'medium' ? 120 : 90;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const now = ctx.currentTime;
    const dur = intensity === 'light' ? 0.08 : intensity === 'medium' ? 0.14 : 0.22;
    const vol = intensity === 'light' ? 0.15 : intensity === 'medium' ? 0.25 : 0.4;

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + dur);
  } catch (err) {
    console.debug('Haptic audio error:', err);
  }
}

/**
 * Play pleasant water logging chime
 */
export function playWaterChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
    osc2.frequency.setValueAtTime(659.25, now); // E5
    osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.18); // C6

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  } catch (err) {
    console.debug('Water chime error:', err);
  }
}

/**
 * Play safety warning beep alarm pattern
 */
export function playWarningBeep(isEmergency: boolean = false) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const beeps = isEmergency ? 4 : 2;
    for (let i = 0; i < beeps; i++) {
      const startTime = ctx.currentTime + i * 0.18;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isEmergency ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(isEmergency ? 880 : 660, startTime);
      if (isEmergency) {
        osc.frequency.exponentialRampToValueAtTime(1100, startTime + 0.12);
      }

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    }
  } catch (err) {
    console.debug('Warning beep error:', err);
  }
}

/**
 * Text-to-Speech announcement in English, Tamil or Hindi
 */
export function speakVoiceAlert(text: string, lang: 'en' | 'ta' | 'hi' = 'en') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel(); // Stop prior audio
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 0.95;

    const voices = window.speechSynthesis.getVoices();

    if (lang === 'ta') {
      utterance.lang = 'ta-IN';
      const tamilVoice = voices.find(v => v.lang.includes('ta') || v.name.toLowerCase().includes('tamil'));
      if (tamilVoice) utterance.voice = tamilVoice;
    } else if (lang === 'hi') {
      utterance.lang = 'hi-IN';
      const hindiVoice = voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'));
      if (hindiVoice) utterance.voice = hindiVoice;
    } else {
      utterance.lang = 'en-US';
      const engVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Siri')));
      if (engVoice) utterance.voice = engVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.debug('Speech error:', err);
  }
}
