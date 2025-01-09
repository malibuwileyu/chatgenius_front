import { usersApi } from './users';

// Message types from the Java enum
export type MessageType = 'TEXT' | 'SYSTEM' | 'THREAD' | 'REPLY';

interface Message {
  id: string;
  content: string;
  channelId: string;
  userId: string;
  type: MessageType;
  createdAt: string;
  updatedAt?: string;
  threadId?: string;
}

interface CreateMessageRequest {
  content: string;
  userId: string;
  type: MessageType;
  channelId: string;
  threadId?: string;
}

interface CreateMessageResponse {
  id: string;
  content: string;
  channelId: string;
  userId: string;
  type: MessageType;
  createdAt: string;
  updatedAt?: string;
  threadId?: string;
}

const API_BASE = '/api';
const TEST_USER_ID = 'c2abd785-adbb-41ec-baf8-13395be722a2';  // Hardcoded testuser UUID

export const messagesApi = {
  sendMessage: async (channelId: string, content: string, type: MessageType = 'TEXT'): Promise<Message> => {
    const url = `${API_BASE}/channels/${channelId}/messages`;
    const requestBody = { 
      content,
      userId: TEST_USER_ID,  // Use hardcoded UUID
      type,
      channelId
    };
    
    console.log('Sending message request:', {
      url,
      channelId,
      body: requestBody,
      method: 'POST'
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    const responseText = await response.text();
    console.log('Response body:', responseText);

    if (!response.ok) {
      console.error('Failed to send message:', responseText);
      throw new Error(`Failed to send message: ${responseText}`);
    }

    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response as JSON:', e);
      throw new Error('Invalid response format from server');
    }

    console.log('Message sent successfully:', data);
    return data;
  },

  getChannelMessages: async (channelId: string): Promise<Message[]> => {
    if (!channelId) {
      console.error('No channel ID provided to getChannelMessages');
      return [];
    }

    // Ensure we're using the UUID
    const url = `${API_BASE}/channels/${channelId}/messages`;
    console.log('Fetching messages for channel UUID:', { channelId, url });

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Get messages response status:', response.status);
      const responseText = await response.text();
      console.log('Get messages raw response:', responseText);

      if (!response.ok) {
        console.error('Failed to fetch messages:', responseText);
        throw new Error(`Failed to fetch messages: ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse messages response:', e);
        return [];
      }

      // Handle paginated response format
      const messageContent = data.content || [];
      
      // Map the response to our Message interface
      const messages = messageContent.map((msg: any) => ({
        id: msg.id,
        content: msg.content,
        channelId: msg.channel.id,
        userId: msg.user.id,
        type: msg.type as MessageType,
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
        threadId: msg.thread?.id
      }));
                      
      console.log('Parsed channel messages:', messages);
      return messages;
    } catch (error) {
      console.error('Error in getChannelMessages:', error);
      throw error;
    }
  },
};
