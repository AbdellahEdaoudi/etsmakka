"use client"

import Image from "next/image"
import LanguageSwitcher from "@/app/components/LanguageSwitcher"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Phone, Mail, WhatsApp } from "@/app/components/Icons"

export default function Header({ dict }) {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const menuRef = useRef(null)
    const buttonRef = useRef(null)

    const currentLocale = pathname?.split('/')[1] || 'ar'

    const navItems = [
        { href: "#about", label: dict.header.nav.about, icon: "✦", badge: "01" },
        { href: "#programs", label: dict.header.nav.programs, icon: "🎓", badge: "02" },
        { href: "#support", label: dict.header.nav.support, icon: "✍️", badge: "03" },
        { href: "#contact", label: dict.header.nav.contact, icon: "📞", badge: "04" },
    ]

    const handleNavClick = (e, href) => {
        e.preventDefault()
        setOpen(false)
        document.body.style.overflow = "unset"

        setTimeout(() => {
            const targetId = href.replace('#', '')
            const element = document.getElementById(targetId)
            if (element) {
                const header = document.querySelector('header')
                const headerHeight = header ? header.getBoundingClientRect().height : 75
                const elementTop = element.getBoundingClientRect().top + window.scrollY
                const targetPosition = Math.max(0, elementTop - headerHeight - 12)

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })
            }
        }, 60)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedInsideMenu = menuRef.current?.contains(event.target)
            const clickedButton = buttonRef.current?.contains(event.target)

            if (!clickedInsideMenu && !clickedButton) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [open])

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-xl transition-all">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 lg:px-12 py-3">

                {/* Logo & Title (Title + Subtitle BOTH visible everywhere) */}
                <Link
                    href={`/${currentLocale}`}
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setOpen(false)
                    }}
                    className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 overflow-hidden group"
                >
                    <Image
                        src="/etsmakka.jpeg"
                        alt={dict.header.title}
                        width={64}
                        height={60}
                        priority
                        className="shadow-xs rounded-sm w-9.5 xs:w-11 sm:w-14 h-auto shrink-0 transition-transform group-hover:scale-105"
                    />

                    <div className="flex flex-col text-start min-w-0 flex-1 overflow-hidden">
                        <span className="text-xs sm:text-base font-extrabold text-foreground leading-snug tracking-tight truncate">
                            {dict.header.title}
                        </span>
                        <span className="text-[10px] xs:text-[11px] sm:text-xs text-muted-foreground font-semibold leading-tight truncate">
                            {dict.header.subtitle}
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm sm:text-base font-semibold shrink-0">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="text-muted-foreground transition-colors hover:text-primary whitespace-nowrap py-1"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="ps-2">
                        <LanguageSwitcher />
                    </div>
                </nav>

                {/* Mobile Action Controls */}
                <div className="md:hidden flex items-center gap-1.5 sm:gap-2 shrink-0 ms-2">
                    <LanguageSwitcher />
                    <button
                        ref={buttonRef}
                        onClick={() => setOpen((prev) => !prev)}
                        className="p-2 sm:p-2.5 rounded-xl border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-all focus:outline-none text-xs sm:text-sm font-bold active:scale-95"
                        aria-label="Toggle menu"
                    >
                        {open ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Modal / Drawer */}
            {open && (
                <div
                    ref={menuRef}
                    className="md:hidden border-t border-primary/20 bg-background/95 backdrop-blur-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
                >
                    <div className="px-5 py-6 max-h-[85vh] overflow-y-auto space-y-6">

                        {/* Header info card in drawer */}
                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-primary/5 border border-primary/15">
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary text-sm font-bold">
                                    ✨
                                </span>
                                <div className="text-start min-w-0">
                                    <p className="text-xs font-bold text-foreground truncate">{dict.header.title}</p>
                                    <p className="text-[10px] text-muted-foreground truncate">{dict.header.subtitle}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 shrink-0">
                                {currentLocale.toUpperCase()}
                            </span>
                        </div>

                        {/* Nav items list */}
                        <div className="grid gap-2.5">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className="flex items-center justify-between p-3.5 rounded-2xl border border-border/50 bg-card/80 hover:bg-primary/5 hover:border-primary/30 transition-all active:scale-[0.98] group"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary text-lg shadow-xs group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </span>
                                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                            {item.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                                            {item.badge}
                                        </span>
                                        <span className="text-muted-foreground text-xs group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                                            →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Quick Contact & Action Buttons */}
                        <div className="pt-3 border-t border-border/40 space-y-2.5">
                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href="tel:+212615075314"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 active:scale-95 transition-all"
                                >
                                    <Phone className="h-3.5 w-3.5 shrink-0" />
                                    <span className="leading-none">0615075314</span>
                                </a>

                                <a
                                    href="https://wa.me/212634002069"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                                >
                                    <WhatsApp className="h-3.5 w-3.5 fill-current shrink-0" />
                                    <span className="leading-none">0634002069</span>
                                </a>
                            </div>

                            <a
                                href="mailto:etsmakka@gmail.com"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
                            >
                                <Mail className="h-3.5 w-3.5 text-primary" />
                                <span>etsmakka@gmail.com</span>
                            </a>
                        </div>

                    </div>
                </div>
            )}
        </header>
    )
}