import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CourseDetailComponent implements OnInit {
  courseId: string | null = null;
  course: any = {};
  section: any[] = []; // Store section details as an array
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = true;
  studentId: string | null = null; // Get student ID from localStorage

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.studentId = localStorage.getItem('user_id'); // Fetch student ID
    console.log("Student ID:", this.studentId);

    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      if (this.courseId) {
        this.loadCourseDetails();
        this.loadSectionDetails();
      }
    });
  }

  loadCourseDetails(): void {
    this.courseService.getCourseById(this.courseId!).subscribe({
      next: (data) => {
        console.log("Course Data:", data);
        this.course = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching course details:', err);
        this.errorMessage = 'Failed to load course details.';
        this.isLoading = false;
      }
    });
  }

  loadSectionDetails(): void {
    this.courseService.getSectionsByCourse(this.courseId!).subscribe({
      next: (data) => {
        console.log("Section Data:", data);
        if (data && data.length > 0) {
          this.section = data;
        } else {
          this.errorMessage = 'No sections available for this course.';
        }
      },
      error: (err) => {
        console.error('Error fetching section details:', err);
        this.errorMessage = 'Failed to load section details.';
      }
    });
  }

  enrollCourse(): void {
    if (!this.studentId) {
      this.errorMessage = 'Student ID is missing.';
      return;
    }

    if (!this.course.course_id) {
      this.errorMessage = 'Course ID is missing.';
      return;
    }

    if (!this.section.length || !this.section[0]) {
      this.errorMessage = 'Section details are missing.';
      return;
    }

    const secId = this.section[0]?.sec_id; // Ensure sec_id exists

    if (!secId) {
      this.errorMessage = 'Section ID is missing.';
      return;
    }

    console.log("Enrolling with:", {
      studentId: this.studentId,
      courseId: this.course.course_id,
      secId: secId
    });

    // Send request and print the exact request body
    this.studentService.enrollCourse(this.studentId, this.course.course_id, secId).subscribe({
      next: () => {
        console.log("Successfully Enrolled in:", this.course.course_id, secId);
        this.successMessage = 'Enrolled successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Error enrolling in course:', err);
        this.errorMessage = 'Enrollment failed.';
      }
    });
  }


}
