// Port de src/Core/Board.h, src/Core/Constants.h y de las reglas de
// Game::TryPlace. La demo de la web juega con las mismas formas, el mismo
// reparto y la misma puntuación que el juego; si allí cambia algo, se cambia
// aquí también.

export const N = 10;
export const TRAY_SLOTS = 3;
export const NUM_COLORS = 7;
export const EMPTY = 0;
export const STONE = NUM_COLORS + 1;

export const SCORE_PER_BLOCK = 1;
export const SCORE_LEVEL_BONUS = 250;
export const CLEAN_BOARD_BONUS = 300;

/** Índice 0 sin uso; 1..7 piezas; 8 piedra (`kColors` en Game.cpp). */
export const COLORS = ['', '#e84848', '#f4922c', '#f6ce38', '#5cc454', '#3cbed6', '#4a70e2', '#a85cdc', '#6e7686'];

export interface Shape {
  w: number;
  h: number;
  /** Celdas ocupadas, [x, y]. */
  cells: [number, number][];
  weight: number;
  minLevel: number;
}

// "XX.|.XX" → forma. '|' separa filas.
function shape(s: string, weight: number, minLevel = 1): Shape {
  const cells: [number, number][] = [];
  let w = 0;
  let h = 0;
  s.split('|').forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c !== 'X') return;
      cells.push([x, y]);
      w = Math.max(w, x + 1);
      h = Math.max(h, y + 1);
    });
  });
  return { w, h, cells, weight, minLevel };
}

// Las piezas no rotan: cada orientación es una forma distinta.
export const SHAPES: Shape[] = [
  shape('X', 2),
  shape('XX', 4),             shape('X|X', 4),
  shape('XXX', 5),            shape('X|X|X', 5),
  shape('XX|X.', 4),          shape('XX|.X', 4),
  shape('X.|XX', 4),          shape('.X|XX', 4),
  shape('XX|XX', 6),
  shape('XXXX', 4),           shape('X|X|X|X', 4),
  shape('XXX|.X.', 3),        shape('.X.|XXX', 3),
  shape('X.|XX|X.', 3),       shape('.X|XX|.X', 3),
  shape('X.|X.|XX', 3),       shape('.X|.X|XX', 3),
  shape('XX|X.|X.', 3),       shape('XX|.X|.X', 3),
  shape('XXX|X..', 3),        shape('XXX|..X', 3),
  shape('X..|XXX', 3),        shape('..X|XXX', 3),
  shape('XX.|.XX', 2),        shape('.XX|XX.', 2),
  shape('X.|XX|.X', 2),       shape('.X|XX|X.', 2),
  shape('XXX|XXX', 3),        shape('XX|XX|XX', 3),
  shape('XXXXX', 2, 2),       shape('X|X|X|X|X', 2, 2),
  shape('XXX|XXX|XXX', 2, 3),
  shape('XXX|X..|X..', 2, 2), shape('XXX|..X|..X', 2, 2),
  shape('X..|X..|XXX', 2, 2), shape('..X|..X|XXX', 2, 2),
  shape('X.|.X', 1, 4),       shape('.X|X.', 1, 4),
  shape('XXX|.X.|.X.', 1, 5), shape('.X.|XXX|.X.', 1, 6),
];

export const levelQuota = (level: number) => Math.min(10 + 2 * (level - 1), 40);
export const levelObstacles = (level: number) => Math.min((level - 1) * 3, 30);

/** Líneas simultáneas cuentan cada vez más y la racha multiplica el total. */
export function linePoints(lines: number, combo: number): number {
  if (lines <= 0) return 0;
  const base = 100 * lines + 50 * lines * (lines - 1);
  return base * (1 + combo);
}

export type Board = number[];

export const emptyBoard = (): Board => new Array(N * N).fill(EMPTY);

