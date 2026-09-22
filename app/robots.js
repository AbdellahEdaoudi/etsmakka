export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://etsmakka.vercel.app/sitemap.xml',
    }
}
