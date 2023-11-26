import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'ReAI Estate 2.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${openSans.className}`}>{children}</body>
    </html>
  )
}
