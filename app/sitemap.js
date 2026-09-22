export default function sitemap() {
    const languages = ['ar', 'fr', 'en', 'es', 'de', 'it']
    const baseUrl = 'https://etsmakka.vercel.app'

    const urls = languages.map((lang) => ({
        url: `${baseUrl}/${lang}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: lang === 'ar' ? 1 : 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...urls,
    ]
}
