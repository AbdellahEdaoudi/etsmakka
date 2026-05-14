export default function sitemap() {
    const languages = ['en', 'de', 'fr', 'es', 'sv', 'vi', 'pt', 'it', 'nl', 'ar', 'ru', 'zh', 'ja', 'hi', 'tr', 'ko', 'id', 'pl']
    const baseUrl = 'https://makka-edu.vercel.app'

    const urls = languages.map((lang) => ({
        url: lang === 'ar' ? baseUrl : `${baseUrl}/${lang}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: lang === 'ar' ? 1 : 0.8,
    }))

    // Remove duplicates if any (e.g. if baseUrl is already in urls)
    const uniqueUrls = Array.from(new Set(urls.map(u => u.url)))
        .map(url => urls.find(u => u.url === url))

    return uniqueUrls
}
