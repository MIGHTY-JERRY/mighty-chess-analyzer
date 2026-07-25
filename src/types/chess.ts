export type MoveClassification = 
  | 'brilliant'
  | 'great'
  | 'best'
  | 'excellent'
  | 'good'
  | 'inaccuracy'
  | 'mistake'
  | 'blunder'
  | 'book';

export interface MoveAnalysis {
  ply: number;
  san: string;
  from: string;
  to: string;
  fen: string;
  color: 'w' | 'b';
  evalBefore: number; // in centipawns (+ is white advantage, - is black)
  evalAfter: number;
  mateIn?: number; // if mate sequence found
  classification: MoveClassification;
  winProbabilityBefore: number; // 0 to 1
  winProbabilityAfter: number;
  winProbabilityLoss: number;
  bestMoveSan?: string;
  comment?: string;
  captured?: string;
  promotion?: string;
  isCheck?: boolean;
}

export interface PlayerInfo {
  username: string;
  rating: number;
  result: string; // e.g. "win", "checkmated", "resigned", "agreed"
  accuracy?: number; // percentage e.g. 88.4
  color: 'white' | 'black';
  avatar?: string;
}

export interface ClassifiedCount {
  brilliant: number;
  great: number;
  best: number;
  excellent: number;
  good: number;
  inaccuracy: number;
  mistake: number;
  blunder: number;
  book: number;
}

export interface AnalyzedGame {
  id: string;
  title: string;
  url?: string;
  white: PlayerInfo;
  black: PlayerInfo;
  timeControl: string;
  eco?: string;
  openingName?: string;
  pgn: string;
  moves: MoveAnalysis[];
  whiteClassifications: ClassifiedCount;
  blackClassifications: ClassifiedCount;
  whiteAccuracy: number;
  blackAccuracy: number;
  date: string;
  resultString: string;
}

export interface ChessComArchiveGame {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  time_class: string;
  rules: string;
  white: {
    rating: number;
    result: string;
    username: string;
  };
  black: {
    rating: number;
    result: string;
    username: string;
  };
  eco?: string;
}