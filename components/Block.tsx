import type { CSSProperties } from 'react';
import { COLORS, SHAPES } from '@/lib/game';

/** Un bloque del juego, al tamaño de su contenedor. */
export function Block({ color, className = '', style }: { color: number | string; className?: string; style?: CSSProperties }) {
  const c = typeof color === 'number' ? COLORS[color] : color;
  return <div aria-hidden="true" className={`gblock ${className}`} style={{ ['--c' as string]: c, ...style }} />;
}

/** Una pieza del catálogo dibujada con bloques de `cell` px. */
export function Piece({ shape, color, cell, gap = 0, small = false }: {
  shape: number; color: number; cell: number; gap?: number; small?: boolean;
}) {
  const s = SHAPES[shape];
  const step = cell + gap;
  return (
    <div aria-hidden="true" className="relative" style={{ width: s.w * step - gap, height: s.h * step - gap }}>
      {s.cells.map(([x, y]) => (
        <Block
          key={`${x}-${y}`}
          color={color}
          className={`absolute ${small ? 'gblock-sm' : ''}`}
          style={{ left: x * step, top: y * step, width: cell, height: cell }}
        />
      ))}
    </div>
  );
}
