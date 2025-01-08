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
│   ├── (main)/            # Main app routes
│   │   └── channels/      # Channel pages
│   │       ├── [id]/
│   │       │   ├── page.tsx
│   │       │   └── loading.tsx
│   │       └── page.tsx
│   ├── api/               # API routes
│   │   ├── channels/
│   │   │   ├── [id]/
│   │   │   └── route.ts
│   │   └── messages/
│   │       ├── [id]/
│   │       └── route.ts
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
│       ├── channel-list/
│       │   ├── index.tsx
│       │   ├── channel-item.tsx
│       │   └── styles.ts
│       └── message-thread/
│           ├── index.tsx
│           ├── message-item.tsx
│           └── styles.ts
├── lib/                  # Utility functions
│   ├── utils/           # General utilities
│   │   ├── format.ts
│   │   └── validation.ts
│   ├── api/             # API clients
│   │   ├── channels.ts
│   │   └── messages.ts
│   └── hooks/           # Custom hooks
│       ├── useChannel.ts
│       └── useMessage.ts
├── stores/              # Zustand stores
│   ├── chat-store.ts
│   └── ui-store.ts
├── types/               # TypeScript types
│   ├── chat.ts
│   └── ui.ts
└── styles/              # Global styles
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