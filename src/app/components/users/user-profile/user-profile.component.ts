import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule, } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [CommonModule,FormsModule],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  errorMessage: string = '';
  isEditing: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {

    const loggedInUserId = localStorage.getItem('user_id');

    if (!loggedInUserId) {
      console.warn("🚨 user_id is missing from localStorage!");
      this.errorMessage = 'User ID not found. Please log in again.';
      return;
    }

    this.userService.getUserProfile().subscribe({
      next: (data) => {
        console.log("Fetched User Data:", data);
        this.user = data.find((u: any) => u.user_id == loggedInUserId) || {};
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile';
        console.error('Error fetching user profile:', err);
      }
    });
  }
  editProfile() {
    this.isEditing = true;
  }

  // Cancel Edit Mode
  cancelEdit() {
    this.isEditing = false;
    this.loadUserProfile(); // Reload original profile data
  }

  // Update User Profile
  updateProfile() {
    this.userService.updateUserProfile(this.user).subscribe({
      next: () => {
        console.log("Profile updated successfully!");
        this.isEditing = false;
        this.loadUserProfile(); // Refresh data after update
      },
      error: (err) => {
        console.error("Error updating profile:", err);
        this.errorMessage = 'Failed to update profile';
      }
    });
  }

  // Confirm Delete Action
  confirmDelete() {
    if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      this.deleteProfile();
    }
  }

  // Delete User Profile
  deleteProfile() {
    this.userService.deleteUser(this.user.user_id).subscribe({
      next: () => {
        console.log("Profile deleted successfully!");
        localStorage.clear(); // Clear stored user data
        window.location.href = '/'; // Redirect to home/login
      },
      error: (err) => {
        console.error("Error deleting profile:", err);
        this.errorMessage = 'Failed to delete profile';
      }
    });
  }
}
