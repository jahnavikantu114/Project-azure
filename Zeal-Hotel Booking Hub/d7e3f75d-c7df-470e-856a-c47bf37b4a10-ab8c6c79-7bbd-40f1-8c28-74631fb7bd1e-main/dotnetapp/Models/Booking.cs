using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace dotnetapp.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        public string Username{get; set;}
        [Required(ErrorMessage = "UserId is required")]
        public int? UserId { get; set; }

        public User? User{get; set;}


        [Required(ErrorMessage = "RoomId is required")]
        public int? RoomId { get; set; }

        public Room? Room { get; set; }

        [Required(ErrorMessage = "Check-in date is required")]
        [DataType(DataType.Date)]
        public string CheckInDate { get; set; }

        [Required(ErrorMessage = "Check-out date is required")]
        [DataType(DataType.Date)]
        public string CheckOutDate { get; set; }

        [Required(ErrorMessage = "Status is required")]
        [MaxLength(20, ErrorMessage = "Status can't be longer than 20 characters")]
        public string Status { get; set; }

        [MaxLength(200, ErrorMessage = "Special requests can't be longer than 200 characters")]
        public string SpecialRequests { get; set; }

        [MaxLength(100, ErrorMessage = "Booking purpose can't be longer than 100 characters")]
        public string BookingPurpose { get; set; }

        [MaxLength(500, ErrorMessage = "Additional comments can't be longer than 500 characters")]
        public string? AdditionalComments { get; set; }
    }
}

