export default function sitemap() {
    const languages = ['en', 'fr', 'es', 'de', 'ru', 'pt', 'ja', 'hi', 'zh', 'ar']
    const baseUrl = 'https://makka-edu.vercel.app'

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
            changeFrequency: 'daily',
            priority: 1,
        },
        ...urls
    ]
}
