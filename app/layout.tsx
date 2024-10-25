import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { ProfileProvider } from './contexts/ProfileContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevFound Profile',
  description: 'Edit your DevFound profile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProfileProvider>{children}</ProfileProvider>
      </body>
    </html>
  )
}
