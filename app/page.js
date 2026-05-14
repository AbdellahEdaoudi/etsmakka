import { getTranslation } from '@/app/translations/load-translations';
import Header from '@/app/components/pages/Header';
import Hero from '@/app/components/pages/Hero';
import Stats from '@/app/components/pages/Stats';
import About from '@/app/components/pages/About';
import Programs from '@/app/components/pages/Programs';
import Contact from '@/app/components/pages/Contact';
import Footer from '@/app/components/pages/Footer';

export async function generateMetadata() {
    const lang = 'ar';
    const dict = await getTranslation(lang);

    return {
        title: dict.meta.title,
        description: dict.meta.description,
        keywords: dict.meta.keywords ? dict.meta.keywords.split(',') : [],
        openGraph: {
            title: dict.meta.title,
            description: dict.meta.description,
            url: `https://makka-edu.vercel.app`,
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
            canonical: `https://makka-edu.vercel.app`,
        }
    };
}

export default async function Page() {
    const lang = 'ar';
    const dict = await getTranslation(lang);
    const fontClass = 'font-serif';

    return (
        <div dir="rtl" className={`min-h-screen bg-background ${fontClass}`}>
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
