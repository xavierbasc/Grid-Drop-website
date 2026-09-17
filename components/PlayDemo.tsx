'use client';
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { RotateCcw } from 'lucide-react';
import { Block, Piece } from './Block';
import {
  COLORS, N, SHAPES, TRAY_SLOTS, anyFit, findFull, fits, place, startLevel, tryPlace,
  type GameState,
} from '@/lib/game';

const BEST_KEY = 'griddrop.best';
// Con el dedo la pieza sube por encima del pulgar (DRAG_LIFT_TOUCH = 70 px con
// celdas de 30 en el juego).
const TOUCH_LIFT_CELLS = 2.3;
const TRAY_CELL = 15;

interface Drag {
  slot: number;
  x: number;
  y: number;
  touch: boolean;
  startX: number;
  startY: number;
  moved: boolean;
}

interface Target {
  slot: number;
  gx: number;
  gy: number;
}

function readBest(): number {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeBest(v: number) {
  try {
    window.localStorage.setItem(BEST_KEY, String(v));
  } catch {
    /* sin almacenamiento: el récord dura lo que la pestaña */
  }
}

export default function PlayDemo() {
  const [game, setGame] = useState<GameState | null>(null);
  const [best, setBest] = useState(0);
  const [drag, setDrag] = useState<Drag | null>(null);
  // Pieza elegida con teclado o con un toque, y dónde está su cursor.
  const [picked, setPicked] = useState<Target | null>(null);
  const [hoverCell, setHoverCell] = useState<[number, number] | null>(null);
  const [shaking, setShaking] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // La partida se crea en el cliente: el reparto es aleatorio y el HTML
  // estático no puede saberlo.
  useEffect(() => {
    setGame(startLevel(1, 0));
    setBest(readBest());
  }, []);

  useEffect(() => {
    if (game && game.score > best) {
      setBest(game.score);
      writeBest(game.score);
    }
  }, [game, best]);

  const cellSize = () => (gridRef.current ? gridRef.current.getBoundingClientRect().width / N : 32);

  // Casilla de destino para una pieza arrastrada: la misma cuenta que
  // Game::DragTarget, con la pieza centrada en el puntero.
  const dragTarget = useCallback((d: Drag): Target | null => {
    if (!game || !gridRef.current) return null;
    const p = game.tray[d.slot];
    if (!p) return null;
    const s = SHAPES[p.shape];
    const r = gridRef.current.getBoundingClientRect();
    const cell = r.width / N;
    const lift = d.touch ? cell * TOUCH_LIFT_CELLS : 0;
    const gx = Math.round((d.x - s.w * cell / 2 - r.left) / cell);
    const gy = Math.round((d.y - lift - s.h * cell / 2 - r.top) / cell);
    return fits(game.board, s, gx, gy) ? { slot: d.slot, gx, gy } : null;
  }, [game]);

  // Con una pieza elegida, el ratón sobre el tablero la mueve.
  const pickedTarget = useMemo((): Target | null => {
    if (!game || !picked) return null;
    const p = game.tray[picked.slot];
    if (!p) return null;
    let { gx, gy } = picked;
    if (hoverCell) {
      const s = SHAPES[p.shape];
      gx = Math.min(Math.max(hoverCell[0] - Math.floor((s.w - 1) / 2), 0), N - s.w);
      gy = Math.min(Math.max(hoverCell[1] - Math.floor((s.h - 1) / 2), 0), N - s.h);
    }
    return { slot: picked.slot, gx, gy };
  }, [game, picked, hoverCell]);

  const target = drag?.moved ? dragTarget(drag) : pickedTarget;
  const targetFits = !!(game && target && game.tray[target.slot] &&
    fits(game.board, SHAPES[game.tray[target.slot]!.shape], target.gx, target.gy));

  // Sombra de la pieza y líneas que completaría, teñidas de su color.
  const preview = useMemo(() => {
    const ghost = new Map<number, number>();
    const lines = new Set<number>();
    if (!game || !target || !targetFits) return { ghost, lines, color: 0 };
    const p = game.tray[target.slot]!;
    const s = SHAPES[p.shape];
    for (const [x, y] of s.cells) ghost.set((target.gy + y) * N + target.gx + x, p.color);
    const c = findFull(place(game.board, s, target.gx, target.gy, p.color));
    c.cells.forEach((i) => lines.add(i));
    return { ghost, lines, color: p.color };
  }, [game, target, targetFits]);

  const commit = useCallback((t: Target | null) => {
    if (!game || !t) return false;
    const next = tryPlace(game, t.slot, t.gx, t.gy);
    if (!next) return false;
    if (next.flash.key !== game.flash.key) {
      setShaking(true);
      window.setTimeout(() => setShaking(false), 260);
    }
    setGame(next);
    setPicked(null);
    return true;
  }, [game]);

  // Arrastre: los movimientos se escuchan en la ventana para no perder la
  // pieza si el puntero sale del tablero.
  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) => {
      setDrag((d) => d && {
        ...d,
        x: e.clientX,
        y: e.clientY,
        moved: d.moved || Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 6,
      });
    };
    const up = (e: PointerEvent) => {
      const d = { ...drag, x: e.clientX, y: e.clientY };
      if (drag.moved) {
        commit(dragTarget(d));
      } else if (game?.tray[drag.slot]) {
        // Un toque sin arrastre elige la pieza; otro toque la suelta.
        setPicked((p) => (p?.slot === drag.slot ? null : initialPick(game, drag.slot)));
      }
      setDrag(null);
    };
    const cancel = () => setDrag(null);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', cancel);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', cancel);
    };
  }, [drag, commit, dragTarget, game]);

  const onSlotDown = (slot: number, e: ReactPointerEvent) => {
    if (!game || game.status !== 'playing' || !game.tray[slot] || e.button > 0) return;
    e.preventDefault();
    setHoverCell(null);
    setDrag({ slot, x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY, touch: e.pointerType !== 'mouse', moved: false });
  };

  const onBoardClick = () => {
    if (pickedTarget) commit(pickedTarget);
  };

  const onBoardMove = (e: ReactPointerEvent) => {
    if (!picked || drag || e.pointerType !== 'mouse' || !gridRef.current) return;
    const r = gridRef.current.getBoundingClientRect();
    const cell = r.width / N;
    const x = Math.floor((e.clientX - r.left) / cell);
    const y = Math.floor((e.clientY - r.top) / cell);
    if (x >= 0 && y >= 0 && x < N && y < N) setHoverCell([x, y]);
  };

  // Un toque en el tablero con una pieza elegida la coloca centrada ahí.
  const onBoardPointerDown = (e: ReactPointerEvent) => {
    if (!picked || !gridRef.current || e.pointerType === 'mouse') return;
    const r = gridRef.current.getBoundingClientRect();
    const cell = r.width / N;
    setHoverCell([Math.floor((e.clientX - r.left) / cell), Math.floor((e.clientY - r.top) / cell)]);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!game || game.status !== 'playing') return;
    const k = e.key;
    if (k === '1' || k === '2' || k === '3') {
      const slot = Number(k) - 1;
      if (game.tray[slot]) { setHoverCell(null); setPicked(initialPick(game, slot)); }
      e.preventDefault();
      return;
    }
    if (!picked) return;
    const p = game.tray[picked.slot];
    if (!p) return;
    const s = SHAPES[p.shape];
    const base = pickedTarget ?? picked;
    const moveTo = (gx: number, gy: number) => {
      setHoverCell(null);
      setPicked({ slot: picked.slot, gx: Math.min(Math.max(gx, 0), N - s.w), gy: Math.min(Math.max(gy, 0), N - s.h) });
    };
    switch (k) {
      case 'ArrowLeft': moveTo(base.gx - 1, base.gy); break;
      case 'ArrowRight': moveTo(base.gx + 1, base.gy); break;
      case 'ArrowUp': moveTo(base.gx, base.gy - 1); break;
      case 'ArrowDown': moveTo(base.gx, base.gy + 1); break;
      case 'Enter':
      case ' ': commit(base); break;
      case 'Escape': setPicked(null); setHoverCell(null); break;
      default: return;
    }
    e.preventDefault();
  };

  const restart = () => {
    setPicked(null);
    setDrag(null);
    setGame(startLevel(1, 0, (game?.seq ?? 0) + 1));
    refocus();
  };

  const nextLevel = () => {
    if (!game) return;
    setPicked(null);
    setGame(startLevel(game.level + 1, game.score, game.seq + 1));
    refocus();
  };

  // El botón del modal desaparece al pulsarlo: sin esto el foco cae al
  // documento y el teclado deja de mover piezas.
  const refocus = () => window.setTimeout(() => gridRef.current?.focus({ preventScroll: true }), 0);

  const dragPiece = drag?.moved && game ? game.tray[drag.slot] : null;
  const cell = cellSize();
  const progress = game ? game.placed / game.quota : 0;

  return (
    <div className="relative w-full max-w-[420px] mx-auto select-none" onKeyDown={onKeyDown}>
      {/* Cabecera: SCORE / LEVEL / progreso */}
      <div className="panel relative px-4 pt-3 pb-3">
        <div className="absolute inset-x-1 top-1 h-[2px] bg-accent" />
        <div className="flex items-start justify-between">
          <div>
            <p className="font-label text-[10px] text-dim tracking-wider">SCORE</p>
            <p className="font-pixel text-xl text-accent mt-1 tabular-nums" aria-live="polite">{game?.score ?? 0}</p>
          </div>
          {game && game.combo > 1 && (
            <p className="font-label text-xs text-blue-hi mt-4 animate-blink">STREAK X{game.combo}</p>
          )}
          <div className="text-right">
            <p className="font-label text-[10px] text-dim tracking-wider">LEVEL</p>
            <p className="font-pixel text-xl text-accent mt-1">{game?.level ?? 1}</p>
          </div>
        </div>
        <div className="mt-3 h-3 well relative overflow-hidden" role="progressbar" aria-label="Level progress"
             aria-valuemin={0} aria-valuemax={game?.quota ?? 10} aria-valuenow={game?.placed ?? 0}>
          <div className="absolute inset-y-0 left-0 bg-ok transition-[width] duration-300"
               style={{ width: `${progress * 100}%`, boxShadow: 'inset 0 2px 0 #8ee09c, inset 0 -1px 0 #3c8a4c' }} />
        </div>
        <div className="mt-1.5 flex justify-between font-label text-[10px] text-dim">
          <span>PROGRESS</span>
          <span className="text-accent">{Math.round(progress * 100)}%</span>
        </div>
      </div>

      {/* Tablero */}
      <div className={`panel mt-3 p-2 ${shaking ? 'animate-shake' : ''}`}>
        <div
          ref={gridRef}
          role="grid"
          aria-label="Board, 10 by 10"
          tabIndex={0}
          className="relative grid grid-cols-10 aspect-square touch-none outline-none"
          onClick={onBoardClick}
          onPointerMove={onBoardMove}
          onPointerDown={onBoardPointerDown}
          onPointerLeave={() => setHoverCell(null)}
        >
          {Array.from({ length: N * N }, (_, i) => {
            const v = game?.board[i] ?? 0;
            const ghost = preview.ghost.get(i);
            const inLine = preview.lines.has(i);
            return (
              <div key={i} className="relative">
                <div className="absolute inset-[1px] bg-[#1a212c] shadow-[inset_1px_1px_0_#0e131a]" />
                {v !== 0 && (
                  <Block
                    key={`${i}-${v}`}
                    color={inLine ? COLORS[preview.color] : v}
                    className={`absolute inset-[1px] ${cell < 26 ? 'gblock-sm' : ''} animate-pop`}
                  />
                )}
                {v === 0 && ghost !== undefined && (
                  <Block color={ghost} className={`absolute inset-[1px] opacity-45 ${cell < 26 ? 'gblock-sm' : ''}`} />
                )}
                {v === 0 && ghost === undefined && inLine && (
                  <div className="absolute inset-[1px]" style={{ background: `${COLORS[preview.color]}40` }} />
                )}
              </div>
            );
          })}

          {/* Destello de las líneas limpiadas */}
          {game?.flash.cells.map(([i, color]) => (
            <Block
              key={`f-${game.flash.key}-${i}`}
              color={color}
              className="absolute pointer-events-none animate-flash-out"
              style={{
                left: `calc(${(i % N) * 10}% + 1px)`,
                top: `calc(${Math.floor(i / N) * 10}% + 1px)`,
                width: 'calc(10% - 2px)',
                height: 'calc(10% - 2px)',
                animationDelay: '0s',
              }}
            />
          ))}

          {/* Textos flotantes */}
          {game?.popups.map((p) => (
            <span
              key={p.id}
              className={`absolute pointer-events-none whitespace-nowrap font-pixel animate-float-up ${
                p.tone === 'big' ? 'text-lg text-accent' :
                p.tone === 'combo' ? 'text-sm text-blue-hi' :
                p.tone === 'bonus' ? 'text-xs text-ok' :
                p.tone === 'points' ? 'text-sm text-white' : 'text-[10px] text-dim'
              }`}
              style={{ left: `${p.x * 10}%`, top: `${p.y * 10}%`, textShadow: '0 2px 0 #000' }}
            >
              {p.text}
            </span>
          ))}

          {/* Modales */}
          {game?.status === 'level-clear' && (
            <Modal title="LEVEL CLEAR">
              <p className="font-pixel text-lg text-accent">LEVEL {game.level}</p>
              <p className="font-label text-base text-accent mt-2">COMPLETE!</p>
              <p className="font-label text-sm text-ok mt-4">LEVEL BONUS +{game.levelBonus}</p>
              <p className="font-label text-sm mt-1">SCORE {game.score}</p>
              <p className="font-label text-[10px] text-dim mt-2">
                NEXT: {Math.min(10 + 2 * game.level, 40)} PIECES · {Math.min(game.level * 3, 30)} STONES
              </p>
              <button type="button" className="btn btn-primary mt-5 w-full" onClick={nextLevel} autoFocus>Next level</button>
            </Modal>
          )}
          {game?.status === 'game-over' && (
            <Modal title="GAME OVER" danger>
              <p className="font-label text-base text-red">NO ROOM LEFT</p>
              <p className="font-label text-[10px] text-dim mt-3">FINAL SCORE</p>
              <p className="font-pixel text-2xl text-accent mt-1">{game.score}</p>
              {game.score > 0 && game.score >= best && <p className="font-label text-sm text-accent mt-2 animate-blink">NEW BEST!</p>}
              <p className="font-label text-sm mt-2">REACHED LEVEL {game.level}</p>
              <button type="button" className="btn btn-primary mt-5 w-full" onClick={restart} autoFocus>Play again</button>
            </Modal>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex items-center justify-between font-label text-xs text-dim">
        <span className="flex items-center gap-2">
          PIECES LEFT
          <span className={`font-pixel text-[11px] px-2 py-1 well ${game && game.quota - game.placed <= 3 ? 'text-warn' : 'text-accent'}`}>
            {game ? game.quota - game.placed : 10}/{game?.quota ?? 10}
          </span>
        </span>
        <span>BEST {best}</span>
      </div>

      {/* Bandeja */}
      <div className="panel mt-2 p-2 grid grid-cols-3 gap-2">
        {Array.from({ length: TRAY_SLOTS }, (_, slot) => {
          const p = game?.tray[slot] ?? null;
          const dragging = drag?.slot === slot && drag.moved;
          const selected = picked?.slot === slot;
          const usable = !!(p && game && anyFit(game.board, SHAPES[p.shape]));
          return (
            <button
              key={slot}
              type="button"
              aria-label={p ? `Piece ${slot + 1}${usable ? '' : ' (does not fit)'}` : `Slot ${slot + 1}, empty`}
              aria-pressed={selected}
              disabled={!p || game?.status !== 'playing'}
              onPointerDown={(e) => onSlotDown(slot, e)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && p && game && !picked) {
                  e.preventDefault();
                  e.stopPropagation();
                  setPicked(initialPick(game, slot));
                }
              }}
              className={`relative h-[104px] well flex items-center justify-center touch-none transition-shadow ${
                selected ? '!shadow-[0_0_0_2px_#ffd62a]' : ''
              } ${p ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
              <span className={`absolute left-1.5 top-1 font-label text-[10px] ${selected ? 'text-accent' : 'text-off'}`}>{slot + 1}</span>
              {p && !dragging && (
                <span key={`${game?.dealt}-${slot}`} className={`animate-pop ${usable ? '' : 'opacity-30 grayscale'}`}>
                  <Piece shape={p.shape} color={p.color} cell={TRAY_CELL} gap={1} small />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="font-label text-[10px] text-off leading-relaxed">
          Drag a piece · or tap it, then tap the board · keys 1 2 3, arrows, enter
        </p>
        <button type="button" onClick={restart} className="btn btn-ghost !px-3 !py-2 text-[11px] shrink-0">
          <RotateCcw size={14} /> Restart
        </button>
      </div>

      {/* Pieza arrastrada, a tamaño de tablero */}
      {dragPiece && drag && (
        <div
          className="fixed z-[60] pointer-events-none drop-shadow-[0_10px_12px_rgba(0,0,0,0.6)]"
          style={{
            left: drag.x - (SHAPES[dragPiece.shape].w * cell) / 2,
            top: drag.y - (drag.touch ? cell * TOUCH_LIFT_CELLS : 0) - (SHAPES[dragPiece.shape].h * cell) / 2,
          }}
        >
          <Piece shape={dragPiece.shape} color={dragPiece.color} cell={cell - 2} gap={2} small={cell < 26} />
        </div>
      )}
    </div>
  );
}

// Posición inicial del cursor para una pieza recién elegida: la primera casilla
// donde cabe, empezando por el centro.
function initialPick(game: GameState, slot: number): Target {
  const s = SHAPES[game.tray[slot]!.shape];
  const cx = Math.floor((N - s.w) / 2);
  const cy = Math.floor((N - s.h) / 2);
  let bestT: Target = { slot, gx: cx, gy: cy };
  let bestD = Infinity;
  for (let gy = 0; gy + s.h <= N; gy++)
    for (let gx = 0; gx + s.w <= N; gx++) {
      if (!fits(game.board, s, gx, gy)) continue;
      const d = Math.abs(gx - cx) + Math.abs(gy - cy);
      if (d < bestD) { bestD = d; bestT = { slot, gx, gy }; }
    }
  return bestT;
}

function Modal({ title, danger = false, children }: { title: string; danger?: boolean; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-void/70 backdrop-blur-[1px] p-4" role="dialog" aria-label={title}>
      <div className="panel w-full max-w-[280px] animate-pop">
        <div className="flex items-center justify-between px-3 py-1.5 bg-panel-hi border-b border-border">
          <span className={`font-label text-sm font-bold ${danger ? 'text-red' : 'text-text'}`}>
            <span className={`inline-block w-1 h-3 mr-2 align-[-1px] ${danger ? 'bg-red' : 'bg-accent'}`} />
            {title}
          </span>
          <span className={`font-label text-[10px] ${danger ? 'text-red' : 'text-accent'}`}>|||</span>
        </div>
        <div className="px-4 py-5 text-center">{children}</div>
      </div>
    </div>
  );
}
