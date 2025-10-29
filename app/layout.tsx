import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Language Learning App',
  description: 'Learn languages through interactive lessons and exercises',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
