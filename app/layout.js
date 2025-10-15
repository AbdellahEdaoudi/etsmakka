import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Amiri } from 'next/font/google';
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

export const metadata = {
  title: "مؤسسة مكة المكرمة للتربية والتعليم الأولي – العيون",
  description: "نوفر برامج تعليمية مبتكرة وآمنة للأطفال في مرحلة الروضة. انضم إلى بيئة تعليمية محفزة في العيون.",
  keywords: [
    "مؤسسة مكة المكرمة", 
    "روضة أطفال العيون", 
    "التعليم الأولي المغرب", 
    "برامج تعليمية للأطفال", 
    "تنمية مهارات الأطفال"
  ],
  openGraph: {
    title: "مؤسسة مكة المكرمة للتربية والتعليم الأولي – العيون",
    description: "نوفر برامج تعليمية مبتكرة وآمنة للأطفال في مرحلة الروضة. انضم إلى بيئة تعليمية محفزة في العيون.",
    url: "https://makka-edu.vercel.app",
    siteName: "مؤسسة مكة المكرمة",
    images: [
      {
        url: "https://res.cloudinary.com/dynprvsfg/image/upload/v1760481753/oyaxhkpfooyrcpbdz7ox.png",
        width: 1200,
        height: 630,
        alt: "شعار مؤسسة مكة المكرمة للتربية والتعليم الأولي",
      },
    ],
    locale: "ar_MA",
    type: "website",
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "مؤسسة مكة المكرمة للتربية والتعليم الأولي",
              "url": "https://makka-edu.vercel.app",
              "logo": "https://res.cloudinary.com/dynprvsfg/image/upload/v1760481753/oyaxhkpfooyrcpbdz7ox.png",
              "sameAs": [],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+212615075314",
                "contactType": "customer service",
                "areaServed": "MA",
                "availableLanguage": ["Arabic"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "العيون",
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

