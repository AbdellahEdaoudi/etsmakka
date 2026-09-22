export default function About({ dict }) {
    return (
        <section id="about" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28">
            <div className="text-start">

                {/* Badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-semibold text-primary">
                    ✦ {dict.about.badge}
                </div>

                <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    {dict.about.title}
                </h2>

                {/* خط أخضر */}
                <div className="mb-8 h-0.75 w-14 rounded-full bg-primary" />

                {/* الفقرات */}
                <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-7 space-y-6 text-lg leading-[1.85] text-muted-foreground font-light">
                        <p>{dict.about.p1}</p>
                        
                        {dict.about.p2 && <p>{dict.about.p2}</p>}

                        {/* اقتباس بارز */}
                        <blockquote className="border-s-4 border-primary ps-5 py-2 my-6 bg-primary/5 rounded-e-2xl">
                            <p className="text-xl font-semibold text-foreground leading-relaxed italic">
                                {dict.about.quote}
                            </p>
                        </blockquote>
                    </div>

                    {/* بطاقات القيم */}
                    <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                        {dict.about.values.map((v) => (
                            <div key={v.title} className="flex items-start gap-4 rounded-2xl bg-card border border-border/60 p-5 shadow-sm hover:border-primary/30 transition-colors">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xl shadow-xs">
                                    {v.icon}
                                </span>
                                <div>
                                    <p className="text-base font-bold text-foreground">{v.title}</p>
                                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}