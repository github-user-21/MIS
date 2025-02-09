import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private baseUrl = 'http://localhost:5000/student';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Ensure token is stored after login
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  viewProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`, { headers: this.getAuthHeaders() });
  }

  viewAvailableCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/available`, { headers: this.getAuthHeaders() });
  }

  enrollCourse(studentId: string, courseId: string, sectionId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/enroll`, { id: studentId, courseId, sectionId }, { headers: this.getAuthHeaders() });
  }

  viewEnrolledCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/enrolled`, { headers: this.getAuthHeaders() });
  }

  viewGrades(): Observable<any> {
    return this.http.get(`${this.baseUrl}/grades`, { headers: this.getAuthHeaders() });
  }
}
