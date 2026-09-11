# 08. Testing & Quality Assurance Document

## 1. Testing Strategy
A comprehensive multi-tier testing strategy is employed covering Unit Testing, Integration Testing, User Interface Testing, and Security Validation.

---

## 2. Test Cases Matrix

| Test ID | Module | Test Scenario | Expected Result | Status |
|---|---|---|---|---|
| **TC-01** | Auth | Register with valid credentials | User created, JWT returned, redirected to Home | Pass |
| **TC-02** | Auth | Register with existing email | 400 Bad Request: "Email already registered" | Pass |
| **TC-03** | Auth | Login with incorrect password | 401 Unauthorized: "Invalid credentials" | Pass |
| **TC-04** | Posts | Fetch posts with search query `?q=voter` | Returns matching posts with highlighted terms | Pass |
| **TC-05** | Posts | Anonymous user attempts to create post | 401 Unauthorized: "Authentication token missing" | Pass |
| **TC-06** | Posts | Authenticated user (non-admin) creates post | 403 Forbidden: "Admin privileges required" | Pass |
| **TC-07** | Tools | Client-side image compress to 50KB | Output image size <= 50KB without server upload | Pass |
| **TC-08** | Tools | Signature box crop (140x60) | Output canvas exports exact 140x60 dimensions | Pass |
| **TC-09** | Contact | Submit contact form with empty email | Form validation halts submission with error prompt | Pass |
| **TC-10** | SEO | Dynamic page title and meta tag generation | Title matches post title; OpenGraph tags present | Pass |

---

## 3. Browser Compatibility & Responsiveness
Tested across:
- Google Chrome v120+ (Desktop & Android)
- Mozilla Firefox v122+
- Apple Safari (iOS 16+ & macOS)
- Microsoft Edge v120+
- Screen resolutions: 360x640 (Mobile), 768x1024 (Tablet), 1920x1080 (FHD Desktop)
