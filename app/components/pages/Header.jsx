import Image from "next/image"
import LanguageSwitcher from "@/app/components/LanguageSwitcher"
import Link from "next/link"

export default function Header({ dict }) {
    return (
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="w-full flex items-center justify-between px-4 py-4 md:px-8 lg:px-12">
                <div className="flex items-center gap-4 flex-shrink-0">
                    <Link href="/" className="cursor-pointer">
                        <Image
                            src="/makka-edu.png"
                            alt={dict.header.title}
                            width={80}
                            height={70}
                            className="shadow-sm rounded-sm w-[80px] h-[70px] flex-shrink-0"
                        />
                    </Link>
                    <div className="text-start hidden sm:block ">
                        <h1 className="text-lg font-bold text-foreground md:text-xl lg:text-2xl ">{dict.header.title}</h1>
                        <p className="text-xs text-muted-foreground truncate md:text-sm">{dict.header.subtitle}</p>
                    </div>
                </div>

                <nav className="hidden gap-4 lg:gap-6 font-sans text-lg font-medium md:flex items-center flex-shrink-0">
                    <a href="#about" className="text-muted-foreground transition-colors hover:text-foreground">
                        {dict.header.nav.about}
                    </a>
                    <a href="#programs" className="text-muted-foreground transition-colors hover:text-foreground">
                        {dict.header.nav.programs}
                    </a>
                    <a href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">
                        {dict.header.nav.contact}
                    </a>
                    <LanguageSwitcher />
                </nav>

                <div className="md:hidden">
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    )
}
