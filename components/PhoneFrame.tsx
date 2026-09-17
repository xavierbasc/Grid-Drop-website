import { asset } from '@/lib/asset';

// Captura del juego (360×640 lógicos, guardada a 2×) dentro de un marco de
// teléfono. Sin `image-rendering: pixelated`: en la galería se muestra por
// debajo de 1× y el escalado por vecino más cercano destroza el texto.
export default function PhoneFrame({ src, alt, className = '', priority = false }: {
  src: string; alt: string; className?: string; priority?: boolean;
}) {
  return (
    <div className={`rounded-[2rem] bg-[#05070b] p-2.5 shadow-[0_0_0_1px_#3c4a5e,0_30px_60px_-20px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="relative overflow-hidden rounded-[1.5rem] bg-void">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(src)}
          alt={alt}
          width={360}
          height={640}
          loading={priority ? 'eager' : 'lazy'}
          className="block w-full h-auto"
        />
      </div>
    </div>
  );
}
