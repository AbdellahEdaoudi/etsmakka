import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Amiri } from 'next/font/google';
import { getTranslation } from '@/app/translations/load-translations';
import { ToastProvider } from '@/app/components/Toast';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const amiri = Amiri({
    weight: ["400", "700"],
    subsets: ["arabic"],
    variable: "--font-amiri",
    display: "swap",
})

export async function generateMetadata() {
    const lang = 'ar';
    const dict = await getTranslation(lang);

    return {
        metadataBase: new URL('https://etsmakka.vercel.app'),
        title: {
            template: `%s | ${dict.meta.title}`,
            default: dict.meta.title,
        },
        description: dict.meta.description,
        keywords: dict.meta.keywords ? dict.meta.keywords.split(',') : [],
        openGraph: {
            title: dict.meta.title,
            description: dict.meta.description,
            url: `https://etsmakka.vercel.app`,
            siteName: "Établissement Makka d'Enseignement Préscolaire / مؤسسة مكة المكرمة للتربية والتعليم الأولي",
            images: [
                {
                    url: "https://etsmakka.vercel.app/etsmakka.jpeg",
                    alt: dict.meta.title,
                },
            ],
            locale: lang,
            type: "website",
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.meta.title,
            description: dict.meta.description,
            images: ["https://etsmakka.vercel.app/etsmakka.jpeg"],
        },
        alternates: {
            canonical: `https://etsmakka.vercel.app`,
            languages: {
                'ar': 'https://etsmakka.vercel.app/ar',
                'fr': 'https://etsmakka.vercel.app/fr',
                'en': 'https://etsmakka.vercel.app/en',
                'es': 'https://etsmakka.vercel.app/es',
                'de': 'https://etsmakka.vercel.app/de',
                'it': 'https://etsmakka.vercel.app/it',
            },
        },
    };
}

export default async function RootLayout({ children }) {
    return (
        <html data-scroll-behavior="smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "EducationalOrganization",
                            "name": "Établissement Makka d'Enseignement Préscolaire / مؤسسة مكة المكرمة للتربية والتعليم الأولي",
                            "url": "https://etsmakka.vercel.app",
                            "logo": "https://etsmakka.vercel.app/etsmakka.jpeg",
                            "sameAs": [],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+212615075314",
                                "contactType": "customer service",
                                "areaServed": "MA",
                                "availableLanguage": ["Arabic", "French", "English", "Spanish", "German", "Italian"]
                            },
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Laayoune",
                                "addressCountry": "MA"
                            }
                        })
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} antialiased`}
            >
                <ToastProvider>
                    {children}
                </ToastProvider>
            </body>
        </html>
    );
}
