import { Ban, Layers, Flame, Mountain, Music, WifiOff, Save, Hand } from 'lucide-react';
import SectionHead from './SectionHead';

const features = [
  { icon: Ban, color: 'text-red', title: 'No rotation', text: 'Every orientation is its own piece. You can’t spin your way out — you have to leave room for it.' },
  { icon: Layers, color: 'text-cyan', title: 'Rows and columns', text: 'Complete a line in either direction. Clear several at once and the points climb fast.' },
  { icon: Flame, color: 'text-orange', title: 'Keep the streak', text: 'Clear again within your next three moves and the combo multiplies every line you score.' },
  { icon: Mountain, color: 'text-stone', title: 'Stones in the way', text: 'Later levels start with loose stone blocks already on the board. Lines clear them like anything else.' },
  { icon: Hand, color: 'text-yellow', title: 'Made for thumbs', text: 'Pieces lift above your finger while you drag, so you always see the gap you’re aiming at.' },
  { icon: Music, color: 'text-violet', title: 'Tracker soundtrack', text: 'Fourteen classic module tunes rotate level by level, over hand-synthesised sound effects.' },
  { icon: Save, color: 'text-ok', title: 'Pick up where you left', text: 'The game saves after every move. Close it mid-level and CONTINUE puts you right back.' },
  { icon: WifiOff, color: 'text-blue-hi', title: 'Offline, no strings', text: 'No ads, no accounts, no timers, no internet needed. Just you and the grid.' },
];

export default function Features() {
  return (
    <section id="rules" className="py-20 md:py-28 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHead kicker="The rules" title="Simple to learn. Hard to put down.">
          <p>Three pieces in the tray, a 10×10 grid and one question every move: where does this go without boxing me in?</p>
        </SectionHead>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, color, title, text }) => (
            <article key={title} className="panel p-5">
              <Icon className={color} size={22} aria-hidden="true" />
              <h3 className="font-label font-bold text-sm uppercase tracking-wider mt-4">{title}</h3>
              <p className="text-dim text-sm leading-relaxed mt-2">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
