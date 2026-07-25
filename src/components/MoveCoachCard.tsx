import React from 'react';
import { MoveAnalysis } from '@/types/chess';
import { MoveClassificationBadge } from './MoveClassificationBadge';
import { Bot, Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface MoveCoachCardProps {
  move: MoveAnalysis | undefined;
  moveNumber: number;
}

export const MoveCoachCard: React.FC<MoveCoachCardProps> = ({ move, moveNumber }) => {
  if (!move) {
    return (
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-center text-slate-400 text-xs">
        Starting position. Press play or click next move to see game analysis.
      </div>
    );
  }

  const isWhite = move.color === 'w';
  const playerSide = isWhite ? 'White' : 'Black';

  // Detailed coach explanations based on classifications
  let coachHeader = 'Solid Move';
  let coachIcon = <CheckCircle className="w-4 h-4 text-emerald-400" />;
  let explanation = 'This move keeps balance and follows standard positional play.';

  switch (move.classification) {
    case 'brilliant':
      coachHeader = 'Tactical Masterpiece!';
      coachIcon = <Lightbulb className="w-4 h-4 text-cyan-400 animate-bounce" />;
      explanation = `${playerSide} executes a brilliant piece sacrifice or tactical stroke that forces a winning position!`;
      break;
    case 'best':
      coachHeader = 'Optimal Engine Choice';
      coachIcon = <Bot className="w-4 h-4 text-emerald-400" />;
      explanation = `Matches the top computer engine recommendation for maximum pressure.`;
      break;
    case 'great':
      coachHeader = 'Key Positional Find';
      coachIcon = <TrendingUp className="w-4 h-4 text-blue-400" />;
      explanation = `Finds the critical sequence to maintain the advantage or neutralize opponent counterplay.`;
      break;
    case 'inaccuracy':
      coachHeader = 'Slight Inaccuracy';
      coachIcon = <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      explanation = `Gives up a minor positional edge. A slightly stronger candidate move existed.`;
      break;
    case 'mistake':
      coachHeader = 'Tactical Mistake';
      coachIcon = <AlertTriangle className="w-4 h-4 text-orange-400" />;
      explanation = `Allows the opponent counter-attacking opportunities or loses pawn structure tension.`;
      break;
    case 'blunder':
      coachHeader = 'Critical Blunder!';
      coachIcon = <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />;
      explanation = `Severe oversight! Gives up significant material or permits a decisive tactical strike.`;
      break;
    case 'book':
      coachHeader = 'Standard Opening Theory';
      coachIcon = <Bot className="w-4 h-4 text-amber-400" />;
      explanation = `Well-known standard opening line from grandmaster practice.`;
      break;
  }

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
            {coachIcon}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
              Move {moveNumber}: {move.san} ({playerSide})
            </h4>
            <p className="text-[11px] text-slate-400 font-medium">{coachHeader}</p>
          </div>
        </div>

        <MoveClassificationBadge type={move.classification} />
      </div>

      <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
        {explanation}
      </p>

      {/* Win probability change pill */}
      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/60">
        <span className="text-slate-400">
          Eval: <strong className={move.evalAfter >= 0 ? 'text-emerald-400' : 'text-red-400'}>
            {move.evalAfter > 0 ? `+${(move.evalAfter / 100).toFixed(1)}` : (move.evalAfter / 100).toFixed(1)}
          </strong>
        </span>
        <span className="text-slate-400">
          Win Prob: <strong className="text-slate-200">{(move.winProbabilityAfter * 100).toFixed(1)}%</strong>
        </span>
      </div>
    </div>
  );
};