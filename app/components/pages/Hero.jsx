import Image from "next/image"
import Link from "next/link"
import { Sparkles } from "@/app/components/Icons"

export default function Hero({ dict, lang }) {
    const isArabic = lang === 'ar';

    return (
        <section className="relative overflow-hidden pt-6 sm:pt-10 pb-12 lg:pb-16 bg-linear-to-b from-background via-primary/3 to-background">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-1/4 -right-32 w-150 h-150 rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-10 -left-32 w-125 h-125 rounded-full bg-primary/8 blur-[100px]" />
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                        backgroundSize: "32px 32px",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">

                    {/* Left Column: Headline & Content */}
                    <div className="text-start lg:col-span-7 space-y-6">
                        
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/25 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary shadow-xs backdrop-blur-md">
                            <Sparkles className="h-4 w-4" />
                            <span>{dict.hero.badge}</span>
                            <Sparkles className="h-4 w-4" />
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
                            {dict.hero.title_1}{" "}
                            <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-600 to-primary">
                                {dict.hero.title_2}
                                <svg className="absolute -bottom-2 left-0 w-full text-primary/30" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 15C50 5 150 5 295 15" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground font-light">
                            {dict.hero.description}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-1">
                            <Link
                                href="#contact"
                                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:bg-primary/95 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>{dict.hero.cta_contact}</span>
                                <span className="rtl:rotate-180">→</span>
                            </Link>

                            <Link
                                href="#programs"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md px-7 py-3.5 text-base font-semibold text-foreground transition-all hover:bg-accent hover:border-primary/40 hover:text-primary hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {dict.hero.cta_programs}
                            </Link>
                        </div>

                        {/* Key Features Quick Highlights */}
                        <div className="pt-5 border-t border-border/40 grid grid-cols-2 sm:grid-cols-3 gap-4 text-start">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary text-base">
                                    🏫
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-foreground/90">
                                    {dict.hero.highlight_1 || "التعليم الأولي والروض"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary text-base">
                                    ✍️
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-foreground/90">
                                    {dict.hero.highlight_2 || "دروس الدعم (1 - 6)"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary text-base">
                                    🏆
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-foreground/90">
                                    {dict.hero.highlight_3 || "تأطير شخصي مباشر"}
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Premium Modern Hero Visual Container */}
                    <div className={`flex justify-center lg:col-span-5 relative ${lang === 'es' ? 'lg:-mt-7 lg:-translate-y-4' : lang === 'ar' ? "" : lang === 'de' ?  "lg:-mt-4 lg:-translate-y-4" : lang === 'it' ?  "lg:-mt-4 lg:-translate-y-4" : "lg:-mt-16 lg:-translate-y-4"}`}>
                        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                            
                            {/* Decorative Animated Glow Behind Image */}
                            <div className="absolute -inset-2 rounded-3xl bg-linear-to-r from-primary/30 via-emerald-500/20 to-primary/30 blur-2xl opacity-70 animate-pulse" />

                            {/* Main Frame with Glassmorphism Border */}
                            <div className="relative rounded-3xl border border-primary/20 bg-background/80 p-2.5 shadow-2xl backdrop-blur-sm">
                                <div className="relative overflow-hidden rounded-2xl aspect-[4/3.8] sm:aspect-square">
                                    <Image
                                        src="/happy-children-learning-and-playing-in-kindergarte.jpg"
                                        alt={dict.hero.image_alt}
                                        width={600}
                                        height={600}
                                        priority
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                </div>

                                {/* Floating Rating Badge (Top Right) */}
                                <div className="absolute top-6 inset-e-6 flex items-center gap-2 rounded-2xl bg-background/90 backdrop-blur-md px-4 py-2 text-xs font-bold text-foreground shadow-xl border border-primary/20">
                                    <span className="text-amber-500 text-sm">⭐</span>
                                    <span>{dict.hero.rating}</span>
                                </div>

                                {/* Floating Feature Card (Bottom Center) */}
                                <div className="absolute -bottom-4 inset-x-6 mx-auto flex items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-card/95 backdrop-blur-xl p-4 shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary text-xl">
                                            🌟
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">{dict.stats.satisfaction}</p>
                                            <p className="text-xs font-medium text-muted-foreground">100% {dict.hero.highlight_3}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-extrabold text-primary bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
                                        100%
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}