import apiClient from './client';
import { Message, CreateMessageRequest } from '@/types/db';

export const getChannelMessages = async (channelId: string): Promise<Message[]> => {
  console.log('Getting messages for channel:', channelId);
  const response = await apiClient.get(`/chat/channels/${channelId}/messages`);
  return response.data;
};

export const sendMessage = async (message: CreateMessageRequest): Promise<Message> => {
  console.log('Sending message:', message);
  const response = await apiClient.post(`/chat/channels/${message.channelId}/messages`, {
    userId: message.userId,
    content: message.content,
    type: message.type
  });
  return response.data;
};

export const updateMessage = async (messageId: string, content: string): Promise<Message> => {
  const response = await apiClient.patch(`/chat/channels/${messageId}/messages`, { content });
  return response.data;
};

export const deleteMessage = async (messageId: string): Promise<void> => {
  await apiClient.delete(`/chat/channels/${messageId}/messages`);
}; 