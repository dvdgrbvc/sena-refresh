import './globals.css'

export const metadata = {
  metadataBase: new URL('https://www.senasener.com'),
  title: {
    default: 'Sena Şener — Official Website',
    template: '%s · Sena Şener',
  },
  description: 'The official website of Sena Şener — music, live dates, videos, photography and management contact.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'Sena Şener — Official Website',
    description: 'Music, live dates, videos and photography.',
    url: 'https://www.senasener.com',
    siteName: 'Sena Şener',
    images: [{ url: '/editorial/hero-stage.webp', width: 1080, height: 1440 }],
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
