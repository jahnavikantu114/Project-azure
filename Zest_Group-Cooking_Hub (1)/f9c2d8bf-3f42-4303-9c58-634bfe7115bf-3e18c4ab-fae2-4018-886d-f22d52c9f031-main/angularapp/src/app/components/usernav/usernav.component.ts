import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CookingClassService } from 'src/app/services/cooking-class.service';
import { CookingClass } from 'src/app/models/cooking-class.model';
@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})

export class UsernavComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private cookingClassService: CookingClassService) { }
  user: User = {
    UserId: 0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };
  toggleSelect : string = "default";
  classes: CookingClass[] = [];
  showClasses: boolean = false;
  showLogoutModal: boolean = false;
  errorMessage: string = '';
  Username: string = '';
  ngOnInit(): void {
    this.Username = localStorage.getItem('userName');
    this.toggleSelect="default";
  }
  fetchClasses() {
    this.cookingClassService.getAllCookingClasses().subscribe(
      (data) => {
        this.classes = data;
        this.showClasses = true;
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching classes. Please try again later.';
        console.error('Error fetching classes:', error);
      }
    );
  }
  logout() {
    this.showLogoutModal = true;
  }
  confirmLogout() {
    this.showLogoutModal = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  cancelLogout() {
    this.showLogoutModal = false;
  }
  toggleDropdown()
  {
    if (this.toggleSelect === "add") {
      this.router.navigate(['/useraddfeedback']);
    }else if (this.toggleSelect === "view"){
      this.router.navigate(['/userviewfeedback']);
    }
    else{
      this.toggleSelect="default";
    }
  }
}