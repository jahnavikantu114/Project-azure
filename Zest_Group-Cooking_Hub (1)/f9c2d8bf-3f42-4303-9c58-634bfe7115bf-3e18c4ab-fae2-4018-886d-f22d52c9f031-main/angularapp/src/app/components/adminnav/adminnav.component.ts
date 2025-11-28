import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  isAdmin: boolean = true;
  Username: string = '';
  role: string = this.isAdmin ? 'Admin' : 'User';
  userId: number; 
  showLogoutModal: boolean = false; 
  toggleSelect: string = "default";

  constructor(private authService: AuthService, private router: Router, private feedbackService: FeedbackService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url !== '/adminaddclass' && this.router.url !== '/adminviewclass') {
          this.toggleSelect = 'default';
        }
      }
    });
  }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId')!, 10);
    this.Username = localStorage.getItem('userName');
    this.toggleSelect = "default";
  }

  logout(): void {
    this.showLogoutModal = true;
  }

  confirmLogout(): void {
    this.showLogoutModal = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }

  onSelectChange(value: string): void {
    if (value === 'add') {
      this.router.navigate(['/adminaddclass']);
    } else if (value === 'view') {
      this.router.navigate(['/adminviewclass']);
    }
  }
  
}
