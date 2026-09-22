export default function Programs({ dict }) {
    const programs = dict.programs.items.map(item => ({
        ...item,
        icon: item.icon
    }))

    return (
        <section id="programs" className="bg-muted/30 py-20 md:py-28 border-y border-border/40">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="mb-12 text-start">
                    <h2 className="mb-4 text-4xl font-extrabold text-foreground md:text-5xl">{dict.programs.title}</h2>
                    <p className="text-lg text-muted-foreground font-light">{dict.programs.subtitle}</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {programs.map((program, i) => (
                        <div key={i} className="group overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:shadow-xl hover:-translate-y-1">
                            <div className="p-8 text-start flex flex-col justify-between h-full">
                                <div>
                                    <div className="mb-6 text-6xl">{program.icon}</div>
                                    <h3 className="mb-3 text-2xl font-bold text-foreground">{program.title}</h3>
                                    <p className="font-sans leading-relaxed text-muted-foreground font-light">{program.description}</p>
                                </div>
                                <div className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary transition-all group-hover:gap-3">
                                    <span>{dict.programs.more}</span>
                                    <span className="rtl:rotate-180">→</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
