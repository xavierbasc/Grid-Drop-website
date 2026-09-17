export default function SectionHead({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-10 md:mb-14 max-w-2xl">
      <p className="font-label text-xs tracking-[0.25em] text-accent uppercase section-tick">{kicker}</p>
      <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl leading-snug mt-4 text-text">{title}</h2>
      {children && <div className="mt-5 text-dim text-base md:text-lg leading-relaxed">{children}</div>}
    </header>
  );
}
