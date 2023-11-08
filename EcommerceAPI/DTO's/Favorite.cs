namespace EcommerceAPI;

public class Favorite
{
    public int Id { get; set; }
    public string UserId { get; set; } 
    public int ProductVariationId { get; set; }

    public AspNetUser User { get; set; } 
    public ProductVariation ProductVariation { get; set; }
}