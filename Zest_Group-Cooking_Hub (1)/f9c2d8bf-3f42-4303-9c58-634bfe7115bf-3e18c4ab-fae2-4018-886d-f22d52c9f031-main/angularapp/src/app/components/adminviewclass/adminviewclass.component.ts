import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookingClass } from 'src/app/models/cooking-class.model';
import { CookingClassService } from 'src/app/services/cooking-class.service';

@Component({
  selector: 'app-adminviewclass',
  templateUrl: './adminviewclass.component.html',
  styleUrls: ['./adminviewclass.component.css']
})
export class AdminviewclassComponent implements OnInit {
  cookingClasses: CookingClass[] = [];
  filteredClasses: CookingClass[] = [];
  paginatedClasses: CookingClass[] = [];
  searchTerm: string = '';
  showDeleteModal: boolean = false;
  showErrorModal: boolean = false;
  classToDelete: number | null = null;
  errorMessage: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private cookingClassService: CookingClassService, private router: Router) { }

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.cookingClassService.getAllCookingClasses().subscribe({
      next: (classes) => {
        this.cookingClasses = classes || [];
        this.filteredClasses = [...this.cookingClasses];
        this.updatePagination();
      },
      error: () => {
        this.errorMessage = "Failed to load cooking classes. Please try again later.";
        this.showErrorModal = true;
      }
    });
  }

  searchClasses(): void {
    if (this.searchTerm) {
      this.filteredClasses = this.cookingClasses.filter(c =>
        c.ClassName?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredClasses = [...this.cookingClasses];
    }
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedClasses = this.filteredClasses.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.filteredClasses.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredClasses.length / this.itemsPerPage);
  }

  editClass(classId: number): void {
    this.router.navigate([`admineditclass/${classId}`]);
  }

  confirmDelete(classId: number): void {
    this.classToDelete = classId;
    this.showDeleteModal = true;
  }

  deleteClass(): void {
    if (this.classToDelete !== null) {
      this.cookingClassService.deleteCookingClass(this.classToDelete).subscribe({
        next: () => {
          this.loadClasses();
          this.closeDeleteModal();
        },
        error: (error) => {
          this.errorMessage = error?.error?.Message || "An error occurred while deleting the cooking class.";
          this.showErrorModal = true;
        }
      });
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.classToDelete = null;
  }

  closeErrorModal(): void {
    this.showErrorModal = false;
  }
}