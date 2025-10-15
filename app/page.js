import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Phone, Sparkles } from "lucide-react"

export default function Home() {
  const programs = [
    {
      title: "التمهيدي الثاني",
      description: "إعداد شامل للمرحلة الابتدائية للأطفال من 5-6 سنوات",
      icon: "🎓",
    },
    
    {
      title: "التمهيدي الأول",
      description: "تطوير المهارات الأساسية للأطفال من 4-5 سنوات",
      icon: "📚",
    },
    
    {
      title: "الروض",
      description: "برنامج تعليمي متكامل للأطفال من 3-4 سنوات",
      icon: "🌱",
    },
  ]

  return (
    <div className="min-h-screen bg-background rtl font-serif">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex flex-row-reverse items-center justify-around px-6 py-5 md:px-12">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h1 className="text-xl font-bold text-foreground md:text-2xl">مؤسسة مكة المكرمة</h1>
              <p className="text-sm text-muted-foreground">للتربية والتعليم الأولي</p>
            </div>
            <Image
              src="/makka-edu.png"
              alt="شعار مؤسسة مكة المكرمة"
              width={70}
              height={70}
              className="rounded-2xl shadow-sm"
            />
            
          </div>
          <nav className="hidden gap-8 font-sans text-lg font-medium md:flex">
            <a href="#about" className="text-muted-foreground transition-colors hover:text-foreground">
              من نحن
            </a>
            <a href="#programs" className="text-muted-foreground transition-colors hover:text-foreground">
              البرامج
            </a>
            <a href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">
              تواصل معنا
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-5 md:px-12 ">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="order-2 text-right md:order-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-sans text-accent-foreground">
              <Sparkles className="h-4 w-4" />
              <span>بيئة تعليمية متميزة</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
              مستقبل مشرق
              <br />
              <span className="text-primary">لأطفالكم</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
              نوفر بيئة تربوية آمنة ومحفزة تساعد على تنمية مهارات الأطفال الأساسية من خلال برامج تعليمية حديثة ومتطورة
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 font-sans text-base" asChild>
                <a href="#contact">تواصل معنا</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-sans text-base bg-transparent"
                asChild
              >
                <a href="#programs">اكتشف برامجنا</a>
              </Button>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-primary/10 blur-3xl" />
              <Image
                src="/happy-children-learning-and-playing-in-kindergarte.jpg"
                alt="أطفال سعداء في الروضة"
                width={500}
                height={500}
                className="relative rounded-3xl shadow-2xl object-cover"
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
              <div className="font-sans text-sm text-muted-foreground">رضا أولياء الأمور</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">+800</div>
              <div className="font-sans text-sm text-muted-foreground">طفل متخرج</div>
            </div>
            
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">+30</div>
              <div className="font-sans text-sm text-muted-foreground">سنوات من الخبرة</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl text-right">
          <h2 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">من نحن</h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              مؤسسة مكة المكرمة للتربية والتعليم الأولي هي مؤسسة تعليمية رائدة في مدينة العيون، تأسست بهدف توفير تعليم
              نوعي للأطفال في مرحلة ما قبل المدرسة.
            </p>
            <p>
              نؤمن بأن السنوات الأولى من حياة الطفل هي الأساس لبناء شخصيته ومستقبله، لذلك نحرص على توفير بيئة تعليمية
              آمنة ومحفزة تساعد على تنمية مهاراته الأساسية.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="bg-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-12 text-right">
            <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">برامج المؤسسة</h2>
            <p className="text-lg text-muted-foreground">برامج تعليمية متكاملة لجميع المراحل العمرية</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {programs.map((program, i) => (
              <Card key={i} className="group overflow-hidden border-none bg-card transition-all hover:shadow-xl">
                <div className="p-8 text-right">
                  <div className="mb-6 text-6xl">{program.icon}</div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{program.title}</h3>
                  <p className="font-sans leading-relaxed text-muted-foreground">{program.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-primary transition-all group-hover:gap-3">
                    <span>معرفة المزيد</span>
                    <span>←</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl text-right">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">تواصل معنا</h2>
          <p className="mb-12 text-lg text-muted-foreground">نحن هنا للإجابة على جميع استفساراتكم</p>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="group overflow-hidden border-none bg-accent/50 transition-all hover:bg-accent">
              <a href="tel:+212615075314" className="flex items-center gap-4 p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="text-right">
                  <div className="mb-1 font-sans text-sm text-muted-foreground">الهاتف</div>
                  <div className="text-xl font-bold text-foreground">0615075314</div>
                </div>
              </a>
            </Card>
            <Card className="group overflow-hidden border-none bg-accent/50 transition-all hover:bg-accent">
              <a href="mailto:edaoudimakka10@gmail.com" className="flex items-center gap-4 p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="text-right">
                  <div className="mb-1 font-sans text-sm text-muted-foreground">البريد الإلكتروني</div>
                  <div className="text-lg font-bold text-foreground">edaoudimakka10@gmail.com</div>
                </div>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-6 py-12 text-center md:px-12">
          <div className="mb-6">
            <Image src="/makka-edu.png" alt="Logo" width={60} height={60} className="mx-auto rounded-sm shadow-sm" />
          </div>
          <p className="font-sans text-sm text-muted-foreground">
            © {new Date().getFullYear()} جميع الحقوق محفوظة — مؤسسة مكة المكرمة للتربية والتعليم الأولي — العيون
          </p>
        </div>
      </footer>
    </div>
  )
}
