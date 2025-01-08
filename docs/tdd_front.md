# Frontend Technical Design Document (TDD)

## Implementation Guidelines

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes
│   │   ├── login/         # Login page
│   │   ├── register/      # Register page
│   │   └── reset/         # Password reset
│   ├── (main)/            # Main app routes
│   │   ├── channels/      # Channel pages
│   │   ├── settings/      # User settings
│   │   └── avatar/        # Avatar customization
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   │   ├── button/
│   │   ├── input/
│   │   └── dialog/
│   ├── auth/             # Auth components
│   │   ├── login-form/
│   │   └── oauth-buttons/
│   ├── chat/             # Chat components
│   │   ├── channel-list/
│   │   ├── message-thread/
│   │   └── file-upload/
│   └── ai/               # AI-related components
│       ├── avatar-editor/
│       ├── voice-recorder/
│       └── video-preview/
├── lib/                  # Utility functions
│   ├── utils/           # General utilities
│   ├── api/             # API clients
│   └── hooks/           # Custom hooks
├── stores/              # Zustand stores
│   ├── ui-store.ts
│   ├── chat-store.ts
│   └── ai-store.ts
├── types/               # TypeScript types
│   ├── chat.ts
│   ├── user.ts
│   └── ai.ts
└── styles/              # Global styles
    ├── globals.css
    └── themes/
```

### Coding Standards

#### 1. TypeScript Guidelines
- Strict mode enabled
- Explicit type annotations for props and state
- Interface over type when possible
- Proper error handling with custom types
- Avoid `any` type

```typescript
// Good
interface MessageProps {
  content: string;
  sender: User;
  timestamp: Date;
  onReply: (messageId: string) => void;
}

const Message: React.FC<MessageProps> = ({ content, sender, timestamp, onReply }) => {
  // Implementation
};

// Bad
const Message = (props: any) => {
  // Implementation
};
```

#### 2. React Components
- Functional components with TypeScript
- Props interface definition
- Proper error boundaries
- Memoization when needed
- Custom hooks for logic reuse

```typescript
// Component Example
import { memo } from 'react';
import { useMessage } from '@/hooks/useMessage';

interface ThreadProps {
  channelId: string;
  initialMessage?: Message;
}

export const MessageThread = memo(({ channelId, initialMessage }: ThreadProps) => {
  const { messages, sendMessage, isLoading } = useMessage(channelId);

  if (isLoading) return <ThreadSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
});
```

#### 3. State Management
- Zustand store creation
- Proper typing
- Action creators
- Selectors
- Middleware usage

```typescript
interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) => 
    set((state) => ({ 
      messages: [...state.messages, message] 
    })),
  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter(msg => msg.id !== id)
    }))
}));
```

### Testing Strategy

#### 1. Unit Tests
- Jest + React Testing Library
- Component testing
- Hook testing
- Store testing

```typescript
describe('Message Component', () => {
  it('renders message content', () => {
    render(<Message {...mockProps} />);
    expect(screen.getByText(mockProps.content)).toBeInTheDocument();
  });

  it('handles emoji reactions', async () => {
    const onReaction = jest.fn();
    render(<Message {...mockProps} onReaction={onReaction} />);
    
    await userEvent.click(screen.getByLabelText('Add reaction'));
    expect(onReaction).toHaveBeenCalled();
  });
});
```

#### 2. Integration Tests
- Page routing
- Form submissions
- WebSocket connections
- File uploads

#### 3. E2E Tests
- User flows
- Authentication
- Message sending/receiving
- File handling

### Performance Guidelines

#### 1. React Optimization
- Proper component splitting
- Dynamic imports
- Image optimization
- Suspense boundaries

```typescript
const AvatarEditor = dynamic(() => import('./AvatarEditor'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

#### 2. State Updates
- Batched updates
- Debounced inputs
- Throttled events
- Optimistic updates

```typescript
const debouncedUpdate = useMemo(
  () => debounce((value: string) => {
    updateDraft(channelId, value);
  }, 300),
  [channelId]
);
```

### Error Handling

#### 1. Custom Error Classes
```typescript
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}
```

#### 2. Error Boundaries
```typescript
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

### Documentation Requirements

#### 1. Component Documentation
- Props documentation
- Usage examples
- State management
- Side effects

#### 2. Hook Documentation
- Parameters
- Return values
- Dependencies
- Usage examples 