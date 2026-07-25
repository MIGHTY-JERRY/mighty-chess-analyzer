import React from 'react';
import { MoveAnalysis } from '@/types/chess';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface EvaluationGraphProps {
  moves: MoveAnalysis[];
  currentMoveIndex: number;
  onMoveSelect: (index: number) => void;
}

export const EvaluationGraph: React.FC<EvaluationGraphProps> = ({
  moves,
  currentMoveIndex,
  onMoveSelect,
}) => {
  const data = [
    { moveNum: 0, eval: 0, san: 'Start', color: 'w' },
    ...moves.map((m, idx) => ({
      index: idx,
      moveNum: Math.ceil(m.ply / 2),
      eval: Math.max(-800, Math.min(800, m.evalAfter)) / 100, // convert centipawns to pawns
      san: m.san,
      color: m.color,
      ply: m.ply,
    })),
  ];

  return (
    <div className="w-full h-[180px] bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-inner flex flex-col justify-between">
      <div className="flex items-center justify-between mb-1 text-xs text-slate-400 font-medium">
        <span>Evaluation Advantage Curve</span>
        <span className="text-[10px] text-slate-500">Click graph point to jump to move</span>
      </div>

      <div className="w-full h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            onClick={(e) => {
              if (e && e.activePayload && e.activePayload.length > 0) {
                const item = e.activePayload[0].payload;
                if (typeof item.index === 'number') {
                  onMoveSelect(item.index);
                }
              }
            }}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="evalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#64748b" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="moveNum"
              tick={{ fontSize: 10, fill: '#64748b' }}
              stroke="#334155"
              tickLine={false}
            />
            <YAxis
              domain={[-6, 6]}
              tick={{ fontSize: 10, fill: '#64748b' }}
              stroke="#334155"
              tickLine={false}
            />
            <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pData = payload[0].payload;
                  return (
                    <div className="bg-slate-950 border border-slate-700 px-2.5 py-1.5 rounded-md shadow-xl text-xs">
                      <p className="font-bold text-slate-200">
                        Move {pData.moveNum} ({pData.san || 'Start'})
                      </p>
                      <p className={pData.eval >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        Eval: {pData.eval > 0 ? `+${pData.eval}` : pData.eval}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="eval"
              stroke="#38bdf8"
              strokeWidth={2}
              fill="url(#evalGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};