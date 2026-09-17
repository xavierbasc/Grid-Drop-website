'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Block } from './Block';

const links = [
  { label: 'Play', href: '#play' },
  { label: 'Rules', href: '#rules' },
  { label: 'Levels', href: '#levels' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Controls', href: '#controls' },
  { label: 'Get it', href: '#download' },
];

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid grid-cols-2 gap-[2px]" aria-hidden="true">
        <Block color={3} className="gblock-sm w-2.5 h-2.5" />
        <Block color={1} className="gblock-sm w-2.5 h-2.5" />
        <Block color={5} className="gblock-sm w-2.5 h-2.5" />
        <Block color={4} className="gblock-sm w-2.5 h-2.5" />
      </span>
      <span className="font-pixel text-[11px] tracking-wider text-text">
        GRID <span className="text-accent">DROP</span>
      </span>
    </span>
  );
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-void/90 backdrop-blur-md border-b border-border/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#top" aria-label="Grid Drop — back to top"><Logo /></a>

        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-label text-xs uppercase tracking-wider text-dim hover:text-accent transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#play" className="hidden md:inline-flex btn btn-primary chamfer !py-2 !px-4 text-xs">Play now</a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 -mr-2 text-accent"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <ul className="md:hidden px-4 pb-5 pt-1 flex flex-col gap-1 border-t border-border/60">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 font-label text-sm uppercase tracking-wider text-text hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
