import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OffTop | No pen. No prep. Just bars.',
  description: 'Freestyle rap practice challenge generator',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-offtop-dark text-white antialiased">
        {children}
      </body>
    </html>
  )
}
