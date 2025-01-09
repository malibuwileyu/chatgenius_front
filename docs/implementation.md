# Implementation Guide - MVP (Real-time Chat & Channels)

## API Specification

### REST Endpoints

#### Authentication
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
POST   /api/auth/logout       - Logout user
POST   /api/auth/refresh      - Refresh JWT token
```

#### User Management
```
GET    /api/users             - List users
POST   /api/users             - Create user
GET    /api/users/{id}        - Get user details
PUT    /api/users/{id}        - Update user
DELETE /api/users/{id}        - Delete user
GET    /api/users/{id}/status - Get user online status
```

#### Channel Management
```
GET    /api/channels              - List all channels
POST   /api/channels              - Create new channel
GET    /api/channels/{id}         - Get channel details
PUT    /api/channels/{id}         - Update channel
DELETE /api/channels/{id}         - Delete channel
GET    /api/channels/{id}/members - List channel members
POST   /api/channels/{id}/members - Add member to channel
DELETE /api/channels/{id}/members - Remove member from channel
```

#### Message Management
```
GET    /api/channels/{id}/messages     - Get channel messages
POST   /api/channels/{id}/messages     - Send message to channel
GET    /api/messages/{id}              - Get message details
PUT    /api/messages/{id}              - Update message
DELETE /api/messages/{id}              - Delete message
POST   /api/messages/{id}/reactions    - Add reaction to message
DELETE /api/messages/{id}/reactions    - Remove reaction
```

### WebSocket Events

#### Client Events
```
channel:join     - Join a channel
channel:leave    - Leave a channel
message:send     - Send a message
typing:start     - Start typing indicator
typing:stop      - Stop typing indicator
presence:update  - Update user presence
reaction:add     - Add reaction to message
reaction:remove  - Remove reaction from message
```

#### Server Events
```
channel:joined     - Channel join confirmation
channel:left      - Channel leave confirmation
message:received  - New message notification
typing:updated    - Typing status update
presence:updated  - User presence update
error:occurred    - Error notification
reaction:updated  - Reaction update notification
```

#### WebSocket Topics
```
/topic/channel.{channelId}         - Channel-specific messages
/topic/user.{userId}               - User-specific notifications
/topic/presence.{channelId}        - Channel presence updates
/topic/typing.{channelId}          - Typing indicators
/topic/error                       - Error broadcasts
```

## Core Features

### Real-time Chat
- [x] Message sending/receiving
- [ ] WebSocket integration
- [x] Message persistence
- [x] Message formatting
- [ ] Real-time updates
- [x] Optimistic updates
- [x] Error handling
- [x] Retry mechanism

### Channel System
- [x] Channel listing
- [ ] Channel joining/leaving
- [x] Member management
- [ ] Channel types (public/private)
- [x] Channel navigation
- [ ] Unread indicators
- [x] Active channel state

### User System
- [x] Basic user identification
- [x] Unique usernames per tab
- [ ] Persistent user sessions
- [ ] User authentication
- [ ] User profiles

## Technical Implementation

### State Management
- [x] Message store
  ```typescript
  interface MessageStore {
    messages: Record<string, Message[]>;
    sendMessage: (channelId: string, content: string) => Promise<void>;
    updateMessage: (messageId: string, content: string) => Promise<void>;
    deleteMessage: (messageId: string) => Promise<void>;
  }
  ```

- [x] Channel store
  ```typescript
  interface ChannelStore {
    channels: Channel[];
    activeChannel: string | null;
    createChannel: (data: CreateChannelDTO) => Promise<void>;
    joinChannel: (channelId: string) => Promise<void>;
    leaveChannel: (channelId: string) => Promise<void>;
  }
  ```

### API Endpoints
- [x] Message endpoints
  ```typescript
  POST    /api/chat/channels/:channelId/messages  // Create message
  GET     /api/chat/channels/:channelId/messages  // Get channel messages
  ```

### WebSocket Events
- [ ] Connection management
  ```typescript
  const socketEvents = {
    message: {
      new: 'message:new',
      update: 'message:update',
      delete: 'message:delete'
    },
    channel: {
      join: 'channel:join',
      leave: 'channel:leave',
      update: 'channel:update'
    }
  };
  ```

### Component Structure
- [x] Channel components
  ```typescript
  // components/chat/channel-list/index.tsx
  interface ChannelListProps {
    channels: Channel[];
    activeChannel: string | null;
    onChannelSelect: (channelId: string) => void;
  }
  ```

- [x] Message components
  ```typescript
  // components/chat/message-thread/index.tsx
  interface MessageThreadProps {
    channelId: string;
    messages: Message[];
    onSendMessage: (content: string) => void;
  }
  ```

## UI Features
- [x] Message display with usernames and timestamps
- [x] Message input with send functionality
- [x] Basic responsive layout
- [x] Custom scrollbar styling
- [x] Error handling for message sending
- [x] Scrollable message history
- [ ] Loading states
- [ ] Error states
- [ ] Typing indicators

## Completed Items (January 8, 2024)
- [x] Basic channel layout
- [x] Message display system
- [x] Message input functionality
- [x] Channel navigation
- [x] Database schema implementation
- [x] Type definitions
- [x] API endpoint structure
- [x] Message persistence
- [x] Data transformation
- [x] Unique username generation per tab
- [x] Fixed UI layout issues (double header, message box) 