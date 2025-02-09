import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CreateCourseComponent implements OnInit {
  course: any = {
    course_id: '',
    title: '',
    dept_name: '',
    credits: 3
  };

  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {}

  createCourse(): void {
    if (!this.course.courseId || !this.course.title || !this.course.deptName || !this.course.credits) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    console.log('Submitting Course:', this.course); // Debugging output

    this.isSubmitting = true;
    this.courseService.createCourse(this.course).subscribe({
      next: () => {
        this.successMessage = 'Course created successfully!';
        setTimeout(() => {
          this.router.navigate(['/courses']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error creating course:', err);
        this.errorMessage = 'Failed to create course. Please try again.';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
