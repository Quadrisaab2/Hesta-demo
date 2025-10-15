import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hesta - Postnatal Care',
  description: 'Personalized postnatal care journey for new mothers',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hesta'
  },
  formatDetection: {
    telephone: false
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-host antialiased">
        <div id="root" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}