'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

type SearchItem = {
  title: string
  description: string
  href: string
  type: string
}

export function SearchResults({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return items
    return items.filter((item) =>
      `${item.title} ${item.description} ${item.type}`.toLowerCase().includes(normalized)
    )
  }, [items, query])

  return (
    <>
      <label htmlFor="site-search" className="sr-only">Search the site</label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search..."
        className="mb-32 w-full rounded-(--radius-sm) border border-border bg-surface px-16 py-12 font-body text-body outline-none focus:border-accent"
        autoFocus
      />
      <div className="flex flex-col gap-16">
        {results.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-(--radius-sm) border border-border p-16 hover:border-accent">
            <span className="mb-4 block font-mono text-caption text-accent">{item.type}</span>
            <span className="font-display text-h4">{item.title}</span>
            <span className="mt-4 block font-body text-body text-text-secondary">{item.description}</span>
          </Link>
        ))}
        {results.length === 0 && (
          <p className="font-body text-body text-text-secondary">No results found.</p>
        )}
      </div>
    </>
  )
}
