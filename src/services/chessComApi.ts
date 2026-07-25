import { ChessComArchiveGame } from '@/types/chess';

export async function fetchChessComPlayerProfile(username: string) {
  const res = await fetch(`https://api.chess.com/pub/player/${encodeURIComponent(username.trim().toLowerCase())}`);
  if (!res.ok) {
    throw new Error(`Player '${username}' not found on Chess.com.`);
  }
  return res.json();
}

export async function fetchChessComRecentGames(username: string): Promise<ChessComArchiveGame[]> {
  const cleanUser = username.trim().toLowerCase();
  
  // 1. Get archives list
  const archivesRes = await fetch(`https://api.chess.com/pub/player/${cleanUser}/games/archives`);
  if (!archivesRes.ok) {
    throw new Error(`Could not fetch game archives for user '${username}'. Please check spelling.`);
  }
  
  const archivesData = await archivesRes.json();
  const archives: string[] = archivesData.archives || [];
  
  if (archives.length === 0) {
    return [];
  }
  
  // Get the last monthly archive
  const latestArchiveUrl = archives[archives.length - 1];
  const gamesRes = await fetch(latestArchiveUrl);
  if (!gamesRes.ok) {
    throw new Error(`Failed to load monthly archive games.`);
  }
  
  const gamesData = await gamesRes.json();
  const rawGames: ChessComArchiveGame[] = gamesData.games || [];
  
  // Filter games that have PGN
  return rawGames.filter(g => !!g.pgn).reverse().slice(0, 25);
}