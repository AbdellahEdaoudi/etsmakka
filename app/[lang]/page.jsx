import HomeContent from "@/components/HomeContent";
import { getDictionary } from '@/lib/dictionaries';

// Generate static params for supported languages
export async function generateStaticParams() {
    return ['en', 'fr', 'es', 'de', 'ru', 'pt', 'ja', 'hi', 'zh', 'ar'].map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

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
    return <HomeContent lang={lang} />;
}
