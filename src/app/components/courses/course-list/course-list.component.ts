import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { StudentService } from "../../../services/student.service"
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  filteredCourses: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  searchQuery: string = '';
  userRole: string = '';
  successMessage!: string;

  constructor(private courseService: CourseService, private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('user_role') || '';
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data: any[]) => {
        this.courses = data;
        this.filteredCourses = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching courses:', err);
        this.errorMessage = 'Failed to load courses. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  viewCourseDetails(course:any): void {
    console.log("", course);
    this.router.navigate(['/courses', course.course_id]);
  }
  // enrollCourse(course: any): void {
  //   console.log("", course);
  //   const { course_id, sec_id, semester, year } = course; 
  //   if (!course_id || !sec_id || !semester || !year) {
  //     this.errorMessage = 'Course details are incomplete.';
  //     return;
  //   }

  //   this.studentService.enrollCourse(course_id, sec_id, semester, year).subscribe({
  //     next: () => {
  //       this.successMessage = 'Enrolled successfully!';
  //       setTimeout(() => {
  //         this.successMessage = '';
  //       }, 3000);
  //     },
  //     error: (err: any) => {
  //       console.error('Error enrolling in course:', err);
  //       this.errorMessage = 'Enrollment failed. Please try again.';
  //     }
  //   });
  // }
}