export function fits(b: Board, s: Shape, gx: number, gy: number): boolean {
  if (gx < 0 || gy < 0 || gx + s.w > N || gy + s.h > N) return false;
  return s.cells.every(([x, y]) => b[(gy + y) * N + gx + x] === EMPTY);
}

export function anyFit(b: Board, s: Shape): boolean {
  for (let gy = 0; gy + s.h <= N; gy++)
    for (let gx = 0; gx + s.w <= N; gx++)
      if (fits(b, s, gx, gy)) return true;
  return false;
}

export function place(b: Board, s: Shape, gx: number, gy: number, color: number): Board {
  const out = b.slice();
  for (const [x, y] of s.cells) out[(gy + y) * N + gx + x] = color;
  return out;
}

export interface ClearInfo {
  rows: number[];
  cols: number[];
  lines: number;
  /** Índices de las celdas que se vacían. */
  cells: number[];
}

export function findFull(b: Board): ClearInfo {
  const rows: number[] = [];
  const cols: number[] = [];
  for (let i = 0; i < N; i++) {
    let row = true;
    let col = true;
    for (let j = 0; j < N; j++) {
      if (b[i * N + j] === EMPTY) row = false;
      if (b[j * N + i] === EMPTY) col = false;
    }
    if (row) rows.push(i);
    if (col) cols.push(i);
  }
  const cells: number[] = [];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++)
      if (rows.includes(y) || cols.includes(x)) cells.push(y * N + x);
  return { rows, cols, lines: rows.length + cols.length, cells };
}

export function applyClear(b: Board, c: ClearInfo): Board {
  const out = b.slice();
  for (const i of c.cells) out[i] = EMPTY;
  return out;
}

// Bloques sueltos al empezar un nivel. Nunca completan una línea.
export function scatter(b: Board, n: number): Board {
  const out = b.slice();
  let placed = 0;
  let guard = 0;
  while (placed < n && guard++ < 2000) {
    const i = Math.floor(Math.random() * N * N);
    if (out[i] !== EMPTY) continue;
    out[i] = STONE;
    if (findFull(out).lines > 0) { out[i] = EMPTY; continue; }
    placed++;
  }
  return out;
}

function randomShape(level: number): number {
  let total = 0;
  for (const s of SHAPES) if (s.minLevel <= level) total += s.weight;
  let pick = Math.floor(Math.random() * total);
  for (let i = 0; i < SHAPES.length; i++) {
    if (SHAPES[i].minLevel > level) continue;
    pick -= SHAPES[i].weight;
    if (pick < 0) return i;
  }
  return 0;
}

export interface TrayPiece {
  shape: number;
  color: number;
}

export type Tray = (TrayPiece | null)[];

// Reintenta hasta que todas caben (o, al menos, una): un reparto imposible
// sería una derrota que el jugador no ha provocado.
export function dealTray(b: Board, level: number, n: number): Tray {
  const roll = (): Tray =>
    Array.from({ length: TRAY_SLOTS }, (_, i) =>
      i < n ? { shape: randomShape(level), color: 1 + Math.floor(Math.random() * NUM_COLORS) } : null);
  const count = (t: Tray) => t.filter((p) => p && anyFit(b, SHAPES[p.shape])).length;
  let tray = roll();
  for (let t = 0; t < 40; t++) { if (count(tray) === n) return tray; tray = roll(); }
  for (let t = 0; t < 60; t++) { if (count(tray) > 0) return tray; tray = roll(); }
  if (n > 0 && tray[0]) tray[0] = { ...tray[0], shape: 0 };
  return tray;
}

export const trayHasMove = (t: Tray, b: Board) => t.some((p) => p && anyFit(b, SHAPES[p.shape]));

// ── Partida ────────────────────────────────────────────────────────────────

export interface Popup {
  id: number;
  text: string;
  tone: 'points' | 'big' | 'combo' | 'bonus' | 'small';
  /** Posición en celdas (centro), sobre el tablero. */
  x: number;
  y: number;
}

