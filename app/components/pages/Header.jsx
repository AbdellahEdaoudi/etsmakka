"use client"

import Image from "next/image"
import LanguageSwitcher from "@/app/components/LanguageSwitcher"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Header({ dict }) {
    const [open, setOpen] = useState(false)

    const menuRef = useRef(null)
    const buttonRef = useRef(null)

    const navItems = [
        { href: "#about", label: dict.header.nav.about },
        { href: "#programs", label: dict.header.nav.programs },
        { href: "#contact", label: dict.header.nav.contact },
    ]

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

    return (
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="w-full flex items-center justify-between px-4 py-4 md:px-8 lg:px-12">

                {/* Logo */}
                <div className="flex items-center gap-4 shrink-0">
                    <Link href="/">
                        <Image
                            src="/makka-edu.png"
                            alt={dict.header.title}
                            width={80}
                            height={70}
                            className="shadow-sm rounded-sm w-[80px] h-[70px]"
                        />
                    </Link>

                    <div className="hidden sm:block text-start">
                        <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
                            {dict.header.title}
                        </h1>
                        <p className="text-xs text-muted-foreground md:text-sm">
                            {dict.header.subtitle}
                        </p>
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.label}
                        </a>
                    ))}
                    <LanguageSwitcher />
                </nav>

                {/* Mobile Button */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        ref={buttonRef}
                        onClick={() => setOpen((prev) => !prev)}
                        className="p-2 rounded-md border border-border"
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                    <LanguageSwitcher />
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div
                    ref={menuRef}
                    className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
                >
                    <div className="flex flex-col text-center px-4 py-3 gap-3">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}