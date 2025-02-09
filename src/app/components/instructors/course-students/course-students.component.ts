import { Component } from '@angular/core';
import { InstructorService } from '../../../services/instructor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Console } from 'console';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CourseStudentsComponent {
  students: any[] = [];
  courseId: string = '';
  secId: string = '';
  semester: string = '';
  year: string = '';
  errorMessage: string = '';
  studentId: string = '';
  grade: string = '';
  successMessage: string = '';


  constructor(private instructorService: InstructorService) { }



  submitGrade(student: any): void {
    console.log("Submitting grade for:", student.ID, this.courseId, this.secId, student.grade);

    if (!student.ID || !this.courseId || !this.secId || !student.grade) {
      student.errorMessage = 'All fields are required.';
      return;
    }

    student.successMessage = ''; // Clear previous messages
    student.errorMessage = '';

    this.instructorService.submitGrade(student.ID, this.courseId, this.secId, student.grade).subscribe({
      next: () => {
        student.successMessage = 'Grade submitted successfully!';
        console.log(`Grade ${student.grade} saved for student ${student.ID}`);
      },
      error: (err) => {
        console.error('Error submitting grade:', err);
        student.errorMessage = 'Failed to submit grade.';
      }
    });
  }

  fetchStudents(): void {
    if (!this.courseId || !this.secId || !this.semester || !this.year) {
      this.errorMessage = 'All fields are required.';
      return;
    }
    console.log(this.courseId, this.secId, this.semester, this.year);
    this.instructorService.getCourseStudents(this.courseId, this.secId, this.semester, this.year).subscribe({
      next: (data) => {
        console.log(data)
        this.students = data;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error fetching students:', err);
        this.errorMessage = 'Failed to fetch students.';
      }
    });
  }
}
