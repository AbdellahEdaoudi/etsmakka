import Image from "next/image"

export default function Footer({ dict }) {
    return (
        <footer className="border-t border-border/40 bg-muted/30">
            <div className="container mx-auto px-6 py-12 text-center md:px-12">
                <div className="mb-6">
                    <Image
                        src="/makka-edu.png"
                        alt="Logo"
                        width={60}
                        height={60}
                        className="mx-auto  shadow-sm w-[60px] h-[60px]"
                    />
                </div>
                <p className="font-sans text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {dict.footer.rights}
                </p>
            </div>
        </footer>
    )
}
