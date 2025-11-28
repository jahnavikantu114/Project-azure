using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid login request." });
            }

            try
            {
                var (statusCode, responseMessage) = await _authService.Login(model);
                if (statusCode == 1)
                {
                    return Ok(new { token = responseMessage });
                }
                return Unauthorized(new { Message = responseMessage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while processing your request.", Details = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid registration request." });
            }

            try
            {
                var (statusCode, responseMessage) = await _authService.Registration(model, model.UserRole);
                if (statusCode == 1)
                {
                    return Ok(new { message = responseMessage });
                }
                return BadRequest(new { Message = responseMessage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while processing your request.", Details = ex.Message });
            }
        }
    }
}
