import React from 'react';
import { AnalyzedGame } from '@/types/chess';
import { Trophy, ShieldCheck, Zap, User } from 'lucide-react';

interface GameSummaryCardProps {
  game: AnalyzedGame;
}

export const GameSummaryCard: React.FC<GameSummaryCardProps> = ({ game }) => {
  const isWhiteWinner = game.white.result.toLowerCase().includes('win') || game.resultString === '1-0';
  const isBlackWinner = game.black.result.toLowerCase().includes('win') || game.resultString === '0-1';

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl mb-6">
      {/* Opening & Time control metadata header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20 mr-2">
            {game.eco || 'ECO'}
          </span>
          <span className="text-sm font-bold text-slate-200">{game.openingName}</span>
        </div>
        <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
          <span>⏱️ {game.timeControl}</span>
          <span>•</span>
          <span>📅 {game.date}</span>
        </div>
      </div>

      {/* Players vs Players accuracy summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* White Player */}
        <div className={`p-4 rounded-xl border transition-all ${isWhiteWinner ? 'bg-slate-800/80 border-emerald-500/50 shadow-md' : 'bg-slate-900/50 border-slate-800'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-900 font-extrabold flex items-center justify-center text-sm shadow-sm">
                ♔
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                  {game.white.username}
                  {isWhiteWinner && <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" />}
                </h4>
                <p className="text-xs text-slate-400">Rating: {game.white.rating}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-extrabold text-emerald-400">{game.whiteAccuracy}%</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Accuracy</div>
            </div>
          </div>

          {/* Classification breakdown count pills */}
          <div className="grid grid-cols-4 gap-1.5 pt-2 mt-2 border-t border-slate-800 text-[11px]">
            <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 rounded px-1.5 py-0.5 text-center">
              ‼️ {game.whiteClassifications.brilliant}
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded px-1.5 py-0.5 text-center">
              ⭐️ {game.whiteClassifications.best}
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 rounded px-1.5 py-0.5 text-center">
              ⚠️ {game.whiteClassifications.inaccuracy}
            </div>
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded px-1.5 py-0.5 text-center">
              ❌ {game.whiteClassifications.blunder}
            </div>
          </div>
        </div>

        {/* Black Player */}
        <div className={`p-4 rounded-xl border transition-all ${isBlackWinner ? 'bg-slate-800/80 border-emerald-500/50 shadow-md' : 'bg-slate-900/50 border-slate-800'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-slate-100 font-extrabold flex items-center justify-center text-sm border border-slate-700 shadow-sm">
                ♚
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                  {game.black.username}
                  {isBlackWinner && <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" />}
                </h4>
                <p className="text-xs text-slate-400">Rating: {game.black.rating}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-extrabold text-emerald-400">{game.blackAccuracy}%</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Accuracy</div>
            </div>
          </div>

          {/* Classification breakdown count pills */}
          <div className="grid grid-cols-4 gap-1.5 pt-2 mt-2 border-t border-slate-800 text-[11px]">
            <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 rounded px-1.5 py-0.5 text-center">
              ‼️ {game.blackClassifications.brilliant}
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded px-1.5 py-0.5 text-center">
              ⭐️ {game.blackClassifications.best}
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 rounded px-1.5 py-0.5 text-center">
              ⚠️ {game.blackClassifications.inaccuracy}
            </div>
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded px-1.5 py-0.5 text-center">
              ❌ {game.blackClassifications.blunder}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};