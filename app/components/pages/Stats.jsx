export default function Stats({ dict }) {
    return (
        <section className="border-y border-border/40 bg-muted/30">
            <div className="container mx-auto px-6 py-16 md:px-12">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="text-center">
                        <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">100%</div>
                        <div className="font-sans text-sm text-muted-foreground">{dict.stats.satisfaction}</div>
                    </div>
                    <div className="text-center">
                        <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">+1600</div>
                        <div className="font-sans text-sm text-muted-foreground">{dict.stats.graduates}</div>
                    </div>
                    <div className="text-center">
                        <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">+30</div>
                        <div className="font-sans text-sm text-muted-foreground">{dict.stats.experience}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
