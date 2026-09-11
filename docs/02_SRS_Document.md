# 02. Software Requirements Specification (SRS)

## 1. Introduction
This document defines the Software Requirements Specification for **Open Concept Bangla – Digital Information & Online Tools Platform**.

### 1.1 Purpose
The purpose is to clearly articulate functional, non-functional, behavioral, and interface specifications for developers, project evaluators, and system administrators.

### 1.2 Document Conventions
- **Shall / Must**: Mandatory requirement.
- **Should**: Recommended requirement.
- **May**: Optional feature for future development.

---

## 2. Overall Description

### 2.1 Product Perspective
The system operates as an independent web application based on the three-tier MERN client-server architecture:
- Presentation Layer: React.js with Tailwind CSS.
- Application/Logic Layer: Node.js with Express.js REST API.
- Data Storage Layer: MongoDB document database.

### 2.2 User Classes & Characteristics
1. **Visitor (Unauthenticated)**: Can browse articles, filter by category, perform searches, use browser tools, submit contact inquiries, and subscribe to newsletters.
2. **Registered User (Authenticated)**: Can bookmark articles, leave comments on articles, and manage profile settings.
3. **Administrator (Authorized)**: Possesses elevated privileges to create, edit, delete articles, manage categories, moderate user comments, view contact messages, and analyze site metrics.

---

## 3. Functional Requirements

### 3.1 Content & Article Management (FR-1)
- **FR-1.1**: The system shall display featured, latest, and popular articles on the homepage.
- **FR-1.2**: The system shall support rich-text / markdown formatting for articles.
- **FR-1.3**: The system shall generate SEO-friendly slugs for each article.
- **FR-1.4**: The system shall provide article view tracking and like counters.
- **FR-1.5**: The system shall allow administrators to save drafts or immediately publish posts.

### 3.2 Category & Search Management (FR-2)
- **FR-2.1**: Articles shall be classified under hierarchical or primary categories (e.g., Government Schemes, Jobs, Education, Technology, Online Services).
- **FR-2.2**: The search subsystem shall allow keyword search across article titles, excerpts, tags, and content.
- **FR-2.3**: Search results shall include highlight snippets and category filter facets.

### 3.3 Citizen Online Tools (FR-3)
- **FR-3.1**: The system shall provide an Image Compressor allowing users to compress images to a specified maximum kilobyte (KB) threshold.
- **FR-3.2**: The system shall provide a Card Cropper with official preset aspect ratios (Aadhaar, Voter, PAN, and 140x60 Signature box).
- **FR-3.3**: All image manipulation in citizen tools shall execute locally within the client browser via HTML5 Canvas to ensure privacy.

### 3.4 User Authentication & Profiles (FR-4)
- **FR-4.1**: The system shall support user registration with name, email, and password.
- **FR-4.2**: Passwords shall be hashed using bcrypt with a salt factor of at least 10.
- **FR-4.3**: Authentication sessions shall be maintained via signed JWT tokens.
- **FR-4.4**: Authenticated users can save/bookmark posts and view their saved list.

### 3.5 Administration Subsystem (FR-5)
- **FR-5.1**: Protected routes shall restrict access to `/admin/*` to users with `role: "admin"`.
- **FR-5.2**: Admin dashboard shall display aggregate counts (Total Posts, Users, Subscribers, Messages).
- **FR-5.3**: Admins can approve or delete reader comments.
- **FR-5.4**: Admins can export or view the subscriber list.

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- Homepage initial render shall complete in under 1.5 seconds on standard broadband connections.
- Client-side image compression shall complete within 500ms for images up to 10MB.

### 4.2 Security Requirements
- All incoming requests to the API shall pass through Helmet headers, CORS policies, and rate-limiting middleware.
- Input validation sanitization on all POST/PUT routes to prevent NoSQL injection and XSS.

### 4.3 Usability & Accessibility
- Clean typography supporting Bengali Unicode rendering (`Hind Siliguri` / `Noto Sans Bengali`).
- Fully responsive layout adapting across mobile (360px+), tablet (768px+), and desktop (1024px+).

---

## 5. System Interfaces
- **Software Interface**: MongoDB Atlas v6.0+, Node.js v18+, Modern Web Browsers (Chrome, Firefox, Safari, Edge).
- **Communication Interface**: HTTPS protocol, JSON payloads over RESTful HTTP verbs.
