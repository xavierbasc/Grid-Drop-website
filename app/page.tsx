import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import PlaySection from '@/components/PlaySection';
import Features from '@/components/Features';
import Levels from '@/components/Levels';
import Gallery from '@/components/Gallery';
import Controls from '@/components/Controls';
import Soundtrack from '@/components/Soundtrack';
import Download from '@/components/Download';
import Footer from '@/components/Footer';
import { DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

// Sin `offers`: el juego aún no está a la venta ni se descarga desde aquí.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: SITE_NAME,
  description: DESCRIPTION,
  genre: ['Puzzle'],
  applicationCategory: 'Game',
  url: SITE_URL,
  image: `${SITE_URL}og-image.png`,
  screenshot: ['menu', 'drag', 'clear', 'level-clear'].map((s) => `${SITE_URL}shots/${s}.png`),
  author: { '@type': 'Person', name: 'Javier Bascones' },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <main>
        <Hero />
        <PlaySection />
        <Features />
        <Levels />
        <Gallery />
        <Controls />
        <Soundtrack />
        <Download />
      </main>
      <Footer />
    </>
  );
}
