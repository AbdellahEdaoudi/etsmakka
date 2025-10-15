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
  title: "مؤسسة مكة المكرمة للتربية والتعليم الأولي",
  description: "بيئة تربوية آمنة لتنمية طفلك - مؤسسة مكة المكرمة للتربية والتعليم الأولي بالعيون",
  keywords: [
    "مؤسسة مكة المكرمة",
    "التربية والتعليم الأولي",
    "روضة أطفال",
    "تنمية مهارات الأطفال",
    "العيون المغرب",
    "برامج تعليمية للأطفال"
  ],
  openGraph: {
    title: "مؤسسة مكة المكرمة للتربية والتعليم الأولي",
    description: "بيئة تربوية آمنة لتنمية طفلك - مؤسسة مكة المكرمة بالعيون",
    url: "https://www.makka-edu.ma",
    siteName: "مؤسسة مكة المكرمة",
    images: [
      {
        url: "https://res.cloudinary.com/dynprvsfg/image/upload/v1760481753/oyaxhkpfooyrcpbdz7ox.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "ar_MA",
    type: "website",
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
