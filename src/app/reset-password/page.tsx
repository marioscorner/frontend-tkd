// src/app/reset-password/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { confirmPasswordReset } from "@/lib/auth"; // existe en tu src/lib/auth.ts
import { useState } from "react";

export default function ResetPasswordPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const uid = Number(sp.get("uid"));
  const token = sp.get("token") || "";
  const [pwd, setPwd] = useState("");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await confirmPasswordReset(uid, token, pwd);
      setOk(true);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const resp = err as { response?: { data?: { detail?: string } } };
        setError(resp.response?.data?.detail || "Error al cambiar la contraseña");
      } else if (err instanceof Error) {
        setError(err.message || "Error al cambiar la contraseña");
      } else {
        setError("Error al cambiar la contraseña");
      }
    }
  }

  if (ok)
    return (
      <div className="p-6 text-center space-y-4">
        <h2 className="text-2xl font-semibold text-emerald-700">
          Contraseña actualizada
        </h2>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Inicia sesión
        </button>
      </div>
    );

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-sm mx-auto p-6 border rounded space-y-4"
    >
      <h2 className="text-xl font-semibold">Restablecer contraseña</h2>
      <input
        type="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        placeholder="Nueva contraseña"
        required
        className="w-full border rounded px-3 py-2"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded"
      >
        Cambiar contraseña
      </button>
    </form>
  );
}
