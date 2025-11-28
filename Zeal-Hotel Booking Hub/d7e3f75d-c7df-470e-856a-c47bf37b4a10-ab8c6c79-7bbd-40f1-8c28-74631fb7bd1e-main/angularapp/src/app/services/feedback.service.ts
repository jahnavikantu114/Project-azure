import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model'; // Make sure this model is defined
import { environment } from 'src/environments/environment';

@Injectable({
providedIn: 'root'
})
export class FeedbackService {
  
    public apiUrl = environment.baseUrl;

constructor(private http: HttpClient) {}

private getAuthHeaders(): HttpHeaders {
const token = localStorage.getItem('token');
return new HttpHeaders({
Authorization: `Bearer ${token}`,
'Content-Type': 'application/json'
});

}
sendFeedback(feedback: Feedback): Observable<Feedback> {
return this.http.post<Feedback>(`${this.apiUrl}/api/Feedback`, feedback, {
headers: this.getAuthHeaders()
});
}

getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
return this.http.get<Feedback[]>(`${this.apiUrl}/api/Feedback/user/${userId}`, {
headers: this.getAuthHeaders()
});
}

deleteFeedback(feedbackId: number): Observable<void> {
return this.http.delete<void>(`${this.apiUrl}/api/Feedback/${feedbackId}`, {
headers: this.getAuthHeaders()
});
}

getFeedbacks(): Observable<Feedback[]> {
return this.http.get<Feedback[]>(`${this.apiUrl}/api/Feedback`, {
headers: this.getAuthHeaders()
});
}
}