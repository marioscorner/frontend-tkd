import API from "./api";
import type { Conversation, Message, MessagesPage } from "@/types/chat";

// Conversaciones
export async function listConversations() {
  const res = await API.get("chat/conversations/");
  return res.data as Conversation[];
}

export async function createOneToOne(otherUserId: number) {
  const res = await API.post("chat/conversations/create/", {
    is_group: false,
    users: [otherUserId],
  });
  return res.data as Conversation;
}

export async function getConversation(id: number): Promise<Conversation> {
  const res = await API.get(`chat/conversations/${id}/`);
  return res.data as Conversation;
}

// Mensajes (compat histórico)
export async function listMessages(conversationId: number): Promise<Message[]> {
  // Mantengo esta firma por compatibilidad (retorna todos los mensajes actuales, si tu backend lo permite)
  const res = await API.get(`chat/conversations/${conversationId}/messages/`);
  // Si el backend ahora usa cursor, puede devolver {results:[]}; normalizamos:
  const data = res.data;
  if (data && Array.isArray(data)) return data as Message[];
  if (data && Array.isArray(data.results)) {
    // devolver en orden ascendente (antiguos->nuevos) como esperaba tu página
    return [...data.results].reverse();
  }
  return [];
}

// 🔁 Mensajes con cursor (NUEVO)
export async function listMessagesPage(
  conversationId: number,
  params?: { cursor?: string; page_size?: number }
): Promise<MessagesPage> {
  const res = await API.get(`chat/conversations/${conversationId}/messages/`, {
    params: params?.cursor ? { cursor: params.cursor } : { page_size: params?.page_size ?? 30 },
  });
  // Garantizamos shape DRF CursorPagination
  return {
    results: res.data?.results ?? (Array.isArray(res.data) ? res.data : []),
    next: res.data?.next ?? null,
    previous: res.data?.previous ?? null,
  };
}

export async function sendMessage(conversationId: number, content: string) {
  const res = await API.post(`chat/conversations/${conversationId}/messages/`, { content });
  return res.data as Message;
}

export async function markConversationRead(conversationId: number) {
  const res = await API.post(`chat/conversations/${conversationId}/read/`);
  return res.data;
}
