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
    const base = 'inline-flex items-center gap-8 transition-all duration-[var(--duration-standard)] group'

    const variants = {
        primary: 'bg-[color:var(--color-accent)] text-white px-24 py-16 rounded-[var(--radius-sm)] hover:brightness-110 hover:translate-y-[2px]',
        secondary: 'border border-[color:var(--color-border)] px-24 py-16 rounded-[var(--radius-sm)] bg-transparent hover:border-[color:var(--color-border)]',
        text: 'text-[color:var(--color-text-primary)] underline-offset-4 decoration-transparent hover:decoration-current'
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