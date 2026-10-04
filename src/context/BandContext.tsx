import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { 
  RiskLevel, 
  ActivityType, 
  SignalQualityState, 
  ScreenType, 
  Language, 
  SensorData, 
  AIRiskTelemetry, 
  BandSettings,
  CalibrationState,
  HackathonDemoStep
} from '../types/wearable';
import { playHapticBuzz, playWarningBeep, speakVoiceAlert, playWaterChime } from '../utils/audio';

export const HACKATHON_STEPS: HackathonDemoStep[] = [
  {
    id: 1,
    title: '1. Normal Baseline State',
    subtitle: 'Healthy worker / normal baseline in morning',
    screenToOpen: 'HOME',
    recommendedRisk: 'NORMAL',
    voiceMessageEn: 'Baseline physiological status normal.',
    voiceMessageTa: 'உடல் நிலை இயல்பாக உள்ளது.',
    voiceMessageHi: 'शारीरिक स्थिति सामान्य और सुरक्षित है।',
    description: 'Band displays Green "NORMAL / YOU ARE OK", HR at normal resting 72 BPM, Ambient 28°C, Local AI offline mode active.'
  },
  {
    id: 2,
    title: '2. Environmental Heat Index Check',
    subtitle: 'Worker enters hot agricultural/industrial field',
    screenToOpen: 'ENVIRONMENT',
    recommendedRisk: 'NORMAL',
    voiceMessageEn: 'High ambient temperature 34 degrees with high humidity.',
    voiceMessageTa: 'சுற்றுச்சூழல் வெப்பநிலை 34 டிகிரி, அதிக ஈரப்பதம்.',
    voiceMessageHi: 'परिवेश का तापमान 34 डिग्री, उच्च आर्द्रता दर्ज की गई।',
    description: 'Displaying ambient temp 34°C, humidity 72%, High heat load. Shows simple plain explanation.'
  },
  {
    id: 3,
    title: '3. Increased Workload & Heat Strain Rising',
    subtitle: 'Sustained shoveling / direct solar radiation',
    screenToOpen: 'HOME',
    recommendedRisk: 'YELLOW',
    voiceMessageEn: 'Caution: elevated heat strain developing.',
    voiceMessageTa: 'கவனம்: உடல் வெப்ப அழுத்தம் உயர்கிறது.',
    voiceMessageHi: 'सावधानी: शारीरिक ताप तनाव बढ़ रहा है।',
    description: 'Risk transitions to Yellow "TAKE CARE". HR rises to 94 BPM, skin temperature starts rising +0.3°C.'
  },
  {
    id: 4,
    title: '4. Dynamic Hydration Alert',
    subtitle: 'High sweat rate detected (750 mL/hr)',
    screenToOpen: 'HYDRATION',
    recommendedRisk: 'YELLOW',
    voiceMessageEn: 'Hydration needed. Drink 250 millilitres of water to balance sweat loss.',
    voiceMessageTa: 'நீர் தேவை. வியர்வை இழப்பை ஈடுசெய்ய 250 மிலி தண்ணீர் குடிக்கவும்.',
    voiceMessageHi: 'जलयोजन आवश्यक। पसीने की कमी पूरी करने हेतु 250 मिलीलीटर पानी पिएं।',
    description: 'Calculates sweat loss from temperature and activity, prompts user to drink 250 mL every 15 min.'
  },
  {
    id: 5,
    title: '5. Work-Rest Cycle Advisor',
    subtitle: 'Prescribing mandatory rest breaks (ISO 7933)',
    screenToOpen: 'REST_ADVISOR',
    recommendedRisk: 'ORANGE',
    voiceMessageEn: 'Rest cycle alert: 30 minutes work, 30 minutes rest prescribed.',
    voiceMessageTa: 'ஓய்வு சுழற்சி: 30 நிமிடம் வேலை, 30 நிமிடம் ஓய்வு பரிந்துரைக்கப்படுகிறது.',
    voiceMessageHi: 'विश्राम सलाह: 30 मिनट कार्य के बाद 30 मिनट विश्राम आवश्यक।',
    description: 'Recommends active convective cooling in shade and work-rest ratios according to safety standards.'
  },
  {
    id: 6,
    title: '6. Orange Alert: Rest Now Needed',
    subtitle: 'Threshold crossed — safety intervention triggered',
    screenToOpen: 'HEAT_WARNING',
    recommendedRisk: 'ORANGE',
    voiceMessageEn: 'Rest now. Heat strain is rising. Move to shade and drink water.',
    voiceMessageTa: 'உடல் வெப்ப அழுத்தம் அதிகரிக்கிறது. நிழலில் ஓய்வு எடுக்கவும். தண்ணீர் குடிக்கவும்.',
    voiceMessageHi: 'तुरंत आराम करें। ताप तनाव बढ़ रहा है। छांव में जाएं और पानी पिएं।',
    description: 'Full-screen high-contrast Orange alert. Triggers dual vibration buzz & localized voice alert.'
  },
  {
    id: 7,
    title: '7. Explainable AI Telemetry',
    subtitle: 'Transparent on-device TinyML reasoning',
    screenToOpen: 'AI_RISK',
    recommendedRisk: 'ORANGE',
    voiceMessageEn: 'Explainable AI: Heart rate elevated above baseline under 72 percent humidity.',
    voiceMessageTa: 'AI விளக்கம்: அதிக இதயத் துடிப்பு மற்றும் அதிக ஈரப்பதம்.',
    voiceMessageHi: 'AI विश्लेषण: सामान्य से अधिक हृदय गति और 72 प्रतिशत आर्द्रता।',
    description: 'Shows why: 87% confidence, risk rising in 15-30 min window, top 3 sensor factors.'
  },
  {
    id: 8,
    title: '8. Trilingual Voice Alerts (Hindi/Tamil/English)',
    subtitle: 'Vernacular interface for diverse workforce across India',
    screenToOpen: 'HEAT_WARNING',
    recommendedRisk: 'ORANGE',
    voiceMessageEn: 'Rest now. Move to shade and drink water.',
    voiceMessageTa: 'உடல் வெப்ப அழுத்தம் அதிகரிக்கிறது. நிழலில் ஓய்வு எடுக்கவும்.',
    voiceMessageHi: 'तुरंत आराम करें। छांव में जाएं और पानी पिएं।',
    description: 'Seamlessly switches languages between English, தமிழ், and हिन्दी with natural voice synthesis.'
  },
  {
    id: 9,
    title: '9. Motion Noise / Signal Quality Check',
    subtitle: 'Handling noisy industrial vibrations or loose band',
    screenToOpen: 'SIGNAL_QUALITY',
    recommendedRisk: 'YELLOW',
    voiceMessageEn: 'Reading uncertain. Too much movement. Please tighten band.',
    voiceMessageTa: 'அளவீடு நிச்சயமற்றது. அதிக அசைவு. பேண்டை சரிசெய்யவும்.',
    voiceMessageHi: 'माप अनिश्चित है। अत्यधिक हलचल। कृपया बैंड कसें।',
    description: 'Demonstrating Sensor Integrity: High movement noise flags "READING UNCERTAIN — Tighten the band and rest for 1 minute".'
  },
  {
    id: 10,
    title: '10. Sensor Detached / Contact Lost',
    subtitle: 'Band taken off or shifted off skin',
    screenToOpen: 'SIGNAL_QUALITY',
    recommendedRisk: 'YELLOW',
    description: 'Never displays "SAFE" when sensors cannot verify contact! Clearly flags "SENSOR CONTACT LOST — Data: NO DATA".'
  },
  {
    id: 11,
    title: '11. Rest Period in Shade',
    subtitle: 'Worker heeds alert, rests and hydrates',
    screenToOpen: 'RECOVERY',
    recommendedRisk: 'YELLOW',
    description: 'Recovery monitoring starts: HR drops 94 -> 76 BPM, skin temp stabilizes, activity switches to RESTING.'
  },
  {
    id: 12,
    title: '12. Safe to Resume Recommendation',
    subtitle: 'Physiological vitals return to personal baseline',
    screenToOpen: 'RECOVERY',
    recommendedRisk: 'NORMAL',
    voiceMessageEn: 'Recovery improving. Resume slowly and keep drinking water.',
    voiceMessageTa: 'உடல் நலம் சீராகிறது. மெதுவாக தொடரவும், தண்ணீர் குடிக்கவும்.',
    voiceMessageHi: 'स्वास्थ्य में सुधार। धीरे-धीरे काम शुरू करें और पानी पीते रहें।',
    description: 'Displays "✓ RECOVERY IMPROVING — Resume slowly". Not a medical clearance, a safety recommendation.'
  },
  {
    id: 13,
    title: '13. Sudden Fall Incident Detected',
    subtitle: 'IMU triggers sudden impact + immobility signature',
    screenToOpen: 'FALL_DETECTION',
    recommendedRisk: 'RED',
    voiceMessageEn: 'Fall detected. Are you okay?',
    voiceMessageTa: 'விபத்து கண்டறியப்பட்டது. நீங்கள் நலமா?',
    voiceMessageHi: 'गिरना दर्ज किया गया। क्या आप ठीक हैं?',
    description: 'High-visibility emergency 10-second countdown with ticking audio alarm and "I\'M OK" cancel button.'
  },
  {
    id: 14,
    title: '14. False-Alarm Fall Cancellation',
    subtitle: 'Worker dropped tool or stumbled but is fine',
    screenToOpen: 'FALL_DETECTION',
    recommendedRisk: 'NORMAL',
    voiceMessageEn: 'Alert cancelled. No message was sent.',
    voiceMessageTa: 'எச்சரிக்கை ரத்து செய்யப்பட்டது. தகவல் எதுவும் அனுப்பப்படவில்லை.',
    voiceMessageHi: 'अलार्म रद्द कर दिया गया। कोई संदेश नहीं भेजा गया।',
    description: 'Tapping "I\'M OK" cleanly stops countdown and displays "✓ ALERT CANCELLED — No message was sent".'
  },
  {
    id: 15,
    title: '15. Unresponsive Fall / SOS Escalation',
    subtitle: 'Worker is unconscious or unable to reach band',
    screenToOpen: 'SOS',
    recommendedRisk: 'RED',
    voiceMessageEn: 'Possible emergency. Sending emergency SOS to caregiver.',
    voiceMessageTa: 'உடனடி அவசர நிலை. அவசர உதவி அனுப்பப்படுகிறது.',
    voiceMessageHi: 'आपातकालीन स्थिति। देखभालकर्ता को आपातकालीन संदेश भेजा जा रहा है।',
    description: 'Countdown expires: Triggers automated SMS with GPS coordinates, phone dialer to primary caregiver, and siren buzzer.'
  },
  {
    id: 16,
    title: '16. On-Device Edge AI Pipeline (Judges Demo)',
    subtitle: 'ESP32-S3 TinyML architecture overview',
    screenToOpen: 'EDGE_AI',
    recommendedRisk: 'ORANGE',
    description: 'Hardware pipeline diagram: Raw Sensors -> Signal Quality -> Safety Rules Engine -> INT8 TinyML Model -> Risk Score.'
  }
];

