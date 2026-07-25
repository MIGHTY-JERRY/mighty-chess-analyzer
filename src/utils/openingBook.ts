export interface Opening {
  eco: string;
  name: string;
  moves: string[];
}

export const POPULAR_OPENINGS: Opening[] = [
  { eco: 'B90', name: 'Sicilian Defense: Najdorf Variation', moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'] },
  { eco: 'B20', name: 'Sicilian Defense', moves: ['e4', 'c5'] },
  { eco: 'C65', name: 'Ruy Lopez: Berlin Defense', moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'Nf6'] },
  { eco: 'C60', name: 'Ruy Lopez', moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'] },
  { eco: 'D30', name: 'Queen\'s Gambit Declined', moves: ['d4', 'd5', 'c4', 'e6'] },
  { eco: 'D02', name: 'Queen\'s Pawn Game: London System', moves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4'] },
  { eco: 'C50', name: 'Giuoco Piano (Italian Game)', moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5'] },
  { eco: 'A45', name: 'Trompowsky Attack', moves: ['d4', 'Nf6', 'Bg5'] },
  { eco: 'B07', name: 'Pirc Defense', moves: ['e4', 'd6', 'd4', 'Nf6', 'Nc3', 'g6'] },
  { eco: 'C00', name: 'French Defense', moves: ['e4', 'e6'] },
  { eco: 'B10', name: 'Caro-Kann Defense', moves: ['e4', 'c6'] },
  { eco: 'A04', name: 'Réti Opening', moves: ['Nf3'] },
  { eco: 'A00', name: 'King\'s Fianchetto Opening', moves: ['g3'] },
];

export function detectOpening(movesSans: string[]): { name: string; eco: string } {
  let matchedName = 'Custom Game / Unknown Opening';
  let matchedEco = 'A00';

  for (const op of POPULAR_OPENINGS) {
    if (op.moves.length <= movesSans.length) {
      let match = true;
      for (let i = 0; i < op.moves.length; i++) {
        if (movesSans[i] !== op.moves[i]) {
          match = false;
          break;
        }
      }
      if (match) {
        matchedName = op.name;
        matchedEco = op.eco;
      }
    }
  }

  return { name: matchedName, eco: matchedEco };
}