export default function About({ dict }) {
    return (
        <section id="about" className="container mx-auto px-6 py-20 md:px-12 md:py-32">
            <div className="mx-auto max-w-4xl text-start">

                {/* Badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-medium text-primary">
                    ✦ {dict.about.badge}
                </div>

                <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    {dict.about.title}
                </h2>

                {/* خط أخضر */}
                <div className="mb-8 h-[3px] w-12 rounded-full bg-primary" />

                {/* الفقرات */}
                <div className="space-y-5 text-lg leading-[1.85] text-muted-foreground font-light">
                    <p>{dict.about.p1}</p>

                    {/* اقتباس بارز */}
                    <blockquote className="border-s-[3px] border-primary ps-5 my-6">
                        <p className="text-xl font-semibold text-foreground leading-relaxed italic">
                            {dict.about.quote}
                        </p>
                    </blockquote>

                    <p>{dict.about.p2}</p>
                </div>

                {/* بطاقات القيم */}
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {dict.about.values.map((v) => (
                        <div key={v.title} className="flex items-start gap-3 rounded-2xl bg-muted/40 border border-border p-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg">
                                {v.icon}
                            </span>
                            <div>
                                <p className="text-sm font-medium text-foreground">{v.title}</p>
                                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}