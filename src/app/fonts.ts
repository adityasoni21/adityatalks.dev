import { Geist } from "next/font/google";
import { Newsreader } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";

export const geist = Geist({
    subsets: ['latin'],
    variable: '--font-geist',
    display: 'swap'
})

export const newsreader = Newsreader({
    subsets: ['latin'],
    variable: '--font-newsreader',
    display: 'swap'
})

export const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap'
})

