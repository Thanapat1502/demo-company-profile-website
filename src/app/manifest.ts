import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js + HeroUI App',
    short_name: 'NextHeroUI',
    description: 'A modern web application built with Next.js, TypeScript, Tailwind CSS, and HeroUI',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
