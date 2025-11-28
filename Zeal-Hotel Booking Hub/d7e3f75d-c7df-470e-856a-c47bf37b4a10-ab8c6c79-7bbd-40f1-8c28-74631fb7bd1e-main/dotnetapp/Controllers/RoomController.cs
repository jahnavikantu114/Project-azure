using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks; 
using dotnetapp.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace dotnetapp.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly RoomService _roomService;

        public RoomController(RoomService roomService)
        {
            _roomService = roomService;
        }

        [Authorize(Roles = "Admin,User")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetAllRooms()
        {
            try
            {
                var rooms = await _roomService.GetAllRooms();
                return Ok(rooms);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize(Roles = "Admin,User")]
        [HttpGet("{roomId}")]
        public async Task<ActionResult<Room>> GetRoomById(int roomId)
        {
            try
            {
                var room = await _roomService.GetRoomById(roomId);
                if (room == null)
                {
                    return NotFound(new {Message = "Cannot find any room"});
                }
                return Ok(room);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> AddRoom([FromBody] Room room)
        {
            try
            {
                bool result = await _roomService.AddRoom(room);
                if (result)
                {
                    // return StatusCode(200,"Room added successfully");
                    return Ok(new {Message = "Room added successfully"});
                }
                else
                {
                    return StatusCode(500, "Failed to add room");
                }
            }
            catch (RoomException rex)
            {
                return StatusCode(500, rex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{roomId}")]
        public async Task<ActionResult> UpdateRoom(int roomId, [FromBody] Room room)
        {
            try
            {
                bool updated = await _roomService.UpdateRoom(roomId, room);
                if (updated)
                {
                    return Ok(new {Message = "Room updated successfully"});
                }
                else
                {
                    return NotFound(new {Message = "Cannot find any room"});
                }
            }
            catch (RoomException rex)
            {
                return StatusCode(500, rex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{roomId}")]
        public async Task<ActionResult> DeleteRoom(int roomId)
        {
            try
            {
                bool deleted = await _roomService.DeleteRoom(roomId);
                if (deleted)
                {
                    return Ok(new {Message = "Room deleted successfully"});
                }
                else
                {
                    return NotFound(new {Message = "Cannot find any room"});
                }
            }
            catch (RoomException rex)
            {
                return StatusCode(500, rex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
