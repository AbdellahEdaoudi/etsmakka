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

export async function generateMetadata({ params }) {

    const lang = 'ar';
    const dict = await getTranslation(lang);

    return {
        metadataBase: new URL('https://makka-edu.vercel.app'),
        title: {
            template: `%s | ${dict.meta.title}`,
            default: dict.meta.title, // Default title
        },
        description: dict.meta.description,
        keywords: dict.meta.keywords ? dict.meta.keywords.split(',') : [],
        openGraph: {
            title: dict.meta.title,
            description: dict.meta.description,
            url: `https://makka-edu.vercel.app`,
            siteName: "مؤسسة مكة المكرمة / Makka Foundation",
            images: [
                {
                    url: "https://makka-edu.vercel.app/Logo.png",
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
            images: ["https://makka-edu.vercel.app/Logo.png"],
        },
        alternates: {
            canonical: `https://makka-edu.vercel.app`,
            languages: {
                'en': 'https://makka-edu.vercel.app/en',
                'de': 'https://makka-edu.vercel.app/de',
                'fr': 'https://makka-edu.vercel.app/fr',
                'es': 'https://makka-edu.vercel.app/es',
                'sv': 'https://makka-edu.vercel.app/sv',
                'vi': 'https://makka-edu.vercel.app/vi',
                'pt': 'https://makka-edu.vercel.app/pt',
                'it': 'https://makka-edu.vercel.app/it',
                'nl': 'https://makka-edu.vercel.app/nl',
                'ar': 'https://makka-edu.vercel.app',
                'ru': 'https://makka-edu.vercel.app/ru',
                'zh': 'https://makka-edu.vercel.app/zh',
                'ja': 'https://makka-edu.vercel.app/ja',
                'hi': 'https://makka-edu.vercel.app/hi',
                'tr': 'https://makka-edu.vercel.app/tr',
                'ko': 'https://makka-edu.vercel.app/ko',
                'id': 'https://makka-edu.vercel.app/id',
                'pl': 'https://makka-edu.vercel.app/pl',
            },
        },
    };
}

export default async function RootLayout({ children, params }) {
    return (
        <html>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "EducationalOrganization",
                            "name": "Makka Foundation / مؤسسة مكة المكرمة",
                            "url": "https://makka-edu.vercel.app",
                            "logo": "https://makka-edu.vercel.app/Logo.png",
                            "sameAs": [],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+212615075314",
                                "contactType": "customer service",
                                "areaServed": "MA",
                                "availableLanguage": ["Arabic", "English", "French", "German", "Spanish", "Swedish", "Vietnamese", "Portuguese", "Italian", "Dutch", "Russian", "Chinese", "Japanese", "Hindi", "Turkish", "Korean", "Indonesian", "Polish"]
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
