import { Apple, Monitor, Smartphone, Terminal, Gamepad2 } from 'lucide-react';
import SectionHead from './SectionHead';

// Ninguna plataforma está publicada todavía. Cuando haya ficha o binario, se
// pone su `url` y la tarjeta se enciende sola; hasta entonces no se enlaza a
// nada que no exista.
const platforms: { name: string; detail: string; icon: typeof Apple; url: string | null }[] = [
  { name: 'macOS', detail: 'Desktop', icon: Apple, url: null },
  { name: 'Windows', detail: 'Desktop', icon: Monitor, url: null },
  { name: 'Linux', detail: 'Desktop', icon: Terminal, url: null },
  { name: 'iPhone', detail: 'Portrait, made for touch', icon: Smartphone, url: null },
  { name: 'Android', detail: 'Portrait, made for touch', icon: Smartphone, url: null },
];

export default function Download() {
  return (
    <section id="download" className="relative py-20 md:py-28 overflow-hidden bg-game scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHead kicker="Get the game" title="Coming to desktop and mobile">
          <p>
            The full version of Grid Drop — with
            music, saves and every level — is on its way. Until then, the demo above plays
            by exactly the same rules.
          </p>
        </SectionHead>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {platforms.map(({ name, detail, icon: Icon, url }) => {
            const body = (
              <>
                <Icon size={26} className={url ? 'text-accent' : 'text-off'} aria-hidden="true" />
                <p className="font-label font-bold text-base mt-4">{name}</p>
                <p className="text-dim text-xs mt-1">{detail}</p>
                <p className={`font-label text-[11px] mt-4 uppercase tracking-wider ${url ? 'text-accent' : 'text-off'}`}>
                  {url ? 'Download' : 'Coming soon'}
                </p>
              </>
            );
            return url ? (
              <a key={name} href={url} className="panel p-5 hover:shadow-[0_0_0_1px_#ffd62a] transition-shadow">{body}</a>
            ) : (
              <div key={name} className="panel p-5" aria-label={`${name}: coming soon`}>{body}</div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#play" className="btn btn-primary chamfer"><Gamepad2 size={18} /> Play the web demo</a>
        </div>
      </div>
    </section>
  );
}
