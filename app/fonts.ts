// next/font las descarga al compilar y las sirve desde el propio dominio: la
// página no pide nada a Google en tiempo de ejecución.
import { Press_Start_2P, Silkscreen, Space_Grotesk } from 'next/font/google';

// Rótulos grandes: el pixel más gordo, como el de las cabeceras del juego.
export const pixel = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel',
  display: 'swap',
});

// Etiquetas, marcadores y botones: pixel fino, como TS::Small / TS::Label.
export const label = Silkscreen({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-label',
  display: 'swap',
});

// Texto corrido: legible a cualquier tamaño.
export const body = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});
