import { Gamepad2, ChevronDown } from 'lucide-react';
import BlockTitle from './BlockTitle';
import PhoneFrame from './PhoneFrame';
import FallingBlocks from './FallingBlocks';
import { TAGLINE } from '@/lib/site';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-game pt-24 pb-16 md:pt-32 md:pb-24">
      <FallingBlocks />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-[1.15fr_1fr] gap-12 md:gap-8 items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="md:hidden"><BlockTitle px={9} /></div>
          <div className="hidden md:block lg:hidden"><BlockTitle px={11} /></div>
          <div className="hidden lg:block"><BlockTitle px={14} /></div>

          <p className="font-label text-sm tracking-[0.35em] text-dim uppercase mt-8">{TAGLINE}</p>
          <h1 className="mt-6 text-2xl sm:text-3xl font-bold leading-tight max-w-lg text-balance">
            A retro block puzzle where every piece counts.
          </h1>
          <p className="mt-4 text-dim text-base sm:text-lg max-w-lg leading-relaxed">
            Drag pieces onto a 10×10 grid, fill rows and columns to clear them, and place
            every piece to beat the level. No rotation — you have to make them fit.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a href="#play" className="btn btn-primary chamfer">
              <Gamepad2 size={18} /> Play in your browser
            </a>
            <a href="#download" className="btn btn-ghost chamfer">Get the game</a>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 font-label text-xs uppercase tracking-wider text-dim">
            <li><span className="text-ok">■</span> No timers</li>
            <li><span className="text-cyan">■</span> Offline</li>
            <li><span className="text-violet">■</span> No ads</li>
            <li><span className="text-orange">■</span> No accounts</li>
          </ul>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-0 -z-0 blur-3xl opacity-30 bg-[radial-gradient(circle_at_50%_40%,#ffd62a_0%,transparent_60%)]" />
          <PhoneFrame
            src="/shots/drag.png"
            alt="Grid Drop gameplay: a piece being dragged onto the board, with the row it would complete highlighted"
            className="relative w-[250px] sm:w-[290px]"
            priority
          />
        </div>
      </div>

      <a href="#play" aria-label="Scroll to the playable demo" className="relative mt-14 flex justify-center text-dim hover:text-accent">
        <ChevronDown className="animate-bob" />
      </a>
    </section>
  );
}
