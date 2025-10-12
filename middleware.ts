//TODO: Implement security middleware

// import {
//   chainMatch,
//   isPageRequest,
//   csp,
// } from '@next-safe/middleware';

// const securityMiddleware = [
//   csp({
//     directives: {
//       'default-src': ['self'],
//       'script-src': ['self', 'unsafe-inline', 'https://auth.privy.io'],
//       'style-src': ['self', 'unsafe-inline'],
//       'img-src': ['self', 'data:', 'https:'],
//       'font-src': ['self'],
//       'connect-src': ['self', 'https://auth.privy.io', 'wss://auth.privy.io'],
//       'frame-src': ['self', 'https://auth.privy.io'],
//       'object-src': ['none'],
//     },
//   }),
// ];

// export default chainMatch(isPageRequest)(...securityMiddleware);
