'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
    const pathname = usePathname()
    const router = useRouter()

    const handleLocaleChange = (e) => {
        const newLocale = e.target.value
        if (!pathname) return router.push(`/${newLocale}`)

        // pathname is like /en/some/path or /en
        const segments = pathname.split('/')

        // Replace the first segment (locale) with the new one
        if (newLocale === 'ar') {
            const newPath = `/${segments.slice(2).join('/')}`
            router.push(newPath || '/')
            return
        }
        // segments[0] is empty, segments[1] is the locale
        segments[1] = newLocale
        router.push(segments.join('/'))
    }

    const currentLocale = pathname?.split('/')[1] || 'ar'

    const languages = [
        { code: 'ar', label: 'العربية' },
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
        { code: 'es', label: 'Español' },
        { code: 'de', label: 'Deutsch' },
        { code: 'ru', label: 'Русский' },
        { code: 'pt', label: 'Português' },
        { code: 'ja', label: '日本語' },
        { code: 'hi', label: 'हिन्दी' },
        { code: 'zh', label: '中文' },
    ]

    return (
        <div className="relative inline-block text-left">
            <select
                value={currentLocale}
                onChange={handleLocaleChange}
                className="block w-full rounded-md bg-background py-2 pl-3 pr-8 text-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm border border-input"
                aria-label="Select Language"
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
