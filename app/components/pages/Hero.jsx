import Image from "next/image"
import { Sparkles } from "@/app/components/Icons"

export default function Hero({ dict }) {
    return (
        <section className="container mx-auto px-6 md:px-12 min-h-[calc(100vh-90px)] flex flex-col justify-center py-6 md:py-0">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                <div className="order-2 text-start md:order-1">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-sans text-accent-foreground">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>{dict.hero.badge}</span>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                        {dict.hero.title_1}
                        <br />
                        <span className="text-primary">{dict.hero.title_2}</span>
                    </h1>
                    <p className="mb-6 text-base leading-relaxed text-muted-foreground md:text-lg max-w-lg">
                        {dict.hero.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-sans font-medium transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 shadow-lg shadow-primary/20"
                        >
                            {dict.hero.cta_contact}
                        </a>
                        <a
                            href="#programs"
                            className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-6 py-2.5 text-sm font-sans font-medium transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        >
                            {dict.hero.cta_programs}
                        </a>
                    </div>
                </div>

                <div className="order-1 flex justify-center md:order-2">
                    <div className="relative max-w-[320px] lg:max-w-[420px]">
                        <div className="absolute -inset-4 rounded-full bg-primary/10 blur-3xl" />
                        <Image
                            src="/happy-children-learning-and-playing-in-kindergarte.jpg"
                            alt={dict.hero.image_alt}
                            width={420}
                            height={420}
                            className="relative rounded-3xl shadow-2xl object-cover aspect-square"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