interface BandContextType {
  // Screen & Navigation
  currentScreen: ScreenType;
  screenHistory: ScreenType[];
  setScreen: (screen: ScreenType) => void;
  goBack: () => void;
  goHome: () => void;
  screenPowered: boolean;
  setScreenPowered: (powered: boolean) => void;
  toggleScreenPower: () => void;

  // Sensor & Telemetry Data
  sensorData: SensorData;
  updateSensorData: (data: Partial<SensorData>) => void;
  aiRisk: AIRiskTelemetry;
  setRiskLevel: (level: RiskLevel) => void;

  // Settings & Localization
  settings: BandSettings;
  updateSettings: (settings: Partial<BandSettings>) => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;

  // Interactive Features & Audio
  isVibrating: boolean;
  triggerHapticPulse: (intensity?: 'light' | 'medium' | 'heavy') => void;
  triggerVoiceAlert: (textEn?: string, textTa?: string, textHi?: string) => void;
  playWaterSound: () => void;

  // Fall Detection State
  fallState: 'IDLE' | 'COUNTDOWN' | 'CANCELLED' | 'SOS_TRIGGERED';
  fallCountdown: number;
  triggerFallDetection: () => void;
  cancelFall: () => void;
  escalateFallToSOS: () => void;

  // SOS State
  sosState: 'IDLE' | 'ACTIVE' | 'CANCELLED';
  triggerSOS: () => void;
  cancelSOS: () => void;

