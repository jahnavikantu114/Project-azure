using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class RoomService
    {
        private readonly ApplicationDbContext _context;

        public RoomService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Room>> GetAllRooms()
        {
            return await _context.Rooms.ToListAsync();
        }

        public async Task<Room> GetRoomById(int roomId)
        {
            return await _context.Rooms.FirstOrDefaultAsync(r => r.RoomId == roomId);
        }

        public async Task<bool> AddRoom(Room room)
        {
            int roomsCount =0;
            var r = await _context.Rooms.FirstOrDefaultAsync(r => r.HotelName == room.HotelName);
            if (r == null)
            {
                if (room.NoOfRooms > 10)
            {
                throw new RoomException("Total number of rooms for this hotel cannot exceed 10.");
            }
            else
            {
                _context.Rooms.Add(room);
                await _context.SaveChangesAsync();
                return true;
            }
            }
            else
            {
                roomsCount = r.NoOfRooms + room.NoOfRooms;
                if (roomsCount > 10)
                {
                    throw new RoomException("Total number of rooms for this hotel cannot exceed 10.");
                }
                else
                {
                    _context.Rooms.Add(room);
                    await _context.SaveChangesAsync();
                    return true;
                }
            }
        }

        public async Task<bool> UpdateRoom(int roomId, Room room)
        {
            var existingRoom = await _context.Rooms.FindAsync(roomId);

            if (existingRoom == null)
            {
                return false;
            }

            int roomCount = await _context.Rooms
                .CountAsync(r => r.HotelName == room.HotelName && r.RoomId != roomId);

            if (roomCount >= 10)
            {
                throw new RoomException("Total number of rooms for this hotel cannot exceed 10.");
            }
            else
            {
                existingRoom.HotelName = room.HotelName;
                existingRoom.RoomType = room.RoomType;
                existingRoom.NoOfRooms = room.NoOfRooms;
                existingRoom.PricePerNight = room.PricePerNight;
                existingRoom.Location = room.Location;
                existingRoom.BedType = room.BedType;
                existingRoom.IsAvailable = room.IsAvailable;
                existingRoom.Description = room.Description;
                existingRoom.Facilities = room.Facilities;
                existingRoom.ImageUrl = room.ImageUrl;

                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> DeleteRoom(int roomId)
        {
            var room = await _context.Rooms.FindAsync(roomId);

            if (room == null)
            {
                return false;
            }

            bool isRoomBooked = await _context.Bookings
                .AnyAsync(b => b.RoomId == roomId);

            if (isRoomBooked)
            {
                throw new RoomException("Room cannot be deleted as it is referenced in a booking");
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
