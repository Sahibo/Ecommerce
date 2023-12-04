﻿namespace ASP_Project.Areas.Identity.Data.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        
        public int SubProductVariationId { get; set; }
        public SubProductVariation SubProductVariation  { get; set; }
    }
}