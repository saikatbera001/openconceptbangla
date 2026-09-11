# 03. Project Planning & Work Breakdown Structure

## 1. Project Schedule & Phased Methodology
The project follows an iterative agile lifecycle organized across three macro levels and 18 tactical phases over an estimated 36–40 days:

### 1.1 Development Phases
- **Level 1 (UI & Static Architecture - Days 1–10)**:
  - Requirement Analysis & SRS (Days 1–2)
  - UI/UX Design & Wireframing (Days 3–5)
  - Project Scaffolding & Tailwind CSS Tokens (Day 6)
  - Common Component Library & Routing (Days 7–9)
  - Homepage & Static Content Pages (Day 10)
- **Level 2 (Dynamic Application & REST API - Days 11–24)**:
  - Database Schema Design & Mongoose Setup (Days 11–12)
  - Express Server & Middleware Setup (Days 13–14)
  - User Authentication & JWT Flow (Days 15–17)
  - Blog & Category REST APIs (Days 18–22)
  - Debounced Search Engine (Days 23–24)
- **Level 3 (Citizen Tools, Admin Suite, Security & Deployment - Days 25–38)**:
  - Client-Side Online Tools (Days 25–29)
  - Admin Panel & CRUD Modules (Days 30–33)
  - Security Hardening, CORS, Rate Limiting (Days 34–35)
  - Testing, Postman Test Suite & Build Verification (Days 36–37)
  - Cloud Deployment & Final MCA Report (Day 38)

---

## 2. Resource & Team Allocation
- **Full-Stack Developer**: End-to-end MERN implementation, Tailwind CSS customization, Canvas API algorithms.
- **System Evaluator / Guide**: Academic review, requirement verification, viva defense.

---

## 3. Risk Management Matrix

| Risk Identified | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|
| **MongoDB Atlas Latency** | Low | Medium | Implement Mongoose connection pooling and lean queries with projection. |
| **Document Privacy Leak** | High | Critical | Perform 100% of image compression, cropping, and PDF creation client-side in the browser. |
| **Spamming on Contact & Comments** | Medium | Medium | Implement IP rate-limiting (`express-rate-limit`) and comment moderation flags. |
| **Broken Bengali Font Rendering** | Low | High | Import web fonts via Google Fonts (`Hind Siliguri`, `Noto Sans Bengali`) with `font-display: swap`. |
| **Unauthorized Admin Panel Access** | Low | Critical | Multi-tier middleware: JWT verification followed by strict `role === 'admin'` check. |
