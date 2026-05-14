export default function About({ dict }) {
    return (
        <section id="about" className="container mx-auto px-6 py-20 md:px-12 md:py-32">
            <div className="mx-auto max-w-4xl text-start">
                <h2 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">{dict.about.title}</h2>
                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                    <p>{dict.about.p1}</p>
                    <p>{dict.about.p2}</p>
                </div>
            </div>
        </section>
    )
}
