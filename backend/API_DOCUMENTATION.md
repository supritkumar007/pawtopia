# Pet Adoption Backend API - Complete Documentation

## 🔗 Base URL
```
http://localhost:5000/api
```

---

## 📋 Table of Contents
1. [Authentication](#authentication)
2. [Pets](#pets)
3. [Adoption](#adoption)
4. [Favorites](#favorites)
5. [Profile](#profile)
6. [Lost & Found](#lost--found)
7. [Admin](#admin)

---

## 🔐 Authentication

### Register User
**POST** `/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "location": {
    "city": "Mumbai",
    "state": "Maharashtra"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

---

### Login User
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

---

### Logout User
**POST** `/auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

---

### Get Current User
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

---

## 🐾 Pets

### Get All Available Pets
**GET** `/pets`

**Query Params (optional):**
- None currently, only returns `available` pets

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "name": "Buddy",
      "type": "Dog",
      "breed": "Labrador",
      "ageYears": 2,
      "ageMonths": 6,
      "gender": "Male",
      "size": "Large",
      "vaccinated": true,
      "sterilized": true,
      "adoptionFee": 5000,
      "status": "available",
      "images": ["..."],
      "shelterId": {...}
    }
  ]
}
```

---

### Get Pet by ID
**GET** `/pets/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Buddy",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Friendly and energetic dog...",
    ...
  }
}
```

---

### Create Pet (Admin Only)
**POST** `/pets`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Body:**
```json
{
  "name": "Max",
  "type": "Dog",
  "breed": "Golden Retriever",
  "ageYears": 1,
  "ageMonths": 6,
  "gender": "Male",
  "size": "Large",
  "temperament": ["Friendly", "Playful"],
  "vaccinated": true,
  "sterilized": false,
  "description": "Very friendly dog looking for a loving home",
  "adoptionFee": 8000,
  "images": ["url1", "url2"],
  "medicalRecords": ["url1"]
}
```

---

### Update Pet (Admin Only)
**PATCH** `/pets/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

### Delete Pet (Admin Only)
**DELETE** `/pets/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

### Get All Pets (Admin Only)
**GET** `/pets/admin/all`

**Headers:**
```
Authorization: Bearer <admin-token>
```

Returns all pets including adopted ones.

---

## 🏠 Adoption

### Apply for Adoption
**POST** `/adoption/apply`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "petId": "...",
  "questionnaire": {
    "hasExperience": true,
    "hasYard": false,
    "familyMembers": 4,
    "otherPets": [],
    "reason": "Want a companion..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Adoption application submitted successfully",
  "data": {...}
}
```

⚠️ **If not logged in:**
```json
{
  "success": false,
  "message": "Not authorized to access this route",
  "redirect": "/signin"
}
```

---

### Get My Adoptions
**GET** `/adoption/my`

**Headers:**
```
Authorization: Bearer <token>
```

---

### Get Adoption by ID (Admin)
**GET** `/adoption/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

### Get All Adoptions (Admin)
**GET** `/adoption/admin/all`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

### Approve Adoption (Admin)
**PATCH** `/adoption/:id/approve`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

### Reject Adoption (Admin)
**PATCH** `/adoption/:id/reject`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

## ❤️ Favorites

### Add to Favorites
**POST** `/favorites/add`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "petId": "..."
}
```

⚠️ **If not logged in:**
```json
{
  "success": false,
  "message": "Not authorized to access this route",
  "redirect": "/signin"
}
```

---

### Remove from Favorites
**POST** `/favorites/remove`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "petId": "..."
}
```

---

### Get My Favorites
**GET** `/favorites/my`

**Headers:**
```
Authorization: Bearer <token>
```

---

## 👤 Profile

### Get User Profile
**GET** `/profile/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {...},
    "adoptedPets": [...]
  }
}
```

---

### Update Profile
**PUT** `/profile/update`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "John Updated",
  "phone": "9999999999",
  "location": {
    "city": "Delhi",
    "state": "Delhi"
  },
  "avatar": "https://..."
}
```

---

## 🔍 Lost & Found

### Create Lost/Found Post
**POST** `/lostfound/post`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "type": "lost",
  "petName": "Charlie",
  "description": "Brown dog with collar",
  "lastSeenLocation": "Andheri West, Mumbai",
  "images": ["url1", "url2"]
}
```

---

### Get Lost Pets
**GET** `/lostfound/lost`

Returns all active lost pet posts.

---

### Get Found Pets
**GET** `/lostfound/found`

Returns all active found pet posts.

---

### Get All Posts
**GET** `/lostfound/all`

Returns all active lost/found posts.

---

### Get My Posts
**GET** `/lostfound/my`

**Headers:**
```
Authorization: Bearer <token>
```

---

### Mark as Resolved
**PATCH** `/lostfound/:id/resolve`

**Headers:**
```
Authorization: Bearer <token>
```

---

### Delete Post (Admin)
**DELETE** `/lostfound/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

## 👨‍💼 Admin

### Get Dashboard Stats
**GET** `/admin/stats`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalPets": 50,
    "availablePets": 30,
    "adoptedPets": 20,
    "pendingAdoptions": 5,
    "totalUsers": 100,
    "totalShelters": 10
  }
}
```

---

### Create Shelter
**POST** `/admin/shelter`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Body:**
```json
{
  "name": "Happy Paws Shelter",
  "description": "A loving shelter for abandoned pets",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "phone": "9876543210",
  "email": "info@happypaws.com",
  "capacity": 100,
  "images": ["url1"]
}
```

---

### Get All Shelters
**GET** `/admin/shelters`

---

### Update Shelter
**PATCH** `/admin/shelter/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

### Delete Shelter
**DELETE** `/admin/shelter/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

### Create Blog
**POST** `/admin/blog`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Body:**
```json
{
  "title": "10 Tips for New Pet Owners",
  "content": "Full blog content here...",
  "category": "Tips",
  "tags": ["tips", "newowners"],
  "images": ["url1"],
  "published": true
}
```

---

### Get All Blogs
**GET** `/admin/blogs`

---

### Update Blog
**PATCH** `/admin/blog/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

### Delete Blog
**DELETE** `/admin/blog/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

### Get All Users
**GET** `/admin/users`

**Headers:**
```
Authorization: Bearer <admin-token>
```

---

## 🔒 Authorization Rules

### Public Routes (No Login Required):
- Browse pets (`GET /pets`)
- View pet details (`GET /pets/:id`)
- View lost/found posts
- View shelters
- View blogs

### Protected Routes (Login Required):
- Adopt pet
- Add/Remove favorites
- View/Update profile
- Create lost/found posts
- Apply for adoption

### Admin Routes (Admin Role Required):
- All `/admin/*` routes
- Create/Update/Delete pets
- Approve/Reject adoptions
- Manage shelters
- Manage blogs
- Delete lost/found posts

---

## 📊 Response Formats

### Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Unauthorized (401):
```json
{
  "success": false,
  "message": "Not authorized to access this route",
  "redirect": "/signin"
}
```

### Forbidden (403):
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

---

## 🚀 Getting Started

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure `.env` file (already created with your MongoDB URI)

3. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

4. Server will start on `http://localhost:5000`

---

## 🗄️ Database Collections

All collections are automatically created:
- `users` - User accounts
- `pets` - Pet listings
- `adoptions` - Adoption applications
- `lostfounds` - Lost & found posts
- `shelters` - Shelter information
- `blogs` - Blog posts

---

## 🔑 Creating Admin User

To create an admin user, register normally and then manually update the role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or use MongoDB Compass to change the role field from "user" to "admin".
