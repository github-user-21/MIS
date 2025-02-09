import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule]
})
export class DashboardComponent implements OnInit {
  userRole: string = '';
  user: any = {};
  totalCourses: number = 0;
  totalStudents: number = 0;
  studentGPA: number = 0.0;
  pendingGrades: number = 0;
  recentActivities: any[] = [];
  errorMessage: string = '';
  isEditing: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  debugRouter(route: string) {
    console.log("Navigating to:", route);
    this.router.navigate([route]);
  }

  loadUserProfile() {
    const loggedInUserId = localStorage.getItem('user_id');
  
    if (!loggedInUserId) {
      console.warn("user_id is missing from localStorage!");
      this.errorMessage = 'User ID not found. Please log in again.';
      return;
    }
  
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        console.log("Fetched User Data:", data);
  
        if (data && typeof data === 'object') {
          this.user = data; // Direct assignment
          this.userRole = data.role_type || '';
        } else {
          console.error("Unexpected response format:", data);
          this.errorMessage = 'Invalid profile data received.';
        }
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.router.navigate(['/login']);
      }
    });
  }  

  editProfile() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.loadUserProfile();
  }

  updateProfile() {
    this.userService.updateUserProfile(this.user).subscribe({
      next: () => {
        console.log("Profile updated successfully!");
        this.isEditing = false;
        this.loadUserProfile();
      },
      error: (err) => {
        console.error("Error updating profile:", err);
        this.errorMessage = 'Failed to update profile';
      }
    });
  }

  confirmDelete() {
    if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      this.deleteProfile();
    }
  }

  deleteProfile() {
    this.userService.deleteUser(this.user.user_id).subscribe({
      next: () => {
        console.log("Profile deleted successfully!");
        localStorage.clear();
        window.location.href = '/';
      },
      error: (err) => {
        console.error("Error deleting profile:", err);
        this.errorMessage = 'Failed to delete profile';
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
