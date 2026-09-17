import { asset } from '@/lib/asset';
import { Logo } from './NavBar';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-void px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <Logo />
          <p className="text-xs text-dim mt-3">A retro block puzzle by Javier Bascones. Built with C++, SDL3 and libxmp.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-label text-xs uppercase tracking-wider">
          {[
            ['Play', '#play'],
            ['Rules', '#rules'],
            ['Gallery', '#gallery'],
            ['Music', '#music'],
            ['Get it', '#download'],
            ['Privacy', asset('/privacy/')],
          ].map(([label, href]) => (
            <a key={label} href={href} className="text-dim hover:text-accent transition-colors">{label}</a>
          ))}
        </nav>
      </div>
      <p className="max-w-6xl mx-auto mt-8 text-[11px] text-off text-center md:text-left">
        © {new Date().getFullYear()} Javier Bascones
      </p>
    </footer>
  );
}
