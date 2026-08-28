'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "../../../lib/utils"
import { Search, Moon } from "lucide-react"

const primaryLinks = [
    { href: '/projects', label: 'Projects'},
    { href: '/writing', label: 'Writing' },
    { href: '/learning', label: 'Learning' },
    { href: '/about', label: 'About'}
]

export function Nav() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav
            className={cn(
                'sticky top-0 z-50 h-18 flex items-center border-b transition-colors duration-(--duration-standard)',
                scrolled
                    ? 'bg-background/80 backdrop-blur-md border-border'
                    : 'bg-transparent border-transparent'
            )}
        >
            <div className="mx-auto max-w-(--container-content) w-full px-16 flex items-center justify-between">
                <Link href="/" className="font-display font-bold text-body-lg">
                    aditya
                </Link>

                <ul className="hidden md:flex items-center gap-32">
                    {primaryLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="text-text-secondary hover:text-text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-16">
                    <button aria-label="Search" className="p-8 hover:text-accent transition-colors">
                        <Search size={18} />
                    </button>
                    <button aria-label="Toggle theme" className="p-8 hover:text-accent transition-colors">
                        <Moon size={18} />
                    </button>
                </div>
            </div>
        </nav>
    )
}