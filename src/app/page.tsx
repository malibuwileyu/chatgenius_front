'use client';
import React, { type ReactElement, useState, useEffect } from 'react';
import Header from '../components/ui/header';
import Dialog from '../components/ui/dialog';
import CreateChannel from '../components/chat/channel/create-channel';
import { useChannelStore } from '../stores/channel-store';
import { useMessageStore } from '../stores/message-store';
import { useUserStore } from '../stores/user-store';
import { type CreateChannelType } from '../lib/api/channels';
import { type MessageType } from '../lib/api/messages';

export default function Home(): ReactElement {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const { channels, activeChannelId, isLoading: channelsLoading, error: channelsError, fetchChannels, createChannel, setActiveChannel } = useChannelStore();
  const { messages, isLoading: messagesLoading, error: messagesError, fetchMessages, sendMessage } = useMessageStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    console.log('Fetching channels...');
    fetchChannels().catch(console.error);
  }, [fetchChannels]);

  // Fetch messages when active channel changes
  useEffect(() => {
    if (activeChannelId) {
      console.log('Fetching messages for active channel:', activeChannelId);
      fetchMessages(activeChannelId).catch(console.error);
    }
  }, [activeChannelId, fetchMessages]);

  const handleCreateChannel = async (name: string, type: CreateChannelType) => {
    try {
      const newChannel = await createChannel(name, type);
      console.log('Created channel:', newChannel);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Failed to create channel:', error);
    }
  };

  const handleSendMessage = async () => {
    console.log('handleSendMessage called', { messageInput, activeChannelId });
    
    if (!activeChannelId || !messageInput.trim() || messagesLoading) {
      console.log('Send conditions not met:', {
        hasActiveChannel: !!activeChannelId,
        hasMessage: !!messageInput.trim(),
        isNotSending: !messagesLoading
      });
      return;
    }

    try {
      console.log('Attempting to send message to channel:', activeChannelId);
      await sendMessage(activeChannelId, messageInput.trim(), 'TEXT');
      setMessageInput(''); // Clear input on success
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    console.log('Key pressed:', e.key);
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const activeChannel = channels.find(c => c.id === activeChannelId);
  const activeChannelMessages = activeChannelId ? messages[activeChannelId] || [] : [];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-900 text-white border-r-2 border-black">
        <div className="h-16 flex items-center justify-between px-4 border-b-2 border-black">
          <h2 className="text-lg font-semibold">
            Channels {channelsLoading && '(Loading...)'}
          </h2>
          <button 
            className="w-8 h-8 rounded hover:bg-purple-700 flex items-center justify-center"
            onClick={() => setIsCreateDialogOpen(true)}
            title="Create Channel"
          >
            <span className="text-2xl">+</span>
          </button>
        </div>
        <div className="p-4 space-y-2">
          {channelsError && (
            <div className="text-red-300 text-sm">
              Error: {channelsError}
            </div>
          )}
          {channelsLoading ? (
            <div className="text-purple-300">Loading channels...</div>
          ) : channels.length === 0 ? (
            <div className="text-purple-300">No channels available</div>
          ) : (
            channels.map(channel => {
              const memberCount = channel.members?.length ?? 0;
              const isActive = channel.id === activeChannelId;
              
              return (
                <div 
                  key={channel.id}
                  className={`px-2 py-1 rounded hover:bg-purple-700 cursor-pointer ${
                    isActive ? 'bg-purple-700' : ''
                  }`}
                  onClick={() => {
                    console.log('Setting active channel:', { id: channel.id, name: channel.name });
                    setActiveChannel(channel.id);
                  }}
                  title={`Channel ID: ${channel.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-1">#</span>
                      <span>{channel.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {channel.type === 'PRIVATE' && (
                        <span className="text-xs bg-purple-800 px-1.5 py-0.5 rounded">
                          private
                        </span>
                      )}
                      <span className="text-xs text-purple-300">
                        {memberCount} {memberCount === 1 ? 'member' : 'members'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header />
        {activeChannel ? (
          <div className="flex-1 flex flex-col">
            {/* Channel Header */}
            <div className="h-14 border-b border-gray-200 px-4 flex items-center">
              <div className="flex items-center">
                <span className="text-xl font-semibold">#{activeChannel.name}</span>
                {activeChannel.type === 'PRIVATE' && (
                  <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">private</span>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messagesError && (
                <div className="text-red-500 text-center">
                  Error: {messagesError}
                </div>
              )}
              {messagesLoading ? (
                <div className="text-gray-400 text-center">Loading messages...</div>
              ) : activeChannelMessages.length === 0 ? (
                <div className="text-gray-400 text-center">No messages yet</div>
              ) : (
                activeChannelMessages.map(message => (
                  <div key={message.id} className="flex flex-col bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-semibold">
                        {message.username || 'Unknown User'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700">{message.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => {
                    console.log('Input changed:', e.target.value);
                    setMessageInput(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message #${activeChannel.name}`}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-indigo-500"
                  disabled={messagesLoading}
                />
                <button 
                  type="button"
                  onClick={() => {
                    console.log('Send button clicked');
                    handleSendMessage();
                  }}
                  disabled={!messageInput.trim() || messagesLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {messagesLoading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <main className="flex-1 flex items-center justify-center">
            <h1 className="text-6xl font-bold">
              ChatGenius
            </h1>
          </main>
        )}
      </div>

      {/* Create Channel Dialog */}
      <Dialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        title="Create Channel"
      >
        <CreateChannel
          onSubmit={handleCreateChannel}
          onCancel={() => setIsCreateDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
} 