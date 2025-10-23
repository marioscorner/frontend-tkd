"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { listConversations } from "@/lib/chat";
import type { Conversation } from "@/types/chat";

export default function ChatsPage() {
  const { user } = useAuth();
  const [convs, setConvs] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar conversaciones
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data: Conversation[] = await listConversations();
        if (mounted) setConvs(data);
      } catch (e) {
        if (mounted) setError("No se pudieron cargar las conversaciones.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const emptyState = useMemo(
    () =>
      !loading &&
      !error &&
      convs.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          Aún no tienes conversaciones.
        </div>
      ),
    [loading, error, convs.length]
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Conversaciones</h1>

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded bg-gray-100" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {emptyState}

      {!loading && !error && convs.length > 0 && (
        <div className="space-y-2">
          {convs.map((c) => {
            const title = c.is_group
              ? c.name || `Grupo #${c.id}`
              : c.participants
                  .map((p) => p.user.username)
                  .filter((u) => u !== user?.username)
                  .join(", ");

            return (
              <Link
                key={c.id}
                href={`/app/private/chats/${c.id}`}
                className="flex items-center justify-between gap-4 rounded border p-3 hover:bg-gray-50"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">{title}</div>
                  {c.last_message && (
                    <div className="truncate text-sm text-gray-500">
                      {c.last_message.sender.username}: {c.last_message.content}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {c.unread_count > 0 && (
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                      {c.unread_count}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {c.last_message
                      ? new Date(c.last_message.created_at).toLocaleTimeString()
                      : ""}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
