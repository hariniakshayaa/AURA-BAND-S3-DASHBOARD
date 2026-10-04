export type RiskLevel = 'NORMAL' | 'YELLOW' | 'ORANGE' | 'RED';

export type ActivityType = 'RESTING' | 'WALKING' | 'WORKING' | 'RUNNING';

export type SignalQualityState = 'GOOD' | 'UNCERTAIN' | 'SENSOR_LOST';

export type ScreenType = 
  | 'HOME'
  | 'HEALTH'
  | 'ENVIRONMENT'
  | 'HYDRATION'
  | 'REST_ADVISOR'
  | 'AI_RISK'
  | 'SIGNAL_QUALITY'
  | 'HEAT_WARNING'
  | 'RECOVERY'
  | 'FALL_DETECTION'
  | 'SOS'
  | 'CALIBRATION'
  | 'BATTERY_DEVICE'
  | 'PRIVACY'
  | 'SETTINGS'
  | 'WORKER_MODE'
  | 'ELDERLY_MODE'
  | 'EDGE_AI';

export type Language = 'en' | 'ta' | 'hi';

export interface SensorData {
  heartRate: number; // BPM
  baselineHeartRate: number;
  skinTemp: number; // Celsius
  skinTempTrend: string; // e.g. "+0.3°C"
  ambientTemp: number; // Celsius
  humidity: number; // %
  heatIndex: number; // Calculated heat index °C
  wetBulbGlobeTemp: number; // Estimated WBGT °C
  heatIndexText: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
  activity: ActivityType;
  signalQualityPercent: number; // 0 - 100
  signalStatus: SignalQualityState;
  sensorContact: boolean;
  motionNoise: 'LOW' | 'MED' | 'HIGH';
  batteryPercent: number;
  batteryHoursRemaining: number;
  isOffline: boolean;
  cellularAvailable: boolean;

  // Advanced Hydration Telemetry
  sweatRateMlPerHour: number; // e.g. 750 mL/h
  recommendedWaterMl: number; // Target per interval e.g. 250 mL
  waterIntakeTotalMl: number; // Total drank today
  hydrationLevelPercent: number; // 0 - 100%
  nextDrinkMinutes: number; // Countdown minutes to next drink

  // Advanced Work-Rest Advisor Telemetry (OSHA / ISO 7933)
  workRestRatio: string; // e.g. "45m Work / 15m Rest"
  workSessionMinutes: number; // Elapsed working duration
  restBreakDueMinutes: number; // Countdown to mandatory rest break
  restDurationRecommended: number; // Recommended rest duration (mins)
}

export interface AIRiskTelemetry {
  riskLevel: RiskLevel;
  confidence: number; // e.g. 87%
  riskTrend: 'STABLE' | 'RISING' | 'DECREASING';
  riskWindow: string; // "15–30 min"
  riskScore: number; // 0 to 100
  reasons: {
    en: string[];
    ta: string[];
    hi: string[];
  };
}

export interface CalibrationState {
  stage: 'SIT' | 'WALK' | 'RECOVER' | 'COMPLETE';
  progressSeconds: number;
  totalSeconds: number;
  restingHrRange: string;
  riseResponse: string;
  recoverySpeed: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface BandSettings {
  language: Language;
  alertVolume: 'LOW' | 'MED' | 'HIGH';
  vibrationEnabled: boolean;
  voiceAlertEnabled: boolean;
  workerMode: boolean;
  elderlyMode: boolean;
  emergencyContact: EmergencyContact;
}

export interface HackathonDemoStep {
  id: number;
  title: string;
  subtitle: string;
  screenToOpen: ScreenType;
  recommendedRisk: RiskLevel;
  voiceMessageEn?: string;
  voiceMessageTa?: string;
  voiceMessageHi?: string;
  description: string;
}
