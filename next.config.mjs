/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// GitHub Pages sirve el sitio bajo /Grid-Drop-website/. `lib/asset.ts` repite
// el mismo prefijo para <img>, <link> y url(), que la exportación estática no
// reescribe.
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/Grid-Drop-website' : '',
  assetPrefix: isProd ? '/Grid-Drop-website/' : '',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
