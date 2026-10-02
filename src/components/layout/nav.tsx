'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "../../../lib/utils"
import { Menu, Search, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const primaryLinks = [
    { href: '/writing', label: 'Writing' },
    { href: '/projects', label: 'Projects'},
    { href: '/learning', label: 'Learning' },
    { href: '/ideas', label: 'Ideas' },
    { href: '/books', label: 'Books' },
    { href: '/about', label: 'About' }
]

export function Nav() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav
            className={cn(
                'sticky top-0 z-50 h-18 flex items-center border-b transition-all duration-(--duration-standard)',
                scrolled
                    ? 'bg-background/75 backdrop-blur-xl border-border shadow-[0_12px_40px_rgb(0_0_0/0.18)]'
                    : 'bg-background/20 border-transparent'
            )}
        >
            <div className="mx-auto max-w-(--container-content) w-full px-16 flex items-center justify-between">
                <Link href="/" className="font-body text-h4 tracking-[-0.03em]">
                    Aditya<span className="text-accent-bright">Talks</span>
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
                    <Link href="/search" aria-label="Search" className="p-8 hover:text-accent transition-colors">
                        <Search size={18} />
                    </Link>
                    <ThemeToggle />
                    <button
                        type="button"
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={menuOpen}
                        className="p-8 md:hidden hover:text-accent transition-colors"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="absolute left-0 right-0 top-full border-b border-border bg-background md:hidden">
                    <ul className="mx-auto flex max-w-(--container-content) flex-col gap-4 px-16 py-16">
                        {primaryLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="block py-8 text-body-lg text-text-secondary hover:text-text-primary"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    )
}