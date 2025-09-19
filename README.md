# The Spot - Movie Rental Platform

A full-stack movie rental platform built with Angular frontend and Node.js/Express backend with MongoDB database.

## 🎬 Project Overview

The Spot is a modern movie rental platform that allows users to browse, rent, and manage their movie collections. The platform features user authentication, role-based access control, shopping cart functionality, wishlist management, and administrative tools.

## 🚀 Features

### User Features
- **User Authentication**: Secure registration and login system
- **Movie Browsing**: Browse extensive movie catalog with search and filtering
- **Movie Details**: Detailed movie information with ratings, descriptions, and trailers
- **Shopping Cart**: Add/remove movies to/from cart with persistent storage
- **Wishlist**: Save movies for later viewing with heart-based favorites
- **User Profile**: Update personal information and change passwords
- **Account Management**: Delete account functionality
- **Responsive Design**: Mobile-friendly interface with optimized navigation

### Admin Features
- **Admin Panel**: Comprehensive administrative dashboard
- **Movie Management**: Add, edit, and delete movies from the catalog
- **User Management**: View users and promote to admin status
- **Content Control**: Full CRUD operations on movie database

### Technical Features
- **User-Specific Data**: Cart and wishlist data isolated per user
- **Real-time Updates**: Dynamic cart and wishlist counters
- **Secure API**: JWT-based authentication with protected routes
- **Data Persistence**: MongoDB database with proper data modeling
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠 Technology Stack

### Frontend
- **Angular 19**: Modern TypeScript-based framework
- **Bootstrap 5**: Responsive CSS framework
- **Font Awesome**: Icon library
- **RxJS**: Reactive programming with observables
- **Angular Router**: Client-side routing

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing

## 📁 Project Structure

```
theSpotWeb/
├── backend/                    # Node.js/Express backend
│   ├── models/                # MongoDB models
│   │   ├── User.js           # User model with authentication
│   │   └── Item.js           # Movie/Item model
│   ├── routes/               # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── items.js         # Movie CRUD routes
│   │   └── users.js         # User management routes
│   ├── middleware/           # Custom middleware
│   │   └── auth.js          # JWT authentication middleware
│   └── server.js            # Main server file
│
├── theSpot/                   # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Reusable components
│   │   │   ├── pages/        # Page components
│   │   │   │   ├── authentication/
│   │   │   │   ├── home/
│   │   │   │   ├── movie-details/
│   │   │   │   ├── cart/
│   │   │   │   ├── wishlist/
│   │   │   │   ├── profile/
│   │   │   │   └── admin-panel/
│   │   │   ├── services/     # Angular services
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── api.service.ts
│   │   │   │   └── movie.service.ts
│   │   │   ├── guards/       # Route guards
│   │   │   └── interceptors/ # HTTP interceptors
│   │   └── assets/          # Static assets
│   └── package.json
│
└── README.md                 # This documentation
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Angular CLI (`npm install -g @angular/cli`)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/thespot
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd theSpot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update environment configuration in `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:5000/api'
   };
   ```

4. Start the development server:
   ```bash
   ng serve
   ```

5. Open your browser and navigate to `http://localhost:4200`

## 🔐 Authentication & Authorization

### User Roles
- **Client**: Default role for registered users
  - Browse movies
  - Manage cart and wishlist
  - Update profile
  - Delete account

- **Admin**: Elevated privileges
  - All client permissions
  - Access admin panel
  - Manage movies (CRUD operations)
  - Manage users
  - Promote users to admin

### Security Features
- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Route guards for frontend protection
- User-specific data isolation

## 🛒 Cart & Wishlist System

### User-Specific Storage
- Cart and wishlist data are stored per user ID
- Data persists across sessions for logged-in users
- Automatic cleanup on logout
- No data sharing between different users

### Storage Keys
- Cart: `cart_${userId}` in localStorage
- Wishlist: `watchlist_${userId}` in localStorage

## 📱 Responsive Design

### Mobile Optimizations
- Collapsible navigation menu
- Touch-friendly buttons and interactions
- Optimized layouts for small screens
- Proper viewport configuration

### Desktop Features
- Full navigation bar
- Hover effects and animations
- Multi-column layouts
- Enhanced visual feedback

## 🎨 UI/UX Features

### Design Elements
- Gradient backgrounds with space theme
- Custom fonts (Bauhaus, Bricolage Grotesque)
- Consistent color scheme with cyan accents
- Smooth animations and transitions
- Glass-morphism effects

### User Experience
- Intuitive navigation
- Clear visual feedback
- Loading states and error handling
- Confirmation dialogs for destructive actions
- Real-time cart and wishlist counters

## 🔄 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /me` - Get current user
- `PUT /me` - Update user profile
- `DELETE /me` - Delete user account

### Movie Routes (`/api/items`)
- `GET /` - Get all movies (paginated)
- `GET /:id` - Get specific movie
- `POST /` - Create new movie (admin only)
- `PUT /:id` - Update movie (admin only)
- `DELETE /:id` - Delete movie (admin only)

### User Management Routes (`/api/users`)
- `GET /` - Get all users (admin only)
- `POST /:id/make-admin` - Promote user to admin (admin only)

## 🧪 Testing

### Running Tests
```bash
# Frontend tests
cd theSpot
ng test

# Backend tests (if implemented)
cd backend
npm test
```

## 🚀 Deployment

### Frontend Deployment
```bash
cd theSpot
ng build --configuration production
```

### Backend Deployment
Ensure environment variables are properly configured for production:
- `MONGODB_URI`: Production MongoDB connection string
- `JWT_SECRET`: Strong, unique secret key
- `PORT`: Production port (usually provided by hosting service)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues & Future Enhancements

### Current Limitations
- No payment processing integration
- No email notifications
- No movie streaming functionality
- Limited search and filtering options

### Planned Features
- Payment gateway integration
- Email verification and notifications
- Advanced search with filters
- Movie recommendations
- User reviews and ratings
- Rental history tracking
