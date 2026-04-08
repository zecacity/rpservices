import React from "react"
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'RP Services – Lavage & Hygiénisation Professionnelle',
  description: 'Service professionnel de lavage et hygiénisation de textiles et intérieurs auto à domicile dans le Canton de Vaud. Produits 100% vegan et écologiques.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
