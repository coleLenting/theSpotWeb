import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any = null;
  cartCount = 0;
  watchlistCount = 0;
  profileImage = 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400';
  
  editForm = {
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) {
      this.editForm.username = this.user.name; // Using name as username for now
      this.editForm.email = this.user.email;
    }
    
    // Get cart and watchlist counts
    this.movieService.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });
    
    this.movieService.watchlist$.subscribe(watchlist => {
      this.watchlistCount = watchlist.length;
    });
  }

  triggerImageUpload(): void {
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    input?.click();
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile(): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    // Validate passwords if changing
    if (this.editForm.newPassword) {
      if (!this.editForm.currentPassword) {
        this.errorMessage = 'Current password is required to change password';
        return;
      }
      
      if (this.editForm.newPassword !== this.editForm.confirmPassword) {
        this.errorMessage = 'New passwords do not match';
        return;
      }
      
      if (this.editForm.newPassword.length < 6) {
        this.errorMessage = 'New password must be at least 6 characters';
        return;
      }
    }
    
    // Simulate API call (replace with actual API call later)
    setTimeout(() => {
      this.successMessage = 'Profile updated successfully!';
      
      // Update local user data
      if (this.user) {
        this.user.name = this.editForm.username;
        localStorage.setItem('auth_user', JSON.stringify(this.user));
      }
      
      // Clear password fields
      this.editForm.currentPassword = '';
      this.editForm.newPassword = '';
      this.editForm.confirmPassword = '';
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, 1000);
  }

  resetForm(): void {
    if (this.user) {
      this.editForm.username = this.user.name;
      this.editForm.email = this.user.email;
    }
    this.editForm.currentPassword = '';
    this.editForm.newPassword = '';
    this.editForm.confirmPassword = '';
    this.errorMessage = '';
    this.successMessage = '';
  }
}