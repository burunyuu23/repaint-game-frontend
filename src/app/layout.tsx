import './globals.scss'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import ThemeRegistry from "@/l5_shared/theme/ThemeRegistry";
import NavBar from "@/l2_widgets/navbar/navBar";
import React from "react";
import ReduxProvider from '@/l3_features/redux/reduxProvider';

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'DnlkkHub',
    description: 'Play my games, read my news, fun with me!',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <ThemeRegistry>
            <body className={inter.className}>

            <div className="particle particle-1"/>
            <div className="particle particle-2"/>
            <div className="particle particle-3"/>
            <div className="particle particle-4"/>
            <ReduxProvider>
                <NavBar/>
                <main>
                    {children}
                </main>
            </ReduxProvider>
            </body>
        </ThemeRegistry>
        </html>
    )
}
