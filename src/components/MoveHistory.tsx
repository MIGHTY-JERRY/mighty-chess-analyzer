import React from 'react';
import { MoveAnalysis } from '@/types/chess';
import { MoveClassificationBadge } from './MoveClassificationBadge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MoveHistoryProps {
  moves: MoveAnalysis[];
  currentMoveIndex: number;
  onMoveSelect: (index: number) => void;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({
  moves,
  currentMoveIndex,
  onMoveSelect,
}) => {
  // Group moves by pairs (White turn & Black turn)
  const pairedMoves: { white?: MoveAnalysis; whiteIdx?: number; black?: MoveAnalysis; blackIdx?: number; turnNum: number }[] = [];

  for (let i = 0; i < moves.length; i += 2) {
    pairedMoves.push({
      turnNum: Math.floor(i / 2) + 1,
      white: moves[i],
      whiteIdx: i,
      black: moves[i + 1],
      blackIdx: moves[i + 1] ? i + 1 : undefined,
    });
  }

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col h-[340px]">
      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Move List</span>
        <span className="text-[11px] text-slate-500">{moves.length} plies</span>
      </div>

      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {pairedMoves.map((pair) => (
            <div
              key={pair.turnNum}
              className="grid grid-cols-12 items-center text-xs py-1 px-2 rounded-md hover:bg-slate-800/50 transition-colors"
            >
              {/* Turn Number */}
              <div className="col-span-2 text-slate-500 font-mono font-semibold">
                {pair.turnNum}.
              </div>

              {/* White Move */}
              <div
                onClick={() => pair.whiteIdx !== undefined && onMoveSelect(pair.whiteIdx)}
                className={`col-span-5 flex items-center gap-1.5 cursor-pointer px-2 py-1 rounded transition-colors ${
                  currentMoveIndex === pair.whiteIdx
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <span className="font-mono">{pair.white?.san}</span>
                {pair.white && (
                  <MoveClassificationBadge type={pair.white.classification} showText={false} />
                )}
              </div>

              {/* Black Move */}
              <div
                onClick={() => pair.blackIdx !== undefined && onMoveSelect(pair.blackIdx)}
                className={`col-span-5 flex items-center gap-1.5 cursor-pointer px-2 py-1 rounded transition-colors ${
                  pair.blackIdx !== undefined && currentMoveIndex === pair.blackIdx
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {pair.black ? (
                  <>
                    <span className="font-mono">{pair.black.san}</span>
                    <MoveClassificationBadge type={pair.black.classification} showText={false} />
                  </>
                ) : (
                  <span className="text-slate-600">-</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};