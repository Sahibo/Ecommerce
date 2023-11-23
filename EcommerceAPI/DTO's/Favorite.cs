using System.Text.Json.Serialization;

namespace EcommerceAPI;

public class Favorite
{
    public int Id { get; set; }
    public string UserId { get; set; } 
    public int ProductVariationId { get; set; }
    [JsonIgnore]

    public AspNetUser User { get; set; } 
    [JsonIgnore]

    public ProductVariation ProductVariation { get; set; }
}