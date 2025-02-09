import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LoginComponent } from "./app/components/auth/login/login.component";
import { RegisterComponent } from "./app/components/auth/register/register.component";
import { DashboardComponent } from "./app/components/dashboard/dashboard.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { UserManagementComponent } from './app/components/users/user-management/user-management.component';
import { UserProfileComponent } from './app/components/users/user-profile/user-profile.component';
import { CourseListComponent } from './app/components/courses/course-list/course-list.component';
import { CreateCourseComponent } from './app/components/courses/create-course/create-course.component';
import { CourseDetailComponent } from './app/components/courses/course-detail/course-detail.component';
import { CourseStudentsComponent } from './app/components/instructors/course-students/course-students.component';
import { AssignedCoursesComponent } from './app/components/instructors/assigned-courses/assigned-courses.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'users/profile/:userId', component: UserProfileComponent },
      { path: 'courses', component: CourseListComponent, },
      { path: 'courses/create/new', component: CreateCourseComponent, },
      { path: 'courses/:id', component: CourseDetailComponent, },
      { path: 'instructor/assigned-courses', component: AssignedCoursesComponent },
      { path: 'instructor/course-students', component: CourseStudentsComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]),
    importProvidersFrom(FormsModule, ReactiveFormsModule)
  ]
}).catch(err => console.error(err));
