using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace dotnetapp.Models
{
    public class CookingClass
    {
        [Key]
        public int CookingClassId {get; set;}
        [Required]
        [MaxLength(100)]
        public string ClassName {get; set;}
        [Required]
        [MaxLength(100)]
        public string CuisineType {get; set;}
        [Required]
        [MaxLength(100)]
        public string ChefName {get; set;}
        [Required]
        [MaxLength(100)]
        public string Location {get; set;}
        [Required]
        public int DurationInHours {get; set;}
        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal Fee {get; set;}
        [Required]
        [MaxLength(100)]
        public string IngredientsProvided {get; set;}
        [Required]
        [MaxLength(100)]
        public string SkillLevel {get; set;}
        [Required]
        [MaxLength(100)]
        public string SpecialRequirements {get; set;}

        [Required(ErrorMessage = "Image URL is required.")]
        public string ImageUrl { get; set; }
    }
}