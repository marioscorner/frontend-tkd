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
  name: string | null;
  is_group: boolean;
  created_at?: string;
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
  conversation?: number; // opcional si lo devuelve el backend
}
