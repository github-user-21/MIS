import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Ensure content type is set
        });
      }
    }
    console.warn("localStorage is not available or token is missing!");
    return new HttpHeaders();
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { headers: this.getAuthHeaders() });
  }


  getUserProfile(userId?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId || ''}`, { headers: this.getAuthHeaders() });
  }

  updateUserProfile(updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, updatedData, { headers: this.getAuthHeaders() });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers: this.getAuthHeaders() });
  }
}
