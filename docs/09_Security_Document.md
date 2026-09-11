# 09. Security & Privacy Architecture

## 1. Security Overview
Open Concept Bangla processes citizen information and utility tools. Security principles are implemented at all application layers.

---

## 2. Security Safeguards

### 2.1 Authentication & Session Integrity
- Passwords are encrypted using `bcryptjs` with an adaptive work factor (salt rounds = 10). Plain-text passwords are never logged or stored.
- Stateless authentication uses HMAC SHA-256 signed JSON Web Tokens (JWT) with configured expiration (`7d`).
- Token verification middleware intercepts protected endpoints and validates signature and user active status.

### 2.2 Client-Side Document Isolation (Zero-Knowledge Privacy)
- Traditional portals upload citizen photographs, Aadhaar cards, and signature files to backend servers for resizing.
- Open Concept Bangla executes all canvas manipulations, resampling, cropping, and PDF assembly directly within the client's Web Worker or Canvas context.
- **Zero byte of user documents is transmitted across the network.**

### 2.3 HTTP Security Headers (`helmet`)
- Enforces Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), X-Frame-Options (prevents Clickjacking), and X-Content-Type-Options (prevents MIME sniffing).

### 2.4 Rate Limiting & Denial of Service Protection
- API routes utilize `express-rate-limit` allowing a maximum of 100 requests per 15-minute window per IP address for standard APIs, and strict thresholds (5 requests / 15 mins) for authentication routes to mitigate brute-force attempts.

### 2.5 Input Sanitization & NoSQL Injection Defense
- Request query parameters, route params, and body data are strictly parsed and sanitized before executing Mongoose database operations.
