namespace ASP_Project.Areas.Identity.Data.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        
        public int ProductVariationId { get; set; }
        public ProductVariation ProductVariation  { get; set; }
    }
}