import { cn } from '../../../lib/utils'

export function Section({
    children,
    size ='default',
    className
}: {
    children: React.ReactNode
    size?: 'small' | 'default' | 'large'
    className?: string
}) {
    const padding = {
        small: 'py-64',
        default: 'py-128',
        large: 'py-160'
    }
    return <section className={cn('relative', padding[size], className)}>{children}</section>
}