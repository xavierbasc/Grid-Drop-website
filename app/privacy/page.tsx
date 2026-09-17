import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { asset } from '@/lib/asset';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'Grid Drop collects no personal data. Settings and saves stay on your device.',
  alternates: { canonical: 'privacy/' },
};

const UPDATED = '17 September 2026';

export default function Privacy() {
  return (
    <>
      <NavBar />
      <main className="pt-28 pb-20 px-4 sm:px-6">
        <article className="max-w-2xl mx-auto">
          <p className="font-label text-xs tracking-[0.25em] text-accent uppercase section-tick">Privacy</p>
          <h1 className="font-pixel text-xl sm:text-2xl leading-snug mt-4">Privacy policy</h1>
          <p className="text-dim text-sm mt-3">Last updated: {UPDATED}</p>

          <div className="mt-10 space-y-8 text-text/90 leading-relaxed [&_h2]:font-label [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-wider [&_h2]:text-accent [&_h2]:mb-3 [&_p]:text-dim [&_li]:text-dim">
            <section>
              <h2>The short version</h2>
              <p>
                Grid Drop does not collect, store or share any personal data. It has no accounts,
                no ads, no analytics and no tracking, and it never connects to the internet.
              </p>
            </section>

            <section>
              <h2>What the game keeps on your device</h2>
              <p>The game writes two small files to its own app folder, and nowhere else:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong className="text-text">Settings</strong> — music and effects volume, fullscreen, whether you have seen How to Play, and your best score.</li>
                <li><strong className="text-text">Saved game</strong> — the level, score and board in progress, so CONTINUE works. It is deleted when a game ends.</li>
              </ul>
              <p className="mt-3">
                These files never leave your device. Uninstalling the game removes them.
              </p>
            </section>

            <section>
              <h2>Permissions</h2>
              <p>
                The game needs no permissions. On some platforms the store listing mentions camera,
                microphone or Bluetooth: that is only because the game framework it is built on
                includes support for them. Grid Drop never uses the camera or microphone, and
                Bluetooth is only ever used by the system to talk to a game controller you have paired.
              </p>
            </section>

            <section>
              <h2>This website</h2>
              <p>
                This site is a static page hosted on GitHub Pages. It sets no cookies and loads no
                third-party scripts; its fonts are served from the site itself. The web demo keeps
                your best score in your browser&apos;s local storage, which you can clear at any time.
                GitHub may keep standard server logs (such as IP addresses) as described in the{' '}
                <a className="text-accent underline" href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub Privacy Statement</a>.
              </p>
            </section>

            <section>
              <h2>Children</h2>
              <p>Grid Drop is suitable for all ages and collects no data from anyone, children included.</p>
            </section>

            <section>
              <h2>Changes and contact</h2>
              <p>
                If this policy changes, the new version will be published on this page with a new date.
                Questions? Open an issue on{' '}
                <a className="text-accent underline" href="https://github.com/xavierbasc/Grid-Drop-website/issues">GitHub</a>.
              </p>
            </section>

            <p><a href={asset('/')} className="text-accent underline">← Back to Grid Drop</a></p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
