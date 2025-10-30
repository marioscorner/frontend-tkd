export interface UserMini {
  id: number;
  username: string;
  email: string;
}

export interface ConversationParticipant {
  user: UserMini;
  joined_at?: string;
  last_read_at?: string;
}

export interface LastMessage {
  id: number;
  content: string;
  created_at: string; // ISO
  sender: { id: number; username: string };
}

export interface Conversation {
  id: number;
  name?: string | null;
  is_group: boolean;
  created_at: string; // ISO
  participants: ConversationParticipant[];
  last_message: LastMessage | null;
  unread_count: number;
}

export interface Message {
  id: number;
  content: string;
  created_at: string; // ISO
  edited_at?: string | null;
  is_deleted?: boolean;
  sender: { id: number; username: string };
  conversation?: number;
  // 🔁 NUEVO: read receipts
  seen_by?: number[];
  seen_by_other?: boolean | null; // solo 1:1 (true/false/null)
}

export type MessagesPage = {
  results: Message[];
  next: string | null;
  previous: string | null;
};
