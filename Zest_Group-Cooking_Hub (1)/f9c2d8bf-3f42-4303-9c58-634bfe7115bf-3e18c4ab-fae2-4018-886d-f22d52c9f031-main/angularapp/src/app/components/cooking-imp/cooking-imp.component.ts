import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cooking-imp',
  templateUrl: './cooking-imp.component.html',
  styleUrls: ['./cooking-imp.component.css']
})
export class CookingImpComponent implements OnInit {
  isAdmin: boolean = false;
  Username: string = '';
  role: string = this.isAdmin ? 'Admin' : 'User';
  userId: number;
  showDropdown = false;
  title = 'The Importance of Cooking';
  constructor(private authService: AuthService, private feedbackService: FeedbackService, private router: Router) {}
  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId')!, 10);
    this.Username = localStorage.getItem('userName');
  }
  confirmLogout(): void {
    const modal = document.getElementById('logoutModal');
    modal!.style.display = 'block';
  }
  closeModal(): void {
    const modal = document.getElementById('logoutModal');
    modal!.style.display = 'none';
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.closeModal();
  }
  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.showDropdown = !this.showDropdown;
  }
}