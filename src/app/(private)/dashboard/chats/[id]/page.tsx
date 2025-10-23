"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useChatSocket } from "@/hooks/useChatSocket";
import { listMessages, markConversationRead, getConversation } from "@/lib/chat";
import type { Message, Conversation } from "@/types/chat";
import Link from "next/link";

type PageProps = { params: { id: string } };

export default function ChatDetailPage({ params }: PageProps) {
  const conversationId = Number(params.id);
  const { user } = useAuth();

  const [conv, setConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingConv, setLoadingConv] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);

  // Socket (tiempo real)
  const { connected, sendMessage, sendRead, setOnMessage } =
    useChatSocket(Number.isFinite(conversationId) ? conversationId : null);

  // Cargar detalle de la conversación
  useEffect(() => {
    if (!Number.isFinite(conversationId)) return;
    let mounted = true;
    (async () => {
      try {
        const data = await getConversation(conversationId);
        if (mounted) setConv(data);
      } catch {
        if (mounted) setError("No se pudo cargar la conversación.");
      } finally {
        if (mounted) setLoadingConv(false);
      }
    })();
    return () => { mounted = false; };
  }, [conversationId]);

  // Cargar mensajes
  useEffect(() => {
    if (!Number.isFinite(conversationId)) return;
    let mounted = true;
    (async () => {
      try {
        const data: Message[] = await listMessages(conversationId);
        const asc = [...data].reverse();
        if (mounted) setMessages(asc);
        await markConversationRead(conversationId);
      } catch {
        if (mounted) setError("No se pudieron cargar los mensajes.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [conversationId]);

  // WS: escuchar eventos
  useEffect(() => {
    setOnMessage((evt) => {
      if (evt.event === "message.new") {
        setMessages((prev) => [...prev, evt.message]);
        sendRead();
        setTimeout(() => {
          listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
        }, 0);
      }
    });
  }, [setOnMessage, sendRead]);

  // Auto-scroll
  useEffect(() => {
    if (!loading) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    }
  }, [loading, messages.length]);

  const handleSend = () => {
    const text = draft.trim();
    if (!text || !conversationId) return;
    sendMessage(text);
    setDraft("");
  };

  // Título según tipo de conversación
  const title = useMemo(() => {
    if (!conv) return `Chat #${conversationId}`;
    if (conv.is_group) return conv.name || `Grupo #${conv.id}`;
    // 1:1 → muestra el otro participante
    const others = conv.participants
      .map((p) => p.user.username)
      .filter((u) => u !== user?.username);
    return others.join(", ") || `Chat #${conversationId}`;
  }, [conv, user?.username, conversationId]);

  if (!Number.isFinite(conversationId)) {
    return (
      <div className="p-6">
        <p className="text-red-600">Conversación inválida.</p>
        <Link href="/app/private/chats" className="text-blue-600 underline">
          Volver a chats
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-160px)] flex-col rounded-lg border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Link href="/app/private/chats" className="text-sm text-blue-600 underline">
            ← Volver
          </Link>
          <h1 className="text-lg font-semibold">
            {loadingConv ? "Cargando…" : title}
          </h1>
        </div>
        <div className="text-xs text-gray-500">
          {connected ? "Conectado" : "Reconectando..."}
        </div>
      </div>

      {/* Mensajes */}
      <div ref={listRef} className="flex-1 space-y-2 overflow-auto p-4">
        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 w-2/3 animate-pulse rounded bg-gray-100" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="py-10 text-center text-gray-500">Aún no hay mensajes.</div>
        ) : (
          messages.map((m) => {
            const mine = m.sender.id === user?.id;
            return (
              <div key={m.id} className={`max-w-[70%] ${mine ? "ml-auto" : "mr-auto"}`}>
                <div className={`rounded-lg px-3 py-2 ${mine ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                  {!mine && (
                    <div className="text-[10px] opacity-70">{m.sender.username}</div>
                  )}
                  <div className="text-sm">{m.content}</div>
                </div>
                <div className="mt-0.5 text-[10px] text-gray-400">
                  {new Date(m.created_at).toLocaleTimeString()}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Escribe un mensaje…"
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          onClick={handleSend}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
