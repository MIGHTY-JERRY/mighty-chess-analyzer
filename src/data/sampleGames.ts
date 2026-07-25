export interface SampleGame {
  id: string;
  title: string;
  white: string;
  whiteRating: number;
  black: string;
  blackRating: number;
  event: string;
  pgn: string;
}

export const SAMPLE_GAMES: SampleGame[] = [
  {
    id: 'opera-game',
    title: 'The Opera Game (1858)',
    white: 'Paul Morphy',
    whiteRating: 2700,
    black: 'Duke Karl / Count Isouard',
    blackRating: 2100,
    event: 'Paris Opera House',
    pgn: `[Event "Paris Opera"]
[Site "Paris FRA"]
[Date "1858.11.02"]
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[Result "1-0"]

1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8# 1-0`
  },
  {
    id: 'kasparov-deepblue',
    title: 'Kasparov vs Deep Blue (1996)',
    white: 'Garry Kasparov',
    whiteRating: 2850,
    black: 'Deep Blue',
    blackRating: 2800,
    event: 'IBM Challenge Game 1',
    pgn: `[Event "IBM World Challenge Game 1"]
[Site "Philadelphia, PA USA"]
[Date "1996.02.10"]
[White "Garry Kasparov"]
[Black "Deep Blue"]
[Result "0-1"]

1. e4 c5 2. c3 d5 3. exd5 Qxd5 4. d4 Nf6 5. Nf3 Bg4 6. Be2 e6 7. h3 Bh5 8. O-O Nc6 9. Be3 cxd4 10. cxd4 Bb4 11. a3 Ba5 12. Nc3 Qd6 13. Nb5 Qe7 14. Ne5 Bxe2 15. Qxe2 O-O 16. Rac1 Rac8 17. Bg5 Bb6 18. Bxf6 gxf6 19. Nc4 Rfd8 20. Nxb6 axb6 21. Rfd1 f5 22. Qe3 Qf6 23. d5 Rxd5 24. Rxd5 exd5 25. b3 Kh8 26. Qxb6 Rg8 27. Qc5 d4 28. Nd6 f4 29. Nxb7 Ne5 30. Qd5 f3 31. g3 Nd3 32. Rc7 Re8 33. Nc5 Re1+ 34. Kh2 Nxf2 0-1`
  },
  {
    id: 'carlsen-nepo',
    title: 'Carlsen vs Nepomniachtchi (2021 World Championship Game 6)',
    white: 'Magnus Carlsen',
    whiteRating: 2855,
    black: 'Ian Nepomniachtchi',
    blackRating: 2782,
    event: 'FIDE World Championship 2021',
    pgn: `[Event "FIDE World Championship 2021"]
[Site "Dubai UAE"]
[Date "2021.12.03"]
[White "Magnus Carlsen"]
[Black "Ian Nepomniachtchi"]
[Result "1-0"]

1. d4 Nf6 2. Nf3 d5 3. g3 e6 4. Bg2 Be7 5. O-O O-O 6. b3 c5 7. dxc5 Bxc5 8. c4 dxc4 9. Qc2 Qe7 10. Nbd2 Nc6 11. Nxc4 b5 12. Nce5 Nb4 13. Qb2 Bb7 14. a3 Nc6 15. Nd3 Bb6 16. Bg5 Rfd8 17. Bxf6 gxf6 18. Rac1 Nd4 19. Nxd4 Bxd4 20. Qa2 Bxg2 21. Kxg2 Qb7+ 22. Kg1 Qe4 23. Qc2 Bb6 24. Nb4 Qxc2 25. Rxc2 Rd6 26. Rfc1 Kg7 27. Kf1 Rad8 28. Ke1 f5 29. Nc6 Re8 30. e3 Kf6 31. Ke2 e5 32. Nb4 f4 33. Rc6 Ree6 34. Rxd6 Rxd6 35. e4 f3+ 36. Kxf3 Rd2 37. Nd5+ Kg7 38. Nxb6 axb6 39. Rc6 Rd3+ 40. Kg4 Rxb3 41. Rxb6 Rxa3 42. Rxb5 Ra2 43. Kf3 f6 44. Rd5 Kg6 45. Ke3 Ra3+ 46. Rd3 Ra1 47. h4 Re1+ 48. Kf3 h5 49. Rd6 Ra1 50. Rc6 Ra3+ 51. Kg2 Ra4 52. f3 Ra2+ 53. Kf1 Ra3 54. Ke2 Ra2+ 55. Ke3 Ra3+ 56. Kf2 Ra2+ 57. Kf1 Ra1+ 58. Kg2 Ra2+ 59. Kh3 Rf2 60. Rc3 Kh6 61. g4 hxg4+ 62. Kxg4 Kg6 63. Kg3 Rf1 64. Rc8 Rg1+ 65. Kh2 Ra1 66. Rg8+ Kh7 67. Rg2 Ra3 68. Kg3 Kh6 69. Kg4 Kg6 70. Rg3 Ra1 71. Rg2 Ra3 72. Rb2 Ra1 73. h5+ Kh6 74. Rb6 Rg1+ 75. Kf5 Rg3 76. Rxf6+ Kxh5 77. Kxe5 Rg8 78. f4 Ra8 79. Rd6 Re8+ 80. Re6 Ra8 81. Kf5 Ra5+ 82. e5 Ra8 83. Re7 Kh6 84. Kf6 Rf8+ 85. Rf7 Ra8 86. f5 Kh5 87. Rh7+ Kg4 88. Kg6 Ra5 89. Re7 Kf4 90. f6 1-0`
  }
];