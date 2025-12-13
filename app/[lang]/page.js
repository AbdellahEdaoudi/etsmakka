import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Phone, Sparkles } from "lucide-react"
import { getDictionary } from "@/lib/dictionaries"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default async function Home({ params }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  // Programs data mapped from dictionary
  const programs = dict.programs.items.map(item => ({
    ...item,
    // Map icons based on index or title if needed, 
    // but the dictionary includes icons as mapped in my generation script (I put icons in the dict object).
    // Let's ensure the dictionary generation script put the icons there.
    // Yes, I did put "icon": "🎓" etc in the JSON.
    icon: item.icon
  }))

  const isRtl = lang === 'ar';
  const isArabic = lang === 'ar';
  // Use serif (Amiri) for Arabic, sans (Geist) for others for better aesthetics
  const fontClass = isArabic ? 'font-serif' : 'font-sans';

  return (
    <div className={`min-h-screen bg-background ${fontClass}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-5 md:px-12">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Image
              src="/makka-edu.png"
              alt={dict.header.title}
              width={70}
              height={70}
              className="rounded-2xl shadow-sm object-cover w-[70px] h-[70px]"
            />
            <div className="text-start hidden sm:block">
              <h1 className="text-xl font-bold text-foreground md:text-2xl">{dict.header.title}</h1>
              <p className="text-sm text-muted-foreground">{dict.header.subtitle}</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden gap-8 font-sans text-lg font-medium md:flex items-center">
            <a href="#about" className="text-muted-foreground transition-colors hover:text-foreground">
              {dict.header.nav.about}
            </a>
            <a href="#programs" className="text-muted-foreground transition-colors hover:text-foreground">
              {dict.header.nav.programs}
            </a>
            <a href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">
              {dict.header.nav.contact}
            </a>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Language Switcher (visible if nav hidden) */}
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-5 md:px-12 ">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="order-2 text-start md:order-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-sans text-accent-foreground">
              <Sparkles className="h-4 w-4" />
              <span>{dict.hero.badge}</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
              {dict.hero.title_1}
              <br />
              <span className="text-primary">{dict.hero.title_2}</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {dict.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 font-sans text-base" asChild>
                <a href="#contact">{dict.hero.cta_contact}</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-sans text-base bg-transparent"
                asChild
              >
                <a href="#programs">{dict.hero.cta_programs}</a>
              </Button>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-primary/10 blur-3xl" />
              <Image
                src="/happy-children-learning-and-playing-in-kindergarte.jpg"
                alt={dict.hero.image_alt}
                width={500}
                height={500}
                className="relative rounded-3xl shadow-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="container mx-auto px-6 py-16 md:px-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">100%</div>
              <div className="font-sans text-sm text-muted-foreground">{dict.stats.satisfaction}</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">+800</div>
              <div className="font-sans text-sm text-muted-foreground">{dict.stats.graduates}</div>
            </div>

            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">+30</div>
              <div className="font-sans text-sm text-muted-foreground">{dict.stats.experience}</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl text-start">
          <h2 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">{dict.about.title}</h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              {dict.about.p1}
            </p>
            <p>
              {dict.about.p2}
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="bg-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-12 text-start">
            <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{dict.programs.title}</h2>
            <p className="text-lg text-muted-foreground">{dict.programs.subtitle}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {programs.map((program, i) => (
              <Card key={i} className="group overflow-hidden border-none bg-card transition-all hover:shadow-xl">
                <div className="p-8 text-start">
                  <div className="mb-6 text-6xl">{program.icon}</div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{program.title}</h3>
                  <p className="font-sans leading-relaxed text-muted-foreground">{program.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-primary transition-all group-hover:gap-3">
                    <span>{dict.programs.more}</span>
                    <span className="rtl:rotate-180">→</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl text-start">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{dict.contact.title}</h2>
          <p className="mb-12 text-lg text-muted-foreground">{dict.contact.subtitle}</p>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="group overflow-hidden border-none bg-accent/50 transition-all hover:bg-accent">
              <a href="tel:+212615075314" className="flex items-center gap-4 p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="text-start">
                  <div className="mb-1 font-sans text-sm text-muted-foreground">{dict.contact.phone}</div>
                  <div className="text-xl font-bold text-foreground">0615075314</div>
                </div>
              </a>
            </Card>
            <Card className="group overflow-hidden border-none bg-accent/50 transition-all hover:bg-accent">
              <a href="mailto:edaoudimakka10@gmail.com" className="flex items-center gap-4 p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="text-start">
                  <div className="mb-1 font-sans text-sm text-muted-foreground">{dict.contact.email}</div>
                  <div className="text-lg font-bold text-foreground break-all">edaoudimakka10@gmail.com</div>
                </div>
              </a>
            </Card>

            {/* Map Card */}
            <Card className="group overflow-hidden border-none bg-accent/50 transition-all hover:bg-accent md:col-span-2">
              <div className="p-2">
                <div className="flex items-center gap-4 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
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

                <div className="w-full h-[300px] rounded-xl overflow-hidden relative bg-muted shadow-inner m-2">
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
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-6 py-12 text-center md:px-12">
          <div className="mb-6">
            <Image
              src="/makka-edu.png"
              alt="Logo"
              width={60}
              height={60}
              className="mx-auto rounded-sm shadow-sm object-cover w-[60px] h-[60px]"
            />
          </div>
          <p className="font-sans text-sm text-muted-foreground">
            © {new Date().getFullYear()} {dict.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  )
}
