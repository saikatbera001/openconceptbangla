# 05. Database Design & Schema Specifications

## 1. Database Overview
- **Database Engine**: MongoDB (Document-Oriented NoSQL)
- **Database Name**: `open_concept_bangla`
- **Object Data Modeling (ODM)**: Mongoose v8.x

---

## 2. Collections & Schema Details

### 2.1 Collection: `users`
```javascript
{
  _id: ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }, // bcrypt hashed
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String, default: '' },
  savedPosts: [{ type: ObjectId, ref: 'Post' }],
  createdAt: Date,
  updatedAt: Date
}
```

### 2.2 Collection: `categories`
```javascript
{
  _id: ObjectId,
  name: { type: String, required: true, unique: true },
  nameBn: { type: String, required: true }, // Bengali display name
  slug: { type: String, required: true, unique: true, index: true },
  icon: { type: String, default: 'Folder' },
  description: { type: String, default: '' },
  postCount: { type: Number, default: 0 },
  createdAt: Date
}
```

### 2.3 Collection: `posts`
```javascript
{
  _id: ObjectId,
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true }, // Markdown / HTML formatted
  featuredImage: { type: String, default: '' },
  category: { type: ObjectId, ref: 'Category', required: true, index: true },
  author: { type: ObjectId, ref: 'User', required: true },
  tags: [{ type: String, index: true }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published', index: true },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  createdAt: Date,
  updatedAt: Date
}
```

### 2.4 Collection: `comments`
```javascript
{
  _id: ObjectId,
  post: { type: ObjectId, ref: 'Post', required: true, index: true },
  user: { type: ObjectId, ref: 'User' },
  guestName: { type: String },
  guestEmail: { type: String },
  content: { type: String, required: true },
  status: { type: String, enum: ['approved', 'pending'], default: 'approved' },
  createdAt: Date
}
```

### 2.5 Collection: `subscribers`
```javascript
{
  _id: ObjectId,
  email: { type: String, required: true, unique: true, index: true },
  active: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now }
}
```

### 2.6 Collection: `contacts`
```javascript
{
  _id: ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
  createdAt: { type: Date, default: Date.now }
}
```

---

## 3. Database Relationships
- **1-to-Many**: `Category` -> `Posts` (One category contains many articles)
- **1-to-Many**: `User` -> `Posts` (One author creates many articles)
- **1-to-Many**: `Post` -> `Comments` (One article contains many reader comments)
- **Many-to-Many**: `User` <-> `Posts` (Users can bookmark multiple articles)
