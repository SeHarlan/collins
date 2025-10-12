# Collins.finance Implementation Notes

## Project Overview

Collins.finance is a minimal, production-ready non-custodial crypto portfolio tracker built with the specified authoritative stack. This document captures key implementation decisions and limitations.

## Stack Decisions

### Core Framework

- **Next.js 14 with App Router**: Chosen for modern React Server Components support and better performance
- **TypeScript with strict mode**: Enforces type safety throughout the codebase
- **pnpm**: Package manager for efficient dependency management

### State Management

- **Jotai**: Used exclusively for UI/client state (sidebar open, selected portfolio, modal states)
- **TanStack Query**: Handles all server state and data fetching with proper caching
- Clear separation maintained: no coupling between Jotai and TanStack Query

### Database & API

- **MongoDB with Mongoose**: Document-based structure ideal for portfolio data
- **Repository Pattern**: Clean separation between API routes and data access
- **Zod Validation**: All API inputs validated at boundaries

### Authentication

- **Privy (Stubbed)**: Authentication is stubbed due to missing credentials
  - Real implementation would use Privy JWT tokens
  - Current stub accepts base64-encoded JSON as bearer token
  - Embedded wallet creation configured but not functional

### UI/UX

- **shadcn/ui**: Component library built on Radix primitives
- **Tailwind CSS**: Utility-first styling with consistent design tokens
- **Modern, clean interface**: Focus on usability and clarity

## Architecture Decisions

### API Design

1. **RESTful endpoints** for portfolio CRUD operations
2. **Explicit return types** in all server code
3. **Consistent error responses** with proper HTTP status codes
4. **Repository pattern** isolates database logic from API handlers

### Security

1. **CSP headers** configured via next-safe, allowing Privy domains
2. **Environment validation** with @t3-oss/env-nextjs
3. **Input validation** at all boundaries using Zod
4. **TypeScript strict mode** prevents common type errors

### Code Organization

```
src/
├── app/                 # Next.js app router pages and API routes
├── components/          # React components (UI and feature-specific)
├── lib/                 # Core logic and utilities
│   ├── api/            # API utilities and query hooks
│   ├── auth/           # Authentication logic
│   ├── db/             # Database models and repositories
│   ├── security/       # Security configurations
│   ├── state/          # Jotai atoms
│   └── utils/          # Utility functions
└── test/               # Test setup and utilities
```

## Limitations & Stubs

### Authentication

- Privy authentication is stubbed - requires valid Privy app credentials
- Auth token verification is mocked in API routes
- User creation/login flow is simulated

### Features Not Implemented

1. **Real-time price updates**: Would require external API integration
2. **Wallet integration**: Privy embedded wallets need proper setup
3. **Asset search/addition**: Would need crypto asset database
4. **Portfolio analytics**: Charts, historical data, performance metrics
5. **Social features**: Following users, sharing portfolios

### Development Limitations

1. **No production deployment config**: Would need proper hosting setup
2. **Limited test coverage**: Only basic unit tests for utilities
3. **No E2E tests**: Would add Playwright or Cypress for production
4. **No CI/CD pipeline**: Would need GitHub Actions or similar

## Running the Application

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Fill in MongoDB URI and Privy credentials (or use stubs)

3. Run development server:

   ```bash
   pnpm dev
   ```

4. Run tests:
   ```bash
   pnpm test
   ```

## Future Enhancements

1. **Complete Privy Integration**: Full authentication with embedded wallets
2. **Real-time Updates**: WebSocket connection for live price data
3. **Advanced Analytics**: Portfolio performance, risk analysis, diversification metrics
4. **Mobile App**: React Native version sharing core logic
5. **Multi-chain Support**: Track assets across different blockchains
6. **DeFi Integration**: Show staking positions, LP tokens, etc.

## Technical Debt

1. **Stub Authentication**: Replace with real Privy implementation
2. **Error Boundaries**: Add proper error handling UI components
3. **Loading States**: Improve skeleton loaders and suspense boundaries
4. **Accessibility**: Full WCAG compliance audit needed
5. **Performance**: Add monitoring, optimize bundle size

## Conclusion

This implementation provides a solid foundation for a crypto portfolio tracker while maintaining clean architecture and production-ready patterns. The stub implementations allow the app to function without external dependencies, making it easy to develop and test locally.
