'use client'

import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from '@/app/components/Icons'

export default function LanguageSwitcher() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const languages = [
        { code: 'ar', name: 'العربية', countryCode: 'ma' },
        { code: 'fr', name: 'Français', countryCode: 'fr' },
        { code: 'en', name: 'English', countryCode: 'gb' },
        { code: 'es', name: 'Español', countryCode: 'es' },
        { code: 'de', name: 'Deutsch', countryCode: 'de' },
        { code: 'it', name: 'Italiano', countryCode: 'it' },
        { code: 'nl', name: 'Nederlands', countryCode: 'nl' },
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
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 sm:gap-2 cursor-pointer border border-border/50 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 hover:border-primary transition-colors focus:outline-none bg-accent/50 hover:bg-background shadow-xs text-xs sm:text-sm font-semibold"
                aria-label="Select language"
            >
                <Image
                    src={`/flags/${selectedLang.countryCode}.svg`}
                    alt={selectedLang.name}
                    width={18}
                    height={13}
                    className="object-cover rounded-xs rounded-2xs shadow-xs shrink-0"
                />
                <span className="uppercase">{selectedLang.code}</span>
                <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div
                    className="absolute top-full mt-2 w-44 sm:w-48 bg-popover/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-border/80 overflow-hidden max-h-80 overflow-y-auto z-50 text-start inset-e-0 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                    {languages.map((lang) => (
                        <Link
                            href={`/${lang.code}`}
                            key={lang.code}
                            onClick={() => setIsOpen(false)}
                            className={`w-full flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 hover:bg-primary/5 transition-colors text-start ${currentLocale === lang.code ? 'bg-primary/10 text-primary font-bold' : 'text-foreground/80 hover:text-foreground font-medium'}`}
                        >
                            <Image
                                src={`/flags/${lang.countryCode}.svg`}
                                alt={lang.name}
                                width={20}
                                height={14}
                                className="object-cover rounded-xs shadow-xs shrink-0"
                            />
                            <span className="text-xs sm:text-sm">{lang.name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
