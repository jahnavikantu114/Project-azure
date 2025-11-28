import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
import { Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userviewroom',
  templateUrl: './userviewroom.component.html',
  styleUrls: ['./userviewroom.component.css']
})
export class UserviewroomComponent implements OnInit {
  rooms: Room[] = [];
  filteredTerm: Room[] = [];
  searchTerm: string = '';
  UserId: number | null = null;
  bookings: Booking[] = [];
  paginatedRooms: Room[] = [];
  totalPagesArray: number[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  uid:number;

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.uid = parseInt(localStorage.getItem('userId'));
    this.UserId = this.uid;
    this.viewAll();
    this.loadUserBookings();
  }

  viewAll(): void {
    this.roomService.getAllRooms().subscribe((data) => {
      this.rooms = data;
      this.filteredTerm = [...this.rooms];
      this.paginateRooms();
      this.setupPagination();
    });
  }

  searchByHotelNameRoomTypeLocation(): void {
    if (this.searchTerm) {
      this.filteredTerm = this.rooms.filter((room) => {
        const hotelNameMatch = room.HotelName.toLowerCase().includes(this.searchTerm.toLowerCase());
        const roomTypeMatch = room.RoomType.toLowerCase().includes(this.searchTerm.toLowerCase());
        const locationMatch = room.Location.toLowerCase().includes(this.searchTerm.toLowerCase());
        return hotelNameMatch || roomTypeMatch || locationMatch;
      });
      console.log('Filtered rooms:', this.filteredTerm);
    } else {
      this.filteredTerm = [...this.rooms];
      console.log('Reset filtered rooms:', this.filteredTerm);
    }
    this.setupPagination();
    this.paginateRooms();
  }

  loadUserBookings(): void {
    if (this.UserId) {
      Swal.fire({
        title: 'Loading Bookings...',
        text: 'Please wait while we load your bookings.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      this.roomService.getBookingsByUserId(this.UserId).subscribe((res) => {
        this.bookings = res;
        Swal.close();
      }, (error) => {
        console.error('Error fetching user bookings:', error);
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load bookings. Please try again later.'
        });
      });
    }
  }
  

  isRoomBookedByUser(roomId: number): boolean {
    return this.bookings.some((booking) => booking.RoomId === roomId);
  }

  bookNow(roomId: number): void {
    this.router.navigate([`/useraddbooking/${roomId}`]);
  }

  paginateRooms(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRooms = this.filteredTerm.slice(startIndex, endIndex);
  }

  setupPagination(): void {
    const totalPages = Math.ceil(this.filteredTerm.length / this.itemsPerPage);
    this.totalPagesArray = Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.paginateRooms();
  }
}
