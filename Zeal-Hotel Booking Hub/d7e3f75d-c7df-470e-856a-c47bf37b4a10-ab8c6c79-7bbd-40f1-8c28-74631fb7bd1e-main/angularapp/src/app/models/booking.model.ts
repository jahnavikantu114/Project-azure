import { Room } from "./room.model";
import { User } from "./user.model";

export interface Booking 
{
    BookingId?: number;
    Room?: Room;
    User?: User;
    Username: string;
    UserId: number;
    RoomId: number;
    CheckInDate: string;
    CheckOutDate: string;
    Status: string;
    SpecialRequests: string;
    BookingPurpose: string;
    AdditionalComments?: string;
}
