import React from 'react';

interface EvalBarProps {
  evaluation: number; // Centipawns (+ for white, - for black)
  orientation?: 'white' | 'black';
}

export const EvalBar: React.FC<EvalBarProps> = ({ evaluation, orientation = 'white' }) => {
  // Cap score between -1000 and 1000 for visual bar
  const cappedEval = Math.max(-1000, Math.min(1000, evaluation));
  
  // Percentage of white height (50% is 0.0)
  // formula: 50 + (cappedEval / 1000) * 45
  let whitePercent = 50 + (cappedEval / 1000) * 45;
  whitePercent = Math.max(5, Math.min(95, whitePercent));

  const displayScore = (evaluation / 100).toFixed(1);
  const formattedScore = evaluation > 0 ? `+${displayScore}` : `${displayScore}`;

  return (
    <div className="flex flex-col items-center gap-1.5 h-full">
      <div className="relative w-6 sm:w-8 h-[360px] sm:h-[460px] bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-md flex flex-col justify-between">
        {/* Top half (Black) */}
        <div
          className="w-full bg-slate-900 transition-all duration-300 ease-out flex items-start justify-center pt-2"
          style={{ height: `${100 - whitePercent}%` }}
        >
          {evaluation < -50 && (
            <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider">
              {formattedScore}
            </span>
          )}
        </div>

        {/* Bottom half (White) */}
        <div
          className="w-full bg-slate-100 transition-all duration-300 ease-out flex items-end justify-center pb-2 border-t border-slate-400"
          style={{ height: `${whitePercent}%` }}
        >
          {evaluation >= -50 && (
            <span className="text-[10px] sm:text-xs font-bold text-slate-900 tracking-wider">
              {formattedScore}
            </span>
          )}
        </div>
      </div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">EVAL</span>
    </div>
  );
};