import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { Booking } from '../models/booking.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  public apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/api/Room`, {
      headers: this.getAuthHeaders(),
    });
  }

  
  getRoomById(roomId: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/api/Room/${roomId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  
  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/api/Room`, room, {
      headers: this.getAuthHeaders(),
    });
  }


  updateRoom(roomId: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/api/Room/${roomId}`, room, {
      headers: this.getAuthHeaders(),
    });
  }


  deleteRoom(roomId: number): Observable<void> {
    
    return this.http.delete<void>(`${this.apiUrl}/api/Room/${roomId}`, {
      headers: this.getAuthHeaders(),
    });
  }


  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/api/Booking`, {
      headers: this.getAuthHeaders(),
    });
  }


  getBookingsByUserId(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/api/Booking/user/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/api/Booking`,booking, {
      headers: this.getAuthHeaders(),
    });
  }


  updateBooking(bookingId: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/api/Booking/${bookingId}`, booking, {
      headers: this.getAuthHeaders(),
    });
  }


  deleteBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/Booking/${bookingId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

