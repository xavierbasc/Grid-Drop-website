import { MousePointer2, Hand, Keyboard } from 'lucide-react';
import SectionHead from './SectionHead';

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[2rem] justify-center px-2 py-1 font-label text-xs text-text bg-panel-hi shadow-[0_0_0_1px_#3c4a5e,inset_0_-2px_0_#0c1016]">
      {children}
    </kbd>
  );
}

const rows: [React.ReactNode, string][] = [
  [<><Key>1</Key> <Key>2</Key> <Key>3</Key> <Key>Tab</Key></>, 'Pick a piece'],
  [<><Key>←</Key> <Key>↑</Key> <Key>↓</Key> <Key>→</Key></>, 'Move it'],
  [<><Key>Space</Key> <Key>Enter</Key></>, 'Place it'],
  [<Key key="esc">Esc</Key>, 'Drop the piece, or pause'],
  [<><Key>P</Key> <Key>M</Key></>, 'Pause · main menu'],
  [<Key key="f11">F11</Key>, 'Fullscreen'],
];

export default function Controls() {
  return (
    <section id="controls" className="py-20 md:py-28 bg-shell border-y border-border/50 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHead kicker="Controls" title="Mouse, finger or keyboard" />
        <div className="grid md:grid-cols-3 gap-4">
          <div className="panel p-5">
            <MousePointer2 className="text-accent" size={22} aria-hidden="true" />
            <h3 className="font-label font-bold text-sm uppercase tracking-wider mt-4">Mouse</h3>
            <p className="text-dim text-sm leading-relaxed mt-2">
              Drag a piece from the tray. The board shows where it lands and which lines it completes.
              Let go outside the board and it goes back to the tray.
            </p>
          </div>
          <div className="panel p-5">
            <Hand className="text-accent" size={22} aria-hidden="true" />
            <h3 className="font-label font-bold text-sm uppercase tracking-wider mt-4">Touch</h3>
            <p className="text-dim text-sm leading-relaxed mt-2">
              Same drag, but the piece floats above your thumb so it never hides the spot you&apos;re aiming for.
              It grows from tray size to board size as you pull it up.
            </p>
          </div>
          <div className="panel p-5">
            <Keyboard className="text-accent" size={22} aria-hidden="true" />
            <h3 className="font-label font-bold text-sm uppercase tracking-wider mt-4">Keyboard</h3>
            <dl className="mt-3 space-y-2.5">
              {rows.map(([keys, what], i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <dt className="flex flex-wrap gap-1">{keys}</dt>
                  <dd className="text-dim text-xs text-right">{what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
