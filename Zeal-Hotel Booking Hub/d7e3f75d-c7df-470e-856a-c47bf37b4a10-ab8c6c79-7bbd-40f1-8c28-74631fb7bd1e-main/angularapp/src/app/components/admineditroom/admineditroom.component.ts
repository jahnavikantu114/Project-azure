import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-admineditroom',
  templateUrl: './admineditroom.component.html',
  styleUrls: ['./admineditroom.component.css']
})
export class AdmineditroomComponent implements OnInit {
  room: Room = {
    RoomId: 0,
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

  errorMessage:string = '';
  roomId:number=0;
  showMessage: boolean = false;
  selectedFile: File = null;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId =+ params['id'];
      console.log(this.roomId);
      if (this.roomId) {
        this.roomService.getRoomById(this.roomId).subscribe(r => {
          this.room = r;
        });
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.room.ImageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  EditRoom(): void {
    if (!this.room.HotelName.trim() || !this.room.RoomType.trim() || !this.room.NoOfRooms || !this.room.PricePerNight || !this.room.Location.trim() || !this.room.BedType.trim() || !this.room.Description.trim() || !this.room.Facilities.trim() || !this.room.ImageUrl.trim()) {
      return;
    }
  
    this.roomService.updateRoom(this.roomId, this.room).subscribe({
      next: () => {
        this.showMessage = true;
      },
      error: (err) => {
        this.errorMessage = err.error.Message;
      }
    });
  }
  


  ok(): void {
    this.router.navigate(['/adminviewroom']);
    this.showMessage = false;
  }



  back(): void {
    this.router.navigate(['/adminviewroom']);
  }
}
