import type { Config } from 'tailwindcss';

// Paleta sacada del juego: `Pal` en src/UI/UIKit.h y `kColors` en
// src/Core/Game.cpp. La web y el juego tienen que parecer el mismo objeto.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void:       '#080b10',
        shell:      '#12171f',
        panel:      '#1c232e',
        'panel-hi': '#262f3d',
        sunk:       '#131921',
        border:     '#3c4a5e',
        'border-hi':'#6c809c',
        text:       '#e4eaf3',
        dim:        '#8c9aae',
        off:        '#606c7e',
        accent:     '#ffd62a',
        'accent-dk':'#b08e10',
        'accent-lo':'#5c4c0e',
        blue:       '#567aca',
        'blue-hi':  '#8eb0f0',
        ok:         '#60c274',
        warn:       '#ec9e2e',
        red:        '#e84848',
        orange:     '#f4922c',
        yellow:     '#f6ce38',
        green:      '#5cc454',
        cyan:       '#3cbed6',
        cobalt:     '#4a70e2',
        violet:     '#a85cdc',
        stone:      '#6e7686',
      },
      fontFamily: {
        pixel: ['var(--font-pixel)', 'monospace'],
        label: ['var(--font-label)', 'monospace'],
        body:  ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
