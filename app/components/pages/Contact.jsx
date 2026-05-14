import { Mail, Phone } from "@/app/components/Icons"
import ContactForm from "@/app/components/ContactForm"

export default function Contact({ dict }) {
    return (
        <section id="contact" className="container mx-auto px-6 py-20 md:px-12 md:py-32">
            <div className="mx-auto max-w-4xl text-start">
                <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{dict.contact.title}</h2>
                <p className="mb-12 text-lg text-muted-foreground">{dict.contact.subtitle}</p>
                
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="group overflow-hidden rounded-3xl border border-border/50 bg-accent/50 transition-all hover:bg-accent hover:-translate-y-1">
                        <a href="tel:+212615075314" className="flex items-center gap-4 p-8">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-start">
                                <div className="mb-1 font-sans text-sm text-muted-foreground">{dict.contact.phone}</div>
                                <div className="text-xl font-bold text-foreground">0615075314</div>
                            </div>
                        </a>
                    </div>
                    <div className="group overflow-hidden rounded-3xl border border-border/50 bg-accent/50 transition-all hover:bg-accent hover:-translate-y-1">
                        <a href="mailto:edaoudimakka10@gmail.com" className="flex items-center gap-4 p-8">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-start">
                                <div className="mb-1 font-sans text-sm text-muted-foreground">{dict.contact.email}</div>
                                <div className="text-lg font-bold text-foreground break-all">edaoudimakka10@gmail.com</div>
                            </div>
                        </a>
                    </div>

                    <div className="group overflow-hidden rounded-3xl border border-border/50 bg-accent/50 transition-all hover:bg-accent md:col-span-2">
                        <div className="p-2">
                            <div className="flex items-center gap-4 p-6">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div className="text-start">
                                    <div className="mb-1 font-sans text-sm text-muted-foreground">{dict.contact.location}</div>
                                    <a href="https://maps.app.goo.gl/jYiT9zbzR4x1faYf8" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-foreground hover:underline">
                                        {dict.contact.address}
                                    </a>
                                </div>
                            </div>
                            <div className="w-full h-[300px] rounded-2xl overflow-hidden relative bg-muted shadow-inner m-2">
                                <iframe
                                    src="https://maps.google.com/maps?q=27.136371,-13.199033&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                    title="Location Map"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 bg-card border border-border/50 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-primary/5">
                    <ContactForm dict={dict} />
                </div>
            </div>
        </section>
    )
}
