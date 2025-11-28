import { Component, OnInit } from '@angular/core';
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model';
import { AuthService } from 'src/app/services/auth.service';
import { CookingClassService } from 'src/app/services/cooking-class.service';

@Component({
  selector: 'app-userviewappliedrequest',
  templateUrl: './userviewappliedrequest.component.html',
  styleUrls: ['./userviewappliedrequest.component.css']
})
export class UserviewappliedrequestComponent implements OnInit {
  appliedRequests: CookingClassRequest[] = [];
  filteredRequests: CookingClassRequest[] = [];
  searchQuery: string = '';

  currentPage: number = 1;
  requestsPerPage: number = 5;

  showDeleteModal: boolean = false;
  requestToDelete: number | null = null;

  constructor(
    private cookingClassService: CookingClassService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken(localStorage.getItem('token')!);
    this.loadAppliedRequests(userId);
  }

  
  loadAppliedRequests(userId: string): void {
  
    this.cookingClassService.getCookingClassRequestsByUserId(userId).subscribe(
      (requests) => {
        this.appliedRequests = requests;
        this.updateFilteredRequests();
    
      },
      (error) => console.error('Error fetching requests:', error)
    );
  }

  searchRequests(): void {
    this.currentPage = 1;
    this.updateFilteredRequests();
  }

  updateFilteredRequests(): void {
    let filtered = this.appliedRequests;

    if (this.searchQuery) {
      filtered = filtered.filter(request =>
        request.CookingClass.ClassName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    const startIndex = (this.currentPage - 1) * this.requestsPerPage;
    const endIndex = startIndex + this.requestsPerPage;
    this.filteredRequests = filtered.slice(startIndex, endIndex);
  }

  openDeleteModal(requestId: number): void {
    this.showDeleteModal = true;
    this.requestToDelete = requestId;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.requestToDelete = null;
  }

  deleteRequest(): void {
    if (this.requestToDelete !== null) {
      this.cookingClassService.deleteCookingClassRequest(this.requestToDelete).subscribe(
        () => {
          this.appliedRequests = this.appliedRequests.filter(
            (request) => request.CookingClassRequestId !== this.requestToDelete
          );
          this.updateFilteredRequests();
          this.closeDeleteModal();
        },
        (error) => console.error('Error deleting request:', error)
      );
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.appliedRequests.length / this.requestsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredRequests();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateFilteredRequests();
    }
  }
}