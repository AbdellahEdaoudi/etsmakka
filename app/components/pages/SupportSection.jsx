import Link from "next/link";

export default function SupportSection({ dict }) {
    if (!dict.support) return null;

    return (
        <section id="support" className="relative py-20 md:py-28 bg-linear-to-b from-background via-primary/5 to-background border-b border-border/40 overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                <div className="rounded-3xl border border-primary/20 bg-card/80 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
                    
                    {/* Header Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
                        {dict.support.badge}
                    </div>

                    <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                        {/* Content */}
                        <div className="lg:col-span-7 text-start space-y-5">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                                {dict.support.title}
                            </h2>
                            <p className="text-base sm:text-lg font-semibold text-primary">
                                {dict.support.subtitle}
                            </p>
                            <p className="text-base leading-relaxed text-muted-foreground font-light">
                                {dict.support.description}
                            </p>

                            {/* Features list */}
                            {dict.support.features && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                                    {dict.support.features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2.5 text-sm text-foreground/90 font-medium">
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                                                ✓
                                            </span>
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Visual Feature Card */}
                        <div className="lg:col-span-5 flex justify-center">
                            <div className="w-full max-w-md rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-8 text-center space-y-5 shadow-inner">
                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/15 text-5xl shadow-md">
                                    ✍️
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">
                                    {dict.support.card_title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {dict.support.card_subtitle}
                                </p>
                                <div className="rounded-xl bg-background/80 p-3.5 border border-border/50 text-xs font-semibold text-foreground">
                                    {dict.support.card_note}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
