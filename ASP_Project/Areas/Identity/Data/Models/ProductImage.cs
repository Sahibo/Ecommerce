﻿namespace ASP_Project.Areas.Identity.Data.Models
{
    public class ProductImage
    {
        public int Id { get; set; }
        
        public byte[]? ImageData { get; set; }
        public string? Url { get; set; }

        public int ProductVariationId { get; set; }
        public ProductVariation ProductVariation { get; set; }
    }
}