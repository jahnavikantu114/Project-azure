import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
declare var bootstrap: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminviewrequestedbooking',
  templateUrl: './adminviewrequestedbooking.component.html',
  styleUrls: ['./adminviewrequestedbooking.component.css']
})
export class AdminviewrequestedbookingComponent implements OnInit {
  bookings:Booking[] = [];
  filteredBooking: Booking[] = []; 
  searchTerm:string=''; 
  room:Room;

  constructor(private service:RoomService) { }

  ngOnInit(): void {
    this.loadbookings();
  }

  loadbookings()
  {
    Swal.fire({
      title: 'Loading Bookings...',
      text: 'Please wait while we load your bookings.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
   
     this.service.getAllBookings().subscribe((res)=>{
      console.log("user data", res);
      this.bookings = res;
      this.filteredBooking = res; 
      Swal.close();

      if (this.bookings.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'No Data',
          text: 'No bookings available.'
        });
      }
    },
    (error) => {
      console.error('Error loading bookings', error);
      Swal.close(); 
      Swal.fire({
        icon: 'info',
        title: 'Error',
        text: 'Error while loading Bookings.'
      });
    }
  );

  }

  searchbyHotelName(): void {
    if (this.searchTerm) {
      this.filteredBooking = this.bookings.filter((item) => {
        console.log(this.searchTerm);
        return item.Room?.HotelName.toLowerCase().includes(this.searchTerm.toLowerCase())  //calling the HotelName from Room property.
      }
      );
    } else {
      this.filteredBooking = [...this.bookings];
    }
  }

  filterByStatus(status: string): void {
    if (status === 'All') {
      this.filteredBooking = [...this.bookings];
    } else {
      this.filteredBooking = this.bookings.filter(booking => booking.Status === status);
    }
  } 

  updateStatus(booking: Booking, status: string): void {
    booking.Status = status;
   
    this.service.getRoomById(booking.RoomId).subscribe((data) => {
      this.room = data;
      console.log(this.room);
    })
    setTimeout(() => {
      console.log('This message is delayed by 2 seconds');
    console.log(this.room);
    console.log(this.room.NoOfRooms);
    if (booking.Status == 'Approved') {
      booking.Room.NoOfRooms = booking.Room.NoOfRooms - 1;
      this.room.NoOfRooms = this.room.NoOfRooms - 1;
      console.log('Approve Room: ', this.room.NoOfRooms);
      
    }

    if (booking.Status == 'Rejected') {
      booking.Room.NoOfRooms = booking.Room.NoOfRooms + 1;
      this.room.NoOfRooms = this.room.NoOfRooms + 1;
      console.log('Reject Room: ', this.room.NoOfRooms);
    }

    this.service.updateRoom(booking.RoomId, this.room).subscribe(() => {
  });

  this.service.updateBooking(booking.BookingId, booking).subscribe(() => {
    this.loadbookings();
  })
  }, 3000);
  }
  

}
