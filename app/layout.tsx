import React from "react"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wave System #2027 | Gerador de Sensibilidade',
  description: 'Gerador de sensibilidade profissional para Free Fire',
  icons: { icon: '/wave-art.jpg', apple: '/wave-art.jpg' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        {children}
        <a className="discord-float" href="https://discord.gg/6pDAWPdNdb" target="_blank" rel="noopener noreferrer" aria-label="Entrar no Discord da Wave (abre em nova aba)" title="Entre no nosso Discord">
          <svg viewBox="0 0 127.14 96.36" aria-hidden="true" focusable="false"><path fill="currentColor" d="M107.7 8.07A105.15 105.15 0 0 0 81.63 0a72.06 72.06 0 0 0-3.34 6.85 97.68 97.68 0 0 0-29.44 0A72.37 72.37 0 0 0 45.46 0a105.89 105.89 0 0 0-26.08 8.09C2.9 32.45-1.57 56.2.66 79.62a105.73 105.73 0 0 0 31.99 16.14 77.7 77.7 0 0 0 6.85-11.14 68.42 68.42 0 0 1-10.79-5.19c.91-.66 1.8-1.35 2.66-2.07a75.57 75.57 0 0 0 64.38 0c.87.72 1.76 1.41 2.66 2.07a68.68 68.68 0 0 1-10.81 5.2 77 77 0 0 0 6.85 11.13 105.25 105.25 0 0 0 32.01-16.14c2.62-27.15-4.48-50.68-18.76-71.55ZM42.45 65.18c-6.26 0-11.4-5.75-11.4-12.75s5.03-12.76 11.4-12.76 11.51 5.8 11.4 12.76c.01 7-5.03 12.75-11.4 12.75Zm42.24 0c-6.26 0-11.4-5.75-11.4-12.75s5.03-12.76 11.4-12.76 11.51 5.8 11.4 12.76c0 7-5.03 12.75-11.4 12.75Z" /></svg>
          <span>Entre no Discord</span>
        </a>
      </body>
    </html>
  )
}
