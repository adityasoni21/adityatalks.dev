import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Footer() {
    return (
        <footer className="border-t border-border py-64 mt-160">
            <Container>
                <div className="flex flex-col gap-32">
                    <span className="font-display font-bold">aditya</span>

                    <nav className="flex flex-wrap gap-24 text-small text-text-secondary">
                        <Link href="/now">Now</Link>
                        <Link href="/timeline">Timeline</Link>
                        <Link href="/impossible">Impossible List</Link>
                        <Link href="/uses">Uses</Link>
                        <Link href="/contact">Contact</Link>
                    </nav>

                    <p className="text-small text-text-secondary">
                        Currently exploring: <span className="text-text-primary">agentic evaluation systems</span>
                    </p>

                    <div className="flex items-center justify-between border-t border-border pt-24">
                        <span className="text-caption text-text-secondary">
                            © {new Date().getFullYear()} Aditya Soni
                        </span>
                        <span className="text-caption text-text-secondary">
                            Everything begins with curiosity.
                        </span>
                    </div>
                </div>
            </Container>
        </footer>
    )
}