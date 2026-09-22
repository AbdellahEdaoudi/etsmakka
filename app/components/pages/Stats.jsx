export default function Stats({ dict }) {
    return (
        <section className="border-y border-border/40 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="text-center">
                        <div className="mb-2 text-4xl font-extrabold text-primary md:text-5xl">100%</div>
                        <div className="font-sans text-sm font-medium text-muted-foreground">{dict.stats.satisfaction}</div>
                    </div>
                    <div className="text-center">
                        <div className="mb-2 text-4xl font-extrabold text-primary md:text-5xl">+1600</div>
                        <div className="font-sans text-sm font-medium text-muted-foreground">{dict.stats.graduates}</div>
                    </div>
                    <div className="text-center">
                        <div className="mb-2 text-4xl font-extrabold text-primary md:text-5xl">+30</div>
                        <div className="font-sans text-sm font-medium text-muted-foreground">{dict.stats.experience}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
