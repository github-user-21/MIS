import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private baseUrl = 'http://localhost:5000/instructor';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Ensure token is stored after login
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAssignedCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses`, { headers: this.getHeaders() });
  }

  getCourseStudents(courseId: string, secId: string, semester: string, year: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/students`, { courseId, secId, semester, year }, { headers: this.getHeaders() });
  }

  submitGrade(studentId: string, courseId: string, secId: string, grade: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/grade`, { studentId, courseId, secId, grade }, { headers: this.getHeaders() });
  }
}
