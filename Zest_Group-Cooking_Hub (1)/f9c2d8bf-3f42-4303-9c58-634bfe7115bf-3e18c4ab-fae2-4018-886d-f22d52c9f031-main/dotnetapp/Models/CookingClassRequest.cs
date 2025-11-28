using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
    public class CookingClassRequest
    {
        [Key]
        public int CookingClassRequestId  {get;set;}
        [Required]
        public int UserId {get;set;}
        public User? User {get;set;}
        [Required]
        public int CookingClassId {get;set;}
        public CookingClass? CookingClass {get;set;}
        [Required]
        [MaxLength(100)]
        public string RequestDate {get;set;}
        [Required]
        [MaxLength(100)]
        public string Status {get;set;}
        [Required]
        [MaxLength(100)]
        public string DietaryPreferences {get;set;}
        [Required]
        [MaxLength(100)]
        public string CookingGoals {get;set;}
        [Required]
        [MaxLength(100)]
        public string? Comments {get;set;}
    }
}