import React, { useState } from 'react';
import { fetchChessComRecentGames } from '@/services/chessComApi';
import { ChessComArchiveGame } from '@/types/chess';
import { SAMPLE_GAMES } from '@/data/sampleGames';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { showSuccess, showError } from '@/utils/toast';
import { Search, FileText, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface ChessComImportModalProps {
  onGameSelect: (pgn: string, meta?: any) => void;
  triggerButton?: React.ReactNode;
}

export const ChessComImportModal: React.FC<ChessComImportModalProps> = ({
  onGameSelect,
  triggerButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('Hikaru');
  const [loading, setLoading] = useState(false);
  const [fetchedGames, setFetchedGames] = useState<ChessComArchiveGame[]>([]);
  const [customPgn, setCustomPgn] = useState('');

  const handleFetchChessCom = async () => {
    if (!username.trim()) {
      showError('Please enter a Chess.com username');
      return;
    }
    setLoading(true);
    try {
      const games = await fetchChessComRecentGames(username);
      setFetchedGames(games);
      if (games.length === 0) {
        showError('No recent games found for this player.');
      } else {
        showSuccess(`Loaded ${games.length} recent games for ${username}!`);
      }
    } catch (err: any) {
      showError(err.message || 'Failed to fetch games from Chess.com');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectArchiveGame = (game: ChessComArchiveGame) => {
    onGameSelect(game.pgn, {
      title: `${game.white.username} vs ${game.black.username}`,
      white: { username: game.white.username, rating: game.white.rating, result: game.white.result },
      black: { username: game.black.username, rating: game.black.rating, result: game.black.result },
      timeControl: game.time_class || game.time_control,
      date: new Date(game.end_time * 1000).toISOString().split('T')[0],
      eco: game.eco,
    });
    setIsOpen(false);
    showSuccess('Game imported successfully!');
  };

  const handleSelectSample = (samplePgn: string, title: string, white: string, black: string) => {
    onGameSelect(samplePgn, {
      title,
      white: { username: white, rating: 2800, result: 'win' },
      black: { username: black, rating: 2750, result: 'loss' },
      timeControl: 'Standard Classical',
    });
    setIsOpen(false);
    showSuccess(`Loaded ${title}`);
  };

  const handlePgnSubmit = () => {
    if (!customPgn.trim()) {
      showError('Please paste a valid PGN string.');
      return;
    }
    onGameSelect(customPgn);
    setIsOpen(false);
    showSuccess('Custom PGN game loaded!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 shadow-lg">
            <Search className="w-4 h-4" />
            Import Game
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-slate-950 border-slate-800 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <span className="text-emerald-500">♟️</span> Import Chess Game
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="chesscom" className="w-full mt-2">
          <TabsList className="grid grid-cols-3 bg-slate-900 border border-slate-800">
            <TabsTrigger value="chesscom" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              Chess.com User
            </TabsTrigger>
            <TabsTrigger value="preset" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              Famous GM Games
            </TabsTrigger>
            <TabsTrigger value="pgn" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              Paste PGN
            </TabsTrigger>
          </TabsList>

          {/* Chess.com Username Tab */}
          <TabsContent value="chesscom" className="space-y-4 pt-3">
            <div className="flex gap-2">
              <Input
                placeholder="Enter Chess.com Username (e.g. Hikaru, MagnusCarlsen)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFetchChessCom()}
                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
              />
              <Button
                onClick={handleFetchChessCom}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold min-w-[110px]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch Games'}
              </Button>
            </div>

            {/* Fetched games list */}
            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
              {fetchedGames.length > 0 ? (
                fetchedGames.map((g, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectArchiveGame(g)}
                    className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-100 group-hover:text-emerald-400 flex items-center gap-2">
                        <span>{g.white.username} ({g.white.rating})</span>
                        <span className="text-slate-500">vs</span>
                        <span>{g.black.username} ({g.black.rating})</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {g.time_class} • {new Date(g.end_time * 1000).toLocaleDateString()}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Enter a Chess.com username above to fetch recent online blitz, bullet, or rapid games.
                </div>
              )}
            </div>
          </TabsContent>

          {/* GM Presets Tab */}
          <TabsContent value="preset" className="pt-3">
            <div className="space-y-2 max-h-[340px] overflow-y-auto">
              {SAMPLE_GAMES.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleSelectSample(sample.pgn, sample.title, sample.white, sample.black)}
                  className="p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-100 group-hover:text-emerald-400">
                      {sample.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {sample.white} vs {sample.black} • {sample.event}
                    </p>
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Paste PGN Tab */}
          <TabsContent value="pgn" className="space-y-4 pt-3">
            <Textarea
              placeholder="Paste PGN move text here (e.g. 1. e4 e5 2. Nf3 Nc6 ...)"
              value={customPgn}
              onChange={(e) => setCustomPgn(e.target.value)}
              className="bg-slate-900 border-slate-700 text-white min-h-[160px] font-mono text-xs"
            />
            <Button
              onClick={handlePgnSubmit}
              className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold"
            >
              Analyze PGN
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};