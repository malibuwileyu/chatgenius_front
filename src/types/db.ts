// Database Types - Matching PostgreSQL Schema

export interface User {
  id: string;
  username: string;
  email: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Channel {
  id: string; // UUID
  name: string;
  description?: string;
  type: 'public' | 'private' | 'dm';
  createdAt: Date;
  updatedAt: Date;
}

export interface ChannelMember {
  channelId: string; // UUID
  userId: string; // UUID
  role: 'member' | 'admin';
  joinedAt: Date;
}

export interface Message {
  id: string;
  channelId: string;
  userId: string;
  username?: string; // Optional as it might not come from the backend
  content: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: string; // UUID
  messageId: string; // UUID
  fileUrl: string;
  fileType: string;
  fileName: string;
  fileSize: number;
  createdAt: Date;
}

export interface Reaction {
  id: string; // UUID
  messageId: string; // UUID
  userId: string; // UUID
  emoji: string;
  createdAt: Date;
}

export interface ChannelInvitation {
  id: string; // UUID
  channelId: string; // UUID
  inviterId: string; // UUID
  inviteeId: string; // UUID
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// API Request/Response Types
export interface CreateMessageRequest {
  channelId: string;
  userId: string;
  content: string;
  type: string;
}

export interface UpdateMessageRequest {
  content: string;
}

export interface CreateChannelRequest {
  name: string;
  description?: string;
  type: 'public' | 'private' | 'dm';
}

export interface UpdateChannelRequest {
  name: string;
  description?: string;
}

export interface CreateReactionRequest {
  messageId: string;
  userId: string;
  emoji: string;
}

// WebSocket Event Types
export interface WebSocketEvent {
  type: 'message' | 'channel' | 'presence';
  action: 'create' | 'update' | 'delete';
  payload: any;
} 