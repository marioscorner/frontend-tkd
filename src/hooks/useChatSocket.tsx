"use client";

import { useEffect, useRef, useState } from "react";
import { wsUrl } from "@/lib/ws";

const token = typeof window !== "undefined" ? (localStorage.getItem("access") ?? undefined) : undefined;
const url = wsUrl(`/ws/health/`, token); // o tu ruta /ws/chat/<id>/
const ws = new WebSocket(url);


type BaseMessage = {
  id: number;
  content: string;
  created_at: string;
  sender: { id: number; username: string };
};

type ChatEvent =
  | { event: "message.new"; message: BaseMessage }
  | { event: "conversation.read"; by: number; at: string }
  | { event: "typing.start"; by: number; at?: string }
  | { event: "typing.stop"; by: number; at?: string }
  | { event: "error"; detail?: string };

export function useChatSocket(conversationId: number | null) {
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!conversationId) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
    if (!token) return;

    const wsUrl = `${window.location.origin.replace(/^http/, "ws")}/ws/chat/${conversationId}/`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);

    // Si el backend envía error 403 en conexión, simplemente permanecerá desconectado
    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [conversationId]);

  const sendMessage = (content: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ action: "message", content }));
  };

  const sendRead = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ action: "read" }));
  };

  // NUEVO: typing
  const sendTypingStart = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ action: "typing.start" }));
  };
  const sendTypingStop = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ action: "typing.stop" }));
  };

  const setOnMessage = (handler: (evt: ChatEvent) => void) => {
    if (!wsRef.current) return;
    wsRef.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data?.event) handler(data as ChatEvent);
      } catch {}
    };
  };

  return { connected, sendMessage, sendRead, setOnMessage, sendTypingStart, sendTypingStop };
}
