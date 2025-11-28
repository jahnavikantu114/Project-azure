using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace dotnetapp.Controllers
{
    [Authorize]  
    [ApiController]
    [Route("api/cooking-class-request")]
    public class CookingClassRequestController : ControllerBase
    {
        private readonly CookingClassRequestService _cookingClassRequestService;
 
        public CookingClassRequestController(CookingClassRequestService cookingClassRequestService)
        {
            _cookingClassRequestService = cookingClassRequestService;
        }
 
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<CookingClassRequest>>> GetAllCokingClassRequests()
        {
            try{
            var requests = await _cookingClassRequestService.GetAllCookingClassRequests();
            if (requests==null)
            {
              return BadRequest(new{Message="No requests are available."});
            }
            return Ok(requests);
            }
            catch (Exception ex){
              return StatusCode(500, new { Message= $"An error was occured while getting all the requests: {ex.Message}" });
            }
        }
 
        [HttpGet("user/{userId}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<IEnumerable<CookingClassRequest>>> GetCookingClassRequestsByUserId(int userId)
        {  
            try{
            var requests = await _cookingClassRequestService.GetCookingClassRequestsByUserId(userId);
            if (requests == null)
            {
                return NotFound(new {Message=$"User with ID: {userId} is not available."});
            }
            return Ok(requests);
            }
            catch (Exception ex){
                return StatusCode(500, new { Message= $"An error was occured while getting the Id {userId}: {ex.Message}" });
            }
        }
 
 
        [HttpPost]
        [Authorize(Roles="User")]
        public async Task<ActionResult> AddCookingClassRequest([FromBody] CookingClassRequest request)
        {
            try
            {
                await _cookingClassRequestService.AddCookingClassRequest(request);
                return Ok(new {Message = "Cooking class request added successfully"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new {Message= $"An error was occured while adding the requests: {ex.Message}" });
            }
        }
 
        [HttpPut("{requestId}")]
        [Authorize(Roles = "Admin, User")]
        public async Task<ActionResult> UpdateCookingClassRequest(int requestId, [FromBody] CookingClassRequest request)
        {
            try
            {
                var updated = await _cookingClassRequestService.UpdateCookingClassRequest(requestId, request);
                if (!updated)
                {
                    return NotFound(new {Messsage="Cannot find the request"});
                }
                return Ok(new {Message="Cooking class request updated successfully"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message= $"An error was occured while updating the requests: {ex.Message}" });
            }
        }
 
        [HttpDelete("{requestId}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult> DeleteCookingClassRequest(int requestId)
        {
            try
            {
                var isDeleted = await _cookingClassRequestService.DeleteCookingClassRequest(requestId);
                if (!isDeleted)
                {
                    return NotFound(new {Message="Cannot find the request"});
                }
                return Ok(new {Message= "Cooking class request deleted successfully"});
            }
            catch (Exception ex)
            {
                 return StatusCode(500, new { Message= $"An error was occured while deleting the requests: {ex.Message}" });
            }
        }
 
    }
}