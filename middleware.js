import { NextResponse } from "next/server";

let locales = ['en', 'fr', 'es', 'de', 'ru', 'pt', 'ja', 'hi', 'zh', 'ar']
let defaultLocale = 'ar'

function getLocale(request) {
    const acceptLanguage = request.headers.get('accept-language')
    if (!acceptLanguage) return defaultLocale

    // a simplified simple check
    // you can use a library like @formatjs/intl-localematcher and negotiator
    const preferred = acceptLanguage.split(',')[0].split('-')[0]
    if (locales.includes(preferred)) return preferred
    return defaultLocale
}

export function middleware(request) {
    const { pathname } = request.nextUrl

    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|favicon.ico|images|.*\\..*).*)',
    ],
}
