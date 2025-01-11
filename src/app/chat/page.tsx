'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Channel {
  id: string;
  name: string;
}

interface Message {
  id: string;
  content: string;
  username: string;
  channelId: string;
  threadId?: string;
  type: string;
  createdAt: string;
}

interface WebSocketMessage {
  type: string;
  data?: {
    message?: string;
    sessionId?: string;
    username?: string;
    messageId?: string;
    channelId?: string;
    content?: string;
    userId?: string;
    timestamp?: number;
    isTyping?: boolean;
  };
}

interface CreateChannelData {
  name: string;
  type: 'PUBLIC' | 'PRIVATE' | 'DIRECT_MESSAGE';
}

export default function ChatPage() {
  const router = useRouter();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [username, setUsername] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const [createChannelData, setCreateChannelData] = useState<CreateChannelData>({
    name: '',
    type: 'PUBLIC'
  });
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);

  // Add click outside listener
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const connectWebSocket = (token: string, selectedChannelId: string | null = null) => {
    try {
      // Close existing connection if any
      if (socket) {
        socket.close();
        setSocket(null);
      }

      // Clear any existing error
      setConnectionError('');

      // Connect to the correct WebSocket endpoint with token in query parameter
      const ws = new WebSocket(`ws://localhost:8080/ws/chat?token=${token}`);
      
      ws.onopen = () => {
        console.log('WebSocket Connected');
        setConnectionError('');
        
        // Join channel if one is selected
        if (selectedChannelId) {
          console.log('Joining channel:', selectedChannelId);
          ws.send(JSON.stringify({
            type: 'chat:join',
            data: {
              channelId: selectedChannelId
            }
          }));
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as WebSocketMessage;
          console.log('Received message:', data);
          
          switch (data.type) {
            case 'connected':
              console.log('Connection successful:', data);
              break;
            case 'chat:message':
              if (data.data?.channelId === selectedChannel && 
                  data.data.messageId && 
                  data.data.content && 
                  data.data.userId && 
                  data.data.timestamp) {
                console.log('Received new message:', data.data);
                const newMessage: Message = {
                  id: data.data.messageId,
                  content: data.data.content,
                  username: data.data.userId,
                  channelId: data.data.channelId,
                  type: 'TEXT',
                  createdAt: new Date(data.data.timestamp).toISOString()
                };
                // Replace temporary message if it exists, otherwise add the new message
                setMessages(prev => {
                  const tempIndex = prev.findIndex(m => 
                    m.content === data.data?.content && 
                    m.username === data.data?.userId &&
                    m.id.startsWith('temp-')
                  );
                  if (tempIndex !== -1) {
                    const newMessages = [...prev];
                    newMessages[tempIndex] = newMessage;
                    return newMessages;
                  }
                  return [...prev, newMessage];
                });
              }
              break;
            case 'chat:joined':
              console.log('Successfully joined channel:', data);
              break;
            case 'error':
              console.error('Server error:', data);
              setConnectionError(data.data?.message || 'An error occurred');
              // If authentication error, redirect to login
              if (data.data?.message?.includes('authentication')) {
                localStorage.removeItem('token');
                router.push('/login');
              }
              break;
            case 'chat:message:deleted':
              if (data.data?.messageId) {
                setMessages(prev => prev.filter(m => m.id !== data.data?.messageId));
              }
              break;
            default:
              console.log('Unhandled message type:', data.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          setConnectionError('Error processing message from server');
        }
      };

      ws.onerror = (event: Event) => {
        const wsEvent = event as WebSocketEventMap['error'];
        console.error('WebSocket error:', wsEvent);
        const errorMessage = 'WebSocket connection failed - please check your authentication status';
        setConnectionError(errorMessage);
        // Clear token and redirect to login if it's an authentication error
        localStorage.removeItem('token');
        router.push('/login');
      };

      ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
        setSocket(null);
        
        // If closed due to authentication error (code 1008), redirect to login
        if (event.code === 1008) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
        
        // Attempt to reconnect after 5 seconds if not an authentication error
        if (!connectionError.includes('authentication')) {
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
          }
          reconnectTimeoutRef.current = setTimeout(() => {
            if (document.visibilityState === 'visible') {
              const token = localStorage.getItem('token');
              if (token) {
                connectWebSocket(token, selectedChannel);
              }
            }
          }, 5000);
        }
      };

      setSocket(ws);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error creating WebSocket:', errorMessage);
      setConnectionError('Failed to connect to server');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user info
        const userResponse = await fetch('http://localhost:8080/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!userResponse.ok) {
          if (userResponse.status === 401 || userResponse.status === 403) {
            localStorage.removeItem('token');
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch user info');
        }
        
        const userData = await userResponse.json();
        setUsername(userData.username || '');

        // Fetch channels
        const channelsResponse = await fetch('http://localhost:8080/api/channels', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!channelsResponse.ok) {
          if (channelsResponse.status === 401 || channelsResponse.status === 403) {
            localStorage.removeItem('token');
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch channels');
        }

        const channelsData = await channelsResponse.json();
        const channelArray = Array.isArray(channelsData) ? channelsData : channelsData.channels || [];
        setChannels(channelArray);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Error fetching data:', errorMessage);
        if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Failed to fetch user info')) {
          localStorage.removeItem('token'); // Clear token on fetch failure as it might be invalid
          router.push('/login');
          return;
        }
        setConnectionError('Unable to connect to server. Please check your connection.');
      }
    };

    fetchData();
    connectWebSocket(token, selectedChannel);

    // Cleanup function
    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [router, selectedChannel]);

  const handleChannelSelect = async (channelId: string) => {
    // Leave current channel if any
    if (selectedChannel && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'chat:leave',
        data: {
          channelId: selectedChannel
        }
      }));
    }

    setSelectedChannel(channelId);
    const token = localStorage.getItem('token');
    
    try {
      // First fetch existing messages
      const response = await fetch(`http://localhost:8080/api/messages?channelId=${channelId}&page=0&size=50`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      // Handle paginated response
      const messages = data.content || [];
      setMessages(messages);

      // Then join the new channel via WebSocket to receive future messages
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: 'chat:join',
          data: {
            channelId: channelId
          }
        }));
      }
    } catch (error) {
      console.error('Error in channel selection:', error);
      setMessages([]);
    }
  };

  const handleSettingsClick = (channelId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent channel selection when clicking settings
    router.push(`/channels/${channelId}/settings`);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChannel || !newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Create a temporary message for optimistic update
      const tempMessage: Message = {
        id: 'temp-' + Date.now(),
        content: newMessage,
        username: username,
        channelId: selectedChannel,
        type: 'TEXT',
        createdAt: new Date().toISOString()
      };

      // Optimistically add the message to the UI
      setMessages(prev => [...prev, tempMessage]);
      
      // Clear input immediately for better UX
      setNewMessage('');

      // Send message via REST API
      const response = await fetch('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channelId: selectedChannel,
          content: newMessage,
          type: 'TEXT'
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      const savedMessage = await response.json();
      
      // Replace the temporary message with the saved one
      setMessages(prev => {
        const tempIndex = prev.findIndex(m => 
          m.content === newMessage && 
          m.username === username &&
          m.id.startsWith('temp-')
        );
        if (tempIndex !== -1) {
          const newMessages = [...prev];
          newMessages[tempIndex] = {
            id: savedMessage.id,
            content: savedMessage.content,
            username: username,
            channelId: selectedChannel,
            type: savedMessage.type,
            createdAt: savedMessage.createdAt
          };
          return newMessages;
        }
        return prev;
      });

    } catch (error) {
      console.error('Error sending message:', error);
      // If there's an error, remove the temporary message
      setMessages(prev => prev.filter(m => m.id !== 'temp-' + Date.now()));
      setConnectionError('Failed to send message. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
    router.push('/');
  };

  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:8080/api/channels', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createChannelData),
      });

      if (!response.ok) throw new Error('Failed to create channel');

      const newChannel = await response.json();
      setChannels(prev => [...prev, newChannel]);
      setCreateChannelData({ name: '', type: 'PUBLIC' });
      setIsCreateChannelOpen(false);
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  const handleDeleteMessage = async (message: Message) => {
    const token = localStorage.getItem('token');
    if (!token || !socket || socket.readyState !== WebSocket.OPEN) return;

    try {
      const response = await fetch(`http://localhost:8080/api/messages/${message.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete message');

      // Optimistic update
      setMessages(prev => prev.filter(m => m.id !== message.id));

      // Notify other clients via WebSocket
      socket.send(JSON.stringify({
        type: 'chat:message:delete',
        data: {
          messageId: message.id,
          channelId: message.channelId
        }
      }));

      setMessageToDelete(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="flex h-screen text-black">
      {/* Channel List */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Channels</h2>
          <button
            onClick={() => setIsCreateChannelOpen(true)}
            className="text-gray-300 hover:text-white"
          >
            +
          </button>
        </div>
        <div className="space-y-2">
          {channels.map((channel) => (
            <div
              key={channel.id}
              onClick={() => handleChannelSelect(channel.id)}
              className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                selectedChannel === channel.id ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <span>{channel.name}</span>
              <button
                onClick={(e) => handleSettingsClick(channel.id, e)}
                className="text-gray-400 hover:text-white"
              >
                ⚙️
              </button>
            </div>
          ))}
        </div>

        {connectionError && (
          <div className="mb-4 p-2 bg-red-500 bg-opacity-20 text-red-100 rounded text-sm">
            {connectionError}
          </div>
        )}

        {/* Create Channel Modal */}
        {isCreateChannelOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Channel</h3>
              <form onSubmit={handleCreateChannel}>
                <div className="mb-4">
                  <label htmlFor="channelName" className="block text-sm font-medium text-gray-700 mb-1">
                    Channel Name
                  </label>
                  <input
                    type="text"
                    id="channelName"
                    value={createChannelData.name}
                    onChange={(e) => setCreateChannelData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    placeholder="e.g. general"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={createChannelData.type === 'PUBLIC'}
                      onChange={() => setCreateChannelData(prev => ({ ...prev, type: 'PUBLIC' }))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-900">Public</span>
                  </label>
                  <label className="flex items-center mt-2">
                    <input
                      type="radio"
                      checked={createChannelData.type === 'PRIVATE'}
                      onChange={() => setCreateChannelData(prev => ({ ...prev, type: 'PRIVATE' }))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-900">Private</span>
                  </label>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateChannelOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  >
                    Create Channel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Banner */}
        <div className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {selectedChannel ? 
              channels.find(c => c.id === selectedChannel)?.name || 'Loading...' 
              : 'Select a Channel'
            }
          </h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="text-sm text-gray-600">Signed in as:</span>
              <span>{username}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedChannel ? (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col-reverse">
              {messages.map(message => (
                <div key={message.id} className="mb-4 p-3 border border-gray-200 rounded-lg group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-900">{message.username}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(Number(message.createdAt) * 1000).toLocaleString()}
                      </span>
                    </div>
                    {message.username === username && (
                      <button
                        onClick={() => setMessageToDelete(message)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                  <div className="mt-1 ml-2 text-gray-800">{message.content}</div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500"
                  placeholder="Type a message..."
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a channel to start chatting
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {messageToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Message</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this message? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setMessageToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMessage(messageToDelete)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 