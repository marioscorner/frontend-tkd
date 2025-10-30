// src/components/auth/EmailVerifyBanner.tsx
"use client";

import { useState } from "react";
import { requestEmailVerify } from "@/lib/auth"; // ya lo tienes en src/lib/auth.ts

type Props = {
  email: string;
  visible: boolean;        // mostrar si el claim email_verified es false
  className?: string;
  cooldownSec?: number;
};

export default function EmailVerifyBanner({
  email,
  visible,
  className = "",
  cooldownSec = 30,
}: Props) {
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  if (!visible) return null;

  async function onResend() {
    if (cooldown > 0 || sending) return;
    setSending(true);
    setMsg(null);
    setErr(null);
    try {
      await requestEmailVerify(email);
      setMsg("Correo de verificación enviado. Revisa tu bandeja de entrada.");
      setCooldown(cooldownSec);
      const iv = window.setInterval(() => {
        setCooldown((c) => {
          if (c <= 1) {
            window.clearInterval(iv);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } catch (e: unknown) {
      let detail: string | null = null;

      if (e instanceof Error) {
        detail = e.message;
      } else if (typeof e === "object" && e !== null) {
        const obj = e as Record<string, unknown>;
        const response = obj.response;
        if (typeof response === "object" && response !== null) {
          const data = (response as Record<string, unknown>).data;
          if (typeof data === "object" && data !== null) {
            const detailVal = (data as Record<string, unknown>).detail;
            if (typeof detailVal === "string") detail = detailVal;
          }
        }
      }

      setErr(detail || "No se pudo enviar el correo. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className={`rounded border p-3 bg-yellow-50 border-yellow-200 text-yellow-900 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5">✉️</div>
        <div className="flex-1">
          <div className="font-medium">Verifica tu correo electrónico</div>
          <p className="text-sm">
            Tu cuenta aún no está verificada. Envía el correo de verificación a{" "}
            <span className="font-medium">{email}</span> para desbloquear todas las funciones.
          </p>

          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={onResend}
              disabled={sending || cooldown > 0}
              className={`px-3 py-1.5 rounded text-sm ${
                sending || cooldown > 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {cooldown > 0 ? `Reenviar (${cooldown}s)` : "Reenviar verificación"}
            </button>
            {sending && <span className="text-sm text-gray-600">Enviando…</span>}
          </div>

          {msg && <p className="mt-2 text-sm text-emerald-700">{msg}</p>}
          {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
        </div>
      </div>
    </div>
  );
}
