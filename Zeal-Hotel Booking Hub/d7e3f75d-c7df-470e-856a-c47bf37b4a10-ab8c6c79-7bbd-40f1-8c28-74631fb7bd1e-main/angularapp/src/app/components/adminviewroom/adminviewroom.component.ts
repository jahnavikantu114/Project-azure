import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
declare var bootstrap: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminviewroom',
  templateUrl: './adminviewroom.component.html',
  styleUrls: ['./adminviewroom.component.css']
})
export class AdminviewroomComponent implements OnInit {

  rooms: Room[] = [];
  filteredTerm: Room[] = [...this.rooms];
  searchTerm: string = '';
  roomToDelete: Room | null = null;
  paginatedRooms: Room[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6; 
  totalPagesArray: number[] = [];
  totalPages: number = 1;

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.viewRoom();
  }

  viewRoom(): void {
    Swal.fire({
      title: 'Loading Rooms...',
      text: 'Please wait while we load your Rooms.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    this.roomService.getAllRooms().subscribe((data) => {
      this.rooms = data;
      this.filteredTerm = [...this.rooms];
      this.updatePagination();
      Swal.close();

      if (this.rooms.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'No Data',
          text: 'No Rooms available.'
        });
        
      }
    },
    (error) => {
      console.error('Error loading Rooms', error);
      Swal.close();
      Swal.fire({
        icon: 'info',
        title: 'No Data',
        text: 'Error while loading rooms.'
      });
    }
  );
   
  }

  searchByHotelName(): void {
    if (this.searchTerm) {
      this.filteredTerm = this.rooms.filter((HName) => {
        return HName.HotelName.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
      console.log('Filtered rooms:', this.filteredTerm); 
    } else {
      this.filteredTerm = [...this.rooms];
      console.log('Reset filtered rooms:', this.filteredTerm);
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTerm.length / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    this.paginateRooms();
    console.log("Here");
  }
 
  paginateRooms(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRooms = this.filteredTerm.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.paginateRooms();
  }

  edit(roomId: number): void {
    console.log('Editing room with ID:', roomId);
    this.router.navigate(['/admineditroom', roomId]); 
  }

  confirmDelete(room: Room): void {
    this.roomToDelete = room;
    var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  }

  deleteRoom(): void {
    if (this.roomToDelete) {
      console.log(1);
      this.roomService.deleteRoom(this.roomToDelete.RoomId).subscribe(
        () => {
          console.log(2);
          this.filteredTerm = this.filteredTerm.filter((item) => item.RoomId != this.roomToDelete.RoomId);
          this.updatePagination();
        },
        (error) => {
          if (error.status === 500) {
            Swal.fire({
              icon: 'error',
              title: 'Can Not Delete',
              text: 'Room booking request has been generated.'
            });
          }
        }
      );
    }
  }
  
}
