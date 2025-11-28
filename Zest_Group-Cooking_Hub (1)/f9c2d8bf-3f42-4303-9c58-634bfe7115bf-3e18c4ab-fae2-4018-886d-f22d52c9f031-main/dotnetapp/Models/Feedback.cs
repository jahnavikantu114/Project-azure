 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
 
namespace dotnetapp.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackId {get;set;}
        [Required]
        public int UserId {get;set;}
        public User? User {get;set;}
        [Required]
        [MaxLength(100)]
        public string FeedbackText {get;set;}
        [DataType(DataType.Time)]
        public DateTime Date {get;set;}
    }
}