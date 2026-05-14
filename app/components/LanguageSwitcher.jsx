'use client'

import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from '@/app/components/Icons'

export default function LanguageSwitcher() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const languages = [
        { code: 'en', name: 'English', countryCode: 'gb' },
        { code: 'de', name: 'Deutsch', countryCode: 'de' },
        { code: 'fr', name: 'Français', countryCode: 'fr' },
        { code: 'es', name: 'Español', countryCode: 'es' },
        { code: 'sv', name: 'Svenska', countryCode: 'se' },
        { code: 'vi', name: 'Tiếng Việt', countryCode: 'vn' },
        { code: 'pt', name: 'Português', countryCode: 'pt' },
        { code: 'it', name: 'Italiano', countryCode: 'it' },
        { code: 'nl', name: 'Nederlands', countryCode: 'nl' },
        { code: 'ar', name: 'العربية', countryCode: 'sa' },
        { code: 'ru', name: 'Русский', countryCode: 'ru' },
        { code: 'zh', name: '中文', countryCode: 'cn' },
        { code: 'ja', name: '日本語', countryCode: 'jp' },
        { code: 'hi', name: 'हिन्दी', countryCode: 'in' },
        { code: 'tr', name: 'Türkçe', countryCode: 'tr' },
        { code: 'ko', name: '한국어', countryCode: 'kr' },
        { code: 'id', name: 'Indonesia', countryCode: 'id' },
        { code: 'pl', name: 'Polski', countryCode: 'pl' },
    ];

    const currentLocale = pathname?.split('/')[1] || 'ar'
    const selectedLang = languages.find(l => l.code === currentLocale) || languages.find(l => l.code === 'ar')

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={dropdownRef} >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 cursor-pointer border border-border/50 rounded-full px-3 py-1.5 hover:border-primary transition-colors focus:outline-none bg-accent/50 hover:bg-background shadow-sm"
            >
                <span className={`fi fi-${selectedLang.countryCode} rounded-sm`}></span>
                <span className="text-sm font-medium uppercase">{selectedLang.code}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full mt-2 w-48 bg-popover rounded-xl shadow-xl border border-border overflow-hidden max-h-80 overflow-y-auto z-50 ${
                            pathname?.startsWith('/ar') || !pathname || pathname === '/' ? 'left-0' : 'right-0'
                        }`}
                    >
                        {languages.map((lang) => (
                            <Link
                                href={lang.code === 'ar' ? '/' : `/${lang.code}`}
                                key={lang.code}
                                onClick={() => setIsOpen(false)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary/5 transition-colors text-left ${currentLocale === lang.code ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground/80 hover:text-foreground'}`}
                            >
                                <span className={`fi fi-${lang.countryCode} shadow-sm `}></span>
                                <span className="text-sm font-medium">{lang.name}</span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
