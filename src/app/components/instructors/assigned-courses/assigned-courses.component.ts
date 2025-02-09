import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../services/instructor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assigned-courses',
  templateUrl: './assigned-courses.component.html',
  styleUrls: ['./assigned-courses.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AssignedCoursesComponent implements OnInit {
  courses: any[] = [];
  errorMessage: string = '';

  constructor(private instructorService: InstructorService) {}

  ngOnInit(): void {
    this.instructorService.getAssignedCourses().subscribe({
      next: (data) => {
        console.log(data);
        this.courses = data;
      },
      error: (err) => {
        console.error('Error fetching assigned courses:', err);
        this.errorMessage = 'Failed to load assigned courses.';
      }
    });
  }
}
