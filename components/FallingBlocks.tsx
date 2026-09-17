import { Block } from './Block';

// Bloques sueltos que suben despacio por el fondo, como `bg_` en el menú del
// juego. Posiciones fijas (no aleatorias) para que el HTML estático y el del
// cliente coincidan.
const ITEMS = [
  { l: 6, s: 22, c: 2, d: 26, o: 0 },
  { l: 14, s: 10, c: 5, d: 19, o: 7 },
  { l: 27, s: 16, c: 7, d: 31, o: 12 },
  { l: 41, s: 8, c: 3, d: 17, o: 3 },
  { l: 55, s: 20, c: 4, d: 29, o: 18 },
  { l: 63, s: 12, c: 1, d: 23, o: 9 },
  { l: 74, s: 18, c: 6, d: 27, o: 4 },
  { l: 86, s: 9, c: 2, d: 21, o: 14 },
  { l: 93, s: 24, c: 5, d: 34, o: 22 },
];

export default function FallingBlocks() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {ITEMS.map((b, i) => (
        <div
          key={i}
          className="absolute animate-drift opacity-25"
          style={{ left: `${b.l}%`, top: '105%', animationDuration: `${b.d}s`, animationDelay: `-${b.o}s` }}
        >
          <Block color={b.c} className={b.s < 14 ? 'gblock-sm' : ''} style={{ width: b.s, height: b.s }} />
        </div>
      ))}
    </div>
  );
}
