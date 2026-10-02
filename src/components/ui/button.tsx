import { cn } from "../../../lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
    children: React.ReactNode
    href?: string
    variant?: 'primary' | 'secondary' | 'text'
    onClick?: () => void
    className?: string
}

export function Button({ children, href, variant = 'primary', onClick, className }: ButtonProps) {
    const base = 'inline-flex items-center gap-8 font-mono text-caption uppercase tracking-[0.08em] transition-all duration-[var(--duration-standard)] group'

    const variants = {
        primary: 'bg-[color:var(--color-accent)] text-white px-24 py-16 rounded-[var(--radius-sm)] shadow-[0_12px_32px_rgb(124_131_255/0.18)] hover:brightness-110 hover:-translate-y-0.5',
        secondary: 'border border-accent/50 px-24 py-16 rounded-[var(--radius-sm)] bg-surface/30 hover:border-accent-bright hover:bg-surface',
        text: 'text-[color:var(--color-text-primary)] underline-offset-4 decoration-transparent hover:text-accent-bright hover:decoration-current'
    }

    const content = (
        <>
            {children}
            {variant=='text' && (
                <ArrowRight size={16} className="transition-transform duration-(--duration-standard) group-hover:translate-x-[4px]"/>
            )}    
        </>
    )

    if (href) {
        return (
            <Link href={href} className={cn(base, variants[variant], className)}>
                {content}
            </Link>
        )
    }
    return (
        <button onClick={onClick} className={cn(base, variants[variant], className)}>
            {content}
        </button>
    )
}