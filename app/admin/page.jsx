"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

// ─── Utility ────────────────────────────────────────────────────────────────

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

const AVATAR_COLORS = [
  ["#3b82f6", "#1d4ed8"],
  ["#8b5cf6", "#6d28d9"],
  ["#ec4899", "#be185d"],
  ["#10b981", "#047857"],
  ["#f59e0b", "#b45309"],
  ["#06b6d4", "#0e7490"],
];

function avatarColor(name = "") {
  const i = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[i];
}

// ─── Modal ───────────────────────────────────────────────────────────────────

function MessageModal({ msg, onClose, onDelete }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!msg) return null;
  const [from, to] = avatarColor(msg.name);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "#0f1623",
          border: "1px solid rgba(255,255,255,0.08)",
          animation: "modalIn 0.2s cubic-bezier(.34,1.56,.64,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
        />

        {/* Header */}
        <div className="flex items-start gap-4 px-6 pt-6 pb-4">
          <div
            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-sm"
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          >
            {getInitials(msg.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-base leading-tight truncate">
              {msg.name}
            </p>
            <p className="text-sm mt-0.5" style={{ color: "#6b7a99" }}>
              {msg.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: "#6b7a99", background: "rgba(255,255,255,0.04)", cursor: "pointer" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
            }
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Subject pill */}
        <div className="px-6 pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#2d3a52", letterSpacing: "0.08em" }}>
            Subject
          </p>
          <div
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${from}22, ${to}22)`,
              color: from,
              border: `1px solid ${from}33`,
              display: "inline-block",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              verticalAlign: "middle",
            }}
            title={msg.subject || "No subject"}
          >
            {msg.subject || "No subject"}
          </div>
        </div>

        {/* Divider */}
        <div
          className="mx-6"
          style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
        />

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: "300px" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#2d3a52", letterSpacing: "0.08em" }}>
            Message
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{
              color: "#a0aec0",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {msg.message}
          </p>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <span className="text-xs" style={{ color: "#4a5568" }}>
            {formatDate(msg.createdAt)}
          </span>
          <button
            onClick={() => {
              onDelete(msg._id);
              onClose();
            }}
            className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            style={{
              background: "rgba(239,68,68,0.1)",
              color: "#f87171",
              border: "1px solid rgba(239,68,68,0.2)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(239,68,68,0.18)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
            }
          >
            <TrashIcon />
            Delete message
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete confirm popover ──────────────────────────────────────────────────

function DeleteConfirm({ onConfirm, onCancel }) {
  return (
    <div
      className="absolute right-0 top-8 z-20 rounded-xl p-4 shadow-xl w-52"
      style={{
        background: "#0f1623",
        border: "1px solid rgba(255,255,255,0.1)",
        animation: "modalIn 0.15s ease both",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-xs font-medium text-white mb-1">Delete message?</p>
      <p className="text-xs mb-3" style={{ color: "#6b7a99" }}>
        This action cannot be undone.
      </p>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 text-xs py-1.5 rounded-lg transition-colors"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#a0aec0",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
          }
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors"
          style={{ background: "#ef4444", color: "#fff", cursor: "pointer" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#dc2626")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#ef4444")
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "#0f1623",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl"
          style={{ background: "#1a2235", animation: "pulse 1.5s infinite" }}
        />
        <div className="flex-1 space-y-2">
          <div
            className="h-3 w-2/3 rounded-full"
            style={{ background: "#1a2235", animation: "pulse 1.5s infinite" }}
          />
          <div
            className="h-2.5 w-1/2 rounded-full"
            style={{
              background: "#1a2235",
              animation: "pulse 1.5s 0.2s infinite",
            }}
          />
        </div>
      </div>
      <div
        className="h-2.5 w-3/4 rounded-full mb-2"
        style={{ background: "#1a2235", animation: "pulse 1.5s 0.1s infinite" }}
      />
      <div
        className="h-2.5 w-full rounded-full mb-1.5"
        style={{ background: "#1a2235", animation: "pulse 1.5s 0.2s infinite" }}
      />
      <div
        className="h-2.5 w-5/6 rounded-full mb-1.5"
        style={{ background: "#1a2235", animation: "pulse 1.5s 0.3s infinite" }}
      />
      <div
        className="h-2.5 w-2/3 rounded-full"
        style={{ background: "#1a2235", animation: "pulse 1.5s 0.4s infinite" }}
      />
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 4h12M5.333 4V2.667A1.333 1.333 0 016.667 1.333h2.666A1.333 1.333 0 0110.667 2.667V4m2 0l-.667 9.333A1.333 1.333 0 0110.667 14.667H5.333A1.333 1.333 0 014 13.333L3.333 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      style={{ color: "#4a5568" }}
    >
      <circle
        cx="7"
        cy="7"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M11 11l3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 2h4v4M6 14H2v-4M14 2l-5 5M2 14l5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Message Card ─────────────────────────────────────────────────────────────

function MessageCard({ msg, onDelete, onView, style }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [from, to] = avatarColor(msg.name);

  const handleDelete = (e) => {
    e.stopPropagation();
    setConfirmOpen(true);
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "#0f1623",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        ...style,
      }}
      onClick={() => onView(msg)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Gradient accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, ${from}66, ${to}66)`,
          opacity: 0,
          transition: "opacity 0.2s",
        }}
        ref={(el) => {
          if (el) {
            const card = el.parentElement;
            card.addEventListener("mouseenter", () => (el.style.opacity = "1"));
            card.addEventListener("mouseleave", () => (el.style.opacity = "0"));
          }
        }}
      />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold text-xs"
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          >
            {getInitials(msg.name)}
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="font-semibold text-sm leading-snug truncate"
              style={{ color: "#e2e8f0" }}
            >
              {msg.name}
            </p>
            <p
              className="text-xs truncate mt-0.5"
              style={{ color: "#4a5568" }}
            >
              {msg.email}
            </p>
          </div>

          {/* Actions */}
          <div
            className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onView(msg)}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "#6b7a99",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
              }
              title="View full message"
            >
              <ExpandIcon />
            </button>
            <div className="relative">
              <button
                onClick={handleDelete}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  color: "#f87171",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(239,68,68,0.16)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(239,68,68,0.08)")
                }
                title="Delete message"
              >
                <TrashIcon />
              </button>
              {confirmOpen && (
                <DeleteConfirm
                  onConfirm={() => {
                    setConfirmOpen(false);
                    onDelete(msg._id);
                  }}
                  onCancel={() => setConfirmOpen(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#2d3a52", letterSpacing: "0.08em" }}>
            Subject
          </p>
          <div
            className="text-xs font-medium truncate px-2.5 py-1 rounded-md"
            style={{
              background: `linear-gradient(135deg, ${from}18, ${to}18)`,
              color: from,
              border: `1px solid ${from}28`,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
            }}
            title={msg.subject || "No subject"}
          >
            {msg.subject || "No subject"}
          </div>
        </div>

        {/* Message preview */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#2d3a52", letterSpacing: "0.08em" }}>
            Message
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{
              color: "#6b7a99",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {msg.message}
          </p>
        </div>

        {/* Footer */}
        <div
          className="mt-4 pt-3 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="text-xs" style={{ color: "#374151" }}>
            {formatDate(msg.createdAt)}
          </span>
          <span
            className="text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
            style={{ color: "#4a5568" }}
          >
            Read more
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 5h6M5 2l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ isSearch }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: "#374151" }}>
          <path
            d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="font-semibold text-base" style={{ color: "#e2e8f0" }}>
        {isSearch ? "No results found" : "No messages yet"}
      </p>
      <p className="text-sm mt-1.5" style={{ color: "#4a5568" }}>
        {isSearch
          ? "Try a different search term"
          : "Messages from your website will appear here"}
      </p>
    </div>
  );
}

// ─── Global Styles ────────────────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
    * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.94) translateY(8px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.7; }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #1e2d42; border-radius: 99px; }
  `}</style>
);

// ─── Page Background ──────────────────────────────────────────────────────────

const PageBg = ({ children }) => (
  <div
    className="min-h-screen"
    style={{
      background: "#070d18",
      backgroundImage:
        "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.07), transparent)",
    }}
  >
    {children}
  </div>
);

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onSuccess }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = async () => {
    if (!value.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/contact?secret=${encodeURIComponent(value)}`);
      const data = await res.json();

      if (res.status === 401 || !data.success) {
        setError("Incorrect secret key. Please try again.");
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setValue("");
      } else {
        onSuccess(value, data.messages);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBg>
      <GlobalStyles />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          style={{
            animation: "fadeUp 0.4s ease both",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2a5 5 0 015 5v2H7V7a5 5 0 015-5zM5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2zm7 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                  stroke="#fff"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1
            className="text-2xl font-bold text-center mb-1"
            style={{ color: "#f0f4ff" }}
          >
            Admin Access
          </h1>
          <p className="text-sm text-center mb-8" style={{ color: "#4a5568" }}>
            Enter your secret key to view messages
          </p>

          {/* Card */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "#0f1623",
              border: "1px solid rgba(255,255,255,0.08)",
              animation: shake ? "shake 0.4s ease" : "none",
            }}
          >
            <label
              className="block text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#2d3a52", letterSpacing: "0.08em" }}
            >
              Secret Key
            </label>
            <input
              type="password"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter secret key…"
              autoFocus
              className="w-full text-sm px-4 py-2.5 rounded-xl outline-none transition-all mb-3"
              style={{
                background: "#070d18",
                border: `1px solid ${error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: "#e2e8f0",
                caretColor: "#3b82f6",
              }}
              onFocus={(e) =>
                !error && (e.target.style.borderColor = "rgba(59,130,246,0.4)")
              }
              onBlur={(e) =>
                !error && (e.target.style.borderColor = "rgba(255,255,255,0.08)")
              }
            />

            {/* Error */}
            {error && (
              <p className="text-xs mb-3" style={{ color: "#f87171" }}>
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !value.trim()}
              className="w-full text-sm font-semibold py-2.5 rounded-xl transition-all"
              style={{
                background:
                  loading || !value.trim()
                    ? "rgba(59,130,246,0.3)"
                    : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                color: loading || !value.trim() ? "#4a5568" : "#fff",
                cursor: loading || !value.trim() ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Verifying…" : "Enter Dashboard"}
            </button>
          </div>
        </div>
      </div>
    </PageBg>
  );
}

// ─── Cookie Helpers ───────────────────────────────────────────────────────────

const COOKIE_NAME = "admin_secret";
const COOKIE_DAYS = 7;

function setCookie(value) {
  const expires = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
}

function getCookie() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [secret, setSecret] = useState(null);
  const [messages, setMessages] = useState([]);
  const [autoLoading, setAutoLoading] = useState(true); // checking cookie on mount
  const [search, setSearch] = useState("");
  const [selectedMsg, setSelectedMsg] = useState(null);

  // On mount: check if cookie exists and auto-login
  useEffect(() => {
    const saved = getCookie();
    if (!saved) { setAutoLoading(false); return; }

    fetch(`/api/contact?secret=${encodeURIComponent(saved)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setSecret(saved);
          setMessages(data.messages);
        } else {
          deleteCookie(); // cookie is stale / secret changed
        }
      })
      .catch(() => deleteCookie())
      .finally(() => setAutoLoading(false));
  }, []);

  // Called by LoginScreen on success
  const handleLogin = (secretKey, initialMessages) => {
    setCookie(secretKey);
    setSecret(secretKey);
    setMessages(initialMessages);
  };

  const handleLogout = () => {
    deleteCookie();
    setSecret(null);
    setMessages([]);
  };

  const handleDelete = useCallback(async (id) => {
    try {
      const res = await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, secret }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }, [secret]);

  // Still checking cookie
  if (autoLoading) {
    return (
      <>
        <GlobalStyles />
        <PageBg>
          <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                  animation: "pulse 1.2s infinite",
                }}
              />
              <p className="text-xs" style={{ color: "#2d3a52" }}>Loading…</p>
            </div>
          </div>
        </PageBg>
      </>
    );
  }

  // Not logged in
  if (!secret) {
    return <LoginScreen onSuccess={handleLogin} />;
  }

  const filtered = messages.filter((m) =>
    `${m.name} ${m.email} ${m.subject} ${m.message}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <GlobalStyles />
      <PageBg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* ── Header ── */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8"
            style={{ animation: "fadeUp 0.4s ease both" }}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <Link href={"/"}
                  className=" cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M14 10.667A1.333 1.333 0 0112.667 12H4l-2.667 2.667V3.333A1.333 1.333 0 012.667 2h10A1.333 1.333 0 0114 3.333v7.334z"
                      stroke="#fff"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <h1
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: "#f0f4ff" }}
                >
                  Messages
                </h1>
              </div>
              <p className="text-sm" style={{ color: "#4a5568" }}>
                {messages.length} total
                {search && filtered.length !== messages.length
                  ? ` · ${filtered.length} matching`
                  : ""}
              </p>
            </div>

            {/* Right side: search + logout */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-72">
                <SearchIcon />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, subject…"
                  className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl outline-none transition-all"
                  style={{
                    background: "#0f1623",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#e2e8f0",
                    caretColor: "#3b82f6",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(59,130,246,0.4)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                  }
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded"
                    style={{ color: "#4a5568", background: "rgba(255,255,255,0.06)", cursor: "pointer" }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="shrink-0 text-xs px-3 py-2.5 rounded-xl transition-colors"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#4a5568",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e8f0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4a5568")}
                title="Lock dashboard"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Grid ── */}
          {filtered.length === 0 ? (
            <EmptyState isSearch={!!search} />
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((msg, i) => (
                <MessageCard
                  key={msg._id}
                  msg={msg}
                  onDelete={handleDelete}
                  onView={setSelectedMsg}
                  style={{ animation: `fadeUp 0.35s ${i * 0.04}s ease both` }}
                />
              ))}
            </div>
          )}
        </div>
      </PageBg>

      {/* ── Modal ── */}
      {selectedMsg && (
        <MessageModal
          msg={selectedMsg}
          onClose={() => setSelectedMsg(null)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}