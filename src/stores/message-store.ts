import { create } from 'zustand';
import { messagesApi, type MessageType } from '../lib/api/messages';

interface MessageStore {
  messages: Record<string, any[]>;  // channelId -> messages[]
  isLoading: boolean;
  error: string | null;
  fetchMessages: (channelId: string) => Promise<void>;
  sendMessage: (channelId: string, content: string, type?: MessageType) => Promise<void>;
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: {},
  isLoading: false,
  error: null,

  fetchMessages: async (channelId: string) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Store: Fetching messages for channel:', channelId);
      const messages = await messagesApi.getChannelMessages(channelId);
      console.log('Store: Received messages:', messages);
      
      set(state => ({
        messages: {
          ...state.messages,
          [channelId]: messages
        }
      }));
    } catch (error) {
      console.error('Store: Error fetching messages:', error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (channelId: string, content: string, type: MessageType = 'TEXT') => {
    set({ isLoading: true, error: null });
    try {
      console.log('Store: Sending message:', { channelId, content, type });
      const message = await messagesApi.sendMessage(channelId, content, type);
      console.log('Store: Message sent:', message);
      
      // Add the new message to the channel's message list
      set(state => ({
        messages: {
          ...state.messages,
          [channelId]: [...(state.messages[channelId] || []), message]
        }
      }));
    } catch (error) {
      console.error('Store: Error sending message:', error);
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
})); 