  // Calibration State
  calibrationState: CalibrationState;
  nextCalibrationStep: () => void;
  resetCalibration: () => void;

  // Quick Demo & Hackathon Stepper
  currentStepIndex: number;
  goToStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  applyDemoScenario: (scenario: 'NORMAL' | 'YELLOW' | 'ORANGE' | 'RED' | 'UNCERTAIN' | 'SENSOR_LOST' | 'FALL' | 'RECOVERY' | 'SOS') => void;

  // Hardware Callouts Overlay
  showHardwareCallouts: boolean;
  setShowHardwareCallouts: (show: boolean) => void;
}

const BandContext = createContext<BandContextType | undefined>(undefined);

export const BandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('HOME');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['HOME']);
  const [screenPowered, setScreenPowered] = useState<boolean>(true);
  const [isVibrating, setIsVibrating] = useState<boolean>(false);
  const [showHardwareCallouts, setShowHardwareCallouts] = useState<boolean>(false);

  // Settings with trilingual support ('en', 'ta', 'hi')
  const [settings, setSettings] = useState<BandSettings>({
    language: 'en',
    alertVolume: 'HIGH',
    vibrationEnabled: true,
    voiceAlertEnabled: true,
    workerMode: false,
    elderlyMode: false,
    emergencyContact: {
      name: 'Anitha (Daughter)',
      relation: 'Primary Caregiver',
      phone: '+91 98401 23456'
    }
  });

  // Sensor state with hydration & work-rest advisor metrics
  const [sensorData, setSensorData] = useState<SensorData>({
    heartRate: 82,
    baselineHeartRate: 68,
    skinTemp: 33.2,
    skinTempTrend: '+0.3°C',
    ambientTemp: 34,
    humidity: 72,
    heatIndex: 39.4,
    wetBulbGlobeTemp: 29.8,
    heatIndexText: 'HIGH',
    activity: 'WALKING',
    signalQualityPercent: 94,
    signalStatus: 'GOOD',
    sensorContact: true,
    motionNoise: 'LOW',
    batteryPercent: 78,
    batteryHoursRemaining: 18,
    isOffline: true,
    cellularAvailable: true,

    // Hydration metrics
    sweatRateMlPerHour: 750,
    recommendedWaterMl: 250,
    waterIntakeTotalMl: 1250,
    hydrationLevelPercent: 78,
    nextDrinkMinutes: 12,

    // Work-Rest metrics
    workRestRatio: '45m Work / 15m Rest',
    workSessionMinutes: 35,
    restBreakDueMinutes: 10,
    restDurationRecommended: 15
  });

  // AI Telemetry with Trilingual (EN, TA, HI) explainable reasons
  const [aiRisk, setAiRisk] = useState<AIRiskTelemetry>({
    riskLevel: 'NORMAL',
    confidence: 87,
    riskTrend: 'STABLE',
    riskWindow: '15–30 min',
    riskScore: 24,
    reasons: {
      en: [
        'Heart rate within expected individual baseline range (68-82 BPM)',
        'Ambient temperature elevated but physiological adaptation stable',
        'Signal quality optimal (PPG 94% SNR)'
      ],
      ta: [
        'இதயத் துடிப்பு இயல்பான வரம்பிற்குள் உள்ளது (68-82 BPM)',
        'சுற்றுச்சூழல் வெப்பம் இருந்தாலும் உடல் தழுவல் சீராக உள்ளது',
        'சென்சார் சிக்னல் தரம் மிகச் சிறப்பாக உள்ளது (94%)'
      ],
      hi: [
        'हृदय गति सामान्य व्यक्तिगत बेसलाइन सीमा में है (68-82 BPM)',
        'परिवेश का तापमान अधिक है किंतु शारीरिक अनुकूलन स्थिर है',
        'सेंसर सिग्नल गुणवत्ता इष्टतम है (94% SNR)'
      ]
    }
  });

  // Fall Detection State
  const [fallState, setFallState] = useState<'IDLE' | 'COUNTDOWN' | 'CANCELLED' | 'SOS_TRIGGERED'>('IDLE');
  const [fallCountdown, setFallCountdown] = useState<number>(10);
  const fallTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // SOS state
  const [sosState, setSosState] = useState<'IDLE' | 'ACTIVE' | 'CANCELLED'>('IDLE');

  // Calibration state
  const [calibrationState, setCalibrationState] = useState<CalibrationState>({
    stage: 'SIT',
    progressSeconds: 0,
    totalSeconds: 480,
    restingHrRange: '64–72 BPM',
    riseResponse: 'Normal (+1.2 BPM / MET)',
    recoverySpeed: 'Good (drops >18 BPM in 60s)'
  });

  // Hackathon step
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Navigation handlers
  const setScreen = (screen: ScreenType) => {
    setScreenHistory(prev => [...prev.slice(-10), screen]);
    setCurrentScreen(screen);
    playHapticBuzz('light');
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop(); // remove current
      const prev = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prev || 'HOME');
    } else {
      setCurrentScreen('HOME');
    }
    playHapticBuzz('light');
  };

  const goHome = () => {
    setScreenHistory(['HOME']);
    setCurrentScreen('HOME');
    playHapticBuzz('medium');
  };

  const toggleScreenPower = () => {
    setScreenPowered(prev => !prev);
    playHapticBuzz('medium');
  };

  // Haptic pulse trigger
  const triggerHapticPulse = (intensity: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (settings.vibrationEnabled) {
      setIsVibrating(true);
      playHapticBuzz(intensity);
      setTimeout(() => setIsVibrating(false), intensity === 'heavy' ? 400 : 250);
    }
  };

  // Water sound effect
  const playWaterSound = () => {
    playWaterChime();
  };

  // Trilingual Voice alert trigger
  const triggerVoiceAlert = (textEn?: string, textTa?: string, textHi?: string) => {
    if (!settings.voiceAlertEnabled) return;
    let msg = textEn || 'Caution: heat strain is rising. Move to shade and hydrate.';
    if (settings.language === 'ta') {
      msg = textTa || 'உடல் வெப்ப அழுத்தம் அதிகரிக்கிறது. நிழலில் ஓய்வு எடுக்கவும். தண்ணீர் குடிக்கவும்.';
    } else if (settings.language === 'hi') {
      msg = textHi || 'शारीरिक ताप तनाव बढ़ रहा है। कृपया छांव में जाएं और पानी पिएं।';
    }
    speakVoiceAlert(msg, settings.language);
  };

  // Update sensor data & recalculate sweat rate & work-rest cycles dynamically
  const updateSensorData = (data: Partial<SensorData>) => {
    setSensorData(prev => {
      const next = { ...prev, ...data };
      
      // Dynamic Sweat Loss Rate Calculation (mL/hr) based on Temp + Humidity + HR
      const baseSweat = 350;
      const tempFactor = Math.max(0, (next.ambientTemp - 26) * 35);
      const humFactor = Math.max(0, (next.humidity - 50) * 4);
      const hrFactor = Math.max(0, (next.heartRate - 70) * 5);
      const calculatedSweat = Math.round(baseSweat + tempFactor + humFactor + hrFactor);
      next.sweatRateMlPerHour = calculatedSweat;

      // Dynamic Work-Rest Ratio based on Ambient Temp & Risk Level
      if (next.ambientTemp >= 38 || next.heartRate > 110) {
        next.workRestRatio = '15m Work / 45m Rest';
        next.restDurationRecommended = 45;
      } else if (next.ambientTemp >= 33 || next.heartRate > 95) {
        next.workRestRatio = '30m Work / 30m Rest';
        next.restDurationRecommended = 30;
      } else {
        next.workRestRatio = '45m Work / 15m Rest';
        next.restDurationRecommended = 15;
      }

      return next;
    });
  };

  // Set explicit risk level with corresponding trilingual explainable AI reasons
  const setRiskLevel = (level: RiskLevel) => {
    if (level === 'NORMAL') {
      setAiRisk({
        riskLevel: 'NORMAL',
        confidence: 91,
        riskTrend: 'STABLE',
        riskWindow: '> 60 min',
        riskScore: 22,
        reasons: {
          en: [
            'Heart rate matches calibrated resting baseline (72 BPM)',
            'Skin temperature stable with minimal thermal gradient',
            'Cardiovascular recovery index rated Good'
          ],
          ta: [
            'இதயத் துடிப்பு அடிப்படை அளவுக்குள் உள்ளது (72 BPM)',
            'தோல் வெப்பநிலை சீராக உள்ளது',
            'உடல் நலம் மீட்பு நிலை திருப்திகரமாக உள்ளது'
          ],
          hi: [
            'हृदय गति व्यक्तिगत बेसलाइन के अनुरूप है (72 BPM)',
            'त्वचा का तापमान न्यूनतम थर्मल प्रवणता के साथ स्थिर है',
            'कार्डियोवैस्कुलर रिकवरी इंडेक्स अच्छा है'
          ]
        }
      });
    } else if (level === 'YELLOW') {
      setAiRisk({
        riskLevel: 'YELLOW',
        confidence: 84,
        riskTrend: 'RISING',
        riskWindow: '30–45 min',
        riskScore: 48,
        reasons: {
          en: [
            'Heart rate elevated above baseline (+18 BPM)',
            'Ambient heat index High (34°C, 72% RH)',
            'Skin temperature trend +0.3°C indicating reduced evaporative cooling'
          ],
          ta: [
            'இதயத் துடிப்பு உயர்ந்துள்ளது (+18 BPM)',
            'சுற்றுச்சூழல் வெப்பச் சுமை அதிகம் (34°C, 72% RH)',
            'தோல் வெப்பநிலை உயர்கிறது (+0.3°C)'
          ],
          hi: [
            'हृदय गति बेसलाइन से अधिक दर्ज (+18 BPM)',
            'परिवेश ताप सूचकांक उच्च (34°C, 72% RH)',
            'त्वचा तापमान वृद्धि +0.3°C जो पसीने के वाष्पीकरण में बाधा दर्शाती है'
          ]
        }
      });
    } else if (level === 'ORANGE') {
      setAiRisk({
        riskLevel: 'ORANGE',
        confidence: 89,
        riskTrend: 'RISING',
        riskWindow: '15–30 min',
        riskScore: 74,
        reasons: {
          en: [
            'Heart rate sustained > 96 BPM without exertion reduction',
            'High relative humidity (72%) severely restricting sweat evaporation',
            'Rising skin temperature delta (+0.6°C) exceeding safe heat index'
          ],
          ta: [
            'நீண்ட நேரம் அதிக இதயத் துடிப்பு (96 BPM)',
            'அதிக ஈரப்பதம் (72%) வியர்வை ஆவியாவதைத் தடுக்கிறது',
            'தோல் வெப்ப அழுத்தம் தொடர்ந்து உயர்கிறது (+0.6°C)'
          ],
          hi: [
            'लगातार 96 BPM से अधिक उच्च हृदय गति बिना आराम के',
            'अत्यधिक आर्द्रता (72%) पसीने के वाष्पीकरण को रोकती है',
            'त्वचा का बढ़ता ताप तनाव (+0.6°C) सुरक्षित सीमा से अधिक'
          ]
        }
      });
    } else if (level === 'RED') {
      setAiRisk({
        riskLevel: 'RED',
        confidence: 94,
        riskTrend: 'RISING',
        riskWindow: '< 10 min',
        riskScore: 92,
        reasons: {
          en: [
            'Severe uncompensable heat strain detected by Edge AI TinyML',
            'Heart rate cardiac drift exceeding +35% of baseline',
            'Motion pattern indicates potential disorientation or physical collapse'
          ],
          ta: [
            'கடுமையான வெப்ப அழுத்த அபாயம் AI மூலம் கண்டறியப்பட்டது',
            'இதயத் துடிப்பு அபாயகரமான அளவுக்கு உயர்ந்துள்ளது',
            'அசைவு சமநிலையின்மை அல்லது மயக்க நிலை கண்டறியப்பட்டது'
          ],
          hi: [
            'अत्यधिक असहनीय ताप तनाव एज एआई मॉडल द्वारा दर्ज',
            'हृदय गति का बेसलाइन से +35% अधिक विचलन',
            'गतिविधि पैटर्न में असंतुलन या बेहोशी की संभावना'
          ]
        }
      });
    }
  };

  // Fall detection lifecycle
  const triggerFallDetection = () => {
    setFallState('COUNTDOWN');
    setFallCountdown(10);
    setCurrentScreen('FALL_DETECTION');
    playWarningBeep(true);
    triggerHapticPulse('heavy');
    if (settings.voiceAlertEnabled) {
      const msg = settings.language === 'ta' 
        ? 'விபத்து கண்டறியப்பட்டது. நீங்கள் நலமா?' 
        : settings.language === 'hi'
        ? 'गिरना दर्ज किया गया। क्या आप ठीक हैं?'
        : 'Fall detected. Are you okay?';
      speakVoiceAlert(msg, settings.language);
    }
  };

  const cancelFall = () => {
    if (fallTimerRef.current) clearInterval(fallTimerRef.current);
    setFallState('CANCELLED');
    playHapticBuzz('medium');
    if (settings.voiceAlertEnabled) {
      const msg = settings.language === 'ta' 
        ? 'எச்சரிக்கை ரத்து செய்யப்பட்டது.' 
        : settings.language === 'hi'
        ? 'अलार्म रद्द कर दिया गया।'
        : 'Alert cancelled. No message was sent.';
      speakVoiceAlert(msg, settings.language);
    }
    setTimeout(() => {
      setFallState('IDLE');
      setCurrentScreen('HOME');
    }, 2400);
  };

  const escalateFallToSOS = () => {
    if (fallTimerRef.current) clearInterval(fallTimerRef.current);
    setFallState('SOS_TRIGGERED');
    setSosState('ACTIVE');
    setCurrentScreen('SOS');
    playWarningBeep(true);
  };

  // Fall countdown interval
  useEffect(() => {
    if (fallState === 'COUNTDOWN') {
      fallTimerRef.current = setInterval(() => {
        setFallCountdown(prev => {
          if (prev <= 1) {
            if (fallTimerRef.current) clearInterval(fallTimerRef.current);
            escalateFallToSOS();
            return 0;
          }
          playHapticBuzz('light');
          return prev - 1;
        });
      }, 1000);
    } else {
      if (fallTimerRef.current) clearInterval(fallTimerRef.current);
    }

    return () => {
      if (fallTimerRef.current) clearInterval(fallTimerRef.current);
    };
  }, [fallState]);

  // SOS controls
  const triggerSOS = () => {
    setSosState('ACTIVE');
    setCurrentScreen('SOS');
    playWarningBeep(true);
    triggerHapticPulse('heavy');
    if (settings.voiceAlertEnabled) {
      const msg = settings.language === 'ta' 
        ? 'அவசர உதவி அனுப்பப்படுகிறது.' 
        : settings.language === 'hi'
        ? 'आपातकालीन सहायता संदेश भेजा जा रहा है।'
        : 'Sending emergency SOS.';
      speakVoiceAlert(msg, settings.language);
    }
  };

  const cancelSOS = () => {
    setSosState('CANCELLED');
    playHapticBuzz('medium');
    setTimeout(() => {
      setSosState('IDLE');
      setCurrentScreen('HOME');
    }, 1500);
  };

  // Calibration progress
  const nextCalibrationStep = () => {
    setCalibrationState(prev => {
      if (prev.stage === 'SIT') return { ...prev, stage: 'WALK', progressSeconds: 180 };
      if (prev.stage === 'WALK') return { ...prev, stage: 'RECOVER', progressSeconds: 420 };
      return { ...prev, stage: 'COMPLETE', progressSeconds: 480 };
    });
    playHapticBuzz('medium');
  };

  const resetCalibration = () => {
    setCalibrationState({
      stage: 'SIT',
      progressSeconds: 0,
      totalSeconds: 480,
      restingHrRange: '64–72 BPM',
      riseResponse: 'Normal (+1.2 BPM / MET)',
      recoverySpeed: 'Good (drops >18 BPM in 60s)'
    });
  };

  // Settings handlers with trilingual cycling (EN -> TA -> HI -> EN)
  const updateSettings = (partial: Partial<BandSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
    playHapticBuzz('light');
  };

  const setLanguage = (lang: Language) => {
    setSettings(prev => ({ ...prev, language: lang }));
    playHapticBuzz('medium');
  };

  const toggleLanguage = () => {
    setSettings(prev => {
      const nextLang: Language = prev.language === 'en' ? 'ta' : prev.language === 'ta' ? 'hi' : 'en';
      playHapticBuzz('medium');
      return { ...prev, language: nextLang };
    });
  };

  // Apply Quick Demo Scenarios
  const applyDemoScenario = (scenario: 'NORMAL' | 'YELLOW' | 'ORANGE' | 'RED' | 'UNCERTAIN' | 'SENSOR_LOST' | 'FALL' | 'RECOVERY' | 'SOS') => {
    switch (scenario) {
      case 'NORMAL':
        setRiskLevel('NORMAL');
        updateSensorData({
          heartRate: 74,
          skinTemp: 32.8,
          skinTempTrend: 'STABLE',
          ambientTemp: 29,
          humidity: 55,
          heatIndexText: 'MODERATE',
          activity: 'WALKING',
          signalQualityPercent: 96,
          signalStatus: 'GOOD',
          sensorContact: true,
          motionNoise: 'LOW',
          sweatRateMlPerHour: 420,
          workRestRatio: '45m Work / 15m Rest',
          restBreakDueMinutes: 20
        });
        setCurrentScreen('HOME');
        break;

      case 'YELLOW':
        setRiskLevel('YELLOW');
        updateSensorData({
          heartRate: 92,
          skinTemp: 33.8,
          skinTempTrend: '+0.3°C',
          ambientTemp: 33,
          humidity: 68,
          heatIndexText: 'HIGH',
          activity: 'WORKING',
          signalQualityPercent: 91,
          signalStatus: 'GOOD',
          sensorContact: true,
          motionNoise: 'LOW',
          sweatRateMlPerHour: 680,
          workRestRatio: '30m Work / 30m Rest',
          restBreakDueMinutes: 12
        });
        setCurrentScreen('HOME');
        break;

      case 'ORANGE':
        setRiskLevel('ORANGE');
        updateSensorData({
          heartRate: 104,
          skinTemp: 34.6,
          skinTempTrend: '+0.6°C',
          ambientTemp: 36,
          humidity: 75,
          heatIndexText: 'EXTREME',
          activity: 'WORKING',
          signalQualityPercent: 90,
          signalStatus: 'GOOD',
          sensorContact: true,
          motionNoise: 'LOW',
          sweatRateMlPerHour: 920,
          workRestRatio: '15m Work / 45m Rest',
          restBreakDueMinutes: 2
        });
        setCurrentScreen('HEAT_WARNING');
        triggerHapticPulse('heavy');
        playWarningBeep(false);
        break;

      case 'RED':
        setRiskLevel('RED');
        updateSensorData({
          heartRate: 122,
          skinTemp: 35.8,
          skinTempTrend: '+1.1°C',
          ambientTemp: 39,
          humidity: 80,
          heatIndexText: 'EXTREME',
          activity: 'WORKING',
          signalQualityPercent: 88,
          signalStatus: 'GOOD',
          sensorContact: true,
          motionNoise: 'LOW',
          sweatRateMlPerHour: 1200,
          workRestRatio: 'STOP WORK / IMMEDIATE COOLING',
          restBreakDueMinutes: 0
        });
        setCurrentScreen('HEAT_WARNING');
        triggerHapticPulse('heavy');
        playWarningBeep(true);
        break;

      case 'UNCERTAIN':
        updateSensorData({
          signalQualityPercent: 42,
          signalStatus: 'UNCERTAIN',
          motionNoise: 'HIGH',
          sensorContact: true
        });
        setCurrentScreen('SIGNAL_QUALITY');
        break;

      case 'SENSOR_LOST':
        updateSensorData({
          signalQualityPercent: 0,
          signalStatus: 'SENSOR_LOST',
          sensorContact: false,
          motionNoise: 'HIGH'
        });
        setCurrentScreen('SIGNAL_QUALITY');
        break;

      case 'FALL':
        triggerFallDetection();
        break;

      case 'RECOVERY':
        setRiskLevel('NORMAL');
        updateSensorData({
          heartRate: 76,
          skinTemp: 33.1,
          skinTempTrend: 'STABLE',
          activity: 'RESTING',
          signalQualityPercent: 95,
          signalStatus: 'GOOD',
          sensorContact: true,
          sweatRateMlPerHour: 380,
          workRestRatio: '45m Work / 15m Rest'
        });
        setCurrentScreen('RECOVERY');
        break;

      case 'SOS':
        triggerSOS();
        break;
    }
  };

  // Hackathon Presentation Stepper
  const goToStep = (index: number) => {
    if (index < 0 || index >= HACKATHON_STEPS.length) return;
    setCurrentStepIndex(index);
    const step = HACKATHON_STEPS[index];
    
    setRiskLevel(step.recommendedRisk);
    setCurrentScreen(step.screenToOpen);

    if (step.id === 1) {
      updateSensorData({ heartRate: 72, skinTemp: 32.8, skinTempTrend: 'STABLE', ambientTemp: 28, humidity: 50, activity: 'RESTING', signalQualityPercent: 96, signalStatus: 'GOOD', sensorContact: true });
    } else if (step.id === 2) {
      updateSensorData({ ambientTemp: 34, humidity: 72, heatIndexText: 'HIGH', activity: 'WALKING' });
    } else if (step.id === 3) {
      updateSensorData({ heartRate: 94, skinTemp: 33.5, skinTempTrend: '+0.3°C', activity: 'WORKING' });
    } else if (step.id === 4) {
      updateSensorData({ sweatRateMlPerHour: 850, nextDrinkMinutes: 4 });
    } else if (step.id === 5) {
      updateSensorData({ workRestRatio: '30m Work / 30m Rest', restBreakDueMinutes: 5 });
    } else if (step.id === 6) {
      updateSensorData({ heartRate: 106, skinTemp: 34.4, skinTempTrend: '+0.6°C', activity: 'WORKING' });
      triggerHapticPulse('heavy');
      playWarningBeep(false);
    } else if (step.id === 8) {
      setSettings(prev => ({ ...prev, language: 'hi' }));
    } else if (step.id === 9) {
      updateSensorData({ signalQualityPercent: 44, signalStatus: 'UNCERTAIN', motionNoise: 'HIGH' });
    } else if (step.id === 10) {
      updateSensorData({ signalQualityPercent: 0, signalStatus: 'SENSOR_LOST', sensorContact: false });
    } else if (step.id === 11 || step.id === 12) {
      updateSensorData({ heartRate: 76, skinTemp: 33.0, skinTempTrend: 'STABLE', activity: 'RESTING', signalStatus: 'GOOD', sensorContact: true });
    } else if (step.id === 13) {
      triggerFallDetection();
    } else if (step.id === 14) {
      cancelFall();
    } else if (step.id === 15) {
      escalateFallToSOS();
    }

    if (step.voiceMessageEn && settings.voiceAlertEnabled) {
      const msg = settings.language === 'ta' && step.voiceMessageTa 
        ? step.voiceMessageTa 
        : settings.language === 'hi' && step.voiceMessageHi
        ? step.voiceMessageHi
        : step.voiceMessageEn;
      speakVoiceAlert(msg, settings.language);
    }
  };

  const nextStep = () => {
    if (currentStepIndex < HACKATHON_STEPS.length - 1) {
      goToStep(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  };

  return (
    <BandContext.Provider
      value={{
        currentScreen,
        screenHistory,
        setScreen,
        goBack,
        goHome,
        screenPowered,
        setScreenPowered,
        toggleScreenPower,
        sensorData,
        updateSensorData,
        aiRisk,
        setRiskLevel,
        settings,
        updateSettings,
        setLanguage,
        toggleLanguage,
        isVibrating,
        triggerHapticPulse,
        triggerVoiceAlert,
        playWaterSound,
        fallState,
        fallCountdown,
        triggerFallDetection,
        cancelFall,
        escalateFallToSOS,
        sosState,
        triggerSOS,
        cancelSOS,
        calibrationState,
        nextCalibrationStep,
        resetCalibration,
        currentStepIndex,
        goToStep,
        nextStep,
        prevStep,
        applyDemoScenario,
        showHardwareCallouts,
        setShowHardwareCallouts
      }}
    >
      {children}
    </BandContext.Provider>
  );
};

export const useBand = () => {
  const context = useContext(BandContext);
  if (!context) {
    throw new Error('useBand must be used within a BandProvider');
  }
  return context;
};
