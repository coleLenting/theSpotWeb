export interface User {
  _id?: string;
  name: string;
  username?: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  profileImage?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginAt?: Date;
  preferences?: {
    theme: 'light' | 'dark';
    notifications: boolean;
    newsletter: boolean;
  };
  stats?: {
    moviesWatched: number;
    reviewsCount: number;
    wishlistCount: number;
  };
}