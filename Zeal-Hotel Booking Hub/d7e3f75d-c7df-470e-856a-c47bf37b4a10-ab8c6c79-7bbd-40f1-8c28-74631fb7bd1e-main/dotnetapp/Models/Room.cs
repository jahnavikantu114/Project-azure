using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Room
    {
    [Key]
    public int RoomId { get; set; }

    [Required(ErrorMessage = "Hotel Name is required.")]
    public string HotelName { get; set; }

    [Required(ErrorMessage = "Room Type is required.")]
    public string RoomType { get; set; }

    [Range(1, 1000, ErrorMessage = "Number of Rooms must be between 1 and 1000.")]
    public int NoOfRooms { get; set; }

    [Range(0.1, double.MaxValue, ErrorMessage = "Price Per Night must be greater than zero.")]
    public decimal PricePerNight { get; set; }

    [Required(ErrorMessage = "Location is required.")]
    public string Location { get; set; }

    [Required(ErrorMessage = "Bed Type is required.")]
    public string BedType { get; set; }

    [Required(ErrorMessage = "Availability status is required.")]
    public bool IsAvailable { get; set; }

    [Required(ErrorMessage= "Description is required")]
    public string Description { get; set; }

    [Required(ErrorMessage = "Facilities is required")]
    public string Facilities { get; set; }

    [Required(ErrorMessage = "Image URL is required.")]
    public string ImageUrl { get; set; }

    }
}