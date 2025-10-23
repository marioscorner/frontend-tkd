"use client";

import { useEffect, useRef, useState } from "react";

type ChatEvent =
  | { event: "message.new"; message: { id: number; content: string; created_at: string; sender: { id: number; username: string } } }
  | { event: "conversation.read"; by: number; at: string };

export function useChatSocket(conversationId: number | null) {
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!conversationId) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
    if (!token) return;

    const url = `ws://127.0.0.1:8000/ws/chat/${conversationId}/?token=${token}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);

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

  const setOnMessage = (handler: (evt: ChatEvent) => void) => {
    if (!wsRef.current) return;
    wsRef.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data?.event) handler(data);
      } catch {}
    };
  };

  return { connected, sendMessage, sendRead, setOnMessage };
}