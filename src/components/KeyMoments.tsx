import React from 'react';
import { MoveAnalysis } from '@/types/chess';
import { MoveClassificationBadge } from './MoveClassificationBadge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Flame, CheckCircle2 } from 'lucide-react';

interface KeyMomentsProps {
  moves: MoveAnalysis[];
  onMoveSelect: (index: number) => void;
}

export const KeyMoments: React.FC<KeyMomentsProps> = ({ moves, onMoveSelect }) => {
  const keyMoves = moves
    .map((m, idx) => ({ ...m, index: idx }))
    .filter(
      (m) =>
        m.classification === 'brilliant' ||
        m.classification === 'blunder' ||
        m.classification === 'mistake' ||
        m.classification === 'great'
    );

  if (keyMoves.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-slate-400 text-xs">
        No major key blunders or brilliant moments detected in this smooth game!
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-amber-500" />
          Key Game Turning Points ({keyMoves.length})
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
        {keyMoves.map((km) => (
          <button
            key={km.ply}
            onClick={() => onMoveSelect(km.index)}
            className="flex items-start justify-between p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition-colors group"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-300">
                  Move {Math.ceil(km.ply / 2)} ({km.color === 'w' ? 'White' : 'Black'})
                </span>
                <span className="font-mono text-xs text-emerald-400 group-hover:underline">
                  {km.san}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">{km.comment}</p>
            </div>
            <MoveClassificationBadge type={km.classification} showText={false} />
          </button>
        ))}
      </div>
    </div>
  );
};