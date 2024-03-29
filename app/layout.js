import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Oasis3D',
  description: '3D environment to fulfill any Pergola configuration on demand',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/textures/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
