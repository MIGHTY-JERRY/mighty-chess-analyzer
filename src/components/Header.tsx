import React from 'react';
import { ChessComImportModal } from './ChessComImportModal';

interface HeaderProps {
  onGameSelect: (pgn: string, meta?: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ onGameSelect }) => {
  return (
    <header className="w-full bg-slate-950 border-b border-slate-800 py-3.5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-emerald-500/20">
          ♟️
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
            MIGHTY CHESS <span className="text-emerald-400">ANALYZER</span>
            <span className="text-xs bg-cyan-500/20 text-cyan-300 font-extrabold px-2 py-0.5 rounded-full border border-cyan-500/40 flex items-center gap-1 shadow-sm shadow-cyan-500/20">
              <span>‼️</span>
              <span>BRILLIANT</span>
            </span>
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Engine accuracy, key moments & move classification breakdown
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ChessComImportModal onGameSelect={onGameSelect} />
      </div>
    </header>
  );
};