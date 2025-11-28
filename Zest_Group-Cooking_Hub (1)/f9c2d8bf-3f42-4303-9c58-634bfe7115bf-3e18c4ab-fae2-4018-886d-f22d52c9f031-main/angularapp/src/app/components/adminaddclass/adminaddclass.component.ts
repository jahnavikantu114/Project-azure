import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookingClass } from 'src/app/models/cooking-class.model';
import { CookingClassService } from 'src/app/services/cooking-class.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-adminaddclass',
  templateUrl: './adminaddclass.component.html',
  styleUrls: ['./adminaddclass.component.css']
})
export class AdminaddclassComponent implements OnInit {
  cuisineTypes: string[] = ['Italian', 'Chinese', 'Indian', 'Mexican', 'French', 'Japanese', 'Thai', 'Spanish', 'Greek', 'Mediterranean'];
  newCookingClass: CookingClass = {
    ClassName: '',
    CuisineType: '',
    ChefName: '',
    Location: '',
    DurationInHours: 0,
    Fee: 0,
    IngredientsProvided: '',
    SkillLevel: '',
    SpecialRequirements: '',
    ImageUrl: ''
  };
  selectedFile : File = null;
  formSubmitted: boolean = false;
  message: string = '';
  isLoggedIn: boolean = false;
  showModal: boolean = false;
  showModalOnce: boolean = false;
  constructor(
    private cService: CookingClassService,
    private route: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.checkLoginStatus();
  }
  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      this.showErrorMessage('Please log in to add a cooking class');
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.newCookingClass.ImageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  addCookingClass(form: NgForm) {
    if (!this.isLoggedIn) {
      this.showErrorMessage('Please log in first');
      return;
    }
    if (form.invalid || !this.customValidation()) {
      return;
    }
    this.cService.addCookingClass(this.newCookingClass).subscribe({
      next: () => {
        this.route.navigate(['/adminviewclass']);
        this.showSuccessMessage('Cooking class added successfully');
        this.showModal = true;
      },
      error: (error) => {
        console.error('Error adding cooking class:', error);
        if (error.error && error.error.Message && error.error.Message.includes('Cooking class with the same name already exists')) {
          this.showErrorMessage('A cooking class with this name already exists. Please choose a different name.');
        } else {
          this.showErrorMessage('Error adding cooking class');
        }
        this.showModal = true;
      }
    });
  }
  customValidation(): boolean {
    const { ClassName, CuisineType, ChefName, Location, DurationInHours, Fee, IngredientsProvided, SkillLevel, SpecialRequirements } = this.newCookingClass;
    if (ClassName.length > 50) {
      this.showErrorMessage('Class Name must be less than 50 characters');
      return false;
    }
    if (CuisineType.length > 30) {
      this.showErrorMessage('Cuisine Type must be less than 30 characters');
      return false;
    }
    if (ChefName.length > 50) {
      this.showErrorMessage('Chef Name must be less than 50 characters');
      return false;
    }
    if (Location.length > 100) {
      this.showErrorMessage('Location must be less than 100 characters');
      return false;
    }
    if (DurationInHours <= 0) {
      this.showErrorMessage('Duration must be greater than 0 hours');
      return false;
    }
    if (Fee < 0) {
      this.showErrorMessage('Fee must be a positive number');
      return false;
    }
    if (IngredientsProvided.length > 200) {
      this.showErrorMessage('Ingredients Provided must be less than 200 characters');
      return false;
    }
    if (SkillLevel.length > 30) {
      this.showErrorMessage('Skill Level must be less than 30 characters');
      return false;
    }
    if (SpecialRequirements.length > 200) {
      this.showErrorMessage('Special Requirements must be less than 200 characters');
      return false;
    }
    return true;
  }
  validateField(form: NgForm, fieldName: string) {
    const control = form.controls[fieldName];
    if (control && control.errors) {
      control.markAsDirty();
    }
  }
  closeModal() {
    this.showModal = false;  
    this.showModalOnce = false;
  }
  showErrorMessage(message: string): void {
    this.message = message;
    Swal.fire({
      title: 'Error!',
      text: message,
      confirmButtonText: 'OK'
    });
  }
  showSuccessMessage(message: string): void {
    this.message = message;
    Swal.fire({
      title: 'Success!',
      text: message,
      confirmButtonText: 'OK'
    });
  }
}
 