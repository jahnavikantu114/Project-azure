import { Injectable, Optional } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public apiUrl = environment.baseUrl;

  private currentUserRole = new BehaviorSubject<string | null>(null);
  private currentUserId = new BehaviorSubject<number | null>(null);
  private authStateChanged = new Subject<void>();
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUserRole.next(this.getUserRoleFromToken(token));
    }
  }
  login(credentials: Login): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/api/login`, credentials).subscribe( 
        response => {
          localStorage.setItem('token', response.token);
          const role = this.getUserRoleFromToken(response.token);
          const userId = this.getUserIdFromToken(response.token);
          const userName = this.getUserNameFromToken(response.token);
          localStorage.setItem('role', role);
          localStorage.setItem('userId', userId);
          localStorage.setItem('name', userName);
          this.currentUserRole.next(role);
          observer.next(response);
          this.authStateChanged.next(); 
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');

  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    this.currentUserRole.next(null);
  }
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
  setUserRole(role: string): void {
    localStorage.setItem('role', role);
  }
  getUserRoleFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return role || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  getUserIdFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      return userId || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  getUserNameFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userName = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      return userName || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  getCurrentUserRole(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'Admin';
  }
  isUser(): boolean {
    const role = this.getUserRole();
    return role === 'User';
  }
  getAuthStateChange(): Observable<void> {
    return this.authStateChanged.asObservable();
  }
  getCurrentUserId(): Observable<number | null> {
    // this.currentUserId = parseInt(localStorage.getItem("UserId"));
    // this.currentUserId.next(parseInt(this.getUserIdFromToken(token)));
    console.log("Auth Seer: "+ this.currentUserId);
    return this.currentUserId.asObservable();
  }
 
 
}
 