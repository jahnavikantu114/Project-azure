using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
 
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CookingClassController : ControllerBase
    {
        private readonly CookingClassService _cookingClassService;
        public CookingClassController(CookingClassService cookingClassService)
        {
            _cookingClassService = cookingClassService;
        }
       
        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<IEnumerable<CookingClass>>> GetAllCookingClasses()
        {
            try
            {
                var classes = await _cookingClassService.GetAllCookingClasses();
                if(classes==null)
                {
                    return BadRequest(new {Message= "Cannot find cooking classes."});
                }
                return Ok(classes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occured while fetching all the cooking classes: {ex.Message}" });
            }
        }
        [HttpGet("{classId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CookingClass>> GetCookingClassById(int classId)
        {
            try
            {
                var cookingClass = await _cookingClassService.GetCookingClassById(classId);
                if (cookingClass == null)
                    return NotFound(new { Message = "Cannot find any cooking" });
                return Ok(cookingClass);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occured while fetching the cooking class by ID: {ex.Message}" });
            }
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> AddCookingClass([FromBody] CookingClass cooking)
        {
            try
            {
                var result = await _cookingClassService.AddCookingClass(cooking);
                if (!result)
                    return BadRequest(new { Message = "Failed to add cooking class." });
                return Ok(new {Message= "Cooking class added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occured while adding the cooking class: {ex.Message}" });
            }
        }
        [HttpPut("{classId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateCookingClass(int classId, [FromBody] CookingClass cooking)
        {
            try
            {
                var result = await _cookingClassService.UpdateCookingClass(classId, cooking);
                if (!result)
                    return NotFound(new { Message = "Cannot find any cooking" });
                return Ok(new {Message= "Cooking class updated successfully."});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occured while updating the cooking class: {ex.Message}" });
            }
        }
        [HttpDelete("{classId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteCookingClass(int classId)
        {
            try
            {
                var result = await _cookingClassService.DeleteCookingClass(classId);
                if (!result)
                    return NotFound(new {Message= "Cannot find any cooking"});
                return Ok(new {Message= "Cooking class deleted successfully"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occured while Deleting the Cooking class: {ex.Message}" });
            }
        }
    }
}