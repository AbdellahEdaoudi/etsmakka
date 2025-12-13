import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Amiri } from 'next/font/google';
import { getDictionary } from '@/lib/dictionaries';

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
    // Can be empty for root, or have lang for [lang] routes if this layout was shared?
    // But strictly, Next.js layout params are from the segment it belongs to.
    // app/layout.js does not get [lang] param.
    // So we default metadata to Arabic for the root layout.
    // BUT child pages (app/[lang]/page.js) export their own metadata which MERGES/OVERRIDES this.

    const lang = 'ar';
    const dict = await getDictionary(lang);

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
                'fr': 'https://makka-edu.vercel.app/fr',
                'ar': 'https://makka-edu.vercel.app',
                'es': 'https://makka-edu.vercel.app/es',
                'de': 'https://makka-edu.vercel.app/de',
                'ru': 'https://makka-edu.vercel.app/ru',
                'pt': 'https://makka-edu.vercel.app/pt',
                'ja': 'https://makka-edu.vercel.app/ja',
                'hi': 'https://makka-edu.vercel.app/hi',
                'zh': 'https://makka-edu.vercel.app/zh',
            },
        },
    };
}

export default async function RootLayout({ children, params }) {
    // params might be empty for root route.
    // We can try to detect language from the URL if possible, but in server component layout it's tricky without middleware.
    // However, we are making a "General" app/layout.js.
    // The user wants simple.
    // For the root /, it is Arabic.
    // For /en, it is English.
    // BUT `app/layout.js` WRAPS `app/[lang]/page.js`.
    // Does `app/layout.js` get the params of the child page?
    // In Next.js 13+, the root layout does NOT receive the params of dynamic segments below it.
    // So `lang` will be undefined.
    // This means the HTML tag will have a static lang (e.g. 'ar').
    // This is a known limitation of having `app/layout.js` generally without middleware.
    // HOWEVER, we can stick to 'ar' as default or 'en'.
    // We can try to set `lang` and `dir` on the `body` or `div` inside the page? No, `html` tag is here.
    // WE WILL DEFAULT TO 'ar'. If the user visits /en, the HTML tag might say 'ar' but content is English.
    // To fix this strictly without middleware or route groups, we would need to move `html` to the page or use a client component wrapper (ugly).
    // OR we accept that limitation for the sake of "simple directory structure" requested by user.
    // BUT: The user previously had `app/[lang]/layout.js`. 
    // If I re-introduce `app/[lang]/layout.js`, I cannot have `app/layout.js` be the root layout (with html).
    // So I will make `app/layout.js` the single root layout with default 'ar'. 
    // This is the "Simple" requested approach.


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
                                "availableLanguage": ["Arabic", "English", "French"]
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
                {children}
            </body>
        </html>
    );
}
