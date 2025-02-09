// src/app/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private baseUrl = 'http://localhost:5000'; // Change this if needed

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Ensure token is stored after login
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllInstructors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/instructors`, { headers: this.getHeaders() });
  }

  getCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/course`, { headers: this.getHeaders() });
  }

  getCourseById(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/${courseId}`, { headers: this.getHeaders() });
  }

  createCourse(courseData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/course/create`, courseData, { headers: this.getHeaders() });
  }

  updateCourse(courseId: string, courseData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/course/${courseId}`, courseData, { headers: this.getHeaders() });
  }

  createSection(courseId: string, sectionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/course/section/create`, sectionData);
  }

  getSectionsByCourse(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/sections/${courseId}`, {headers: this.getHeaders()});
  }
}
