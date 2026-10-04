import React from 'react';
import { ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import { useBand } from '../../context/BandContext';
import type { ScreenType } from '../../types/wearable';

interface ScreenFooterProps {
  leftScreen?: { name: string; target: ScreenType };
  rightScreen?: { name: string; target: ScreenType };
  centerAction?: { label: string; action: () => void };
}

export const ScreenFooter: React.FC<ScreenFooterProps> = ({
  leftScreen,
  rightScreen,
  centerAction
}) => {
  const { setScreen, settings } = useBand();
  const isTamil = settings.language === 'ta';

  return (
    <div className="w-full px-2 py-1.5 flex items-center justify-between text-[9px] text-slate-400 border-t border-white/5 bg-slate-950/80 backdrop-blur-md select-none shrink-0 z-20">
      {/* Left target */}
      {leftScreen ? (
        <button
          onClick={() => setScreen(leftScreen.target)}
          className="flex items-center gap-0.5 text-slate-400 hover:text-white transition-colors cursor-pointer py-0.5 px-1 rounded active:bg-white/10"
          title={`Swipe to ${leftScreen.name}`}
        >
          <ChevronLeft className="w-3 h-3 text-slate-400" />
          <span className="font-semibold tracking-tight uppercase truncate max-w-[65px]">
            {leftScreen.name}
          </span>
        </button>
      ) : (
        <div className="w-12" />
      )}

      {/* Center action */}
      {centerAction ? (
        <button
          onClick={centerAction.action}
          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 font-medium transition-all active:scale-95 cursor-pointer text-[8.5px] border border-white/10"
        >
          <Hand className="w-2.5 h-2.5 text-orange-400" />
          <span>{centerAction.label}</span>
        </button>
      ) : (
        <div className="flex gap-1 items-center">
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span className="w-2.5 h-1 rounded-full bg-orange-400" />
          <span className="w-1 h-1 rounded-full bg-slate-600" />
        </div>
      )}

      {/* Right target */}
      {rightScreen ? (
        <button
          onClick={() => setScreen(rightScreen.target)}
          className="flex items-center gap-0.5 text-slate-400 hover:text-white transition-colors cursor-pointer py-0.5 px-1 rounded active:bg-white/10 text-right"
          title={`Swipe to ${rightScreen.name}`}
        >
          <span className="font-semibold tracking-tight uppercase truncate max-w-[65px]">
            {rightScreen.name}
          </span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </button>
      ) : (
        <div className="w-12" />
      )}
    </div>
  );
};
