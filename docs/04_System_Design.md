# 04. System Design & Architectural Specification

## 1. System Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────┐
│                       CLIENT TIER                           │
│  React.js (Vite) + Tailwind CSS + Lucide Icons + React Router│
│                                                             │
│  ┌──────────────┐   ┌────────────────┐   ┌───────────────┐  │
│  │ Public Pages │   │ Citizen Tools  │   │  Admin Panel  │  │
│  │ (Home, Blog) │   │ (HTML5 Canvas) │   │  (Protected)  │  │
│  └──────┬───────┘   └───────┬────────┘   └───────┬───────┘  │
└─────────┼───────────────────┼────────────────────┼──────────┘
          │                   │                    │
      HTTP/JSON           Zero Upload          JWT Auth
          │              (Local Exec)              │
          ▼                                        ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVER TIER                           │
│          Node.js + Express.js REST API                      │
│                                                             │
│  ┌──────────────┐   ┌────────────────┐   ┌───────────────┐  │
│  │  Middleware  │──▶│  Controllers   │──▶│ Mongoose ODM  │  │
│  │ (Auth, Rate) │   │ (Posts, Users) │   │  Data Layer   │  │
│  └──────────────┘   └────────────────┘   └───────┬───────┘  │
└──────────────────────────────────────────────────┼──────────┘
                                                   │
                                                   ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE TIER                          │
│                   MongoDB / MongoDB Atlas                   │
│   (Collections: users, posts, categories, comments, etc.)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Data Flow Diagrams (DFD)

### 2.1 Level-0 DFD (Context Diagram)
```text
  [ Visitor / User ] ─── (Search, Read, Tools, Bookmark) ───▶ [ Open Concept Bangla ]
  [ Administrator ]  ─── (Manage Posts, Categories, Config) ──▶ [ Open Concept Bangla ]
  [ Open Concept Bangla ] ─── (Articles, Tools, Analytics) ───▶ [ User / Administrator ]
```

### 2.2 Level-1 DFD
```text
[ User ] ─────────▶ 1.0 Authentication ───────▶ (Users DB)
                       │
                       ▼ Token
[ User ] ─────────▶ 2.0 Article & Search ────▶ (Posts & Categories DB)
                       │
                       ▼ Response
[ User ] ─────────▶ 3.0 Client Tools ─────────▶ [ Local HTML5 Canvas Processing ]
                       │
                       ▼ Download Result
[ Admin ] ────────▶ 4.0 Admin Dashboard ─────▶ (All DB Collections)
```

---

## 3. Component Hierarchy
- `App.jsx`
  - `Navbar`
    - Top bar (Social, Breaking banner, Auth shortcuts)
    - Main navigation & Search bar
    - Mobile drawer
  - `Routes`
    - `Home` (`Hero`, `ServiceCards`, `ToolSection`, `FeaturedBlog`, `LatestPosts`, `PopularSidebar`, `Newsletter`)
    - `Blogs` (`BlogCard`, `Pagination`, `CategoryFilter`)
    - `BlogDetail` (`TableOfContents`, `SocialShare`, `CommentSection`, `RelatedPosts`)
    - `Tools` (`ImageCompressor`, `CardCropper`, `PdfConverter`)
    - `Admin` (`AdminLayout`, `Dashboard`, `PostsManager`, `CategoryManager`, `MessagesManager`)
  - `Footer`
