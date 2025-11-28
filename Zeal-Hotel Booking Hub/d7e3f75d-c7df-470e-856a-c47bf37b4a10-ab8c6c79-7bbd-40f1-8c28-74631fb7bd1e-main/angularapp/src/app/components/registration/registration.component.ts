import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = {
    UserId: 0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };
  confirmPassword: string = '';
  secretKey: string = 'zeal@dotnet';
  enteredkey: string = '';
 
  constructor(private authService: AuthService, private router: Router) { }
 
  ngOnInit(): void {
  }
 
  userAlreadyExists: boolean = false;
  errorMessage: string = '';
  register(): void {
    console.log("here1")
    if (this.user.Password !== this.confirmPassword) {
      console.log("here2")
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match'
      });
    }
      console.log("here3")
      if (this.user.Email.trim() && this.user.Password.trim() && this.user.Username.trim() && this.user.MobileNumber.trim() && this.user.UserRole.trim()) {
        console.log("here4")
        if (this.user.UserRole === 'Admin' && this.enteredkey !== this.secretKey) {
          this.errorMessage = 'Invalid secret key for Admin.';
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Invalid Secret Key'
          });
          return;
        }
 
        this.authService.register(this.user).subscribe(
          (res) => {
            console.log("Registration successful", res);
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'You have been registered successfully!'
            }).then(() => {
              this.router.navigate(['/login']);
            });
          },
          (error) => {
            console.log("Registration failed", error);
            if (error.status === 400) {
              this.userAlreadyExists = true;
              Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'User already exists'
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'An error occurred. Please try again later.'
              });
            }
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'All fields are required'
        });
      }
      console.log("here5")
 
 
  }
}
 