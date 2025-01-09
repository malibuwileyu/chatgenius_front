import { create } from 'zustand';
import { channelsApi, type Channel, type CreateChannelType } from '../lib/api/channels';

interface ChannelStore {
  channels: Channel[];
  activeChannelId: string | null;
  isLoading: boolean;
  error: string | null;
  fetchChannels: () => Promise<void>;
  createChannel: (name: string, type: CreateChannelType) => Promise<Channel>;
  setActiveChannel: (channelId: string) => void;
}

export const useChannelStore = create<ChannelStore>((set, get) => ({
  channels: [],
  activeChannelId: null,
  isLoading: false,
  error: null,

  fetchChannels: async () => {
    set({ isLoading: true, error: null });
    try {
      console.log('Store: Fetching channels...');
      const channels = await channelsApi.list();
      console.log('Store: Received channels:', channels);
      
      if (!channels || channels.length === 0) {
        console.log('Store: No channels received');
      }
      
      set({ channels: channels || [] });
    } catch (error) {
      console.error('Store: Error fetching channels:', error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  createChannel: async (name: string, type: CreateChannelType = 'PUBLIC') => {
    set({ isLoading: true, error: null });
    try {
      console.log('Store: Creating channel:', { name, type });
      const channel = await channelsApi.create(name, type);
      console.log('Store: Channel created:', channel);
      
      set(state => ({
        channels: [...state.channels, channel],
        activeChannelId: channel.id
      }));
      return channel;
    } catch (error) {
      console.error('Store: Error creating channel:', error);
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setActiveChannel: (channelId: string) => {
    console.log('Store: Setting active channel:', channelId);
    set({ activeChannelId: channelId });
  }
})); 