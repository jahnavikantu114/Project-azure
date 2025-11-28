import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
declare var bootstrap: any; 


@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedback:Feedback = {
    FeedbackId: 0,
    UserId: 0,
    FeedbackText: '',
    Date: new Date()
  }

  userId:number;
  constructor(private feedbackService:FeedbackService, private router: Router) {
    this.userId = parseInt(localStorage.getItem('userId'));
    this.feedback.UserId = this.userId;
  }

  ngOnInit(): void { }

  addFeedback(): void {
    console.log("UserId:", this.feedback);
    if (this.feedback.FeedbackText) {
      this.feedbackService.sendFeedback(this.feedback).subscribe(() => {
        this.feedback.FeedbackText = '';
        console.log("Feedback added successfully");
        this.openModal();
      });
    }
  }

  openModal() {
    var myModal = new bootstrap.Modal(document.getElementById('successModal'));
    myModal.show();
    const feedbackForm = document.querySelector('form');
    if (feedbackForm) {
    feedbackForm.reset();
    } 
    this.router.navigate([`/userviewfeedback`]);
  }
} 
