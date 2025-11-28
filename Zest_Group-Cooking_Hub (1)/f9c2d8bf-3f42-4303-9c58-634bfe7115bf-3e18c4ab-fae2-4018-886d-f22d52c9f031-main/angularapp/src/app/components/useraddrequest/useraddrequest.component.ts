import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookingClassService } from 'src/app/services/cooking-class.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model';
@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css']
})
export class UseraddrequestComponent implements OnInit {
  request: CookingClassRequest = {
    UserId: 0,
    CookingClassId: 0,
    RequestDate: new Date().toISOString().split('T')[0],
    Status: 'Pending',
    DietaryPreferences: '',
    CookingGoals: '',
    Comments: ''
  };
  showPopup: boolean = false;
  constructor(
    private cookingClassService: CookingClassService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken(this.authService.getToken()!);
    if (userId) {
      this.request.UserId = parseInt(userId, 10);
    }
  }
  onSubmit(requestForm: any): void {
    if (!this.request.DietaryPreferences || !this.request.CookingGoals) {
      requestForm.form.markAllAsTouched();
      return;
    }
    console.log('Submitting request:', this.request);
    this.request.CookingClassId = Number(localStorage.getItem("cookingClassId"));
    this.cookingClassService.addCookingClassRequest(this.request).subscribe(
      () => {
        console.log('Request submitted successfully');
        localStorage.removeItem('cookingClassId');
        this.showPopup = true;
        setTimeout(() => {
          this.router.navigate(['/userviewappliedrequest']);
        }, 2000);
      },
      (error) => {
        console.error('Error submitting request:', error);
      }
    );
  }
  closePopup(): void {
    this.showPopup = false;
    this.router.navigate(['/userviewappliedrequest']);
  }
  goBack(): void {
    this.router.navigate(['/userviewclass']);
  }
}