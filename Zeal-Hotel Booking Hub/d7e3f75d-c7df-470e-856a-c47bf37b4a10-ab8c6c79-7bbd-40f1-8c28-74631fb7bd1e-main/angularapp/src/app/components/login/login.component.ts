
import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Login = new Login();
  loginError: string | null = null;
  loginSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {}

  
  login() {
    if (this.user.Email && this.user.Password) {
      Swal.fire({
        title: 'Logging in...',
        text: 'Please wait while we log you in.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.authService.login(this.user).subscribe(
        response => {
          console.log('Login successful', response);
          this.loginError = null;
          this.loginSuccess = true;
          Swal.close(); 
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        },
        error => {
          console.log('Login error', error);
          this.loginError = 'Invalid email or password';
          this.loginSuccess = false;
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid email or password'
          });
        }
      );
    }
  }


  resetLoginError() {
    this.loginError = null;
    this.loginSuccess = false;
  }

  register(): void{
    this.router.navigate(['/register']);
  }
}
