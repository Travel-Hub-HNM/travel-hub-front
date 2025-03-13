import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { MapProvider } from '@/shared/providers/MapProvider'
import '../src/app/globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Travel Hub',
    description: 'Travel Hub',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactElement
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <MapProvider>{children}</MapProvider>
            </body>
        </html>
    )
}
