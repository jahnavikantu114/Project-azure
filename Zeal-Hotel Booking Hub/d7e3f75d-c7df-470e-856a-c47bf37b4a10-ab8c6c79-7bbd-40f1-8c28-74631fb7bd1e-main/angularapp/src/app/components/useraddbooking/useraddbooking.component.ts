import { Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';

declare var bootstrap: any;

@Component({
  selector: 'app-useraddbooking',
  templateUrl: './useraddbooking.component.html',
  styleUrls: ['./useraddbooking.component.css']
})
export class UseraddbookingComponent implements OnInit {
  @ViewChild('bookingForm') bookingForm: any;

  booking: Booking = {
    Username:'',
    BookingId: 0,
    UserId: 0,
    RoomId: 0,
    CheckInDate: '',
    CheckOutDate: '',
    Status: 'Pending',
    SpecialRequests: '',
    BookingPurpose: '',
    AdditionalComments: ''
  };
  dateError: boolean = false;
  errorMessage: string = '';
  uid:number;
  uname:string;
  minDate: string;

  
  constructor(private roomService: RoomService, private router: Router, private route: ActivatedRoute) {
    this.uid = parseInt(localStorage.getItem('userId'));
    this.booking.UserId = this.uid;
    this.uname = localStorage.getItem('name');
    this.booking.Username = this.uname;
    console.log("Here in useradd: " + this.booking.UserId);
    this.route.params.subscribe((p) => {
      this.booking.RoomId =+ p['id'];
    })
    console.log("UserId: "+ this.booking.UserId)
    console.log("Room Id: "+ this.booking.RoomId)
    
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

  }

  ngOnInit(): void {}

  validateDates(): void {
    const checkInDate = new Date(this.booking.CheckInDate);
    const checkOutDate = new Date(this.booking.CheckOutDate);

    if (this.booking.CheckInDate && this.booking.CheckOutDate) {
      if (checkInDate >= checkOutDate) {
        this.dateError = true;
        this.errorMessage = 'Check-In Date must be before Check-Out Date.';
      } else {
        this.dateError = false;
        this.errorMessage = '';
      }
    }
  }

  isValidBookingForm(): boolean {
    if (this.booking.CheckInDate.trim() &&
        this.booking.CheckOutDate.trim() &&
        this.booking.Status.trim() &&
        this.booking.SpecialRequests.trim() &&
        this.booking.BookingPurpose.trim() &&
        this.booking.AdditionalComments.trim())
    {
    return true;
    }
    return false;
  }

  addBooking(): void {
    console.log("Addddd1");
    this.validateDates();
    if (this.dateError) {
      return;
    }
    if (this.isValidBookingForm()) {
      console.log("Addddd2");
      console.log(this.booking);
      this.roomService.addBooking(this.booking).subscribe({
        next: () => {
          console.log("Addddd3");
          this.showSuccessModal();
          this.resetBooking();
          this.bookingForm.resetForm();
        },
        error: (err) => {
          console.log("Adddd4")
          this.errorMessage = err.error.Message;
          console.log(this.errorMessage);
        }
      });
    } else {
      this.errorMessage = "Please fill in all required fields.";
    }
  }

  showSuccessModal(): void {
    var myModal = new bootstrap.Modal(document.getElementById('successModal'));
    myModal.show();
  }

  closeModal(): void {
    var myModal = bootstrap.Modal.getInstance(document.getElementById('successModal'));
    myModal.hide();
    this.bookingForm.resetForm();
    this.router.navigate(['/userviewroom']);
  }

  resetBooking(): void {
    this.booking = {
      Username:'',
      BookingId: 0,
      UserId: 0,
      RoomId: 0,
      CheckInDate: '',
      CheckOutDate: '',
      Status: 'Pending',
      SpecialRequests: '',
      BookingPurpose: '',
      AdditionalComments: ''
    };
  }

  backBooking(): void {
    this.router.navigate([`/userviewroom`]);
  }
}
