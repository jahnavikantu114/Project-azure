import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
declare var bootstrap: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  userId: number = 0;
  uid: number = 0;
  feedbacks: Feedback[] = [];
  paginatedFeedbacks: Feedback[] = [];
  feedbackToDelete: Feedback | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPagesArray: number[] = [];
  
  constructor(private authService: AuthService, private feedbackService: FeedbackService) {
    this.uid = parseInt(localStorage.getItem("userId"));
    this.userId = this.uid;
    console.log("Here: ", this.userId);
  }

  ngOnInit(): void {
    this.loadUserFeedback();
  }

  loadUserFeedback(): void {
    Swal.fire({
      title: 'Loading feedback...',
      text: 'Please wait while we load your feedback.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.feedbackService.getAllFeedbacksByUserId(this.userId).subscribe(
      (res) => {
        this.feedbacks = res;
        Swal.close();
        this.paginateFeedbacks();
        this.setupPagination();

        if (this.feedbacks.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'No Data',
            text: 'No feedback available.'
          });
        }
      },
      (error) => {
        console.error('Error loading feedback', error);
        Swal.close();
        Swal.fire({
          icon: 'info',
          title: 'No Data',
          text: 'No feedback available.'
        });
      }
    );
  }

  paginateFeedbacks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedFeedbacks = this.feedbacks.slice(startIndex, endIndex);
  }

  setupPagination(): void {
    const totalPages = Math.ceil(this.feedbacks.length / this.itemsPerPage);
    this.totalPagesArray = Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.paginateFeedbacks();
  }

  confirmDelete(feedback: Feedback): void {
    this.feedbackToDelete = feedback;
    var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  }

  deleteFeedback(): void {
    if (this.feedbackToDelete) {
      this.feedbackService.deleteFeedback(this.feedbackToDelete.FeedbackId).subscribe(() => {
        this.feedbacks = this.feedbacks.filter((item) => item.FeedbackId != this.feedbackToDelete.FeedbackId);
        this.paginateFeedbacks();
        this.setupPagination();
      });
    }
  }


}

