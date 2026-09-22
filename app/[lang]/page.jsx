import { getTranslation } from '@/app/translations/load-translations';
import Header from '@/app/components/pages/Header';
import Hero from '@/app/components/pages/Hero';
import Stats from '@/app/components/pages/Stats';
import About from '@/app/components/pages/About';
import Programs from '@/app/components/pages/Programs';
import SupportSection from '@/app/components/pages/SupportSection';
import Contact from '@/app/components/pages/Contact';
import Footer from '@/app/components/pages/Footer';

export async function generateStaticParams() {
    return ['ar', 'fr', 'en', 'es', 'de', 'it'].map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getTranslation(lang);

    return {
        title: dict.meta.title,
        description: dict.meta.description,
        keywords: dict.meta.keywords ? dict.meta.keywords.split(',') : [],
        openGraph: {
            title: dict.meta.title,
            description: dict.meta.description,
            url: `https://etsmakka.vercel.app/${lang}`,
            locale: lang,
            type: "website",
            images: [
                {
                    url: "https://etsmakka.vercel.app/etsmakka.jpeg",
                    alt: dict.meta.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.meta.title,
            description: dict.meta.description,
            images: ["https://etsmakka.vercel.app/etsmakka.jpeg"],
        },
        alternates: {
            canonical: `https://etsmakka.vercel.app/${lang}`,
        }
    };
}

export default async function Page({ params }) {
    const { lang } = await params;
    const dict = await getTranslation(lang);
    const isArabic = lang === 'ar';
    const fontClass = isArabic ? 'font-serif' : 'font-sans';

    return (
        <div dir={isArabic ? 'rtl' : 'ltr'} className={`min-h-screen bg-background ${fontClass}`}>
            <Header dict={dict} />
            <Hero dict={dict} lang={lang} />
            <Stats dict={dict} />
            <About dict={dict} />
            <Programs dict={dict} />
            <SupportSection dict={dict} />
            <Contact dict={dict} />
            <Footer dict={dict} />
        </div>
    );
}
