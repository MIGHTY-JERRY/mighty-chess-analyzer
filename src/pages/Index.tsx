import React, { useState, useEffect } from 'react';
import { analyzePgn } from '@/utils/chessAnalyzer';
import { AnalyzedGame } from '@/types/chess';
import { SAMPLE_GAMES } from '@/data/sampleGames';
import { ChessBoard } from '@/components/ChessBoard';
import { EvalBar } from '@/components/EvalBar';
import { EvaluationGraph } from '@/components/EvaluationGraph';
import { GameSummaryCard } from '@/components/GameSummaryCard';
import { MoveHistory } from '@/components/MoveHistory';
import { KeyMoments } from '@/components/KeyMoments';
import { MoveClassificationBadge } from '@/components/MoveClassificationBadge';
import { Header } from '@/components/Header';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';

const Index = () => {
  // Load Opera game as default
  const defaultSample = SAMPLE_GAMES[0];
  const [currentGame, setCurrentGame] = useState<AnalyzedGame>(() =>
    analyzePgn(defaultSample.pgn, {
      title: defaultSample.title,
      white: { username: defaultSample.white, rating: defaultSample.whiteRating, result: 'win', color: 'white' },
      black: { username: defaultSample.black, rating: defaultSample.blackRating, result: 'loss', color: 'black' },
      timeControl: 'Classical',
    })
  );

  const [currentMoveIdx, setCurrentMoveIdx] = useState<number>(0);
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1000); // ms per move

  // Current move state
  const currentMove = currentGame.moves[currentMoveIdx];
  const currentFen = currentMove
    ? currentMove.fen
    : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  const lastMove = currentMove ? { from: currentMove.from, to: currentMove.to } : null;
  const currentEval = currentMove ? currentMove.evalAfter : 0;

  // Auto-play timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentMoveIdx((prev) => {
          if (prev < currentGame.moves.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playSpeed, currentGame.moves.length]);

  const handleGameSelect = (pgn: string, meta?: any) => {
    try {
      const analyzed = analyzePgn(pgn, meta);
      setCurrentGame(analyzed);
      setCurrentMoveIdx(0);
      setIsPlaying(false);
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleFirstMove = () => setCurrentMoveIdx(0);
  const handlePrevMove = () => setCurrentMoveIdx((prev) => Math.max(0, prev - 1));
  const handleNextMove = () =>
    setCurrentMoveIdx((prev) => Math.min(currentGame.moves.length - 1, prev + 1));
  const handleLastMove = () => setCurrentMoveIdx(currentGame.moves.length - 1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <Header onGameSelect={handleGameSelect} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-6">
        {/* Game Title Summary Card */}
        <GameSummaryCard game={currentGame} />

        {/* Main Chessboard & Control Center Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Center: Interactive Board & Evaluation Bar */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center gap-3 w-full">
              {/* Evaluation Bar */}
              <EvalBar evaluation={currentEval} orientation={orientation} />

              {/* Board */}
              <div className="flex-1 max-w-[540px]">
                <ChessBoard
                  fen={currentFen}
                  orientation={orientation}
                  lastMove={lastMove}
                />
              </div>
            </div>

            {/* Move Control Action Bar */}
            <div className="w-full max-w-[580px] bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 shadow-lg">
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleFirstMove}
                  disabled={currentMoveIdx === 0}
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handlePrevMove}
                  disabled={currentMoveIdx === 0}
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 px-3 font-semibold gap-1.5"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleNextMove}
                  disabled={currentMoveIdx === currentGame.moves.length - 1}
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLastMove}
                  disabled={currentMoveIdx === currentGame.moves.length - 1}
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Utility buttons */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setOrientation((o) => (o === 'white' ? 'black' : 'white'))}
                  className="border-slate-700 bg-slate-950 text-xs text-slate-300 hover:text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Flip Board
                </Button>
              </div>
            </div>

            {/* Current Move Insights Banner */}
            {currentMove && (
              <div className="w-full max-w-[580px] bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-black font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-emerald-400">
                    {Math.ceil(currentMove.ply / 2)}. {currentMove.san}
                  </div>
                  <div>
                    <MoveClassificationBadge type={currentMove.classification} />
                    <p className="text-xs text-slate-400 mt-1">{currentMove.comment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Graphs, Move History & Key Moments Tabs */}
          <div className="lg:col-span-5 space-y-4">
            {/* Advantage Graph */}
            <EvaluationGraph
              moves={currentGame.moves}
              currentMoveIndex={currentMoveIdx}
              onMoveSelect={(idx) => setCurrentMoveIdx(idx)}
            />

            {/* Tabbed Panel */}
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid grid-cols-2 bg-slate-900 border border-slate-800">
                <TabsTrigger value="history" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                  Move History
                </TabsTrigger>
                <TabsTrigger value="key" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                  Key Moments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="mt-3">
                <MoveHistory
                  moves={currentGame.moves}
                  currentMoveIndex={currentMoveIdx}
                  onMoveSelect={(idx) => setCurrentMoveIdx(idx)}
                />
              </TabsContent>

              <TabsContent value="key" className="mt-3">
                <KeyMoments
                  moves={currentGame.moves}
                  onMoveSelect={(idx) => setCurrentMoveIdx(idx)}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 mt-12 py-4 bg-slate-950">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;