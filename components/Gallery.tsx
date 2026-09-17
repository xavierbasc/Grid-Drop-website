import SectionHead from './SectionHead';
import PhoneFrame from './PhoneFrame';

const shots = [
  { src: '/shots/menu.png', label: 'Main menu', alt: 'Grid Drop main menu with the block logo and Continue, New Game, How to Play, Options, About and Quit' },
  { src: '/shots/drag.png', label: 'Line preview', alt: 'A piece being dragged: the row it would complete lights up in its colour' },
  { src: '/shots/clear.png', label: 'Line clear', alt: 'A row clearing with a +100 score popup' },
  { src: '/shots/level-clear.png', label: 'Level clear', alt: 'Level 5 complete dialog with the level bonus and the next quota' },
  { src: '/shots/how-to-play.png', label: 'How to play', alt: 'How to play screen with an animated demo and the rules' },
  { src: '/shots/game-over.png', label: 'Game over', alt: 'Game over dialog: no room left, final score and new best' },
  { src: '/shots/pause.png', label: 'Pause', alt: 'Pause dialog with resume, restart level, options and main menu' },
  { src: '/shots/options.png', label: 'Options', alt: 'Options screen with music and effects volume sliders' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHead kicker="Gallery" title="Straight from the game">
          <p>Unretouched captures of the real thing, pixel for pixel.</p>
        </SectionHead>
      </div>
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 pb-6 lg:max-w-6xl lg:mx-auto lg:grid lg:grid-cols-4 lg:overflow-visible">
        {shots.map((s) => (
          <figure key={s.src} className="snap-center shrink-0 w-[62vw] max-w-[240px] lg:w-auto lg:max-w-none">
            <PhoneFrame src={s.src} alt={s.alt} />
            <figcaption className="mt-3 text-center font-label text-xs uppercase tracking-wider text-dim">{s.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
