import Image from "next/image"

export default function Footer({ dict }) {
    return (
        <footer className="border-t border-border/40 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 text-center">
                <div className="mb-6">
                    <Image
                        src="/etsmakka.jpeg"
                        alt="Logo"
                        width={60}
                        height={60}
                        className="mx-auto shadow-xs rounded-lg w-15 h-auto"
                    />
                </div>
                <p className="font-sans text-sm text-muted-foreground font-medium">
                    © {new Date().getFullYear()} {dict.footer.rights}
                </p>
            </div>
        </footer>
    )
}
