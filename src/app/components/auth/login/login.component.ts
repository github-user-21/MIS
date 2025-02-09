import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log("Hit the onSubmit...");
    if (this.loginForm.valid) {
      this.loading = true;

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log("Login successful!", response);
          if (response.user_id) {
            localStorage.setItem("user_id", response.user_id.toString());
          } else {
            console.warn("🚨 user_id is missing in the response from backend!");
          }

          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error("Login failed!", error);
          this.errorMessage = error.error.message || 'Login failed!';
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  onClickRegister() {
    console.log("Register button clicked, navigating...");
    this.router.navigate(['/register']);
  }
}
