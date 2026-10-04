import React from 'react';
import { ThermometerSun, Droplets, Flame, AlertTriangle, Sun, Wind } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import { StatusBar } from './StatusBar';
import { ScreenFooter } from './ScreenFooter';

export const EnvironmentScreen: React.FC = () => {
  const { sensorData, settings } = useBand();
  const lang = settings.language;

  const getTexts = () => {
    switch (lang) {
      case 'ta':
        return {
          status: 'சுற்றுச்சூழல்',
          title: 'வெப்ப சூழல் நிலை',
          sensorBadge: 'SHT4x சென்சார்',
          ambientLabel: 'சுற்றுப்புற வெப்பம்',
          ambientStatus: sensorData.ambientTemp > 35 ? 'கடுமையான வெப்பம்' : 'மிதமான வெப்பம்',
          humidityLabel: 'ஈரப்பதம்',
          humidityStatus: sensorData.humidity > 65 ? 'அதிக ஈரப்பதம்' : 'இயல்பு',
          heatStressLabel: 'வெப்ப சுமை',
          heatStressSub: 'LEVEL 3 - தீவிர நிலை',
          coolingTitle: 'குளிர்விக்கும் திறன் குறைவு',
          coolingBody: 'அதிக ஈரப்பதம் இருப்பதால் உடலின் வியர்வை எளிதில் ஆவியாகாமல் உடல் விரைவாக சூடாகும்.',
          heatIndexLabel: 'உணரப்படும் வெப்பம்:',
          wbgtLabel: 'WBGT குறியீடு:'
        };
      case 'hi':
        return {
          status: 'पर्यावरण',
          title: 'पर्यावरणीय ताप स्थिति',
          sensorBadge: 'SHT4x सेंसर',
          ambientLabel: 'परिवेश तापमान',
          ambientStatus: sensorData.ambientTemp > 35 ? 'अत्यधिक गर्म' : 'मध्यम गर्म',
          humidityLabel: 'आर्द्रता',
          humidityStatus: sensorData.humidity > 65 ? 'उच्च आर्द्रता' : 'सामान्य',
          heatStressLabel: 'ताप तनाव भार',
          heatStressSub: 'स्तर 3 - उच्च भार',
          coolingTitle: 'प्राकृतिक शीतलन में बाधा',
          coolingBody: 'उच्च आर्द्रता पसीने के वाष्पीकरण को रोकती है, जिससे शरीर का तापमान तेजी से बढ़ता है।',
          heatIndexLabel: 'अनुभूत ताप सूचकांक:',
          wbgtLabel: 'WBGT सूचकांक:'
        };
      default:
        return {
          status: 'ENVIRONMENT',
          title: 'THERMAL ENVIRONMENT',
          sensorBadge: 'SHT4x SENSOR',
          ambientLabel: 'Ambient Temp',
          ambientStatus: sensorData.ambientTemp > 35 ? 'Very Hot Outdoors' : 'Moderate Warm',
          humidityLabel: 'Rel. Humidity',
          humidityStatus: sensorData.humidity > 65 ? 'High Humidity' : 'Normal',
          heatStressLabel: 'HEAT STRESS LOAD',
          heatStressSub: 'LEVEL 3 EXPOSURE',
          coolingTitle: 'Cooling conditions are poor',
          coolingBody: 'High relative humidity restricts sweat evaporation. Body heat accumulates faster outdoors.',
          heatIndexLabel: 'Heat Index:',
          wbgtLabel: 'WBGT Est:'
        };
    }
  };

  const t = getTexts();

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-amber-950/40 via-slate-950 to-black select-none overflow-hidden relative">
      <StatusBar title={t.status} showClock={false} />

      {/* Screen Title */}
      <div className="px-3 pt-1 flex items-center justify-between">
        <span className="text-[11.5px] font-black uppercase tracking-wider text-slate-200">
          {t.title}
        </span>
        <span className="text-[8.5px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
          {t.sensorBadge}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-around px-3 py-1">
        
        {/* Environmental Readout Cards */}
        <div className="grid grid-cols-2 gap-1.5">
          {/* Ambient Temp */}
          <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-400 text-[9.5px] font-semibold uppercase">
              <ThermometerSun className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.ambientLabel}</span>
            </div>
            <div className="mt-1">
              <span className="font-telemetry font-bold text-2xl text-white">
                {sensorData.ambientTemp}
              </span>
              <span className="text-xs text-amber-400 font-semibold ml-0.5">°C</span>
            </div>
            <div className="text-[8px] text-amber-300 font-medium truncate">
              {t.ambientStatus}
            </div>
          </div>

          {/* Humidity */}
          <div className="p-2 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-400 text-[9.5px] font-semibold uppercase">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.humidityLabel}</span>
            </div>
            <div className="mt-1">
              <span className="font-telemetry font-bold text-2xl text-white">
                {sensorData.humidity}
              </span>
              <span className="text-xs text-blue-400 font-semibold ml-0.5">%</span>
            </div>
            <div className="text-[8px] text-blue-300 font-medium truncate">
              {t.humidityStatus}
            </div>
          </div>
        </div>

        {/* Heat Load / Heat Stress Card */}
        <div className="p-2 rounded-xl bg-gradient-to-r from-orange-950/50 to-amber-950/40 border border-orange-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
            </div>
            <div>
              <div className="text-[9px] text-orange-300 font-bold uppercase tracking-wider">
                {t.heatStressLabel}
              </div>
              <div className="text-xs font-black text-white">
                {sensorData.heatIndexText} LOAD
              </div>
            </div>
          </div>

          <div className="text-right text-[8px] font-mono text-slate-300">
            <div>{t.heatIndexLabel} <strong className="text-orange-400">{sensorData.heatIndex}°C</strong></div>
            <div>{t.wbgtLabel} <strong className="text-amber-300">{sensorData.wetBulbGlobeTemp}°C</strong></div>
          </div>
        </div>

        {/* Plain Language Explanation */}
        <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-[9px] leading-snug text-slate-200">
            <strong className="text-amber-300 block mb-0.5 font-bold">
              {t.coolingTitle}
            </strong>
            {t.coolingBody}
          </div>
        </div>

      </div>

      <ScreenFooter
        leftScreen={{ name: lang === 'ta' ? 'உடல் நலம்' : lang === 'hi' ? 'स्वास्थ्य' : 'HEALTH', target: 'HEALTH' }}
        rightScreen={{ name: lang === 'ta' ? 'நீரேற்றம்' : lang === 'hi' ? 'जलयोजन' : 'HYDRATE', target: 'HYDRATION' }}
      />
    </div>
  );
};
