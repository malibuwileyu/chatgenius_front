# Project Structure - MVP

## Root Directory Structure
```
chatgenius/
├── src/                    # Source code
├── public/                 # Static assets
├── docs/                   # Documentation
├── tests/                  # Test files
└── scripts/                # Build/deploy scripts
```

## Source Code Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth-protected routes
│   │   └── channels/      # Channel pages
│   │       ├── [id]/      # Individual channel view
│   │       │   ├── page.tsx   # Channel messages view
│   │       │   └── loading.tsx
│   │       └── page.tsx   # Channels list view
│   ├── api/               # API routes
│   │   ├── chat/          # Chat-related endpoints
│   │   │   └── channels/
│   │   │       ├── route.ts   # GET (list), POST (create)
│   │   │       └── [channelId]/
│   │   │           ├── route.ts   # GET, PUT, DELETE channel
│   │   │           ├── messages/
│   │   │           │   ├── route.ts   # GET (list), POST (create)
│   │   │           │   ├── [messageId]/
│   │   │           │   │   └── route.ts   # PUT, DELETE message
│   │   │           │   └── search/
│   │   │           │       └── route.ts   # GET search messages
│   │   │           ├── members/
│   │   │           │   ├── route.ts   # GET (list), POST (add)
│   │   │           │   └── [userId]/
│   │   │           │       └── route.ts   # DELETE member
│   │   │           ├── presence/
│   │   │           │   └── route.ts   # GET online users
│   │   │           └── typing/
│   │   │               └── route.ts   # GET typing users
│   │   ├── health/
│   │   │   └── route.ts  # Health check endpoint
│   │   └── route.ts      # API documentation endpoint
│   ├── layout.tsx
│   └── page.tsx
├── components/            # React components
│   ├── ui/               # Basic UI components
│   │   ├── button/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── input/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── dialog/
│   │       ├── index.tsx
│   │       └── styles.ts
│   └── chat/             # Chat components
│       ├── channel/
│       │   ├── channel-list.tsx
│       │   ├── channel-item.tsx
│       │   ├── channel-members.tsx
│       │   └── styles.ts
│       ├── message/
│       │   ├── message-thread.tsx
│       │   ├── message-item.tsx
│       │   └── styles.ts
│       └── presence/
│           ├── typing-indicator.tsx
│           ├── online-status.tsx
│           └── styles.ts
├── lib/                  # Utility functions
│   ├── utils/           # General utilities
│   │   ├── format.ts
│   │   └── validation.ts
│   ├── api/             # API clients
│   │   ├── channels.ts
│   │   ├── messages.ts
│   │   └── presence.ts
│   └── hooks/           # Custom hooks
│       ├── useChannel.ts
│       ├── useMessage.ts
│       └── usePresence.ts
├── stores/              # Zustand stores
│   ├── chat-store.ts
│   └── ui-store.ts
├── types/               # TypeScript types
│   ├── chat.ts
│   └── ui.ts
└── styles/             # Global styles
    ├── globals.css
    └── themes/
        ├── light.ts
        └── dark.ts
```

## Test Directory Structure
```
tests/
├── unit/                  # Unit tests
│   ├── components/
│   │   └── chat/
│   └── hooks/
├── integration/           # Integration tests
│   ├── api/
│   │   ├── channels/
│   │   └── messages/
│   └── features/
└── e2e/                   # End-to-end tests
    └── flows/
```

## Public Assets
```
public/
├── images/             # Static images
│   ├── logos/
│   └── icons/
└── manifest.json       # PWA manifest
```

## Configuration Files
```
chatgenius/
├── .env                   # Environment variables
├── .env.local            # Local environment variables
├── .env.test             # Test environment variables
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── jest.config.js        # Jest configuration
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Documentation
```
docs/
├── features.md            # Feature specifications
├── implementation.md      # Implementation guide
├── project-structure.md   # This file
├── requirements.md        # System requirements
└── project-timeline.md    # Project timeline
```

## Scripts
```
scripts/
├── build.js              # Build script
└── deploy.js             # Deploy script
``` 