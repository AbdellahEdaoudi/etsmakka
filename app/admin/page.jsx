"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useToast } from "@/app/components/Toast";
import { getTranslation } from "@/app/translations/admin";
import AdminLanguageSelector from "@/app/components/AdminLanguageSelector";
import { Loader2, Star, Mail, MailOpen, Trash2, Phone, WhatsApp, ChevronDown } from "@/app/components/Icons";

export default function AdminDashboard() {
  const router = useRouter();
  const toast = useToast();
  const [lang, setLang] = useState("ar");
  const [t, setT] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [starringId, setStarringId] = useState(null);
  const [readingId, setReadingId] = useState(null);
  const [contactsPage, setContactsPage] = useState(1);
  const [contactsTotalPages, setContactsTotalPages] = useState(1);
  const [contactsTotal, setContactsTotal] = useState(0);
  const [contactsUnreadTotal, setContactsUnreadTotal] = useState(0);
  const [contactsStarredTotal, setContactsStarredTotal] = useState(0);

  // Translation state
  const [targetLang, setTargetLang] = useState("ar");
  const [translating, setTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState(null);
  const [translatedSubject, setTranslatedSubject] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);

  useEffect(() => {
    setTranslatedText(null);
    setTranslatedSubject(null);
    setShowOriginal(false);
  }, [selectedContact, lang]);

  const isArabic = (text) => /[\u0600-\u06FF]/.test(text || "");

  const handleTranslateMessage = async () => {
    if (!selectedContact) return;
    const msgText = selectedContact.message || "";
    const activeTarget = "ar";
    setTargetLang(activeTarget);
    setTranslating(true);
    try {
      const subjText = selectedContact.subject || (isArabic(msgText) ? "استفسار وتسجيل عبر الموقع" : "Website Inquiry");

      const msgPromise = msgText
        ? fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${activeTarget}&dt=t&q=${encodeURIComponent(msgText)}`).then(r => r.json())
        : Promise.resolve(null);

      const subjPromise = subjText
        ? fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${activeTarget}&dt=t&q=${encodeURIComponent(subjText)}`).then(r => r.json())
        : Promise.resolve(null);

      const [msgData, subjData] = await Promise.all([msgPromise, subjPromise]);

      if (msgData && Array.isArray(msgData[0])) {
        const text = msgData[0].map((i) => i[0]).join("");
        if (text) setTranslatedText(text);
      }
      if (subjData && Array.isArray(subjData[0])) {
        const text = subjData[0].map((i) => i[0]).join("");
        if (text) setTranslatedSubject(text);
      }
      setShowOriginal(false);
      toast.success(t?.dashboard?.toasts?.translated || "تمت الترجمة إلى العربية بنجاح");
    } catch {
      toast.error(t?.dashboard?.toasts?.requestSetupError || "حدث خطأ أثناء الترجمة");
    } finally {
      setTranslating(false);
    }
  };

  const getLocale = (l) => ({ ar: "ar-MA", fr: "fr-FR", en: "en-US", es: "es-ES", de: "de-DE", it: "it-IT", nl: "nl-NL" }[l] || "ar-MA");

  const handleLangChange = async (newLang) => {
    setLang(newLang);
    setTargetLang(newLang);
    if (typeof window !== "undefined") localStorage.setItem("admin_lang", newLang);
    const dict = await getTranslation(newLang);
    setT(dict);
    if (typeof document !== "undefined")
      document.title = dict?.metaTitle || "مؤسسة مكة المكرمة | لوحة التحكم";
  };

  const getAuthConfig = () => {
    return { withCredentials: true };
  };

  const handleApiError = async (error, retryCallback, currentDict = t) => {
    const dict = currentDict || t;
    if (error.response) {
      const code = error.response.data?.code;
      if (code === "ACCESS_TOKEN_EXPIRED") {
        try {
          await axios.post("/api/auth/refresh", {}, { withCredentials: true });
          if (retryCallback) await retryCallback();
        } catch {
          toast.error(dict?.dashboard?.toasts?.sessionExpired || "Session expired.");
          router.push("/auth/login");
        }
      } else if (["TOKEN_MISSING", "ACCESS_TOKEN_INVALID"].includes(code) || error.response.status === 401) {
        toast.error(dict?.dashboard?.toasts?.unauthorized || "غير مصرح لك بالدخول.");
        router.push("/auth/login");
      } else if (error.response.status === 403) {
        toast.error(dict?.dashboard?.toasts?.forbidden || "Access forbidden.");
        router.push("/");
      } else {
        toast.error(error.response.data?.message || "An error occurred.");
      }
    } else {
      toast.error(dict?.dashboard?.toasts?.networkError || "Network error.");
    }
  };

  const fetchContacts = async (page = contactsPage, dict = t) => {
    try {
      const res = await axios.get(`/api/admin/contacts?page=${page}&limit=20`, getAuthConfig());
      setContacts(res.data.contacts || []);
      setContactsTotal(res.data.total || 0);
      setContactsTotalPages(res.data.totalPages || 1);
      setContactsUnreadTotal(res.data.unreadCount ?? 0);
      setContactsStarredTotal(res.data.starredCount ?? 0);
    } catch (err) {
      await handleApiError(err, () => fetchContacts(page, dict), dict);
      throw err;
    }
  };

  const fetchData = async (page = contactsPage, currentDict = t) => {
    setLoading(true);
    try {
      await fetchContacts(page, currentDict);
    } catch {
      // Error is gracefully handled by handleApiError inside fetchContacts
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLang = typeof window !== "undefined" ? localStorage.getItem("admin_lang") || "ar" : "ar";
    setLang(savedLang);
    setTargetLang(savedLang);

    const initDashboard = async () => {
      const dict = await getTranslation(savedLang);
      setT(dict);
      if (typeof document !== "undefined") {
        document.title = dict?.metaTitle || "مؤسسة مكة المكرمة | لوحة التحكم";
      }
      await fetchData(contactsPage, dict);
    };

    initDashboard();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try { await axios.post("/api/auth/logout", {}, { withCredentials: true }); }
    catch { }
    finally {
      toast.info(t?.dashboard?.toasts?.signedOut || "Signed out");
      setTimeout(() => router.push("/auth/login"), 500);
    }
  };

  const toggleStar = async (contactId) => {
    setStarringId(contactId);
    try {
      const res = await axios.patch(`/api/admin/contacts/${contactId}/star`, {}, getAuthConfig());
      const updated = res.data.contact;
      setContacts((prev) => prev.map((c) => (c._id === contactId ? updated : c)));
      if (selectedContact?._id === contactId) setSelectedContact(updated);
      setContactsStarredTotal((prev) => (updated.isStarred ? prev + 1 : Math.max(0, prev - 1)));
      toast.success(updated.isStarred ? t?.dashboard?.toasts?.markedStarred || "★" : t?.dashboard?.toasts?.removedStarred || "☆");
    } catch (err) { await handleApiError(err, () => toggleStar(contactId)); }
    finally { setStarringId(null); }
  };

  const toggleRead = async (contactId) => {
    setReadingId(contactId);
    try {
      const res = await axios.patch(`/api/admin/contacts/${contactId}/read`, {}, getAuthConfig());
      const updated = res.data.contact;
      setContacts((prev) => prev.map((c) => (c._id === contactId ? updated : c)));
      if (selectedContact?._id === contactId) setSelectedContact(updated);
      setContactsUnreadTotal((prev) => (updated.isRead ? Math.max(0, prev - 1) : prev + 1));
      toast.success(updated.isRead ? t?.dashboard?.toasts?.markedRead || "Read" : t?.dashboard?.toasts?.markedUnread || "Unread");
    } catch (err) { await handleApiError(err, () => toggleRead(contactId)); }
    finally { setReadingId(null); }
  };

  const openContact = async (contact) => {
    setSelectedContact(contact);
    if (!contact.isRead) {
      try {
        const res = await axios.patch(`/api/admin/contacts/${contact._id}/read`, {}, getAuthConfig());
        const updated = res.data.contact;
        setContacts((prev) => prev.map((c) => (c._id === contact._id ? updated : c)));
        setSelectedContact(updated);
        setContactsUnreadTotal((prev) => Math.max(0, prev - 1));
      } catch { }
    }
  };

  const confirmDeleteContact = async () => {
    if (!contactToDelete) return;
    const id = contactToDelete._id;
    const wasUnread = !contactToDelete.isRead;
    const wasStarred = contactToDelete.isStarred;
    setDeleting(true);
    try {
      await axios.delete(`/api/admin/contacts/${id}`, getAuthConfig());
      setContacts((prev) => prev.filter((c) => c._id !== id));
      if (selectedContact?._id === id) setSelectedContact(null);
      setContactsTotal((p) => Math.max(0, p - 1));
      if (wasUnread) setContactsUnreadTotal((p) => Math.max(0, p - 1));
      if (wasStarred) setContactsStarredTotal((p) => Math.max(0, p - 1));
      toast.success(t?.dashboard?.toasts?.messageDeleted || "Deleted");
      setContactToDelete(null);
    } catch (err) { await handleApiError(err, confirmDeleteContact); }
    finally { setDeleting(false); }
  };

  const filteredContacts = useMemo(() => {
    return (contacts || []).filter((c) => {
      if (filter === "starred" && !c.isStarred) return false;
      if (filter === "unread" && c.isRead) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.phone?.toLowerCase().includes(q) || c.subject?.toLowerCase().includes(q) || c.message?.toLowerCase().includes(q);
      }
      return true;
    });
  }, [contacts, filter, searchQuery]);

  const isRtl = lang === "ar";
  const prevText = isRtl ? "→ السابق" : (t?.dashboard?.pagination?.prev || "← Previous");
  const nextText = isRtl ? "التالي ←" : (t?.dashboard?.pagination?.next || "Next →");

  const cleanPhoneForWhatsApp = (phone) => {
    if (!phone) return "";
    let n = phone.replace(/[^\d+]/g, "");
    if (n.startsWith("0")) n = "212" + n.slice(1);
    else if (n.startsWith("+")) n = n.slice(1);
    return n;
  };

  const getAvatarGradient = (name) => {
    const gradients = [
      "from-emerald-500 to-teal-700",
      "from-blue-500 to-indigo-700",
      "from-violet-500 to-purple-700",
      "from-amber-500 to-orange-700",
      "from-pink-500 to-rose-700",
      "from-cyan-500 to-blue-700",
    ];
    let hash = 0;
    for (let i = 0; i < (name?.length || 0); i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  };

  const langLabels = { ar: "العربية", fr: "Français", en: "English", es: "Español", de: "Deutsch", it: "Italiano", nl: "Nederlands" };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-emerald-500/30 selection:text-emerald-300 font-sans"
    >
      {/* Dynamic ambient lighting grid background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glowing ambient light blobs */}
      <div className="fixed top-0 right-1/4 w-150 h-100 rounded-full bg-emerald-600/10 blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/4 w-125 h-87.5 rounded-full bg-teal-600/10 blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 rounded-full bg-indigo-600/5 blur-[160px] pointer-events-none -z-10" />

      {/* ══════════════ HEADER ══════════════ */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-2xl border-b border-slate-800/80 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href={"/" + lang} className="flex items-center gap-3.5 group">
            <div className="relative">
              <Image
                src="/etsmakka.jpeg"
                alt={t?.dashboard?.brandName || "مؤسسة مكة المكرمة"}
                width={44}
                height={44}
                priority
                className="relative shadow-xs rounded-xs w-10 sm:w-11 h-auto object-cover shrink-0 ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col text-start min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors leading-snug truncate">
                  {t?.dashboard?.brandName || "مؤسسة مكة المكرمة"}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest hidden sm:inline-block">
                  Admin
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium leading-tight truncate">
                {t?.dashboard?.subBrandName || "التعليم الأولي ودروس الدعم"}
              </span>
            </div>
          </Link>

          {/* Actions Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <AdminLanguageSelector currentLang={lang} onLangChange={handleLangChange} />

            <button
              onClick={() => fetchData()}
              disabled={loading}
              title={t?.dashboard?.refreshTitle || "تحديث"}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-500/10 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all cursor-pointer disabled:opacity-50 active:scale-95 shadow-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${loading ? "animate-spin text-emerald-400" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 active:scale-95 shadow-xs"
            >
              {loggingOut ? <Loader2 className="w-4 h-4" /> : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              )}
              <span className="hidden sm:inline">{t?.dashboard?.logout || "خروج"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ── TOOLBAR & FILTERS ── */}
        <div className="flex flex-col gap-3.5 bg-slate-900/80 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl border border-slate-800 shadow-md">
          {/* Top Row: Filter Pills & Pagination */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Filter Pills */}
            <div className="grid grid-cols-3 sm:flex items-center gap-1.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800/80 w-full sm:w-auto">
              {[
                { key: "all", label: t?.dashboard?.filters?.all || "الكل", count: contactsTotal },
                { key: "unread", label: t?.dashboard?.filters?.unread || "غير مقروءة", count: contactsUnreadTotal },
                { key: "starred", label: t?.dashboard?.filters?.starred || "المميزة", count: contactsStarredTotal },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    filter === f.key
                      ? "bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="truncate">{f.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono shrink-0 ${
                    filter === f.key ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                  }`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Pagination inside Toolbar */}
            {contactsTotalPages > 1 && (
              <div className="flex items-center justify-between sm:justify-end gap-2 bg-slate-950/70 p-1 rounded-xl border border-slate-800/80 shrink-0">
                <button
                  disabled={contactsPage === 1}
                  onClick={() => { const p = contactsPage - 1; setContactsPage(p); fetchContacts(p); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                >
                  {prevText}
                </button>
                <div className="text-xs font-semibold text-slate-400 font-mono px-2 whitespace-nowrap">
                  <span className="text-emerald-400 font-extrabold">{contactsPage}</span> / {contactsTotalPages}
                </div>
                <button
                  disabled={contactsPage === contactsTotalPages}
                  onClick={() => { const p = contactsPage + 1; setContactsPage(p); fetchContacts(p); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                >
                  {nextText}
                </button>
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${isRtl ? "right-3.5" : "left-3.5"}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t?.dashboard?.search?.contactsPlaceholder || "بحث باسم ولي الأمر، الهاتف، البريد..."}
              className={`w-full bg-slate-950/70 border border-slate-800 rounded-xl py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 transition-all ${isRtl ? "pr-10 pl-10" : "pl-10 pr-10"}`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer p-1 rounded-md hover:bg-slate-800 transition-colors ${isRtl ? "left-2.5" : "right-2.5"}`}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── MESSAGES CONTENT ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 bg-slate-900/40 border border-slate-800/80 rounded-3xl">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium mt-4 animate-pulse">{t?.dashboard?.loadingData || "جاري تحميل البيانات..."}</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          /* ── Empty State ── */
          <div className="text-center py-24 bg-slate-900/50 border border-slate-800/80 rounded-3xl shadow-lg">
            <div className="w-20 h-20 rounded-3xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center mx-auto mb-4 text-slate-400 shadow-inner">
              <Mail className="w-10 h-10 opacity-50" />
            </div>
            <h4 className="text-white font-extrabold text-lg">{t?.dashboard?.empty?.noContactsTitle || "لا توجد رسائل حالياً"}</h4>
            <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">{t?.dashboard?.empty?.noContactsDesc || "لم يتم العثور على أي نتائج مطابقة لفلاتر البحث الحالية."}</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-black/30 backdrop-blur-xl">
              <table className="w-full border-collapse text-start table-fixed">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 text-[11px] font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-4 text-start w-28">{t?.dashboard?.table?.status || "الحالة"}</th>
                    <th className="py-3.5 px-4 text-start w-56">{t?.dashboard?.table?.sender || "ولي الأمر"}</th>
                    <th className="py-3.5 px-4 text-start">{t?.dashboard?.table?.messagePreview || "الرسالة والموضوع"}</th>
                    <th className="py-3.5 px-4 text-start w-36">{t?.dashboard?.table?.date || "التاريخ"}</th>
                    <th className="py-3.5 px-4 text-end w-36">{t?.dashboard?.table?.actions || "الإجراءات"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                    {filteredContacts.map((c) => (
                      <tr
                        key={c._id}
                        onClick={() => openContact(c)}
                        className={`group hover:bg-slate-800/60 transition-all duration-200 cursor-pointer ${
                          !c.isRead ? "bg-emerald-950/20 font-medium" : ""
                        }`}
                      >
                        {/* Combined Status (Star + Badge) Column */}
                        <td className="py-4 px-4 text-start whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleStar(c._id)}
                              disabled={starringId === c._id}
                              title={c.isStarred ? "إزالة النجمة" : "تمييز بنجمة"}
                              className="cursor-pointer transition-transform active:scale-90 disabled:opacity-50 p-1 hover:bg-slate-800 rounded-lg inline-flex items-center justify-center shrink-0"
                            >
                              {starringId === c._id ? (
                                <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                              ) : (
                                <Star
                                  className="w-4 h-4 transition-transform group-hover:scale-110"
                                  fill={c.isStarred ? "#f59e0b" : "none"}
                                  stroke={c.isStarred ? "#f59e0b" : "#94a3b8"}
                                />
                              )}
                            </button>
                            {!c.isRead && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-xs uppercase tracking-wider shrink-0 inline-block animate-pulse">
                                {t?.dashboard?.actions?.newBadge || "جديد"}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Sender */}
                        <td className="py-4 px-4">
                          <div className="flex flex-col min-w-0">
                            <span className={`truncate ${!c.isRead ? "text-white font-extrabold" : "text-slate-200 font-semibold"}`}>
                              {c.name}
                            </span>
                            <span className="text-xs text-slate-400 font-mono truncate" title={c.email}>{c.email}</span>
                          </div>
                        </td>

                        {/* Message Preview & Subject */}
                        <td className="py-3.5 px-4 min-w-0 overflow-hidden">
                          <div className="flex flex-col min-w-0">
                            <span className="text-slate-200 font-bold text-xs truncate">
                              {c.subject || (isArabic(c.message) ? "استفسار وتسجيل عبر الموقع" : "Website Inquiry")}
                            </span>
                            <p dir={isArabic(c.message) ? "rtl" : "ltr"} className="truncate text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed" title={c.message}>
                              {c.message}
                            </p>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap font-medium">
                          {new Date(c.createdAt).toLocaleDateString(getLocale(lang), { month: "short", day: "numeric", year: "numeric" })}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5 text-end whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openContact(c)}
                              title={t?.dashboard?.actions?.viewDetails || "عرض المعاينة"}
                              className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-slate-700/60 hover:border-emerald-500/40 transition-all cursor-pointer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => toggleRead(c._id)}
                              disabled={readingId === c._id}
                              title={c.isRead ? (t?.dashboard?.actions?.markAsUnread || "تعيين كغير مقروء") : (t?.dashboard?.actions?.markAsRead || "تعيين كمقروء")}
                              className={`p-2 rounded-xl border transition-all cursor-pointer disabled:opacity-50 ${
                                c.isRead
                                  ? "bg-slate-800 text-slate-400 border-slate-700/60 hover:text-white"
                                  : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm shadow-emerald-500/10"
                              }`}
                            >
                              {readingId === c._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : c.isRead ? <MailOpen className="w-3.5 h-3.5 text-slate-400" /> : <Mail className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => setContactToDelete(c)}
                              title={t?.dashboard?.actions?.deleteMessage || "حذف الرسالة"}
                              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>

            {/* ── Mobile Cards Layout ── */}
            <div className="flex flex-col gap-3.5 md:hidden">
              {filteredContacts.map((c) => (
                <div
                  key={c._id}
                  onClick={() => openContact(c)}
                  className={`bg-slate-900/90 border rounded-2xl p-4 cursor-pointer transition-all duration-200 space-y-3 ${
                    !c.isRead ? "border-emerald-500/50 shadow-md shadow-emerald-950/30" : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className={`w-8 h-8 rounded-lg bg-linear-to-tr ${getAvatarGradient(c.name)} flex items-center justify-center text-white font-extrabold text-xs shadow-xs shrink-0`}>
                        {c.name?.charAt(0) || "م"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className={`text-sm truncate ${!c.isRead ? "font-black text-white" : "font-semibold text-slate-200"}`}>
                            {c.name}
                          </h4>
                          {!c.isRead && (
                            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-linear-to-r from-emerald-500 to-teal-500 text-white shrink-0 animate-pulse">
                              {t?.dashboard?.actions?.newBadge || "جديد"}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono truncate">{c.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
                      {new Date(c.createdAt).toLocaleDateString(getLocale(lang), { month: "short", day: "numeric" })}
                    </span>
                  </div>

                  <p dir={isArabic(c.message) ? "rtl" : "ltr"} className="text-xs text-slate-300 line-clamp-2 leading-relaxed bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/50">
                    {c.message}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1.5">
                      {c.phone && (
                        <>
                          <a
                            href={`https://wa.me/${cleanPhoneForWhatsApp(c.phone)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-pointer"
                          >
                            <WhatsApp className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`tel:${c.phone}`}
                            className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 cursor-pointer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => toggleRead(c._id)}
                        disabled={readingId === c._id}
                        title={c.isRead ? (t?.dashboard?.actions?.markAsUnread || "تعيين كغير مقروء") : (t?.dashboard?.actions?.markAsRead || "تعيين كمقروء")}
                        className={`p-1.5 rounded-lg border cursor-pointer transition-all disabled:opacity-50 ${
                          c.isRead
                            ? "bg-slate-800 text-slate-400 border-slate-700/60 hover:text-white"
                            : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm shadow-emerald-500/10"
                        }`}
                      >
                        {readingId === c._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : c.isRead ? <MailOpen className="w-3.5 h-3.5 text-slate-400" /> : <Mail className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => toggleStar(c._id)}
                        disabled={starringId === c._id}
                        className={`p-1.5 rounded-lg border cursor-pointer transition-all disabled:opacity-50 ${
                          c.isStarred ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400" : "border-slate-800 text-slate-400"
                        }`}
                      >
                        {starringId === c._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Star className="w-3.5 h-3.5" fill={c.isStarred ? "#f59e0b" : "none"} stroke={c.isStarred ? "#f59e0b" : "currentColor"} />}
                      </button>
                      <button
                        onClick={() => setContactToDelete(c)}
                        className="p-1.5 rounded-lg border border-rose-500/20 text-rose-400 bg-rose-500/10 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── PAGINATION ── */}
            {contactsTotalPages > 1 && (
              <div className="flex items-center justify-between pt-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <button
                  disabled={contactsPage === 1}
                  onClick={() => { const p = contactsPage - 1; setContactsPage(p); fetchContacts(p); }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-950 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                >
                  {prevText}
                </button>
                <div className="text-xs font-semibold text-slate-400 font-mono">
                  <span className="text-emerald-400 font-extrabold">{contactsPage}</span> / {contactsTotalPages}
                </div>
                <button
                  disabled={contactsPage === contactsTotalPages}
                  onClick={() => { const p = contactsPage + 1; setContactsPage(p); fetchContacts(p); }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-950 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                >
                  {nextText}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* ══════════════ CONTACT DETAIL MODAL ══════════════ */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full shadow-2xl shadow-black/80 max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-thin [scrollbar-color:#334155_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-11 h-11 rounded-2xl bg-linear-to-tr ${getAvatarGradient(selectedContact.name)} flex items-center justify-center text-white font-black text-base shadow-md shrink-0 ring-1 ring-white/10`}>
                  {selectedContact.name?.charAt(0) || "م"}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-white leading-snug truncate">{selectedContact.name}</h3>
                    <button
                      onClick={() => toggleStar(selectedContact._id)}
                      disabled={starringId === selectedContact._id}
                      className="p-1 hover:bg-slate-800 rounded-lg transition-transform active:scale-90 cursor-pointer shrink-0"
                      title={selectedContact.isStarred ? "إزالة النجمة" : "تمييز بنجمة"}
                    >
                      {starringId === selectedContact._id ? (
                        <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                      ) : (
                        <Star
                          className="w-4 h-4"
                          fill={selectedContact.isStarred ? "#f59e0b" : "none"}
                          stroke={selectedContact.isStarred ? "#f59e0b" : "#94a3b8"}
                        />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 font-mono truncate">{selectedContact.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-all cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Compact Metadata Card */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Subject */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">{t?.dashboard?.modal?.subject || "الموضوع"}</span>
                    <span className="text-slate-100 font-extrabold truncate mt-0.5">
                      {translatedSubject && !showOriginal
                        ? translatedSubject
                        : selectedContact.subject || (isArabic(selectedContact.message) ? "استفسار وتسجيل عبر الموقع" : "Website Inquiry")}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">{t?.dashboard?.modal?.received || "التاريخ والوقت"}</span>
                    <span className="text-slate-300 font-mono text-[11px] truncate mt-0.5">
                      {new Date(selectedContact.createdAt).toLocaleString(getLocale(lang), { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                  </div>
                </div>

                {/* Phone & Instant Actions */}
                {selectedContact.phone && (
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">{t?.dashboard?.modal?.phoneNumber || "الهاتف"}:</span>
                      <span className="text-emerald-400 font-mono font-bold">{selectedContact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${cleanPhoneForWhatsApp(selectedContact.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={t?.dashboard?.actions?.whatsappMessage || "واتساب"}
                        className="flex items-center justify-center p-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer hover:scale-105"
                      >
                        <WhatsApp className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`tel:${selectedContact.phone}`}
                        title={t?.dashboard?.actions?.callPhone || "اتصال"}
                        className="p-1.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 text-xs font-bold transition-all cursor-pointer hover:scale-105"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Content & Multi-language Translation Bar */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">{t?.dashboard?.modal?.messageContent || "محتوى الرسالة"}</label>
                    {translatedText && !showOriginal && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono uppercase">
                        {targetLang}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {translatedText && (
                      <button
                        type="button"
                        onClick={() => setShowOriginal(!showOriginal)}
                        className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                      >
                        {showOriginal ? (t?.dashboard?.modal?.showTranslation || "عرض الترجمة") : (t?.dashboard?.modal?.showOriginal || "الأصلي")}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleTranslateMessage}
                      disabled={translating}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 active:scale-95 shadow-xs"
                    >
                      {translating ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      ) : (
                        <Image src="/flags/ma.svg" alt="Morocco" width={16} height={12} className="object-cover rounded-xs shrink-0" />
                      )}
                      <span>{translating ? (t?.dashboard?.modal?.translating || "جاري...") : (t?.dashboard?.modal?.translateMessage || "ترجمة")}</span>
                    </button>
                  </div>
                </div>

                <div
                  dir={translatedText && !showOriginal ? (isArabic(translatedText) ? "rtl" : "ltr") : (isArabic(selectedContact.message) ? "rtl" : "ltr")}
                  className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs sm:text-sm text-slate-100 leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap font-sans shadow-inner scrollbar-thin [scrollbar-color:#334155_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500"
                >
                  {translatedText && !showOriginal ? translatedText : selectedContact.message}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  {/* Read / Unread Toggle Button */}
                  <button
                    onClick={() => toggleRead(selectedContact._id)}
                    disabled={readingId === selectedContact._id}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-50 ${
                      selectedContact.isRead
                        ? "bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
                        : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm shadow-emerald-500/10"
                    }`}
                  >
                    {readingId === selectedContact._id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    ) : selectedContact.isRead ? (
                      <MailOpen className="w-4 h-4 text-slate-400" />
                    ) : (
                      <Mail className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>
                      {selectedContact.isRead
                        ? (t?.dashboard?.actions?.markAsUnread || "تعيين كغير مقروء")
                        : (t?.dashboard?.actions?.markAsRead || "تعيين كمقروء")}
                    </span>
                  </button>

                  {/* Star / Unstar Button */}
                  <button
                    onClick={() => toggleStar(selectedContact._id)}
                    disabled={starringId === selectedContact._id}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedContact.isStarred
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-amber-500/10 shadow-sm"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {starringId === selectedContact._id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    ) : (
                      <Star className="w-4 h-4" fill={selectedContact.isStarred ? "#f59e0b" : "none"} stroke={selectedContact.isStarred ? "#f59e0b" : "currentColor"} />
                    )}
                    <span>{selectedContact.isStarred ? (t?.dashboard?.modal?.unstar || "إزالة النجمة") : (t?.dashboard?.modal?.star || "تمييز بنجمة")}</span>
                  </button>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => { setContactToDelete(selectedContact); setSelectedContact(null); }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{t?.dashboard?.modal?.delete || "حذف الرسالة"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ DELETE CONFIRM MODAL ══════════════ */}
      {contactToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-rose-500/30 rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto text-2xl shadow-inner">
              ⚠️
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">{t?.dashboard?.confirmDelete?.deleteContactTitle || "حذف الرسالة؟"}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {t?.dashboard?.confirmDelete?.deleteContactMessage?.replace("{name}", contactToDelete.name) || `هل أنت متأكد من حذف رسالة ${contactToDelete.name}؟ هذا الإجراء لا يمكن التراجع عنه.`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setContactToDelete(null)}
                disabled={deleting}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer disabled:opacity-50"
              >
                {t?.dashboard?.confirmDelete?.cancel || "إلغاء"}
              </button>
              <button
                onClick={confirmDeleteContact}
                disabled={deleting}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-linear-to-r from-rose-600 to-red-600 text-white hover:from-rose-500 hover:to-red-500 shadow-md shadow-rose-950/40 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : t?.dashboard?.confirmDelete?.confirmDelete || "نعم، حذف"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
