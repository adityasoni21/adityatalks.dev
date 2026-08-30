import Image from "next/image";

export function ArtifactCard({
    image,
    context,
    capturedAt,
    connectedTitle,
    connectedHref
}: {
    image: { src: string; width: number; height: number; blurhash?: string }
    context: string
    capturedAt: string
    connectedTitle?: string
    connectedHref?: string
}) {
    const date = new Date(capturedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    return (
        <div className="rounded-(--radius-md) border border-border bg-surface overflow-hidden">
            <div className="relative aspect-video">
                <Image src={image.src} alt={context} fill className="object-cover" />
            </div>
            <div className="p-24 flex flex-col gap-8">
                <p className="font-body text-body">{context}</p>
                <span className="text-caption text-text-secondary">{date}</span>
                {connectedHref && connectedTitle && (
                    <a href={connectedHref} className="text-small text-(--text-accent) hover:underline">
                        Connected to: {connectedTitle}
                    </a>
                )}
            </div>
        </div>
    )
}