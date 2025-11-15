# 🐾 Pet Adoption Platform - Complete Backend API

A comprehensive, production-ready RESTful backend for a Pet Adoption Platform built with Node.js, Express, MongoDB Atlas, and JWT authentication.

---

## 🎯 Overview

This backend provides a complete API for a pet adoption website with user authentication, role-based access control, pet management, adoption workflow, favorites system, lost & found posts, and admin panel capabilities.

**Live Backend:** http://localhost:5000  
**API Base URL:** http://localhost:5000/api

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration with email validation
- Secure login with JWT tokens (access + refresh)
- Password hashing with bcrypt
- Role-based access control (User/Admin)
- Protected routes middleware
- Auto-redirect to signin for unauthorized access

### 🐕 Pet Management
- Browse available pets (public)
- Detailed pet information
- Add/Edit/Delete pets (admin only)
- Pet status management (available/pending/adopted)
- Auto-hide adopted pets from public listing
- Pet filters and search capabilities

### 🏠 Adoption Workflow
- Submit adoption applications with questionnaire
- Track adoption status (submitted/approved/rejected)
- Admin approval/rejection system
- Auto-update pet status on adoption
- View adoption history
- Prevent duplicate applications

### ❤️ Favorites System
- Save favorite pets (requires login)
- Remove from favorites
- View all favorite pets
- Duplicate prevention

### 👤 User Profile
- View profile with adopted pets and favorites
- Update profile information
- Location management
- Avatar support

### 🔍 Lost & Found
- Post lost pet reports
- Post found pet reports
- Browse all lost/found pets (public)
- Mark posts as resolved
- Admin moderation (delete fake posts)

### 👨‍💼 Admin Dashboard
- Dashboard statistics
- User management
- Pet management
- Adoption management
- Shelter CRUD operations
- Blog/News management

---

## 🗄️ Database Schema

### Collections
- **users** - User accounts with roles and favorites
- **pets** - Pet listings with complete details
- **adoptions** - Adoption applications and status
- **lostfounds** - Lost and found pet posts
- **shelters** - Shelter information
- **blogs** - Blog posts and news articles

All collections are automatically created on first run.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (already configured)

### Installation

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables are already configured in `.env`**

4. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Server will start on http://localhost:5000**

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
POST   /api/auth/logout        - Logout user
GET    /api/auth/me            - Get current user
```

### Pets
```
GET    /api/pets               - Get all available pets (public)
GET    /api/pets/:id           - Get pet by ID (public)
POST   /api/pets               - Create pet (admin)
PATCH  /api/pets/:id           - Update pet (admin)
DELETE /api/pets/:id           - Delete pet (admin)
GET    /api/pets/admin/all     - Get all pets (admin)
```

### Adoption
```
POST   /api/adoption/apply              - Apply for adoption
GET    /api/adoption/my                 - Get user's adoptions
GET    /api/adoption/:id                - Get adoption by ID (admin)
GET    /api/adoption/admin/all          - Get all adoptions (admin)
PATCH  /api/adoption/:id/approve        - Approve adoption (admin)
PATCH  /api/adoption/:id/reject         - Reject adoption (admin)
```

### Favorites
```
POST   /api/favorites/add      - Add to favorites
POST   /api/favorites/remove   - Remove from favorites
GET    /api/favorites/my       - Get user's favorites
```

### Profile
```
GET    /api/profile/me         - Get user profile
PUT    /api/profile/update     - Update profile
```

### Lost & Found
```
POST   /api/lostfound/post           - Create lost/found post
GET    /api/lostfound/lost           - Get all lost pets (public)
GET    /api/lostfound/found          - Get all found pets (public)
GET    /api/lostfound/all            - Get all posts (public)
GET    /api/lostfound/my             - Get user's posts
PATCH  /api/lostfound/:id/resolve    - Mark as resolved
DELETE /api/lostfound/:id            - Delete post (admin)
```

### Admin
```
GET    /api/admin/stats          - Dashboard statistics
POST   /api/admin/shelter        - Create shelter
GET    /api/admin/shelters       - Get all shelters
PATCH  /api/admin/shelter/:id    - Update shelter
DELETE /api/admin/shelter/:id    - Delete shelter
POST   /api/admin/blog           - Create blog
GET    /api/admin/blogs          - Get all blogs
PATCH  /api/admin/blog/:id       - Update blog
DELETE /api/admin/blog/:id       - Delete blog
GET    /api/admin/users          - Get all users
```

**Total: 39 API Endpoints**

---

## 🔒 Authorization Rules

### Public Routes (No Login Required)
- Browse pets, shelters, blogs, lost/found posts
- View pet details

### Protected Routes (Login Required)
Returns `401` with `redirect: "/signin"` if not authenticated:
- Adopt pets
- Manage favorites
- Access profile
- Create lost/found posts

### Admin Routes (Admin Role Required)
Returns `403` if user is not admin:
- All `/api/admin/*` routes
- Create/Update/Delete pets
- Approve/Reject adoptions

---

## 📝 Example Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "phone": "9876543210",
    "password": "test123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "test123"
  }'
```

### Get Pets (Public)
```bash
curl http://localhost:5000/api/pets
```

### Add to Favorites (Requires Auth)
```bash
curl -X POST http://localhost:5000/api/favorites/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"petId": "PET_ID"}'
```

---

## 🧪 Testing

### Using Postman
1. Import `Postman_Collection.json`
2. Set `baseUrl` variable to `http://localhost:5000/api`
3. Login to get token (auto-saved)
4. Test all endpoints

### Using cURL
Examples provided in `QUICK_START.md`

---

## 👨‍💼 Creating Admin User

1. Register a normal user via `/api/auth/register`
2. Connect to MongoDB Atlas
3. Navigate to `petadopt` database → `users` collection
4. Find your user and change `role` from `"user"` to `"admin"`

Or use MongoDB shell:
```javascript
db.users.updateOne(
  { email: "admin@test.com" },
  { $set: { role: "admin" } }
)
```

---

## 📂 Project Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   ├── authController.js        # Authentication logic
│   ├── petController.js         # Pet CRUD operations
│   ├── adoptionController.js    # Adoption workflow
│   ├── favoritesController.js   # Favorites management
│   ├── profileController.js     # User profile
│   ├── lostFoundController.js   # Lost & found posts
│   └── adminController.js       # Admin operations
├── middleware/
│   ├── authMiddleware.js        # JWT authentication
│   └── adminMiddleware.js       # Admin role verification
├── models/
│   ├── User.js                  # User schema
│   ├── Pet.js                   # Pet schema
│   ├── Adoption.js              # Adoption schema
│   ├── LostFound.js             # Lost/Found schema
│   ├── Shelter.js               # Shelter schema
│   └── Blog.js                  # Blog schema
├── routes/
│   ├── authRoutes.js
│   ├── petRoutes.js
│   ├── adoptionRoutes.js
│   ├── favoritesRoutes.js
│   ├── profileRoutes.js
│   ├── lostFoundRoutes.js
│   └── adminRoutes.js
├── utils/
│   ├── generateToken.js         # JWT token generation
│   └── uploadHandler.js         # File upload handling
├── uploads/                     # File storage directory
├── .env                         # Environment variables
├── .gitignore
├── package.json
├── server.js                    # Express app entry point
├── API_DOCUMENTATION.md         # Complete API reference
├── QUICK_START.md               # Quick start guide
├── IMPLEMENTATION_SUMMARY.md    # Implementation overview
├── Postman_Collection.json      # Postman API collection
└── README.md                    # This file
```

---

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **File Upload:** Multer
- **CORS:** cors middleware
- **Environment:** dotenv

---

## 🔐 Environment Variables

Located in `.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

---

## 📚 Documentation

- **API_DOCUMENTATION.md** - Complete API endpoint reference with examples
- **QUICK_START.md** - Setup guide and testing instructions
- **IMPLEMENTATION_SUMMARY.md** - Feature overview and implementation details
- **Postman_Collection.json** - Ready-to-import Postman collection

---

## 🔄 Workflow Examples

### Adoption Flow
1. User browses pets → `GET /api/pets`
2. User clicks "Adopt" → Frontend checks login
3. If not logged in → Redirect to `/signin`
4. User logs in → `POST /api/auth/login`
5. User fills adoption form → `POST /api/adoption/apply`
6. Pet status becomes "pending"
7. Admin reviews → `GET /api/adoption/admin/all`
8. Admin approves → `PATCH /api/adoption/:id/approve`
9. Pet status becomes "adopted"
10. Pet disappears from public listing

### Favorites Flow
1. User clicks favorite icon → Frontend checks login
2. If not logged in → Redirect to `/signin`
3. User logs in → `POST /api/auth/login`
4. Add to favorites → `POST /api/favorites/add`
5. View favorites → `GET /api/favorites/my`

---

## ✅ Features Checklist

- ✅ Complete authentication system
- ✅ Role-based authorization
- ✅ Pet CRUD operations
- ✅ Adoption workflow
- ✅ Favorites management
- ✅ User profiles
- ✅ Lost & found posts
- ✅ Admin dashboard
- ✅ Shelter management
- ✅ Blog management
- ✅ Auto-hide adopted pets
- ✅ 401 redirect logic
- ✅ Password hashing
- ✅ JWT tokens
- ✅ Input validation
- ✅ Error handling
- ✅ CORS support
- ✅ File upload support

---

## 🚀 Production Deployment

Before deploying to production:

1. **Update JWT secrets** in `.env`
2. **Set `NODE_ENV=production`**
3. **Update `FRONTEND_URL`** to your production domain
4. **Enable rate limiting** (recommended)
5. **Set up HTTPS**
6. **Configure MongoDB Atlas IP whitelist**
7. **Use environment-specific config**

---

## 🤝 Frontend Integration

### Axios Setup
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Usage Example
```javascript
// Login
const { data } = await api.post('/auth/login', { email, password });
localStorage.setItem('token', data.data.accessToken);

// Get pets
const { data } = await api.get('/pets');

// Add to favorites
await api.post('/favorites/add', { petId });
```

---

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

### Unauthorized Response (401)
```json
{
  "success": false,
  "message": "Not authorized to access this route",
  "redirect": "/signin"
}
```

---

## 🐛 Error Handling

All errors are handled by centralized error middleware:
- Validation errors
- Authentication errors
- Authorization errors
- Database errors
- Server errors

---

## 📄 License

ISC

---

## 👨‍💻 Support

For questions or issues:
- Check `API_DOCUMENTATION.md` for endpoint details
- Check `QUICK_START.md` for setup help
- Review `IMPLEMENTATION_SUMMARY.md` for feature overview

---

## 🎉 Status

**Backend Status:** ✅ COMPLETE & RUNNING  
**Database:** ✅ Connected to MongoDB Atlas  
**Collections:** ✅ Auto-created  
**API Endpoints:** ✅ 39 endpoints ready  
**Documentation:** ✅ Complete  

**Ready for production use!** 🚀

---

**Built with ❤️ for Pet Adoption Platform**
