import { Music } from 'lucide-react';
import SectionHead from './SectionHead';

// Los mismos créditos que la pantalla ABOUT del juego (Game::RenderCredits).
const groups: [string, string[]][] = [
  ['Menu', ['1400 — cs127']],
  ['Levels', [
    'Traxah Symphonee — Andreas Viklund', 'Never Too Late — cs127', 'Sunshine — cs127',
    'Dogs of Cyberspace — congusbongus', 'Lift Your Soul — Jam', 'Synthless — miafan2010',
    'Bulldogge — Pip Malt', 'S.S. Modula Three — Christofori', 'Blade of Fire — Zilly Mike',
    'Exosphere — cs127', 'The Destination — cs127', 'Greenochrome — Neurosys',
    'Frostbiter — Pip Malt', 'Raspberry Jam — congusbongus',
  ]],
  ['Credits', ['Christoforis Dream — Christofori', 'Floating in a Dream — cs127', 'Stars — cs127']],
  ['Game over', ['Tomorrow — cs127']],
];

export default function Soundtrack() {
  return (
    <section id="music" className="py-20 md:py-28 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHead kicker="Soundtrack" title="Tracker music from the demoscene">
          <p>
            The game plays classic module files — a new tune every level. Thanks to
            the musicians who made them.
          </p>
        </SectionHead>
        <div className="grid md:grid-cols-[1fr_2fr] gap-4">
          <div className="flex flex-col gap-4">
            {groups.filter(([g]) => g !== 'Levels').map(([g, tracks]) => (
              <div key={g} className="panel p-5">
                <h3 className="font-label font-bold text-sm uppercase tracking-wider section-tick">{g}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-dim">
                  {tracks.map((t) => <li key={t} className="flex gap-2"><Music size={14} className="mt-0.5 text-violet shrink-0" aria-hidden="true" />{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="panel p-5">
            <h3 className="font-label font-bold text-sm uppercase tracking-wider section-tick">Levels</h3>
            <ol className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-dim">
              {groups.find(([g]) => g === 'Levels')![1].map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="font-label text-accent w-5 text-right shrink-0">{i + 1}</span>{t}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
