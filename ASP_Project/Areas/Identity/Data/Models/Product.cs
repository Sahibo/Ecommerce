﻿using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace ASP_Project.Areas.Identity.Data.Models
{
    public enum Gender
    {
        Man,
        Woman,
        Unisex
    }

    public class Product
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        public string Make { get; set; }
        public Gender Gender { get; set; }
        public string Fabric { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }

		public List<ProductVariation> ProductVariations { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    
    }

    
}
