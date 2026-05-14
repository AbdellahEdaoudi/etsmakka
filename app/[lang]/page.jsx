import { getTranslation } from '@/app/translations/load-translations';
import Header from '@/app/components/pages/Header';
import Hero from '@/app/components/pages/Hero';
import Stats from '@/app/components/pages/Stats';
import About from '@/app/components/pages/About';
import Programs from '@/app/components/pages/Programs';
import Contact from '@/app/components/pages/Contact';
import Footer from '@/app/components/pages/Footer';

export async function generateStaticParams() {
    return ['en', 'de', 'fr', 'es', 'sv', 'vi', 'pt', 'it', 'nl', 'ar', 'ru', 'zh', 'ja', 'hi', 'tr', 'ko', 'id', 'pl'].map((lang) => ({ lang }));
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
            url: `https://makka-edu.vercel.app/${lang}`,
            locale: lang,
            type: "website",
            images: [
                {
                    url: "https://makka-edu.vercel.app/Logo.png",
                    alt: dict.meta.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.meta.title,
            description: dict.meta.description,
            images: ["https://makka-edu.vercel.app/Logo.png"],
        },
        alternates: {
            canonical: `https://makka-edu.vercel.app/${lang}`,
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
            <Hero dict={dict} />
            <Stats dict={dict} />
            <About dict={dict} />
            <Programs dict={dict} />
            <Contact dict={dict} />
            <Footer dict={dict} />
        </div>
    );
}
