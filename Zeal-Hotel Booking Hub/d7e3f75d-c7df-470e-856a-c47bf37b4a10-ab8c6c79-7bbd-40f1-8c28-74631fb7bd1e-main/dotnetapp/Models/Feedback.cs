using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace dotnetapp.Models
{
    public class Feedback
{
    [Key]
    public int FeedbackId { get; set; }

    public int? UserId { get; set; }

    public User? User { get; set; }

    [Required(ErrorMessage = "Feedback text is required")]
    [MaxLength(500, ErrorMessage = "Feedback text can't be longer than 500 characters")]
    public string FeedbackText { get; set; }

    [Required(ErrorMessage = "Date is required")]
    public DateTime Date { get; set; }
}
}


