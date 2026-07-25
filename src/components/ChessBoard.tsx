import React, { useState } from 'react';
import { Chess, Square, PieceSymbol } from 'chess.js';

interface ChessBoardProps {
  fen: string;
  orientation?: 'white' | 'black';
  lastMove?: { from: string; to: string } | null;
  onSquareClick?: (square: string) => void;
  selectedSquare?: string | null;
}

// SVG piece icons for sharp high-end visual look
const PIECE_SVG_URLS: Record<string, string> = {
  wP: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
  wN: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
  wB: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
  wR: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
  wQ: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
  wK: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
  bP: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
  bN: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
  bB: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
  bR: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
  bQ: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
  bK: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
};

export const ChessBoard: React.FC<ChessBoardProps> = ({
  fen,
  orientation = 'white',
  lastMove,
  onSquareClick,
  selectedSquare,
}) => {
  const [internalSelectedSquare, setInternalSelectedSquare] = useState<string | null>(null);

  const activeSelected = selectedSquare !== undefined ? selectedSquare : internalSelectedSquare;

  const chess = new Chess();
  try {
    chess.load(fen);
  } catch (e) {
    chess.reset();
  }

  const board = chess.board();
  const inCheck = chess.inCheck();
  const turn = chess.turn();

  // Find King square if in check
  let checkingKingSquare: string | null = null;
  if (inCheck) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.type === 'k' && p.color === turn) {
          const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
          checkingKingSquare = `${files[c]}${8 - r}`;
          break;
        }
      }
    }
  }

  // Get legal move destinations for selected square
  let legalMoveSquares: string[] = [];
  if (activeSelected) {
    const legalMoves = chess.moves({ square: activeSelected as Square, verbose: true });
    legalMoveSquares = legalMoves.map((m) => m.to);
  }

  // Create grid coordinates depending on orientation
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const displayRanks = orientation === 'white' ? ranks : [...ranks].reverse();
  const displayFiles = orientation === 'white' ? files : [...files].reverse();

  const handleSquareClick = (sq: string) => {
    if (onSquareClick) {
      onSquareClick(sq);
    } else {
      if (internalSelectedSquare === sq) {
        setInternalSelectedSquare(null);
      } else {
        setInternalSelectedSquare(sq);
      }
    }
  };

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto rounded-xl shadow-2xl overflow-hidden border-4 border-emerald-900/80 bg-emerald-950 flex flex-col select-none">
      <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
        {displayRanks.map((rank, rIdx) =>
          displayFiles.map((file, fIdx) => {
            const squareName = `${file}${rank}` as Square;
            
            // Calculate square color
            const fileIndex = files.indexOf(file);
            const rankIndex = parseInt(rank, 10) - 1;
            const isLight = (fileIndex + rankIndex) % 2 !== 0;

            // Fetch piece on this square
            const pieceObj = board[7 - rankIndex][fileIndex];

            // Highlights
            const isLastMoveFrom = lastMove?.from === squareName;
            const isLastMoveTo = lastMove?.to === squareName;
            const isSelected = activeSelected === squareName;
            const isLegalTarget = legalMoveSquares.includes(squareName);
            const isCheckedKing = checkingKingSquare === squareName;

            let squareBg = isLight ? 'bg-[#eeeed2]' : 'bg-[#769656]';
            
            if (isLastMoveFrom || isLastMoveTo) {
              squareBg = isLight ? 'bg-[#f5f682]' : 'bg-[#b9ca43]';
            }
            if (isSelected) {
              squareBg = 'bg-amber-300 border-2 border-amber-600';
            }
            if (isCheckedKing) {
              squareBg = 'bg-red-500 animate-pulse';
            }

            const pieceKey = pieceObj ? `${pieceObj.color}${pieceObj.type.toUpperCase()}` : null;

            return (
              <div
                key={squareName}
                onClick={() => handleSquareClick(squareName)}
                className={`relative flex items-center justify-center cursor-pointer transition-colors duration-150 ${squareBg}`}
              >
                {/* File / Rank Labels on edges */}
                {fIdx === 0 && (
                  <span
                    className={`absolute top-0.5 left-1 text-[10px] sm:text-xs font-semibold ${
                      isLight ? 'text-[#769656]' : 'text-[#eeeed2]'
                    }`}
                  >
                    {rank}
                  </span>
                )}
                {rIdx === 7 && (
                  <span
                    className={`absolute bottom-0.5 right-1 text-[10px] sm:text-xs font-semibold ${
                      isLight ? 'text-[#769656]' : 'text-[#eeeed2]'
                    }`}
                  >
                    {file}
                  </span>
                )}

                {/* Legal Move Hint Marker */}
                {isLegalTarget && !pieceObj && (
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-slate-900/30 z-10 pointer-events-none" />
                )}
                {isLegalTarget && pieceObj && (
                  <div className="absolute inset-0 border-4 border-slate-900/40 rounded-full z-10 pointer-events-none" />
                )}

                {/* Piece Rendering */}
                {pieceKey && PIECE_SVG_URLS[pieceKey] && (
                  <img
                    src={PIECE_SVG_URLS[pieceKey]}
                    alt={pieceKey}
                    className="w-[85%] h-[85%] object-contain drop-shadow-md transition-transform duration-200 hover:scale-105 pointer-events-none z-0"
                    loading="eager"
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};