using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace dotnetapp.Models
{
    public class User
    {
         
    [Key]
    public int UserId { get; set; }

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Please provide a valid email address.")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    public string Password { get; set; }

    [Required(ErrorMessage = "Username is required.")]
    public string Username { get; set; }

    [Required(ErrorMessage = "Mobile number is required.")]
    [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Please provide a valid 10-digit mobile number.")]
    public string MobileNumber { get; set; }

    [Required(ErrorMessage = "User role is required.")]
    public string UserRole { get; set; }

    }
}


