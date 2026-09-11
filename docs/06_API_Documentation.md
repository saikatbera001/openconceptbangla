# 06. RESTful API Documentation

## Base URL
`http://localhost:5000/api` (Development)
`https://api.openconceptbangla.com/api` (Production)

---

## 1. Authentication Endpoints

### 1.1 Register User
- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Request Body**:
  ```json
  {
    "name": "Arun Ghosh",
    "email": "arun@example.com",
    "password": "SecretPassword123"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5c...",
    "user": { "id": "60d0fe4f5311236168a109ca", "name": "Arun Ghosh", "email": "arun@example.com", "role": "user" }
  }
  ```

### 1.2 Login User
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Request Body**:
  ```json
  {
    "email": "arun@example.com",
    "password": "SecretPassword123"
  }
  ```

### 1.3 Get Current Profile
- **Method**: `GET`
- **Endpoint**: `/auth/me`
- **Header**: `Authorization: Bearer <token>`

---

## 2. Posts Endpoints

### 2.1 Get All Posts (with Filters & Pagination)
- **Method**: `GET`
- **Endpoint**: `/posts?page=1&limit=10&category=government&search=voter`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "count": 1,
    "total": 24,
    "page": 1,
    "pages": 3,
    "data": [
      {
        "_id": "60d0fe...",
        "title": "ভোটার কার্ড অনলাইন আবেদন পদ্ধতি ২০২৪",
        "slug": "voter-card-online-apply-2024",
        "excerpt": "কীভাবে বাড়ি বসে নতুন ভোটার কার্ডের জন্য আবেদন করবেন...",
        "views": 342,
        "category": { "name": "Government", "nameBn": "সরকারি সেবা" }
      }
    ]
  }
  ```

### 2.2 Get Single Post by Slug
- **Method**: `GET`
- **Endpoint**: `/posts/:slug`

### 2.3 Create Post (Admin Only)
- **Method**: `POST`
- **Endpoint**: `/posts`
- **Header**: `Authorization: Bearer <admin_token>`

### 2.4 Update Post (Admin Only)
- **Method**: `PUT`
- **Endpoint**: `/posts/:id`

### 2.5 Delete Post (Admin Only)
- **Method**: `DELETE`
- **Endpoint**: `/posts/:id`

---

## 3. Categories Endpoints
- `GET /categories` - Retrieve list of categories with post counts
- `POST /categories` - Create new category (Admin)
- `PUT /categories/:id` - Edit category (Admin)
- `DELETE /categories/:id` - Delete category (Admin)

---

## 4. Newsletter & Contact Endpoints
- `POST /subscribers` - Subscribe email to newsletter
- `GET /subscribers` - List all subscribers (Admin)
- `POST /contact` - Submit user inquiry
- `GET /contact` - List inquiries (Admin)
