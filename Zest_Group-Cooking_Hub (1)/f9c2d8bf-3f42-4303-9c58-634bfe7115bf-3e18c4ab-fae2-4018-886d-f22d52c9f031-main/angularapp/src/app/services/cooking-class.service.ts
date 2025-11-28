import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookingClass } from '../models/cooking-class.model';
import { CookingClassRequest } from '../models/cooking-class-request.model';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CookingClassService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
  getAllCookingClasses(): Observable<CookingClass[]> {
    return this.http.get<CookingClass[]>(`${this.apiUrl}/cookingClass`, { headers: this.getHeaders() });
  }
  getCookingClassById(classId: number): Observable<CookingClass> {
    return this.http.get<CookingClass>(`${this.apiUrl}/cookingClass/${classId}`, { headers: this.getHeaders() });
  }
  addCookingClass(cooking: CookingClass): Observable<CookingClass> {
    return this.http.post<CookingClass>(`${this.apiUrl}/cookingClass`, cooking, { headers: this.getHeaders() });
  }
  updateCookingClass(classId: number, cooking: CookingClass): Observable<CookingClass> {
    return this.http.put<CookingClass>(`${this.apiUrl}/cookingClass/${classId}`, cooking, { headers: this.getHeaders() });
  }
  deleteCookingClass(classId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cookingClass/${classId}`, { headers: this.getHeaders() });
  }
  getAllCookingClassRequests(): Observable<CookingClassRequest[]> {
    return this.http.get<CookingClassRequest[]>(`${this.apiUrl}/cooking-class-request`, { headers: this.getHeaders() });
  }
  getCookingClassRequestsByUserId(userId: string): Observable<CookingClassRequest[]> {
    return this.http.get<CookingClassRequest[]>(`${this.apiUrl}/cooking-class-request/user/${userId}`, { headers: this.getHeaders() });
  }
  addCookingClassRequest(request: CookingClassRequest): Observable<CookingClassRequest> {
    return this.http.post<CookingClassRequest>(`${this.apiUrl}/cooking-class-request`, request, { headers: this.getHeaders() });
  }
  updateCookingClassRequest(requestId: number, request: CookingClassRequest): Observable<CookingClassRequest> {
    return this.http.put<CookingClassRequest>(`${this.apiUrl}/cooking-class-request/${requestId}`, request, { headers: this.getHeaders() });
  }
  deleteCookingClassRequest(requestId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cooking-class-request/${requestId}`, { headers: this.getHeaders() });
  }
}