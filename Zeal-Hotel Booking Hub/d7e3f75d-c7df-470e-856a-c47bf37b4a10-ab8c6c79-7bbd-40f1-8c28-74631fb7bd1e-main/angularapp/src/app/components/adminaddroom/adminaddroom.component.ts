import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
declare var bootstrap: any; // Declare bootstrap for modal

@Component({
  selector: 'app-adminaddroom',
  templateUrl: './adminaddroom.component.html',
  styleUrls: ['./adminaddroom.component.css']
})
export class AdminaddroomComponent implements OnInit {
  @ViewChild('roomForm') roomForm: any;
  @ViewChild('fileInput') fileInput: any;

  room: Room = {
    HotelName: '',
    RoomType: '',
    NoOfRooms: 1,
    PricePerNight: 0,
    Location: '',
    BedType: '',
    IsAvailable: false,
    Description: '',
    Facilities: '',
    ImageUrl: ''
  }
  errorMessage: string = '';
  selectedFile: File = null;

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void { }

  isValidForm(): boolean {
    if (this.room.HotelName.trim() &&
        this.room.RoomType.trim() &&
        this.room.NoOfRooms > 0 &&
        this.room.PricePerNight > 0 &&
        this.room.Location.trim() &&
        this.room.BedType.trim() &&
        this.room.Description.trim() &&
        this.room.Facilities.trim() &&
        this.room.ImageUrl.trim()) {
      return true;
    }
    return false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.room.ImageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  addRoom() {
    if (this.isValidForm()) {
      this.roomService.getAllRooms().subscribe(rooms => {
        const totalRoomsForHotel = rooms
          .filter(r => r.HotelName === this.room.HotelName)
          .reduce((sum, r) => sum + r.NoOfRooms, 0);

        if (totalRoomsForHotel + this.room.NoOfRooms > 10) {
          this.errorMessage = 'Total number of rooms for this hotel cannot exceed 10.';
        } else {
          this.roomService.addRoom(this.room).subscribe({
            
            next: () => {
              this.showSuccessModal();
              this.resetRoom();
              this.roomForm.resetForm();
              // this.router.navigate([`/adminviewroom`])
            },
            error: (err) => {
              console.log("Hereeeeeee1")
              this.errorMessage = err.error.Message;
            }
          });
        }
      });
    } else {
      this.errorMessage = "Please fill in all required fields."
    }
  }

  showSuccessModal() {
    var myModal = new bootstrap.Modal(document.getElementById('successModal'));
    myModal.show();
  }

  closeModal() {
    var myModal = bootstrap.Modal.getInstance(document.getElementById('successModal'));
    myModal.hide();
    this.roomForm.resetForm();
    this.router.navigate(['/adminviewroom']);
  }

  resetRoom() {
    this.room = {
      HotelName: '',
      RoomType: '',
      NoOfRooms: 0,
      PricePerNight: 0,
      Location: '',
      BedType: '',
      IsAvailable: false,
      Description: '',
      Facilities: '',
      ImageUrl: ''
    };
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
    this.errorMessage = '';
  }
}
