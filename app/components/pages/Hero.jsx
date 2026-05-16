import Image from "next/image"
import { Sparkles } from "@/app/components/Icons"

export default function Hero({ dict }) {
    return (
        <section className="relative container mx-auto px-8 md:px-16 min-h-[calc(100vh-90px)] flex flex-col justify-center py-12 md:py-2">

            <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -top-20 -right-32 w-[550px] h-[550px] rounded-full bg-primary/5 blur-3xl" />
                <div
                    className="absolute bottom-10 -left-8 w-52 h-52 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, currentColor 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                />
            </div>

            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-20">

                {/* النص */}
                <div className="order-2 text-start md:order-1">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-5 py-2 text-sm font-medium text-primary">
                        <Sparkles className="h-4 w-4" />
                        <span>{dict.hero.badge}</span>
                    </div>

                    <h1 className="mb-6 text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.75rem]">
                        {dict.hero.title_1}
                        <br />

                        <span className="relative inline-block text-primary">
                            {dict.hero.title_2}
                            <span className="absolute bottom-0.5 left-0 right-0 h-[4px] rounded-full bg-primary/40" />
                        </span>
                    </h1>

                    <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl font-light">
                        {dict.hero.description}
                    </p>

                    <div className="flex flex-wrap gap-4">

                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-primary/25"
                        >
                            {dict.hero.cta_contact}
                        </a>

                        <a
                            href="#programs"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-transparent px-8 py-3.5 text-sm font-medium transition-all hover:bg-primary/5 hover:border-primary/40 hover:text-primary hover:-translate-y-0.5 active:scale-95"
                        >
                            {dict.hero.cta_programs}
                            <span aria-hidden="true">{dict.hero.cta_arrow}</span>
                        </a>

                    </div>
                </div>

                {/* الصورة */}
                <div className="order-1 flex justify-center md:order-2">

                    <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[480px] mt-8 mb-8 md:mt-0 md:mb-0">

                        <div className="pointer-events-none absolute -inset-4 rounded-[42px] border border-primary/20" />
                        <div className="pointer-events-none absolute -inset-8 rounded-[52px] border border-primary/10" />
                        <div className="pointer-events-none absolute -inset-2 rounded-[38px] bg-primary/5 blur-xl" />

                        <Image
                            src="/happy-children-learning-and-playing-in-kindergarte.jpg"
                            alt={dict.hero.image_alt}
                            width={520}
                            height={520}
                            priority
                            className="relative aspect-square rounded-[30px] border border-primary/10 object-cover shadow-2xl shadow-primary/15"
                        />

                        <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-primary/20 bg-background px-5 py-3 shadow-lg shadow-primary/10">

                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg">
                                🌱
                            </span>

                            <div>
                                <p className="text-lg font-bold leading-none text-foreground">
                                    100%
                                </p>

                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    {dict.stats.satisfaction}
                                </p>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-md shadow-primary/30">
                            <span>⭐</span>
                            {dict.hero.rating}
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}