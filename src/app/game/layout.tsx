import '../globals.scss'
import './page_layout.scss'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import ThemeRegistry from "@/theme/ThemeRegistry";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'TheRepaintingGame',
    description: 'Repaint map and fun!',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {


    return (
        <html lang="en">
        <ThemeRegistry>
            <body className={inter.className}>{children}</body>
        </ThemeRegistry>
        </html>
    )
}
