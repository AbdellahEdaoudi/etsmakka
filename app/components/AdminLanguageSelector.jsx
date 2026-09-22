"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "@/app/components/Icons";

const languages = [
  { code: "ar", name: "العربية", countryCode: "ma" },
  { code: "fr", name: "Français", countryCode: "fr" },
  { code: "en", name: "English", countryCode: "gb" },
  { code: "es", name: "Español", countryCode: "es" },
  { code: "de", name: "Deutsch", countryCode: "de" },
  { code: "it", name: "Italiano", countryCode: "it" },
  { code: "nl", name: "Nederlands", countryCode: "nl" },
];

export default function AdminLanguageSelector({ currentLang = "ar", onLangChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLang = languages.find((l) => l.code === currentLang) || languages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-start" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-emerald-500/10 border border-slate-800 hover:border-emerald-500/40 text-slate-200 text-xs font-bold cursor-pointer shadow-md transition-all active:scale-95 focus:outline-none"
      >
        <Image
          src={`/flags/${selectedLang.countryCode}.svg`}
          alt={selectedLang.name}
          width={18}
          height={13}
          className="object-cover rounded-2xs shadow-xs shrink-0"
        />
        <span className="uppercase font-mono tracking-wider text-slate-300">{selectedLang.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-2.5 w-48 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/80 border border-slate-800 py-2 z-50 overflow-hidden text-start inset-e-0 ring-1 ring-slate-800 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                onLangChange(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-start transition-colors cursor-pointer ${
                currentLang === lang.code
                  ? "bg-emerald-500/15 text-emerald-400 font-extrabold"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white font-medium"
              }`}
            >
              <Image
                src={`/flags/${lang.countryCode}.svg`}
                alt={lang.name}
                width={18}
                height={13}
                className="object-cover rounded-2xs shadow-xs shrink-0"
              />
              <span className="flex-1">{lang.name}</span>
              {currentLang === lang.code && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
