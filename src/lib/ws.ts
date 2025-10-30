// src/lib/ws.ts
export const WS_BASE = (process.env.NEXT_PUBLIC_WS_BASE_URL || "ws://localhost:8000").replace(/\/$/, "");
export function wsUrl(path: string, token?: string) {
  const sep = path.includes("?") ? "&" : "?";
  return `${WS_BASE}${path}${token ? `${sep}token=${encodeURIComponent(token)}` : ""}`;
}