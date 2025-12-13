import { Geist, Geist_Mono } from "next/font/google"; // maintained
import "../globals.css"; // Fixed path
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
      siteName: "مؤسسة مكة المكرمة / Makka Foundation",
      images: [
        {
          url: "https://res.cloudinary.com/dynprvsfg/image/upload/v1760481753/oyaxhkpfooyrcpbdz7ox.png",
          width: 1200,
          height: 630,
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
      images: ["https://res.cloudinary.com/dynprvsfg/image/upload/v1760481753/oyaxhkpfooyrcpbdz7ox.png"],
    },
    alternates: {
      canonical: `https://makka-edu.vercel.app/${lang}`,
      languages: {
        'en': 'https://makka-edu.vercel.app/en',
        'fr': 'https://makka-edu.vercel.app/fr',
        'ar': 'https://makka-edu.vercel.app/ar',
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
  const { lang } = await params;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Makka Foundation / مؤسسة مكة المكرمة",
              "url": "https://makka-edu.vercel.app",
              "logo": "https://res.cloudinary.com/dynprvsfg/image/upload/v1760481753/oyaxhkpfooyrcpbdz7ox.png",
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

