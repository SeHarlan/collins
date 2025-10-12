# Collins.finance

A minimal, production-ready non-custodial crypto portfolio tracker built with Next.js, TypeScript, and MongoDB.

## Features

- 🔐 Non-custodial authentication with Privy (stubbed)
- 📊 Create and manage multiple portfolios
- 💰 Track crypto assets and total value
- 🔒 Public/private portfolio visibility
- 🎨 Modern UI with shadcn/ui components
- ⚡ Real-time updates with TanStack Query
- 🛡️ Type-safe with strict TypeScript

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**:
  - Client state: Jotai
  - Server state: TanStack Query
- **Database**: MongoDB with Mongoose
- **Authentication**: Privy (stubbed implementation)
- **Forms**: react-hook-form + Zod validation
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm package manager
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd finance-website
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   # Create .env.local file with:
   MONGODB_URI=mongodb://localhost:27017/collins-finance
   PRIVY_APP_ID=your-privy-app-id
   PRIVY_APP_SECRET=your-privy-app-secret
   NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3333](http://localhost:3333) in your browser

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking
- `pnpm test` - Run unit tests

### Project Structure

```
src/
├── app/                 # Next.js pages and API routes
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   ├── portfolio/      # Portfolio-specific components
│   └── providers/      # Context providers
├── lib/                 # Core business logic
│   ├── api/            # API utilities and queries
│   ├── auth/           # Authentication helpers
│   ├── db/             # Database models and repos
│   ├── state/          # Jotai atoms
│   └── utils/          # Utility functions
└── test/               # Test configuration
```

## Authentication (Stub)

The app uses a stubbed authentication system for development. In production, you would:

1. Get real Privy credentials from [dashboard.privy.io](https://dashboard.privy.io)
2. Update environment variables with real values
3. Remove the stub implementation in `src/lib/auth/server.ts`

For testing, the stub accepts a base64-encoded JSON token:

```javascript
// Example token payload
btoa(JSON.stringify({ privyId: 'test-user-123' }));
```

## Deployment

For production deployment:

1. Set up a production MongoDB instance
2. Configure environment variables for production
3. Build the application: `pnpm build`
4. Deploy to your preferred hosting platform (Vercel, Railway, etc.)

## Contributing

1. Follow the established code patterns
2. Maintain strict TypeScript typing
3. Keep client and server state separate
4. Write tests for business logic
5. Run `pnpm lint` and `pnpm type-check` before committing

## License

[Add your license here]

## Notes

See [NOTES.md](./NOTES.md) for detailed implementation decisions and limitations.
