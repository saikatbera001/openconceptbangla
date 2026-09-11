# Open Concept Bangla — Digital Information & Online Tools Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind%20v3-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A modern Bengali web application and citizen utility platform providing government scheme information, digital services guides, education & job updates, browser-based online tools, and a full-featured admin management dashboard.

---

## 🌟 Key Features

- **Bengali Information Portal**: Curated guides on government schemes (লক্ষ্মীর ভাণ্ডার, কৃষক বন্ধু, স্বাস্থ্য সাথী, etc.), digital services (Aadhaar, Voter, PAN, Ration card), jobs, and education.
- **Client-Side Online Tools**:
  - **Image Compressor & Resizer**: Custom dimension and target KB output for official job applications.
  - **Official Card Cropper**: Presets for PAN card, Aadhaar card, Voter card, and official signature box (140x60).
  - **PDF / Image Utilities**: Privacy-first client-side document processing directly in the browser.
- **Fast & Dynamic Search**: Instant search with debounce, category facets, and tag filters.
- **Interactive Reading**: Reading time, table of contents, bookmarking, and discussion comments.
- **Full Admin Management**: Post authoring with draft/publish status, category manager, comment moderation, and subscriber inbox.
- **Privacy & Security**: Client-side document tools ensure sensitive citizen documents are never uploaded without necessity.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18 / 19, Vite, Tailwind CSS, Lucide Icons, React Router DOM |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | MongoDB & Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) & bcryptjs |
| **Security** | Helmet, CORS, Express Rate Limit, Input Validation |
| **Deployment** | Vercel (Frontend), Render / Railway (Backend), MongoDB Atlas |

---

## 📂 Repository Layout

```text
openconceptbangla/
├── client/          # Vite + React + Tailwind CSS frontend
├── server/          # Express.js REST API & MongoDB models
├── docs/            # Academic MCA documentation (12 Chapters)
├── screenshots/     # Application screenshots
└── README.md
```

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

---

## 📚 Academic Documentation

Complete MCA-standard documentation is available in the [`docs/`](./docs/) directory:
- `01_Project_Proposal.md`
- `02_SRS_Document.md`
- `03_Project_Planning.md`
- `04_System_Design.md`
- `05_Database_Design.md`
- `06_API_Documentation.md`
- `07_UI_Design.md`
- `08_Testing_Document.md`
- `09_Security_Document.md`
- `10_Deployment_Guide.md`
- `11_User_Manual.md`
- `12_Final_Project_Report.md`

---

## 📄 License
MIT License. Developed for Open Concept Bangla.
