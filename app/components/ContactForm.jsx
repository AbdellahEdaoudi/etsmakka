"use client"
import { useState } from 'react'
import { useToast } from '@/app/components/Toast'
import { Send } from '@/app/components/Icons'

const MESSAGE_MAX_LENGTH = 5000;

export default function ContactForm({ dict }) {
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState({})
    const { addToast } = useToast()

    const validate = (data) => {
        const newErrors = {}

        if (!data.name?.trim()) {
            newErrors.name = dict.contact.form.error_required
        }

        if (!data.email?.trim()) {
            newErrors.email = dict.contact.form.error_required
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = dict.contact.form.error_email
        }

        if (!data.subject?.trim()) {
            newErrors.subject = dict.contact.form.error_required
        }

        if (!data.phone?.trim()) {
            newErrors.phone = dict.contact.form.error_required
        } else if (!/^[+]?[\d\s\-().]{6,20}$/.test(data.phone.trim())) {
            newErrors.phone = dict.contact.form.error_phone
        }

        if (!data.message?.trim()) {
            newErrors.message = dict.contact.form.error_required
        }

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        // Honeypot anti-spam check
        if (data.website) return

        const validationErrors = validate(data)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setStatus('loading')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (response.ok) {
                setStatus('success')
                addToast(dict.contact.form.success_msg, 'success')
                e.target.reset()
                setTimeout(() => setStatus(null), 5000)
            } else {
                setStatus('error')
                addToast(result.message || dict.contact.form.error_server, 'error')
            }
        } catch {
            setStatus('error')
            addToast(dict.contact.form.error_server, 'error')
        }
    }

    const inputClasses = (fieldName) => `w-full rounded-2xl border bg-background/50 px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-primary/10 ${
        errors[fieldName]
            ? 'border-red-500 focus:border-red-500'
            : 'border-border/50 focus:border-primary'
    }`

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Honeypot anti-spam field */}
            <div className="hidden" aria-hidden="true">
                <input type="text" name="website" tabIndex="-1" autoComplete="off" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80 px-1">{dict.contact.form.name}</label>
                    <input
                        maxLength={100}
                        type="text"
                        name="name"
                        placeholder={dict.contact.form.name_placeholder}
                        className={inputClasses('name')}
                    />
                    {errors.name && <p className="text-xs text-red-500 px-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80 px-1">{dict.contact.form.email}</label>
                    <input
                        maxLength={100}
                        type="email"
                        name="email"
                        placeholder={dict.contact.form.email_placeholder}
                        className={inputClasses('email')}
                    />
                    {errors.email && <p className="text-xs text-red-500 px-1">{errors.email}</p>}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Subject */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80 px-1">
                        {dict.contact.form.subject}
                    </label>
                    <input
                        maxLength={200}
                        type="text"
                        name="subject"
                        placeholder={dict.contact.form.subject_placeholder}
                        className={inputClasses('subject')}
                    />
                    {errors.subject && <p className="text-xs text-red-500 px-1">{errors.subject}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80 px-1">
                        {dict.contact.form.phone || "الهاتف"}
                    </label>
                    <input
                        maxLength={30}
                        type="tel"
                        name="phone"
                        placeholder={dict.contact.form.phone_placeholder || "0612345678"}
                        className={inputClasses('phone')}
                    />
                    {errors.phone && <p className="text-xs text-red-500 px-1">{errors.phone}</p>}
                </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 px-1">{dict.contact.form.message}</label>
                <textarea
                    maxLength={MESSAGE_MAX_LENGTH}
                    name="message"
                    rows="5"
                    placeholder={dict.contact.form.message_placeholder}
                    className={`${inputClasses('message')} resize-none`}
                ></textarea>
                {errors.message && <p className="text-xs text-red-500 px-1">{errors.message}</p>}
            </div>

            <button
                disabled={status === 'loading'}
                type="submit"
                className="w-full inline-flex cursor-pointer items-center justify-center rounded-2xl bg-primary text-primary-foreground px-8 py-4 text-base font-sans font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
                {status === 'loading' ? (
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{dict.contact.form.sending}</span>
                    </div>
                ) : status === 'success' ? (
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{dict.contact.form.sent}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 cursor-pointer">
                        <span>{dict.contact.form.submit}</span>
                        <Send className="h-5 w-5" />
                    </div>
                )}
            </button>
        </form>
    )
}
