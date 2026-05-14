export default function Programs({ dict }) {
    const programs = dict.programs.items.map(item => ({
        ...item,
        icon: item.icon
    }))

    return (
        <section id="programs" className="bg-muted/30 py-20 md:py-32">
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-12 text-start">
                    <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{dict.programs.title}</h2>
                    <p className="text-lg text-muted-foreground">{dict.programs.subtitle}</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {programs.map((program, i) => (
                        <div key={i} className="group overflow-hidden rounded-3xl border border-border/50 bg-card transition-all hover:shadow-xl hover:-translate-y-1">
                            <div className="p-8 text-start">
                                <div className="mb-6 text-6xl">{program.icon}</div>
                                <h3 className="mb-3 text-2xl font-bold text-foreground">{program.title}</h3>
                                <p className="font-sans leading-relaxed text-muted-foreground">{program.description}</p>
                                <div className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-primary transition-all group-hover:gap-3">
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
