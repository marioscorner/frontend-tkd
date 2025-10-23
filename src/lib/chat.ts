import type { Conversation } from "@/types/chat";
import API from "./api";

export async function listConversations() {
  const res = await API.get("/chat/conversations/");
  return res.data;
}

export async function createOneToOne(otherUserId: number) {
  const res = await API.post("/chat/conversations/create/", {
    is_group: false,
    users: [otherUserId],
  });
  return res.data;
}

export async function createGroup(name: string, userIds: number[]) {
  const res = await API.post("/chat/conversations/create/", {
    is_group: true,
    name,
    users: userIds,
  });
  return res.data;
}

export async function listMessages(conversationId: number) {
  const res = await API.get(`/chat/conversations/${conversationId}/messages/`);
  return res.data;
}

export async function sendMessage(conversationId: number, content: string) {
  const res = await API.post(`/chat/conversations/${conversationId}/messages/`, { content });
  return res.data;
}

export async function markConversationRead(conversationId: number) {
  const res = await API.post(`/chat/conversations/${conversationId}/read/`);
  return res.data;
}

export async function getConversation(id: number): Promise<Conversation> {
  const res = await API.get(`/chat/conversations/${id}/`);
  return res.data as Conversation;
}
