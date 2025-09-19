import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = null;
  cartCount = 0;
  watchlistCount = 0;
  profileImage = 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400';
  isLoading = false;
  
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
    private movieService: MovieService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) {
      this.editForm.username = this.user.name;
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
    this.isLoading = true;
    
    // Validate passwords if changing
    if (this.editForm.newPassword) {
      if (!this.editForm.currentPassword) {
        this.errorMessage = 'Current password is required to change password';
        this.isLoading = false;
        return;
      }
      
      if (this.editForm.newPassword !== this.editForm.confirmPassword) {
        this.errorMessage = 'New passwords do not match';
        this.isLoading = false;
        return;
      }
      
      if (this.editForm.newPassword.length < 6) {
        this.errorMessage = 'New password must be at least 6 characters';
        this.isLoading = false;
        return;
      }
    }
    
    // Prepare update data
    const updateData: any = {};
    
    if (this.editForm.username !== this.user?.name) {
      updateData.name = this.editForm.username;
    }
    
    if (this.editForm.newPassword) {
      updateData.currentPassword = this.editForm.currentPassword;
      updateData.newPassword = this.editForm.newPassword;
    }
    
    // Call API to update profile
    this.apiService.updateProfile(updateData).subscribe({
      next: (response) => {
        this.successMessage = 'Profile updated successfully!';
        this.isLoading = false;
        
        // Update local user data with new token and user info
        this.authService.updateUserData(response.user);
        this.user = response.user;
        
        // Clear password fields
        this.editForm.currentPassword = '';
        this.editForm.newPassword = '';
        this.editForm.confirmPassword = '';
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to update profile';
        this.isLoading = false;
      }
    });
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

  deleteAccount(): void {
    if (confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.apiService.deleteAccount().subscribe({
        next: () => {
          alert('Your account has been successfully deleted.');
          this.authService.logout();
          this.router.navigate(['/landing']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to delete account';
          this.isLoading = false;
        }
      });
    }
  }
}