export interface GameState {
  board: Board;
  tray: Tray;
  level: number;
  score: number;
  quota: number;
  dealt: number;
  placed: number;
  combo: number;
  movesSinceClear: number;
  status: 'playing' | 'level-clear' | 'game-over';
  levelBonus: number;
  /** Celdas que acaban de limpiarse, con su color, para el destello. */
  flash: { cells: [number, number][]; key: number };
  popups: Popup[];
  seq: number;
}

function dealIfEmpty(s: GameState): GameState {
  if (s.tray.some(Boolean) || s.dealt >= s.quota) return s;
  const n = Math.min(TRAY_SLOTS, s.quota - s.dealt);
  return { ...s, tray: dealTray(s.board, s.level, n), dealt: s.dealt + n };
}

export function startLevel(level: number, score: number, seq = 0): GameState {
  const board = scatter(emptyBoard(), levelObstacles(level));
  return dealIfEmpty({
    board,
    tray: [null, null, null],
    level,
    score,
    quota: levelQuota(level),
    dealt: 0,
    placed: 0,
    combo: 0,
    movesSinceClear: 0,
    status: 'playing',
    levelBonus: 0,
    flash: { cells: [], key: seq },
    popups: [],
    seq,
  });
}

export function tryPlace(s: GameState, slot: number, gx: number, gy: number): GameState | null {
  const p = s.tray[slot];
  if (s.status !== 'playing' || !p) return null;
  const sh = SHAPES[p.shape];
  if (!fits(s.board, sh, gx, gy)) return null;

  let seq = s.seq;
  const cx = gx + sh.w / 2;
  const cy = gy + sh.h / 2;
  const popups: Popup[] = [];
  let board = place(s.board, sh, gx, gy, p.color);
  let score = s.score + sh.cells.length * SCORE_PER_BLOCK;
  let { combo, movesSinceClear } = s;
  let flash = s.flash;

  const c = findFull(board);
  if (c.lines > 0) {
    const pts = linePoints(c.lines, combo);
    score += pts;
    flash = { cells: c.cells.map((i) => [i, board[i]]), key: ++seq };
    board = applyClear(board, c);
    popups.push({ id: ++seq, text: `+${pts}`, tone: 'points', x: cx, y: cy });
    const names = ['', '', 'DOUBLE!', 'TRIPLE!', 'QUAD!', 'MEGA!'];
    if (c.lines >= 2) popups.push({ id: ++seq, text: names[Math.min(c.lines, 5)], tone: 'big', x: 5, y: 4.2 });
    if (combo > 0) popups.push({ id: ++seq, text: `COMBO X${combo + 1}`, tone: 'combo', x: 5, y: 5.8 });
    combo++;
    movesSinceClear = 0;
    if (board.every((v) => v === EMPTY)) {
      const bonus = CLEAN_BOARD_BONUS * s.level;
      score += bonus;
      popups.push({ id: ++seq, text: `CLEAN BOARD +${bonus}`, tone: 'bonus', x: 5, y: 3 });
    }
  } else {
    // La racha aguanta dos jugadas sin limpiar; la tercera la rompe.
    if (++movesSinceClear >= 3) combo = 0;
    popups.push({ id: ++seq, text: `+${sh.cells.length}`, tone: 'small', x: cx, y: cy });
  }

  const tray = s.tray.slice();
  tray[slot] = null;
  let next: GameState = {
    ...s, board, tray, score, combo, movesSinceClear, flash, popups, seq,
    placed: s.placed + 1,
  };

  if (next.placed >= next.quota) {
    const levelBonus = SCORE_LEVEL_BONUS * next.level;
    return { ...next, score: next.score + levelBonus, levelBonus, status: 'level-clear' };
  }
  next = dealIfEmpty(next);
  if (!trayHasMove(next.tray, next.board)) next = { ...next, status: 'game-over' };
  return next;
}
