import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookingClass } from 'src/app/models/cooking-class.model';
import { AuthService } from 'src/app/services/auth.service';
import { CookingClassService } from 'src/app/services/cooking-class.service';
@Component({
  selector: 'app-userviewclass',
  templateUrl: './userviewclass.component.html',
  styleUrls: ['./userviewclass.component.css']
})
export class UserviewclassComponent implements OnInit {
  cookingClasses: CookingClass[] = [];
  filteredClasses: CookingClass[] = [];
  appliedClassIds: number[] = [];
  userId: number;
  searchTerm: string = '';
  currentPage: number = 1;
  classesPerPage: number = 10;
  
  cardS : boolean  = false  ;
  tabelS : boolean = true   ;
  
  constructor(
    private cookingClassService: CookingClassService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = Number(this.authService.getUserIdFromToken(localStorage.getItem('token') || ''));
  }
  ngOnInit(): void {
    this.loadCookingClasses();
    this.loadAppliedClasses();
  }

  loadCookingClasses(): void {
  
    this.cookingClassService.getAllCookingClasses().subscribe(
      (classes) => {
        this.cookingClasses = classes;
        this.updateFilteredClasses();
    
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }

    );
  }
  loadAppliedClasses(): void {
    this.cookingClassService.getCookingClassRequestsByUserId(this.userId.toString()).subscribe(
      (requests) => {
        this.appliedClassIds = requests.map(request => request.CookingClassId);
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }
  applyForClass(cookingClassId: number): void {
    if (!this.appliedClassIds.includes(cookingClassId)) {
      localStorage.setItem("cookingClassId", cookingClassId.toString());
      this.router.navigate(['/useraddrequest']);
    }
  }
  isClassApplied(cookingClassId: number): boolean {
    return this.appliedClassIds.includes(cookingClassId);
  }
  searchClasses(): void {
    this.currentPage = 1;
    this.updateFilteredClasses();
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.updateFilteredClasses();
  }
  updateFilteredClasses(): void {
    let filtered = this.cookingClasses;
    if (this.searchTerm) {
      filtered = filtered.filter(c => {
        const ClassNameMatch = c.ClassName.toLowerCase().includes(this.searchTerm.toLowerCase());
        const CuisineTypeMatch = c.CuisineType.toLowerCase().includes(this.searchTerm.toLowerCase());
        const LocationTypeMatch = c.Location.toLowerCase().includes(this.searchTerm.toLowerCase());
        return ClassNameMatch || CuisineTypeMatch || LocationTypeMatch;
      });
    }
    const startIndex = (this.currentPage - 1) * this.classesPerPage;
    const endIndex = startIndex + this.classesPerPage;
    this.filteredClasses = filtered.slice(startIndex, endIndex);
  }
  getTotalPages(): number {
    return Math.ceil(this.cookingClasses.length / this.classesPerPage);
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredClasses();
    }
  }
  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateFilteredClasses();
    }
  }

  changeToTabel(){
 
    this.tabelS = true;
    this.cardS = false;
  }
  changeToCard(){
 
    this.cardS = true;
    this.tabelS = false;
  }
}
