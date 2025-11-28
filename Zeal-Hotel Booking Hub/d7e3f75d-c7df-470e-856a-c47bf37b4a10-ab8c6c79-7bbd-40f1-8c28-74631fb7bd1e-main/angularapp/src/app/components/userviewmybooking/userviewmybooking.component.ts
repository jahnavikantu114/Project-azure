import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Booking } from 'src/app/models/booking.model';
import { RoomService } from 'src/app/services/room.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-userviewmybooking',
  templateUrl: './userviewmybooking.component.html',
  styleUrls: ['./userviewmybooking.component.css']
})
export class UserviewmybookingComponent implements OnInit {
  userId: number | null = null;  
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchQuery: string = '';
  bookingToDelete: Booking | null = null;
  uid: number;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.uid = parseInt(localStorage.getItem('userId'));
    this.userId = this.uid;
    this.loadUserBookings();
  }
  
  loadUserBookings(): void {
    Swal.fire({
      title: 'Loading...',
      text: 'Please wait while we fetch your bookings.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    this.roomService.getBookingsByUserId(this.userId).subscribe((res) => {
      this.bookings = res;
      this.filteredBookings = [...this.bookings];
      Swal.close();
    }, (error) => {
      Swal.fire('Error', 'Failed to load bookings. Please try again later.', 'error');
    });
  }
  

  searchBookings(): void {
    if (this.searchQuery) {
      this.filteredBookings = this.bookings.filter(booking =>
        booking.Room && booking.Room.HotelName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredBookings = [...this.bookings];
    }
  }

  confirmDelete(booking: Booking): void {
    this.bookingToDelete = booking;
    var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  }

  deleteBooking(): void {
    if (this.bookingToDelete) {
      Swal.fire({
        title: 'Deleting...',
        text: 'Please wait while we delete your booking.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      this.roomService.deleteBooking(this.bookingToDelete.BookingId).subscribe(() => {
        this.filteredBookings = this.filteredBookings.filter((item) => item.BookingId != this.bookingToDelete.BookingId);
        Swal.fire('Deleted!', 'Your booking has been deleted.', 'success');
      }, (error) => {
        Swal.fire('Error', 'Failed to delete booking. Please try again later.', 'error');
      });
    }
  }
  


}
