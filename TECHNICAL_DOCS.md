# Technical Documentation - The Spot

## 🏗 Architecture Overview

The Spot follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐    MongoDB    ┌─────────────────┐
│   Angular SPA   │ ◄─────────────────► │  Express.js API │ ◄───────────► │   Database      │
│   (Frontend)    │                     │   (Backend)     │               │                 │
└─────────────────┘                     └─────────────────┘               └─────────────────┘
```

## 🔧 Backend Architecture

### Server Configuration (`server.js`)
```javascript
// Key configurations
- CORS enabled for frontend communication
- JSON body parsing middleware
- Static file serving
- MongoDB connection with Mongoose
- JWT authentication middleware
- Error handling middleware
```

### Database Models

#### User Model (`models/User.js`)
```javascript
{
  name: String (required),
  email: String (required, unique),
  passwordHash: String (required),
  role: String (enum: ['client', 'admin'], default: 'client'),
  createdAt: Date,
  updatedAt: Date
}
```

#### Item Model (`models/Item.js`)
```javascript
{
  title: String (required),
  description: String (required),
  genre: String (required),
  rating: Number (0-10),
  dailyRate: Number (required),
  inStock: Boolean (default: true),
  releaseYear: Number,
  director: String,
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### API Routes Structure

#### Authentication Routes (`routes/auth.js`)
- **POST /api/auth/register**
  - Validates input data
  - Checks for existing users
  - Hashes password with bcrypt
  - Creates user with 'client' role
  - Returns JWT token

- **POST /api/auth/login**
  - Validates credentials
  - Compares hashed passwords
  - Generates JWT token
  - Returns user data and token

- **GET /api/auth/me** (Protected)
  - Requires valid JWT token
  - Returns current user information
  - Excludes password hash

- **PUT /api/auth/me** (Protected)
  - Updates user profile
  - Handles password changes
  - Validates current password
  - Returns updated user data

- **DELETE /api/auth/me** (Protected)
  - Permanently deletes user account
  - Removes all user data
  - Returns confirmation message

#### Item Management Routes (`routes/items.js`)
- **GET /api/items**
  - Supports pagination (page, limit)
  - Returns paginated movie list
  - Includes total count and page info

- **GET /api/items/:id**
  - Returns specific movie details
  - Handles invalid IDs gracefully

- **POST /api/items** (Admin only)
  - Creates new movie entry
  - Validates required fields
  - Sets default values

- **PUT /api/items/:id** (Admin only)
  - Updates existing movie
  - Partial updates supported
  - Validates data integrity

- **DELETE /api/items/:id** (Admin only)
  - Removes movie from database
  - Returns confirmation

#### User Management Routes (`routes/users.js`)
- **GET /api/users** (Admin only)
  - Returns all users
  - Excludes password hashes
  - Supports filtering by role

- **POST /api/users/:id/make-admin** (Admin only)
  - Promotes user to admin role
  - Validates user existence
  - Updates role in database

### Middleware

#### Authentication Middleware (`middleware/auth.js`)
```javascript
// JWT token verification
- Extracts token from Authorization header
- Verifies token signature
- Adds user data to request object
- Handles expired/invalid tokens
```

## 🎨 Frontend Architecture

### Angular Application Structure

#### Core Services

##### AuthService (`services/auth.service.ts`)
```typescript
// Responsibilities:
- User authentication (login/register)
- JWT token management
- User session persistence
- Role-based access control
- User data updates
```

##### ApiService (`services/api.service.ts`)
```typescript
// Responsibilities:
- HTTP client wrapper
- API endpoint abstraction
- Request/response transformation
- Error handling
- Data type conversion (Backend ↔ Frontend)
```

##### MovieService (`services/movie.service.ts`)
```typescript
// Responsibilities:
- Movie data management
- Cart functionality (user-specific)
- Wishlist functionality (user-specific)
- Local storage management
- Data synchronization
```

#### Route Guards

##### AuthGuard (`guards/auth.guard.ts`)
```typescript
// Protects routes requiring authentication
- Checks for valid JWT token
- Redirects to login if unauthorized
- Allows access for authenticated users
```

##### AdminGuard (`guards/admin.guard.ts`)
```typescript
// Protects admin-only routes
- Verifies admin role
- Redirects non-admins to home
- Works in conjunction with AuthGuard
```

### Component Architecture

#### Page Components
- **LandingPageComponent**: Public homepage
- **AuthenticationComponent**: Login/Register forms
- **HomeComponent**: Dashboard for authenticated users
- **ItemListComponent**: Movie catalog with search/filter
- **MovieDetailsComponent**: Individual movie information
- **CartComponent**: Shopping cart management
- **WishlistComponent**: Saved movies list
- **ProfileComponent**: User account management
- **AdminPanelComponent**: Administrative tools

#### Shared Components
- **MoviePosterCarouselComponent**: Reusable movie display

### State Management

#### User-Specific Data Storage
```typescript
// Storage Keys Pattern:
cart_${userId}      // User's cart items
watchlist_${userId} // User's wishlist items

// Benefits:
- Data isolation between users
- Persistent sessions
- No data leakage
- Automatic cleanup on logout
```

#### Observable Data Flow
```typescript
// Service → Component communication
BehaviorSubject → Observable → Component subscription

// Examples:
authService.user$ → User state changes
movieService.cart$ → Cart updates
movieService.watchlist$ → Wishlist updates
```

## 🔐 Security Implementation

### Password Security
```javascript
// Backend password handling
- bcrypt hashing with salt rounds (10)
- No plain text storage
- Secure password comparison
- Password change validation
```

### JWT Token Security
```javascript
// Token configuration
- 8-hour expiration
- Signed with secret key
- Includes user ID, email, role
- Automatic refresh on profile updates
```

### Frontend Security
```typescript
// Route protection
- AuthGuard for authenticated routes
- AdminGuard for admin routes
- Token storage in localStorage
- Automatic logout on token expiration
```

### API Security
```javascript
// Request validation
- Input sanitization
- Required field validation
- Role-based access control
- Error message sanitization
```

## 📱 Responsive Design Implementation

### CSS Architecture
```css
/* Mobile-first approach */
@media (max-width: 991.98px) {
  /* Mobile styles */
}

@media (min-width: 992px) {
  /* Desktop styles */
}
```

### Bootstrap Integration
- Grid system for responsive layouts
- Utility classes for spacing/alignment
- Component classes for UI elements
- Custom CSS for brand-specific styling

### Mobile Navigation
```css
/* Collapsible navbar */
- Bootstrap collapse component
- Custom styling for mobile menu
- Touch-friendly button sizes
- Proper z-index management
```

## 🔄 Data Flow Patterns

### Authentication Flow
```
1. User submits credentials
2. Frontend sends POST to /api/auth/login
3. Backend validates credentials
4. JWT token generated and returned
5. Frontend stores token and user data
6. Subsequent requests include Authorization header
7. Backend middleware validates token
8. Protected resources accessed
```

### Cart/Wishlist Flow
```
1. User adds item to cart/wishlist
2. MovieService updates BehaviorSubject
3. Data saved to localStorage with user ID
4. Components automatically update via subscription
5. On logout, data remains in user-specific storage
6. On login, user's data is loaded from storage
```

### Admin Operations Flow
```
1. Admin accesses protected route
2. AuthGuard + AdminGuard validate permissions
3. Admin performs CRUD operation
4. API validates admin role
5. Database operation executed
6. Frontend updates local data
7. UI reflects changes immediately
```

## 🧪 Testing Strategy

### Unit Testing
```typescript
// Component testing
- Isolated component behavior
- Service method testing
- Mock dependencies
- Input/output validation

// Service testing
- API call mocking
- Data transformation testing
- Error handling validation
- Observable stream testing
```

### Integration Testing
```typescript
// Route testing
- Guard functionality
- Component interaction
- Service integration
- API communication
```

### E2E Testing
```typescript
// User journey testing
- Authentication flow
- Movie browsing
- Cart operations
- Admin functions
```

## 🚀 Performance Optimizations

### Frontend Optimizations
```typescript
// Angular optimizations
- OnPush change detection strategy
- Lazy loading for routes
- Tree shaking for unused code
- AOT compilation for production
```

### Backend Optimizations
```javascript
// Express optimizations
- Gzip compression
- Static file caching
- Database connection pooling
- Query optimization with indexes
```

### Database Optimizations
```javascript
// MongoDB optimizations
- Proper indexing on frequently queried fields
- Pagination for large datasets
- Aggregation pipelines for complex queries
- Connection pooling
```

## 🔧 Development Workflow

### Code Standards
```typescript
// TypeScript configuration
- Strict type checking
- ESLint for code quality
- Prettier for formatting
- Angular style guide compliance
```

### Build Process
```bash
# Development
ng serve --open          # Frontend dev server
npm run dev             # Backend with nodemon

# Production
ng build --prod         # Optimized frontend build
npm start              # Production backend server
```

### Environment Configuration
```typescript
// Frontend environments
environment.ts          // Development config
environment.prod.ts     // Production config

// Backend environments
.env                   // Environment variables
.env.example          // Template for required variables
```

## 📊 Monitoring & Debugging

### Error Handling
```typescript
// Frontend error handling
- Global error interceptor
- User-friendly error messages
- Console logging for debugging
- Graceful degradation

// Backend error handling
- Centralized error middleware
- Proper HTTP status codes
- Error logging
- Sanitized error responses
```

### Logging Strategy
```javascript
// Development logging
- Console logs for debugging
- Request/response logging
- Error stack traces
- Performance metrics

// Production logging
- File-based logging
- Error aggregation
- Performance monitoring
- Security event logging
```

## 🔮 Future Enhancements

### Scalability Considerations
- Microservices architecture
- Database sharding
- CDN for static assets
- Load balancing
- Caching strategies (Redis)

### Feature Roadmap
- Real-time notifications (WebSocket)
- Payment processing integration
- Advanced search with Elasticsearch
- Machine learning recommendations
- Mobile app development
- Progressive Web App features

---

This technical documentation provides a comprehensive overview of The Spot's architecture, implementation details, and development practices.