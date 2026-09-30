import React from "react";
import { cn } from "../../../lib/utils";

export function Container({
    children,
    width='content',
    className
}: {
    children: React.ReactNode
    width?: 'content' | 'reading' | 'showcase'
    className?: string
}) {
    const widths = {
        content: 'max-w-[var(--container-content)]',
        reading: 'max-w-[var(--container-reading)]',
        showcase: 'max-w-[var(--container-showcase)]'
    }
    return <div className={cn('mx-auto w-full px-16', widths[width], className)}>{children}</div>
}