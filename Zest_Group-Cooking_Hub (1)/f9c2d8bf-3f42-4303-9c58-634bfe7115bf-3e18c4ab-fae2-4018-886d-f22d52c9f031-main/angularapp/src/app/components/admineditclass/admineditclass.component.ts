import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookingClass } from 'src/app/models/cooking-class.model';
import { CookingClassService } from 'src/app/services/cooking-class.service';
@Component({
  selector: 'app-admineditclass',
  templateUrl: './admineditclass.component.html',
  styleUrls: ['./admineditclass.component.css']
})
export class AdmineditclassComponent implements OnInit {
  editCookingClass: CookingClass = {
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
  formSubmitted: boolean = false;
  editId: number;
  errorMessage: string = '';
  showModal: boolean = false;
  constructor(private cService: CookingClassService, private route: Router, private Aroute: ActivatedRoute) { }
  ngOnInit(): void {
    this.Aroute.params.subscribe(p => {
      this.editId = p.id;
      this.cService.getCookingClassById(this.editId).subscribe(res => { this.editCookingClass = res; });
    });
  }
  updateCookingClass(): void {
    if (this.editCookingClass.ClassName && this.editCookingClass.CuisineType && this.editCookingClass.ChefName && this.editCookingClass.Location && this.editCookingClass.DurationInHours && this.editCookingClass.Fee && this.editCookingClass.IngredientsProvided && this.editCookingClass.SkillLevel && this.editCookingClass.SpecialRequirements) {
      this.cService.updateCookingClass(this.editId, this.editCookingClass).subscribe(() => {
        this.route.navigate(['/adminviewclass']);
      }, (error) => {
        if (error.status === 500) {
          this.errorMessage = "Cooking class with the same name already exists";
          this.showModal = true;
        }
      });
    }
  }
  cancelUpdate() {
    this.route.navigate(['/adminviewclass']);
  }
  closeModal() {
    this.showModal = false;
  }
}