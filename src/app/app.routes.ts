import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/users/user-management/user-management.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { CourseDetailComponent } from './components/courses/course-detail/course-detail.component';
import { CreateCourseComponent } from './components/courses/create-course/create-course.component';
import { AssignedCoursesComponent } from './components/instructors/assigned-courses/assigned-courses.component';
import { CourseStudentsComponent } from './components/instructors/course-students/course-students.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "dashboard", component: DashboardComponent },

  { path: 'users', component: UserManagementComponent },
  { path: 'users/profile/:userId', component: UserProfileComponent },

  { path: 'courses', component: CourseListComponent },
  { path: 'courses/create/new', component: CreateCourseComponent },
  { path: 'course/:id', component: CourseDetailComponent },

  { path: 'instructor/assigned-courses', component: AssignedCoursesComponent },
  { path: 'instructor/course-students', component: CourseStudentsComponent },


  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
