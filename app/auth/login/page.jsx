"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Loader2 } from "@/app/components/Icons";
import { getTranslation } from "@/app/translations/admin";
import AdminLanguageSelector from "@/app/components/AdminLanguageSelector";

export default function LoginPage() {
  const router = useRouter();
  const [lang, setLang] = useState("ar");
  const [t, setT] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorKey, setErrorKey] = useState("");
  const [errorRaw, setErrorRaw] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const error =
    errorKey === "invalidCredentials"
      ? t?.login?.invalidCredentials || "البريد الإلكتروني أو كلمة المرور غير صحيحة."
      : errorKey === "fillAllFields"
        ? t?.login?.fillAllFields || "يرجى ملء جميع الحقول."
        : errorKey === "rateLimitExceeded"
          ? t?.login?.rateLimitExceeded || "تم تجاوز عدد المحاولات. يرجى الانتظار."
          : errorRaw;

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("admin_lang") || "ar"
        : "ar";
    setLang(saved);
    getTranslation(saved).then((dict) => {
      setT(dict);
      if (typeof document !== "undefined") {
        document.title =
          saved === "ar"
            ? "مؤسسة مكة المكرمة | تسجيل الدخول"
            : `${dict?.login?.title || "Makkah Institution"} | ${dict?.loginMetaTitle || "Sign In"}`;
      }
    });
  }, []);

  const handleLangChange = async (newLang) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_lang", newLang);
    }
    const dict = await getTranslation(newLang);
    setT(dict);
    if (typeof document !== "undefined") {
      document.title =
        newLang === "ar"
          ? "مؤسسة مكة المكرمة | تسجيل الدخول"
          : `${dict?.login?.title || "Makkah Institution"} | ${dict?.loginMetaTitle || "Sign In"}`;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorKey("");
    setErrorRaw("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorKey("fillAllFields");
      return;
    }

    setLoading(true);
    setErrorKey("");
    setErrorRaw("");

    try {
      await axios.post("/api/auth/login", formData, { withCredentials: true });
      router.push("/admin");
    } catch (err) {
      if (err.response?.status === 429) {
        setErrorKey("rateLimitExceeded");
      } else {
        const serverMsg = err.response?.data?.message || "";
        if (serverMsg.toLowerCase() === "invalid credentials") {
          setErrorKey("invalidCredentials");
        } else if (serverMsg.toLowerCase() === "email and password are required") {
          setErrorKey("fillAllFields");
        } else {
          setErrorKey("");
          setErrorRaw(serverMsg || err.message || "");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const isRtl = lang === "ar";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 relative selection:bg-emerald-500/30 selection:text-emerald-300 font-sans"
    >
      {/* Dynamic ambient grid background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-125 h-87.5 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-100 h-80 bg-teal-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Top Bar: Language & Back Link */}
      <div className="absolute top-5 inset-x-5 flex items-center justify-between z-20 max-w-5xl mx-auto">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>{isRtl ? "العودة للموقع" : "Back to site"}</span>
        </Link>
        <AdminLanguageSelector currentLang={lang} onLangChange={handleLangChange} />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-sm sm:max-w-md z-10 my-10">

        {/* Simple Brand Header */}
        <div className="text-center mb-6">
          <Link href={`/${lang}`} className="inline-flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-lg flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
              <Image
                src="/etsmakka.jpeg"
                alt="Logo"
                width={52}
                height={52}
                className="w-full h-full object-contain rounded-xl"
                priority
              />
            </div>
            <div className="space-y-0.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                {t?.login?.title || "مؤسسة مكة المكرمة"}
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                {t?.login?.subtitle || "لوحة التحكم للإدارة"}
              </p>
            </div>
          </Link>
        </div>

        {/* Clean Admin Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/50 space-y-5">
          <div className="border-b border-slate-800 pb-3 text-center">
            <h2 className="text-base sm:text-lg font-bold text-white">
              {t?.login?.cardTitle || "تسجيل الدخول"}
            </h2>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-semibold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300" htmlFor="email">
                {t?.login?.emailLabel || "البريد الإلكتروني"}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 text-slate-100 placeholder-slate-500 transition-all text-sm"
                placeholder={t?.login?.emailPlaceholder || "admin@etsmakka.com"}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300" htmlFor="password">
                {t?.login?.passwordLabel || "كلمة المرور"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 text-slate-100 placeholder-slate-500 transition-all text-sm ${isRtl ? "pl-10" : "pr-10"}`}
                  placeholder={t?.login?.passwordPlaceholder || "••••••••"}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer p-1.5 ${isRtl ? "left-2" : "right-2"}`}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none cursor-pointer transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t?.login?.signingIn || "جاري الدخول..."}</span>
                </>
              ) : (
                <span>{t?.login?.signInBtn || "تسجيل الدخول"}</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} {t?.login?.title || "مؤسسة مكة المكرمة"}
          </p>
        </div>
      </div>
    </div>
  );
}
