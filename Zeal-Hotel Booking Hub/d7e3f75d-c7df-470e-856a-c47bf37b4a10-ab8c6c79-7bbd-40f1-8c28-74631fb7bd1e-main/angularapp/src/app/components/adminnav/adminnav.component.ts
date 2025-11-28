import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  userName: string = localStorage.getItem('userName') || 'Guest';
  userRole: string = localStorage.getItem('role') || 'User';
  userId: number = Number(localStorage.getItem('userid'));
 
  constructor(private authService: AuthService, private router: Router) {
    // this.checkAdminRole();
  }
 
  ngOnInit(): void {}
 
  // checkAdminRole(): void {
  //   if (this.userRole !== 'Admin') {
  //     this.router.navigate(['/home']);
  //   }
  // }
 
  onRoomOptionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'post') {
      this.router.navigate(['/adminaddroom']);
    } else if (value === 'view') {
      this.router.navigate(['/adminviewroom']);
    }
    (event.target as HTMLSelectElement).value = 'Room';
  }
 
  logout(): void {
    this.authService.logout();
    this.router.navigate([`/login`]);
  }
}