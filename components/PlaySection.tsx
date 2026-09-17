import PlayDemo from './PlayDemo';
import SectionHead from './SectionHead';

export default function PlaySection() {
  return (
    <section id="play" className="relative py-20 md:py-28 bg-shell border-y border-border/50 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHead kicker="Try it now" title="Play a round right here">
            <p>
              This is the real rule set — the same piece catalogue, the same deal and the same
              scoring as the game. Your best score stays in this browser.
            </p>
          </SectionHead>
          <ol className="space-y-4 max-w-md">
            {[
              ['1', 'Drag a piece from the tray onto the board.'],
              ['2', 'Fill a whole row or column and it clears.'],
              ['3', 'Place every piece in the level to move on.'],
              ['4', 'The game ends when nothing in the tray fits.'],
            ].map(([n, t]) => (
              <li key={n} className="flex gap-4 items-start">
                <span className="font-pixel text-xs text-void bg-accent w-7 h-7 shrink-0 flex items-center justify-center chamfer">{n}</span>
                <span className="text-text/90 pt-1">{t}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-dim max-w-md">
            Greyed-out pieces don&apos;t fit anywhere right now. Plan ahead: pieces never rotate.
          </p>
        </div>
        <PlayDemo />
      </div>
    </section>
  );
}
