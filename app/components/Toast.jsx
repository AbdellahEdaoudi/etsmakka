"use client";
import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

function ToastItem({ t, onRemove, icons }) {
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef(null);

    const startTimer = useCallback(() => {
        timerRef.current = setTimeout(() => {
            onRemove(t.id);
        }, 4000);
    }, [t.id, onRemove]);

    const clearTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    useEffect(() => {
        if (!isHovered) {
            startTimer();
        } else {
            clearTimer();
        }
        return () => clearTimer();
    }, [isHovered, startTimer, clearTimer]);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="pointer-events-auto transition-all duration-200 animate-in fade-in slide-in-from-top-4"
        >
            <div className="relative group">
                <div className={`bg-white dark:bg-zinc-900 border-l-4 ${
                    t.type === 'success' ? 'border-emerald-500' :
                    t.type === 'error' ? 'border-rose-500' :
                    t.type === 'warning' ? 'border-amber-500' :
                    'border-blue-500'
                } border-y border-r border-zinc-200 dark:border-zinc-800 shadow-lg rounded-xl py-3 pl-4 pr-5 flex items-center gap-4 min-w-[320px] max-w-md transition-all`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        t.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10' :
                        t.type === 'error' ? 'bg-rose-50 dark:bg-rose-500/10' :
                        t.type === 'warning' ? 'bg-amber-50 dark:bg-amber-500/10' :
                        'bg-blue-50 dark:bg-blue-500/10'
                    }`}>
                        {icons[t.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100 leading-tight">
                            {t.message}
                        </p>
                    </div>
                    <button
                        onClick={() => onRemove(t.id)}
                        className="shrink-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-all p-1"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setToasts((prev) => [...prev, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toast = {
        success: (m) => addToast(m, 'success'),
        error: (m) => addToast(m, 'error'),
        info: (m) => addToast(m, 'info'),
        warning: (m) => addToast(m, 'warning'),
    };

    const icons = {
        success: (
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
        ),
        error: (
            <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        warning: (
            <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        info: (
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    };

    return (
        <ToastContext.Provider value={{ ...toast, addToast }}>
            {children}
            <div className="fixed top-6 right-6 z-100 flex flex-col items-end gap-3 pointer-events-none">
                {toasts.map((t) => (
                    <ToastItem key={t.id} t={t} onRemove={removeToast} icons={icons} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}
